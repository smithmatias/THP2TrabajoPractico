import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "localhost",
  DB_PATH: process.env.DB_PATH || "./src/db/productos.db.json",
};
