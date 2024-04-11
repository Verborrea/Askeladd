<script>
	import Header from "$lib/components/Header.svelte";
	import Select from './Select.svelte'
	import RadioButton from './RadioButton.svelte'
	import { enhance } from "$app/forms";
	import { fly } from 'svelte/transition';
	import { periods, generateId } from "$lib/utils";

	export let data
	
	let subirLoading = false, examsLoading = false
	let error_message = ''
	let allSelected = false

	$: if (error_message != '') {
		setTimeout(function() {
			error_message = ''
			subirLoading = false;
		}, 2000)
	}

	const professors = data.professors
	const courses = data.courses
	let groups = data.groups

	let selected_period = periods[0]

	function toggleAll() {
		groups = groups.map(g => ({ ...g, selected: allSelected && g.semester === selected_period }));
	}

	function toggleSelection() {
		allSelected = groups.every(g => g.selected)	
	}

	function addGroup() {
		groups = [...groups, {
			id: generateId(),
			code: '',
			course: '',
			professors: [],
			semester: selected_period,
			selected: allSelected
		}]
	}

	function deleteGroups() {
		groups = groups.filter((r) => r.selected === false)
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

	function exams() {
		examsLoading = true
		return async ({ update }) => {update(); examsLoading = false;}
	}

	function pegarTabla () {
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
						semester: partes[3],
						selected: false
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
	{#if groups.filter(g => g.selected).length}
		<span class="info" transition:fly={{ y: -100, duration: 700 }}>
			<p>{groups.filter(g => g.selected).length} Filas seleccionadas</p>
			<div class="flex">
				<form action="?/exams" method="post" use:enhance={exams}>
					<input type="hidden" name="semester" value={selected_period}>
					<input type="hidden" name="courses" value={JSON.stringify(courses)} />
					<input type="hidden" name="professors" value={JSON.stringify(professors)} />
					<input type="hidden" name="groups" value={JSON.stringify(groups)} />
					<button type="submit" disabled={examsLoading} class="red">
						{#if examsLoading}
							Cargando...
						{:else}
							Crear Evaluaciones
						{/if}
					</button>
				</form>
				<button type="button" on:click={deleteGroups}>Borrar</button>
			</div>
		</span>
	{/if}
	<aside>
		<a href="/" class="logo">Askeladd</a>
		<label for="semester">
			<h3>Periodo:</h3>
			<select id="semester" bind:value={selected_period} on:change={toggleAll}>
				{#each periods as period}
					<option value={period}>{period}</option>
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
		<button type="button" on:click={()=>{window.location.href='/exams'}}>Ver Evaluaciones</button>
	</aside>
	<article>
		<Header text="Admin | Cargar Asignación de Cursos" />
		<main>
			<table>
				<thead>
					<tr>
						<th scope="col"><input type="checkbox" bind:checked={allSelected} on:change={toggleAll}></th>
						<th scope="col">Código</th>
						<th scope="col">Curso</th>
						<th scope="col">Profesores</th>
						<th scope="col">Periodo</th>
					</tr>
				</thead>
				<tbody>
				{#each groups as row}
					{#if row.semester === selected_period}
					<tr>
						<td><input type="checkbox" bind:checked={row.selected} on:change={toggleSelection}></td>
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
	.flex, .info, .info button {
		display: flex;
		align-items: center;
		gap: 8px;
		text-wrap: nowrap;
	}
	.info {
		position: absolute;
		background: var(--tertiary);
		padding: 16px;
		gap: 64px;
		bottom: 16px;
		border-radius: 16px;
		left: 50%;
		transform: translateX(-50%);
	}
	.info button {
		border: 0;
		padding: 4px 8px;
		background: var(--secondary);
		color: var(--text);
		border-radius: 6px;
		gap: 4px;
		font-size: 1em;
	}
	.info button:hover {
		filter: brightness(1.25);
	}
	.info button.red {
		background: var(--main1);
	}
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
	input {
		accent-color: var(--main1);
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