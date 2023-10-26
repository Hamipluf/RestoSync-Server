import { query } from "../persistencia/PostgreSQL/config.js";

class NotesService {
  // Crea una nueva nota
  createNote = async (note) => {
    const { title, description, created_at, is_completed, owner_id } = note;
    try {
      const noteCreated = await query(
        "INSERT INTO notes (title, description, created_at, is_completed, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, description, created_at, is_completed, owner_id]
      );
      return noteCreated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene todas las notas
  getAllNotes = async () => {
    try {
      const data = await query("SELECT * FROM notes ");
      const note = data.rows;
      return note;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Obtiene una nota por su ID
  getNoteById = async (noteId) => {
    try {
      const data = await query("SELECT * FROM notes WHERE id = $1", [noteId]);
      const note = data.rows[0];
      return note;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Actualiza una nota por su ID
  updateNote = async (noteId, newInfo) => {
    const { title, description, is_completed } = newInfo;
    try {
      const updatedNote = await query(
        "UPDATE notes SET title = $2, description = $3, is_completed = $4 WHERE id = $1 RETURNING *",
        [noteId, title, description, is_completed, owner_id]
      );
      return updatedNote.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina una nota por su ID
  deleteNote = async (noteId) => {
    try {
      const deletedNote = await query(
        "DELETE FROM notes WHERE id = $1 RETURNING *",
        [noteId]
      );
      return deletedNote.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Asigna un comentario a una nota
  addComment = async (noteId, commentId) => {
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
  getComments = async (noteId) => {
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

  // Asigna un usuario como propietario de una nota
  setOwner = async (noteId, ownerId) => {
    try {
      const ownerSet = await query(
        "UPDATE notes SET owner_id = $2 WHERE id = $1 RETURNING *",
        [noteId, ownerId]
      );
      return ownerSet.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const notesService = new NotesService();

export default notesService;
