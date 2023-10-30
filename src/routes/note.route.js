import express from "express";
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  getOwnerNote,
  updateNoteById,
} from "../contollers/notes.controllers.js";

const router = express.Router();
// Obtener todas las notas
router.get("/all", getAllNotes);

// Obtener una nota por su ID
router.get("/one/:nid", getNoteById);

// Obtener el user de una nota
router.get("/user/:nid", getOwnerNote);

// Crear una nueva nota
router.post("/create", createNote);

// Actualizar una nota por su ID
router.put("/update/:nid", updateNoteById);

// Eliminar una nota por su ID
router.delete("/delete/:nid", deleteNoteById);

export default router;
