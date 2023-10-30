import commentsService from "../../services/comments.service.js";

export default class CommentManager {
  // Obtiene todos los comentarios de un usuario
  async getAllCommentsByUserId(userId) {
    try {
      const data = await commentsService.getAllCommentsByUserId(userId);
      const comments = data
        ? data
        : { error: true, message: "No hay comentarios para este usuario" };
      return comments;
    } catch (err) {
      console.log("ERROR getAllCommentsByUserId comments.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene un comentario por su ID
  async getCommentById(commentId) {
    try {
      const comment = await commentsService.getCommentById(commentId);
      return comment
        ? comment
        : {
            error: true,
            message: `No hay un comentario con el ID ${commentId}`,
          };
    } catch (err) {
      console.log("ERROR getCommentById comments.postgres", err);
      return { error: true, data: err };
    }
  }
  // Crea un nuevo comentario para un usuario
  async createComment(userId, comment) {
    try {
      const newComment = await commentsService.createComment(userId, comment);
      let response;
      newComment.error
        ? (response = { error: true, message: newComment.data })
        : (response = newComment);
      return response;
    } catch (err) {
      console.log("ERROR createComment comments.postgres", err);
      return { error: true, data: err };
    }
  }
  // Actualiza un comentario existente
  async updateComment(commentId, updatedComment) {
    try {
      const updated = await commentsService.updateComment(
        commentId,
        updatedComment
      );
      let response;
      updated.error
        ? (response = { error: true, message: updated.data })
        : (response = updated);
      return response;
    } catch (err) {
      console.log("ERROR updateComment comments.postgres", err);
      return { error: true, data: err };
    }
  }
  // Elimina un comentario por su ID
  async deleteComment(commentId) {
    try {
      const deleted = await commentsService.deleteComment(commentId);
      let response;
      deleted.error
        ? (response = { error: true, message: deleted.data })
        : (response = deleted);
      return response;
    } catch (err) {
      console.log("ERROR deleteComment comments.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene el usuario que realizó un comentario
  async getCommentUser(commentId) {

    try {
      const user = await commentsService.getCommentUser(commentId);
      return user
        ? user
        : {
            error: true,
            message: `No se encontró el usuario del comentario con el ID ${commentId}`,
          };
    } catch (err) {
      console.log("ERROR getCommentUser comments.postgres", err);
      return { error: true, data: err };
    }
  }
}
