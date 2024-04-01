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

La contraseña por defecto de cada profesor es su número de DNI, esta se puede cambiar después. Al ingresar, la página de Inicio conteiene un panel lateral para filtrar los examenes por periodo académico (2024-I, 2024-II, etc). A la derecha están las *cards* de cada examen del periodo seleccionado. Al hacer click, se ingresa al examen respectivo.

Los examenes pueden tener 5 estados posibles:

1. **En Blanco:** El estado por defecto en que se crean los examenes, indica que no tiene niguna pregunta guardada. Permite editar la preguntas del examen.
2. **En Proceso:** Estado en el que se mantiene un examen mientras se editan sus preguntas. Si un examen "En Proceso" se guarda sin preguntas, volverá al estado "En Blanco".
3. **Calificando:** Es el estado en el que se encuentran las evaluaciones que ya han sido o están siendo evaluadas, el profesor puede ir subiendo poco a poco las notas o subirlo desde una tabla en su portapapeles.
4. **Digitalización:** Una vez subidas las evaluaciones el docente deberá subir 3 digitalizaciones: La evaluación con el puntaje más bajo, con el más alto y una con aproximadamente la media. En este estado no se pueden guardar los cambios, cada que el profesor suba un archivo, este guardará el estado del examen automáticamente.
5. **Finalizado:** El estado del examen ya no es editable por el profesor, la GUI muestra las métricas de las puntaciones en cada pregunta y por cada SO.

Al hacer click en un examen, se abrirá una de los siguientes 4 interfaces:

### 2.3. Aclaraciones sobre el cógido

La carpeta `/static` contiene el ícono de la aplicación en distitnos tamaños, la fuente utilizada y su manifiesto Web para poder ser instalada.

La carpeta `/src` contiene:
- La carpeta `/lib`, donde están componentes y scripts que se usan a los largo de toda la aplicación.
- La carpeta `/route` con las distintas rutas de la aplicación.
- `app.html`: La plantilla de la aplicación
- `hooks.server.js`: Valida la sesión del usuario en cada request que se haga al servidor.

Como oportunidades de mejora se puede tomar:

- Permitir el cambio de contraseña por parte de los usuarios.
- Reducir el número de *requests* al servidor al guardar localmente o en caché los estados de los examenes que ya no sean editables (como los examenes finalizados) mediante el uso del localStorage o algúna otra tecnología.
- ETAPA 2: Añadir un constructor de examenes en PDF que cree el examen y opcionalmente muestre una vista previa mientras se crea el examen.
- ETAPA 3: Uniformización de los examenes y evaluación automática computarizada.

> [!NOTE]  
> Si el backend corre en otro servidor que no sea el local, cambiar la dirección de http://127.0.0.1:8090/ a la nueva en los siguientes archivos: `/hooks.server.js`, `routes/[examId]/EditExam.svelte` y `routes/[examId]/Upload.svelte`

## 3. Admin App

### 3.1. Instalación

La Instalación sigue los mismos pasos que la de la aplicación para profesores debido a que fue creada de la misma forma. Todo el código fuente se encuentra en la carpeta `/admin`.