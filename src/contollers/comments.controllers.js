import customResponses from "../utils/customResponses.js";
import CommentsManager from "../persistencia/DAOs/comments.postgresql.js";

const commentsManager = new CommentsManager();

// Obtiene todos los comentarios de un usuario
export const getAllCommentsByUser = async (req, res) => {
  const { uid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!uid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el id del user."));
  }
  try {
    const comments = await commentsManager.getAllCommentsByUserId(
      parseInt(uid)
    );
    if (comments.length === 0) {
      return res
        .status(404)
        .json(
          customResponses.badResponse(404, "No hay comentarios para devolver")
        );
    }

    if ("error" in comments) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos",
            comments.message
          )
        );
    }

    // Eliminar espacios en blanco sobrantes de las propiedades de cada comentario
    const formattedComments = comments.map((comment) => {
      for (const key in comment) {
        if (typeof comment[key] === "string") {
          comment[key] = comment[key].trim();
        }
      }
      return comment;
    });

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Comentarios encontrados",
          formattedComments
        )
      );
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener un comentario por su ID
export const getCommentById = async (req, res) => {
  const { cid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!cid) {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Falta el ID del comentario."));
  }
  try {
    const comment = await commentsManager.getCommentById(parseInt(cid));
    if ("error" in comment) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, comment.message));
    }

    for (const key in comment) {
      if (typeof comment[key] === "string") {
        comment[key] = comment[key].trim();
      }
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Comentario encontrado", comment));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtiene el usuario que realizó un comentario
export const getCommentUser = async (req, res) => {
  const { cid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!cid) {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Falta el ID del comentario."));
  }
  try {
    const comment = await commentsManager.getCommentUser(parseInt(cid));
    if ("error" in comment) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, comment.message));
    }

    for (const key in comment) {
      if (typeof comment[key] === "string") {
        comment[key] = comment[key].trim();
      }
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Comentario encontrado", comment));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Crear un nuevo comentario
export const createComment = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { body, user_id } = req.body;
  if (!body || !user_id) {
    return res
      .status(404)
      .json(customResponses.badResponse(404, "Faltan campos a completar."));
  }
  try {
    const newComment = await commentsManager.createComment(req.body);

    if ("error" in newComment) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, newComment.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(
          201,
          "Comentario creado con éxito",
          newComment
        )
      );
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Actualizar un comentario por su ID
export const updateCommentById = async (req, res) => {
  const { cid } = req.params;
  if (req.method !== "PUT") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!cid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID del comentario."));
  }

  const { newData } = req.body;
  if (!newData) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Faltan campos a completar."));
  }
  try {
    const updatedComment = await commentsManager.updateCommentById(
      parseInt(cid),
      newData
    );

    if ("error" in updatedComment) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, updatedComment.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Comentario actualizado con éxito",
          updatedComment
        )
      );
  } catch (error) {
    console.error("Error al actualizar el comentario:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Eliminar un comentario por su ID
export const deleteCommentById = async (req, res) => {
  const { cid } = req.params;
  if (req.method !== "DELETE") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!cid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID del comentario."));
  }

  try {
    const deletedComment = await commentsManager.deleteCommentById(
      parseInt(cid)
    );

    if ("error" in deletedComment) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, deletedComment.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Comentario eliminado con éxito",
          deletedComment
        )
      );
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
