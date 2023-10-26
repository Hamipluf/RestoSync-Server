import customResponses from "../utils/customResponses.js";
import StoresManager from "../persistencia/DAOs/stores.postresql.js";

const storeManager = new StoresManager();

// Obtener una tienda por su ID
export const getStoreById = async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { storeId } = req.params;

  if (!storeId) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const store = await storeManager.getStoreById(storeId);

    if ("error" in store) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, store.message));
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Tienda encontrada", store));
  } catch (error) {
    console.error("Error al obtener la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Crear una nueva tienda
export const createStore = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { name, company_name, address, cuit, owner_id } = req.body;

  if (!name || !company_name || !address || !cuit || !owner_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const newStore = await storeManager.addStore({
      name,
      company_name,
      address,
      cuit,
      ownerId,
    });

    if ("error" in newStore) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, newStore.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(201, "Tienda creada con éxito", newStore)
      );
  } catch (error) {
    console.error("Error al crear la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Actualizar una tienda por su ID
export const updateStore = async (req, res) => {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { storeId } = req.params;
  if (!storeId) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del store"));
  }
  const { name, company_name, address, cuit } = req.body;

  if (!name || !company_name || !address || !cuit) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const updatedStore = await storeManager.updateStore(storeId, {
      name,
      company_name,
      address,
      cuit,
    });

    if ("error" in updatedStore) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, updatedStore.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Tienda actualizada con éxito",
          updatedStore
        )
      );
  } catch (error) {
    console.error("Error al actualizar la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Eliminar una tienda por su ID
export const deleteStore = async (req, res) => {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { storeId } = req.params;

  if (!storeId) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const deletedStore = await storeManager.deleteStore(storeId);

    if ("error" in deletedStore) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, deletedStore.message));
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Tienda eliminada con éxito"));
  } catch (error) {
    console.error("Error al eliminar la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Asignar un manager a una tienda
export const assignManagerToStore = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { store_id, manager_id } = req.body;

  if (!store_id || !manager_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const managerAssigned = await storeManager.assignManagerToStore(
      store_id,
      manager_id
    );

    if ("error" in managerAssigned) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, managerAssigned.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(
          201,
          "Manager asignado con éxito",
          managerAssigned
        )
      );
  } catch (error) {
    console.error("Error al asignar un manager a la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Obtener los managers de una tienda
export const getManagersForStore = async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { store_id } = req.params;

  if (!store_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const managers = await storeManager.getManagersForStore(parseInt(store_id));

    if ("error" in managers) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, managers.message));
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Managers encontrados", managers));
  } catch (error) {
    console.error("Error al obtener los managers de la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Agregar un producto a una tienda
export const addProductToStore = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { store_id, product_id } = req.body;

  if (!store_id || !product_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const productAdded = await storeManager.addProductToStore(
      store_id,
      product_id
    );

    if ("error" in productAdded) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, productAdded.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(
          201,
          "Producto agregado a la tienda con éxito",
          productAdded
        )
      );
  } catch (error) {
    console.error("Error al agregar un producto a la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Obtener los productos de una tienda
export const getProductsForStore = async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { store_id } = req.params;

  if (!store_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const products = await storeManager.getProductsForStore(parseInt(store_id));

    if ("error" in products) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, products.message));
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Productos encontrados", products));
  } catch (error) {
    console.error("Error al obtener los productos de la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
