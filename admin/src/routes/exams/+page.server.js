import { redirect } from '@sveltejs/kit'

export async function load({ url, locals }) {
	if (!locals.pb.authStore.isValid) {
		throw redirect(307, '/login')
	}

	const semester = url.searchParams.get("semester");

	let filter = ''

	if (semester) {
		filter += `group.semester~"${semester}"`
	}

	const records = await locals.pb.collection('exams').getFullList({
		expand: "group,group.course,group.professors",
		filter
	});

	return {
		exams: records,
	}
}

export const actions = {
	preguntas: async ({ locals, request }) => {
		let { id } = Object.fromEntries(await request.formData());
	
		await locals.pb.collection('exams').update(id, {
			content: [],
			grades: [],
			max_so: null,
			status: 'En Blanco',
			lowest: null,
			average: null,
			highest: null,
		});
	},
	calificaciones: async ({ locals, request }) => {
		let { id } = Object.fromEntries(await request.formData());
	
		await locals.pb.collection('exams').update(id, {
			grades: [],
			max_so: null,
			status: 'Calificando',
			lowest: null,
			average: null,
			highest: null,
		});
	},
	archivos: async ({ locals, request }) => {
		let { id } = Object.fromEntries(await request.formData());
	
		await locals.pb.collection('exams').update(id, {
			lowest: null,
			average: null,
			highest: null,
			status: 'Digitalización'
		});
	}
};