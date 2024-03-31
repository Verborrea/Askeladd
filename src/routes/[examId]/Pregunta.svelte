<script>
	export let items, pregunta, currentIndex, text, so, pts, src

	const selectPregunta = () => {
		currentIndex = items.findIndex(item => item.id == pregunta.id)
		text = pregunta.text;
		so = pregunta.so;
		src = pregunta.src;
		pts = pregunta.pts;
	}
</script>

<a
	class="pregunta"
	href="?pregunta={pregunta.id}&content={encodeURIComponent(JSON.stringify(items))}"
	on:click|preventDefault={selectPregunta}
>
	<div class="content">
		<div class="text">
			{pregunta.text ?? "Pregunta en blanco"}
			<div class="gradient" />
		</div>
		<div class="info">
			<p>SO: {pregunta.so.join(", ")}</p>
			<p>{pregunta.pts} PTS</p>
		</div>
	</div>
</a>

<style>
	.pregunta,
	.content,
	.info,
	.pregunta::before {
		display: flex;
	}
	.pregunta {
		gap: 8px;
		background-color: var(--back);
		border-radius: 8px;
		align-items: center;
		padding: 12px;
		text-decoration: none;
		color: var(--text);
		cursor: grab;
	}
	.pregunta:hover {
		background-color: var(--secondary);
	}
	.pregunta:active {
		transform: scale(0.95);
	}
	.pregunta::before {
		counter-increment: preguntas;
		content: counter(preguntas);
		width: 34px;
		height: 34px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		border-radius: 10px;
		border: 2px solid var(--text);
		font-weight: 900;
	}
	.content {
		flex-direction: column;
		gap: 4px;
		line-height: 18px;
		flex: 1;
		overflow: hidden;
		font-size: 14px;
	}
	.info {
		justify-content: space-between;
		font-weight: 900;
	}
	.text {
		white-space: nowrap;
		position: relative;
	}
	p:nth-child(2) {
		color: var(--main1);
	}
	.gradient {
		position: absolute;
		background: linear-gradient(90deg, transparent, var(--back));
		height: 100%;
		width: 40px;
		right: 0;
		top: 0;
	}
	.pregunta:hover .gradient {
		background: linear-gradient(90deg, transparent, var(--secondary));
	}
</style>