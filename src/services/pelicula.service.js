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
  // Este método obtiene estadísticas de las películas
  // como el total de películas, el promedio de puntaje y la cantidad de películas por autor.
   getEstadisticas: async () => {
  // Trae todas las películas desde la base de datos
  const peliculas = await PeliculaRepository.getAll();

  // Calcula el total de películas encontradas
  const totalPeliculas = peliculas.length;

  // Calcula el promedio de puntaje de todas las películas.
  // Si no hay películas, el promedio es 0
  const promedioPuntaje =
    totalPeliculas === 0
      ? 0
  // Reduce recorre un array y nos devuelve un unico valor
  // recorre todas las películas y suma sus puntajes
      // Si no hay puntaje, se considera 0
      // Luego divide por el total de películas para obtener el promedio
      : peliculas.reduce((acc, p) => acc + (p.puntaje || 0), 0) / totalPeliculas;

  // Objeto para contar cuántas películas hay por autor
  const cantidadPorAutor = {};

  // Recorremos cada película para agrupar cuántas hizo cada autor
  for (const p of peliculas) {
    const autor = p.author || "Desconocido"; // Si no tiene autor, se pone "Desconocido"
    cantidadPorAutor[autor] = (cantidadPorAutor[autor] || 0) + 1;
  }


    return {
      totalPeliculas,
      promedioPuntaje: parseFloat(promedioPuntaje.toFixed(2)),
      cantidadPorAutor,
    };
  },

  exportarPeliculas: async () => {
  // Paso 1: Traemos todas las películas desde la base de datos Supabase
  const peliculas = await PeliculaRepository.getAll();

  // Paso 2: Validamos si hay películas disponibles para exportar
  if (!peliculas || peliculas.length === 0) return null;

  // Paso 3: Definimos los campos que queremos incluir en el archivo CSV
  const fields = ["id", "title", "author", "puntaje", "publishedDate", "availableCopies"];

  // Paso 4: Importamos dinámicamente las librerías necesarias
  // - json2csv: para convertir JSON a formato CSV
  // - fs/promises: para escribir el archivo en el sistema de archivos
  const { Parser } = await import("json2csv"); // Import dinámico 
  const fs = await import("fs/promises");

  // Paso 5: Creamos una instancia del parser con los campos definidos
  const json2csv = new Parser({ fields });

  // Paso 6: Convertimos el array de películas a un string CSV
  const csv = json2csv.parse(peliculas);

  // Paso 7: Definimos la ruta donde se guardará el archivo CSV
  const filePath = "./src/utils/peliculas_export.csv";

  // Paso 8: Escribimos el archivo CSV en disco
  await fs.writeFile(filePath, csv);

  // Paso 9: Retornamos la ruta del archivo creado para que el controller lo pueda descargar
  return filePath;
},

    deleteAll: async () => {
    return await PeliculaRepository.deleteAll();
  },
};
