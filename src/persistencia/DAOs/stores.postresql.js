import storesService from "../../services/store.services.js";

export default class StoreManager {
  // Obtiene todas las tiendas
  async getAllStores() {
    try {
      const data = await storesService.getAllStores();
      const stores = data ? data : { error: true, message: "No hay tiendas" };
      return stores;
    } catch (err) {
      console.log("ERROR getAllStores stores.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene una tienda por su ID
  async getStoreById(storeId) {
    try {
      const store = await storesService.getStoreById(storeId);
      return store
        ? store
        : { error: true, message: `No hay una tienda con el ID ${storeId}` };
    } catch (err) {
      console.log("ERROR getStoreById stores.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene las tiendas de un user
  async getStoreOfUser(ownerId) {
    try {
      const store = await storesService.getStoreOfUser(ownerId);
      return store
        ? store
        : { error: true, message: `El user ${ownerId} no posee tiendas.` };
    } catch (err) {
      console.log("ERROR getStoreOfUser stores.postgres", err);
      return { error: true, data: err };
    }
  }
  // Registra una nueva tienda
  async registerStore(store) {
    const { name, company_name, address, cuit, owner_id } = store;

    try {
      const storeData = { name, company_name, address, cuit, owner_id };
      const newStore = await storesService.createStore(storeData);
      let response;
      newStore.error
        ? (response = { error: true, message: newStore.data })
        : (response = newStore);
      return response;
    } catch (err) {
      console.log("ERROR registerStore stores.postgres", err);
      return { error: true, data: err };
    }
  }
  // Actualiza una tienda existente
  async updateStore(storeId, updatedStore) {
    try {
      const storeData = updatedStore;
      const updated = await storesService.updateStore(storeId, storeData);
      let response;
      updated.error
        ? (response = { error: true, message: updated.data })
        : (response = updated);
      return response;
    } catch (err) {
      console.log("ERROR updateStore stores.postgres", err);
      return { error: true, data: err };
    }
  }
  // Elimina una tienda por su ID
  async deleteStore(storeId) {
    try {
      const deleted = await storesService.deleteStore(storeId);
      let response;
      deleted.error
        ? (response = { error: true, message: deleted.data })
        : (response = deleted);
      return response;
    } catch (err) {
      console.log("ERROR deleteStore stores.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene los productos de una tienda
  async getProducts(storeId) {
    try {
      const products = await storesService.getStoreProducts(storeId);
      return products
        ? products
        : {
            error: true,
            message: `No se encontró ningn producto de la tienda con el ID ${storeId}`,
          };
    } catch (err) {
      console.log("ERROR getProducts stores.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene los empleados de una tienda
  async getEmployees(storeId) {
    try {
      const employee = await storesService.getStoreEmployees(storeId);
      return employee
        ? employee
        : {
            error: true,
            message: `No se encontró ningn empleado de la tienda con el ID ${storeId}`,
          };
    } catch (err) {
      console.log("ERROR getEmployees stores.postgres", err);
      return { error: true, data: err };
    }
  }
}
