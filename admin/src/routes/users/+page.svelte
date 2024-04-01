<script>
	import Header from "$lib/components/Header.svelte";
	import { enhance } from "$app/forms";
    import { onMount } from "svelte";
	import { fly } from 'svelte/transition';
	import { generateId } from "$lib/utils"
	
	export let data

	let subirLoading = false
	let datos = []
	let error_message = ''

	$: if (error_message != '') {
		setTimeout(function() {
			error_message = ''
			subirLoading = false;
		}, 2000)
	}

	const subir = ({ cancel }) => {
		subirLoading = true

		for (const user of datos) {
			for (const key in user) {
				if (user[key].length === 0) {
					error_message = 'No pueden haber celdas vacías'
					cancel();
				} 
			}
		}

		return async ({ update }) => {update(); subirLoading = false;}
	}

	const pegarTabla = () => {
		navigator.clipboard.readText()
		.then(function(clipboardText) {
			const lineas = clipboardText.split('\n');
			const users = [];

			lineas.forEach((linea) => {
				const partes = linea.split('\t');
				if (partes.length === 5) {
					users.push({
						id: generateId(),
						dni: partes[0],
						fname: partes[1],
						lname: partes[2],
						email: partes[3],
						sex: partes[4],
					})
				}
			});
			datos = users
		})
		.catch(function(error) {
			console.error(error);
		});
	}

	onMount(() => {
		datos = structuredClone(data.datos) ?? [];
	})
</script>

<svelte:head>
	<title>Admin | Subir Usuarios</title>
</svelte:head>

<div class="body">
	{#if error_message}
		<span class="error" transition:fly={{ y: -100, duration: 700 }}>
			{error_message}
		</span>
	{/if}
	<aside>
		<a href="/" class="logo">Askeladd</a>
		<form action="?/subir" method="post" use:enhance={subir}>
			<input type="hidden" name="datos" value={JSON.stringify(datos)} />
			<button type="submit" disabled={subirLoading}>
				{#if subirLoading}
					Cargando...
				{:else}
					Guardar
				{/if}
			</button>
		</form>
		<button type="button" on:click={pegarTabla}>Pegar desde portapapeles</button>
		<button type="button" on:click={()=>{window.location.href='/groups'}}>Asignar cursos</button>
	</aside>
	<article>
		<Header text="Admin | Subir Usuarios" />
		<main>
			<table>
				<thead>
					<tr>
						<th scope="col">
							<svg height="20" viewBox="0 -960 960 960" width="20">
								<path fill="var(--text)" d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-12q-15.3 0-25.65-10.289-10.35-10.29-10.35-25.5Q192-747 202.35-757.5 212.7-768 228-768h156v-12q0-15.3 10.35-25.65Q404.7-816 420-816h120q15.3 0 25.65 10.35Q576-795.3 576-780v12h156q15.3 0 25.65 10.289 10.35 10.29 10.35 25.5Q768-717 757.65-706.5 747.3-696 732-696h-12v479.566Q720-186 698.85-165 677.7-144 648-144H312Zm107.789-144Q435-288 445.5-298.35 456-308.7 456-324v-264q0-15.3-10.289-25.65-10.29-10.35-25.5-10.35Q405-624 394.5-613.65 384-603.3 384-588v264q0 15.3 10.289 25.65 10.29 10.35 25.5 10.35Zm120 0Q555-288 565.5-298.35 576-308.7 576-324v-264q0-15.3-10.289-25.65-10.29-10.35-25.5-10.35Q525-624 514.5-613.65 504-603.3 504-588v264q0 15.3 10.289 25.65 10.29 10.35 25.5 10.35Z"/>
							</svg>
						</th>
						<th scope="col">DNI</th>
						<th scope="col">Nombres</th>
						<th scope="col">Apellidos</th>
						<th scope="col">Correo</th>
						<th scope="col">Sexo</th>
					</tr>
				</thead>
				<tbody>
					{#each datos as fila}
						<tr>
							<td>
								<button
									type="button"
									title="Borrar Fila"
									on:click={()=>{
										datos = datos.filter(d => d !== fila)
									}}
								>
									<svg height="20" viewBox="0 -960 960 960" width="20">
										<path fill="var(--text)" d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-12q-15.3 0-25.65-10.289-10.35-10.29-10.35-25.5Q192-747 202.35-757.5 212.7-768 228-768h156v-12q0-15.3 10.35-25.65Q404.7-816 420-816h120q15.3 0 25.65 10.35Q576-795.3 576-780v12h156q15.3 0 25.65 10.289 10.35 10.29 10.35 25.5Q768-717 757.65-706.5 747.3-696 732-696h-12v479.566Q720-186 698.85-165 677.7-144 648-144H312Zm107.789-144Q435-288 445.5-298.35 456-308.7 456-324v-264q0-15.3-10.289-25.65-10.29-10.35-25.5-10.35Q405-624 394.5-613.65 384-603.3 384-588v264q0 15.3 10.289 25.65 10.29 10.35 25.5 10.35Zm120 0Q555-288 565.5-298.35 576-308.7 576-324v-264q0-15.3-10.289-25.65-10.29-10.35-25.5-10.35Q525-624 514.5-613.65 504-603.3 504-588v264q0 15.3 10.289 25.65 10.29 10.35 25.5 10.35Z"/>
									</svg>
								</button>
							</td>
							<td>
								<input
									type="text"
									name="dni"
									placeholder="22385514"
									autocomplete="off"
									minlength="8"
									maxlength="8"
									bind:value={fila.dni}
								>
							</td>
							<td>
								<input
									type="text"
									name="name"
									placeholder="Luis Fernando"
									autocomplete="off"
									bind:value={fila.fname}
								>
							</td>
							<td>
								<input
									type="text"
									name="name"
									placeholder="Díaz Basurco"
									autocomplete="off"
									bind:value={fila.lname}
								>
							</td>
							<td>
								<input
									type="text"
									name="email"
									placeholder="ldiaz@ucsp.edu.pe"
									autocomplete="off"
									bind:value={fila.email}
								>
							</td>
							<td>
								<input
									type="text"
									name="sex"
									placeholder="Masculino"
									autocomplete="off"
									bind:value={fila.sex}
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<button type="button" class="le_button" on:click={()=>{
				datos = [...datos, {
					id: generateId(),
					dni: "",
					name: "",
					email: "",
					sex: "",
				}]
			}}>
				Añadir Fila
			</button>
		</main>
	</article>
</div>

<style>
	svg {
		display: block;
	}
	main>button {
		align-self: center;
	}
	.body {
		height: 100vh;
		display: flex;
	}
	article {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	article>main {
		display: flex;
		align-items: flex-start;
		flex: 1;
		padding: 0 32px 32px;
		flex-direction: column;
		gap: 8px;
	}
	table {
		min-width: 100%;
	}
	th:nth-child(1) {
		width: 20px;
	}
	th:nth-child(2) {
		width: 10%;
	}
	th:nth-child(6) {
		width: 10%;
	}
</style>