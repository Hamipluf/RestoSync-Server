import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNoteField,
} from "../contollers/notes.controllers.js";

const router = express.Router();

// Obtener todas las notas
router.get("/", getAllNotes);

// Obtener una nota por ID
router.get("/:id", getNoteById);

// Crear una nueva nota
router.post("/create", createNote);

// Actualizar un campo de la nota por ID
router.put("/update/:id", updateNoteField);

// Eliminar una nota por ID
router.delete("/delete/:id", deleteNote);

export default router;
