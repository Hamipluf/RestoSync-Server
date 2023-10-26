import rolesServices from "../../services/role.services.js";


export default class RolesManager {
  // Obtiene un rol por su ID
  async getRoleById(roleId) {
    if (!roleId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const role = await rolesServices.getRoleById(roleId);
      return role
        ? role
        : { error: true, message: `No hay un rol con el id ${roleId}` };
    } catch (err) {
      console.log("ERROR getRoleById roles.postgres", err);
      return { error: true, data: err };
    }
  }

  // Agrega un nuevo rol
  async addRole(role) {
    if (!role) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const newRole = await rolesServices.createRole(role);
      return newRole.error
        ? { error: true, message: newRole.data }
        : newRole.rows[0];
    } catch (err) {
      console.log("ERROR addRole roles.postgres", err);
      return { error: true, data: err };
    }
  }

  // Actualiza un rol por su ID
  async updateRole(roleId, newInfo) {
    if (!roleId || !newInfo) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const updatedRole = await rolesServices.updateRole(roleId, newInfo);
      return updatedRole.error
        ? { error: true, message: updatedRole.data }
        : updatedRole.rows[0];
    } catch (err) {
      console.log("ERROR updateRole roles.postgres", err);
      return { error: true, data: err };
    }
  }

  // Elimina un rol por su ID
  async deleteRole(roleId) {
    if (!roleId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const deletedRole = await rolesServices.deleteRole(roleId);
      return deletedRole.error
        ? { error: true, message: deletedRole.data }
        : deletedRole.rows[0];
    } catch (err) {
      console.log("ERROR deleteRole roles.postgres", err);
      return { error: true, data: err };
    }
  }
}
