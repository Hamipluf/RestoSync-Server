import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it, before } from "mocha";
import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

// Importa el servicio de usuarios que deseas probar
import tasksService from "../../src/services/tasks.service.js";

chai.use(chaiHttp);

const expect = chai.expect;

describe("Tasks services", () => {
  let taskIdCreated;
  const newTaskData = {
    name: "Nueva Tarea",
    is_completed: false,
  };
  it("Create task", async () => {
    const user_id = 2; // user id 2 es ramiro
    const result = await tasksService.createTask(user_id, newTaskData);
    taskIdCreated = result.id;
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.a("number");
    expect(result).to.have.property("name").that.is.a("string");
    expect(result).to.have.property("created_at").that.is.a("date");
    expect(result).to.have.property("user_id").that.is.a("number");
    expect(result).to.have.property("is_completed").that.is.a("boolean");
  });
  it("Update task", async () => {
    const updatedData = {
      name: "Nombre Actualizado",
      is_completed: true,
    };
    const result = await tasksService.updateTask(taskIdCreated, updatedData);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(taskIdCreated);
    expect(result).to.have.property("name").that.is.equal(updatedData.name);
    expect(result)
      .to.have.property("is_completed")
      .that.is.equal(updatedData.is_completed);
  });
  it("Get owner of task", async () => {
    const result = await tasksService.getTaskUser(taskIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.a("number");
    expect(result).to.have.property("name").that.is.a("string");
    expect(result).to.have.property("last_name").that.is.a("string");
    expect(result).to.have.property("email").that.is.a("string");
    expect(result).to.have.property("role").that.is.a("number");
    expect(result).to.have.property("username").that.is.a("string");
    expect(result).to.have.property("profile_photo").that.is.null;
  });
  it("Get all task of a user", async () => {
    const userId = 2; // Id ramiro
    const result = await tasksService.getAllTasksByUserId(userId);
    expect(result).to.be.an("array");
    result.forEach((task) => {
      expect(task).to.be.an("object");
      expect(task).to.have.property("id").that.is.a("number");
      expect(task).to.have.property("name").that.is.a("string");
      expect(task).to.have.property("is_completed").that.is.a("boolean");
      expect(task).to.have.property("created_at").that.is.a("date");
      expect(task).to.have.property("user_id").that.is.a("number");
    });
  });
  it("Get task for id", async () => {
    const result = await tasksService.getTaskById(taskIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(taskIdCreated);
    expect(result).to.have.property("name").that.is.a("string");
    expect(result).to.have.property("created_at").that.is.a("date");
    expect(result).to.have.property("user_id").that.is.a("number");
    expect(result).to.have.property("is_completed").that.is.a("boolean");
  });
  it("Delete task", async () => {
    const result = await tasksService.deleteTask(taskIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(taskIdCreated);
  });
});
