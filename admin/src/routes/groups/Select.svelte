<script>
	export let list, selection = []
	
	const formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

	let options = [];
	let favDialog;

	const showModal = () => {
		if (selection.length > 0) {
			options = selection
		}
		favDialog.showModal();
	}

	const closeModal = () => {
		favDialog.close();
		options = []
	}

	const saveModal = () => {
		selection = options;
		closeModal();
	}
</script>


<dialog bind:this={favDialog}>
  <form>
    <h2>Profesores</h2>
		{#each list as option}
			<label>
				<input
					type="checkbox"
					name="options"
					value={option}
					bind:group={options}
				/>
				{option}
			</label>
		{/each}
    <div class="buttons">
      	<button class="secondary" type="button" on:click={closeModal}>Cancelar</button>
		<button class="le_button" type="button" on:click={saveModal}>Guardar</button>
    </div>
  </form>
</dialog>

<button class="top" type="button" on:click={showModal}>
	{#if selection.length > 2}
		{selection[0]}, {selection[1]} y más
	{:else if selection.length > 0}
		{formatter.format(selection)}
	{:else}
		Ningún profesor asignado
	{/if}
</button>

<style>
	.top {
		white-space: nowrap;
    	overflow: scroll;
	}
	dialog {
		background: var(--secondary);
		border: 0;
		border-radius: 16px;
		padding: 16px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: var(--text);
	}
	label {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	input {
		flex: 0;
		accent-color: var(--main1);
	}
	.buttons {
		display: flex;
		gap: 8px;
	}
	.buttons button {
		flex: 1;
	}
</style>