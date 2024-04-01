import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
	if (!locals.pb.authStore.isValid) {
		throw redirect(307, '/login')
	}

	let professors = await locals.pb.collection('users').getFullList({
		fields: 'id,fname,lname'
	})

	let courses = await locals.pb.collection('courses').getFullList({
		fields: 'id,code,name'
	})

	let groups = await locals.pb.collection('groups').getFullList({
		expand: 'course,semester,professors',
		fields: 'id,code,expand.course.code,expand.professors,semester',
	});

	function parseGroups(g) {
		return {
			id: g.id,
			code: g.code,
			course: g.expand.course.code,
			professors: g.expand.professors.map(profesor => profesor.lname + ' ' + profesor.fname),
			semester: g.semester
		};
	}

	return {
		professors,
		courses,
		groups: groups.map(g => parseGroups(g)),
	}
}

export const actions = {
	subir: async ({ locals, request }) => {
		let { courses, professors, groups } = Object.fromEntries(await request.formData());
		
		courses = JSON.parse(courses)
		professors = JSON.parse(professors)
		groups = JSON.parse(groups)

		// Para transformar a los profesores y cursos en ids
		let p_dict = {}, c_dict = {}
		
		professors.forEach(p => {
			p_dict[p.lname + ' ' + p.fname] = p.id
		});

		courses.forEach(c => {
			c_dict[c.code] = c.id
		});

		// Formatear grupos con los ids obtenidos
		groups = groups.map((g) => { return {
			id: g.id,
			code: g.code,
			course: c_dict[g.course],
			professors: g.professors.map(p => p_dict[p]),
			semester: g.semester
		}});

		// Obtener lista antigua de grupos y asegurarse de que
		// los registros coincidan.
		const oldGroups = await locals.pb.collection('groups').getFullList({
			fields: 'id',
		});
	  
		const newGroups = groups.map((group) => group.id);

		// Borrar grupos que ya no están en la lista
		const groupsToDelete = oldGroups.filter((g) => !newGroups.includes(g.id));
		for (const groupToDelete of groupsToDelete) {
			await locals.pb.collection('groups').delete(groupToDelete.id);
		}
		
		// Crear nuevos grupos o actualizar si ya existen
		for (const newGroup of groups) {
			const existingGroup = oldGroups.find((g) => g.id === newGroup.id);
			if (existingGroup) {
			  // Actualizar curso existente si es necesario
			  await locals.pb.collection('groups').update(existingGroup.id, {
				code: newGroup.code,
				course: newGroup.course,
				professors: newGroup.professors,
				semester: newGroup.semester
			  });
			} else {
			  // Crear nuevo curso si no existe
			  await locals.pb.collection('groups').create({
				id: newGroup.id,
				code: newGroup.code,
				course: newGroup.course,
				professors: newGroup.professors,
				semester: newGroup.semester
			  });
			}
		}
	},
	exams: async ({ locals }) => {
		const groups = await locals.pb.collection('groups').getFullList({
			expand: 'course',
			fields: 'id,semester,expand.course.name'
		});

		for (const group of groups) {
			let info = {
				content: [],
				status: "En Blanco"
			}
			if (group.semester.slice(-1) !== 'V') {
				// Crear examen parcial
				if (group.expand.course.name === 'Proyecto Final de Carrera I' ||
					group.expand.course.name === 'Proyecto Final de Carrera II') {
					info = {
						content: [
							{id:1,text:'Fondo',so:['1','2','3','4','5','6','7'],src: '',pts:10},
							{id:2,text:'Forma',so:['1','2','3','4','5','6','7'],src: '',pts:10},
						],
						status: "Calificando"
					}
				}
				if (group.expand.course.name === 'Proyecto Final de Carrera III') {
					info = {
						content: [
							{id:1,text:'Fondo',so:['1','2','3','4','5','6','7'],src: '',pts:3},
							{id:2,text:'Forma',so:['1','2','3','4','5','6','7'],src: '',pts:3},
							{id:3,text:'Resultados',so:['1','2','3','4','5','6','7'],src: '',pts:14},
						],
						status: "Calificando"
					}
				}
				await locals.pb.collection('exams').create({
					type: "Parcial",
					...info,
					group: group.id,
					grades: [],
				});

				// Crear examen final
				if (group.expand.course.name === 'Proyecto Final de Carrera I' ||
					group.expand.course.name === 'Proyecto Final de Carrera II' ||
					group.expand.course.name === 'Proyecto Final de Carrera III') {
					info = {
						content: [
							{id:1,text:'Fondo',so:['1','2','3','4','5','6','7'],src: '',pts:3},
							{id:2,text:'Forma',so:['1','2','3','4','5','6','7'],src: '',pts:3},
							{id:3,text:'Resultados',so:['1','2','3','4','5','6','7'],src: '',pts:14},
						],
						status: "Calificando"
					}
				}
				await locals.pb.collection('exams').create({
					type: "Final",
					...info,
					group: group.id,
					grades: [],
				});
			} else {
				await locals.pb.collection('exams').create({
					type: "Único",
					status: "En Blanco",
					content: [],
					group: group.id,
					grades: [],
				});
			}
		}
	}
}