import { JsonHandler } from "../utils/JsonHandler.js";

export const ProductoRepository = {
  getAll: async () => {
    return await JsonHandler.read();
  },

  getById: async (id) => {
    const productos = await JsonHandler.read();
    return productos.find((p) => p.id == id);
  },

  save: async (producto) => {
    const productos = await JsonHandler.read();
    productos.push(producto);
    return await JsonHandler.write(productos);
  },

  updateStock: async (id, cantidad) => {
    const productos = await JsonHandler.read();
    const index = productos.findIndex((p) => p.id == id);
    if (index === -1) return null;

    productos[index].stockAmount += cantidad;
    await JsonHandler.write(productos);
    return productos[index];
  },
};
