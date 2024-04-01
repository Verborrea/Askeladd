# Askeladd - Sistema de Gestión de Evaluaciones para el Departamento de Computación de la UCSP.

El Sistema Askeladd consta de 3 partes:

- Un backend en Pocketbase (`/backend`).
- Una aplicación web para los profesores (`/askeladd`).
- Una aplicación web para el administrador (`/admin`).

## 1. Pocketbase Backend

El sistema utiliza Pocketbase por detrás. [Pocketbase](https://pocketbase.io/) es un BaaS ligero escrito en Go que corre con solamente un archivo.

Para correrlo en un servidor se puede hacer lo siguiente:

1. Descargar la última versión desde su [página principal](https://pocketbase.io/docs/) o su [repositorio en Github](https://github.com/pocketbase/pocketbase/releases) para el sistema operativo donde correrá.
2. Descargar el archivo [pb_schema.json](/backend/pb_schema.json).
3. Abrir el ejecutable `pocketbase`.
4. Correr el comando `./pocketbase migrate up`.
5. Correr el siguiente comando para crear la primera cuenta de administrador:
```
./pocketbase admin create [email] [password]
```
Debería obtener un mensajes que diga:
```
Successfully created new admin [email]!
```
6. Correr el comando: `./pocketbase serve` dentro de la carpeta donde se encuentra el ejecutable para iniciar el servidor.
7. Ingresar al Dashboard gráfico mediante este link: http://127.0.0.1:8090/_/ en un navegador.
8. Colocar las credenciales (correo y contraseña) previamente creadas para ingresar a la sección **Settings / Import collections**.
9. Ir al apar: http://localhost:8090/_/#/settings/import-collections y hacer click en el botón `Load from JSON file`.
10. Subir el archivo `pb_schema.json` (mantener la opción "Merge with the existing collections" desactivada)
11. Hacer click en **Review** y luego en **Confirm and Import**
   
Todo estára vacío al comienzo. Para agregar, modificar o eliminar campos, hacerlo desde la aplicación para administradores explicada en el apartado 3.

Para cambios o mejoras en la infraestructura, guiarse de la [documentación oficial de Pocketbase](https://pocketbase.io/docs).

## 2. Professors App

La aplicación para los profesores es una aplicación web construida con [SvelteKit](https://kit.svelte.dev/), lo que permite un despliegue flexible en una variedad de plataformas: Vercel, Netlify, Cloudfare, AWS, etc.

### 2.1. Instalación de dependencias

Como se puede ver, hay varias opciones para correr la aplicación, sin embargo para correrla localmente se recomienda utilizar Node.js. Para esto, es necesario primero descargar el entorno de ejecución y adicionalmente, un adminsitrador de paquetes.

1. Descargar Node.js desde el siguiente [enlace](https://nodejs.org/en/download). Node.js incluye `npm` como adminstrador de paquetes, sin embargo la aplicación fue construida con `pnpm`.
2. Instalar `pnpm`. Lo podemos conseguir con el siguiente comando: `wget -qO- https://get.pnpm.io/install.sh | sh -`. Más información [aquí](https://pnpm.io/installation).
3. Instalar todas las dependencias del proyecto con el comando `pnpm install` dentro de `/askeladd`. Esto debería crear varias carpetas y dejar listo nuestro proyecto para su ejecución. En caso de no funcionar, se deberá crear un proyecto de Svelte nuevo y reemplazar el archivo `svelte.config.js` así como las carpetas `/src` y `/static`.
4. Generar la carpeta `/build` con el comando `pnpm run build`.

Listo! la aplicación debería correr con el comando `node build/index.js` en **0.0.0.0:3000**. Ahora, solo se debe subir la aplicación a algún servidor, para ello se puede seguir esta [guía](https://codepilotsf.medium.com/how-to-deploy-a-sveltekit-node-app-1c11171fe852).

Si el departamento cuenta con suficiente presupuesto entonces también se puede desplegar en alguna plataforma de paga (para satisfacer los requerimientos de número de usuarios concurrentes y ancho de banda estimado) como [Vercel](https://vercel.com/) de manera mucho más sencilla, pero no detallara aquí.

> [!NOTE]  
> Al subir la carpeta `/build` a un servidor externo, también se deberá de subir el archivo package.json para un correcto funcionamiento,

### 2.2. Funcionamiento de la Aplicación

Para ingresar a la aplicación, el usuario deberá primero iniciar sesión. Esta se sesión se mantendrá activa durante un mes aproximadamente, similar a las sesiones utilizadas por las redes sociales. Todo ingreso a cualquiera de las páginas sin autorización redirigirá automáticamente a la página de inicio de sesión o `/login`.

### 2.3. Aclaraciones sobre el cógido

Este sí está bien hecho :')

> [!NOTE]  
> Si el backend corre en otro servidor que no sea el local, cambiar la dirección de http://127.0.0.1:8090/ a la nueva en los siguientes archivos: `/hooks.server.js`, `routes/[examId]/EditExam.svelte` y `routes/[examId]/Upload.svelte`

## 3. Admin App

### 3.1. Instalación

La Instalación sigue los mismos pasos que la de la aplicación para profesores debido a que fue creada de la misma forma. Todo el código fuente se encuentra en la carpeta `/admin`.