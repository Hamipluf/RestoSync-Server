import { query } from "../persistencia/PostgreSQL/config.js";
import commentsService from "./comments.service.js";

class NotesService {
  constructor(model) {
    this.model = model;
  }
  // Obtiene todas las notas
  getAllNotes = async () => {
    try {
      const notes = await query("SELECT * FROM notes");
      return notes.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene todas las notas de un user
  getAllNotesByUserId = async (userId) => {
    try {
      const notes = await query(
        "SELECT notes.*, owner_id AS owner_id, users.name, users.email, users.username, users.photos, users.last_name, users.role FROM notes INNER JOIN users ON notes.owner_id = owner_id WHERE users.id = $1",
        [userId]
      );

      return notes.rows;
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

  // Crea una nueva nota
  createNote = async (title, description, owner_id) => {
    try {
      const noteCreated = await query(
        "INSERT INTO notes (title, description, owner_id) VALUES ($1, $2, $3) RETURNING *",
        [title, description, owner_id]
      );
      return noteCreated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Actualiza una nota existente
  updateNote = async (noteId, updatedNote) => {
    const { title, description, is_completed } = updatedNote;
    try {
      const noteUpdated = await query(
        "UPDATE notes SET title = $1, description = $2, is_completed = $3 WHERE id = $4 RETURNING *",
        [title, description, is_completed, noteId]
      );
      return noteUpdated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina una nota por su ID
  deleteNote = async (noteId) => {
    try {
      const noteDeleted = await query(
        "DELETE FROM notes WHERE id = $1 RETURNING *",
        [noteId]
      );
      return noteDeleted.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Agrega un comentario a una nota específica
  addCommentToNote = async (note_id, comment, user_id) => {
    try {
      // Primero, creamos el comentario usando el servicio de comentarios (commentsService)
      const newComment = await commentsService.createComment(user_id, comment);
      const commentId = newComment.id;
      // Luego, vinculamos el comentario a la nota en la tabla intermedia note_comments
      const linkCommentToNote = await query(
        "INSERT INTO note_comments (note_id, comment_id) VALUES ($1, $2) RETURNING *",
        [note_id, commentId]
      );

      return linkCommentToNote.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Método para el service de notes que agrega una tarea a una nota
  addTaskToNote = async (note_id, task_id) => {
    try {
      const result = await query(
        "UPDATE notes SET task_id = $1 WHERE id = $2 RETURNING *",
        [task_id, note_id]
      );
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return {
          error: true,
          data: "No se pudo agregar la tarea a la nota.",
        };
      }
    } catch (err) {
      return { error: true, data: err.message };
    }
  };

  // Obtiene el propietario de una nota
  getNoteOwner = async (noteId) => {
    try {
      const data = await query(
        "SELECT u.id, u.name, u.last_name, u.email, u.photos, u.username, u.role FROM notes n JOIN users u ON n.owner_id = u.id WHERE n.id = $1",
        [noteId]
      );
      const owner = data.rows[0];
      return owner;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtener todos los comentarios de una nota por su ID
  getAllCommentsByNoteId = async (noteId) => {
    try {
      const comments = await query(
        "SELECT c.*, u.name as user_name, u.email as user_email, u.username as user_username, u.photos as user_photos, u.last_name as user_last_name, u.role as user_role " +
          "FROM comments c " +
          "JOIN note_comments nc ON c.id = nc.comment_id " +
          "JOIN users u ON c.user_id = u.id " +
          "WHERE nc.note_id = $1",
        [noteId]
      );
      return comments.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene todas notas con el mismo task_id
  getAllNotesByTaskId = async (task_id) => {
    try {
      const notes = await query(
        "SELECT n.id AS note_id, n.title, n.description, n.created_at AS note_created_at, n.is_completed, t.id AS task_id, t.name AS task_name FROM notes n JOIN tasks t ON n.task_id = t.id WHERE n.task_id = $1;",
        [task_id]
      );
      return notes.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Eliminar la relación de un comentario a una nota
  deleteCommentNoteRelation = async (noteId, commentId) => {
    try {
      const deleteRelation = await query(
        "DELETE FROM note_comments WHERE note_id = $1 AND comment_id = $2 RETURNING *",
        [noteId, commentId]
      );
      return deleteRelation.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const notesService = new NotesService();

export default notesService;
