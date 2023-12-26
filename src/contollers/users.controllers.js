import customResponses from "../utils/customResponses.js";
import UserManager from "../persistencia/DAOs/user.posgresql.js";
import usersServices from "../services/users.services.js";
const user = new UserManager();
// Todos los users
export const getAll = async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Metodo no permitido"));
  }
  try {
    const users = await user.getAllUsers();
    if (users.length === 0) {
      return res
        .status(404)
        .json(customResponses.badResponse(404, "No hay users para devolver"));
    }

    if (users.error) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos",
            users.message
          )
        );
    }
    // Eliminar espacios en blanco sobrantes de las propiedades de cada usuario
    const formatUser = users.map((user) => {
      for (const key in user) {
        if (typeof user[key] === "string") {
          user[key] = user[key].trim();
        }
      }
      return user;
    });
    res
      .status(200)
      .json(customResponses.responseOk(200, "Users encontrados", formatUser));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// User por ID sin info sensible
export const getOneById = async (req, res) => {
  const { uid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Metodo no permitido"));
  }
  try {
    const user = await usersServices.getUserById(id);
    if (user.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, user.message));
    }
    for (const key in user) {
      if (typeof user[key] === "string") {
        user[key] = user[key].trim();
      }
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "User encontrado", user));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Registrar user
export const register = (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  const user = req.user;
  if (user.error) {
    return res
      .status(400)
      .send(
        customResponses.badResponse(400, user?.message || user?.data, undefined)
      );
  }

  res.json(
    customResponses.responseOk(200, "User registrado con exito", {
      user: user.user.id,
      token: user.token,
    })
  );
};
// logear a un user
export const login = (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  const user = req.user;
  if (user.error) {
    return res
      .status(404)
      .send(
        customResponses.badResponse(404, user?.message || user?.data, undefined)
      );
  }

  res.json(
    customResponses.responseOk(200, "Bienvenido", {
      token: user.token,
      user: user.user.id,
    })
  );
};
// Autentica y recupera el user loggeado
export const authUser = (req, res) => {
  const currentUser = req.user;
  if (currentUser.error) {
    return res.redirect(300, "/login");
  }
  res
    .status(200)
    .json(customResponses.responseOk(200, "Curren user", currentUser));
};
// Actualiza un usuario
export const updateUser = async (req, res) => {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { uid } = req.params;
  const updatedUserData = req.body; // Datos actualizados del usuario

  try {
    const updatedUser = await user.updateUserById(
      parseInt(uid),
      updatedUserData
    );

    if (updatedUser.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, updatedUser.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Usuario actualizado con éxito",
          updatedUser
        )
      );
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Atualiza un solo capmpo del user
export const updateUserField = async (req, res) => {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { uid } = req.params;
  const { fieldName, fieldValue } = req.body; // Nombre del campo a actualizar y su nuevo valor

  try {
    const updatedField = await user.updateUserFieldById(
      parseInt(uid),
      fieldName,
      fieldValue
    );

    if (updatedField.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, updatedField.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Campo actualizado con éxito",
          updatedField
        )
      );
  } catch (error) {
    console.error("Error al actualizar el campo del usuario:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Elimina un usuario
export const deleteUser = async (req, res) => {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { uid } = req.params;

  try {
    const deletedUser = await user.deleteUserById(parseInt(uid));

    if (deletedUser.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, deletedUser.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Usuario eliminado con éxito",
          deletedUser
        )
      );
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
