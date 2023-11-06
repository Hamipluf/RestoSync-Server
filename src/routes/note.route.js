import express from "express";
import {
  createNote,
  deleteNoteById,
  getNoteById,
  getOwnerNote,
  updateNoteById,
  getNoteByUser,
} from "../contollers/notes.controllers.js";

const router = express.Router();
// Obtener una nota por su ID
router.get("/one/:nid", getNoteById);

// Obtener el user de una nota
router.get("/user/:nid", getOwnerNote);

// Obtener las notas de un user
router.get("/all/user/:oid", getNoteByUser);

// Crear una nueva nota
router.post("/create", createNote);

// Actualizar una nota por su ID
router.put("/update/:nid", updateNoteById);

// Eliminar una nota por su ID
router.delete("/delete/:nid", deleteNoteById);

export default router;
