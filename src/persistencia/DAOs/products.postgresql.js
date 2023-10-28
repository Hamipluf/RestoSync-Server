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
    if (!productId) {
      return { error: true, message: "Faltan campos a completar" };
    }
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
  async registerProduct(storeId, product) {
    const { title, description, price, stock_quantity, category } = product;
    if (!title || !description || !price || !stock_quantity || !category) {
      return { error: true, message: "Faltan campos a completar." };
    }
    try {
      const productData = {
        title,
        description,
        price,
        stock_quantity,
        category,
      };
      const newProduct = await productsService.createProduct(
        storeId,
        productData
      );
      let response;
      newProduct.error
        ? (response = { error: true, message: newProduct.data })
        : (response = newProduct);
      return response;
    } catch (err) {
      console.log("ERROR registerProduct products.postgres", err);
      return { error: true, data: err };
    }
  }
  // Actualiza un producto existente
  async updateProduct(productId, updatedProduct) {
    if (!productId) {
      return { error: true, message: "Faltan campos a completar." };
    }
    try {
      const productData = updatedProduct;
      const updated = await productsService.updateProduct(
        productId,
        productData
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
    if (!productId) {
      return { error: true, message: "Faltan campos a completar." };
    }
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
