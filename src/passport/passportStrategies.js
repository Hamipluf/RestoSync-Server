import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserManager from "../persistencia/DAOs/user.posgresql.js";
const userManager = new UserManager();

const cookie_secret = process.env.SECRET_COOKIE;
const url_production = process.env.URL_PRODUCCION;
// Local Login
passport.use(
  "Login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userData = {
          email,
          password,
        };
        const userDb = await userManager.loginUser(userData);
        if (!userDb) {
          const message = `No existe una cuenta con el email ${email}`;
          return done(message, false); // No existe en la database hay que registrarse
        }
        return done(null, userDb);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Register Local Strategy
passport.use(
  "Register",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userData = {
          email,
          password,
        };
        const userDB = await userManager.loginUser(userData);
        if (!userDB.error) {
          const response = {
            error: true,
            message: `Ya existe un usuario con el email ${email}`,
          };
          return done(false, response);
        }
        const newUserDB = await userManager.registerUser(req.body);
        done(null, newUserDB);
      } catch (error) {
        done(error);
      }
    }
  )
);
