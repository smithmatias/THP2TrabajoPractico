import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import { config } from "./config/config.js";
import productoRouter from "./routes/producto.route.js";

const app = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.json());

app.use(express.static("public"));

app.use("/api/productos", productoRouter);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://${config.HOST}:${config.PORT}`);
});
