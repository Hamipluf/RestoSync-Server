import express from "express";
import { uploadImage, getImage ,deleteImage} from "../contollers/images.controller.js";
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
router.get(
  "/get-one/:key",
  passport.authenticate("JWT", {
    passReqToCallback: true,
    session: false,
  }),
  getImage
);
router.delete(
  "/delete/:key",
  passport.authenticate("JWT", {
    passReqToCallback: true,
    session: false,
  }),
  deleteImage
);

export default router;
