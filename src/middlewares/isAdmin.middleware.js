import customResponses from "../utils/customResponses.js";
const isAdmin = (req, res, next) => {
  // Verifica si el usuario está autenticado y tiene el rol 3 (Admin)
  if (req.user && req.user.role === 3) {
    next();
  } else {
    res
      .status(403)
      .json(
        customResponses.badResponse(
          403,
          "Acceso prohibido. Se requiere rol de administrador."
        )
      );
  }
};

export default isAdmin;
