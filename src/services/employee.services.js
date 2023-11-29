import { query } from "../persistencia/PostgreSQL/config.js";

class EmployeesService {
  constructor(model) {
    this.model = model;
  }
  // Obtiene todos los empleados de un store
  getEmployeesByStoreId = async (storeId) => {
    try {
      const employees = await query(
        "SELECT * FROM employees WHERE store_id = $1",
        [storeId]
      );
      return employees.rows;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene un empleado por su ID
  getEmployeeById = async (employeeId) => {
    try {
      const data = await query("SELECT * FROM employees WHERE id = $1", [
        employeeId,
      ]);
      const employee = data.rows[0];
      return employee;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Agrega un empleado a un store
  addEmployeeToStore = async (employee) => {
    const { role, name, store_id, disponibility } = employee;
    try {
      const employeeAdded = await query(
        "INSERT INTO employees (store_id, role, name, disponibility) VALUES ($1, $2, $3, $4) RETURNING *",
        [store_id, role, name, disponibility]
      );

      return employeeAdded.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina un empleado de un store por su ID
  removeEmployeeFromStore = async (employeeId) => {
    try {
      const employeeRemoved = await query(
        "DELETE FROM employees WHERE id = $1 RETURNING *",
        [employeeId]
      );
      return employeeRemoved.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene el store en el que trabaja un empleado
  getEmployeeStore = async (employeeId) => {
    try {
      const data = await query(
        "SELECT e.*, s.* FROM employees e INNER JOIN stores s ON e.store_id = s.id WHERE e.store_id = $1",
        [employeeId]
      );
      const store = data.rows[0];
      return store;
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const employeesService = new EmployeesService();

export default employeesService;
