import customResponses from "../utils/customResponses.js";
import NotesManager from "../persistencia/DAOs/notes.postgresql.js";

const notesManager = new NotesManager();

// Obtener todas las notas
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
            "Error en obtener datos",
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
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
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
// Crear una nueva nota
export const createNote = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { title, description, is_completed } = req.body;
  if (!title || !description || !is_completed) {
    return res
      .status(404)
      .json(customResponses.badResponse(404, "Faltan campos a completar"));
  }
  try {
    const newNote = await notesManager.createNote(req.body);

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
  if (!title || !description || !is_completed) {
    return res
      .status(404)
      .json(customResponses.badResponse(404, "Faltan campos a completar"));
  }

  try {
    const updatedNote = await notesManager.updateNoteById(
      parseInt(nid),
      req.body
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
    const deletedNote = await notesManager.deleteNoteById(parseInt(nid));

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
