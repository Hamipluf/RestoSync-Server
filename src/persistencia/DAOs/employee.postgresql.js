import employeesService from "../../services/employee.services.js";

export default class EmployeeManager {
  // Obtiene todos los empleados de una tienda
  async getAllEmployeesByStoreId(storeId) {
    try {
      const data = await employeesService.getEmployeesByStoreId(storeId);
      const employees = data
        ? data
        : { error: true, message: "No hay empleados para esta tienda" };
      return employees;
    } catch (err) {
      console.log("ERROR getAllEmployeesByStoreId employees.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene un empleado por su ID
  async getEmployeeById(employeeId) {
    try {
      const employee = await employeesService.getEmployeeById(employeeId);
      return employee
        ? employee
        : {
            error: true,
            message: `No hay un empleado con el ID ${employeeId}`,
          };
    } catch (err) {
      console.log("ERROR getEmployeeById employees.postgres", err);
      return { error: true, data: err };
    }
  }
  // Asigna un empleado a una tienda
  async assignEmployeeToStore(employee) {
    try {
      const assignment = await employeesService.addEmployeeToStore(employee);
     
      let response;
      assignment.error
        ? (response = { error: true, message: assignment.data })
        : (response = assignment);
      return response;
    } catch (err) {
      console.log("ERROR assignEmployeeToStore employees.postgres", err);
      return { error: true, data: err };
    }
  }
  // Elimina un empleado por su ID
  async removeEmployee(employeeId) {
    try {
      const removed = await employeesService.removeEmployeeFromStore(
        employeeId
      );
      let response;
      removed.error
        ? (response = { error: true, message: removed.data })
        : (response = removed);
      return response;
    } catch (err) {
      console.log("ERROR removeEmployee employees.postgres", err);
      return { error: true, data: err };
    }
  }
  // Obtiene la tienda a la que pertenece un empleado
  async getEmployeeStore(employeeId) {
    try {
      const store = await employeesService.getEmployeeStore(employeeId);
      return store
        ? store
        : {
            error: true,
            message: `No se encontró la tienda del empleado con el ID ${employeeId}`,
          };
    } catch (err) {
      console.log("ERROR getEmployeeStore employees.postgres", err);
      return { error: true, data: err };
    }
  }
}
