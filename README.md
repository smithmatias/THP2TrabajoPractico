# Final THP 2 - API de Stock de Productos

Gestión de productos con endpoints para listar, crear, obtener productos y actualizar su stock.
Validaciones estrictas para asegurar integridad de datos.
Persistencia de datos mediante archivo JSON (productos.db.json).

!NOTA: En base a lo determinado para el parcial corto, no se incluyen utilidades de autenticación ni middlewares relacionados.

# Instalación

Ejecutar:

npm install

# Uso

Levantar el servidor:
npm run dev

La API estará disponible en: http://localhost:3003/api/productos

# Endpoints

GET /api/productos — Listar todos los productos.
GET /api/productos/:id — Obtener producto por ID.
POST /api/productos — Crear un nuevo producto.
PATCH /api/productos/:id/incremento-stock — Incrementar stock de un producto.

Documentación de prueba para los endpóints se encuentra en el archivo test.endpoints.htpp.

# Validaciones

producto es obligatorio y no puede estar vacío.
stockAmount debe ser entero mayor o igual a 0.
Incremento de stock debe ser entero mayor o igual a 1.
fechaIngreso debe ser fecha válida en formato ISO 8601 (YYYY-MM-DD).

# Pruebas

El archivo tests/test.endpoints.http contiene ejemplos para probar la API con herramientas compatibles con archivos HTTP (como REST Client en VS Code).
