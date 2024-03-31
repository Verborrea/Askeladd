export async function load({ locals }) {
	// Obtención de los examenes:
	// Se expande el grupo y el curso para obtener información
	// inherente a dichas tablas. El filtro es para obtener solo
	// los examenes de los grupos donde enseña el profesor.
	const exams = await locals.pb.collection('exams').getFullList({
		expand: "group,group.course",
		filter: `group.professors~"${locals.user.id}"`
	})

	// Obtenemos la lista de semestres para filtrar los examenes
	const semesters = new Set(['Todos los periodos'])
	exams.forEach(exam => semesters.add(exam.expand.group.semester))

	return {
		nombre: locals.user.fname.split(' ')[0],
		exams,
		periodos: Array.from(semesters),
		sex: locals.user.sex
	}
}