export const periods = ['2023-II', '2024-I']


export function findHighestId(items) {
	return items.reduce((maxId, item) => {
		if (item.id > maxId) {
			return item.id;
		}
		return maxId;
	}, 0);
};

export function generateId() {
	const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';

	return Array.from(
		{ length: 15 }, () => caracteres[Math.floor(Math.random() * caracteres.length)]
	).join('');
}

export async function compressImage(file, size = 1080) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(event) {
			const img = new Image();
			img.src = event.target.result;
			img.onload = function() {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				// Asegura que la imagen no se amplíe si es más pequeña que size x size
				let scaleFactor = 1;
				if (img.width > size || img.height > size) {
					scaleFactor = Math.min(size / img.width, size / img.height);
				}
				const width = Math.round(img.width * scaleFactor);
				const height = Math.round(img.height * scaleFactor);

				canvas.width = width;
				canvas.height = height;

				ctx.drawImage(img, 0, 0, width, height);
				canvas.toBlob(
					(blob) => { if (blob) resolve(blob); else reject("Error al convertir a WebP");},
					'image/webp', 0.7
				);
			};
			img.onerror = function() { reject("Error al cargar la imagen");};
		};
		reader.onerror = function() { reject("Error al leer el archivo"); };
	});
}

export function parseOutcomes(array) {
	const outcomeDescriptions = {
	  1: "Analizar un problema computacional complejo y aplicar los principios computacionales y otras disciplinas relevantes para identificar soluciones.",
	  2: "Diseñar, implementar y evaluar una solución basada en computación para cumplir con un conjunto determinado de requisitos computacionales en el contexto de las disciplinas del programa.",
	  3: "Comunicarse efectivamente en diversos contextos profesionales.",
	  4: "Reconocer las responsabilidades profesionales y hacer juicios informados en el campo profesional de computación con principios éticos.",
	  5: "Funcionar efectivamente como miembro o líder de un equipo involucrado en actividades apropiadas a la disciplina del programa.",
	  6: "Aplicar la teoría de la computación y los fundamentos del desarrollo de software para producir soluciones basadas en computación.",
	  7: "Desarrollar tecnología computacional buscando el bien común, aportando con formación humana, capacidades científicas, tecnológicas y profesionales para solucionar problemas sociales de nuestro entorno."
	};
  
	const parsedArray = array.map(id => ({
	  id: id.toString(),
	  description: outcomeDescriptions[id] || "Descripción no encontrada"
	}));
  
	return parsedArray;
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