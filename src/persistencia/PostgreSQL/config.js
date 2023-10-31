import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.URL_POSTGRESQL_PRODUC,
  ssl: {
    rejectUnauthorized: false, 
  },
});
pool
  .connect()
  .then(() => {
    console.log("Conexión a PostgreSQL establecida correctamente");
  })
  .catch((error) => {
    console.error("Error al conectar a PostgreSQL:", error);
  });

export function query(text, params) {
  return pool.query(text, params);
}