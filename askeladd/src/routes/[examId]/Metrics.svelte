<script>
	import Pregunta from "$lib/components/Pregunta.svelte"
	import Header from "$lib/components/Header.svelte"
	import Examen from "./Examen.svelte"
	import Resumen from "./Resumen.svelte"
	
	export let exam

	let items = exam.content;
	let grades = exam.grades;
	let listaSO = [], matrix = [], metrics = []

	items.forEach(pregunta => {
		pregunta.so.forEach(so => {
			if (!listaSO.includes(so)) {
				listaSO.push(so);
			}
		});
	});

	listaSO.sort()

	const maxPuntajePorSO = {};
	listaSO.forEach(so => {
		maxPuntajePorSO[so] = 0;
		items.forEach(pregunta => {
			if (pregunta.so.includes(so)) {
				maxPuntajePorSO[so] += pregunta.pts / pregunta.so.length;
			}
		});
	});

	matrix = grades.map(estudiante => {
		const puntajesPorSO = {};
	
		// Inicializar puntajes en 0 para cada SO
		listaSO.forEach(so => {
			puntajesPorSO[so] = 0;
		});
	
		// Calcular puntajes por SO para cada pregunta
		items.forEach((pregunta, index) => {
			const puntajePregunta = estudiante.n[index];
			const cantidadSO = pregunta.so.length;
			const puntajePorSO = puntajePregunta / cantidadSO;
		
			pregunta.so.forEach(so => {
				puntajesPorSO[so] += puntajePorSO;
			});
		});
	
		return {
			...estudiante,
			puntajesPorSO
		};
	});
</script>

<div class="body">
	<aside>
		<a href="/" class="logo">Askeladd</a>
		<h2 class="title">Preguntas</h2>
		{#if items}
			<ul>
				{#each items as pregunta (pregunta.id)}
					<li>
						<Pregunta {pregunta} />
					</li>
				{/each}
			</ul>
		{/if}
	</aside>
	<form>
		<Header type={exam?.type} name={exam?.expand.group.expand.course.name} />
		<main>
			<article>
				<h3 class="title">Puntaje por SO</h3>
				<table>
					<thead>
						<tr>
							<th scope="col">Código</th>
							<th scope="col">Nombres</th>
							<th scope="col">Apellidos</th>
							{#each listaSO as _so}
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
								{#each Object.values(fila.puntajesPorSO) as puntajesPorSO, j}
									<td>
										<input
											type="number"
											class="flex1"
											value={puntajesPorSO.toFixed(2)}
											class:red={puntajesPorSO <= (Object.values(maxPuntajePorSO)[j] / 2)}
											disabled
										>
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</article>
			<div class="articles">
				<article>
					<Resumen list={matrix.map(m => m.puntajesPorSO)} {maxPuntajePorSO}/>
				</article>
				<article>
					<Examen list={matrix.map(m => m.n)}/>
				</article>
			</div>
		</main>
	</form>
</div>

<style>
	.articles {
		display: flex;
    	gap: 16px;
		flex: 1;
	}
	.articles > article {
		flex: 1;
	}
	main article {
		background: var(--tertiary);
		border-radius: 16px;
		display: flex;
		align-items: flex-start;
		position: relative;
		flex-direction: column;
		padding: 16px;
		gap: 16px;
		overflow: scroll;
		flex: 1;
	}
	.body {
		height: 100vh;
		display: flex;

		--padding: 16px;
		--radius: 8px;
	}
	.body>form {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow: scroll;
	}
	main {
		display: flex;
		flex: 1;
		padding: 0 32px 32px;
		flex-direction: column;
		gap: 16px;
	}
	.red {
		background: var(--main1);
	}
	.red:hover {
		background: var(--main2);
	}
	table {
		min-width: 100%;
	}
	th:nth-child(1) {
		width: 11ch;
	}
	@media (max-width: 850px) {
		.body {
			flex-direction: column;
		}
		aside {
			width: auto;
		}
		main {
			padding: 0 16px 16px;
		}
	}
</style>