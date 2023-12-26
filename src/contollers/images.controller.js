import axios from "axios";
import { config } from "dotenv";
config();
import customResponses from "../utils/customResponses.js";
import UserManager from "../persistencia/DAOs/user.posgresql.js";
const userManager = new UserManager();

const url_bucket = process.env.URL_SERVICE_BUCKET;
// Sube una imagen
export const uploadImage = async (req, res) => {
  const user = req.user.user;
  const token = req.user.token;
  const file = req.file;
  const formData = new FormData();
  const blob = new Blob([file.buffer], { type: file.mimetype });
  formData.append("image", blob, {
    filename: file.fieldname,
    originalname: file.originalname,
  });
  if (req.method !== "POST") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!file) {
    return res
      .status(404)
      .json(customResponses.badResponse(404, "Necesita subir un archivo."));
  }

  try {
    const apiResponse = await axios.post(
      `${url_bucket}/api/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": " multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (apiResponse.data.success) {
      // Guarda la key de la foto en el usuario correspondiente
      const savePhoto = await userManager.updateUserFieldById(
        user.id,
        "profile_photo",
        apiResponse.data.data.Key
      );
      if (savePhoto.success) {
        return res
          .status(200)
          .json(
            customResponses.badResponse(
              400,
              "No se pudo guardar la imagen.",
              savePhoto
            )
          );
      } else {
        return res.status(400).json(apiResponse.data);
      }
    } else {
      return res.status(400).json(apiResponse.data);
    }
  } catch (error) {
    if (data.code === 401) {
      const data = error.response.data;
      return res
        .status(401)
        .json(customResponses.badResponse(401, data.message));
    } else {
      console.log("Error al obtener los registros:", error);
      return res
        .status(500)
        .json(
          customResponses.badResponse(
            500,
            "Error en el servidor",
            error.response
          )
        );
    }
  }
};
// Obtiene una imagen
export const getImage = async (req, res) => {
  const token = req.user.token;
  const { key } = req.params;
  if (req.method !== "GET") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!key) {
    return res
      .status(404)
      .json(
        customResponses.badResponse(404, "Se necesita la key del archivo.")
      );
  }
  try {
    const apiResponse = await axios.get(`${url_bucket}/api/image/get/${key}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (apiResponse.data.success) {
      return res.status(200).json(apiResponse.data);
    } else {
      return res.status(400).json(apiResponse.data);
    }
  } catch (error) {
    if (data.code === 401) {
      const data = error.response.data;
      return res
        .status(401)
        .json(customResponses.badResponse(401, data.message));
    } else {
      console.log("Error al obtener los registros:", error);
      return res
        .status(500)
        .json(
          customResponses.badResponse(
            500,
            "Error en el servidor",
            error.response
          )
        );
    }
  }
};
// Elimina
export const deleteImage = async (req, res) => {
  const token = req.user.token;
  const { key } = req.params;
  if (req.method !== "DELETE") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }
  if (!key) {
    return res
      .status(404)
      .json(
        customResponses.badResponse(404, "Se necesita la key del archivo.")
      );
  }
  try {
    const apiResponse = await axios.delete(
      `${url_bucket}/api/image/delete/${key}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (apiResponse.data.success) {
      return res.status(200).json(apiResponse.data);
    } else {
      return res.status(400).json(apiResponse.data);
    }
  } catch (error) {
    if (data.code === 401) {
      const data = error.response.data;
      return res
        .status(401)
        .json(customResponses.badResponse(401, data.message));
    } else {
      console.log("Error al obtener los registros:", error);
      return res
        .status(500)
        .json(
          customResponses.badResponse(
            500,
            "Error en el servidor",
            error.response
          )
        );
    }
  }
};
