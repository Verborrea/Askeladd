<script>
	import Pregunta from "$lib/components/Pregunta.svelte";
	import Header from "$lib/components/Header.svelte";
	import { enhance } from "$app/forms";
	import { error_message } from "$lib/stores";

	export let exam;

	let subirPdfsLoading = false;
	let items = exam.content;
	let grades = exam.grades;

	const soloNumeros = (e, i, j) => {
		if (e.key === "Enter") reducir(e, i, j);
		if (isNaN(e.target.value + e.key)) e.preventDefault();
	};

	const reducir = (e, i, j) => {
		let value = Number(e.target.value);

		// Redondear a dos decimales si hay más de dos decimales
		if (e.target.value.includes(".")) {
			value = value.toFixed(2);
		}

		value = Math.round(value * 100);
		let respond = value / 100;
		if (value > Math.round(items[j].pts * 100)) {
			alert(
				"El puntaje colocado excede al máximo correspondiente a la pregunta",
			);
			if (value / 10 < Math.round(items[j].pts * 100)) {
				respond = value / 1000;
			} else {
				respond = Math.round(items[j].pts * 100) / 100;
			}
		}

		grades[i].n[j] = respond;
	};

	const subirPdfs = ({ cancel, update }) => {
		subirPdfsLoading = true;

		for (const row of grades) {
			for (const key in row) {
				if (row[key].length === 0) {
					$error_message = 'Algunas celdas están en blanco';
					subirPdfsLoading = false;
					cancel();
					return async () => saveExamLoading = false;
				}
			}
		}

		return async ({ update }) => {
			update();
			subirPdfsLoading = false;
		};
	};

	const pegarTabla = () => {
		navigator.clipboard
			.readText()
			.then(function (clipboardText) {
				const lineas = clipboardText.split("\n");
				const objetos = [];

				lineas.forEach((linea) => {
					const partes = linea.split("\t");
					if (partes.length >= 5) {
						const code = partes[0];
						const fname = partes[1];
						const lname = partes[2];
						const n = partes.slice(3).map(parseFloat);
						while (n.length < items.length) n.push(0);
						while (n.length > items.length) n.pop();
						objetos.push({ code, fname, lname, n });
					}
				});
				grades = objetos;
			})
			.catch(function (error) {
				console.error(error);
			});
	};
</script>

<div class="body">
	<aside>
		<a href="/" class="logo">Askeladd</a>
		<h2 class="title">Preguntas</h2>
		{#if items}
			<ul>
				{#each items as pregunta (pregunta.id)}
					<li><Pregunta {pregunta} /></li>
				{/each}
			</ul>
		{/if}
		<form action="?/subirPdfs" method="post" use:enhance={subirPdfs}>
			<input type="hidden" name="grades" value={JSON.stringify(grades)} />
			<button type="submit" disabled={subirPdfsLoading}>
				{#if subirPdfsLoading}
					Cargando...
				{:else}
					Subir PDFs
				{/if}
			</button>
		</form>
		<button type="button" on:click={pegarTabla}>Pegar Tabla</button>
	</aside>
	<article>
		<Header
			status={exam.status}
			data={grades}
			type={exam?.type}
			name={exam?.expand.group.expand.course.name}
		/>
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
						<th scope="col">Nombres</th>
						<th scope="col">Apellidos</th>
						{#each items as pregunta, index}
							<th scope="col">P. {index + 1}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each grades as fila, i}
						<tr>
							<td>
								<button
									type="button"
									title="Borrar Fila"
									on:click={()=>{
										grades = grades.filter(d => d !== fila)
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
									name="code"
									placeholder="191-10-45494"
									autocomplete="off"
									bind:value={fila.code}
									on:keypress={(e) => {
										if (e.key === "-" || !isNaN(e.key))
											return;
										e.preventDefault();
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									name="fname"
									placeholder="Andrea Alejandra"
									autocomplete="off"
									bind:value={fila.fname}
								/>
							</td>
							<td>
								<input
									type="text"
									name="lname"
									placeholder="Apaza Abarca"
									autocomplete="off"
									bind:value={fila.lname}
								/>
							</td>
							{#each fila.n as n, j}
								<td>
									<input
										type="number"
										placeholder="0.00"
										bind:value={n}
										on:change={(e) => reducir(e, i, j)}
										on:click={(e) => e.target.select()}
										on:keypress={(e) => soloNumeros(e, i, j)}
									/>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
			<button
				type="button"
				class="le_button"
				on:click={() => {
					grades = [
						...grades,
						{
							code: "",
							fname: "",
							lname: "",
							n: Array(items.length).fill(0),
						},
					];
				}}
			>
				Añadir Fila
			</button>
		</main>
	</article>
</div>

<style>
	svg {
		display: block;
	}
	main > button {
		align-self: center;
	}
	.body {
		height: 100vh;
		display: flex;

		--padding: 16px;
		--radius: 8px;
	}
	article {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow: scroll;
	}
	main {
		display: flex;
		align-items: flex-start;
		flex: 1;
		padding: 0 32px 32px;
		flex-direction: column;
		gap: 8px;
		overflow: scroll; /* Para la tabla */
	}
	table {
		min-width: 100%;
	}
	th:nth-child(1) {
		width: 20px;
	}
	th:nth-child(2) {
		width: 20%;
	}
	th:nth-child(3) {
		width: 25%;
	}
	th:nth-child(4) {
		width: 25%;
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
		article {
			overflow: unset;
		}
	}
</style>
