import storesServices from "../../services/store.services.js";

export default class StoresManager {
  // Obtiene una tienda por su ID
  async getStoreById(storeId) {
    if (!storeId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const store = await storesServices.getStoreById(storeId);
      return store
        ? store
        : { error: true, message: `No hay una tienda con el id ${storeId}` };
    } catch (err) {
      console.log("ERROR getStoreById stores.postgres", err);
      return { error: true, data: err };
    }
  }

  // Agrega una nueva tienda
  async addStore(store) {
    if (!store) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const newStore = await storesServices.createStore(store);
      return newStore.error
        ? { error: true, message: newStore.data }
        : newStore.rows[0];
    } catch (err) {
      console.log("ERROR addStore stores.postgres", err);
      return { error: true, data: err };
    }
  }

  // Actualiza una tienda por su ID
  async updateStore(storeId, newInfo) {
    if (!storeId || !newInfo) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const updatedStore = await storesServices.updateStore(storeId, newInfo);
      return updatedStore.error
        ? { error: true, message: updatedStore.data }
        : updatedStore.rows[0];
    } catch (err) {
      console.log("ERROR updateStore stores.postgres", err);
      return { error: true, data: err };
    }
  }

  // Elimina una tienda por su ID
  async deleteStore(storeId) {
    if (!storeId) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const deletedStore = await storesServices.deleteStore(storeId);
      return deletedStore.error
        ? { error: true, message: deletedStore.data }
        : deletedStore.rows[0];
    } catch (err) {
      console.log("ERROR deleteStore stores.postgres", err);
      return { error: true, data: err };
    }
  }

  // Asigna un manager a una tienda
  async assignManagerToStore(store_id, manager_id) {
    if (!store_id || !manager_id) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const managerAssigned = await storesServices.assignManager(
        store_id,
        manager_id
      );
      return managerAssigned.error
        ? { error: true, message: managerAssigned.data }
        : managerAssigned.rows[0];
    } catch (err) {
      console.log("ERROR assignManagerToStore stores.postgres", err);
      return { error: true, data: err };
    }
  }

  // Obtiene los managers de una tienda
  async getManagersForStore(store_id) {
    if (!store_id) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const data = await storesServices.getStoreManagers(store_id);
      return data.rows;
    } catch (err) {
      console.log("ERROR getManagersForStore stores.postgres", err);
      return { error: true, data: err };
    }
  }

  // Agrega un producto a una tienda
  async addProductToStore(store_id, product_id) {
    if (!store_id || !product_id) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const productAdded = await storesServices.addProduct(
        store_id,
        product_id
      );
      return productAdded.error
        ? { error: true, message: productAdded.data }
        : productAdded.rows[0];
    } catch (err) {
      console.log("ERROR addProductToStore stores.postgres", err);
      return { error: true, data: err };
    }
  }

  // Obtiene los productos de una tienda
  async getProductsForStore(store_id) {
    if (!store_id) {
      return { error: true, message: "Faltan campos a completar" };
    }
    try {
      const data = await storesServices.getProducts(store_id);
      return data.rows;
    } catch (err) {
      console.log("ERROR getProductsForStore stores.postgres", err);
      return { error: true, data: err };
    }
  }
}
