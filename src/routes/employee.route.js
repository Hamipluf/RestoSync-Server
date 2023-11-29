import express from "express";
import {
  assignEmployee,
  getAllEmployeesByStore,
  getEmployeeById,
  getEmployeeStore,
  removeEmployee,
} from "../contollers/employee.controllers.js";

const router = express.Router();
// Obtiene todos los empleados de una tienda
router.get("/all/store/:sid", getAllEmployeesByStore);

// Obtener un empleado por su ID
router.get("/one/:uid", getEmployeeById);

// Obtiene la tienda a la que pertenece un empleado
router.get("/store/:eid", getEmployeeStore);

// Asigna un empleado a una tienda
router.post("/assign", assignEmployee);

// Eliminar un empleado por su ID
router.delete("/delete/:eid", removeEmployee);

export default router;
