import noteCommentsServices from "../../services/note-comments.service.js";

export default class NoteCommentsManager {
  // Asigna un comentario a una nota
  async addCommentToNote(noteId, commentId) {
    if (!noteId || !commentId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const commentAdded = await noteCommentsServices.addCommentToNote(
        noteId,
        commentId
      );
      return commentAdded.error
        ? { error: true, message: commentAdded.data }
        : commentAdded;
    } catch (err) {
      console.log("ERROR addCommentToNote noteComments.postgres", err);
      return { error: true, data: err };
    }
  }

  // Obtiene todos los comentarios asociados a una nota por su ID
  async getCommentsForNote(noteId) {
    if (!noteId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const comments = await noteCommentsServices.getCommentsForNote(noteId);
      return comments.error
        ? { error: true, message: comments.data }
        : comments;
    } catch (err) {
      console.log("ERROR getCommentsForNote noteComments.postgres", err);
      return { error: true, data: err };
    }
  }

  // Elimina la relación entre un comentario y una nota
  async removeCommentFromNote(noteId, commentId) {
    if (!noteId || !commentId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const commentRemoved = await noteCommentsServices.removeCommentFromNote(
        noteId,
        commentId
      );
      return commentRemoved.error
        ? { error: true, message: commentRemoved.data }
        : commentRemoved;
    } catch (err) {
      console.log("ERROR removeCommentFromNote noteComments.postgres", err);
      return { error: true, data: err };
    }
  }
}
