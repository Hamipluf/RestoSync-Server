import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getStoreProduct,
} from "../contollers/products.controllers.js";

const router = express.Router();

// Obtener todos los productos de una tienda
router.get("/all/store/:sid", getAllProducts);

// Obtener un producto por ID
router.get("/one/:pid", getProductById);

// Obtiene la tienda a la que pertenece un producto
router.get("/store/:sid", getStoreProduct);

// Crear un nuevo producto en una tienda
router.post("/create", createProduct);

// Actualizar un campo del producto por ID
router.put("/udapte/:pid", updateProduct);

// Eliminar un producto por ID
router.delete("/delete/:pid", deleteProduct);

export default router;
