import PocketBase from 'pocketbase';

// Este hook se ejecuta cada que llega una solicitud (GET o POST). Hace posible
// una renderización del lado del servidor, al utilizar Pocketbase permitiendole
// a la aplicación funcionar sin JS.
//
// https://github.com/pocketbase/js-sdk?tab=readme-ov-file#ssr-integration

export async function handle({ event, resolve }) {

    // Aquí se puede cambiar la url del back-end
    event.locals.pb = new PocketBase('http://127.0.0.1:8090/');
    
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // Validar el store y guardar al usuario
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
        event.locals.user = structuredClone(event.locals.pb.authStore.model)
    } catch (err) {
        // Limpiar el store si ya no es válido
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    // Envía la cookie 'pb_auth' de vuelta al cliente con la info actualizada
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

    return response;
}