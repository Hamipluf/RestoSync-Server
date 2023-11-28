import ProductManager from "../persistencia/DAOs/products.postgresql.js";
import customResponses from "../utils/customResponses.js";

const productManager = new ProductManager();

// Obtener todos los productos de una tienda
export const getAllProducts = async (req, res) => {
  const { sid } = req.params;
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!sid) {
    return res
      .status(404)
      .json(customResponses.badResponse(404, "Falta el ID de la store."));
  }

  try {
    const products = await productManager.getAllProductsByStoreId(
      parseInt(sid)
    );
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
  const { pid } = req.params;
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  if (!pid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del producto"));
  }

  try {
    const product = await productManager.getProductById(parseInt(pid));

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
// Obtiene la tienda a la que pertenece un producto
export const getStoreProduct = async (req, res) => {
  const { pid } = req.params;
  if (req.method !== "GET") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  if (!pid) {
    return res
      .status(400)
      .json(customResponses.badResponse(400, "Falta el ID del producto"));
  }

  try {
    const product = await productManager.getAllProductsByStoreId(parseInt(pid));

    if ("error" in product) {
      return res
        .status(400)
        .json(customResponses.badResponse(400, product.message));
    }

    res
      .status(200)
      .json(
        customResponses.responseOk(
          200,
          "Store del producto encontrada",
          product
        )
      );
  } catch (error) {
    console.error("Error al obtener el store del producto:", error);
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

  const { title, stock_quantity, price, store_id } = req.body;
  if (!title || !stock_quantity || !price) {
    return { error: true, message: "Faltan campos a completar." };
  }
  if (!store_id) {
    return res
      .status(404)
      .json(
        customResponses.badResponse(
          404,
          "Falta el ID de la store para agregar el producto."
        )
      );
  }

  try {
    const createdProduct = await productManager.registerProduct(req.body);

    if (createProduct.error) {
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
export const updateProduct = async (req, res) => {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  const { title, description, stock_quantity, category, price, product_id } =
    req.body;

  if (
    !title ||
    !stock_quantity ||
    !price ||
    !description ||
    !category ||
    !product_id
  ) {
    return { error: true, message: "Faltan campos a completar." };
  }

  const productData = {
    title,
    description,
    stock_quantity,
    category,
    price,
  };

  try {
    const updatedProduct = await productManager.updateProduct(
      parseInt(product_id),
      productData
    );

    if (updateProduct.error) {
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

  const { pid } = req.params;

  if (!pid) {
    return res
      .status(400)
      .json(
        customResponses.badResponse(400, "Falta el ID del producto a eliminar.")
      );
  }

  try {
    const deletedProduct = await productManager.deleteProduct(parseInt(pid));

    if (deleteProduct.error) {
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
