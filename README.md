DATOS DE SUPABASE
Organization: Trabajo Practico THP 2
Project Name: Proyecto THP 2
Database Password: 1Q29MDQj9I#
Region: East US (Ohio)

# API de Películas con Express y Supabase

## Resumen

El proyecto es una API REST en Node.js con Express que maneja una colección de películas, con persistencia en una DB de Supabase. Incluye autenticación básica, logging de requests y manejo de errores.

---

## Estructura de Carpetas

La estructura de carpetas está fuertemente basada en la pedida en la consigna del proyecto:

📁 tp2-proyecto-final
│── 📂 src
│ ├── 📂 controllers # Controladores para manejar la lógica de negocio
│ ├── 📂 routes # Definición de rutas del servidor
│ ├── 📂 models # Modelos de datos y esquema de la base de datos
│ ├── 📂 services # Servicios para interactuar con la capa de datos
│ ├── 📂 repositories # Capa de acceso a datos y consultas a la base de datos
│ ├── 📂 config # Archivos de configuración (ej. variables de entorno)
│ ├── 📂 tests # Pruebas unitarias y de integración
│ ├── server.js # Punto de entrada del servidor
│── 📂 docs # Documentación del proyecto
│── 📂 public # Archivos estáticos o frontend si aplica
│── .env # Configuración de variables de entorno
│── package.json # Dependencias y scripts de npm
│── README.md # Instrucciones de instalación y uso

## Configuraciones generales

En config.js se encuentran las configuraciones globales del proyecto para ser consumidas:

- Puerto y host del servidor
- Usuario y contraseña para la autenticación básica
- Credenciales de Supabase, para pegarle a la DB
- DB_PATH está deprecaado ya que no se utiliza un json local como base de datos.

## Servidor Express

Usa Morgan para loggear los requests HTTP.
Usa un middleware (express.jsion()) para parsean un JSON del body del request.
Actualmente la única ruta registrada es /api/pelicula mediante peliculaRouter, con todos los verdos HTTP básicos.

## Middleware - Autenticación Básica

Lee las credenciales de conrfig.js, y lo compara con lo decodificado del request.
Si coincide, sigue para adelante con la ejecución via next().
Si falla, devuelve un 401 y finaliza la ejecución.

## Middleware - Logger de Requests

Al inicio de cada request guarda el timestamp del mismo.
Al finalizar la respuesta, calcula el tiempo total.
Inserta un registro en la tabla de logging de Supabase con información relacionada.
Finalmente, llama a next() para liberar la petición.

## Routing - Peliculas

Se disponen de los siguientes endpoints para el CRUD de peliculas:

GET /api/pelicula — Trae todas las películas
GET /api/pelicula/:id — Trae una película por ID
POST /api/pelicula — Crea una nueva película con los datos del body
PUT /api/pelicula/:id — Actualiza película por ID
DELETE /api/pelicula/:id — Elimina película por ID

## Repositorios - Log y Pelicula

Ambos repositorios utilizan el cliente de supabase para actualizar su información.
En el caso de los logs, no se puede hacer otra cosa que crearlos. Los logs serán leídos de la DB por otro servidor. No se permite la edición ni eliminación de los mismos.
