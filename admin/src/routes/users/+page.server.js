import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
	if (!locals.pb.authStore.isValid) {
		throw redirect(307, '/login')
	}

	const users = await locals.pb.collection('users').getFullList({
		fields: 'id,dni,fname,lname,email,sex',
	});

	users.forEach(user => {
		user.sex = user.sex ? 'Femenino' : 'Masculino'
	});

	return {
		datos: users
	}
}

export const actions = {
	subir: async ({ locals, request }) => {
		let { datos } = Object.fromEntries(await request.formData());
	
		let users = JSON.parse(datos)

		// Obtener lista antigua de profesores y asegurarse de que
		// los registros coincidan.
		const oldUsers = await locals.pb.collection('users').getFullList({
			fields: 'id',
		});
	  
		const newUsers = users.map((user) => user.id);

		// Borrar usuarios que ya no están en la lista
		const usersToDelete = oldUsers.filter((user) => !newUsers.includes(user.id));

		for (const userToDelete of usersToDelete) {
			await locals.pb.collection('users').delete(userToDelete.id);
		}
		
		// Crear nuevos usuarios o actualizar si ya existen
		for (const newUser of users) {
			const existingUser = oldUsers.find((user) => user.id === newUser.id);
			if (existingUser) {
			  // Actualizar usuario existente si es necesario
			  await locals.pb.collection('users').update(existingUser.id, {
				fname: newUser.fname,
				lname: newUser.lname,
				dni: newUser.dni,
				email: newUser.email,
				emailVisibility: true,
				password: newUser.dni,
				passwordConfirm: newUser.dni,
				sex: newUser.sex === 'Femenino',
				verified: true,
			  });
			} else {
			  // Crear nuevo usuario si no existe
			  await locals.pb.collection('users').create({
				fname: newUser.fname,
				lname: newUser.lname,
				email: newUser.email,
				dni: newUser.dni,
				emailVisibility: true,
				password: newUser.dni,
				passwordConfirm: newUser.dni,
				sex: newUser.sex === 'Femenino',
				verified: true,
			  });
			}
		}
	}
}