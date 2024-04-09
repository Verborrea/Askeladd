<script>
	import Header from "$lib/components/Header.svelte"
	import StudentsTable from "./StudentsTable.svelte"
	import CourseTable from "./CourseTable.svelte"
	import { periods, obtenerClavesUnicasOrdenadas } from "$lib/utils"

	export let data

	let complete_groups = []
	
	let semesters = ['Todos los semestres','1','2','3','4','5','6','7','8','9','10']
	let courses = ['Todos los cursos', ...data.courses.map(c => c.name)]
	let groups = []

	let selected_period = periods[0]
	let selected_semester = semesters[0]
	let selected_course = courses[0]
	let selected_group = ''

	let disabled_search = false, showing = 'Nada'

	let matrix = [], lista_SO = [], porcentajes = []

	const setPeriod = () => {
		selected_semester = 'Todos los semestres'
		setSemester()
	}

	const setSemester = () => {
		if (selected_semester === 'Todos los semestres') {
			courses = ['Todos los cursos', ...data.courses.map(c => c.name)]
		} else {
			courses = ['Todos los cursos', ...data.courses.filter((c) => c.semester === selected_semester).map(c => c.name)]
		}
		selected_course = 'Todos los cursos'
		groups = [] // Reinicia el select de Grupos ya que no hay un curso seleccionado
	}

	const setCourse = async () => {
		
		// Borrar los grupos si no se selecciona ningún curso
		if (selected_course === 'Todos los cursos') {
			groups = []
			selected_group = ''
			return
		}

		// Caso contrario llamar a get_groups para obtener códigos y IDs
		let selected_course_id = data.courses.find((c) => c.name === selected_course).id
		const response = await fetch(`/metrics/get_groups?course=${selected_course_id}`, {
			method: 'GET'
		});
		complete_groups = await response.json();

		groups = ['Todos los grupos', ...complete_groups.map(g => g.code)]
		selected_group = 'Todos los grupos'
	}

	const search = async () => {

		let parameters = {}

		// Si ya hay un grupo seleccionado => mandar su id de frente
		// Caso contrario => mandar un array de cursos y el periodo
		if (selected_group && selected_group !== 'Todos los grupos') {
			let group_id = complete_groups.find((g) => g.code === selected_group).id
			parameters.group_id = group_id
		} else {
			parameters.period = selected_period
			parameters.courses = []
			if (selected_course === 'Todos los cursos') {
				let nameToId = {}
				for (let course of data.courses) {
					nameToId[course.name] = course.id
				}
				parameters.courses = courses.slice(1).map(nombre => nameToId[nombre])
			} else {
				let course_id = data.courses.find((c) => c.name === selected_course).id
				parameters.courses.push(course_id)
			}
		}

		// Llamar al servidor para obtener los datos requeridos
		const searchParams = new URLSearchParams(parameters)
		const response = await fetch(`/metrics/matrix?${searchParams.toString()}`, {
			method: 'GET'
		})
		const result_json = await response.json()

		console.log(result_json)

		// if (course_id === 'Todos los cursos') {
		// 	matrix = result_json
		// 	showing = 'Cursos'
		// } else {
		// 	lista_SO = obtenerClavesUnicasOrdenadas(result_json)
		// 	matrix = result_json
		// 	showing = 'Estudiantes'

		// 	let temp_dict = {}, another = []

		// 	for (const so of lista_SO) {
		// 		temp_dict[so] = 0
		// 	}

		// 	for (const exam of matrix) {
		// 		for (const so in exam.so) {
		// 			temp_dict[so] += exam.so[so]
		// 		}
		// 	}

		// 	for (const so of lista_SO) {
		// 		another.push(temp_dict[so] / matrix.length)
		// 	}

		// 	porcentajes = another
		// }
	}
</script>

<svelte:head>
	<title>Admin | Métricas</title>
</svelte:head>

<div class="body">
	<aside>
		<a href="/" class="logo">Askeladd</a>
		<label for="period">
			<h3>Periodo:</h3>
			<select id="semester" bind:value={selected_period} on:change={setPeriod}>
				{#each periods as period}
					<option value={period}>{period}</option>
				{/each}
			</select>
		</label>
		<label for="semester">
			<h3>Semestre:</h3>
			<select id="semester" bind:value={selected_semester} on:change={setSemester}>
				{#each semesters as semester}
					<option value={semester}>{semester}</option>
				{/each}
			</select>
		</label>
		<label for="course">
			<h3>Curso:</h3>
			<select id="course" bind:value={selected_course} on:change={setCourse}>
				{#each courses as course}
					<option value={course}>{course}</option>
				{/each}
			</select>
		</label>
		{#if groups.length > 0}
		<label for="group">
			<h3>Grupo:</h3>
			<select id="group" bind:value={selected_group}>
				{#each groups as group}
					<option value={group}>{group}</option>
				{/each}
			</select>
		</label>
		{/if}
		<button type="button" on:click={search} disabled={disabled_search}>Buscar</button>
		<button type="button" on:click={()=>{window.location.href='/'}}>Regresar</button>
	</aside>
	<article>
		<Header text="Admin | Métricas" />
		<main>
			{#if showing === 'Estudiantes'}
				<StudentsTable {lista_SO} {matrix} {porcentajes}/>
			{:else if showing === 'Cursos'}
				<CourseTable {matrix} courses={data.courses}/>
			{:else}
				Seleccione algo 
			{/if}
		</main>
	</article>
</div>

<style>
	label {
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
</style>