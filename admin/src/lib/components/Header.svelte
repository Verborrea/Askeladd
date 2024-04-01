<script>
	import { enhance } from "$app/forms";
    import Exit from "$lib/components/Exit.svelte";

	export let text, isClean = () => true;

	let saveExamLoading = false

	const saveExam = ({ cancel }) => {
		saveExamLoading = true
		if (!isClean()) {
			cancel();
			return async () => saveExamLoading = false;
		}
		return async ({ update }) => {update(); saveExamLoading = false;}
	}
</script>

<header>
	<h1 class="title">{text}</h1>
	<div class="flex">
		<Exit text="Salir" link="true" />
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
</style>