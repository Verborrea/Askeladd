<script>
	import Input from "$lib/components/Input.svelte"
	import { enhance } from "$app/forms"

	export let form;
	let { email, error, loading } = form ?? {}
 	$: ({ email, error, loading } = form ?? {
 		email: '',
 		error: { field: '', message: '' },
		loading: false
 	});

	const handleLogin= ({ formData, cancel }) => {
		loading = true

		const { email, _ } = Object.fromEntries(formData)

		const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

		const data = {
			email,
			loading: false
		}

		if (email.length > 100 || !validEmail.test(email)) {
			form = {
				...data,
				error: { field: 'email', message: 'Ingrese una dirección de correo válida.' }
			}
			cancel()
		}

		return async ({ update }) => {update()}
	}
</script>

<svelte:head>
	<title>Askeladd - Login</title>
</svelte:head>

<svg id="blob-1" width="540" height="540" viewBox="0 0 540 540" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M539.38 0C540.947 63.7559 542.514 127.655 504.048 164.025C465.582 200.254 386.94 209.239 357.307 259.873C327.674 310.65 346.907 403.074 316.989 436.878C287.071 470.681 208.144 445.721 147.026 453.138C86.05 460.412 43.025 500.206 0 540V0H539.38Z" fill="var(--main1)"/>
</svg>

<svg id="blob-2" width="540" height="540" viewBox="0 0 540 540" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M0 540C44.2155 493.645 88.5737 447.29 109.968 400.222C131.363 353.296 130.079 305.658 141.918 250.745C153.756 195.832 178.859 133.502 222.647 103.122C266.434 72.7417 328.906 74.3106 384.818 62.4723C440.872 50.6339 490.365 25.3883 540 0V540H0Z" fill="var(--main1)"/>
</svg>	

<main>
	<header>
		<h1>Askeladd</h1>
		<h2>Sistema de Gestión de examenes</h2>
	</header>
	<form method="post" use:enhance={handleLogin}>
		<Input
			value={email}
			type="text"
			label="Correo Institucional"
			id="email"
			{error}
		/>
		<Input
			type="password"
			label="Contraseña"
			id="password"
			{error}
		/>
		<button class="button" type="submit" disabled={loading}>
			{loading ? 'Cargando...' : 'Ingresar'}
		</button>
		<a href="/login">He olvidado mi contraseña</a>
	</form>
</main>

<style>
	main {
		min-height: 100vh;
		min-height: 100dvh;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 48px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	h1, h2 {
		font-weight: 900;
		color: var(--main1);
		text-align: center;
	}
	h1 {
		font-size: 112px;
		line-height: 112px;
		letter-spacing: -0.06em;
	}
	h2 {
		font-size: 32px;
		letter-spacing: -0.04em;
	}
	button[type="submit"] {	
		height: 54px;
		border-radius: 12px;
		font-size: 18px;
	}
	button[type="submit"]:hover {
		background: var(--main2);
	}
	a {
		color: var(--main1);
		text-align: center;
		text-decoration: none;
	}
	a:hover, a:focus {
		outline: none;
		text-decoration: underline;
	}
	:global(body) {
		overflow: hidden;
	}

	#blob-1, #blob-2 {			
		display: block;
		position: absolute;
		z-index: -1;
	}

	#blob-1 { inset: 0 auto auto 0 }
	#blob-2 { inset: auto 0 0 auto }

	@media (max-width: 1300px) {
		#blob-1 { inset: auto 60% 55% auto }
		#blob-2 { inset: 55% auto auto 60% }
	}

	@media (max-width: 750px) {
		h1 {
			font-size: 36px;
			line-height: 36px;
		}
		h2 {
			font-size: 18px;
		}
		main {
			gap: 16px;
		}
	}
</style>