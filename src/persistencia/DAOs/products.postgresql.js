import productsService from "../../services/products.services.js";

export default class ProductManager {
  // Obtiene todos los productos de una tienda
  async getAllProductsByStoreId(storeId) {
    try {
      const data = await productsService.getAllProductsOfStore(storeId);
      const products = data
        ? data
        : { error: true, message: "No hay productos para esta tienda" };
      return products;
    } catch (err) {
      console.log("ERROR getAllProductsByStoreId products.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene un producto por su ID
  async getProductById(productId) {
    try {
      const product = await productsService.getProductById(productId);
      return product
        ? product
        : { error: true, message: `No hay un producto con el ID ${productId}` };
    } catch (err) {
      console.log("ERROR getProductById products.postgres", err);
      return { error: true, data: err };
    }
  }
  // Registra un nuevo producto para una tienda
  async registerProduct(product) {
    try {
      const newProduct = await productsService.createProduct(product);
      let response;
      newProduct
        ? (response = newProduct)
        : (response = {
            error: true,
            message: "No se pudo crear el producto.",
          });
      return response;
    } catch (err) {
      console.log("ERROR registerProduct products.postgres", err);
      return { error: true, data: err };
    }
  }
  // Actualiza un producto existente
  async updateProduct(productId, updatedProduct) {
    try {
      const updated = await productsService.updateProduct(
        productId,
        updatedProduct
      );
      let response;
      updated.error
        ? (response = { error: true, message: updated.data })
        : (response = updated);
      return response;
    } catch (err) {
      console.log("ERROR updateProduct products.postgres", err);
      return { error: true, data: err };
    }
  }
  // Elimina un producto por su ID
  async deleteProduct(productId) {
    if (!productId) {
      return { error: true, message: "Faltan campos a completar." };
    }
    try {
      const deleted = await productsService.deleteProduct(productId);
      let response;
      deleted.error
        ? (response = { error: true, message: deleted.data })
        : (response = deleted);
      return response;
    } catch (err) {
      console.log("ERROR deleteProduct products.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene la tienda a la que pertenece un producto
  async getProductStore(productId) {
    try {
      const store = await productsService.getProductStore(productId);
      return store
        ? store
        : {
            error: true,
            message: `No se encontró la tienda del producto con el ID ${productId}`,
          };
    } catch (err) {
      console.log("ERROR getProductStore products.postgres", err);
      return { error: true, data: err };
    }
  }
}
