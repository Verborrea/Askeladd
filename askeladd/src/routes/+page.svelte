<script>
	import Header from "./Header.svelte"
	import Periodos from "$lib/components/Periodos.svelte"
	import ExamList from "$lib/components/ExamList.svelte"

	export let data;
</script>

<svelte:head>
	<title>Askeladd - Inicio</title>
</svelte:head>

<Header />
<h1>Bienvenid{data.sex ? "a" : "o"} {data.nombre}</h1>
<p>
	Bienvenid{data.sex ? "a" : "o"} a Askeladd. Seleccione un examen en blanco para
	empezar. Puede filtrar los examenes según su periodo académico en la barra a su
	izquierda.
</p>
<main>
	<Periodos periodos={data.periodos} />
	<ExamList exams={data.exams} />
</main>

<style>
	:global(html>body) {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	h1 {
		text-align: center;
		padding: 0 16px 16px;
		color: var(--main1);
	}
	p {
		text-align: center;
		padding: 0 32px;
		font-size: 18px;
		color: var(--text);
	}
	main {
		display: flex;
		gap: 16px;
		padding: 24px 32px;
		flex: 1 0 0;
		overflow: hidden;
	}
	@media (max-width: 1000px) {
		main {
			padding: 24px 16px;
		}
		p {
			padding: 0 16px;
		}
	}
	@media (max-width: 850px) {
		main {
			flex-direction: column;
			align-items: stretch;
			overflow: initial;
		}
	}
</style>
