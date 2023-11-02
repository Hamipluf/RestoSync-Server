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
    user_id: 2, // Ramiro
  };
  it("Assign employee to store", async () => {
    const result = await employeesService.addEmployeeToStore(
      newEmployeeData.user_id,
      newEmployeeData.store_id
    );
    employeeIdCreated = result.id;
    expect(result).to.be.an("object");
    expect(result).to.have.property("id");
    expect(result)
      .to.have.property("user_id")
      .that.is.equal(newEmployeeData.user_id);
    expect(result)
      .to.have.property("store_id")
      .that.is.equal(newEmployeeData.store_id);
  });
  it("Get all employees of store", async () => {
    const storeId = 1; // Usina Caballito
    const result = await employeesService.getEmployeesByStoreId(storeId);
    expect(result).to.be.an("array");
    result.forEach((user) => {
      expect(user).to.be.an("object");
      expect(user).to.have.property("id").that.is.a("number");
      expect(user).to.have.property("name").that.is.a("string");
      expect(user).to.have.property("last_name").that.is.a("string");
      expect(user).to.have.property("email").that.is.a("string");
      expect(user).to.have.property("role").that.is.a("number");
      expect(user).to.have.property("username").that.is.a("string");
      expect(user).to.have.property("photos").that.is.null;
    });
  });
  it("Get an employee by id", async () => {
    const result = await employeesService.getEmployeeById(employeeIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.a("number");
    expect(result).to.have.property("name").that.is.a("string");
    expect(result).to.have.property("last_name").that.is.a("string");
    expect(result).to.have.property("email").that.is.a("string");
    expect(result).to.have.property("role").that.is.a("number");
    expect(result).to.have.property("username").that.is.a("string");
  });
  it("Get store of an employee", async () => {
    const result = await employeesService.getEmployeeStore(newEmployeeData.user_id);
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
