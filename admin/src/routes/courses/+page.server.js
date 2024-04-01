import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
	if (!locals.pb.authStore.isValid) {
		throw redirect(307, '/login')
	}
	
	const courses = await locals.pb.collection('courses').getFullList({
		fields: 'id,code,name,curricula,outcomes,semester',
	});

	return {
		datos: courses
	}
}

export const actions = {
	subir: async ({ locals, request }) => {
		let { datos } = Object.fromEntries(await request.formData());
	
		let courses = JSON.parse(datos)

		courses.forEach(curso => {
			if (!Array.isArray(curso.outcomes))
				curso.outcomes = curso.outcomes.split(',')
		});

		// Obtener lista antigua de cursos y asegurarse de que
		// los registros coincidan.
		const oldCourses = await locals.pb.collection('courses').getFullList({
			fields: 'id',
		});
	  
		const newCourses = courses.map((course) => course.id);

		// Borrar cursos que ya no están en la lista
		const coursesToDelete = oldCourses.filter((c) => !newCourses.includes(c.id));
		for (const courseToDelete of coursesToDelete) {
			await locals.pb.collection('courses').delete(courseToDelete.id);
		}
		
		// Crear nuevos cursos o actualizar si ya existen
		for (const newCourse of courses) {
			const existingCourse = oldCourses.find((course) => course.id === newCourse.id);
			if (existingCourse) {
			  // Actualizar curso existente si es necesario
			  await locals.pb.collection('courses').update(existingCourse.id, {
				code: newCourse.code,
				name: newCourse.name,
				curricula: newCourse.curricula,
				outcomes: newCourse.outcomes,
				semester: newCourse.semester
			  });
			} else {
			  // Crear nuevo curso si no existe
			  await locals.pb.collection('courses').create({
				id: newCourse.id,
				code: newCourse.code,
				name: newCourse.name,
				curricula: newCourse.curricula,
				outcomes: newCourse.outcomes,
				semester: newCourse.semester
			  });
			}
		}
	}
}