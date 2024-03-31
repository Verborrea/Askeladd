<script>
	export let list, maxPuntajePorSO

	let my_keys = Object.keys(list[0])
	let mejora = []

	let so_max = []
	let so_min = []
	let so_pro = []
	let so_apr = []

	for (const clave in maxPuntajePorSO) {
		let valores = list.map((objeto) => objeto[clave])

		so_max = [...so_max, Math.max(...valores)]
		so_min = [...so_min, Math.min(...valores)]
		so_pro = [...so_pro, valores.reduce((a, b) => a + b, 0) / valores.length]
		so_apr = [...so_apr, valores.filter((v) => v > maxPuntajePorSO[clave] / 2).length]
	}

	for (let i = 0; i < my_keys.length; i++) {
		if (so_apr[i] <= list.length / 2) {
			mejora = [...mejora, my_keys[i]]
		}
	}
</script>

<h3 class="title">Resumen de SO</h3>
<table>
	<thead>
		<tr>
			<th scope="col">Outcomes</th>
			{#each my_keys as key}
				<th scope="col">SO{key}</th>
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
		<tr>
			<td>Aprobados</td>
			{#each so_apr as v}
				<td class:red={v / list.length <= 0.5}>
					{(v / list.length * 100).toFixed(0)}%
				</td>
			{/each}
		</tr>
	</tbody>
</table>
{#if mejora.length === 0}
	<em>No hay acciones de mejora por el momento</em>
{:else}
	{#each mejora as so}
		<strong>Se necesita una acción de mejora en el SO{so}</strong>
	{/each}
{/if}

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
	.red {
		background-color: var(--main1);
	}
	.red:hover {
		background: var(--main2);
	}
</style>