import { query } from "../persistencia/PostgreSQL/config.js";

class RolesService {
  // Crea un nuevo rol
  createRole = async (role) => {
    try {
      const roleCreated = await query(
        "INSERT INTO roles (name) VALUES ($1) RETURNING *",
        [role]
      );
      return roleCreated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene un rol por su ID
  getRoleById = async (roleId) => {
    try {
      const data = await query("SELECT * FROM roles WHERE id = $1", [roleId]);
      const role = data.rows[0];
      return role;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Actualiza un rol por su ID
  updateRole = async (roleId, newName) => {
    try {
      const updatedRole = await query(
        "UPDATE roles SET name = $2 WHERE id = $1 RETURNING *",
        [roleId, newName]
      );
      return updatedRole.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina un rol por su ID
  deleteRole = async (roleId) => {
    try {
      const deletedRole = await query(
        "DELETE FROM roles WHERE id = $1 RETURNING *",
        [roleId]
      );
      return deletedRole.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const rolesServices = new RolesService();

export default rolesServices;
