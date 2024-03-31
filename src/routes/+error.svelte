<script>
	import { page } from "$app/stores"
	import Header from "./Header.svelte"
</script>

<svelte:head>
	<title>Askeladd - Error {$page.status}</title>
</svelte:head>

<Header is_error={true}/>
<main>
	<h1>Lo sentimos, parece que hubo un error :(</h1>
	<p>{$page.status}: {$page.error.message}</p>
</main>

<style>
	:global(html>body) {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	h1, p {
		color: var(--main1);
		text-align: left;
		width: min(100%, 1080px);
	}
	h1 {
		font-size: 82px;
	}
	p {
		font-weight: bold;
		font-size: 32px;
	}
	main {
		display: flex;
		gap: 16px;
		padding: 24px 32px;
		flex: 1 0 0;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	@media (max-width: 1000px) {
		main {
			padding: 24px 16px;
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
