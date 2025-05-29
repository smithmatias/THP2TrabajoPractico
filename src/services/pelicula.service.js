import { Pelicula } from "../model/pelicula.js";
import { PeliculaRepository } from "../repository/pelicula.repository.js";

export const PeliculaService = {
  servicePeliculaValidation: async (id) => {
    const codigoPelicula = await PeliculaRepository.getById(id);

    if (!codigoPelicula) return null;

    return codigoPelicula;
  },

  serviceGetAll: async () => {
    const peliculas = PeliculaRepository.getAll();

    if (!peliculas) return null;

    return peliculas;
  },

  servicePeliculaCreation: async (pelicula) => {
    // No generar id, lo genera Supabase
    const modelPelicula = new Pelicula(
      null,
      pelicula.title,
      pelicula.author,
      pelicula.puntaje,
      pelicula.publishedDate,
      pelicula.availableCopies
    );

    const created = await PeliculaRepository.createOne(modelPelicula);

    if (!created) return null;

    return created;
  },
  servicePeliculaDelete: async (id) => {
    const idPelicula = await PeliculaRepository.deleteById(id);
    if (!idPelicula) return null;
    return idPelicula;
  },
  serviceUpdatePelicula: async (id, newData) => {
    const peliculaActualizado = await PeliculaRepository.updateById(
      id,
      newData
    );
    if (!peliculaActualizado) return null;
    return peliculaActualizado;
  },
};
