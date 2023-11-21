import customResponses from "../utils/customResponses.js";
import TasksManager from "../persistencia/DAOs/tasks.postgresql.js";
import NoteManager from "../persistencia/DAOs/notes.postgresql.js";

const tasksManager = new TasksManager();
const notesManager = new NoteManager();

// Obtener todas las tareas de un usuario
export const getAllTasksByUser = async (req, res) => {
  const { uid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!uid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID del user."));
  }
  try {
    const tasks = await tasksManager.getAllTasksByUserId(parseInt(uid));
    if (tasks.length === 0) {
      return res
        .status(404)
        .json(customResponses.badResponse(404, "No hay tareas para devolver."));
    }

    if ("error" in tasks) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos.",
            tasks.message
          )
        );
    }

    // Eliminar espacios en blanco sobrantes de las propiedades de cada tarea
    const formattedTasks = tasks.map((task) => {
      for (const key in task) {
        if (typeof task[key] === "string") {
          task[key] = task[key].trim();
        }
      }
      return task;
    });

    res
      .status(200)
      .json(
        customResponses.responseOk(200, "Tareas encontradas", formattedTasks)
      );
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener todas las notas de una tarea
export const getAllNotesOfTasks = async (req, res) => {
  const { tid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!tid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID de la tarea."));
  }
  try {
    const notes = await tasksManager.getNotes(parseInt(tid));
    if (notes.length === 0) {
      return res
        .status(404)
        .json(customResponses.badResponse(404, "No hay notas para devolver."));
    }
    if ("error" in notes) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos.",
            notes.message
          )
        );
    }

    // Eliminar espacios en blanco sobrantes de las propiedades de cada nota
    const formattedNote = notes.map((note) => {
      for (const key in note) {
        if (typeof note[key] === "string") {
          note[key] = note[key].trim();
        }
      }
      return note;
    });

    res
      .status(200)
      .json(
        customResponses.responseOk(200, "Notas encontradas", formattedNote)
      );
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtiene el usuario al que pertenece una tarea
export const getUserByTask = async (req, res) => {
  const { tid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!tid) {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Falta el ID de la tarea."));
  }
  try {
    const task = await tasksManager.getTaskUser(parseInt(tid));
    if ("error" in task) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, task.message));
    }

    for (const key in task) {
      if (typeof task[key] === "string") {
        task[key] = task[key].trim();
      }
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "User encontrado", task));
  } catch (error) {
    console.error("Error al obtener el user:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener una tarea por su ID
export const getTaskById = async (req, res) => {
  const { tid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!tid) {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Falta el ID de la tarea."));
  }
  try {
    const task = await tasksManager.getTaskById(parseInt(tid));
    if ("error" in task) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, task.message));
    }

    for (const key in task) {
      if (typeof task[key] === "string") {
        task[key] = task[key].trim();
      }
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Tarea encontrada", task));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Crear una nueva tarea
export const createTask = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { name, user_id } = req.body;
  if (!name) {
    return res
      .status(404)
      .json(customResponses.badResponse(404, "Faltan campos a completar."));
  }
  if (!user_id) {
    return res
      .status(404)
      .json(
        customResponses.badResponse(
          404,
          "Falta el ID del user para crear la tarea."
        )
      );
  }
  try {
    const newTask = await tasksManager.createTask(parseInt(user_id), name);

    if ("error" in newTask) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, newTask.message));
    }

    res
      .status(201)
      .json(customResponses.responseOk(201, "Tarea creada con éxito", newTask));
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Actualizar una tarea por su ID
export const updateTaskById = async (req, res) => {
  const { tid } = req.params;
  if (req.method !== "PUT") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!tid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID de la tarea."));
  }

  const { name, is_completed } = req.body;
  if (!name || !is_completed) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Faltan campos a completar."));
  }
  try {
    const updatedTask = await tasksManager.updateTask(parseInt(tid), req.body);

    if (updatedTask.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, updatedTask.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Tarea actualizada con éxito",
          updatedTask
        )
      );
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Eliminar una tarea por su ID
export const deleteTaskById = async (req, res) => {
  const { tid } = req.params;
  if (req.method !== "DELETE") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!tid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID de la tarea."));
  }

  try {
    const deletedTask = await tasksManager.deleteTask(parseInt(tid));
    // console.log(deletedTask);
    if (deletedTask.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, deletedTask.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Tarea eliminada con éxito",
          deletedTask
        )
      );
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
