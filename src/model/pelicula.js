//Disclaimer: Encontramos esta forma de documentar en ChatGPt, y nos pareció que estaba bueno.
//Esta clase ya no está siendo obligatoria/necesaria, pero la dejamos como documentación de la clase Pelicula que existe en la DB.

/**
 * Clase que representa una Película.
 *
 * @property {number} [id] - ID único (autogenerado por Supabase).
 * @property {string} title - Título de la película (obligatorio).
 * @property {string} author - Autor/director (obligatorio).
 * @property {number} puntaje - Puntaje numérico (obligatorio).
 * @property {string} publishedDate - Fecha de publicación (formato ISO, obligatorio).
 * @property {number} availableCopies - Copias disponibles (obligatorio).
 */

export class Pelicula {
  constructor(id, title, author, puntaje, publishedDate, availableCopies) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.puntaje = puntaje;
    this.publishedDate = publishedDate;
    this.availableCopies = availableCopies;
  }
}
