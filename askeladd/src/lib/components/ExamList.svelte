<!-- Lista de examenes en la página de inicio -->

<script>
	import { semester } from "$lib/stores"

	export let exams

	let filtered_list = []

	// Cada que el store $semester cambie, los examenes mostrados en pantalla
	// también lo harán.
	$: if ($semester === 'Todos los periodos') {
		filtered_list = exams
	} else {
		filtered_list = exams.filter(e => e.expand.group.semester === $semester)
	}
</script>

{#if filtered_list.length > 0}
<ul>
	{#each filtered_list as exam}
		<li>
			<a href="/{exam.id}" title="Ir al examen">
				<header>
					{exam.expand.group.code}
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M4.98328 21.55C4.27786 21.55 3.67928 21.3042 3.18755 20.8124C2.69582 20.3207 2.44995 19.7221 2.44995 19.0167V4.98335C2.44995 4.27335 2.69582 3.67085 3.18755 3.17585C3.67928 2.68085 4.27786 2.43335 4.98328 2.43335H11.6V4.98335H4.98328V19.0167H19.0166V12.4H21.5666V19.0167C21.5666 19.7221 21.3191 20.3207 20.8241 20.8124C20.3291 21.3042 19.7266 21.55 19.0166 21.55H4.98328ZM10.2708 15.5L8.51663 13.7292L17.2708 4.98335H13.1833V2.43335H21.5666V10.8167H19.0166V6.74582L10.2708 15.5Z" fill="var(--text)" />
					</svg>
				</header>
				<main>
					<h2>{exam.expand.group.expand.course.name}</h2>
					<p>
						<span>{exam.type}</span>
						•
						<span
							class="status"
							class:white={exam.status === "En Blanco"}
							class:green={exam.status === "En Proceso"}
							class:red={exam.status === "Calificando"}
							class:blue={exam.status === "Digitalización"}
							class:black={exam.status === "Finalizado"}
							>{exam.status}</span
						>
					</p>
				</main>
			</a>
		</li>
	{/each}
</ul>
{:else}
<p class="msg">No hay examenes para mostrar de momento :(</p>
{/if}

<style>
	ul {
		list-style: none;
		display: grid;
		gap: 16px;
		grid-template-columns: 1fr 1fr 1fr;
		flex: 1;
		overflow: scroll;
		align-self: flex-start;
   		max-height: 100%;
	}
	a {
		background-color: var(--tertiary);
		height: 200px;
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-decoration: none;
		color: var(--text);
	}
	header,
	main {
		display: flex;
	}
	header {
		justify-content: space-between;
		font-size: 18px;
		font-weight: 900;
		letter-spacing: -0.04em;
		padding: 16px 16px 0;
	}
	main {
		flex-direction: column;
		gap: 8px;
		padding: 0 16px 16px;
		transition: padding 0.2s ease-out;
	}
	svg {
		opacity: 0;
		transition: opacity 0.2s ease-out;
	}
	a:hover main {
		padding-bottom: 24px;
	}
	a:hover svg {
		opacity: 1;
	}
	.status {
		border-radius: 6px;
		padding: 3px 8px;
	}
	.white {
		color: #696969;
		background: white;
	}
	.red {
		color: #ff4251;
		background: #ffd1d5;
	}
	.green {
		color: #18a36a;
		background: #c9ffc1;
	}
	.blue {
		color: #2776ff;
		background: #cad5ff;
	}
	.black {
		color: #ffffff;
		background: #282828;
	}
	.msg {
		flex: 1;
		text-align: center;
		align-self: center;
		font-size: 18px;
	}
	@media (max-width: 1100px) {
		ul {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 850px) {
		ul {
			align-self: auto;
		}
	}
	@media (max-width: 550px) {
		ul {
			grid-template-columns: 1fr;
		}
	}
</style>
