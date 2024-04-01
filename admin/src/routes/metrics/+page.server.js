import { redirect } from '@sveltejs/kit'

let courses

export async function load({ locals }) {
	if (!locals.pb.authStore.isValid) {
		throw redirect(307, '/login')
	}

	let professors = await locals.pb.collection('users').getFullList({
		fields: 'id,fname,lname'
	})

	courses = await locals.pb.collection('courses').getFullList({
		fields: 'id,code,name,semester'
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
	setSemester: async ({ locals, request }) => {
		const data = await request.formData();
		let results = courses.filter((c) => c.semester === data.get('semester'))
		console.log(results)
		return {
			courses: results,
			selection: data.get('semester')
		};
	}
};