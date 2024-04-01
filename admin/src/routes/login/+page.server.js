import { fail, redirect } from '@sveltejs/kit'

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

export const actions = {
	default: async ({ request, locals, url }) => {
		const form = await request.formData()

		const email = form.get('email')
		const password = form.get('password')

		if (email.length > 100 || !validEmail.test(email)) {
			return fail(400, {
				email,
				loading: false,
				error: { field: 'email', message: 'Ingrese una dirección de correo válida.' }
			})
		}

		try {
			await locals.pb.admins.authWithPassword(email, password)
		} catch (err) {
			if (err.status === 400) {
				return fail(400, {
					email,
					loading: false,
					error: { field: 'email', message: 'Correo o contraseñas incorrectas' }
				})
			}
			return fail(500, {
				email,
				loading: false,
				error: { field: 'email', message: 'Errores con el servidor :( Intente más tarde' }
			})
		}
		
		// Redireccionar a la página a donde el usuario quería entrar
		// originalmente.
		const redirectTo = url.searchParams.get('redirectTo')

		// Solo permitir redirecionamientos al sitio
		if (redirectTo) {
			throw redirect(302, `/${redirectTo.slice(1)}`)
		}

		throw redirect(302, "/")
	}
};