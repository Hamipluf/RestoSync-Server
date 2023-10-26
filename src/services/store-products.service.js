import { query } from "../persistencia/PostgreSQL/config.js";

class StoreProductsService {
  // Agregar un producto a una tienda
  addProductToStore = async (storeId, productId) => {
    try {
      const productAdded = await query(
        "INSERT INTO store_products (store_id, product_id) VALUES ($1, $2) RETURNING *",
        [storeId, productId]
      );
      return productAdded.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtener todos los productos de una tienda
  getProductsForStore = async (storeId) => {
    try {
      const data = await query(
        "SELECT products.* FROM products JOIN store_products ON products.id = store_products.product_id WHERE store_products.store_id = $1",
        [storeId]
      );
      return data.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Eliminar un producto de una tienda
  removeProductFromStore = async (storeId, productId) => {
    try {
      const productRemoved = await query(
        "DELETE FROM store_products WHERE store_id = $1 AND product_id = $2 RETURNING *",
        [storeId, productId]
      );
      return productRemoved.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const storeProductsService = new StoreProductsService();


export default storeProductsService;
