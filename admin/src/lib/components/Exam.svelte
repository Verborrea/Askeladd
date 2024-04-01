<script>
	export let exam;
</script>

<article>
	<header>
		{exam.expand.group.code}
	</header>
	<h2>{exam.expand.group.expand.course.name}</h2>
	<p>{exam.expand.group.expand.professors.map(p => p.lname + ' ' + p.fname).join(', ')}</p>
	<p>
		<span>{exam.type}</span>
		•
		<span
			class="status"
			class:white={exam.status === "En Blanco"}
			class:green={exam.status === "En Proceso"}
			class:red={exam.status === "Calificando"}
			class:blue={exam.status === "Digitalización"}
			class:black={exam.status === "Finalizado"}>{exam.status}</span
		>
	</p>
	<div class="buttons">
		<form action="?/preguntas" method="post">
			<input type="hidden" name="id" value={exam.id}>
			<button class="button" type="submit">Restaurar preguntas</button>
		</form>
		<form action="?/calificaciones" method="post">
			<input type="hidden" name="id" value={exam.id}>
			<button class="button gray" type="submit">Restaurar calificaciones</button>
		</form>
		<form action="?/archivos" method="post">
			<input type="hidden" name="id" value={exam.id}>
			<button class="button gray" type="submit">Restaurar archivos</button>
		</form>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		padding: 16px;
		gap: 12px;
		background: var(--secondary);
		border-radius: 16px;
		max-width: 750px;
	}
	header {
		font-weight: bold;
	}
	.buttons {
		display: flex;
		gap: 8px;
	}
	.button {
		padding: 6px 10px;
		border-radius: 12px;
		font-size: 16px;
		font-weight: normal;
		line-height: 20px;
		border: 2px solid var(--main1);
	}
	.button:hover {
		background: var(--text);
		border: 2px solid var(--text);
	}
	.button.gray {
		border: 2px solid var(--text);
		background-color: transparent;
		color: var(--text);
	}
	.button.gray:hover {
		background: var(--text);
		color: var(--back);
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
</style>