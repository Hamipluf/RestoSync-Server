import { Router } from "express";
import {
  getAll,
  getOneById,
  register,
  login,
  authUser,
} from "../contollers/users.controllers.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import haveStore from "../middlewares/haveStore.middleware.js";
import passport from "passport";
const router = Router();
// user autenticado
router.get(
  "/current",
  passport.authenticate("JWT", {
    passReqToCallback: true,
    session: false,
  }),
  haveStore,
  authUser
);
// Todos los users
router.get("/get-all", getAll);
// Solamente authenticados y administradores tienen acceso a un solo user
router.get(
  "/:id",
  passport.authenticate("JWT", { passReqToCallback: true, session: false }),
  isAdmin,
  getOneById
);
// Registrar user
router.post(
  "/register",
  passport.authenticate("Register", {
    passReqToCallback: true,
    session: false,
  }),
  haveStore,
  register
);
// Logear user
router.post(
  "/login",
  passport.authenticate("Login", {
    passReqToCallback: true,
    session: false,
  }),
  haveStore,
  login
);

export default router;
