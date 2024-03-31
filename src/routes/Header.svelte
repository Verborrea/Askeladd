<script>
	import Exit from "$lib/components/Exit.svelte"

	export let is_error = false
</script>

<header>
	<a href="/"><h1 class="logo">Askeladd</h1></a>
	{#if !is_error}
		<form action="logout" method="post">
			<Exit text="Cerrar Sesión" />
		</form>
	{/if}
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 32px;
	}
	@media (max-width: 1000px) {
		header {
			padding: 16px;
		}
	}
</style>
