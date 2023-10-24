import { query } from "../persistencia/PostgreSQL/config.js";

class NoteServices {
  // Crear una nueva nota
  async createNote(note) {
    const { title, description, contacts, comments } = note;
    try {
      const result = await query(
        `
      INSERT INTO notes (title, description, contacts, comments)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
        [title, description, contacts, comments]
      );

      return result.rows[0];
    } catch (error) {
      return { error: true, data: error };
    }
  }
  // Obtener todas las notas
  async getAllNotes() {
    try {
      const result = await query(`
      SELECT * FROM notes;
    `);

      return result.rows;
    } catch (error) {
      return { error: true, data: error };
    }
  }
  // Obtener una nota por su ID
  async getNoteById(nid) {
    try {
      const result = await query(
        `
          SELECT * FROM notes
          WHERE id = $1;
        `,
        [nid]
      );

      return result.rows[0] || null;
    } catch (error) {
      return { error: true, data: error };
    }
  }

  // Actualizar una nota por su ID
  async updateNoteById(noteId, fieldToUpdate, newValue) {
    try {
      const result = await query(
        `UPDATE notes SET ${fieldToUpdate} = $1 WHERE id = $2 RETURNING *`,
        [newValue, nid]
      );

      if (result.rows.length === 0) {
        return {
          error: true,
          message: `Nota con ID ${nid} no encontrada`,
        };
      }

      return result.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  }

  // Eliminar una nota por su ID
  async deleteNoteById(nid) {
    try {
      const result = await query(
        `
      DELETE FROM notes
      WHERE id = $1
      RETURNING *;
    `,
        [nid]
      );

      return result.rows[0] || null;
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

const noteServices = new NoteServices();

export default noteServices;
