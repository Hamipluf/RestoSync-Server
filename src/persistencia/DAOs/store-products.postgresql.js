import storeProductsServices from "../../services/store-products.service.js";

export default class StoreProductsManager {
  // Asigna un producto a una tienda
  async addProductToStore(productId, storeId) {
    if (!productId || !storeId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const productAdded = await storeProductsServices.addProductToStore(productId, storeId);
      return productAdded.error ? { error: true, message: productAdded.data } : productAdded;
    } catch (err) {
      console.log("ERROR addProductToStore storeProducts.postgres", err);
      return { error: true, data: err };
    }
  }

  // Obtiene todos los productos asociados a una tienda por su ID
  async getProductsForStore(storeId) {
    if (!storeId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const products = await storeProductsServices.getProductsForStore(storeId);
      return products.error ? { error: true, message: products.data } : products;
    } catch (err) {
      console.log("ERROR getProductsForStore storeProducts.postgres", err);
      return { error: true, data: err };
    }
  }

  // Elimina la relación entre un producto y una tienda
  async removeProductFromStore(productId, storeId) {
    if (!productId || !storeId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const productRemoved = await storeProductsServices.removeProductFromStore(productId, storeId);
      return productRemoved.error ? { error: true, message: productRemoved.data } : productRemoved;
    } catch (err) {
      console.log("ERROR removeProductFromStore storeProducts.postgres", err);
      return { error: true, data: err };
    }
  }
}
