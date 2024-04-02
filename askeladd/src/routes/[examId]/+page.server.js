import { redirect, error, fail } from "@sveltejs/kit";

export async function load({ locals, params }) {
	try {
		// Obtener toda la información del examen
		const exam = await locals.pb.collection("exams").getOne(params.examId, {
			expand: "group,group.semester,group.course",
		})

		return { exam }

	} catch (pb_error) {
		throw error(404, "No se encontró el examen solicitado")
	}
}

export const actions = {
	// Acción global para todos los estados de un examen
	saveExam: async ({ locals, params, request }) => {
		let form_data = await request.formData();

		let exam = {
			status: form_data.get("status")
		}

		let data = JSON.parse(form_data.get("data"))

		if (exam.status === "En Proceso" && data.length === 0) {
			exam.status = "En Blanco"
			exam.content = []
		}

		if (exam.status === "En Blanco" && data.length > 0) {
			exam.status = "En Proceso"
			exam.content = data
		}

		if (exam.status === "En Proceso") {
			exam.content = data
		}

		if (exam.status === "Calificando") {
			exam.grades = data
		}
	
		await locals.pb.collection("exams").update(params.examId, exam);
	},
	// ACCIONES PARA UN EXAMEN EN EDICIÓN: (se llaman vía fetch)
	subirNotas: async ({ locals, params, request }) => {
		let { items } = Object.fromEntries(await request.formData());

		const sumaPts = JSON.parse(items).reduce((a, p) => a + p.pts * 100, 0);

		if (sumaPts/100 !== 20) {
			return fail(400, { message: "Las preguntas deben sumar 20 puntos" })
		}

		await locals.pb.collection("exams").update(params.examId, {
			status: "Calificando",
			content: items
		});
	},
	sendFile: async ({ locals, params, request }) => {
		let data = await request.formData();

		let images_to_delete = JSON.parse(data.get("images_to_delete"))

		// Borrar imagenes removidas
		if (images_to_delete.length > 0) {
			await locals.pb.collection("exams").update(params.examId, {
				"images-": images_to_delete
			});
		}

		data.delete("images_to_delete")

		const result = await locals.pb.collection("exams").update(params.examId, data);
				
		return {
			file_names: result.images
		}
	},
	// ACCIONES PARA UN EXAMEN EN CALIFICACIÓN:
	subirPdfs: async ({ locals, params, request }) => {
		let { grades } = Object.fromEntries(await request.formData())

		await locals.pb.collection("exams").update(params.examId, {
			status: "Digitalización",
			grades
		})

		return { status: "Digitalización"}
	},
	// ACCIONES PARA UN EXAMEN EN DIGITALIZACIÓN
	deleteFile: async ({ locals, params, request }) => {
		let { name } = Object.fromEntries(await request.formData())

		let exam = {}
		exam[name] = null

		await locals.pb.collection("exams").update(params.examId, exam)
	},
	digitalizar: async ({ locals, params, request }) => {
		let data = await request.formData();

		let name = data.get("type")

		data.delete("type")

		try {
			const exam = await locals.pb.collection("exams").update(params.examId, data);
			return { filename: exam[name] }
		} catch (err) {
			throw error(400, "Algo pasó al subir la imagen")
		}
	},
	finalizar: async ({ locals, params }) => {
		const exam = await locals.pb.collection("exams").getOne(params.examId)

		if (!exam.lowest || !exam.average || !exam.highest) {
			return fail(400, { message: "Debe subir los 3 documentos antes de continuar." })
		}

		await locals.pb.collection("exams").update(params.examId, {
			status: "Finalizado"
		})

		return { status: "Finalizado"}
	}
};