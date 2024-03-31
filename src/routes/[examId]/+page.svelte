<script>
	import { fly } from "svelte/transition"
	import { error_message } from "$lib/stores"

	import EditExam from "./EditExam.svelte"
	import GradeExam from "./GradeExam.svelte"
	import UploadExam from "./UploadExam.svelte"
	import Metrics from "./Metrics.svelte"

	export let data, form

	$: status = form?.status ?? data.exam.status

	$: ( $error_message  = form?.message ?? '');
	$: if ($error_message != '') {
		setTimeout(function() {
			$error_message = ''
		}, 2000)
	}
</script>

<svelte:head>
	<title>
		{data.exam?.type} de {data.exam?.expand?.group.expand.course.name}
	</title>
</svelte:head>

{#if $error_message}
	<span class="error" transition:fly={{ y: -100, duration: 700 }}>
		{$error_message}
	</span>
{/if}

{#if status === 'En Blanco' || status === 'En Proceso'}
	<EditExam exam={data.exam} />
{:else if status === 'Calificando'}
	<GradeExam exam={data.exam} />
{:else if status === 'Digitalización'}
	<UploadExam exam={data.exam} />
{:else}
	<Metrics exam={data.exam} />
{/if}