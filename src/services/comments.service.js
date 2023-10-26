import { query } from "../persistencia/PostgreSQL/config.js";

class CommentsService {
  // Crea un nuevo comentario
  createComment = async (comment) => {
    const { body, user_id, created_at, updated_at } = comment;
    try {
      const commentCreated = await query(
        "INSERT INTO comments (body, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *",
        [body, user_id, created_at, updated_at]
      );
      return commentCreated.rows[0];
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
  // Obtiene todos los comentarios
  getAllComments = async () => {
    try {
      const data = await query("SELECT * FROM comments ");
      const comment = data.rows;
      return comment;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Actualiza un comentario por su ID
  updateComment = async (commentId, newInfo) => {
    const { body, user_id, updated_at } = newInfo;
    try {
      const updatedComment = await query(
        "UPDATE comments SET body = $2, user_id = $3, updated_at = $4 WHERE id = $1 RETURNING *",
        [commentId, body, user_id, updated_at]
      );
      return updatedComment.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina un comentario por su ID
  deleteComment = async (commentId) => {
    try {
      const deletedComment = await query(
        "DELETE FROM comments WHERE id = $1 RETURNING *",
        [commentId]
      );
      return deletedComment.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const commentService = new CommentsService();

export default commentService;
