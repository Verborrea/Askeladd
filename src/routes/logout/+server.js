import { redirect } from '@sveltejs/kit'

// Deslogear al usuario, limpiando el store y la variable locals.user
// Luego se le redirige al login

export const POST = ({ locals }) => {
	locals.pb.authStore.clear()
	locals.user = undefined

	throw redirect(303, '/login')
}