<script>
	import Header from "./Header.svelte";
</script>

<svelte:head>
	<title>Askeladd Admin</title>
</svelte:head>

<Header />
<h1>Bienvenido Administrador</h1>
<main>
	<nav>
		<ul>
			<li>
				<a href="/courses">
					<div>Cursos</div>
					<svg id="courses" width="160" height="131" viewBox="0 0 160 131" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M75 9.5C75 7.01489 76.9589 5 79.375 5H105.625C108.041 5 110 7.01489 110 9.5V23H75V9.5Z" fill="var(--svg-color)"/>
						<path d="M75 41H110V95H75V41Z" fill="var(--svg-color)"/>
						<path d="M75 113V126.5C75 128.985 76.9589 131 79.375 131H105.625C108.041 131 110 128.985 110 126.5V113H75Z" fill="var(--svg-color)"/>
						<path d="M31.2469 4.34592C31.886 1.9459 34.3384 0.521486 36.7239 1.16467L62.6425 8.1527C65.0281 8.79589 66.4441 11.2633 65.805 13.6633L62.3331 26.7011L27.775 17.3837L31.2469 4.34592Z" fill="var(--svg-color)"/>
						<path d="M23.1458 34.7674L57.704 44.0847L43.8164 96.2358L9.25831 86.9184L23.1458 34.7674Z" fill="var(--svg-color)"/>
						<path d="M4.62914 104.302L1.15726 117.34C0.51815 119.74 1.93416 122.207 4.31973 122.85L30.2383 129.838C32.6239 130.482 35.0763 129.057 35.7154 126.657L39.1873 113.619L4.62914 104.302Z" fill="var(--svg-color)"/>
						<path d="M124 9.5C124 7.01489 126.015 5 128.5 5H155.5C157.985 5 160 7.01489 160 9.5V23H124V9.5Z" fill="var(--svg-color)"/>
						<path d="M124 41H160V95H124V41Z" fill="var(--svg-color)"/>
						<path d="M124 113V126.5C124 128.985 126.015 131 128.5 131H155.5C157.985 131 160 128.985 160 126.5V113H124Z" fill="var(--svg-color)"/>
					</svg>
				</a>
			</li>
			<li>
				<a href="/users">
					<div>Docentes</div>
					<svg id="user" width="74" height="89" viewBox="0 0 74 89" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M49.6431 42.2163C55.8824 38.103 60 31.0322 60 23C60 10.2974 49.7025 0 37 0C24.2975 0 14 10.2974 14 23C14 31.0322 18.1176 38.103 24.3569 42.2163C10.1482 47.3818 0 61.0059 0 77C0 78.2642 0.0633545 79.5137 0.187134 80.7451C11.3468 86.0386 23.8275 89 37 89C50.1725 89 62.6532 86.0386 73.8129 80.7451C73.9366 79.5137 74 78.2642 74 77C74 61.0059 63.8518 47.3818 49.6431 42.2163Z" fill="var(--svg-color)"/>
					</svg>
				</a>
			</li>
			<li>
				<a href="/groups">
					<div>Asignar cursos</div>
					<svg id="group" width="155" height="129" viewBox="0 0 155 129" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M95.7812 61.1899C104.803 55.228 110.757 44.9793 110.757 33.3371C110.757 14.9254 95.8672 0 77.5 0C59.1329 0 44.2432 14.9254 44.2432 33.3371C44.2432 44.9793 50.197 55.228 59.2188 61.1899C38.6737 68.677 24 88.4242 24 111.607C24 113.439 24.0916 115.25 24.2706 117.035C40.4069 124.708 58.4533 129 77.5 129C96.5467 129 114.593 124.708 130.729 117.035C130.908 115.25 131 113.439 131 111.607C131 88.4242 116.326 68.677 95.7812 61.1899Z" fill="var(--svg-color)"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M46.1221 8.06516C43.8701 7.37268 41.4785 7 39 7C25.6109 7 14.7568 17.8759 14.7568 31.2921C14.7568 39.7756 19.0969 47.2436 25.6735 51.588C10.6967 57.0437 0 71.4332 0 88.3258C0 89.661 0.0667791 90.9807 0.197249 92.2814C5.95285 95.017 12.0418 97.1629 18.3865 98.6412C22.0162 81.9442 32.511 67.8181 46.7573 59.379C40.8255 52.3544 37.2432 43.2642 37.2432 33.3371C37.2432 23.7734 40.5667 14.9824 46.1221 8.06516Z" fill="var(--svg-color)"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M108.243 59.379C114.175 52.3544 117.757 43.2642 117.757 33.3371C117.757 23.8432 114.482 15.1108 108.999 8.21699C111.359 7.4273 113.88 7 116.5 7C129.717 7 140.432 17.8759 140.432 31.2921C140.432 39.7756 136.148 47.2436 129.656 51.588C144.44 57.0437 155 71.4332 155 88.3258C155 89.661 154.934 90.9807 154.805 92.2814C149.056 95.0496 142.969 97.214 136.625 98.6939C133.006 81.9739 122.504 67.827 108.243 59.379Z" fill="var(--svg-color)"/>
					</svg>
				</a>
			</li>
			<li>
				<a href="/exams">
					<div>Restaurar evaluaciones</div>
					<svg id="exam" width="148" height="148" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M55.5 111H92.5C94.2472 111 95.7118 110.409 96.8937 109.227C98.0757 108.045 98.6666 106.581 98.6666 104.833C98.6666 103.086 98.0757 101.622 96.8937 100.44C95.7118 99.2578 94.2472 98.6668 92.5 98.6668H55.5C53.7527 98.6668 52.2882 99.2578 51.1062 100.44C49.9243 101.622 49.3333 103.086 49.3333 104.833C49.3333 106.581 49.9243 108.045 51.1062 109.227C52.2882 110.409 53.7527 111 55.5 111ZM55.5 86.3335H92.5C94.2472 86.3335 95.7118 85.7425 96.8937 84.5606C98.0757 83.3786 98.6666 81.914 98.6666 80.1668C98.6666 78.4196 98.0757 76.955 96.8937 75.7731C95.7118 74.5911 94.2472 74.0002 92.5 74.0002H55.5C53.7527 74.0002 52.2882 74.5911 51.1062 75.7731C49.9243 76.955 49.3333 78.4196 49.3333 80.1668C49.3333 81.914 49.9243 83.3786 51.1062 84.5606C52.2882 85.7425 53.7527 86.3335 55.5 86.3335ZM37 135.667C33.6083 135.667 30.7048 134.459 28.2895 132.044C25.8743 129.629 24.6666 126.725 24.6666 123.333V24.6668C24.6666 21.2752 25.8743 18.3717 28.2895 15.9564C30.7048 13.5411 33.6083 12.3335 37 12.3335H81.2458C82.8902 12.3335 84.4576 12.6418 85.9479 13.2585C87.4382 13.8752 88.7486 14.7488 89.8791 15.8793L119.787 45.7877C120.918 46.9182 121.792 48.2286 122.408 49.7189C123.025 51.2092 123.333 52.7765 123.333 54.421V123.333C123.333 126.725 122.126 129.629 119.71 132.044C117.295 134.459 114.392 135.667 111 135.667H37ZM80.1666 49.3335C80.1666 51.0807 80.7576 52.5453 81.9395 53.7272C83.1215 54.9092 84.5861 55.5002 86.3333 55.5002H111L80.1666 24.6668V49.3335Z" fill="var(--svg-color)"/>
					</svg>
				</a>
			</li>
			<li>
				<a href="/metrics">
					<div>Métricas</div>
					<svg id="arrow" width="154" height="90" viewBox="0 0 154 90" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M154 52.2581H136.566V31.9355L90.0755 78.3885L58.113 46.4518L14.5283 90L0 75.4839L58.1132 17.4194L90.075 49.3553L122.038 17.4194H101.698V0H154V52.2581Z" fill="var(--svg-color)"/>
					</svg>
				</a>
			</li>
		</ul>
	</nav> 
</main>

<style>
	:global(html>body) {
		overflow: auto;
	}
	h1 {
		text-align: center;
		padding: 0 16px;
		color: var(--main1);
	}
	main {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 24px 32px;
	}
	nav {
		width: 100%;
		max-width: 1000px;
		margin: auto;
	}
	ul {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 16px;
	}
	a {
		position: relative;
		height: 180px;
		color: var(--text);
		font-size: 32px;
		font-weight: 700;
		background: var(--back);
		border-radius: 16px;
		padding: 16px;
		display: flex;
		align-items: flex-end;
		overflow: hidden;
		border: 3px solid var(--text);
	}
	a:hover, a:focus {
		background: var(--secondary);
	}
	a div {
		z-index: 2;
	}
	svg {
		position: absolute;
		--svg-color: #aaa;
	}
	@media (prefers-color-scheme: dark) {
		a {
			background: var(--secondary);
			border: 3px solid var(--secondary);
		}
		a:hover, a:focus {
			background: var(--tertiary);
			border: 3px solid var(--tertiary);
		}
		svg {
			--svg-color: #ffffff5e;
		}
	}
	#courses {
		width: 218px;
		height: 181px;
		top: 33px;
		right: 24px;
	}
	#group {
		top: 20px;
    	right: 22px;
	}
	#exam {
		position: absolute;
		top: 0;
		right: -38px;
		height: 264px;
		width: 300px;
	}
	#arrow {
		height: 144px;
		width: 246px;
		right: 28px;
		top: 92px;
	}
	#user {
		bottom: -21px;
		right: 25px;
		width: 172px;
		height: 193px;
	}
	@media (max-width: 1000px) {
		main {
			padding: 24px 16px;
		}
		ul {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 850px) {
		main {
			flex-direction: column;
			align-items: stretch;
		}
		ul {
			grid-template-columns: 1fr;
		}
	}
</style>
