import { json } from '@sveltejs/kit';
import { calcularPromedioSO, obtenerAprobados } from "$lib/utils"

export async function GET({ locals, url }) {
	let show_courses = false

	let period = url.searchParams.get('period')
	let courses = url.searchParams.get('courses')?.split(',')
	let group_id = url.searchParams.get('group_id')

	let exams

	if (group_id) {
		exams = await locals.pb.collection('exams').getFullList({
			filter: `group = '${group_id}'`,
			fields: 'grades, max_so'
		})
	} else {
		let filter = courses.map((c) => `group.course = '${c}'`).join("||")

		// Conseguir los examenes de esos grupos
		exams = await locals.pb.collection('exams').getFullList({
			filter: filter + `&& group.semester='${period}'`,
			fields: 'grades, max_so, group'
		});

		// para activar la visualización de varios cursos
		show_courses = courses.length > 1
	}
	
	// Si se muestra la tabla de cursos, entonces agrupar x cursos
	// TODO: convertir en GROUP BY en SQL
	if (show_courses) {

		let groups = await locals.pb.collection('groups').getFullList({
			filter,
			fields: 'id,course'
		});

		if (groups.length === 0) {
			return json([]);
		}

		let exams = await locals.pb.collection('exams').getFullList({
			filter: groups.map((g) => `group='${g.id}'`).join("||"),
			fields: 'grades, max_so, group'
		});

		// Normalizar los puntajes en cada SO para que estén sobre 20
		exams.forEach(exam => {
			// itercambiar el grupo por el curso
			exam.group = groups.find(g => g.id === exam.group).course
			exam.grades.forEach(g => {
				for (const so in g.puntajesPorSO) {
					g.puntajesPorSO[so] = g.puntajesPorSO[so] / exam.max_so[so] * 20
				}
			})
		});

		// Reducir los examenes a varios arrays según curso
		let mega_matrix = {}
		exams.forEach(exam => {
			if (!(exam.group in mega_matrix)) {
				mega_matrix[exam.group] = Array()
			}
			mega_matrix[exam.group].push(exam)
		})

		let otra_matrix = {}
		for (const course in mega_matrix) {
			const grades = mega_matrix[course].reduce((accumulator, currentExam) => {
				return accumulator.concat(currentExam.grades);
			}, []);

			let cantidades = {}

			// Combinar registros de estudiantes idénticos
			const reducedArray = grades.reduce((acc, current) => {
				const existingItem = acc.find(item => item.code === current.code);
				if (existingItem) {
					cantidades[current.code] += 1
					for (const so in existingItem.so) {
						existingItem.so[so] += current.puntajesPorSO[so]
					}
				} else {
					cantidades[current.code] = 1
					acc.push({
						code: current.code,
						so: current.puntajesPorSO
					});
				}
				return acc;
			}, []);

			// Sacar promedio
			for (const grade of reducedArray) {
				for (const so in grade.so) {
					grade.so[so] = grade.so[so] / cantidades[grade.code]
				}
			}

			otra_matrix[course] = reducedArray
		}

		let ultima = []

		for (const course in otra_matrix) {
			ultima.push({
				course: course,
				so: calcularPromedioSO(otra_matrix[course]),
				quantity: obtenerAprobados(otra_matrix[course])
			}) 
		}
		
		return json(ultima)
	}

	// Normalizar los puntajes en cada SO para que estén sobre 20
	exams.forEach(exam => {
		exam.grades.forEach(g => {
			for (const so in g.puntajesPorSO) {
				g.puntajesPorSO[so] = g.puntajesPorSO[so] / exam.max_so[so] * 20
			}
		})
	});

	console.log(exams[1].grades[0])

	// Reducir los examenes a un único array de calificaciones
	const grades = exams.reduce((accumulator, currentExam) => {
		return accumulator.concat(currentExam.grades);
	}, []);

	let cantidades = {}

	// Combinar registros de estudiantes idénticos
	const reducedArray = grades.reduce((acc, current) => {
		const existingItem = acc.find(item => item.code === current.code);
		if (existingItem) {
			cantidades[current.code] += 1
			for (const so in existingItem.so) {
				existingItem.so[so] += current.puntajesPorSO[so]
			}
		} else {
			cantidades[current.code] = 1
			acc.push({
				code: current.code,
				fname: current.fname,
				lname: current.lname,
				so: current.puntajesPorSO
			});
		}
		return acc;
	}, []);

	// Sacar promedio
	for (const grade of reducedArray) {
		for (const so in grade.so) {
			grade.so[so] = grade.so[so] / cantidades[grade.code]
		}
	}
	
	return json(reducedArray);
}