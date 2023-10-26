import commentsServices from "../../services/comments.service.js";

export default class CommentsManager {
  // Obtiene todos los comentarios
  async getAllComments() {
    try {
      const data = await commentsServices.getAllComments();
      const comments = data.rows;
      return comments
        ? comments
        : { error: true, message: "No hay comentarios" };
    } catch (err) {
      console.log("ERROR getAllComments comments.postgres", err);
      return { error: true, data: err };
    }
  }

  // Obtiene un comentario por su ID
  async getCommentById(commentId) {
    if (!commentId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const comment = await commentsServices.getCommentById(commentId);
      return comment
        ? comment
        : {
            error: true,
            message: `No hay un comentario con el id ${commentId}`,
          };
    } catch (err) {
      console.log("ERROR getCommentById comments.postgres", err);
      return { error: true, data: err };
    }
  }

  // Agrega un nuevo comentario
  async addComment(comment) {
    if (!comment) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const newComment = await commentsServices.createComment(comment);
      return newComment.error
        ? { error: true, message: newComment.data }
        : newComment.rows[0];
    } catch (err) {
      console.log("ERROR addComment comments.postgres", err);
      return { error: true, data: err };
    }
  }

  // Actualiza un comentario por su ID
  async updateComment(commentId, newInfo) {
    if (!commentId || !newInfo) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const updatedComment = await commentsServices.updateComment(
        commentId,
        newInfo
      );
      return updatedComment.error
        ? { error: true, message: updatedComment.data }
        : updatedComment.rows[0];
    } catch (err) {
      console.log("ERROR updateComment comments.postgres", err);
      return { error: true, data: err };
    }
  }

  // Elimina un comentario por su ID
  async deleteComment(commentId) {
    if (!commentId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const deletedComment = await commentsServices.deleteComment(commentId);
      return deletedComment.error
        ? { error: true, message: deletedComment.data }
        : deletedComment.rows[0];
    } catch (err) {
      console.log("ERROR deleteComment comments.postgres", err);
      return { error: true, data: err };
    }
  }
}
