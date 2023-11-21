import tasksService from "../../services/tasks.service.js";

export default class TaskManager {
  // Obtiene todas las tareas de un usuario
  async getAllTasksByUserId(userId) {
    try {
      const data = await tasksService.getAllTasksByUserId(userId);
      const tasks = data
        ? data
        : { error: true, message: "No hay tareas para este usuario" };
      return tasks;
    } catch (err) {
      console.log("ERROR getAllTasksByUserId tasks.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene una tarea por su ID
  async getTaskById(taskId) {
    try {
      const task = await tasksService.getTaskById(taskId);
      return task
        ? task
        : { error: true, message: `No hay una tarea con el ID ${taskId}` };
    } catch (err) {
      console.log("ERROR getTaskById tasks.postgres", err);
      return { error: true, data: err };
    }
  }
  // Crea una nueva tarea para un usuario
  async createTask(uid, name) {
    try {
      const taskData = { name, is_completed: false };
      const newTask = await tasksService.createTask(uid, taskData);
      let response;
      newTask.error
        ? (response = { error: true, message: newTask.data })
        : (response = newTask);
      return response;
    } catch (err) {
      console.log("ERROR createTask tasks.postgres", err);
      return { error: true, data: err };
    }
  }
  // Actualiza una tarea existente
  async updateTask(taskId, updatedTask) {
    try {
      const updated = await tasksService.updateTask(taskId, updatedTask);
      let response;
      updated.error
        ? (response = { error: true, message: updated.data })
        : (response = updated);
      return response;
    } catch (err) {
      console.log("ERROR updateTask tasks.postgres", err);
      return { error: true, data: err };
    }
  }
  // Elimina una tarea por su ID
  async deleteTask(taskId) {
    try {
      const deleted = await tasksService.deleteTask(taskId);
      let response;
      deleted.error
        ? (response = { error: true, message: deleted.data })
        : (response = deleted);
      return response;
    } catch (err) {
      console.log("ERROR deleteTask tasks.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene las notas de una tarea
  async getNotes(taskId) {
    try {
      const notes = await tasksService.getNotesOfTask(taskId);
      return notes
        ? notes
        : {
            error: true,
            message: `No se encontró notas de la tarea con el ID ${taskId}`,
          };
    } catch (err) {
      console.log("ERROR getTaskUser tasks.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene el usuario al que pertenece una tarea
  async getTaskUser(taskId) {
    try {
      const user = await tasksService.getTaskUser(taskId);
      return user
        ? user
        : {
            error: true,
            message: `No se encontró el usuario de la tarea con el ID ${taskId}`,
          };
    } catch (err) {
      console.log("ERROR getTaskUser tasks.postgres", err);
      return { error: true, data: err };
    }
  }
}
