import { json } from '@sveltejs/kit';

export async function GET({ locals, url }) {
	let selected_course_id = url.searchParams.get('course')

	let groups = await locals.pb.collection('groups').getFullList({
		fields: 'id,code,course',
		filter: `course = '${selected_course_id}'`
	});

	return json(groups);
}