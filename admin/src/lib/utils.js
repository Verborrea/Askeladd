export const periods = ['2023-II', '2024-I']


export function generateId() {
	const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';

	return Array.from(
		{ length: 15 }, () => caracteres[Math.floor(Math.random() * caracteres.length)]
	).join('');
}

export function obtenerClavesUnicasOrdenadas(array) {
	let claves = [];

	// Iterar sobre cada objeto en el array
	array.forEach(function(objeto) {
		// Obtener las claves del objeto puntajesPorSO
		let keys = Object.keys(objeto.so);
		
		// Iterar sobre las claves
		keys.forEach(function(key) {
			// Si la clave no está en el array claves, añadirla
			if (!claves.includes(key)) {
				claves.push(key);
			}
		});
	});

	// Ordenar las claves numéricamente
	claves.sort(function(a, b) {
		return a - b;
	});

	return claves;
}

export function calcularPromedioSO(array) {
	let suma = {};
	let totalObjetos = array.length;
  
	// Iterar sobre cada objeto en el array
	array.forEach(objeto => {
	  // Iterar sobre cada clave en el objeto 'so'
	  for (let clave in objeto.so) {
		// Sumar los valores correspondientes a la clave
		suma[clave] = (suma[clave] || 0) + objeto.so[clave];
	  }
	});
  
	// Calcular el promedio para cada clave
	for (let clave in suma) {
	  suma[clave] = suma[clave] / totalObjetos;
	}
  
	return suma;
}

export function obtenerAprobados(array) {
	let cantidad = {}
	let totalObjetos = array.length;
	array.forEach(objeto => {
		for (let clave in objeto.so) {
			if (!(clave in cantidad)) {
				cantidad[clave] = 0
			} else {
				cantidad[clave] += (objeto.so[clave] >= 11.5 ? 1 : 0)
			}
		}
	})

	for (let clave in cantidad) {
		cantidad[clave] = `${(cantidad[clave] / totalObjetos * 100).toFixed(2)}%` ;
	}

	return cantidad
}