import { query } from "../persistencia/PostgreSQL/config.js";

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
  createNote = async (note, owner_id) => {
    const { title, description, is_completed } = note;
    console.log("note", note);
    try {
      const noteCreated = await query(
        "INSERT INTO notes (title, description, owner_id, is_completed) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, owner_id, is_completed]
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
}

const notesService = new NotesService();

export default notesService;
