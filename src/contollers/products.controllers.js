import ProductManager from "../persistencia/DAOs/products.postgresql.js";
import customResponses from "../utils/customResponses.js";

const productManager = new ProductManager();

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  try {
    const products = await productManager.getAllProducts();
    if (Array.isArray(products) && products.length === 0) {
      return res
        .status(404)
        .json(
          customResponses.badResponse(404, "No hay productos para devolver")
        );
    }

    if ("error" in products) {
      return res
        .status(400)
        .json(
          customResponses.badResponse(
            400,
            "Error al obtener productos",
            products.message
          )
        );
    }
    res
      .status(200)
      .json(customResponses.responseOk(200, "Productos encontrados", products));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Obtener un producto por ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  if (!id) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del producto"));
  }

  try {
    const product = await productManager.getProductById(id);

    if ("error" in product) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, product.message));
    }

    res
      .status(200)
      .json(customResponses.responseOk(200, "Producto encontrado", product));
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Crear un producto
export const createProduct = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const productData = req.body;

  try {
    const createdProduct = await productManager.createProduct(productData);

    if ("error" in createdProduct) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, createdProduct.message));
    }

    res
      .status(201)
      .json(
        customResponses.responseOk(
          201,
          "Producto creado con éxito",
          createdProduct
        )
      );
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Actualizar un campo del producto por ID
export const updateProductField = async (req, res) => {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { id } = req.params;
  const { fieldToUpdate, newValue } = req.body;

  if (!id || !fieldToUpdate || newValue === undefined) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Faltan campos a completar"));
  }

  try {
    const updatedProduct = await productManager.updateProductField(
      id,
      fieldToUpdate,
      newValue
    );

    if ("error" in updatedProduct) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, updatedProduct.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Producto actualizado con éxito",
          updatedProduct
        )
      );
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
// Eliminar un producto por ID
export const deleteProduct = async (req, res) => {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json(
        customResponses.badResponse(400, "Falta el ID del producto a eliminar")
      );
  }

  try {
    const deletedProduct = await productManager.deleteProduct(id);

    if ("error" in deletedProduct) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, deletedProduct.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Producto eliminado con éxito",
          deletedProduct
        )
      );
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
