import { ProductoService } from "../services/producto.service.js";

export const ProductoController = {
  crearProducto: async (req, res) => {
    try {
      const producto = await ProductoService.crearProducto(req.body);
      res.status(201).json(producto);
    } catch (error) {
      res.status(400).json({
        statusCode: 400, //Asumo que falla porque hay un error de validacion y no por, por ejemplo, un error de servidor
        error: error.message || "Error en la creación del producto",
      });
    }
  },

  listarProductos: async (req, res) => {
    try {
      const productos = await ProductoService.listarProductos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({
        statusCode: 500, //Este endpoint, si falla, siempre es problema de servidor
        error: error.message || "Error al obtener productos",
      });
    }
  },

  obtenerProducto: async (req, res) => {
    try {
      const producto = await ProductoService.obtenerProducto(req.params.id);
      res.json(producto);
    } catch (error) {
      res.status(404).json({
        statusCode: 404, // Producto no encontrado, si no fuera por esto, siempre deberia devolver
        error: error.message || "Producto no encontrado",
      });
    }
  },

  incrementarStock: async (req, res) => {
    try {
      const cantidad = parseInt(req.body.cantidad, 10);
      const productoActualizado = await ProductoService.incrementarStock(
        req.params.id,
        cantidad
      );
      res.json(productoActualizado);
    } catch (error) {
      const status = error.message === "Producto no encontrado" ? 404 : 400; //Esto puede fallar por validacion o por no encontrarlo. Asi que pongo ambos.
      res.status(status).json({
        statusCode: status,
        error: error.message || "Error al incrementar stock",
      });
    }
  },
};
