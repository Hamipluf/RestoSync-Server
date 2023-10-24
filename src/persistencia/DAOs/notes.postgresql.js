import noteServices from "../../services/notes.services.js";

class NoteManager {
  constructor(model) {
    this.model = model;
  }

  // Obtener todas las notas
  async getAllNotes() {
    try {
      const data = await noteServices.getAllNotes();
      const notes = data;
      return notes ? notes : { error: true, message: "No hay notas" };
    } catch (err) {
      console.log("ERROR getAllNotes note.postgres", err);
      return { error: true, data: err };
    }
  }

  // Obtener una nota por ID
  async getNoteById(nid) {
    if (!nid) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const note = await noteServices.getNoteById(nid);
      return note
        ? note
        : { error: true, message: `No hay una nota con el ID ${nid}` };
    } catch (err) {
      console.log("ERROR getNoteById note.postgres", err);
      return { error: true, data: err };
    }
  }

  // Crear una nueva nota
  async createNote(note) {
    const { title, description, contacts, comments } = note;
    if (!title) {
      return { error: true, message: "El título es obligatorio" };
    }
    try {
      const createdNote = await noteServices.createNote(note);
      return createdNote;
    } catch (err) {
      console.log("ERROR createNote note.postgres", err);
      return { error: true, data: err };
    }
  }

  // Actualizar un campo de la nota por ID
  async updateNoteField(nid, fieldToUpdate, newValue) {
    if (!nid || !fieldToUpdate || newValue === undefined) {
      return { error: true, message: "Faltan campos a completar." };
    }
    try {
      const updatedNote = await noteServices.updateNoteById(
        noteId,
        fieldToUpdate,
        newValue
      );
      return updatedNote;
    } catch (err) {
      console.log("ERROR updateNoteField note.postgres", err);
      return { error: true, data: err };
    }
  }

  // Eliminar una nota por ID
  async deleteNoteById(noteId) {
    try {
      const deletedNote = await noteServices.deleteNoteById(noteId);
      return deletedNote;
    } catch (err) {
      console.log("ERROR deleteNoteById note.postgres", err);
      return { error: true, data: err };
    }
  }
}

const noteManager = new NoteManager();

export default noteManager;
