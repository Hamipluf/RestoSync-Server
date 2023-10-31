import { query } from "../persistencia/PostgreSQL/config.js";

class StoresService {
  constructor(model) {
    this.model = model;
  }

  // Obtiene todos los stores
  getAllStores = async () => {
    try {
      const stores = await query("SELECT * FROM stores");
      return stores.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene un store por su ID
  getStoreById = async (storeId) => {
    try {
      const data = await query("SELECT * FROM stores WHERE id = $1", [storeId]);
      const store = data.rows[0];
      return store;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Crea un nuevo store
  createStore = async (store) => {
    const { name, company_name, address, cuit, owner_id} = store;
    try {
      const storeCreated = await query(
        `INSERT INTO stores (name, company_name, address, cuit, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, company_name, address, cuit, owner_id]
      );
      console.log("Stored", storeCreated)
      return storeCreated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Actualiza un store existente
  updateStore = async (storeId, updatedStore) => {
    const { name, company_name, address, cuit, owner_id } = updatedStore;
    try {
      const storeUpdated = await query(
        "UPDATE stores SET name = $1, company_name = $2, address = $3, cuit = $4, owner_id = $5 WHERE id = $6 RETURNING *",
        [name, company_name, address, cuit, owner_id, storeId]
      );
      return storeUpdated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina un store por su ID
  deleteStore = async (storeId) => {
    try {
      const storeDeleted = await query("DELETE FROM stores WHERE id = $1 RETURNING *", [storeId]);
      return storeDeleted.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene todos los empleados de un store
  getStoreEmployees = async (storeId) => {
    try {
      const employees = await query("SELECT u.id, u.name, u.last_name, u.email, u.photos, u.username, u.role FROM employees e JOIN users u ON e.user_id = u.id WHERE e.store_id = $1", [storeId]);
      return employees.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  }

  // Obtiene todos los productos de un store
  getStoreProducts = async (storeId) => {
    try {
      const products = await query("SELECT * FROM products WHERE store_id = $1", [storeId]);
      return products.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  }
}

const storesService = new StoresService();

export default storesService;
