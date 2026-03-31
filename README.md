# 🛍️ NovaShop — Plataforma E-commerce

Una plataforma web de e-commerce simplificada y enfocada en el frontend, construida con **Nuxt 3**, **Pinia**, **TypeScript** y un sistema de diseño propio basado en **Vanilla CSS** con estética Glassmorphism.

> Consume datos de [Fake Store API](https://fakestoreapi.com) para catálogo de productos.

---

## ✨ Características

- 📦 **Catálogo de productos** con filtrado responsivo (botones y `<select>`)
- 🛒 **Carrito de compras** completo (agregar, actualizar cantidad, eliminar)
- 📋 **Historial de órdenes** y carrito con **persistencia** en `localStorage`
- 🛡️ **Arquitectura de Resiliencia** (Proxy API con Fallback dinámico a Mock Data)
- ⏳ **UX Premium de carga** (Skeleton Cards interactivos y animaciones de Spinner)
- 🔔 **Notificaciones toast** animadas (éxito, error, info)
- 📱 **Diseño 100% responsive** (mobile-first)
- 🎨 **Glassmorphism UI** con tema oscuro, gradientes y micro-animaciones
- ⚡ **SSR** con `useFetch` y evasión estructurada de Hydration Mismatches
- 🔍 **SEO-friendly** gracias al Server Side Rendering de Nuxt

---

## 🚀 Instalación y Ejecución

### Requisitos previos

- Node.js (v18+)
- npm (v9+)

### Pasos de Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DanyEscobar/ecommerce-nuxt.git
   cd ecommerce-nuxt
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

### Ejecución

Servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

Compilar para producción:
```bash
npm run build
npm run preview
```

---

## 🏗️ Arquitectura del Proyecto

```
ecommerce-nuxt/
├── app/
│   ├── app.vue                   # Punto de entrada principal
│   ├── assets/css/main.css       # Sistema de diseño global (Vanilla CSS)
│   ├── components/
│   │   ├── AppHeader.vue         # Navegación responsiva con menú hamburguesa
│   │   ├── AppFooter.vue         # Pie de página
│   │   ├── AppSpinner.vue        # Loader y spinner animado en CSS
│   │   ├── ProductCard.vue       # Tarjeta de producto reutilizable
│   │   ├── ProductCardSkeleton.vue # Cargador esqueleto con efecto Shimmer
│   │   └── ToastNotifications.vue # Sistema de notificaciones toast
│   ├── composables/
│   │   └── useToast.ts           # Composable global para notificaciones
│   ├── layouts/
│   │   └── default.vue           # Layout principal (header + footer)
│   ├── pages/
│   │   ├── index.vue             # Home — productos destacados
│   │   ├── products/
│   │   │   ├── index.vue         # Catálogo completo con filtros
│   │   │   └── [id].vue          # Detalle de producto
│   │   ├── cart.vue              # Carrito de compras + checkout
│   │   └── orders.vue            # Historial de órdenes
│   ├── stores/
│   │   ├── cart.ts               # Store Pinia — carrito
│   │   └── orders.ts             # Store Pinia — órdenes
│   └── types/
│       └── index.ts              # Interfaces TypeScript (Product, Order, etc.)
├── server/
│   ├── api/
│   │   └── products/             # Rutas Proxy API (Endpoints Nitro backend)
│   └── utils/
│       └── mockData.ts           # Catálogo Mock JSON de respaldo (Fallback)
├── .github/workflows/ci.yml      # Pipeline CI (GitHub Actions)
├── nuxt.config.ts                 # Configuración de Nuxt
├── package.json
└── tsconfig.json
```

---

## 🛣️ Rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Productos destacados con hero section |
| `/products` | Catálogo | Lista completa con filtros por categoría |
| `/products/:id` | Detalle | Info del producto, selector de cantidad, agregar al carrito |
| `/cart` | Carrito | Items, cantidades, resumen de orden, checkout |
| `/orders` | Órdenes | Historial de compras realizadas |

---

## 🧰 Stack Tecnológico

| Tecnología | Propósito |
|------------|-----------|
| **Nuxt 3** | Framework fullstack con SSR y enrutamiento basado en archivos |
| **Vue 3** | Composition API con `<script setup>` |
| **Pinia** | Gestión de estado global |
| **TypeScript** | Tipado estricto en stores, composables y componentes |
| **Vanilla CSS** | Sistema de diseño propio con variables CSS y utilidades |
| **Lucide Icons** | Iconografía SVG ligera |
| **ESLint** | Linting y formateo de código |
| **GitHub Actions** | CI — instalación y compilación automatizada |

---

## 📐 Decisiones Técnicas

1. **Framework (Nuxt 3):** Elegido por su DX, enrutamiento basado en archivos, SSR nativo y auto-importaciones de componentes/composables.

2. **Estilado (Vanilla CSS + Glassmorphism):** Sistema de diseño propio sin dependencia de utilidades como TailwindCSS. Variables CSS en `:root`, tema oscuro, utilidades flex/grid reutilizables y efectos `backdrop-filter`.

3. **Pinia:** Estándar de facto de Vue 3 para estado global. Separa la lógica de negocio (carrito, órdenes) de los componentes UI. Persistencia local simulada en `localStorage` en ambos stores (cart/orders), envuelta en tags `<ClientOnly>` para evitar errores de *Hydration Mismatch* nativos en SSR.

4. **API Proxy & Resiliencia (Mock Fallback):** Se crearon rutas API nativas de backend (`/server/api`) desde Nitro. Estos actúan como un BFF (Backend-For-Frontend). Al solicitar datos, intentan consultar la *Fake Store API* e interceptan errores de conexión. Si la API falla, aplican un retraso simulado (300ms) para renderizar los *Skeletons Loaders* y despliegan la información estática documentada en el `JSON Mock` de respaldo. Esto garantiza que el evaluador pueda compilar el código sin errores de red en todo momento.

5. **TypeScript estricto:** Interfaces `Product`, `Order` y `CartItem` tipadas explícitamente para autocompletado y prevención de errores.

6. **Toast Notifications:** Composable global (`useToast`) con componente `ToastNotifications` montado en `app.vue`. Animaciones CSS con `TransitionGroup` para feedback visual al usuario.

7. **Responsive Design:** Enfoque mobile-first con breakpoints progresivos (480px → 640px → 992px). Layouts que se adaptan de stack vertical a grid multi-columna.

8. **CI/CD:** Pipeline de GitHub Actions que realiza la instalación de dependencias (`npm install`), validación de tipos, compilación de la app (`npm run build`), **versionado automático** (extrayendo la versión de `package.json`) y un **deploy simulado** para garantizar la estabilidad del build en cada push.

---

## 📜 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo (http://localhost:3000)
npm run build      # Compilar para producción
npm run preview    # Previsualizar build de producción
npm run generate   # Generar sitio estático
```

---

## 📄 Licencia

Este proyecto es de uso educativo y demostrativo.
