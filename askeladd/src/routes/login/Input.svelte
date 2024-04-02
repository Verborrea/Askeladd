<script>
	export let type, label, id, helper = null, error, value = ""
</script>

<div class="a">
	<div class="b">
		<input {type} {id} {value} name={id} required autocomplete="off">
		<label for={id}>{label}</label>
	</div>
	{#if error?.field === id}
		<small class="h_error">{error?.message}</small>
	{:else if helper}
		<small class="helper">{helper}</small>
	{/if}
</div>

<style>
	.b {
		position: relative;
	}
	small {
		font-size: 12px;
    	padding: 0 16px;
	}
	.helper {
		color: var(--text);
	}
	.h_error {
		color: var(--main1);
    	padding: 2px 16px;
	}
	input {
		color: var(--text);
		background: var(--tertiary);
		border: none;
		border-bottom: 2px solid var(--gray);
		padding: 12px 16px 0px;
		font-size: 16px;
		line-height: 18px;
		height: 54px;
		display: flex;
		align-items: flex-end;
		border-radius: 12px 12px 0 0;
		min-width: 320px;
	}
	input:focus {
		outline: none;
	}
	label {
		position: absolute;
		color: var(--text);
		top: 50%;
		transform: translateY(-50%);
		padding-left: 16px;
		pointer-events: none;
		transition: transform 0.2s, font-size 0.2s, color 0.2s;
	}
	input:focus,
	input:valid {
		border-color: var(--main1);
	}
	input:focus + label,
	input:valid + label {
		color: var(--main1);
		transform: translateY(-20px);
		font-size: 12px;
	}
	input::-ms-clear, input::-ms-reveal {
		display: none;
	}
	@media (max-width: 700px) {
		input {
			min-width: 288px;
		}
	}
</style>