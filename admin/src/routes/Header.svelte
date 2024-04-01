<script>
    import Exit from "$lib/components/Exit.svelte";

</script>
<header>
	<h1 class="logo">Askeladd</h1>
	<form action="logout" method="post">
		<Exit text="Cerrar Sesión"/>
	</form>
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