import { query } from "../persistencia/PostgreSQL/config.js";

class TasksService {
  // Crea una nueva tarea para un usuario específico
  createTask = async (task) => {
    const { name, user_id } = task;
    try {
      const taskCreated = await query(
        "INSERT INTO tasks (name, user_id) VALUES ($1, $2) RETURNING *",
        [name, user_id]
      );
      return taskCreated.rows[0];
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

  // Actualiza una tarea por su ID
  updateTask = async (taskId, newName) => {
    try {
      const updatedTask = await query(
        "UPDATE tasks SET name = $2 WHERE id = $1 RETURNING *",
        [taskId, newName]
      );
      return updatedTask.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina una tarea por su ID
  deleteTask = async (taskId) => {
    try {
      const deletedTask = await query(
        "DELETE FROM tasks WHERE id = $1 RETURNING *",
        [taskId]
      );
      return deletedTask.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const tasksService = new TasksService();


export default tasksService;
