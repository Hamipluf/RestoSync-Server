import express from "express";
import {
  createComment,
  deleteCommentById,
  getAllCommentsByUser,
  getCommentById,
  getCommentUser,
  updateCommentById,
} from "../contollers/comments.controllers.js";

const router = express.Router();
// Obtiene todos los comentarios de un usuario
router.get("/all/user/:uid", getAllCommentsByUser);

// Obtener un comentario por su ID
router.get("/one/:cid", getCommentById);

// Obtiene el usuario que realizó un comentario
router.get("/user/:cid", getCommentUser);

// Crear un nuevo comentario
router.post("/create", createComment);

// Actualizar un comentario por su ID
router.put("/update/:cid", updateCommentById);

// Eliminar una nota por su ID
router.delete("/delete/:cid", deleteCommentById);

export default router;
