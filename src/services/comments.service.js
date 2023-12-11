import { query } from "../persistencia/PostgreSQL/config.js";

class CommentsService {
  constructor(model) {
    this.model = model;
  }
  // Obtiene todos los comentarios de un usuario
  getAllCommentsByUserId = async (userId) => {
    try {
      const comments = await query(
        "SELECT * FROM comments WHERE user_id = $1",
        [userId]
      );
      return comments.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene un comentario por su ID
  getCommentById = async (commentId) => {
    try {
      const data = await query("SELECT * FROM comments WHERE id = $1", [
        commentId,
      ]);
      const comment = data.rows[0];
      return comment;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Crea un nuevo comentario para un usuario
  createComment = async (userId, comment) => {
    try {
      const commentCreated = await query(
        "INSERT INTO comments (body, user_id) VALUES ($1, $2) RETURNING *",
        [comment, userId]
      );
      return commentCreated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Actualiza un comentario existente
  updateComment = async (commentId, updatedComment) => {
    const { body, updated_at } = updatedComment;
    try {
      const commentUpdated = await query(
        "UPDATE comments SET body = $1 , updated_at = $2 WHERE id = $3 RETURNING *",
        [body, updated_at, commentId]
      );
      return commentUpdated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina un comentario por su ID
  deleteComment = async (commentId) => {
    try {
      // Elimino las relaiones del comentario primerio
      await query("DELETE FROM note_comments WHERE comment_id = $1", [
        commentId,
      ]);
      const commentDeleted = await query(
        "DELETE FROM comments WHERE id = $1 RETURNING *",
        [commentId]
      );
      return commentDeleted.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene el usuario que realizó un comentario
  getCommentUser = async (commentId) => {
    try {
      const data = await query(
        "SELECT u.id, u.name, u.last_name, u.email, u.photos, u.username, u.role FROM comments c JOIN users u ON c.user_id = u.id WHERE c.id = $1",
        [commentId]
      );
      const user = data.rows[0];
      return user;
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const commentsService = new CommentsService();

export default commentsService;
