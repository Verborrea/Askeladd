<script>
	import { enhance, deserialize } from "$app/forms";
	import { page } from "$app/stores";

	export let id, title, name, filename;

	let dragover = false;
	let dragCounter = 0;
	let cargando;

	function handleFileChange(event) {
		const fileInput = event.target;
		const file = fileInput.files[0];

		if (file && file.type === "application/pdf") {
			sendFile(file);
		}
	}

	async function sendFile(file) {
		const formData = new FormData();
		formData.append(name, file);
		formData.append("type", name);

		const response = await fetch(
			$page.url.origin + $page.url.pathname + "?/digitalizar",
			{
				method: "POST",
				body: formData,
			},
		);

		const result = deserialize(await response.text());

		filename = result.data.filename

		// filename = result.data.exam[result.data.type];
	}

	function handleDrop(event) {
		event.preventDefault();
		dragCounter = 0;
		dragover = false;
		const file = event.dataTransfer.files[0];
		if (file && file.type === "application/pdf") {
			sendFile(file);
		}
	}

	function handleDragEnter(event) {
		dragCounter++;
		dragover = true;
	}

	function handleDragLeave(event) {
		dragCounter--;
		if (dragCounter === 0) {
			dragover = false;
		}
	}
</script>

{#if cargando}
	<article class="container">
		<h2>{title}</h2>
		<div class="lds-ring big-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<p>{cargando}</p>
	</article>
{:else if filename}
	<article class="container file">
		<h2>{title}</h2>
		<svg width="42" height="53" viewBox="0 0 42 53" fill="none">
			<path
				d="M10.5 42.4H31.5V37.1H10.5V42.4ZM10.5 31.8H31.5V26.5H10.5V31.8ZM5.25 53C3.80625 53 2.57031 52.481 1.54219 51.4431C0.514062 50.4052 0 49.1575 0 47.7V5.3C0 3.8425 0.514062 2.59479 1.54219 1.55687C2.57031 0.518958 3.80625 0 5.25 0H26.25L42 15.9V47.7C42 49.1575 41.4859 50.4052 40.4578 51.4431C39.4297 52.481 38.1937 53 36.75 53H5.25ZM23.625 18.55H36.75L23.625 5.3V18.55Z"
				fill="var(--text)"
			/>
		</svg>
		<p class="file">{filename}</p>
		<div class="buttons">
			<a
				href="http://127.0.0.1:8090/api/files/xohdd7kjsywnebx/{id}/{filename}"
				target="_blank"
				class="button">Abrir</a
			>
			<form action="?/deleteFile" method="post" use:enhance>
				<input type="hidden" name="name" value={name} />
				<button class="button" type="submit">Borrar</button>
			</form>
		</div>
	</article>
{:else}
	<article
		class="container"
		on:dragover={(e) => {
			e.preventDefault();
		}}
		on:drop={handleDrop}
		on:dragenter={handleDragEnter}
		on:dragleave={handleDragLeave}
		class:dragover
	>
		<h2>{title}</h2>
		<svg width="106" height="77" viewBox="0 0 106 77" fill="none">
			<path
				d="M48.25 76.5H26.875C19.6708 76.5 13.5156 74.0062 8.40937 69.0187C3.30312 64.0312 0.75 57.9354 0.75 50.7313C0.75 44.5562 2.61042 39.0542 6.33125 34.225C10.0521 29.3958 14.9208 26.3083 20.9375 24.9625C22.9167 17.6792 26.875 11.7812 32.8125 7.26875C38.75 2.75625 45.4792 0.5 53 0.5C62.2625 0.5 70.1198 3.72604 76.5719 10.1781C83.024 16.6302 86.25 24.4875 86.25 33.75C91.7125 34.3833 96.2448 36.7385 99.8469 40.8156C103.449 44.8927 105.25 49.6625 105.25 55.125C105.25 61.0625 103.172 66.1094 99.0156 70.2656C94.8594 74.4219 89.8125 76.5 83.875 76.5H57.75V42.5375L65.35 49.9L72 43.25L53 24.25L34 43.25L40.65 49.9L48.25 42.5375V76.5Z"
				fill="var(--text)"
			/>
		</svg>
		<input
			type="file"
			accept=".pdf"
			hidden
			{name}
			id={name}
			on:change={handleFileChange}
		/>
		<p>
			{#if dragover}
				Sueltelo aquí
			{:else}
				<label for={name}>Seleccione un archivo</label> o arrástrelo aquí
			{/if}
		</p>
	</article>
{/if}

<style>
	.container {
		padding: 16px;
		background: var(--back);
		border-radius: 16px;
		text-align: center;
		max-width: 200px;
		gap: 16px;
		flex: 1 0 0;
	}
	.container,
	.buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.dragover {
		background: var(--text);
	}
	label {
		color: var(--main1);
		font-weight: 900;
	}
	p {
		color: var(--text);
		font-weight: 500;
	}
	p.file {
		color: var(--text);
		align-self: normal;
		word-break: break-word;
	}
	h2 {
		font-size: 20px;
	}
	.buttons {
		align-items: stretch;
		align-self: stretch;
		gap: 8px;
	}
	.button {
		padding: 6px 12px;
		border-radius: 8px;
		line-height: 20px;
		font-size: 14px;
		width: 100%;
		box-sizing: border-box;
		font-weight: 400;
	}
	@media (max-width: 850px) {
		.container {
			max-width: unset;
		}
	}
</style>
