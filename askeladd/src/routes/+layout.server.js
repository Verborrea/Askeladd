import { redirect } from '@sveltejs/kit'

// Si el usuario no está autenticado se le redireccionará a la página de login.
// Esto sucede al ingresar cualquier dirección válida (menos "/login").
// Las direcciones no válidas redireccionan a la página de error: +error.svelte
export async function load({ locals, url }) {
	if (locals.pb.authStore.isValid) {
		if (url.pathname === "/login") {
			throw redirect(302, "/")
		}
	} else {
		if (url.pathname !== "/login") {
			throw redirect(302, `/login?redirectTo=${url.pathname}`)
		}
	}
}