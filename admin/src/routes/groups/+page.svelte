<script>
	import Header from "$lib/components/Header.svelte";
	import Select from './Select.svelte'
	import RadioButton from './RadioButton.svelte'
	import { enhance } from "$app/forms";
	import { fly } from 'svelte/transition';
	import { generateId } from "$lib/utils";

	export let data
	
	let subirLoading = false, examsLoading = false
	let error_message = ''

	$: if (error_message != '') {
		setTimeout(function() {
			error_message = ''
			subirLoading = false;
		}, 2000)
	}

	const professors = data.professors
	const courses = data.courses
	let groups = data.groups

	const semesters = [
		'2023-II',
		'2024-I'
	]

	let selected_semester = semesters[0]

	const addGroup = () => {
		groups = [...groups, {
			id: generateId(),
			code: '',
			course: '',
			professors: [],
			semester: selected_semester
		}]
	}

	const subir = ({ cancel }) => {
		subirLoading = true

		for (const group of groups) {
			for (const key in group) {
				if (group[key].length === 0) {
					error_message = 'No pueden haber celdas vacías'
					cancel();
				} 
			}
		}

		return async ({ update }) => {update(); subirLoading = false;}
	}

	const exams = () => {
		examsLoading = true
		return async ({ update }) => {update(); examsLoading = false;}
	}

	const pegarTabla = () => {
		navigator.clipboard.readText()
		.then(function(clipboardText) {
			const lineas = clipboardText.split('\n');
			const portapapeles = [];

			lineas.forEach((linea) => {
				const partes = linea.split('\t');
				if (partes.length === 4) {
					portapapeles.push({
						id: generateId(),
						code: partes[0],
						course: partes[1],
						professors: partes[2].split(', '),
						semester: partes[3]
					})
				}
			});
			groups = portapapeles
		})
		.catch(function(error) {
			console.error(error);
		});
	}
</script>

<svelte:head>
	<title>Admin | Cargar asignación de cursos</title>
</svelte:head>

<div class="body">
	{#if error_message}
		<span class="error" transition:fly={{ y: -100, duration: 700 }}>
			{error_message}
		</span>
	{/if}
	<aside>
		<a href="/" class="logo">Askeladd</a>
		<label for="semester">
			<h3>Periodo:</h3>
			<select id="semester" bind:value={selected_semester}>
				{#each semesters as semester}
					<option value={semester}>{semester}</option>
				{/each}
			</select>
		</label>
		<form action="?/subir" method="post" use:enhance={subir}>
			<input type="hidden" name="courses" value={JSON.stringify(courses)} />
			<input type="hidden" name="professors" value={JSON.stringify(professors)} />
			<input type="hidden" name="groups" value={JSON.stringify(groups)} />
			<button type="submit" disabled={subirLoading}>
				{#if subirLoading}
					Cargando...
				{:else}
					Guardar
				{/if}
			</button>
		</form>
		<button type="button" on:click={pegarTabla}>Subir desde portapapeles</button>
		<form action="?/exams" method="post" use:enhance={exams}>
			<button type="submit" disabled={examsLoading}>
				{#if examsLoading}
					Cargando...
				{:else}
					Crear Evaluaciones
				{/if}
			</button>
		</form>
		<button type="button" on:click={()=>{window.location.href='/exams'}}>Ver Evaluaciones</button>
	</aside>
	<article>
		<Header text="Admin | Cargar Asignación de Cursos" />
		<main>
			<table>
				<thead>
					<tr>
						<th scope="col">
							<svg height="20" viewBox="0 -960 960 960" width="20">
								<path fill="var(--text)" d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-12q-15.3 0-25.65-10.289-10.35-10.29-10.35-25.5Q192-747 202.35-757.5 212.7-768 228-768h156v-12q0-15.3 10.35-25.65Q404.7-816 420-816h120q15.3 0 25.65 10.35Q576-795.3 576-780v12h156q15.3 0 25.65 10.289 10.35 10.29 10.35 25.5Q768-717 757.65-706.5 747.3-696 732-696h-12v479.566Q720-186 698.85-165 677.7-144 648-144H312Zm107.789-144Q435-288 445.5-298.35 456-308.7 456-324v-264q0-15.3-10.289-25.65-10.29-10.35-25.5-10.35Q405-624 394.5-613.65 384-603.3 384-588v264q0 15.3 10.289 25.65 10.29 10.35 25.5 10.35Zm120 0Q555-288 565.5-298.35 576-308.7 576-324v-264q0-15.3-10.289-25.65-10.29-10.35-25.5-10.35Q525-624 514.5-613.65 504-603.3 504-588v264q0 15.3 10.289 25.65 10.29 10.35 25.5 10.35Z"/>
							</svg>
						</th>
						<th scope="col">Código</th>
						<th scope="col">Curso</th>
						<th scope="col">Profesores</th>
						<th scope="col">Semestre</th>
					</tr>
				</thead>
				<tbody>
				{#each groups as row}
					{#if row.semester === selected_semester}
					<tr>
						<td>
							<button type="button" on:click={()=>{
								groups = groups.filter((r) => r !== row)
							}}>
								<svg height="20" viewBox="0 -960 960 960" width="20">
									<path fill="var(--text)" d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-12q-15.3 0-25.65-10.289-10.35-10.29-10.35-25.5Q192-747 202.35-757.5 212.7-768 228-768h156v-12q0-15.3 10.35-25.65Q404.7-816 420-816h120q15.3 0 25.65 10.35Q576-795.3 576-780v12h156q15.3 0 25.65 10.289 10.35 10.29 10.35 25.5Q768-717 757.65-706.5 747.3-696 732-696h-12v479.566Q720-186 698.85-165 677.7-144 648-144H312Zm107.789-144Q435-288 445.5-298.35 456-308.7 456-324v-264q0-15.3-10.289-25.65-10.29-10.35-25.5-10.35Q405-624 394.5-613.65 384-603.3 384-588v264q0 15.3 10.289 25.65 10.29 10.35 25.5 10.35Zm120 0Q555-288 565.5-298.35 576-308.7 576-324v-264q0-15.3-10.289-25.65-10.29-10.35-25.5-10.35Q525-624 514.5-613.65 504-603.3 504-588v264q0 15.3 10.289 25.65 10.29 10.35 25.5 10.35Z"/>
								</svg>
							</button>
						</td>
						<td>
							<input
							type="text"
							bind:value={row.code}
							placeholder="CCOMP1-1"
							>
						</td>
						<td><RadioButton list={courses} bind:selection={row.course}/></td>
						<td><Select list={professors.map(p => p.lname + ' ' + p.fname)} bind:selection={row.professors}/></td>
						<td><input type="text" bind:value={row.semester} disabled></td>
					</tr>
					{/if}
				{/each}
				</tbody>
			</table>
			<button type="button" class="le_button" on:click={addGroup}>Añadir Fila</button>
		</main>
	</article>
</div>

<style>
	label[for="semester"] {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	select {
		flex: 1;
		border-radius: 10px;
		background: var(--tertiary);
		border: 0;
		padding: 8px;
		font-size: 16px;
		color: var(--text);
	}
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
		overflow: scroll;
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
	table input {
		min-width: 100%;
		text-align: center;
	}
	th:nth-child(1) {
		width: 20px;
	}
	th:nth-child(2) {
		width: 15%;
	}
	th:nth-child(3) {
		width: 12%;
	}
	th:nth-child(5) {
		width: 12%;
	}
</style>