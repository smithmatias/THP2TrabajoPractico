import { supabase } from "../db/supabase.cnx.js";

export const PeliculaRepository = {
  getById: async (id) => {
    const { data, error } = await supabase
      .from("peliculas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  getAll: async () => {
    const { data, error } = await supabase.from("peliculas").select("*");
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  createOne: async (pelicula) => {
    const { data, error } = await supabase
      .from("peliculas")
      .insert([
        {
          title: pelicula.title,
          author: pelicula.author,
          puntaje: pelicula.puntaje,
          publishedDate: pelicula.publishedDate,
          availableCopies: pelicula.availableCopies,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  deleteById: async (id) => {
    const { data, error } = await supabase
      .from("peliculas")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    // Si no borró nada, retorna null
    if (!data || data.length === 0) {
      return null;
    }

    return id;
  },

  updateById: async (id, newData) => {
    const { data, error } = await supabase
      .from("peliculas")
      .update(newData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },
};
