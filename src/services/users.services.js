import { query } from "../persistencia/PostgreSQL/config.js";
class UsersService {
  constructor(model) {
    this.model = model;
  }
  // Obtiene todos los usuarios sin la informacion sensible
  getAllUsers = async () => {
    try {
      const newUser = await query(
        "SELECT id, name, last_name, email, role, username, photos FROM users"
      );
      return newUser;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Obtiene un user dependiendo del user ID
  getUserById = async (uid) => {
    try {
      const data = await query("SELECT id, name, last_name, email, username, photos, role FROM users WHERE id = $1", [uid]);
      const user = data.rows[0];
      return user;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Obtiene un user dependiendo del user Email
  getUserByEmail = async (email) => {
    try {
      const data = await query("SELECT id, name, last_name, email, username, photos, role FROM users WHERE email = $1", [email]);
      const user = data.rows[0];
      return user;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Crea un usuario
  createAnUser = async (user) => {
    const { name, last_name, email, password, username, role, photos } = user;
    try {
      const userCreated = await query(
        "INSERT INTO users (name, last_name, email, password, role, username, photos) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [name, last_name, email, password, role, username, photos]
      );
      const user = userCreated.rows[0];
      return user.length < 1 ? { error: true, data: user } : user;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Crea un usuario
  deleteUser = async (uid) => {
    try {
      const taskDeleted = await query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
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
