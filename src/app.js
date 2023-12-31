// Server
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// ENV
import dotenv from "dotenv";
dotenv.config();
const secret_cookie = process.env.SECRET_COOKIE;
// Rutas
import users from "./routes/users.route.js";
import products from "./routes/products.route.js";
import notes from "./routes/note.route.js";
import stores from "./routes/stores.route.js";
import comments from "./routes/comments.router.js";
import employee from "./routes/employee.route.js";
import tasks from "./routes/tasks.router.js";
import images from "./routes/images.router.js";
// Passport
import passport from "passport";
import "./passport/passportStrategies.js";

const app = express();
const port = process.env.PORT || 3000;
const corsOption = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
const cookieOption = {
  httpOnly: true,
  maxAge: 7200000,
};

// Configuracion Server
app.use(cookieParser(secret_cookie, cookieOption));
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//inicializar passport
app.use(passport.initialize());

//Rutas
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/notes", notes);
app.use("/api/stores", stores);
app.use("/api/comments", comments);
app.use("/api/employees", employee);
app.use("/api/tasks", tasks);
app.use("/api/images", images);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
