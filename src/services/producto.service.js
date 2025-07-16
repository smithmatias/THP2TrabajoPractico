import { Producto } from "../model/producto.js";
import { ProductoRepository } from "../repository/producto.repository.js";

export const ProductoService = {
  crearProducto: async ({ nombre, stockAmount, fechaIngreso }) => {
    if (!nombre) throw new Error("El producto es obligatorio");
    if (
      stockAmount == null ||
      !Number.isInteger(stockAmount) ||
      stockAmount < 0
    )
      throw new Error("El stock es inválido");

    const fechaISO =
      fechaIngreso && !isNaN(new Date(fechaIngreso).getTime())
        ? new Date(fechaIngreso).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]; //Si no recibo fecha, uso la actual (en base a lo pedido)

    const productos = await ProductoRepository.getAll();
    const maxId = productos.reduce((max, p) => (p.id > max ? p.id : max), 0);
    const nuevoId = maxId + 1;

    const productoNuevo = new Producto(nuevoId, nombre, stockAmount, fechaISO);

    await ProductoRepository.save(productoNuevo);
    return productoNuevo;
  },

  listarProductos: async () => {
    return await ProductoRepository.getAll();
  },

  obtenerProducto: async (id) => {
    const producto = await ProductoRepository.getById(id);
    if (!producto) throw new Error("Producto no encontrado");
    return producto;
  },

  incrementarStock: async (id, cantidad) => {
    if (!Number.isInteger(cantidad) || cantidad < 1)
      throw new Error("El incremento mínimo es 1");

    const productoActualizado = await ProductoRepository.updateStock(
      id,
      cantidad
    );
    if (!productoActualizado) throw new Error("Producto no encontrado");

    return productoActualizado;
  },
};
