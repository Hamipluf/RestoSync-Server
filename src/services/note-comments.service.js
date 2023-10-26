import { query } from "../persistencia/PostgreSQL/config.js";

class NoteCommentsService {
  // Asigna un comentario a una nota
  addCommentToNote = async (noteId, commentId) => {
    try {
      const commentAdded = await query(
        "INSERT INTO note_comments (note_id, comment_id) VALUES ($1, $2) RETURNING *",
        [noteId, commentId]
      );
      return commentAdded.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene todos los comentarios asociados a una nota
  getCommentsForNote = async (noteId) => {
    try {
      const data = await query(
        "SELECT comments.* FROM comments JOIN note_comments ON comments.id = note_comments.comment_id WHERE note_comments.note_id = $1",
        [noteId]
      );
      return data.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina la relación entre un comentario y una nota
  removeCommentFromNote = async (noteId, commentId) => {
    try {
      const commentRemoved = await query(
        "DELETE FROM note_comments WHERE note_id = $1 AND comment_id = $2 RETURNING *",
        [noteId, commentId]
      );
      return commentRemoved.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const noteCommentsService = new NoteCommentsService();

export default noteCommentsService;
