import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

// Importa el servicio de usuarios que deseas probar
import productService from "../../src/services/products.services.js";

chai.use(chaiHttp);

const expect = chai.expect;

describe("Tasks services", () => {
  const newProductData = {
    title: "Nuevo Producto",
    description: "Descripcion Nuevo Producto",
    price: "4500",
    stock_quantity: 10,
    category: "Nuevos",
  };
  let productIdCreated;

  it("Create product", async () => {
    const storeId = 1; // Caballito
    const result = await productService.createProduct(storeId, newProductData);
    productIdCreated = result.id;
    expect(result).to.be.an("object");
    expect(result).to.have.property("id");
    expect(result).to.have.property("title").that.is.a("string");
    expect(result).to.have.property("description").that.is.a("string");
    expect(result).to.have.property("price").that.is.a("string");
    expect(result).to.have.property("stock_quantity").that.is.a("number");
    expect(result).to.have.property("category").that.is.a("string");
    expect(result).to.have.property("store_id").that.is.a("number");
  });
  it("Update product", async () => {
    const updatedData = {
      title: "Título Actualizado",
      description: "Descripcion Actualizado",
      stock_quantity: 100,
      category: "Nuevos actualizado",
      price: "45000",
    };
    const result = await productService.updateProduct(
      productIdCreated,
      updatedData
    );
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(productIdCreated);
    expect(result).to.have.property("title").that.is.equal(updatedData.title);
    expect(result)
      .to.have.property("description")
      .that.is.equal(updatedData.description);
    expect(result)
      .to.have.property("stock_quantity")
      .that.is.equal(updatedData.stock_quantity);
    expect(result)
      .to.have.property("category")
      .that.is.equal(updatedData.category);
    expect(result).to.have.property("price").that.is.equal(updatedData.price);
  });
  it("Get all products of a store", async () => {
    const storeId = 1; // Usina caballito
    const result = await productService.getAllProductsOfStore(storeId);
    expect(result).to.be.an("array");
    result.forEach((product) => {
      expect(product).to.be.an("object");
      expect(product).to.have.property("id").that.is.a("number");
      expect(product).to.have.property("title").that.is.a("string");
      expect(product).to.have.property("description").that.is.a("string");
      expect(product).to.have.property("price").that.is.a("string");
      expect(product).to.have.property("stock_quantity").that.is.a("number");
      expect(product).to.have.property("category").that.is.a("string");
      expect(product).to.have.property("store_id").that.is.a("number");
    });
  });
  it("Get product by id", async () => {
    const productIdToFind = 1; // Carrot cake
    const result = await productService.getProductById(productIdToFind);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(productIdToFind);
    expect(result).to.have.property("title").that.is.a("string");
    expect(result).to.have.property("description").that.is.a("string");
    expect(result).to.have.property("price").that.is.a("string");
    expect(result).to.have.property("stock_quantity").that.is.a("number");
    expect(result).to.have.property("category").that.is.a("string");
    expect(result).to.have.property("store_id").that.is.a("number");
  });
  it("Get store of a product", async () => {
    const result = await productService.getProductStore(productIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.a("number");
    expect(result).to.have.property("name").that.is.a("string");
    expect(result).to.have.property("company_name").that.is.a("string");
    expect(result).to.have.property("address").that.is.a("string");
    expect(result).to.have.property("owner_id").that.is.a("number");
    expect(result).to.have.property("cuit").that.is.a("string");
  });
  it("Delete product", async () => {
    const result = await productService.deleteProduct(productIdCreated);
    expect(result).to.be.an("object");
    expect(result).to.have.property("id").that.is.equal(productIdCreated);
    // Verifica que el producto haya sido eliminado correctamente.
  });
});
