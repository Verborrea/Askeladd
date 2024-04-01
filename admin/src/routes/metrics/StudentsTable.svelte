<script>
	export let lista_SO, matrix, porcentajes

	function exportTable() {
		let csvContent = "data:text/csv;charset=utf-8,"
			+ "Código,Nombre,Apellido," + lista_SO.map(so => "SO" + so).join(",") + "\n";

		matrix.forEach(fila => {
			let row = [fila.code, fila.fname, fila.lname];
			row.push(...Object.values(fila.so).map(so => so.toFixed(2)));
			csvContent += row.join(",") + "\n";
		});

		let encodedUri = encodeURI(csvContent);
		let link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "tabla_exportada.csv");
		document.body.appendChild(link); // Required for FF

		link.click(); // This will download the CSV file
	}
</script>

<div class="titulo">
	<h3>Promedio de evaluaciones</h3>
	<button type="button" on:click={exportTable}>
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
			<path fill="var(--text)" d="M280-360v-240q0-33 23.5-56.5T360-680h326L583-783l57-57 200 200-200 200-57-56 103-104H360v240h-80Zm-80 240q-33 0-56.5-23.5T120-200v-600h80v600h480v-160h80v160q0 33-23.5 56.5T680-120H200Z"/>
		</svg>
	</button>
</div>

<table>
	<thead>
		<tr>
			<th scope="col">Código</th>
			<th scope="col">Nombre</th>
			<th scope="col">Apellido</th>
			{#each lista_SO as _so}
				<th scope="col">SO{_so}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each matrix as fila, i}
			<tr>
				<td>
					<input
						type="text"
						name="code"
						disabled
						value={fila.code}
					>
				</td>
				<td>
					<input
						type="text"
						name="fname"
						disabled
						value={fila.fname}
					>
				</td>
				<td>
					<input
						type="text"
						name="lname"
						disabled
						value={fila.lname}
					>
				</td>
				{#each Object.values(fila.so) as so, j}
					<td>
						<input
							type="number"
							value={so.toFixed(2)}
							disabled
						>
					</td>
				{/each}
			</tr>
		{/each}
		<tr class="bold">
			<td colspan="3">Porcentaje de Aprobados:</td>
			{#each porcentajes as porcentaje}
				<td>
					<input
						type="text"
						value="{porcentaje.toFixed(2)}%"
						disabled
					>
				</td>
			{/each}
		</tr>
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
		width: 10%;
	}
	th:nth-child(n+4) {
		width: 10%;
	}
	td[colspan="3"] {
		text-align: end;
		background: var(--main1);
		padding: 8px 12px;
	}
	.bold, .bold input {
		font-weight: bold;
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