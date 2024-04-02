<script>
	import Header from "$lib/components/Header.svelte"
	import Periodos from "$lib/components/Periodos.svelte"
	import Exam from "$lib/components/Exam.svelte"
	
	export let data
</script>

<svelte:head>
	<title>Admin | Exámenes</title>
</svelte:head>

<div class="body">
	<aside>
		<a href="/" class="logo">Askeladd</a>
		<Periodos />
	</aside>
	<article>
		<Header text="Admin | Evaluaciones" />
		<main>
			{#each data.exams as exam}
				<Exam {exam} />
			{/each}
		</main>
	</article>
</div>

<style>
	.body {
		height: 100vh;
		display: flex;
	}
	article {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	article>main {
		display: flex;
		align-items: stretch;
		flex: 1;
		padding: 0 32px 32px;
		flex-direction: column;
		gap: 8px;
		overflow: scroll;
	}
</style>