import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

// Importa el servicio de usuarios que deseas probar
import usersService from "../../src/services/users.services.js";

chai.use(chaiHttp);

const expect = chai.expect;

describe("Users Service", () => {
  let createdUserId; // Almacenaremos el ID del usuario creado en el test anterior
  // Datos del usuario a crear
  const userData = {
    name: "User Test",
    last_name: "Lastname Test",
    email: "userTest@example.com",
    password: "contrasena",
    username: "User Test",
    role: 1,
    profile_photo: null,
  };
  // Prueba para crear un usuario
  it("Create a user", async () => {
    // Crear un usuario
    const result = await usersService.createAnUser(userData);
    createdUserId = result.rows[0].id;
    expect(result.rows[0]).to.be.an("object");
    expect(result.rows[0]).to.have.property("id").that.is.a("number");
    expect(result.rows[0]).to.have.property("name").that.equal(userData.name);
    expect(result.rows[0])
      .to.have.property("last_name")
      .that.equal(userData.last_name);
    expect(result.rows[0]).to.have.property("email").that.equal(userData.email);
    expect(result.rows[0])
      .to.have.property("username")
      .that.equal(userData.username);
    expect(result.rows[0]).to.have.property("role").that.equal(1); // Valor por defecto
    expect(result.rows[0]).to.have.property("profile_photo").that.is.null; // Valor por defecto
  });
  // Prueba para obtener un usuario por ID
  it("Get user for id", async () => {
    const result = await usersService.getUserById(createdUserId);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(createdUserId);
  });
  // Prueba para obtener un usuario por email
  it("Get user for email", async () => {
    const result = await usersService.getUserByEmail(userData.email);
    expect(result).to.be.an("object");
    expect(result).to.have.property("email").that.is.equal(userData.email);
    expect(result).to.have.property("name").that.is.equal(userData.name);
    expect(result)
      .to.have.property("last_name")
      .that.is.equal(userData.last_name);
    expect(result)
      .to.have.property("username")
      .that.is.equal(userData.username);
  });
  // Prueba para obtener todos los usuarios
  it("Get all users", async () => {
    const { rows } = await usersService.getAllUsers();
    expect(rows).to.be.an("array");
    expect(rows).to.not.be.empty;

    // Verifica el formato de los objetos en el array
    rows.forEach((user) => {
      expect(user).to.be.an("object");
      expect(user).to.have.property("id").that.is.a("number");
      expect(user).to.have.property("name").that.is.a("string");
      expect(user).to.have.property("last_name").that.is.a("string");
      expect(user).to.have.property("email").that.is.a("string");
      expect(user).to.have.property("role").that.is.a("number");
      expect(user).to.have.property("username").that.is.a("string");
      expect(user).to.have.property("profile_photo").that.is.null;
    });
  });
  // Prueba para eliminar un usuario por ID
  it("Delete user for id", async () => {
    const result = await usersService.deleteUser(createdUserId);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(createdUserId);
    expect(result).to.have.property("name").that.is.equal(userData.name);
    expect(result).to.have.property("email").that.is.equal(userData.email);
    expect(result)
      .to.have.property("username")
      .that.is.equal(userData.username);
    expect(result)
      .to.have.property("last_name")
      .that.is.equal(userData.last_name);
  });
});
