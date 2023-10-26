import tasksServices from "../../services/tasks.service.js";
export default class TaskManager {
  // Obtiene una tarea por su ID
  async getTaskById(taskId) {
    if (!taskId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const task = await tasksServices.getTaskById(taskId);
      return task
        ? task
        : { error: true, message: `No hay una tarea con el id ${taskId}` };
    } catch (err) {
      console.log("ERROR getTaskById tasks.postgres", err);
      return { error: true, data: err };
    }
  }
  // Agrega una nueva tarea
  async addTask(task) {
    if (!task) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const newTask = await tasksServices.createTask(task);
      return newTask.error
        ? { error: true, message: newTask.data }
        : newTask.rows[0];
    } catch (err) {
      console.log("ERROR addTask tasks.postgres", err);
      return { error: true, data: err };
    }
  }
  // Actualiza una tarea por su ID
  async updateTask(taskId, newInfo) {
    if (!taskId || !newInfo) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const updatedTask = await tasksServices.updateTask(taskId, newInfo);
      return updatedTask.error
        ? { error: true, message: updatedTask.data }
        : updatedTask.rows[0];
    } catch (err) {
      console.log("ERROR updateTask tasks.postgres", err);
      return { error: true, data: err };
    }
  }
  // Elimina una tarea por su ID
  async deleteTask(taskId) {
    if (!taskId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const deletedTask = await tasksServices.deleteTask(taskId);
      return deletedTask.error
        ? { error: true, message: deletedTask.data }
        : deletedTask.rows[0];
    } catch (err) {
      console.log("ERROR deleteTask tasks.postgres", err);
      return { error: true, data: err };
    }
  }
}
