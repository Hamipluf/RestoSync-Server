import { query } from "../persistencia/PostgreSQL/config.js";
class UsersService {
  constructor(model) {
    this.model = model;
  }
  // Obtiene todos los usuarios sin la informacion sensible
  getAllUsers = async () => {
    try {
      const newUser = await query(
        "SELECT id, name, last_name, email, role, username, profile_photo FROM users"
      );
      return newUser;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Obtiene un user dependiendo del user ID
  getUserById = async (uid) => {
    try {
      const data = await query(
        "SELECT id, name, last_name, email, username, profile_photo, role FROM users WHERE id = $1",
        [uid]
      );
      const user = data.rows[0];
      return user;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Obtiene un user dependiendo del user Email
  getUserByEmail = async (email) => {
    try {
      const data = await query(
        "SELECT id, name, last_name, email, username, profile_photo, role FROM users WHERE email = $1",
        [email]
      );
      const user = data.rows[0];
      return user;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Crea un usuario
  createAnUser = async (user) => {
    const { name, last_name, email, password, username, role, profile_photo } = user;
    try {
      const userCreated = await query(
        "INSERT INTO users (name, last_name, email, password, role, username, profile_photo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [name, last_name, email, password, role, username, profile_photo]
      );
      const user = userCreated.rows[0];
      return user.length < 1 ? { error: true, data: user } : user;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Actualiza un solo campo del user
  updateUserField = async (uid, fieldName, fieldValue) => {
    try {
      const updateQuery = `UPDATE users SET ${fieldName} = $1 WHERE id = $2 RETURNING *`;
      const userUpdated = await query(updateQuery, [fieldValue, uid]);
      const updatedUser = userUpdated.rows[0];

      if (!updatedUser) {
        return { error: true, message: "No se pudo actualizar el usuario" };
      }

      return updatedUser;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Actualiza un usuario por su ID
  updateUserById = async (uid, updatedUserData) => {
    const { name, last_name, email, username, role, profile_photo } = updatedUserData;
    try {
      const userUpdated = await query(
        "UPDATE users SET name = $2, last_name = $3, email = $4,  role = $5, username = $6, profile_photo = $7 WHERE id = $1 RETURNING id, email, name, last_name, username, profile_photo, role",
        [uid, name, last_name, email, role, username, profile_photo]
      );
      const updatedUser = userUpdated.rows[0];
      return updatedUser;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Elimina un usuario
  deleteUser = async (uid) => {
    try {
      const taskDeleted = await query(
        "DELETE FROM users WHERE id = $1 RETURNING id, name, last_name, email, username, profile_photo, role ",
        [uid]
      );
      return taskDeleted.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
}
const usersServices = new UsersService();

export default usersServices;
