import { query } from "../persistencia/PostgreSQL/config.js";

class TasksService {
  constructor(model) {
    this.model = model;
  }

  // Obtiene todas las tareas de un usuario
  getAllTasksByUserId = async (userId) => {
    try {
      const tasks = await query("SELECT * FROM tasks WHERE user_id = $1", [
        userId,
      ]);
      return tasks.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene una tarea por su ID
  getTaskById = async (taskId) => {
    try {
      const data = await query("SELECT * FROM tasks WHERE id = $1", [taskId]);
      const task = data.rows[0];
      return task;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Crea una nueva tarea para un usuario
  createTask = async (userId, task) => {
    const { name, is_completed } = task;
    try {
      const taskCreated = await query(
        "INSERT INTO tasks (name, user_id, is_completed) VALUES ($1, $2, $3) RETURNING *",
        [name, userId, is_completed]
      );
      return taskCreated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Actualiza una tarea existente
  updateTask = async (taskId, updatedTask) => {
    const { name, is_completed } = updatedTask;
    try {
      const taskUpdated = await query(
        "UPDATE tasks SET name = $1, is_completed = $2 WHERE id = $3 RETURNING *",
        [name, is_completed, taskId]
      );
      return taskUpdated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina una tarea por su ID
  deleteTask = async (taskId) => {
    try {
      const taskDeleted = await query(
        "DELETE FROM tasks WHERE id = $1 RETURNING *",
        [taskId]
      );
      return taskDeleted.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene el usuario al que pertenece una tarea
  getTaskUser = async (taskId) => {
    try {
      const data = await query(
        "SELECT u.id, u.name, u.last_name, u.email, u.photos, u.username, u.role FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.id = $1",
        [taskId]
      );
      const user = data.rows[0];
      return user;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene las notas de una tarea
  getNotesOfTask = async (task_id) => {
    try {
      const result = await query(
        "SELECT n.* FROM tasks t INNER JOIN notes n ON t.notes = n.id WHERE t.id = $1",
        [task_id]
      );
      return result.rows;
    } catch (err) {
      return {
        error: true,
        data: err.message,
      };
    }
  };
}

const tasksService = new TasksService();

export default tasksService;
