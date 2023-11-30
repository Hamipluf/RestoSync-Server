import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
// Service
import employeesService from "../../src/services/employee.services.js";

chai.use(chaiHttp);

const expect = chai.expect;

describe("Employees services", () => {
  let employeeIdCreated;
  const newEmployeeData = {
    store_id: 1, // Usina Caballito
    role: "camarero",
    name: "Test1",
    disponibility: ["LU", "MA", "MI"],
  };
  it("Assign employee to store", async () => {
    const result = await employeesService.addEmployeeToStore(newEmployeeData);
    employeeIdCreated = result.id;
    expect(result).to.be.an("object");
    expect(result).to.have.property("id");
    expect(result).to.have.property("role").that.is.equal(newEmployeeData.role);
    expect(result).to.have.property("name").that.is.equal(newEmployeeData.name);
    expect(result)
      .to.have.property("store_id")
      .that.is.equal(newEmployeeData.store_id);
    expect(result.disponibility).to.be.an("array");
  });
  it("Get all employees of store", async () => {
    const storeId = 1; // Usina Caballito
    const result = await employeesService.getEmployeesByStoreId(storeId);
    expect(result).to.be.an("array");
    result.forEach((user) => {
      expect(user).to.be.an("object");
      expect(user).to.have.property("id").that.is.a("number");
      expect(user).to.have.property("name").that.is.a("string");
      expect(user).to.have.property("role").that.is.a("string");
      expect(user).to.have.property("disponibility").that.is.a("array");
      expect(user)
        .to.have.property("store_id")
        .that.is.equal(newEmployeeData.store_id);
    });
  });
  it("Get an employee by id", async () => {
    const result = await employeesService.getEmployeeById(employeeIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.a("number");
    expect(result).to.have.property("name").that.is.a("string");
    expect(result).to.have.property("role").that.is.a("string");
    expect(result).to.have.property("disponibility").that.is.a("array");
    expect(result)
      .to.have.property("store_id")
      .that.is.equal(newEmployeeData.store_id);
  });
  it("Update an employee", async () => {
    const updatedEmployeeData = {
      role: "cocina",
      name: "Test2",
      disponibility: ["LU", "MA", "MI", "JU", "VI"],
    };
    const result = await employeesService.updateEmployeeInStore(
      updatedEmployeeData,
      employeeIdCreated
    );
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(employeeIdCreated);
    expect(result).to.have.property("role").that.is.equal(updatedEmployeeData.role);
    expect(result).to.have.property("name").that.is.equal(updatedEmployeeData.name);
    expect(result)
      .to.have.property("store_id")
      .that.is.equal(newEmployeeData.store_id);
    expect(result.disponibility).to.deep.equal(updatedEmployeeData.disponibility);
  });
  it("Get store of an employee", async () => {
    const result = await employeesService.getEmployeeStore(
      newEmployeeData.store_id
    );
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.a("number");
    expect(result).to.have.property("name").that.is.a("string");
    expect(result).to.have.property("company_name").that.is.a("string");
    expect(result).to.have.property("address").that.is.a("string");
    expect(result).to.have.property("owner_id").that.is.a("number");
    expect(result).to.have.property("cuit").that.is.a("string");
  });
  it("Remove employee to store", async () => {
    const result = await employeesService.removeEmployeeFromStore(
      employeeIdCreated
    );
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(employeeIdCreated);
  });
});
