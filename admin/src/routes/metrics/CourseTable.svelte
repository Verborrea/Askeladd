<script>
	export let matrix, courses

	let uniques = {}

	matrix.forEach(e => {
		for (let key in e.so) {
			uniques[key] = true
		}
	});

	let lista_SO = Object.keys(uniques)

	function exportPromedio() {
		let csvContent = "data:text/csv;charset=utf-8,"
			+ "Curso," + lista_SO.map(so => "SO" + so).join(",") + "\n";

		matrix.forEach(fila => {
			let row = [courses.find(c => c.id === fila.course).name];
			lista_SO.forEach(so => {
				row.push(fila.so[so] ? fila.so[so].toFixed(2) : '--');
			});
			csvContent += row.join(",") + "\n";
		});

		let encodedUri = encodeURI(csvContent);
		let link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "tabla_aprobados.csv");
		document.body.appendChild(link);

		link.click();
	}

	function exportAprobados() {
		let csvContent = "data:text/csv;charset=utf-8,"
			+ "Curso," + lista_SO.map(so => "SO" + so).join(",") + "\n";

		matrix.forEach(fila => {
			let row = [courses.find(c => c.id === fila.course).name];
			lista_SO.forEach(so => {
				row.push(fila.quantity[so] ?? '--');
			});
			csvContent += row.join(",") + "\n";
		});

		let encodedUri = encodeURI(csvContent);
		let link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "tabla_cantidad_aprobados.csv");
		document.body.appendChild(link); // Required for FF

		link.click(); // This will download the CSV file
	}
</script>

<div class="titulo">
	<h3>Promedio por curso</h3>
	<button type="button" on:click={exportPromedio}>
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
			<path fill="var(--text)" d="M280-360v-240q0-33 23.5-56.5T360-680h326L583-783l57-57 200 200-200 200-57-56 103-104H360v240h-80Zm-80 240q-33 0-56.5-23.5T120-200v-600h80v600h480v-160h80v160q0 33-23.5 56.5T680-120H200Z"/>
		</svg>
	</button>
</div>
<table>
	<thead>
		<tr>
			<th scope="col">Curso</th>
			{#each lista_SO as so}
				<th scope="col">SO{so}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each matrix as fila}
			<tr>
				<td>
					<input
						type="text"
						name="course"
						disabled
						value={courses.find(c => c.id === fila.course).name}
					>
				</td>
				{#each lista_SO as so}
				{@const promedio = fila.so[so]}
					<td>
						<input
							type="text"
							name="so{lista_SO}"
							disabled
							value={promedio ? promedio.toFixed(2) : '--'}
						>
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<div class="titulo">
	<h3>Porcentaje de Aprobados</h3>
	<button type="button" on:click={exportAprobados}>
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
			<path fill="var(--text)" d="M280-360v-240q0-33 23.5-56.5T360-680h326L583-783l57-57 200 200-200 200-57-56 103-104H360v240h-80Zm-80 240q-33 0-56.5-23.5T120-200v-600h80v600h480v-160h80v160q0 33-23.5 56.5T680-120H200Z"/>
		</svg>
	</button>
</div>
<table>
	<thead>
		<tr>
			<th scope="col">Curso</th>
			{#each lista_SO as so}
				<th scope="col">SO{so}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each matrix as fila}
			<tr>
				<td>
					<input
						type="text"
						name="course"
						disabled
						value={courses.find(c => c.id === fila.course).name}
					>
				</td>
				{#each lista_SO as so}
					<td>
						<input
							type="text"
							name="so{lista_SO}"
							disabled
							value={fila.quantity[so] ?? '--'}
						>
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		min-width: 100%;
	}
	table input {
		min-width: 100%;
		text-align: center;
	}
	th:nth-child(1) {
		width: 50%;
	}

	.titulo {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	button {
		background: none;
		border: 2px solid var(--text);
		border-radius: 6px;
		padding: 3px 5px 0px;
	}

	button:hover {
		background: var(--secondary);
	}
</style>