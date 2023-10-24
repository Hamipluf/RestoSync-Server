import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProductField,
} from "../contollers/products.controllers.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", getAllProducts);

// Obtener un producto por ID
router.get("/:id", getProductById);

// Crear un nuevo producto
router.post("/create", createProduct);

// Actualizar un campo del producto por ID
router.put("/udapte/:id", updateProductField);

// Eliminar un producto por ID
router.delete("/delete/:id", deleteProduct);

export default router;
