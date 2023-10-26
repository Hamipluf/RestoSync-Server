import customResponses from "../utils/customResponses.js";
import TaskManager from "../persistencia/DAOs/tasks.postgresql.js";

const taskManager = new TaskManager();

// Obtener todas las tareas
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la tarea"));
  }

  try {
    const tasks = await taskManager.getTaskById(parseInt(id));

    if (tasks.length === 0) {
      return res
        .status(404)
        .json(customResponses.badResponse(404, "No hay tareas para devolver"));
    }

    if ("error" in tasks) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos",
            tasks.message
          )
        );
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Tareas encontradas", tasks));
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
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

  if (!name || !user_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const newTask = await taskManager.addTask(req.body);

    if ("error" in newTask) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error al crear la tarea",
            newTask.message
          )
        );
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
export const updateTask = async (req, res) => {
  const { id } = req.params;

  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la tarea"));
  }
  const { newName } = req.body;

  if (!title || !description || !userId) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const updatedTask = await taskManager.updateTask(parseInt(id), req.body);

    if ("error" in updatedTask) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error al actualizar la tarea",
            updatedTask.message
          )
        );
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
export const deleteTask = async (req, res) => {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la tarea"));
  }
  try {
    const deletedTask = await taskManager.deleteTask(id);

    if ("error" in deletedTask) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error al eliminar la tarea",
            deletedTask.message
          )
        );
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Tarea eliminada con éxito"));
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
