import notesServices from "../../services/notes.services.js";
export default class NotesManager {
  // Obtiene todas las notas
  async getAllNotes() {
    try {
      const data = await notesServices.getAllNotes();
      const notes = data.rows;
      return notes ? notes : { error: true, message: "No hay notas" };
    } catch (err) {
      console.log("ERROR getAllNotes notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene una nota por su ID
  async getNoteById(noteId) {
  
    try {
      const note = await notesServices.getNoteById(noteId);
      return note
        ? note
        : { error: true, message: `No hay una nota con el id ${noteId}` };
    } catch (err) {
      console.log("ERROR getNoteById notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Agrega una nueva nota
  async addNote(note) {
    if (!note) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const newNote = await notesServices.createNote(note);
      return newNote.error
        ? { error: true, message: newNote.data }
        : newNote.rows[0];
    } catch (err) {
      console.log("ERROR addNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Actualiza una nota por su ID
  async updateNote(noteId, newInfo) {
  
    try {
      const updatedNote = await notesServices.updateNote(noteId, newInfo);
      return updatedNote.error
        ? { error: true, message: updatedNote.data }
        : updatedNote.rows[0];
    } catch (err) {
      console.log("ERROR updateNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Elimina una nota por su ID
  async deleteNote(noteId) {
   
    try {
      const deletedNote = await notesServices.deleteNote(noteId);
      return deletedNote.error
        ? { error: true, message: deletedNote.data }
        : deletedNote.rows[0];
    } catch (err) {
      console.log("ERROR deleteNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Asigna un comentario a una nota
  async assignCommentToNote(note_id, comment_id) {
    try {
      const commentAssigned = await notesServices.addComment(
        note_id,
        comment_id
      );
      return commentAssigned.error
        ? { error: true, message: commentAssigned.data }
        : commentAssigned.rows[0];
    } catch (err) {
      console.log("ERROR assignCommentToNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene todos los comentarios asociados a una nota por su ID
  async getCommentsForNote(note_id) {
   
    try {
      const data = await notesServices.getComments(note_id);
      return data.rows;
    } catch (err) {
      console.log("ERROR getCommentsForNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Asigna un usuario como propietario de una nota
  async assignOwnerToNote(noteId, ownerId) {
    if (!noteId || !ownerId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const ownerAssigned = await notesServices.setOwner(noteId, ownerId);
      return ownerAssigned.error
        ? { error: true, message: ownerAssigned.data }
        : ownerAssigned.rows[0];
    } catch (err) {
      console.log("ERROR assignOwnerToNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
}
