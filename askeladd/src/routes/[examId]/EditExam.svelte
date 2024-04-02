<script>
	export let exam

	import { dndzone } from "svelte-dnd-action"
	import { flip } from "svelte/animate"
	import { deserialize } from "$app/forms"
	import { page } from "$app/stores"
	import { parseOutcomes, findHighestId, compressImage } from "$lib/utils"
	import { error_message } from "$lib/stores"
	import EditHeader from "./EditHeader.svelte"
	import Pregunta from "./Pregunta.svelte"

	const flipDurationMs = 150;
	const dropTargetStyle = { border: "none" };

	let currentIndex
	let subirNotasLoading = false
	let text, so = [], pts, src
	let uploading = false
	let items = exam.content
	let outcomes = parseOutcomes(exam.expand.group.expand.course.outcomes)
	let images_to_add = []
	let images_to_delete = []

	function handleSort(e) {
		items = e.detail.items;
	}

	function transformDraggedElement(draggedEl, data, index) {
		draggedEl.querySelector(".pregunta").style.transform = "rotate(5deg)";
		draggedEl.querySelector(".pregunta").style.opacity = "0.75";
	}

	const addPregunta = () => {
		const highestId = findHighestId(items);

		items = [...items, {
			id: highestId + 1,
			text: "Pregunta en blanco",
			src: "",
			so: outcomes.map(so => so.id),
			pts: 0
		}]

		currentIndex = items.length - 1;

		text = items[currentIndex].text;
		src = items[currentIndex].src;
		so = items[currentIndex].so;
		pts = items[currentIndex].pts;
	}

	const deletePregunta = () => {
		// Borrar la imagen asociada a dicha pregunta si tiene
		if (items[currentIndex].src !== "") {
			deleteImage()
		}
		items = items.slice(0, currentIndex).concat(items.slice(currentIndex + 1));
		currentIndex = undefined;
		const highestIndex = items.length - 1;
		if (highestIndex !== -1) {
			currentIndex = highestIndex;
			text = items[currentIndex].text;
			src = items[currentIndex].src;
			so = items[currentIndex].so;
			pts = items[currentIndex].pts;
		}
	}

	const savePregunta = (e) => {
		// asegurarse de que al menos se marcó un SO:
		if (so.length === 0) {
			so = [e.target.value]
			$error_message = 'Necesita marcar al menos un Student Outcome'
			return;
		}

		// asegurarse de que la pregunta no esté en blanco
		if (text.trim().length === 0) {
			$error_message = 'No pueden haber preguntas en blanco'
			return;
		}

		// guardar pregunta
		items[currentIndex] = {
			id: items[currentIndex].id,
			text,
			so,
			src,
			pts: Number(pts)
		}
	}

	const sendFiles = async () => {
		const formData = new FormData();

		// subir las nuevas y borrar las viejas del servidor
		formData.append('images_to_delete', JSON.stringify(images_to_delete))

		for (let file of images_to_add.map(i => i.img)) {
			formData.append('images', file);
		}

		const response = await fetch($page.url.origin + $page.url.pathname + '?/sendFile', {
			method: 'POST',
			body: formData
		})

		const results = await deserialize(await response.text())

		const file_names = results.data.file_names

		let file_name_counter = 0
		for (let item of items) {
			if (item.src.substr(0,5) === "blob:") {
				item.src = file_names[file_name_counter]
				file_name_counter += 1
			}
		}

		src = items[currentIndex].src

		images_to_delete = []
		images_to_add = []
	}

	const subirNotas = async () => {
		subirNotasLoading = true

		if (images_to_add.length || images_to_delete.length) {
			await sendFiles()
		}

		const formData = new FormData()

		formData.append('items', JSON.stringify(items))

		const response = await fetch($page.url.origin + $page.url.pathname + '?/subirNotas', {
			method: 'POST',
			body: formData
		})

		const results = await deserialize(await response.text())

		if (results.status === 400) {
			if (items.find(i => i.pts === 0)) {
				$error_message = 'No pueden haber preguntas vacías'
			} else {
				$error_message = 'Las preguntas deben sumar 20 puntos'
			}
		} else {
			location.reload()
		}

		subirNotasLoading = false
	}

	const soloNumeros = (e) => {
		if (e.key === 'Enter') reducir(e)
		if (isNaN(e.target.value + e.key)) e.preventDefault()
	}

	const reducir = (e) => {
		let value = Number(e.target.value)

		// Redondear a dos decimales si hay más de dos decimales
		if (e.target.value.includes('.')) {
			value = value.toFixed(2)
		}

		let total = Math.round(value * 100)

		const suma_resto = items.slice(0, currentIndex).concat(items.slice(currentIndex + 1))
		.reduce((a, o) => { return a + (o.pts * 100 || 0) }, 0)

		pts = (total > 2000 - suma_resto) ? (2000 - suma_resto) / 100 : total / 100;

		savePregunta()
	}

	const isClean = () => {
		
		for (const item of items) {
			if (item.so.length === 0) {
				$error_message = 'Todas las preguntas deben calificar algún Student Outcome'
				return false;
			}
		}
		for (const item of items) {
			if (item.pts === 0) {
				$error_message = 'No pueden haber preguntas sin puntaje'
				return false;
			}
		}
		return true;
	}

	async function handleImage(event) {
		const file = event.target.files[0];
		if (file) {
			try {
				uploading = true;

				const compressedFile = await compressImage(file, 600);
				const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";

				images_to_add.push({
					pregunta: currentIndex,
					img: new File([compressedFile], newFileName, { type: 'image/webp' })
				})

				src = URL.createObjectURL(compressedFile)

				savePregunta()
			} catch (error) {
				console.error(error);
			} finally {
				uploading = false;
				event.target.value = "" // Resetear el input en caso de subir la misma imagen
			}
		}
	}

	function deleteImage() {
		// Eliminar la imagen (si hay) de images_to_add			
		let indexToDelete = images_to_add.findIndex(img => img.p === currentIndex);
		if (indexToDelete !== -1) {
			images_to_add.splice(indexToDelete, 1);
		} else {
			// Si la imagen borrada no fue recién añadida, debe ser borrada de
			// la BD, así que la añadimos a este array para luego borrarlas
			images_to_delete.push(items[currentIndex].src)
		}
		// Dejar el src general y de la pregunta en blanco
		src = undefined
		items[currentIndex].src = ""
	}
</script>

<div class="body">
	<aside>
		<a href="/" class="logo">Askeladd</a>
		<h2 class="title">Preguntas</h2>
		{#if items.length}
			<ul use:dndzone={{ items, flipDurationMs, dropTargetStyle, transformDraggedElement }}
				on:consider={handleSort}
				on:finalize={handleSort}
			>
				{#each items as pregunta (pregunta.id)}
					<li animate:flip={{ duration: flipDurationMs }}>
						<Pregunta {items} {pregunta}
							bind:currentIndex={currentIndex} 
							bind:text={text}
							bind:so={so}
							bind:src={src}
							bind:pts={pts}
						/>
					</li>
				{/each}
			</ul>
		{/if}
		<button type="button" on:click={addPregunta}>Añadir pregunta</button>
		<button type="button" on:click={subirNotas} disabled={subirNotasLoading}>
			{#if subirNotasLoading}
				Cargando...
			{:else}
				Subir notas
			{/if}
		</button>
	</aside>
	<article>
		<EditHeader
			{isClean}
			{sendFiles}
			images_to_add = {images_to_add.length}
			images_to_delete = {images_to_delete.length}
			status={exam.status}
			data={items}
			type={exam.type}
			name={exam.expand.group.expand.course.name}
		/>
		<main>
			<form on:submit|preventDefault={savePregunta}>
				{#if currentIndex !== undefined}
				<header>
					<h3>Pregunta {currentIndex + 1}:</h3>
					<div class="delete">
						<button class="le_button" type="button" on:click={deletePregunta}>Eliminar</button>
					</div>
				</header>
				<section>
					<div class="input-container">
						<label for="text"><h4>Enunciado:</h4></label>
						<textarea name="text" id="text" bind:value={text} rows="6" on:input={savePregunta} autocomplete="off" />
					</div>
					<input type="file" hidden name="img" id="img" on:change={handleImage}>
					{#if src}
						<img src={src.substr(0,5) === "blob:" ? src : `http://127.0.0.1:8090/api/files/xohdd7kjsywnebx/${exam?.id}/${src}`} alt="Imagen de la pregunta {currentIndex}">
						<button type="button" class="le_button" on:click={deleteImage}>
							Borrar Imagen
						</button>
					{:else}
						<label for="img" type="button" class="le_button">
							{uploading ? "Subiendo" : "Añadir imagen (opcional)"}
						</label>
					{/if}
					<div class="input-container">
						<h4 for="so">Student Outcomes:</h4>
						<ul>
							{#each outcomes as outcome}
								<li>
									<input type="checkbox" name="so" id="so-{outcome.id}"
										value={outcome.id} bind:group={so} on:change={savePregunta}
									/>
									<label for="so-{outcome.id}">
										<strong>SO{outcome.id}:</strong> {outcome.description}
									</label>
								</li>
							{/each}
						</ul>
					</div>
					<div class="puntaje">
						<label for="pts"><h4>Puntaje:</h4></label>
						<input
							type="text"
							id="pts"
							name="pts"
							autocomplete="off"
							bind:value={pts}
							on:change={reducir}
							on:keypress={soloNumeros}
						/>
					</div>
				</section>
				{:else}
				<p>Seleccione una pregunta para empezar</p>
				{/if}	
			</form>
		</main>
	</article>
</div>

<style>
	img {
		display: block;
		width: 75%;
		border-radius: 12px;
	}
	.body {
		position: relative;
		height: 100vh;
		display: flex;

		--padding: 16px;
		--radius: 8px;
	}
	.delete {
		display: flex;
		gap: 12px;
		align-items: center;
	}
	article {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	main {
		display: flex;
		justify-content: center;
		flex: 1;
		gap: 32px;
		padding: 0 32px 32px;
		overflow: scroll;
	}
	main>form {
		background-color: var(--tertiary);
		color: var(--text);
		border-radius: 16px;
		flex: 1;
		overflow: scroll;
		max-width: 560px;
	}
	main>form>header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px;
	}
	section {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 0 16px 16px;
		align-items: center;
	}
	.input-container {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}
	.input-container>ul {
		gap: 4px;
		display: flex;
		flex-direction: column;
	}
	.input-container li {
		color: var(--text);
	}
	.input-container input[type="checkbox"] {
		accent-color: var(--main1);
	}
	textarea, input[type="text"] {
		width: 100%;
		color: var(--text);
		background: var(--back);
		border: none;
		border-radius: 12px;
		padding: 8px 12px;
		font-size: 16px;
		line-height: 19px;
		box-sizing: border-box;
	}
	textarea:focus, textarea:hover,
	input[type="text"]:focus, input[type="text"]:hover {
		outline: 2px solid var(--main1);
	}
	.puntaje {
		align-self: end;
		display: flex;
		gap: 8px;
		align-items: center;
	}
	.puntaje>input {
		text-align: end;
    	width: 100px;
	}
	form>p {
		color: var(--text);
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		text-align: center;
		font-size: 16px;
	}
	@media (max-width: 850px) {
		.body {
			flex-direction: column;
		}
		aside {
			width: auto;
		}
		main {
			padding: 0 16px 16px;
		}
	}
</style>