import { query } from "../persistencia/PostgreSQL/config.js";

class StoresService {
  // Crea una nueva tienda
  createStore = async (store) => {
    const { name, company_name, address, cuit, owner_id } = store;
    try {
      const storeCreated = await query(
        "INSERT INTO stores (name, company_name, address, cuit, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, company_name, address, cuit, owner_id]
      );
      return storeCreated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene una tienda por su ID
  getStoreById = async (storeId) => {
    try {
      const data = await query("SELECT * FROM stores WHERE id = $1", [storeId]);
      const store = data.rows[0];
      return store;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Actualiza una tienda por su ID
  updateStore = async (storeId, newInfo) => {
    const { name, company_name, address, cuit } = newInfo;
    try {
      const updatedStore = await query(
        "UPDATE stores SET name = $2, company_name = $3, address = $4, cuit = $5, owner_id = $6 WHERE id = $1 RETURNING *",
        [storeId, name, company_name, address, cuit]
      );
      return updatedStore.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina una tienda por su ID
  deleteStore = async (storeId) => {
    try {
      const deletedStore = await query(
        "DELETE FROM stores WHERE id = $1 RETURNING *",
        [storeId]
      );
      return deletedStore.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Asigna un usuario como manager de una tienda
  assignManager = async (storeId, userId) => {
    try {
      const managerAssigned = await query(
        "INSERT INTO store_managers (user_id, store_id) VALUES ($1, $2) RETURNING *",
        [userId, storeId]
      );
      return managerAssigned.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene los managers de una tienda
  getStoreManagers = async (storeId) => {
    try {
      const data = await query(
        "SELECT users.* FROM users JOIN store_managers ON users.id = store_managers.user_id WHERE store_managers.store_id = $1",
        [storeId]
      );
      return data.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Agregar un producto a una tienda
  addProduct = async (storeId, productId) => {
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
  getProducts = async (storeId) => {
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
  removeProduct = async (storeId, productId) => {
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

const storesService = new StoresService();

export default storesService;
