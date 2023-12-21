import axios from "axios";
import { config } from "dotenv";
config();
import customResponses from "../utils/customResponses.js";

const url_bucket = process.env.URL_SERVICE_BUCKET
// Sube una imagen
export const uploadImage = async (req, res) => {
  const file = req.file;
  const token = req.user.token;
  if (req.method !== "POST") {
    res
      .status(405)
      .json(customResponses.badResponse(405, "Método no permitido"));
  }

  try {
    const apiResponse = await axios.post(`${url_bucket}/api/image/upload`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      file,
    });
    console.log(apiResponse);
    res.send(terminado);
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res
      .status(500)
      .json(customResponses.badResponse(500, "Error en el servidor", error));
  }
};
