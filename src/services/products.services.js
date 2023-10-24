import { query } from "../persistencia/PostgreSQL/config.js";
class ProductService {
  constructor(model) {
    this.model = model;
  }
  // Obtiene todos los productos
  getAllProducts = async () => {
    try {
      const products = await query("SELECT * FROM products");
      return products;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Obtiene un prducto dependiendo del user ID
  getProductById = async (pid) => {
    try {
      const data = await query("SELECT * FROM products WHERE id = $1", [pid]);
      const product = data.rows[0];
      return product;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Crea un usuario
  createProduct = async (product) => {
    const { title, description, stock, categories, price } = product;
    try {
      const productCreated = await query(
        "INSERT INTO products (title, description, stock, categories, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, description, stock, categories, price]
      );
      return productCreated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Elimina un producto por ID
  deleteProduct = async (pid) => {
    try {
      const data = await query("DELETE * FROM products WHERE id = $1", [pid]);
      const product = data.rows[0];
      return product;
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Actualiza un campo del producto por ID
  updateProductField = async (pid, fieldToUpdate, newValue) => {
    try {
      const result = await query(
        `UPDATE products SET ${fieldToUpdate} = $1 WHERE id = $2 RETURNING *`,
        [newValue, pid]
      );

      if (result.rows.length === 0) {
        return {
          error: true,
          message: `Producto con ID ${productId} no encontrado`,
        };
      }

      return result.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
  // Eliminar un producto por ID
  async deleteProduct(pid) {
    if (!pid) {
      return { error: true, message: "Falta el ID del producto a eliminar." };
    }
    try {
      const deletedProduct = await productService.deleteProduct(pid);
      return deletedProduct;
    } catch (err) {
      console.log("ERROR deleteProduct product.postgres", err);
      return { error: true, data: err };
    }
  }
}

const productService = new ProductService();

export default productService;
