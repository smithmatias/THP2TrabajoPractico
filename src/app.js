import express from "express";
import morgan from "morgan";
import { config } from "./config/config.js";
import { peliculaRouter } from "./routes/pelicula.route.js";
import { requestLogger } from "./middleware/requestLogger.js";

const app = express();
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());

app.use(requestLogger);
app.use("/api/pelicula", peliculaRouter);

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://${config.HOST}:${config.PORT}`);
});
