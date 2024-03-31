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
1. Correr el comando: `./pocketbase serve` dentro de la carpeta donde se encuentra el ejecutable para iniciar el servidor.
2. Ingresar al Dashboard gráfico mediante este link: http://127.0.0.1:8090/_/ en un navegador.
3. Colocar las credenciales (correo y contraseña) previamente creadas para ingresar a la sección **Settings / Import collections**.
4. Ir al apar: http://localhost:8090/_/#/settings/import-collections y hacer click en el botón `Load from JSON file`.
5. Subir el archivo `pb_schema.json` (mantener la opción "Merge with the existing collections" desactivada)
6. Hacer click en **Review** y luego en **Confirm and Import**
   
Todo estára vacío al comienzo. Para agregar, modificar o eliminar campos, hacerlo desde la aplicación para administradores explicada en el apartado 3.

Para cambios o mejoras en la infraestructura, guiarse de la documentación oficial de Pocketbase.

## 2. Professors App



## 3. Admin App

