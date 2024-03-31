import { writable } from "svelte/store"

// Permite a filtrar los examenes en la página de inicio
export const semester = writable("Todos los periodos")

// Contiene el mensaje de error en las páginas de los exámenes
export const error_message = writable("")