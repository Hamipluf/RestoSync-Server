import customResponses from "../utils/customResponses.js";
import NotesManager from "../persistencia/DAOs/notes.postgresql.js";

const notesManager = new NotesManager();

// Obtener una nota por su ID
export const getNoteById = async (req, res) => {
  const { nid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!nid) {
    res
      .status(400)
      .json(customResponses.badResponse(405, "Falta el ID de la nota"));
  }

  try {
    const note = await notesManager.getNoteById(parseInt(nid));
    if ("error" in note) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, note.message));
    }

    for (const key in note) {
      if (typeof note[key] === "string") {
        note[key] = note[key].trim();
      }
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Nota encontrada", note));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener notas por user_id
export const getNoteByUser = async (req, res) => {
  const { oid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido."));
  }
  if (!oid) {
    res
      .status(400)
      .json(customResponses.badResponse(405, "Falta el ID del usuario."));
  }

  try {
    const notes = await notesManager.getNoteByUser(parseInt(oid));
    if ("error" in notes) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, notes.message));
    }

    for (const key in notes) {
      if (typeof notes[key] === "string") {
        notes[key] = notes[key].trim();
      }
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Notas encontradas", notes));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Crear una nueva nota
export const createNote = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { title, description, owner_id } = req.body;
  if (!title || !description) {
    return res
      .status(404)
      .json(customResponses.badResponse(404, "Faltan campos a completar"));
  }
  if (!owner_id) {
    return res
      .status(404)
      .json(
        customResponses.badResponse(
          404,
          "Faltan el ID del usuario para la tarea."
        )
      );
  }

  try {
    const newNote = await notesManager.createNote(title, description, owner_id);

    if ("error" in newNote) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, newNote.message));
    }

    res
      .status(201)
      .json(customResponses.responseOk(201, "Nota creada con éxito", newNote));
  } catch (error) {
    console.error("Error al crear la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Actualizar una nota por su ID
export const updateNoteById = async (req, res) => {
  const { nid } = req.params;
  if (req.method !== "PUT") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!nid) {
    res
      .status(400)
      .json(customResponses.badResponse(405, "Falta el ID de la nota"));
  }
  const { title, description, is_completed } = req.body;
  if (!title || !description || is_completed === undefined) {
    return res
      .status(404)
      .json(customResponses.badResponse(404, "Faltan campos a completar"));
  }

  try {
    const updatedNote = await notesManager.updateNote(parseInt(nid), req.body);

    if (updatedNote.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, updatedNote.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Nota actualizada con éxito",
          updatedNote
        )
      );
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Eliminar una nota por su ID
export const deleteNoteById = async (req, res) => {
  const { nid } = req.params;
  if (req.method !== "DELETE") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!nid) {
    res
      .status(400)
      .json(customResponses.badResponse(405, "Falta el ID de la nota"));
  }
  try {
    const deletedNote = await notesManager.deleteNote(parseInt(nid));

    if ("error" in deletedNote) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, deletedNote.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(200, "Nota eliminada con éxito", deletedNote)
      );
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener el user de una nota
export const getOwnerNote = async (req, res) => {
  const { nid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!nid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la nota"));
  }
  try {
    const owner = await notesManager.getNoteOwner(parseInt(nid));
    if ("error" in owner) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos",
            owner.message
          )
        );
    }
    res
      .status(200)
      .json(customResponses.responseOk(200, "Dueño encontrado", owner));
  } catch (error) {
    console.error("Error al obtener el dueño de la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Agrega una nota a la tarea
export const addNoteToTask = async (req, res) => {
  const { task_id, title, description, owner_id } = req.body;
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  if (!task_id || !title || !description || !owner_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const result = await notesManager.addTaskToNote(
      parseInt(owner_id),
      parseInt(task_id),
      description,
      title
    );

    if ("error" in result) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, result.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(201, "Tarea agregada con éxito", result)
      );
  } catch (error) {
    console.error("Error al agregar la tarea a la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Agregar un comentario a una nota específica
export const addCommentToNote = async (req, res) => {
  const { comment, user_id } = req.body;
  const { nid } = req.params;
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!comment || !user_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }
  if (!nid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan El ID de la nota"));
  }

  try {
    const comment = await notesManager.addCommentToNote(parseInt(nid), req.body);

    if (comment.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, comment.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(201, "Comentario agregado con éxito", comment)
      );
  } catch (error) {
    console.error("Error al agregar comentario a la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtiene todos los comentarios de una nota
export const getAllCommentsByNoteId = async (req, res) => {
  const { nid } = req.params;

  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  if (!nid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la nota"));
  }

  try {
    const comments = await notesManager.getAllCommentByNoteId(parseInt(nid));
    if ("error" in comments) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, comments.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(200, "Comentarios encontrados", comments)
      );
  } catch (error) {
    console.error("Error al obtener comentarios de la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtiene todas las notas por task_id
export const getAllNotesByTaskId = async (req, res) => {
  const { tid } = req.params;

  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  if (!tid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la tarea"));
  }

  try {
    const notes = await notesManager.getNotesByTaskId(parseInt(tid));
    if (notes.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, notes.message));
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Notas encontradas", notes));
  } catch (error) {
    console.error("Error al obtener las notas de la tarea:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Eliminar commentario de una nota
export const deleteCommentOfnote = async (req, res) => {
  const { nid, cid } = req.params;
  if (req.method !== "DELETE") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!nid || !cid) {
    res
      .status(400)
      .json(
        customResponses.badResponse(
          405,
          "Falta el ID de la nota o del comentrario."
        )
      );
  }
  try {
    const deletedNote = await notesManager.deleteCommentOfNote(
      parseInt(nid),
      parseInt(cid)
    );
    if (deletedNote.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, deletedNote.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Comentario de nota eliminada con éxito",
          deletedNote
        )
      );
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
