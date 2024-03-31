# Askeladd - Sistema de Gestión de Evaluaciones para el Departamento de Computación de la UCSP.

El Sistema Askeladd consta de 3 partes:

- Un backend en Pocketbase (`/backend`).
- Una aplicación web para los profesores (`/askeladd`).
- Una aplicación web para el administrador (`/admin`).

## Pocketbase Backend

El sistema utiliza Pocketbase por detrás. [Pocketbase](https://pocketbase.io/) es un BaaS ligero escrito en Go que corre con solamente un archivo.

Para correrlo en un servidor se puede hacer lo siguiente:

1. Descargar la última versión desde su [página principal](https://pocketbase.io/docs/) o su [repositorio en Github](https://github.com/pocketbase/pocketbase/releases) para el sistema operativo donde correrá.
2. Descargar el archivo [pb_schema.json](/backend/pb_schema.json)(https://github.com/Verborrea/Askeladd/blob/main/svelte.config.js)
3. Correr el siguiente comando: `./pocketbase serve` dentro de la carpeta donde se encuentra el ejecutable.
4. Una vez abierto, colocar la siguiente dirección en un navegador: http://localhost:8090/_/#/settings/import-collections y hacer click en el botón `Load from JSON file`.

## Professors App



## Admin App

