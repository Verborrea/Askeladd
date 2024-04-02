<script>
	import { page } from '$app/stores'
	import { periods } from '$lib/utils.js'
		
	let semester
	$: (semester = $page.url.searchParams.get("semester") ?? '')
</script>

<nav>
	<ul>
		<li>
			<a href="/exams" aria-current={!semester}>
				Todos los periodos
				<svg class="HoverArrow" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
					<g fill-rule="evenodd">
						<path class="HoverArrow__linePath" d="M0 5h7"></path>
						<path class="HoverArrow__tipPath" d="M1 1l4 4-4 4"></path>
					</g>
				</svg>
			</a>
		</li>
		{#each periods as sem}
			<li>
				<a
					href={`?semester=${sem}`}
					aria-current={sem === semester}
				>
					{sem}
					<svg class="HoverArrow" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
						<g fill-rule="evenodd">
							<path class="HoverArrow__linePath" d="M0 5h7"></path>
							<path class="HoverArrow__tipPath" d="M1 1l4 4-4 4"></path>
						</g>
					</svg>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 8px;
    	overflow: scroll;
	}
	@media (max-width: 850px) {
		ul {
			height: auto;
		}
	}
	a {
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
	a:hover, a:focus {
		outline: none;
		background-color: var(--text);
		color: var(--back);
	}
	a[aria-current="true"] {
		background-color: var(--main1);
		color: var(--back);
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

	a:focus .HoverArrow__linePath,
	a:hover .HoverArrow__linePath,
	a:hover .HoverArrow__linePath {
		opacity: 1;
	}

	a:focus .HoverArrow__tipPath,
	a:hover .HoverArrow__tipPath,
	a:hover .HoverArrow__tipPath {
		transform: translateX(3px);
	}
</style>