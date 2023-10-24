import { Router } from "express";
import {
  getAll,
  getOneById,
  register,
  login,
  authUser,
} from "../contollers/users.controllers.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import passport from "passport";
const router = Router();
// user autenticado
router.get(
  "/current",
  passport.authenticate("JWT", {
    passReqToCallback: true,
    session: false,
  }),
  authUser
);
// Todos los users
router.get("/get-all", getAll);
// Solamente authenticados y administradores tienen acceso a un solo user
router.get("/:id", isAdmin, getOneById);
// Registrar user
router.post(
  "/register",
  passport.authenticate("Register", {
    passReqToCallback: true,
    session: false,
  }),
  register
);
// Logear user
router.post(
  "/login",
  passport.authenticate("Login", {
    passReqToCallback: true,
    session: false,
  }),
  login
);

export default router;
