import express from "express";
import { uploadImage } from "../contollers/images.controller.js";
// Multer
import { upload } from "../utils/config.js";
// Passport
import passport from "passport";
const router = express.Router();

router.post(
  "/upload",
  upload.single("image"),
  passport.authenticate("JWT", {
    passReqToCallback: true,
    session: false,
  }),
  uploadImage
);

export default router;
