import customResponses from "../utils/customResponses.js";
import NotesManager from "../persistencia/DAOs/notes.postgresql.js";

const notesManager = new NotesManager();

// Obtiene todas las notas
export const getAllNotes = async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  try {
    const notes = await notesManager.getAllNotes();
    if (notes.length === 0) {
      return res
        .status(404)
        .json(customResponses.badResponse(404, "No hay notas para devolver"));
    }

    if ("error" in notes) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error al obtener notas",
            notes.message
          )
        );
    }

    // Eliminar espacios en blanco sobrantes de las propiedades de cada nota
    const formattedNotes = notes.map((note) => {
      for (const key in note) {
        if (typeof note[key] === "string") {
          note[key] = note[key].trim();
        }
      }
      return note;
    });

    res
      .status(200)
      .json(
        customResponses.responseOk(200, "Notas encontradas", formattedNotes)
      );
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtiene una nota por su ID
export const getNoteById = async (req, res) => {
  const { id } = req.params;

  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  if (!id) {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Falta el ID de la nota."));
  }

  try {
    const note = await notesManager.getNoteById(parseInt(id));

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
    console.error("Error al obtener la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Agrega una nueva nota
export const addNote = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { title, description, is_completed, owner_id } = req.body;

  if (!title || !description || !is_completed || !owner_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar."));
  }
  const noteData = {
    ...req.body,
    created_at: new Date(),
  };

  try {
    const newNote = await notesManager.addNote(noteData);

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
// Actualiza una nota por su ID
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, is_completed } = req.body;

  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  if (!title || !description || !is_completed) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar."));
  }

  try {
    const updatedNote = await notesManager.updateNote(id, req.body);

    if ("error" in updatedNote) {
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
// Elimina una nota por su ID
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  try {
    const deletedNote = await notesManager.deleteNote(parseInt(id));

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
// Asigna un comentario a una nota
export const assignCommentToNote = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { note_id, comment_id } = req.body;

  if (!note_id || !comment_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar."));
  }

  try {
    const commentAssigned = await notesManager.assignCommentToNote(
      note_id,
      comment_id
    );

    if ("error" in commentAssigned) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, commentAssigned.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(
          201,
          "Comentario asignado a la nota con éxito",
          commentAssigned
        )
      );
  } catch (error) {
    console.error("Error al asignar un comentario a la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtiene todos los comentarios asociados a una nota por su ID
export const getCommentsForNote = async (req, res) => {
  const { id } = req.params;

  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!id) {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Falta el ID de la nota"));
  }

  try {
    const comments = await notesManager.getCommentsForNote(parseInt(id));

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Comentarios encontrados para la nota",
          comments
        )
      );
  } catch (error) {
    console.error("Error al obtener los comentarios para la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Asigna un usuario como propietario de una nota
export const assignOwnerToNote = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { note_id, owner_id } = req.body;

  if (!note_id || !owner_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar."));
  }

  try {
    const ownerAssigned = await notesManager.assignOwnerToNote(note_id, owner_id);

    if ("error" in ownerAssigned) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, ownerAssigned.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(
          201,
          "Usuario asignado como propietario de la nota con éxito",
          ownerAssigned
        )
      );
  } catch (error) {
    console.error(
      "Error al asignar un usuario como propietario de la nota:",
      error
    );
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
