<script>
	export let list

	function transpose(matrix) {
		return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
	}
	
	const transposedMatrix = transpose(list);

	let so_max = []
	let so_min = []
	let so_pro = []
	let so_apr = []

	for (const pregunta of transposedMatrix) {
		so_max = [...so_max, Math.max(...pregunta)]
		so_min = [...so_min, Math.min(...pregunta)]
		so_pro = [...so_pro, pregunta.reduce((a, b) => a + b, 0) / pregunta.length]
	}

	const grades = list.map(l => l.reduce((partialSum, a) => partialSum + a, 0))
</script>

<h3 class="title">Resumen de la Evaluación</h3>
<table>
	<thead>
		<tr>
			<th scope="col">Preguntas</th>
			{#each transposedMatrix as key, index}
				<th scope="col">P. {index + 1}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>P. Máximo</td>
			{#each so_max as v}
				<td>{v.toFixed(2)}</td>
			{/each}
		</tr>
		<tr>
			<td>Promedio</td>
			{#each so_pro as v}
				<td>{v.toFixed(2)}</td>
			{/each}
		</tr>
		<tr>
			<td>P. Mínimo</td>
			{#each so_min as v}
				<td>{v.toFixed(2)}</td>
			{/each}
		</tr>
	</tbody>
</table>

<div class="aprobados">
	<h4>Aprobados: </h4>
	<p>{grades.filter(g => g >= 11.5).length} / {grades.length} =&gt;</p>
	<p>{(grades.filter(g => g >= 11.5).length / grades.length * 100).toFixed(2)}%</p>
</div>

<style>
	table {
		min-width: 100%;
	}
	th:nth-child(1) {
		width: 30%;
	}
	td {
		padding: 8px;
		text-align: center;
	}
	.aprobados {
		display: flex;
		gap: 4px;
	}
</style>