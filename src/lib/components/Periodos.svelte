<!--
	Lista de Periodos: Cada elementos de la lista es un botón,
	al presionarlo, se altera el store `semester`, que filtra
	los examenes en `ExamList.svelte`
--->

<script>
	import { semester } from "$lib/stores"
		
	export let periodos = []
</script>

<ul>
	{#each periodos as periodo}
		<li>
			<button type="button" class:selected={$semester === periodo} on:click={() => $semester = periodo}>
				{periodo}
				<svg class="HoverArrow" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
					<g fill-rule="evenodd">
						<path class="HoverArrow__linePath" d="M0 5h7"></path>
						<path class="HoverArrow__tipPath" d="M1 1l4 4-4 4"></path>
					</g>
				</svg>
			</button>
		</li>
	{/each}
</ul>

<style>
	ul {
		min-width: 300px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 12px;
		background: var(--tertiary);
		border-radius: 16px;
    	overflow: scroll;
	}
	@media (max-width: 850px) {
		ul {
			height: auto;
		}
	}
	button {
		width: 100%;
		padding: 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 18px;
		line-height: 24px;
		border: none;
		border-radius: 8px;
		background-color: var(--back);
		color: var(--text);
	}
	button.selected {
		background-color: var(--main1);
		color: var(--back);
	}
	button:hover {
		background-color: var(--secondary);
	}
	button.selected:hover {
		background-color: var(--main2);
	}

	.HoverArrow {
		stroke-width: 2px;
		fill: none;
		stroke: currentColor;
		margin-left: 5px;
	}
	.HoverArrow__linePath, .HoverArrow__tipPath  {
		transition: all 0.25s ease;
	}
	.HoverArrow__linePath {
		opacity: 0;
	}
	button:hover .HoverArrow__linePath {
		opacity: 1;
	}
	button:hover .HoverArrow__tipPath {
		transform: translateX(3px);
	}
</style>