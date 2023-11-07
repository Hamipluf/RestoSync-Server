import customResponses from "../utils/customResponses.js";
import StoreManager from "../persistencia/DAOs/stores.postresql.js";

const storeManager = new StoreManager();

// Obtener todas las tiendas
export const getAllStores = async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  try {
    const stores = await storeManager.getAllStores();
    if (stores.length === 0) {
      return res
        .status(404)
        .json(customResponses.badResponse(404, "No hay tiendas para devolver"));
    }

    if ("error" in stores) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos",
            stores.message
          )
        );
    }

    // Eliminar espacios en blanco sobrantes de las propiedades de cada tienda
    const formattedStores = stores.map((store) => {
      for (const key in store) {
        if (typeof store[key] === "string") {
          store[key] = store[key].trim();
        }
      }
      return store;
    });

    res
      .status(200)
      .json(
        customResponses.responseOk(200, "Tiendas encontradas", formattedStores)
      );
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener las tiendas de un user
export const getStoreOfUser = async (req, res) => { 
  const { oid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  try {
    const stores = await storeManager.getStoreOfUser(parseInt(oid));
    if (stores.length === 0) {
      return res
        .status(404)
        .json(
          customResponses.badResponse(404, "No hay tiendas para este usuario")
        );
    }

    if ("error" in stores) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos",
            stores.message
          )
        );
    }

    // Eliminar espacios en blanco sobrantes de las propiedades de cada tienda
    const formattedStores = stores.map((store) => {
      for (const key in store) {
        if (typeof store[key] === "string") {
          store[key] = store[key].trim();
        }
      }
      return store;
    });

    res
      .status(200)
      .json(
        customResponses.responseOk(200, "Tiendas encontradas", formattedStores)
      );
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener una tienda por su ID
export const getStoreById = async (req, res) => {
  const { sid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!sid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la tienda"));
  }
  try {
    const store = await storeManager.getStoreById(parseInt(sid));
    if ("error" in store) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, store.message));
    }

    for (const key in store) {
      if (typeof store[key] === "string") {
        store[key] = store[key].trim();
      }
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Tienda encontrada", store));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Registrar una tienda
export const createStore = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  // Recibir y validar los datos de la nueva tienda desde req.body
  const { name, company_name, address, cuit, owner_id } = req.body;
  if (!name || !company_name || !address || !cuit || !owner_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const newStore = await storeManager.registerStore(req.body);

    if ("error" in newStore) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, newStore.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(201, "Tienda registrada con éxito", newStore)
      );
  } catch (error) {
    console.error("Error al registrar la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Actualizar una tienda por su ID
export const updateStoreById = async (req, res) => {
  const { sid } = req.params;
  if (req.method !== "PUT") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!sid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la tienda"));
  }
  const { name, company_name, address, cuit, owner_id } = req.body;
  if (!name || !company_name || !address || !cuit || !owner_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const updatedStore = await storeManager.updateStore(
      parseInt(sid),
      req.body
    );

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
export const deleteStoreById = async (req, res) => {
  const { sid } = req.params;
  if (req.method !== "DELETE") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!sid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la tienda"));
  }
  try {
    const deletedStore = await storeManager.deleteStore(parseInt(sid));

    if ("error" in deletedStore) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, deletedStore.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Tienda eliminada con éxito",
          deletedStore
        )
      );
  } catch (error) {
    console.error("Error al eliminar la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener los productos de una tienda por su ID
export const getProductsByStore = async (req, res) => {
  const { sid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!sid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la tienda"));
  }
  try {
    const products = await storeManager.getProducts(parseInt(sid));
    if (products.length === 0) {
      return res
        .status(404)
        .json(
          customResponses.badResponse(404, "No hay productos para esta tienda")
        );
    }

    if ("error" in products) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos",
            products.message
          )
        );
    }

    // Eliminar espacios en blanco sobrantes de las propiedades de cada producto
    const formattedProducts = products.map((product) => {
      for (const key in product) {
        if (typeof product[key] === "string") {
          product[key] = product[key].trim();
        }
      }
      return product;
    });

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Productos encontrados",
          formattedProducts
        )
      );
  } catch (error) {
    console.error("Error al obtener los productos de la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener los empleados de una tienda por su ID
export const getEmployeesByStoreId = async (req, res) => {
  const { sid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!sid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la tienda"));
  }
  try {
    const employees = await storeManager.getEmployees(parseInt(sid));
    if (employees.length === 0) {
      return res
        .status(404)
        .json(
          customResponses.badResponse(404, "No hay empleados para esta tienda")
        );
    }

    if ("error" in employees) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error en obtener datos",
            employees.message
          )
        );
    }

    // Eliminar espacios en blanco sobrantes de las propiedades de cada empleado
    const formattedEmployees = employees.map((employee) => {
      for (const key in employee) {
        if (typeof employee[key] === "string") {
          employee[key] = employee[key].trim();
        }
      }
      return employee;
    });

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Empleados encontrados",
          formattedEmployees
        )
      );
  } catch (error) {
    console.error("Error al obtener los empleados de la tienda:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
