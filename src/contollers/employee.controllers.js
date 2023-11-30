import customResponses from "../utils/customResponses.js";
import EmployeesManager from "../persistencia/DAOs/employee.postgresql.js";

const employeesManager = new EmployeesManager();

// Obtener todos los empleados de una tienda
export const getAllEmployeesByStore = async (req, res) => {
  const { sid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!sid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID de la tienda."));
  }
  try {
    const employees = await employeesManager.getAllEmployeesByStoreId(
      parseInt(sid)
    );
    if (employees.length === 0) {
      return res
        .status(404)
        .json(
          customResponses.badResponse(404, "No hay empleados para devolver")
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
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener un empleado por su ID
export const getEmployeeById = async (req, res) => {
  const { uid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!uid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID del empleado."));
  }
  try {
    const employee = await employeesManager.getEmployeeById(parseInt(uid));
    if ("error" in employee) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, employee.message));
    }

    for (const key in employee) {
      if (typeof employee[key] === "string") {
        employee[key] = employee[key].trim();
      }
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Empleado encontrado", employee));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtiene la tienda a la que pertenece un empleado
export const getEmployeeStore = async (req, res) => {
  const { eid } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!eid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID del empleado."));
  }
  try {
    const employee = await employeesManager.getEmployeeStore(parseInt(eid));
    if ("error" in employee) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, employee.message));
    }

    for (const key in employee) {
      if (typeof employee[key] === "string") {
        employee[key] = employee[key].trim();
      }
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Empleado encontrado", employee));
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Asigna un empleado a una tienda
export const assignEmployee = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { role, name, disponibility, store_id } = req.body;
  if (!role || !name || !store_id) {
    return res
      .status(404)
      .json(customResponses.badResponse(404, "Faltan campos a completar."));
  }
  try {
    const newEmployee = await employeesManager.assignEmployeeToStore(req.body);

    if (newEmployee.error) {
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
// Actualiza un empleado
export const updateEmployee = async (req, res) => {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  const { eid } = req.params;
  const { role, name, disponibility  } = req.body;
  if (!role || !name || !disponibility) {
    return res
      .status(404)
      .json(customResponses.badResponse(404, "Faltan campos a completar."));
  }

  try {
    const updatedEmployee = await employeesManager.updateEmployee(
      req.body,
      parseInt(eid)
    );

    if (updatedEmployee.error) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, updatedEmployee.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Empleado actualizado con éxito",
          updatedEmployee
        )
      );
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};

// Eliminar un empleado por su ID
export const removeEmployee = async (req, res) => {
  const { eid } = req.params;
  if (req.method !== "DELETE") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!eid) {
    res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID del empleado."));
  }

  try {
    const deletedEmployee = await employeesManager.removeEmployee(
      parseInt(eid)
    );

    if ("error" in deletedEmployee) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, deletedEmployee.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Empleado eliminado con éxito",
          deletedEmployee
        )
      );
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
