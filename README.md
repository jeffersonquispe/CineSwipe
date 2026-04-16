# CineSwipe

CineSwipe es una aplicación web de descubrimiento de películas construida con React, TypeScript y Vite.

## Tecnologías Principales

- **React 18**
- **TypeScript**
- **Vite** para un entorno de desarrollo rápido y la construcción del proyecto
- **Tailwind CSS** para los estilos y diseño responsive

## Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (se recomienda una versión LTS).

## Instalación

1. Clona el repositorio o abre el proyecto en tu entorno de desarrollo.
2. Abre una terminal en la raíz del proyecto.
3. Instala las dependencias usando tu gestor de paquetes preferido (ej. npm):

   ```bash
   npm install
   ```

## Comandos Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### `npm run dev`

Inicia el servidor de desarrollo local de Vite. La terminal te mostrará la URL local (usualmente `http://localhost:5173`) para ver la aplicación en el navegador.

### `npm run build`

Construye la aplicación para producción en la carpeta `dist`. Internamente ejecuta `tsc` para la verificación de tipos antes de empaquetar con Vite.

### `npm run lint`

Ejecuta ESLint para analizar el código en busca de posibles problemas o errores de estilo.

### `npm run preview`

Inicia un servidor web local para visualizar y probar la versión de producción generada por `npm run build`.

## Estructura Principal del Proyecto

- `src/`: Contiene el código fuente de la aplicación.
  - `pages/`: Aquí se encuentran las distintas pantallas, como `Discovery`.
  - `index.css`: Archivo de estilos globales donde se inicializa Tailwind.
- `vite.config.ts`: Archivo de configuración de Vite.
- `tailwind.config.js`: Archivo de configuración de Tailwind CSS.
- `package.json`: Definición de dependencias y scripts de Node.js.
