import customResponses from "../utils/customResponses.js";
import RolesManager from "../persistencia/DAOs/roles.postgresql.js";

const rolesManager = new RolesManager();

// Obtener roles por ID
export const getRolById = async (req, res) => {
  const { id } = req.params;

  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del role"));
  }
  try {
    const roles = await rolesManager.getRoleById(parseInt(id));

    if (roles.length === 0) {
      return res
        .status(404)
        .json(customResponses.badResponse(404, "No hay roles para devolver"));
    }

    if ("error" in roles) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos",
            roles.message
          )
        );
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Roles encontrados", roles));
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Crear un nuevo rol
export const createRole = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { role } = req.body;

  if (!role) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const newRole = await rolesManager.addRole(role);

    if ("error" in newRole) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error al crear el rol",
            newRole.message
          )
        );
    }

    res
      .status(201)
      .json(customResponses.responseOk(201, "Rol creado con éxito", newRole));
  } catch (error) {
    console.error("Error al crear el rol:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Actualizar un rol por su ID
export const updateRole = async (req, res) => {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { id } = req.params;
  const { role, newRole } = req.body;

  if (!role || !newRole) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }
  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del role"));
  }

  try {
    const updatedRole = await rolesManager.updateRole(
      parseInt(id),
      role,
      newRole
    );

    if ("error" in updatedRole) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error al actualizar el rol",
            updatedRole.message
          )
        );
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Rol actualizado con éxito",
          updatedRole
        )
      );
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Eliminar un rol por su ID
export const deleteRole = async (req, res) => {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del role"));
  }
  try {
    const deletedRole = await rolesManager.deleteRole(id);

    if ("error" in deletedRole) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error al eliminar el rol",
            deletedRole.message
          )
        );
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Rol eliminado con éxito"));
  } catch (error) {
    console.error("Error al eliminar el rol:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
