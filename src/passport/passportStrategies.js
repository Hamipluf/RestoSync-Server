import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserManager from "../persistencia/DAOs/user.posgresql.js";
import authManager from "../utils/authManager.js";
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
          const response = {
            error: true,
            message: `No existe una cuenta con el email ${email}`,
          };
          return done(false, response); // No existe en la database hay que registrarse
        }
        const token = authManager.generateToken(userDb);
        const usearAuth = {
          user: userDb,
          token,
        };
        return done(null, usearAuth);
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
        const userDB = await userManager.getUserByEmail(email);
        if (userDB) {
          const response = {
            error: true,
            message: "Ya existe un user con ese email.",
          };
          return done(false, response);
        }
        const newUserDB = await userManager.registerUser(req.body);
        const token = authManager.generateToken(newUserDB);
        const usearAuth = {
          user: newUserDB,
          token,
        };
        done(null, usearAuth);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Auth JWT
passport.use(
  "JWT",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_JWT,
    },
    async (jwt_payload, done) => {
      const userDB = await userManager.getUserById(jwt_payload.id);
      if (!userDB) {
        const response = {
          error: true,
          message: "No existe un user con ese token",
        };
        return done(false, response);
      }
      const token = authManager.generateToken(userDB);
      const userAuth = {
        user: userDB,
        token,
      };
      done(null, userAuth);
    }
  )
);
