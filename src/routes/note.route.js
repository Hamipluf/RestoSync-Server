import express from "express";
import {
  createNote,
  deleteNoteById,
  getNoteById,
  getOwnerNote,
  updateNoteById,
  getNoteByUser,
  addCommentToNote,
  getAllCommentsByNoteId,
  deleteCommentOfnote,
  addNoteToTask,
  getAllNotesByTaskId,
} from "../contollers/notes.controllers.js";

const router = express.Router();
// Obtener una nota por su ID
router.get("/one/:nid", getNoteById);

// Obtener el user de una nota
router.get("/user/:nid", getOwnerNote);

// Obtener las notas de un user
router.get("/all/user/:oid", getNoteByUser);

// Obtener todos los comentarios de una nota
router.get("/all/comments/:nid", getAllCommentsByNoteId);

// Obtener toas las notas con un task_id
router.get("/task/:tid", getAllNotesByTaskId);

// Crear una nueva nota
router.post("/create", createNote);

// Agrega un comentario a la nota
router.post("/add/comment/:nid", addCommentToNote);

// agrega una nota a la tarea
router.post("/add/task", addNoteToTask);

// Actualizar una nota por su ID
router.put("/update/:nid", updateNoteById);

// Eliminar una nota por su ID
router.delete("/delete/:nid", deleteNoteById);

// Eliminar un comentario de una nota
router.delete("/delete/:nid/comment/:cid", deleteCommentOfnote);

export default router;
