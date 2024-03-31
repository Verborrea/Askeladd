<script>
	import Pregunta from "$lib/components/Pregunta.svelte"
	import Upload from "./Upload.svelte"
	import Header from "$lib/components/Header.svelte"
	import { enhance } from "$app/forms"
	
	export let exam

	let finalizarLoading = false
	let items = exam.content;

	const finalizar = () => {
		finalizarLoading = true
		return async ({ update }) => {update(); finalizarLoading = false;}
	}
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
		<form action="?/finalizar" method="post" use:enhance={finalizar}>
			<button type="submit" disabled={finalizarLoading}>
				{#if finalizarLoading}
					Cargando...
				{:else}
					Finalizar
				{/if}
			</button>
		</form>
	</aside>
	<form>
		<Header type={exam?.type} name={exam?.expand.group.expand.course.name} />
		<main>
			<article>
				<h3 class="title">Subir Digitalizaciones</h3>
				<Upload id={exam?.id} title="Nota más baja" name="lowest" filename={exam?.lowest} />
				<Upload id={exam?.id} title="Nota promedio" name="average" filename={exam?.average} />
				<Upload id={exam?.id} title="Nota más alta" name="highest" filename={exam?.highest} />
			</article>
		</main>
	</form>
</div>

<style>
	main>article {
		background: var(--tertiary);
		width: 100%;
		height: 100%;
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		position: relative;
		flex-direction: row;
		gap: 16px;
		padding: 16px;
		box-sizing: border-box;
	}
	h3.title {
		position: absolute;
		left: 16px;
		top: 16px;
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
	}
	form>main {
		display: flex;
		align-items: flex-start;
		flex: 1;
		padding: 0 32px 32px;
		flex-direction: column;
		gap: 8px;
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
		main>article {
			flex-direction: column;
			align-items: stretch
		}
		h3.title {
			position: static;
		}
	}
</style>