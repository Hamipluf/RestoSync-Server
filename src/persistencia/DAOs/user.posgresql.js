import usersServices from "../../services/users.services.js";
import authManager from "../../utils/authManager.js";
import { compareData, hashData } from "../../utils/hashData.js";
export default class UserManager {
  // Obtiene todos los usuarios
  async getAllUsers() {
    try {
      const data = await usersServices.getAllUsers();
      const users = data.rows;
      return users ? users : { error: true, message: "No hay users" };
    } catch (err) {
      console.log("ERROR getAllUsers users.posgres", err);
      return { error: true, data: err };
    }
  }
  async getUserById(uid) {
    if (!uid) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const user = await usersServices.getUserById(uid);
      return user
        ? user
        : { error: true, message: `No hay un user con el id ${uid}` };
    } catch (err) {
      console.log("ERROR getUserById users.posgres", err);
      return { error: true, data: err };
    }
  }
  async registerUser(user) {
    const { name, last_name, email, password, role, username } = user;
    if (!email || !password || !last_name || !name || !role || !username) {
      return { error: true, message: "Faltan campos a completar." };
    }
    try {
      const passwordHashed = await hashData(password);
      const userData = {
        name,
        last_name,
        email,
        password: passwordHashed,
        role,
        username,
      };
      const newUser = await usersServices.createAnUser(userData);
      let response;
      newUser.error
        ? (response = { error: true, message: newUser.data })
        : (response = newUser.rows[0]);
      return response;
    } catch (err) {
      console.log("ERROR registerUser users.posgres", err);
      return { error: true, data: err };
    }
  }
  async getUserByEmail(email) {
    if (!email) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const user = await usersServices.getUserByEmail(email);
      return user ? user : null;
    } catch (err) {
      console.log("ERROR getUserByEmail users.posgres", err);
      return { error: true, data: err };
    }
  }
  async loginUser(user) {
    const { email, password } = user;
    if (!email || !password) {
      return { error: true, message: "Faltan campos a completar." };
    }
    try {
      const user = await this.getUserByEmail(email);
      if (user) {
        const isPassword = await compareData(password, user.password);
        return isPassword
          ? user
          : { error: true, message: "Contraseña incorrecta." };
      }
    } catch (error) {
      console.log("Error loginUser user.posgres", error);
      return { error: true, message: "No existe un user con ese email" };
    }
  }
}
