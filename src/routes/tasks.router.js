import express from "express";
import {
  createTask,
  deleteTaskById,
  getAllTasksByUser,
  getTaskById,
  getUserByTask,
  updateTaskById,
} from "../contollers/tasks.controller.js";

const router = express.Router();
// Obtener todas las tareas de un usuario
router.get("/all/user/:uid", getAllTasksByUser);

// Obtiene el usuario al que pertenece una tarea
router.get("/user/:tid", getUserByTask);

// Obtener una tarea por su ID
router.get("/one/:tid", getTaskById);

// Crear una nueva tarea
router.post("/create", createTask);

// Actualizar una tarea por su ID
router.put("/update/:tid", updateTaskById);

// Eliminar una tarea por su ID
router.delete("/delete/:tid", deleteTaskById);

export default router;
