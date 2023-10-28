import customResponses from "../utils/customResponses.js";
import EmployeesDAO from "../persistencia/DAOs/employee.postgresql.js";

const employeesDAO = new EmployeesDAO();

// Obtiene todos los empleados de una tienda
export const getEmployeesByStoreId = async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { storeId } = req.params;

  if (!storeId) {
    res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID de la tienda."));
  }

  try {
    const employees = await employeesDAO.getEmployeesByStoreId(storeId);

    if ("error" in employees) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, employees.message));
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
    console.error("Error al obtener empleados:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Obtiene todas las tiendas en las que un usuario es empleado
export const getStoresByUserId = async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { userId } = req.params;

  if (!userId) {
    res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del usuario."));
  }

  try {
    const stores = await employeesDAO.getStoresByUserId(userId);

    if ("error" in stores) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, stores.message));
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Tiendas encontradas", stores));
  } catch (error) {
    console.error("Error al obtener tiendas:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Crea un nuevo empleado y lo asigna a una tienda
export const createEmployee = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { store_id, user_id } = req.body;

  if (!store_id || !user_id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar."));
  }

  const employeeData = {
    store_id,
    user_id,
  };

  try {
    const newEmployee = await employeesDAO.createEmployee(employeeData);

    if ("error" in newEmployee) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, newEmployee.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(
          201,
          "Empleado creado con éxito",
          newEmployee
        )
      );
  } catch (error) {
    console.error("Error al crear el empleado:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Elimina la asignación de un empleado a una tienda
export const removeEmployeeFromStore = async (req, res) => {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { storeId, userId } = req.params;

  if (!storeId || !userId) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar."));
  }

  try {
    const removedEmployee = await employeesDAO.removeEmployeeFromStore(
      storeId,
      userId
    );

    if ("error" in removedEmployee) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, removedEmployee.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Empleado eliminado con éxito",
          removedEmployee
        )
      );
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
