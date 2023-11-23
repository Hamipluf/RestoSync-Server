import { query } from "../persistencia/PostgreSQL/config.js";

class ProductsService {
  constructor(model) {
    this.model = model;
  }

  // Obtiene todos los productos de una tienda
  getAllProductsOfStore = async (storeId) => {
    try {
      const products = await query(
        "SELECT * FROM products WHERE store_id = $1",
        [storeId]
      );
      return products.rows;
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
  // Crea un nuevo producto en una tienda
  createProduct = async (product) => {
    const { title, description, price, stock_quantity, category, store_id } = product;
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
  // Actualiza un producto existente
  updateProduct = async (productId, updatedProduct) => {
    const { title, description, price, stock_quantity, category } =
      updatedProduct;
    try {
      const productUpdated = await query(
        "UPDATE products SET title = $1, description = $2, price = $3, stock_quantity = $4, category = $5 WHERE id = $6 RETURNING *",
        [title, description, price, stock_quantity, category, productId]
      );
      return productUpdated.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Elimina un producto por su ID
  deleteProduct = async (productId) => {
    try {
      const productDeleted = await query(
        "DELETE FROM products WHERE id = $1 RETURNING *",
        [productId]
      );
      return productDeleted.rows[0];
    } catch (err) {
      return { error: true, data: err };
    }
  };

  // Obtiene la tienda a la que pertenece un producto
  getProductStore = async (productId) => {
    try {
      const data = await query(
        "SELECT s.* FROM products p JOIN stores s ON p.store_id = s.id WHERE p.id = $1",
        [productId]
      );
      const store = data.rows[0];
      return store;
    } catch (err) {
      return { error: true, data: err };
    }
  };
}

const productsService = new ProductsService();

export default productsService;
