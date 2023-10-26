import customResponses from "../utils/customResponses.js";
import CommentsManager from "../persistencia/DAOs/comments.postgresql.js";

const commentsManager = new CommentsManager();
// Obtiene todos los comentarios
export const getAllComments = async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  try {
    const comments = await commentsManager.getAllComments();
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
            "Error al obtener comentarios",
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
    console.error("Error al obtener los comentarios:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Obtiene un comentario por su ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;

  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del comentario."));
  }

  try {
    const comment = await commentsManager.getCommentById(parseInt(id));

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
    console.error("Error al obtener el comentario:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Agrega un nuevo comentario
export const addComment = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { body, user_id } = req.body;

  if (!body || !user_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar."));
  }

  const commentData = {
    body,
    user_id,
    created_at: new Date(),
    updated_at: new Date(),
  };
  try {
    const newComment = await commentsManager.addComment(commentData);

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

// Actualiza un comentario por su ID
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { body, user_id, updated_at } = req.body;

  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  if (!body || !user_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar."));
  }
  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del comentario."));
  }

  const updateCommentData = {
    ...req.body,
    updated_at: new Date(),
  };

  try {
    const updatedComment = await commentsManager.updateComment(
      parseInt(id),
      updateCommentData
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

// Elimina un comentario por su ID
export const deleteComment = async (req, res) => {
  const { id } = req.params;

  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del comentario."));
  }
  try {
    const deletedComment = await commentsManager.deleteComment(parseInt(id));

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