import productService from "../../services/products.services.js";

export default class ProductManager {
  // Obtener todos los productos
  async getAllProducts() {
    try {
      const data = await productService.getAllProducts();
      const products = data.rows;
      return products ? products : { error: true, message: "No hay productos" };
    } catch (err) {
      console.log("ERROR getAllProducts product.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtener un producto por ID
  async getProductById(pid) {
    if (!pid) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const product = await productService.getProductById(pid);
      return product
        ? product
        : { error: true, message: `No hay un producto con el id ${pid}` };
    } catch (err) {
      console.log("ERROR getProductById product.postgres", err);
      return { error: true, data: err };
    }
  }
  // Crear un producto
  async createProduct(product) {
    try {
      const productCreated = await productService.createProduct(product);
      return productCreated;
    } catch (err) {
      console.log("ERROR createProduct product.postgres", err);
      return { error: true, data: err };
    }
  }
  // Actualizar un campo del producto por ID
  async updateProductField(pid, newInfo) {
    if (!pid || !newInfo) {
      return { error: true, message: "Faltan campos a completar." };
    }
    try {
      const updatedProduct = await productService.updateProduct(pid, newInfo)
      return updatedProduct;
    } catch (err) {
      console.log("ERROR updateProductField product.postgres", err);
      return { error: true, data: err };
    }
  }
}
