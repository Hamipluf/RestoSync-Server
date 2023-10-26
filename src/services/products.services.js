import { query } from "../persistencia/PostgreSQL/config.js";
class ProductService {
  constructor(model) {
    this.model = model;
  }
  // Obtiene todos los productos
  getAllProducts = async () => {
    try {
      const data = await query("SELECT * FROM products");
      const product = data.rows;
      return product;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Crea un nuevo producto
  createProduct = async (product) => {
    const { title, description, price, stock_quantity, category, store_id } =
      product;
    try {
      const productCreated = await query(
        "INSERT INTO products (title, description, price, stock_quantity, category, store_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [title, description, price, stock_quantity, category, store_id]
      );
      return productCreated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene un producto por su ID
  getProductById = async (productId) => {
    try {
      const data = await query("SELECT * FROM products WHERE id = $1", [
        productId,
      ]);
      const product = data.rows[0];
      return product;
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Actualiza un producto por su ID
  updateProduct = async (productId, newInfo) => {
    const { title, description, price, stock_quantity, category, store_id } =
      newInfo;
    try {
      const updatedProduct = await query(
        "UPDATE products SET title = $2, description = $3, price = $4, stock_quantity = $5, category = $6, store_id = $7 WHERE id = $1 RETURNING *",
        [
          productId,
          title,
          description,
          price,
          stock_quantity,
          category,
          store_id,
        ]
      );
      return updatedProduct.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina un producto por su ID
  deleteProduct = async (productId) => {
    try {
      const deletedProduct = await query(
        "DELETE FROM products WHERE id = $1 RETURNING *",
        [productId]
      );
      return deletedProduct.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const productService = new ProductService();

export default productService;
