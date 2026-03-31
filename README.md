# NovaShop - Plataforma E-commerce

Una plataforma web de e-commerce simplificada y enfocada en el frontend, construida con Nuxt 3 y un sistema de diseño propio basado en Vanilla CSS (Glassmorphism).

## Instalación y Ejecución

Sigue estos pasos para instalar y ejecutar el proyecto localmente.

### Requisitos previos
- Node.js (v18+)
- npm (v9+)

### Pasos de Instalación
1. Clona el repositorio o navega hasta el directorio del proyecto:
   ```bash
   cd ecommerce-nuxt
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

### Ejecución
Para iniciar el servidor de desarrollo en local:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

Para compilar la versión de producción:
```bash
npm run build
```

## 🏗 Arquitectura

El proyecto sigue la estructura estándar y recomendada de Nuxt 3, la cual promueve el auto-enrutamiento y el auto-descubrimiento de componentes:

- **`/app/` (o raíz del proyecto)**: Contiene `app.vue` como el punto de entrada principal.
- **`/pages/`**: Contiene la estructura de enrutamiento. Al usar `NuxtPage`, Nuxt genera automáticamente las rutas:
  - `/` (Home con productos destacados)
  - `/products` (Catálogo completo de productos)
  - `/products/[id]` (Vista detallada de un producto específico)
  - `/cart` (Carrito de compras y flujo de checkout)
  - `/orders` (Historial de órdenes)
- **`/components/`**: Componentes reutilizables (`AppHeader`, `AppFooter`, `ProductCard`). Son auto-importados por Nuxt, lo que garantiza un código limpio sin declaraciones `import` excesivas.
- **`/stores/`**: Gestión de estado global usando Pinia (`cart.ts` y `orders.ts`).
- **`/assets/css/`**: Sistema de diseño Vanilla CSS (`main.css`) cargado globalmente a través de `nuxt.config.ts`.
- **`/types/`**: Interfaces de TypeScript para garantizar una fácil mantención e inferencia de tipos estricta en todo momento.

## Decisiones Técnicas

1. **Framework (Nuxt 3)**: Elegido por su excelente Developer Experience (DX), potente enrutamiento basado en archivos (Pages), capacidades completas de Server Side Rendering (SSR) y auto-importaciones de componentes/composables nativos como `useFetch`.
2. **Estilado (Vanilla CSS + Variables + Glassmorphism)**: Para cumplir con los requerimientos estéticos premium sin depender de utilidades como TailwindCSS. Se implementaron propiedades personalizadas de CSS (`:root`), soporte automático para temas oscuros (`@media (prefers-color-scheme: dark)`), y utilidades flex/grid reutilizables que hacen la mantenibilidad mucho más sencilla.
3. **Gestor de Estado (Pinia)**: El estándar defacto de Vue 3. Se utilizó de forma limpia para separar la lógica de negocio (lógica del carrito, creación de órdenes) de los componentes de UI. Se incorporó persistencia local simulada (en localStorage) dentro de las acciones de la Store.
4. **Consumo de API (Fake Store API)**: Proveedor primario de datos (`fakestoreapi.com`). Se utilizó `useFetch` para un manejo eficaz basado en SSR, logrando que los datos se infieran desde el pipeline de renderizado y las pantallas de carga (Skeletons) se muestren adecuadamente.
5. **Tipado Estricto (TypeScript)**: El tipo `Product`, `Order`, e `Item` se tiparon expresamente para proveer autocompletado y prevenir errores de asignación.
6. **Integración Continua (CI)**: Se incluyó un pipeline automatizado simple a través de GitHub Actions (`.github/workflows/ci.yml`) que instala dependencias y compila la aplicación en la nube para garantizar que ninguna confirmación rompa la estructura de compilación.

