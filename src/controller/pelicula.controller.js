import { PeliculaService } from "../services/pelicula.service.js";

export const PeliculaController = {
  peliculaCreateOne: async (req, res) => {
    const pelicula = req.body;
    try {
      const response = await PeliculaService.servicePeliculaCreation(pelicula);

      if (!response) {
        res.status(400).json({
          payload: null,
          message: "Datos inválidos o error al crear la película",
          ok: false,
        });
        return;
      }

      res.status(201).json({
        message: "Creado correctamente",
        payload: { ...response, id: response.id },
        ok: true,
      });
      return;
    } catch (e) {
      console.error(e);
      res.status(500).json({
        payload: null,
        message: "Error inesperado al crear la película",
        ok: false,
      });
    }
  },

  peliculaGetAll: async (req, res) => {
    const peliculas = await PeliculaService.serviceGetAll();

    if (!peliculas) {
      res.status(404).json({
        message: "Error al leer los peliculas",
        payload: null,
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: "Success",
      payload: peliculas,
      ok: true,
    });
    return;
  },

  peliculaGetById: async (req, res) => {
    const { id } = req.params;
    const pelicula = await PeliculaService.servicePeliculaValidation(id);

    if (!pelicula) {
      res.status(404).json({
        message: "Error, no existe la pelicula",
        payload: null,
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: "Success",
      payload: pelicula,
      ok: true,
    });
    return;
  },

  peliculaDeleteOne: async (req, res) => {
    const { id } = req.params;
    const idPelicula = await PeliculaService.servicePeliculaDelete(id);

    if (!idPelicula) {
      res.status(404).json({
        payload: null,
        message: "No se encontro la pelicula a borrar",
        ok: false,
      });
      return;
    }

    res.status(200).json({
      message: `Pelicula borrada satisfactoriamente`,
      payload: null,
      ok: true,
    });
    return;
  },

  peliculaUpdateById: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    const peliculaUpdated = await PeliculaService.serviceUpdatePelicula(
      id,
      newData
    );

    if (!peliculaUpdated) {
      res.status(404).json({
        ok: false,
        payload: null,
        message: "Fallo al actualizar la pelicula",
      });
      return;
    }

    res.status(200).json({
      message: `Pelicula modificado`,
      payload: peliculaUpdated,
      ok: true,
    });
    return;
  },
};
