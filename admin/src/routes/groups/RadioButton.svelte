<script>
	export let list, selection = ''
	
	let options = '';
	let favDialog;

	function showModal() {
		if (selection.length > 0) {
			options = selection
		}
		favDialog.showModal();
	}

	function closeModal() {
		favDialog.close();
		options = []
	}

	function saveModal() {
		selection = options;
		closeModal();
	}
</script>

<dialog bind:this={favDialog}>
  <form>
    <h2>Cursos</h2>
		{#each list as option}
			<label>
				<input
					type="radio"
					name="options"
					value={option.code}
					bind:group={options}
				/>
				{option.code} - {option.name}
			</label>
		{/each}
    <div class="buttons">
      	<button class="secondary" type="button" on:click={closeModal}>Cancelar</button>
		<button class="le_button" type="button" on:click={saveModal}>Guardar</button>
    </div>
  </form>
</dialog>

<button type="button" on:click={showModal}>
{selection != '' ? selection : 'Ninguno'}
</button>

<style>
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