<script>
	import { page } from "$app/stores"
    import Exit from "$lib/components/Exit.svelte"

	export let data, type, name, status, isClean = () => true, sendFiles

	let saveExamLoading = false

	const saveExam = async () => {
		saveExamLoading = true

		await sendFiles()
		
		if (!isClean()) {
			saveExamLoading = false
			return
		}

		const formData = new FormData()

		formData.append('data', JSON.stringify(data))
		formData.append('status', "En Proceso")

		await fetch($page.url.origin + $page.url.pathname + '?/saveExam', {
			method: 'POST',
			body: formData
		})

		saveExamLoading = false
	}
</script>

<header>
	<h1 class="title">{type} de {name}</h1>
	<div class="flex">
		<button type="button" class="button red" on:click={saveExam} disabled={saveExamLoading}>
			<input type="hidden" name="status" value={status} />
			<input type="hidden" name="data" value={JSON.stringify(data)} />
			{#if saveExamLoading}
				<span>Guardando</span>
				<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
			{:else}
				<span>Guardar</span>
				<svg height="20" viewBox="0 -960 960 960" width="20">
					<path fill="var(--back)" d="M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h426q14.222 0 27.111 5Q682-806 693-795l102 102q11 11 16 23.889T816-642v426q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm264-108q45 0 76.5-31.5T588-360q0-45-31.5-76.5T480-468q-45 0-76.5 31.5T372-360q0 45 31.5 76.5T480-252ZM300-552h264q15.3 0 25.65-10.325Q600-572.65 600-587.912v-71.825Q600-675 589.65-685.5 579.3-696 564-696H300q-15.3 0-25.65 10.325Q264-675.35 264-660.088v71.825Q264-573 274.35-562.5 284.7-552 300-552Z"/>
				</svg>
			{/if}
		</button>
		<Exit text="Regresar" link="true" />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 16px 32px;
		align-items: center;
		color: var(--main1);
	}
	.flex {
		display: flex;
		gap: 12px;
		align-items: center;
	}
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 6px;
		font-size: 16px;
		padding: 6px 12px;
		border-radius: 12px;
		text-decoration: none;
		border: 2px solid var(--text);
		background: transparent;
		color: var(--text);
	}
	.button:hover, .button:active {
		background: var(--text);
	}
	.button.red {
		border: 2px solid var(--main1);
		background-color: var(--main1);
		color: var(--back);
	}
	.button.red:hover, .button.red:focus {
		border: 2px solid var(--main2);
		background-color: var(--main2);
	}
	@media (max-width: 1080px) {
		.button span {
			display: none;
		}
	}
	@media (max-width: 850px) {
		header {
			padding: 16px;
		}
	}
</style>