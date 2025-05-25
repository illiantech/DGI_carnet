# **![icono](https://raw.githubusercontent.com/illiantech/DGI_carnet/refs/heads/master/view/public/favicon-32x32.png) DGI Carnets Monorepo**

Este repositorio contiene la aplicación **DGI Carnets**, una solución integral para la gestión de datos de usuarios en un centro gubernamental en San Juan de Los Morros, Guárico, Venezuela. El monorepo está dividido en dos componentes principales: el **frontend (`view`)** y el **backend (`api`)**, que trabajan en conjunto para permitir la búsqueda, filtrado, actualización y eliminación eficiente de información de carnets de usuarios existentes.

**NOTA IMPORTANTE:**

- Esta aplicación y los datos utilizados en ella son simulados con fines de demostración del proyecto.

- La aplicación está diseñada exclusivamente para la administración de registros existentes y **no incluye funcionalidades para la creación de nuevos usuarios**.

## ✨ Funcionalidades Destacadas

- **Gestión Completa de Datos:** Permite buscar, filtrar, actualizar (estado de entrega y descripción) y eliminar registros de usuarios existentes.

- **Experiencia de Usuario Moderna:** Frontend desarrollado con React, ofreciendo una interfaz intuitiva y adaptable.

- **Datos de Prueba:** Incluye datos de prueba iniciales en el frontend y mocks en el backend para facilitar el desarrollo y las pruebas locales.

- **Testing Robusto:** Cobertura de pruebas unitarias y E2E para asegurar la estabilidad de la aplicación.

- **PWA** (Progressive **Web App):** El frontend puede ser instalado como una aplicación de escritorio o móvil, con capacidades offline.

- **Modo Oscuro:** Opción de interfaz para una mejor visualización.

- **API RESTful:** Backend robusto con Express.js y MongoDB para una gestión eficiente de los datos.

## 🚀 Tecnologías Principales

### Frontend (`view`)

- [React](https://react.dev/) (con Hooks)

- JavaScript, HTML, CSS

- [Mock Service Worker (MSW)](https://mswjs.io/)

- [Vitest](https://vitest.dev/) / [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Backend (`api`)

- [Node.js](https://nodejs.org/) con [Express.js](https://expressjs.com/)

- [MongoDB](https://www.mongodb.com/) con [Mongoose](https://mongoosejs.com/)

- [TypeScript](https://www.typescriptlang.org/)

- [Zod](https://zod.dev/) para validación de esquemas

- [CORS](https://expressjs.com/en/resources/middleware/cors.html) y [Dotenv](https://www.npmjs.com/package/dotenv)

## 📁 Estructura del Monorepo

```
.
├── api/
│   ├── src/
│   │   ├── conections/
│   │   │   └── mongo.ts
│   │   ├── controllers/
│   │   │   └── users.ts
│   │   ├── models/
│   │   │   └── users.ts
│   │   ├── routes/
│   │   │   └── users.ts
│   │   ├── utils/
│   │   │   ├── mocks/
│   │   │   │   └── users.json
│   │   │   ├── enums.ts
│   │   │   ├── middleware.ts
│   │   │   ├── schemas.ts
│   │   │   ├── types.d.ts
│   │   │   └── utils.ts
│   │   └── index.ts
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── .prettierignore
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
└── view/
    ├── public/
    │   ├── android-chrome-192x192.png
    │   ├── android-chrome-512x512.png
    │   ├── apple-touch-icon.png
    │   ├── favicon-16x16.png
    │   ├── favicon-32x32.png
    │   └── favicon.ico
    ├── src/
    │   ├── components/
    │   │   ├── user-childrens/
    │   │   │   ├── buttonWrapperUser.jsx
    │   │   │   ├── checkFrontUser.jsx
    │   │   │   ├── deleteUser.jsx
    │   │   │   ├── descripwrapperUser.jsx
    │   │   │   ├── frontUser.jsx
    │   │   │   └── wrapperUser.jsx
    │   │   ├── blackMode.jsx
    │   │   ├── form.jsx
    │   │   ├── icons.jsx
    │   │   ├── spinner.jsx
    │   │   └── user.jsx
    │   ├── css/
    │   │   ├── config/
    │   │   │   ├── Normalize.css
    │   │   │   └── template.css
    │   │   └── modules/
    │   │       ├── wrapper-user/
    │   │       │   ├── button_wrapper.css
    │   │       │   ├── descrip_wrapper.css
    │   │       │   └── user_data_wrapper.css
    │   │       ├── btn_dinamics.css
    │   │       ├── delete_alert.css
    │   │       ├── form.css
    │   │       ├── load_user.css
    │   │       ├── user.css
    │   │       └── user_check.css
    │   ├── hooks/
    │   │   ├── controlUsers.js
    │   │   ├── lazyUser.js
    │   │   ├── observerUser.js
    │   │   ├── useBlackMode.js
    │   │   ├── useForm.js
    │   │   ├── useSEO.js
    │   │   ├── userCheck.js
    │   │   ├── userDelete.js
    │   │   └── userDescrip.js
    │   ├── resources/
    │   │   ├── consts.js
    │   │   ├── mapping.js
    │   │   └── querys.js
    │   ├── tests/
    │   │   ├── mocks/
    │   │   │   ├── handlers.js
    │   │   │   └── node.js
    │   │   ├── App.test.jsx
    │   │   └── form.test.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── .prettierignore
    ├── README.md
    ├── deploy.sh
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── vite.config.js
```

## ⚙️ Instalación y Ejecución

Para poner en marcha el proyecto completo en tu entorno local, sigue estos pasos:

1.  **Prerrequisitos:**

    - Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados.
    - Necesitarás una instancia de [MongoDB](https://www.mongodb.com/try/download/community) ejecutándose localmente o accesible desde tu entorno.

2.  **Clona el repositorio:**

    ```bash
    git clone [https://github.com/illiantech/DGI_carnet.git](https://github.com/illiantech/DGI_carnet.git)
    cd DGI_carnet
    ```

3.  **Configura el Backend (API):**

    - Navega a la carpeta de la API: `cd api`
    - Instala las dependencias: `npm install`
    - Crea un archivo `.env` en la raíz de la carpeta `api` con tu `MONGODB_URI` y `PORT` (ej. `PORT=3000`, `ROOT_DB=mongodb://localhost:27017/dgi`).
    - Inicia la API: `npm run dev`

4.  **Configura el Frontend (View):**
    - Regresa a la raíz del monorepo: `cd ../`
    - Navega a la carpeta del frontend: `cd view`
    - Instala las dependencias: `npm install`
    - Inicia la aplicación frontend: `npm run dev`

Ambas partes de la aplicación deberían estar ahora en funcionamiento. La API estará escuchando en el puerto configurado (por defecto `3000`), y el frontend se abrirá en tu navegador (por defecto `http://localhost:5173`).

## 🤝 Autor

- Daniel Pimentel - illianctech

## 📄 Licencia

Este proyecto está bajo la licencia \[Tipo de Licencia MIT\]. Consulta el archivo `LICENSE`.
