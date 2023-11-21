import { response } from "express";
import notesService from "../../services/notes.services.js";

export default class NoteManager {
  // Obtiene una nota por su ID
  async getNoteById(noteId) {
    if (!noteId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const note = await notesService.getNoteById(noteId);
      return note
        ? note
        : { error: true, message: `No hay una nota con el ID ${noteId}` };
    } catch (err) {
      console.log("ERROR getNoteById notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // OObtiene todas las notas de un user
  async getNoteByUser(owner_id) {
    if (!owner_id) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const notes = await notesService.getAllNotesByUserId(owner_id);
      return notes
        ? notes
        : { error: true, message: `No hay una notas para el user ${owner_id}` };
    } catch (err) {
      console.log("ERROR getNoteByUser notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Crea una nueva nota para un usuario
  async createNote(owner_id, title, description) {
    try {
      const newNote = await notesService.createNote(
        title,
        description,
        owner_id
      );
      let response;
      newNote.error
        ? (response = { error: true, message: newNote.data })
        : (response = newNote);
      return response;
    } catch (err) {
      console.log("ERROR createNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Crea y agrega una nota a una tarea
  async addTaskToNote(owner_id, task_id, description, title) {
    let response;
    try {
      // Crear nota
      const newNote = await this.createNote(owner_id, title, description);
      newNote.error
        ? (response = { error: true, message: newNote.data })
        : (response = { success: true});
      // Agregar la nota
      const noteAdded = await notesService.addTaskToNote(newNote?.id, task_id);
      noteAdded.error
        ? (response = { error: true, message: noteAdded.data })
        : (response = { success: true, data: noteAdded });
      return response;
    } catch (err) {
      console.log("ERROR addTaskToNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Agrega un comentario a una nota específica
  async addCommentToNote(noteId, comment, userId) {
    try {
      const result = await notesService.addCommentToNote(
        noteId,
        comment,
        userId
      );
      return result.error
        ? { error: true, message: result.data }
        : { success: true, commentId: result.data };
    } catch (err) {
      console.log("ERROR addCommentToNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Actualiza una nota existente
  async updateNote(noteId, updatedNote) {
    try {
      const noteData = updatedNote;
      const updated = await notesService.updateNote(noteId, noteData);
      let response;
      updated.error
        ? (response = { error: true, message: updated.data })
        : (response = updated);
      return response;
    } catch (err) {
      console.log("ERROR updateNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Elimina una nota por su ID
  async deleteNote(noteId) {
    try {
      const deleted = await notesService.deleteNote(noteId);
      let response;
      deleted.error
        ? (response = { error: true, message: deleted.data })
        : (response = deleted);
      return response;
    } catch (err) {
      console.log("ERROR deleteNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene el usuario propietario de una nota
  async getNoteOwner(noteId) {
    try {
      const owner = await notesService.getNoteOwner(noteId);
      return owner
        ? owner
        : {
            error: true,
            message: `No se encontró el propietario de la nota con el ID ${noteId}`,
          };
    } catch (err) {
      console.log("ERROR getNoteOwner notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Elimina la relacion entre un comentario y una nota
  async deleteCommentOfNote(noteId, commentId) {
    try {
      const deleteComment = await notesService.deleteCommentNoteRelation(
        noteId,
        commentId
      );
      return deleteComment
        ? deleteComment
        : {
            error: true,
            message: `No se pudo eliminar el comentario ${commentId} de la nota con ID ${noteId}`,
          };
    } catch (err) {
      console.log("ERROR deleteCommentOfNote notes.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene todos los comentarios de una nota
  async getAllCommentByNoteId(noteId) {
    try {
      const comments = await notesService.getAllCommentsByNoteId(noteId);
      return comments
        ? comments
        : {
            error: true,
            message: `No se encontraron comentarios de la nota con el ID ${noteId}`,
          };
    } catch (err) {
      console.log("ERROR getAllCommentByNoteId notes.postgres", err);
      return { error: true, data: err };
    }
  }
}
