<script>
	export let text, link = false
</script>

{#if link}
	<a href="/" class="exit">
		<p>{text}</p>
		<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20">
			<path fill="var(--text)" d="M4.55975 17.1694C4.08082 17.1694 3.67289 17.0009 3.33596 16.664C2.99903 16.327 2.83057 15.9191 2.83057 15.4402V4.55975C2.83057 4.08082 2.99903 3.67289 3.33596 3.33596C3.67289 2.99903 4.08082 2.83057 4.55975 2.83057H10.0398V4.55975H4.55975V15.4402H10.0398V17.1694H4.55975ZM13.4352 13.7391L12.2083 12.5222L13.8659 10.8645H7.96011V9.13538H13.8659L12.2083 7.47777L13.4352 6.26082L17.1694 9.99996L13.4352 13.7391Z"/>
		</svg>
	</a>
{:else}
	<button class="exit" type="submit">
		<p>{text}</p>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4.55975 17.1694C4.08082 17.1694 3.67289 17.0009 3.33596 16.664C2.99903 16.327 2.83057 15.9191 2.83057 15.4402V4.55975C2.83057 4.08082 2.99903 3.67289 3.33596 3.33596C3.67289 2.99903 4.08082 2.83057 4.55975 2.83057H10.0398V4.55975H4.55975V15.4402H10.0398V17.1694H4.55975ZM13.4352 13.7391L12.2083 12.5222L13.8659 10.8645H7.96011V9.13538H13.8659L12.2083 7.47777L13.4352 6.26082L17.1694 9.99996L13.4352 13.7391Z" fill="var(--text)"/>
		</svg>				
	</button>
{/if}

<style>
	.exit {
		gap: 12px;
		display: flex;
		align-items: center;
		padding: 6px 10px;
		font-size: 16px;
		border-radius: 12px;
		border: 2px solid var(--text);
		color: var(--text);
		background: transparent;
	}
	.exit:focus,
	.exit:hover {
		background: var(--secondary);
	}
	.exit>svg {
		display: block;
	}

	@media (max-width: 1000px) {
		p {
			display: none;
		}
		.exit {
			border-radius: 8px;
			padding: 6px 8px;
		}
	}
</style>