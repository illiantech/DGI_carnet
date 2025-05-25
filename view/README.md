# **![icono](https://raw.githubusercontent.com/illiantech/DGI_carnet/refs/heads/master/view/public/favicon-32x32.png) DGI Carnets**

DGI Carnets es una aplicación web frontend diseñada para optimizar la gestión de datos de usuarios en un centro gubernamental en San Juan de Los Morros, Guárico, Venezuela. Su propósito principal es facilitar a los operadores la búsqueda, filtrado, eliminación y actualización eficiente de información de usuarios ya existentes.

**NOTA:** Esta aplicación y los datos utilizados en ella son simulados para presentar el proyecto realizado en la empresa en cuestión (NO se ha expuesto los datos de ningún empleado que haya trabajado en la Dirección General de Informática del estado Guárico)

**IMPORTANTE:** Esta aplicación se centra exclusivamente en la administración de registros existentes y **no incluye funcionalidades para la creación de nuevos usuarios**.

## ✨ Características Principales

- **Gestión de Datos:** Permite la búsqueda, filtrado, eliminación y actualización de registros de usuarios.

- **Datos de Prueba Iniciales:** Al iniciar la aplicación, se precargan 4 registros de usuarios de prueba. Estos datos pueden ser manipulados localmente hasta que se realice una búsqueda que se conecte a una API externa.

- **Testing Robusto:** Incorpora pruebas unitarias y E2E para asegurar la fiabilidad y el correcto funcionamiento de las funcionalidades.

- **Mock Service Worker (MSW):** Utiliza MSW para interceptar y simular respuestas de la API, permitiendo un desarrollo y pruebas frontend independientes del backend.

- **Progressive Web App (PWA):** Ofrece una experiencia de usuario mejorada con capacidades offline y la posibilidad de ser instalada como una aplicación de escritorio o móvil.

- **Modo Oscuro:** Incluye una opción de modo oscuro para una mejor experiencia visual y adaptabilidad.

## 🚀 Tecnologías Utilizadas

- **Frontend:**

  - [React](https://react.dev/) (con Hooks)

  - JavaScript

  - HTML

  - CSS

- **Herramientas de Desarrollo y Testing:**

  - [Mock Service Worker (MSW)](https://mswjs.io/)

  - [Vitest](https://vitest.dev/) / [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

  - [ESLint](https://eslint.org/)

  - [Prettier](https://prettier.io/)

## 📁 Estructura del Proyecto

```
.
├── view
├── public
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── user-childrens
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
│   ├── css
│   │   ├── config
│   │   │   ├── Normalize.css
│   │   │   └── template.css
│   │   ├── modules
│   │   │   ├── wrapper-user
│   │   │   │   ├── button_wrapper.css
│   │   │   │   ├── descrip_wrapper.css
│   │   │   │   └── user_data_wrapper.css
│   │   │   ├── btn_dinamics.css
│   │   │   ├── delete_alert.css
│   │   │   ├── form.css
│   │   │   ├── load_user.css
│   │   │   ├── user.css
│   │   │   └── user_check.css
│   ├── hooks
│   │   ├── controlUsers.js
│   │   ├── lazyUser.js
│   │   ├── observerUser.js
│   │   ├── useBlackMode.js
│   │   ├── useForm.js
│   │   ├── useSEO.js
│   │   ├── userCheck.js
│   │   ├── userDelete.js
│   │   └── userDescrip.js
│   ├── resources
│   │   ├── consts.js
│   │   ├── mapping.js
│   │   └── querys.js
│   ├── tests
│   │   ├── mocks
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
└── package.json
```

## ⚙️ Instalación

Para poner en marcha el proyecto DGI Carnets en tu entorno de desarrollo local, sigue estos pasos:

1. **Clona el repositorio:**

   ```
   git clone https://github.com/illiantech/DGI_carnet.git

   cd view # Asegúrate de navegar a la carpeta de la view
   ```

2. **Instala las dependencias:**

   ```
   npm install
   ```

3. **Inicia la aplicación en modo desarrollo:**

   ```
   npm run dev
   ```

   La aplicación se abrirá automáticamente en tu navegador en `http://localhost:5173` (o un puerto similar).

## 💡 Uso

Al iniciar la aplicación, verás una tabla con 4 registros de usuarios de prueba precargados. Puedes interactuar con estos datos localmente (editarlos, actualizarlos y eliminarlos) para probar las funcionalidades sin necesidad de una conexión a una API.

Para realizar una búsqueda de usuarios que se conectará a una API externa, utiliza el campo de búsqueda en la parte superior. Las funcionalidades de filtrado y actualización se activarán a partir de los resultados obtenidos de esta búsqueda.

## 🧪 Testing

Para ejecutar las pruebas del proyecto (unitarias y E2E), utiliza el siguiente comando:

```
npm run test
```

## 🌐 Mock Service Worker (MSW)

Este proyecto utiliza [Mock Service Worker (MSW)](https://mswjs.io/) para interceptar las solicitudes de red y simular respuestas de la API. Esto es fundamental para el desarrollo frontend, ya que permite trabajar en la interfaz de usuario de forma independiente del backend, facilitando las pruebas y el desarrollo sin la necesidad de una conexión real a la API. Los mocks están configurados en `src/tests/mocks/`.

## 📱 Progressive Web App (PWA)

DGI Carnets está configurada como una Progressive Web App (PWA), lo que significa que puedes instalarla directamente desde tu navegador como una aplicación en tu dispositivo (escritorio o móvil). Esto proporciona una experiencia de usuario más rápida y confiable, con capacidades offline mejoradas.

## ⚠️ Consideraciones Importantes

- **No Creación de Usuarios:** Es crucial entender que esta aplicación está diseñada **únicamente para la gestión de usuarios existentes** (búsqueda, filtrado, actualización y eliminación). No existe funcionalidad para crear nuevos registros de usuarios.

- **Conexión a API Externa:** La funcionalidad de búsqueda se conecta a una API externa para obtener los datos de los usuarios. Los detalles específicos de esta API y su configuración (endpoints, autenticación, etc.) no se encuentras en esta parte del repositorio (para mas información de api acceder a `DGI_carnet/api/`.).

## 🤝 Autor

- Daniel Pimentel - illianctech

## 📄 Licencia

Este proyecto está bajo la licencia \[Tipo de Licencia MIT\]. Consulta el archivo `LICENSE` en la raíz del repositorio para más detalles.
