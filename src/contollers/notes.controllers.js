import noteManager from "../persistencia/DAOs/notes.postgresql.js";
import customResponses from "../utils/customResponses.js";

// Obtener todas las notas
export const getAllNotes = async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  try {
    const notes = await noteManager.getAllNotes();
    if (Array.isArray(notes) && notes.length === 0) {
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
    res
      .status(200)
      .json(customResponses.responseOk(200, "Notas encontradas", notes));
  } catch (error) {
    console.error("Error al obtener notas:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Obtener una nota por ID
export const getNoteById = async (req, res) => {
  const { id } = req.params;
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la nota"));
  }

  try {
    const note = await noteManager.getNoteById(id);

    if ("error" in note) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, note.message));
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

// Crear una nota
export const createNote = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const noteData = req.body;

  try {
    const createdNote = await noteManager.createNote(noteData);
    if ("error" in createdNote) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, createdNote.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(201, "Nota creada con éxito", createdNote)
      );
  } catch (error) {
    console.error("Error al crear la nota:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Actualizar un campo de la nota por ID
export const updateNoteField = async (req, res) => {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { id } = req.params;
  const { fieldToUpdate, newValue } = req.body;

  if (!id || !fieldToUpdate || newValue === undefined) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const updatedNote = await noteManager.updateNoteField(
      id,
      fieldToUpdate,
      newValue
    );

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

// Eliminar una nota por ID
export const deleteNote = async (req, res) => {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json(
        customResponses.badResponse(400, "Falta el ID de la nota a eliminar")
      );
  }

  try {
    const deletedNote = await noteManager.deleteNoteById(id);

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
