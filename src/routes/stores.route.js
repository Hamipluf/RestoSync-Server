import express from "express";
import {
  createStore,
  deleteStoreById,
  getAllStores,
  getEmployeesByStoreId,
  getProductsByStore,
  getStoreById,
  updateStoreById,
} from "../contollers/store.controller.js";

const router = express.Router();

// Obtener todas las tiendas
router.get("/", getAllStores);

// Obtener una tienda por su ID
router.get("/one/:sid", getStoreById);

// Obtener los productos de una tienda por su ID
router.get("/products/:sid", getProductsByStore);

// Obtener los empleados de una tienda por su ID
router.get("/employees/:sid", getEmployeesByStoreId);

// Registrar una tienda
router.post("/create", createStore);

// Actualizar una tienda por su ID
router.put("/update/:sid", updateStoreById);

// Eliminar una tienda por su ID
router.delete("/delete/:sid", deleteStoreById);

export default router;
