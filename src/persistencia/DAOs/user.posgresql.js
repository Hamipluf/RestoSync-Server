import usersServices from "../../services/users.services.js";
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
  // Obtiene un user por id
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
  // Registra a un user nuevo
  async registerUser(user) {
    const { name, last_name, email, password, username } = user;
    if (!email || !password || !last_name || !name || !username) {
      return { error: true, message: "Faltan campos a completar." };
    }
    try {
      const passwordHashed = await hashData(password);
      let roleUser = 1;
      const admin = ["ramirogumma@hotmail.com"];
      if (admin.includes(email)) {
        roleUser = 3;
      }
      const userData = {
        name,
        last_name,
        email,
        password: passwordHashed,
        // 1 user, 2 user premium, 3 odmin
        role: roleUser,
        username,
        profile_photo: null,
      };
      const newUser = await usersServices.createAnUser(userData);
      let response;
      newUser.error
        ? (response = { error: true, message: newUser.data })
        : (response = newUser);

      return response;
    } catch (err) {
      console.log("ERROR registerUser users.posgres", err);
      return { error: true, data: err };
    }
  }
  // Obitiene un user por su email
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
  // Logea un usuario registrado
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
  // Actualiza un usuario
  async updateUserById(uid, updatedUserData) {
    try {
      const user = await this.getUserById(uid);

      if (!user || user.error) {
        return {
          error: true,
          message: `No se puede encontrar el usuario con ID ${uid}`,
        };
      }

      const updatedUser = { ...user, ...updatedUserData };
      const result = await usersServices.updateUserById(uid, updatedUser);

      if (result.error) {
        return { error: true, message: "Error al actualizar el usuario" };
      }

      return result;
    } catch (err) {
      console.log("ERROR updateUserById users.posgres", err);
      return { error: true, data: err };
    }
  }
  // Actualiza un solo campo del user
  async updateUserFieldById(uid, fieldName, fieldValue) {
    try {
      const user = await usersServices.getUserById(uid);

      if (!user || user.error) {
        return {
          error: true,
          message: `No se puede encontrar el usuario con ID ${uid}`,
        };
      }

      const updatedUser = await usersServices.updateUserField(
        uid,
        fieldName,
        fieldValue
      );

      if (updatedUser.error) {
        return {
          error: true,
          message: "Error al actualizar el campo del usuario",
        };
      }

      return updatedUser;
    } catch (err) {
      console.log("ERROR updateUserFieldById users.posgres", err);
      return { error: true, data: err };
    }
  }
  // Elimina un usuario por id
  async deleteUserById(uid) {
    try {
      const user = await usersServices.getUserById(uid);

      if (!user || user.error) {
        return {
          error: true,
          message: `No se puede encontrar el usuario con ID ${uid}`,
        };
      }

      const deletedUser = await usersServices.deleteUser(uid);

      if (deletedUser.error) {
        return { error: true, message: "Error al eliminar el usuario" };
      }

      return deletedUser;
    } catch (err) {
      console.log("ERROR deleteUserById users.posgres", err);
      return { error: true, data: err };
    }
  }
}
