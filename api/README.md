# **DGI Carnets API**

La API de DGI Carnets es el componente backend diseñado para la gestión y administración de datos de usuarios en un centro gubernamental en San Juan de Los Morros, Guárico, Venezuela. Su función principal es servir como el punto central para las operaciones de búsqueda, filtrado, actualización y eliminación de información de carnets de usuarios ya existentes.

**NOTA:** Los datos utilizados en la base de datos son simulados para presentar el proyecto realizado en la empresa en cuestión (NO se ha expuesto los datos de ningún empleado que haya trabajado en la Dirección General de Informática del estado Guárico)

**IMPORTANTE:** Esta API está diseñada exclusivamente para la gestión de registros existentes y **no proporciona funcionalidades para la creación de nuevos usuarios**.

## ✨ Funcionalidades Principales

- **Consulta y Filtrado:** Permite buscar y filtrar usuarios por diversos criterios como cédula, nombre, fecha y estado de entrega, con soporte para paginación (lazy loading).
- **Actualización de Estado:** Facilita la marcación de carnets como "entregados" y el registro de la fecha de entrega.
- **Actualización de Descripción:** Permite añadir o modificar descripciones asociadas a los registros de usuario.
- **Eliminación de Registros:** Soporta la eliminación de usuarios individuales.
- **Manejo de Errores:** Implementa middleware para el manejo centralizado de errores y rutas no encontradas.
- **Mocks Locales:** Incluye archivos mock para permitir el desarrollo y pruebas en un entorno local sin necesidad de una conexión a una base de datos real.

## 🚀 Tecnologías Utilizadas

- **Entorno de Ejecución:** [Node.js](https://nodejs.org/)
- **Framework Web:** [Express.js](https://expressjs.com/)
- **Base de Datos:** [MongoDB](https://www.mongodb.com/)
- **ODM (Object Data Modeling):** [Mongoose](https://mongoosejs.com/) (inferido por el uso en el modelo)
- **Lenguaje de Programación:** [TypeScript](https://www.typescriptlang.org/)
- **Validación de Esquemas:** [Zod](https://zod.dev/) (inferido por `safeParse`)
- **Middleware:** [CORS](https://expressjs.com/en/resources/middleware/cors.html) para manejo de políticas de origen cruzado.
- **Variables de Entorno:** [Dotenv](https://www.npmjs.com/package/dotenv)

## 📁 Estructura del Proyecto

```
api
├── src
│   ├── index.ts           # Archivo principal de la API (configuración de Express, rutas, middleware)
│   ├── conections
│   │   └── mongo.ts       # Configuración de la conexión a MongoDB (Mongoose)
│   ├── controllers
│   │   └── users.ts       # Lógica de negocio para las rutas de usuarios (getFilter, patchDelivered, etc.)
│   ├── models
│   │   └── users.ts       # Definición del esquema de usuario y operaciones de base de datos (Mongoose)
│   ├── routes
│   │   └── users.ts       # Definición de las rutas de la API y mapeo a los controladores
│   └── utils
│       ├── mocks
│       │   └── users.json # Datos de usuario de prueba para el entorno local (mocks)
│       ├── enums.ts       # Definiciones de enumeraciones
│       ├── middleware.ts  # Middleware personalizado (notFound, errorServer, corsOptions)
│       ├── schemas.ts     # Esquemas de validación (Zod) para entradas de la API
│       ├── types.d.ts     # Definiciones de tipos TypeScript
│       └── utils.ts       # Funciones de utilidad (regexParams, objFilterRequest)
├── .eslintrc.cjs          # Configuración de ESLint
├── .gitignore             # Archivos y directorios ignorados por Git
├── .prettierignore        # Archivos ignorados por Prettier
├── README.md              # Este archivo
├── package-lock.json      # Bloqueo de dependencias de npm
└── package.json           # Metadatos del proyecto y dependencias
```

## ⚙️ Instalación y Configuración Local

Para poner en marcha la API en tu entorno de desarrollo local, sigue estos pasos:

1.  **Prerrequisitos:**

    - Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados.
    - Necesitarás una instancia de [MongoDB](https://www.mongodb.com/try/download/community) ejecutándose localmente o accesible desde tu entorno.

2.  **Clona el repositorio (si no lo has hecho ya):**

    ```bash
    git clone https://github.com/illiantech/DGI_carnet.git

    cd api # Asegúrate de navegar a la carpeta de la API
    ```

3.  **Instala las dependencias:**

    ```bash
    npm install
    ```

4.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz de la carpeta `api` con las siguientes variables:

    ```dotenv
    PORT=3000
    ROOT_DB= #URI de tu base de datos MongoDB (si no de encuentra se conecta automaticamente en local - 'mongodb://localhost:27017/dgi';)
    ```

    Asegúrate de reemplazar `ROOT_DB` con la URL de conexión a tu base de datos MongoDB.

5.  **Ejecuta la API:**

    ```npm run dev

    ```

    La API se iniciará y estará escuchando en `http://localhost:3000` (o el puerto que hayas configurado).

## 💡 Endpoints de la API

La API expone los siguientes endpoints para la gestión de usuarios:

### `GET /users`

- **Propósito:** Obtiene un listado de usuarios filtrado y paginado. Es la principal forma de consultar los datos de los carnets.
- **Parámetros de Consulta (Query Params):**
  - `ci` (number, opcional): Cédula de identidad del usuario.
  - `name` (string, opcional): Nombre del usuario.
  - `date` (string, opcional): Fecha en formato `YYYY-MM-DD`.
  - `delivered` (boolean, opcional): Estado de entrega del carnet (`true`/`false`).
  - `userCount` (number, opcional, por defecto `0`): Cantidad de usuarios a omitir para la paginación (lazy loading).
- **Ejemplo de Respuesta (Éxito 200 OK):**
  ```json
  [
    [
      {
        "_id": "60c72b2f9b1d8c001c8e4a7b",
        "ci": 12345678,
        "name": "Juan Pérez",
        "date": "2023-01-15T00:00:00.000Z",
        "delivered": false,
        "__v": 0
      },
      {
        "_id": "60c72b2f9b1d8c001c8e4a7c",
        "ci": 87654321,
        "name": "María García",
        "date": "2023-02-20T00:00:00.000Z",
        "delivered": true,
        "deliveredDate": "2023-03-01T10:30:00.000Z",
        "description": "Carnet entregado en oficina principal",
        "__v": 0
      }
    ],
    15 // Total de usuarios que coinciden con el filtro
  ]
  ```
- **Ejemplo de Respuesta (Error 406 Not Acceptable - Validación):**
  ```json
  {
    "issues": [
      {
        "code": "invalid_type",
        "expected": "number",
        "received": "nan",
        "path": ["ci"],
        "message": "Expected number, received nan"
      }
    ],
    "name": "ZodError"
  }
  ```

### `PATCH /users/:id/delivered`

- **Propósito:** Actualiza el estado de entrega de un carnet a "entregado" y registra la fecha de entrega.
- **Parámetros de Ruta (Path Params):**
  - `id` (string, requerido): ID único del usuario (ID de MongoDB).
- **Cuerpo de la Petición (Request Body):**
  ```json
  {
    "data": true
  }
  ```
  - El campo `data` debe ser `true` para marcar el carnet como entregado.
- **Ejemplo de Respuesta (Éxito 200 OK):**
  ```json
  {
    "_id": "60c72b2f9b1d8c001c8e4a7b",
    "ci": 12345678,
    "name": "Juan Pérez",
    "date": "2023-01-15T00:00:00.000Z",
    "delivered": true,
    "deliveredDate": "2024-05-25T16:00:00.000Z",
    "__v": 1
  }
  ```
- **Ejemplo de Respuesta (Error 404 Not Found):**
  ```json
  {
    "error": "Not found user pacth check id"
  }
  ```

### `PATCH /users/:id/description`

- **Propósito:** Actualiza la descripción asociada a un registro de usuario.
- **Parámetros de Ruta (Path Params):**
  - `id` (string, requerido): ID único del usuario (ID de MongoDB).
- **Cuerpo de la Petición (Request Body):**
  ```json
  {
    "data": "Carnet entregado en oficina principal, con firma del titular."
  }
  ```
  - El campo `data` debe ser una cadena de texto (string) con la nueva descripción.
- **Ejemplo de Respuesta (Éxito 200 OK):**
  ```json
  {
    "_id": "60c72b2f9b1d8c001c8e4a7b",
    "ci": 12345678,
    "name": "Juan Pérez",
    "date": "2023-01-15T00:00:00.000Z",
    "delivered": true,
    "deliveredDate": "2024-05-25T16:00:00.000Z",
    "description": "Carnet entregado en oficina principal, con firma del titular.",
    "__v": 2
  }
  ```
- **Ejemplo de Respuesta (Error 404 Not Found):**
  ```json
  {
    "error": "Not found user pacth descrip id"
  }
  ```
- **Ejemplo de Respuesta (Error 406 Not Acceptable - Validación):**
  ```json
  {
    "error": "PATCH invalid type"
  }
  ```

### `DELETE /users/:id`

- **Propósito:** Elimina un registro de usuario de la base de datos.
- **Parámetros de Ruta (Path Params):**
  - `id` (string, requerido): ID único del usuario (ID de MongoDB).
- **Ejemplo de Respuesta (Éxito 200 OK):**
  ```json
  {
    "_id": "60c72b2f9b1d8c001c8e4a7b",
    "ci": 12345678,
    "name": "Juan Pérez",
    "date": "2023-01-15T00:00:00.000Z",
    "delivered": false,
    "__v": 0
  }
  ```
  - Devuelve el objeto del usuario que ha sido eliminado.
- **Ejemplo de Respuesta (Error 404 Not Found):**
  ```json
  {
    "error": "Not found user delete id"
  }
  ```

## 📝 Modelo de Datos: `User`

El modelo `User` representa la estructura de los documentos de usuario almacenados en MongoDB.

```typescript
interface UserType {
  _id: string // ID único generado por MongoDB
  ci: number // Cédula de identidad del usuario
  name: string // Nombre completo del usuario
  date: Date // Fecha de emisión o registro del carnet
  delivered: boolean // Indica si el carnet ha sido entregado (true) o no (false)
  deliveredDate?: Date // Fecha en que el carnet fue entregado (opcional)
  description?: string // Descripción adicional o notas sobre el carnet (opcional)
  __v: number // Versión del documento (gestionado por Mongoose)
}
```

**Ejemplo de Objeto `User`:**

```json
{
  "_id": "60c72b2f9b1d8c001c8e4a7b",
  "ci": 12345678,
  "name": "Juan Pérez",
  "date": "2023-01-15T00:00:00.000Z",
  "delivered": false,
  "description": "Pendiente de entrega en sede principal.",
  "__v": 0
}
```

## 🛠️ Middleware y Utilidades Clave

- **`middleware.ts`**: Contiene funciones middleware para el manejo global de la API:
  - `notFound`: Maneja las rutas que no existen, devolviendo un error 404.
  - `errorServer`: Un middleware de manejo de errores centralizado para capturar y responder a errores del servidor.
  - `corsOptions`: Configuración para el middleware CORS, controlando qué orígenes pueden acceder a la API.
- **`schemas.ts`**: Define los esquemas de validación utilizando la librería `Zod`. Estos esquemas se usan para validar los datos de entrada en los controladores (`req.query`, `req.body`, `req.params`), asegurando la integridad y el formato correcto de los datos.
- **`utils.ts`**: Incluye funciones de utilidad generales, como `regexParams` para validaciones de formato de parámetros y `objFilterRequest` para construir objetos de filtro para las consultas a la base de datos.
- **`mocks/users.json`**: Este archivo contiene datos de usuario de prueba. Es utilizado por el entorno de mocks para simular respuestas de la API en desarrollo local, permitiendo que el frontend funcione sin una conexión activa a MongoDB.

## 🤝 Autor

- Daniel Pimentel - illianctech

## 📄 Licencia

Este proyecto está bajo la licencia [Tipo de Licencia MIT]. Consulta el archivo `LICENSE` en la raíz del repositorio para más detalles.
