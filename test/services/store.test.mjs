import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

// Importa el servicio de usuarios que deseas probar
import storeServices from "../../src/services/store.services.js";

chai.use(chaiHttp);

const expect = chai.expect;

describe("Store services", () => {
  const newStoreData = {
    name: "Nueva Tienda",
    company_name: "Mi Empresa",
    address: "Dirección de la Tienda",
    cuit: "1234567890",
    owner_id: 2,
  };
  let storeCreatedId;
  it("Create store", async () => {
    const result = await storeServices.createStore(newStoreData);
    storeCreatedId = result.id;
    expect(result).to.be.an("object");
    expect(result).to.have.property("id");
    expect(result).to.have.property("name").that.is.a("string");
    expect(result).to.have.property("company_name").that.is.a("string");
    expect(result).to.have.property("address").that.is.a("string");
    expect(result).to.have.property("owner_id").that.is.a("number");
    expect(result).to.have.property("cuit").that.is.a("string");
  });
  it("Get all stores", async () => {
    // Obtener todas las tiendas
    const result = await storeServices.getAllStores();
    expect(result).to.be.an("array");

    // Verifica el formato de los objetos en el array
    result.forEach((store) => {
      expect(store).to.be.an("object");
      expect(store).to.have.property("id").that.is.a("number");
      expect(store).to.have.property("name").that.is.a("string");
      expect(store).to.have.property("company_name").that.is.a("string");
      expect(store).to.have.property("address").that.is.a("string");
      expect(store).to.have.property("owner_id").that.is.a("number");
      expect(store).to.have.property("cuit").that.is.a("string");
    });
  });
  it("Get stores of an user", async () => {
    const owner_id = 2; // Ramiro
    // Obtener todas las tiendas
    const result = await storeServices.getStoreOfUser(owner_id);
    expect(result).to.be.an("array");

    // Verifica el formato de los objetos en el array
    result.forEach((store) => {
      expect(store).to.be.an("object");
      expect(store).to.have.property("id").that.is.a("number");
      expect(store).to.have.property("name").that.is.a("string");
      expect(store).to.have.property("company_name").that.is.a("string");
      expect(store).to.have.property("address").that.is.a("string");
      expect(store).to.have.property("owner_id").that.is.a("number");
      expect(store).to.have.property("cuit").that.is.a("string");
    });
  });
  it("Udapte store", async () => {
    const updatedData = {
      name: "Nombre Actualizado",
      company_name: "Mi Empresa Actualizada",
      address: "Dirección de la Tienda Actualizada",
      cuit: "0987654321",
      owner_id: 2,
    };
    const result = await storeServices.updateStore(storeCreatedId, updatedData);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(storeCreatedId);
    expect(result).to.have.property("name").that.is.equal(updatedData.name);
    expect(result)
      .to.have.property("company_name")
      .that.is.equal(updatedData.company_name);
    expect(result)
      .to.have.property("address")
      .that.is.equal(updatedData.address);
    expect(result).to.have.property("cuit").that.is.equal(updatedData.cuit);
  });
  it("Get all employees of store", async () => {
    const storeId = 1; // Id usina cafetera caballto
    const result = await storeServices.getStoreEmployees(storeId);
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
  it("Get all products of store", async () => {
    const storeId = 1; // Usina caballito
    const result = await storeServices.getStoreProducts(storeId);
    expect(result).to.be.an("array");
    result.forEach((store) => {
      expect(store).to.be.an("object");
      expect(store).to.have.property("id").that.is.a("number");
      expect(store).to.have.property("title").that.is.a("string");
      expect(store).to.have.property("description").that.is.a("string");
      expect(store).to.have.property("price").that.is.a("string");
      expect(store).to.have.property("stock_quantity").that.is.a("number");
      expect(store).to.have.property("category").that.is.a("string");
      expect(store).to.have.property("store_id").that.is.equal(storeId);
    });
  });
  it("Delete sotre", async () => {
    const result = await storeServices.deleteStore(storeCreatedId);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(storeCreatedId);
  });
});
