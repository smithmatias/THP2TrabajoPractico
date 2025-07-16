import { Router } from "express";
import { ProductoController } from "../controller/producto.controller.js";

const router = Router();

router.post("/", ProductoController.crearProducto);
router.get("/", ProductoController.listarProductos);
router.get("/:id", ProductoController.obtenerProducto);

router.patch("/:id/incremento-stock", ProductoController.incrementarStock);

export default router;
