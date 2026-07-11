# JSPV — Portal Institucional de Joves Socialistes del País Valencià

Portal institucional oficial de **Joves Socialistes del País Valencià (JSPV)**, la organización juvenil del socialismo valenciano. Completamente bilingüe (valencià / castellano), diseñado como SPA (Single Page Application) con un backend Express que actúa como proxy seguro para APIs externas.

---

## Índice

1. [Descripción del proyecto](#1-descripción-del-proyecto)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Estructura del monorepo](#3-estructura-del-monorepo)
4. [Requisitos previos — Mac M1 (Apple Silicon)](#4-requisitos-previos--mac-m1-apple-silicon)
5. [Instalación paso a paso](#5-instalación-paso-a-paso)
6. [Variables de entorno](#6-variables-de-entorno)
7. [Ejecución en desarrollo](#7-ejecución-en-desarrollo)
8. [Build de producción](#8-build-de-producción)
9. [Arquitectura del frontend](#9-arquitectura-del-frontend)
10. [Páginas y rutas](#10-páginas-y-rutas)
11. [Componentes](#11-componentes)
12. [Sistema de internacionalización (i18n)](#12-sistema-de-internacionalización-i18n)
13. [API Server](#13-api-server)
14. [Datos estáticos](#14-datos-estáticos)
15. [Estilos y sistema de diseño](#15-estilos-y-sistema-de-diseño)
16. [Errores frecuentes y soluciones](#16-errores-frecuentes-y-soluciones)
17. [Despliegue en producción](#17-despliegue-en-producción)

---

## 1. Descripción del proyecto

JSPV es un portal institucional multipágina que incluye:

- **Página de inicio** con héroe animado, ticker de Instagram (scroll infinito), ticker de tweets y sección de campañas destacadas.
- **Actualitat** — sala de prensa con noticias, comunicados y agenda pública.
- **Nosaltres** — sección "Quiénes somos" con Historia, Valores, el equipo de la Comissió Executiva Nacional, y el mapa de comarcas del País Valencià.
- **En les Institucions** — presencia institucional de JSPV.
- **Campanyes** — campañas políticas activas con argumentarios descargables.
- **Transparència** — documentación pública de la organización.
- **Afilia't** — enlace externo al formulario de afiliación.

El proyecto es un **monorepo pnpm** con tres artefactos ejecutables independientes y varias librerías compartidas.

---

## 2. Stack tecnológico

### Frontend (`artifacts/jspv`)

| Tecnología | Versión | Rol |
|---|---|---|
| **React** | 19.1.0 | UI library |
| **Vite** | ^7.3 | Bundler y servidor de desarrollo |
| **TypeScript** | ^5.9 | Tipado estático |
| **Tailwind CSS** | ^4.1 | Utilidades CSS |
| **wouter** | ^3.3 | Enrutador SPA ligero (alternativa a React Router) |
| **Framer Motion** | ^12 | Animaciones de entrada (componente `Reveal`) |
| **TanStack Query** | ^5.90 | Caché de peticiones asíncronas |
| **Radix UI** | varios | Componentes accesibles sin estilos |
| **lucide-react** | ^0.545 | Iconografía |
| **react-icons** | — | Iconos de marcas (Instagram, Twitter/X) |
| **class-variance-authority** | ^0.7 | Variantes de componentes tipadas |

### Backend (`artifacts/api-server`)

| Tecnología | Versión | Rol |
|---|---|---|
| **Node.js** | 24 LTS | Runtime |
| **Express** | ^5 | Framework HTTP |
| **Pino** | — | Logging estructurado |
| **Zod** | ^3.25 | Validación de esquemas |
| **Drizzle ORM** | ^0.45 | ORM para PostgreSQL (preparado para futuras tablas) |

### Tooling del monorepo

| Herramienta | Rol |
|---|---|
| **pnpm** | Gestor de paquetes con workspaces |
| **tsx** | Ejecución directa de TypeScript en Node.js |
| **Orval** | Generación de código cliente desde OpenAPI spec |

---

## 3. Estructura del monorepo

```
workspace/
├── artifacts/
│   ├── jspv/                    # Frontend principal (React SPA)
│   │   ├── src/
│   │   │   ├── assets/          # Imágenes y logos locales
│   │   │   ├── components/      # Componentes reutilizables
│   │   │   │   ├── ui/          # Componentes base (Button, Badge, Card…)
│   │   │   │   ├── layout/      # Header, Footer, Layout, Breadcrumbs
│   │   │   │   ├── HeroBanner.tsx
│   │   │   │   ├── InstagramFeed.tsx
│   │   │   │   ├── TweetTicker.tsx
│   │   │   │   ├── Reveal.tsx
│   │   │   │   ├── ValenciaMap.tsx
│   │   │   │   └── SectionHeading.tsx
│   │   │   ├── data/
│   │   │   │   └── content.ts   # Fuente de verdad de todos los datos estáticos
│   │   │   ├── i18n/
│   │   │   │   ├── ca.ts        # Traducciones en valencià (idioma por defecto)
│   │   │   │   ├── es.ts        # Traducciones en castellano
│   │   │   │   ├── context.tsx  # Provider y hook useT()
│   │   │   │   └── index.ts     # Re-exports
│   │   │   ├── lib/
│   │   │   │   ├── seo.ts       # Hook useSEO() para meta tags
│   │   │   │   └── utils.ts     # cn() y helpers
│   │   │   ├── pages/           # Una página por ruta
│   │   │   │   ├── Inicio.tsx
│   │   │   │   ├── Actualitat.tsx
│   │   │   │   ├── NewsDetail.tsx
│   │   │   │   ├── Comunicats.tsx
│   │   │   │   ├── Equip.tsx
│   │   │   │   ├── Historia.tsx
│   │   │   │   ├── Valors.tsx
│   │   │   │   ├── OnEstem.tsx
│   │   │   │   ├── Institucions.tsx
│   │   │   │   ├── Campanyes.tsx
│   │   │   │   ├── Transparencia.tsx
│   │   │   │   ├── Afiliat.tsx
│   │   │   │   ├── Contacte.tsx
│   │   │   │   ├── Partit.tsx
│   │   │   │   ├── not-found.tsx
│   │   │   │   └── campaigns/
│   │   │   │       ├── Habitatge.tsx
│   │   │   │       └── GeneracioDeFerro.tsx
│   │   │   ├── App.tsx          # Enrutador principal (wouter)
│   │   │   ├── index.css        # Estilos globales + tokens de diseño
│   │   │   └── main.tsx         # Punto de entrada React
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.ts   # (si existe; v4 usa @theme en CSS)
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── api-server/              # Backend Express
│   │   ├── src/
│   │   │   ├── app.ts           # Configuración Express (CORS, rutas)
│   │   │   ├── index.ts         # Arranque del servidor
│   │   │   ├── routes/
│   │   │   │   ├── health.ts    # GET /api/healthz
│   │   │   │   ├── instagram.ts # GET /api/instagram
│   │   │   │   └── index.ts     # Registro de rutas
│   │   │   └── lib/
│   │   │       └── logger.ts    # Instancia Pino
│   │   └── package.json
│   │
│   └── mockup-sandbox/          # Servidor Vite para prototipos de UI
│
├── lib/
│   ├── api-spec/                # openapi.yaml — contrato entre front y back
│   ├── api-zod/                 # Esquemas Zod generados desde la spec
│   ├── api-client-react/        # Hooks TanStack Query generados con Orval
│   └── db/                      # Drizzle ORM: schema PostgreSQL
│
├── scripts/                     # Utilidades de workspace
├── attached_assets/             # Imágenes externas / adjuntos
├── pnpm-workspace.yaml          # Configuración del monorepo
└── README.md
```

---

## 4. Requisitos previos — Mac M1 (Apple Silicon)

### 4.1 Node.js

Se requiere **Node.js 20 LTS o superior**. En Mac M1 se recomienda instalar via [nvm](https://github.com/nvm-sh/nvm):

```bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Recargar el shell
source ~/.zshrc   # o ~/.bashrc

# Instalar Node.js 20 LTS (native arm64)
nvm install 20
nvm use 20
nvm alias default 20

# Verificar arquitectura — debe mostrar "arm64"
node -e "console.log(process.arch)"
```

> **Importante:** Si Node.js fue instalado a través de Homebrew o de un paquete `.pkg` para Intel (x86_64), algunos módulos nativos compilarán para la arquitectura incorrecta. Usa siempre nvm en Mac M1.

### 4.2 pnpm

```bash
# Instalar pnpm globalmente
npm install -g pnpm@10

# Verificar
pnpm --version   # debe ser 10.x
```

### 4.3 Git

```bash
# Homebrew (recomendado)
brew install git

# Verificar
git --version
```

### 4.4 PostgreSQL (opcional)

El API server está preparado para PostgreSQL mediante Drizzle ORM, pero las funcionalidades actuales (Instagram proxy) no requieren base de datos. Si en el futuro se activan tablas:

```bash
brew install postgresql@16
brew services start postgresql@16
```

---

## 5. Instalación paso a paso

### 5.1 Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

### 5.2 Instalar dependencias

```bash
pnpm install
```

pnpm descargará automáticamente los binarios nativos correctos para `darwin-arm64` (Mac M1). El archivo `pnpm-workspace.yaml` ya excluye plataformas no necesarias (Windows, FreeBSD, etc.) pero mantiene las entradas `darwin-arm64` y `darwin-x64`.

> **Si ves errores de binarios nativos** durante el install, asegúrate de que Node.js es native arm64 (ver sección 4.1) y ejecuta:
> ```bash
> pnpm store prune && pnpm install
> ```

### 5.3 Crear el archivo de variables de entorno

```bash
cp .env.example .env   # si existe, o créalo manualmente
```

Ver la sección [Variables de entorno](#6-variables-de-entorno) para el contenido completo.

---

## 6. Variables de entorno

El proyecto usa variables de entorno separadas por artefacto. Cada proceso las lee en tiempo de ejecución — **nunca** se hardcodean en el código.

### Frontend (`artifacts/jspv`)

| Variable | Obligatoria | Descripción |
|---|---|---|
| `PORT` | Sí | Puerto en el que Vite escucha (ej. `3000`) |
| `BASE_PATH` | Sí | Ruta base de la app (normalmente `/` en local) |

### API Server (`artifacts/api-server`)

| Variable | Obligatoria | Descripción |
|---|---|---|
| `PORT` | Sí | Puerto del servidor Express (ej. `3001`) |
| `INSTAGRAM_TOKEN` | No | Token de la Instagram Graph API para mostrar posts reales |
| `DATABASE_URL` | No | Cadena de conexión PostgreSQL (`postgres://user:pass@host/db`) |

### Ejemplo de `.env` para desarrollo local en Mac M1

Crea un archivo `.env` en la raíz del workspace:

```bash
# Frontend
PORT=3000
BASE_PATH=/

# API Server (en un segundo terminal o proceso separado)
# PORT=3001    <-- se pasa directamente al comando, no en .env compartido
INSTAGRAM_TOKEN=         # dejar vacío para usar placeholders
DATABASE_URL=            # dejar vacío si no usas PostgreSQL
```

> **Nota sobre `INSTAGRAM_TOKEN`:** Sin token, el componente `InstagramFeed` muestra placeholders rojos con el icono de Instagram. Para obtener un token real, crea una app en [developers.facebook.com](https://developers.facebook.com), añade el producto "Instagram Basic Display API" y genera un token de larga duración.

---

## 7. Ejecución en desarrollo

Necesitarás **dos terminales** simultáneos, uno por artefacto.

### Terminal 1 — API Server

```bash
PORT=3001 pnpm --filter @workspace/api-server run dev
```

El servidor arranca en `http://localhost:3001`. Puedes verificar que funciona:

```bash
curl http://localhost:3001/api/healthz
# → {"ok":true}
```

### Terminal 2 — Frontend

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/jspv run dev
```

Vite arrancará en `http://localhost:3000` con HMR (Hot Module Replacement) activo.

> **Proxy del frontend hacia la API:** En desarrollo, el frontend hace peticiones a `/api/*`. Para que lleguen al API server en el puerto 3001, añade la siguiente configuración proxy a `artifacts/jspv/vite.config.ts` si desarrollas localmente sin un proxy de red:
>
> ```ts
> server: {
>   port,
>   proxy: {
>     '/api': {
>       target: 'http://localhost:3001',
>       changeOrigin: true,
>     },
>   },
> },
> ```

### Terminal único con pnpm (alternativa)

Si tienes `concurrently` o similar:

```bash
npx concurrently \
  "PORT=3001 pnpm --filter @workspace/api-server run dev" \
  "PORT=3000 BASE_PATH=/ pnpm --filter @workspace/jspv run dev"
```

---

## 8. Build de producción

### Frontend

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/jspv run build
```

El output se genera en `artifacts/jspv/dist/public/`. Contiene HTML estático + assets optimizados. Puede servirse con cualquier servidor estático (Nginx, Caddy, Apache, etc.).

### API Server

```bash
pnpm --filter @workspace/api-server run build   # si existe script de build
# o directamente con tsx en producción:
PORT=3001 node --import tsx/esm artifacts/api-server/src/index.ts
```

---

## 9. Arquitectura del frontend

### 9.1 Enrutador — wouter

El proyecto usa [wouter](https://github.com/molefrog/wouter) en lugar de React Router. Es un enrutador de ~2 KB sin dependencias que expone una API casi idéntica.

```tsx
// App.tsx (simplificado)
import { Switch, Route } from "wouter";

<Switch>
  <Route path="/" component={Inicio} />
  <Route path="/actualitat" component={Actualitat} />
  <Route path="/actualitat/:slug" component={NewsDetail} />
  {/* ... */}
</Switch>
```

**Diferencias clave con React Router:**
- Se usa `<Link href="...">` en lugar de `<Link to="...">`.
- No existe `<BrowserRouter>` — wouter lo detecta automáticamente.
- La navegación programática se hace con el hook `useLocation`.

### 9.2 Flujo de datos

```
content.ts (datos estáticos)
       ↓
  Páginas (pages/)
       ↓
  Componentes (components/)
       ↑
  i18n/context.tsx → useT() hook
       ↑
  LanguageProvider (en App.tsx)
```

El grueso de los datos (noticias, miembros del equipo, campañas, agenda) vive en `src/data/content.ts` como arrays de objetos TypeScript tipados. No hay llamadas a base de datos en el frontend — todo es estático excepto el feed de Instagram.

### 9.3 Animaciones — Reveal

El componente `<Reveal>` envuelve cualquier elemento para animarlo cuando entra en el viewport:

```tsx
import { Reveal } from "@/components/Reveal";

<Reveal delay={100}>
  <h2>Título que aparece al hacer scroll</h2>
</Reveal>
```

Internamente usa `framer-motion` con un `IntersectionObserver`. El estado inicial (`opacity: 0`, `translateY: 18px`) se aplica en JavaScript en el mount para ser invisible por defecto — los crawlers y usuarios sin JS ven el contenido normalmente.

---

## 10. Páginas y rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Inicio.tsx` | Landing page principal |
| `/actualitat` | `Actualitat.tsx` | Noticias con filtro por categoría |
| `/actualitat/:slug` | `NewsDetail.tsx` | Artículo individual |
| `/comunicats` | `Comunicats.tsx` | Sala de comunicados de prensa |
| `/nosaltres` | `Partit.tsx` | Submenú "Nosaltres" |
| `/nosaltres/historia` | `Historia.tsx` | Historia de JSPV |
| `/nosaltres/valors` | `Valors.tsx` | Valores y principios |
| `/nosaltres/equip` | `Equip.tsx` | Comissió Executiva Nacional |
| `/nosaltres/on-estem` | `OnEstem.tsx` | Mapa comarcal + federaciones |
| `/institucions` | `Institucions.tsx` | Presencia institucional |
| `/campanyes` | `Campanyes.tsx` | Listado de campañas |
| `/campanyes/habitatge-es-un-dret` | `Habitatge.tsx` | Campaña vivienda |
| `/campanyes/generacio-de-ferro` | `GeneracioDeFerro.tsx` | Campaña DANA |
| `/transparencia` | `Transparencia.tsx` | Documentación pública |
| `/afiliat` | `Afiliat.tsx` | Información de afiliación |
| `/contacte` | `Contacte.tsx` | Datos de contacto |

### Página de inicio (`Inicio.tsx`) — secciones en orden

1. **HeroBanner** — carrusel de diapositivas con texto animado y fondo oscuro.
2. **InstagramFeed** — ticker horizontal infinito con los últimos posts de Instagram.
3. **Actualitat** — últimas noticias con thumbnails y agenda pública.
4. **TweetTicker** — scroll infinito de tweets de `@JSPV_oficial`.
5. **Campanyes destacades** — dos campañas principales en cards grandes.
6. **Aliances** — logos de organizaciones aliadas (JSE, PSPV-PSOE).
7. **Footer** — links, contacto, redes sociales y legal.

### Página Equip (`Equip.tsx`) — estructura

- **SecGenFeature** — Card destacada para el Secretari General.
- **MemberTile** — Grid de 4 columnas (lg), 3 columnas (md), 2 columnas (sm) con foto a sangre y panel deslizante rojo al hacer clic que muestra la biografía.

---

## 11. Componentes

### 11.1 Layout

#### `Header.tsx`

Barra de navegación con:
- Logo JSPV (SVG + texto, altura 80px).
- Menú de navegación con desplegables ("Nosaltres", "Actualitat").
- Selector de idioma CA / ES.
- Botón "Afilia't" → enlace externo a `https://www.jse.org/afiliacion-online-jse/`.
- Versión móvil con menú hamburguesa.

**Todos los botones "Afilia't" son `<a target="_blank">`, nunca `<Link>`** — apuntan al formulario externo de la JSE.

#### `Footer.tsx`

Pie de página con:
- Logo y descripción breve.
- Links a secciones principales.
- Datos de contacto: `organitzaciojspv@gmail.com`.
- Links a redes sociales.
- Aviso legal y créditos.

#### `Layout.tsx`

Wrapper que compone `Header + <main> + Footer` y acepta `crumbs` para el breadcrumb.

### 11.2 Componentes de página

#### `HeroBanner.tsx`

Carrusel de slides con:
- Texto tipográfico grande en Barlow Condensed.
- Fondo oscuro semitransparente sobre imagen fotográfica.
- Navegación por flechas y dots.
- Auto-avance cada 5 segundos.

#### `InstagramFeed.tsx`

Ticker horizontal infinito:
- Petición a `/api/instagram` al montar el componente.
- Si hay token: muestra hasta 10 posts reales como tiles cuadradas de 192×192 px.
- Si no hay token o la API falla: muestra 10 placeholders rojos.
- Animación CSS `ig-ticker-track` (35 segundos/ciclo).
- Gradiente de fade en los bordes izquierdo y derecho.
- Pausa al hacer hover.

#### `TweetTicker.tsx`

Ticker horizontal infinito de tweets:
- Datos estáticos (10 tweets hardcodeados de `@JSPV_oficial`).
- Tarjetas de 320 px de ancho con avatar, texto, fecha y engagement.
- Animación CSS `tweet-ticker-track` (40 segundos/ciclo).
- Gradiente de fade en los bordes.
- Pausa al hacer hover.
- Cada tarjeta enlaza al perfil de Twitter/X.

> Para conectar tweets reales, sustituye el array `TWEETS` en `TweetTicker.tsx` por una llamada a la API de Twitter/X v2 desde el API server.

#### `ValenciaMap.tsx`

Mapa SVG puro del País Valencià con todas las comarcas:
- Sin librerías de mapas (no react-leaflet, no Mapbox).
- Proyección Mercator ajustada manualmente a `viewBox="0 0 290 520"`.
- Sin fondo — se integra sobre cualquier color de sección.
- Responsivo con `max-w-[380px]`.

#### `Reveal.tsx`

Wrapper de animación de entrada basado en `framer-motion`:
- Props: `delay` (ms), `className`, cualquier prop HTML válida.
- Usa `IntersectionObserver` internamente.
- El elemento es visible antes de montar React (SSR/SEO safe).

#### `SectionHeading.tsx`

Expone `PageHero` — bloque de cabecera de página con:
- Etiqueta de sección en rojo (uppercase tracking).
- Título en Barlow Condensed ExtraBold.
- Subtítulo opcional.
- Imagen de fondo oscurecida.

### 11.3 Componentes UI (`components/ui/`)

Basados en [shadcn/ui](https://ui.shadcn.com/) con Radix UI primitives. Incluyen:

| Componente | Descripción |
|---|---|
| `Button` | Botón con variantes: default, destructive, outline, secondary, ghost, link |
| `Badge` | Etiqueta con variantes: default, secondary, destructive, outline |
| `Card` | Contenedor con Card, CardHeader, CardContent, CardFooter |
| `Dialog` | Modal accesible (Radix Dialog) |
| `Accordion` | Acordeón expandible (Radix Accordion) |
| `Tabs` | Pestañas (Radix Tabs) |
| `Input` / `Textarea` | Campos de formulario estilizados |
| `Select` | Desplegable accesible (Radix Select) |
| `Tooltip` | Tooltip (Radix Tooltip) |
| `Skeleton` | Placeholder de carga |
| `Separator` | Línea divisoria |

---

## 12. Sistema de internacionalización (i18n)

### 12.1 Estructura

```
src/i18n/
├── ca.ts        # Valenciano (idioma por defecto)
├── es.ts        # Castellano
├── context.tsx  # LanguageProvider + useT() hook
└── index.ts     # Re-exports
```

### 12.2 Cómo funciona

`ca.ts` exporta el tipo `Translations` con todas las claves. `es.ts` importa ese tipo y debe implementarlo completo — TypeScript falla en compilación si falta alguna clave.

```ts
// ca.ts
export type Translations = {
  nav: { nosaltres: string; actualitat: string; /* ... */ };
  equip: { title: string; subtitle: string; /* ... */ };
  // ...
};

const ca: Translations = { /* ... */ };
export default ca;
```

```ts
// es.ts
import type { Translations } from "./ca";
const es: Translations = { /* ... */ };
export default es;
```

### 12.3 Uso en componentes

```tsx
import { useT } from "@/i18n/context";

function MiComponente() {
  const { t, lang } = useT();

  return (
    <h1>{t.equip.title}</h1>  // usa la traducción del idioma activo
  );
}
```

El hook `useT()` devuelve:
- `t` — objeto de traducciones del idioma activo.
- `lang` — `"ca"` o `"es"`.
- `setLang` — función para cambiar el idioma (persiste en `localStorage`).

### 12.4 Añadir una clave nueva

1. Añadir la clave en `ca.ts` con el valor en valencià.
2. Añadir la misma clave en `es.ts` con el valor en castellano.
3. TypeScript verificará automáticamente que ambos archivos estén sincronizados.

---

## 13. API Server

### 13.1 Endpoints disponibles

#### `GET /api/healthz`

```json
{ "ok": true }
```

Endpoint de health check para monitoring y load balancers.

#### `GET /api/instagram`

Devuelve los últimos posts de Instagram de la organización.

**Con `INSTAGRAM_TOKEN` configurado:**
```json
{
  "posts": [
    {
      "id": "17854360229135492",
      "thumbnail": "https://cdn.instagram.com/...",
      "permalink": "https://www.instagram.com/p/...",
      "caption": "Texto del post...",
      "timestamp": "2026-07-01T12:00:00Z",
      "mediaType": "IMAGE"
    }
  ]
}
```

**Sin token:**
```json
{ "posts": [], "source": "no_token" }
```

El servidor implementa una **caché en memoria de 15 minutos** para evitar rate-limiting de la Instagram Graph API.

### 13.2 Configuración CORS

El API server permite peticiones desde `localhost` en desarrollo. Para producción, ajusta los orígenes permitidos en `artifacts/api-server/src/app.ts`.

### 13.3 Añadir un nuevo endpoint

1. Crear el archivo de ruta en `artifacts/api-server/src/routes/nuevo.ts`.
2. Registrarlo en `artifacts/api-server/src/routes/index.ts`.
3. Si la ruta necesita ser usada desde el frontend con tipos generados, añadirla al esquema OpenAPI en `lib/api-spec/openapi.yaml` y regenerar:

```bash
pnpm --filter @workspace/api-client-react run generate
```

---

## 14. Datos estáticos

Todo el contenido del portal vive en `artifacts/jspv/src/data/content.ts`. Este archivo es la **única fuente de verdad** para:

### `NEWS[]` — Noticias

```ts
{
  slug: string;          // URL slug: /actualitat/<slug>
  title: string;
  excerpt: string;
  body: string;          // HTML o texto largo
  date: string;          // "15 de juny de 2026"
  category: string;      // "Habitatge" | "Educació" | "Emergències" | etc.
  image?: string;        // import de asset local
  imageAlt?: string;
}
```

### `AGENDA[]` — Eventos

```ts
{
  title: string;
  date: string;          // "22 juny 2026"
  location: string;      // "Casa del Poble, València"
  type: string;          // "Assemblea" | "Acte" | "Formació" | "Reunió" | etc.
  href?: string;         // Link externo opcional
}
```

### `EXECUTIVE_CORE[]` / `EXECUTIVE_FULL[]` — Equipo

```ts
{
  name: string;
  role: string;          // Cargo en la organización
  bio: string;           // Biografía breve
  isSecretary?: boolean; // true solo para el Secretari General
}
```

Las fotos se mapean en el objeto `PHOTOS` del mismo archivo:

```ts
const PHOTOS: Record<string, string> = {
  "Marcos Durà Gimeno": marcosPhoto,
  // ...
};
```

### `CAMPAIGNS[]` — Campañas

```ts
{
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  theme: "red" | "dark" | "orange";
  image: string;
  imageAlt: string;
}
```

### `HISTORY[]` / `VALUES[]`

Arrays de objetos con los textos de las secciones Historia y Valors.

### Cómo añadir una noticia nueva

1. Importar la imagen en `content.ts` (si tiene foto).
2. Añadir el objeto al array `NEWS` con `slug` único.
3. La ruta `/actualitat/<slug>` se generará automáticamente.

---

## 15. Estilos y sistema de diseño

### 15.1 Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--primary` | `#E30613` | Rojo JSPV — botones, acentos, badges |
| `--foreground` | `#1A1A1A` | Texto principal |
| `--background` | `#FFFFFF` | Fondo principal |
| `--surface` | `#F8F8F8` | Fondo de secciones secundarias |
| `--border` | `#E5E7EB` | Bordes sutiles |
| `--muted-foreground` | `#6B7280` | Texto secundario |

### 15.2 Tipografía

| Familia | Uso | Variante Tailwind |
|---|---|---|
| **Barlow Condensed** | Títulos, displays, badges | `font-display` |
| **Barlow** | Cuerpo de texto, UI | `font-sans` (defecto) |

Ambas fuentes se cargan desde Google Fonts en `src/index.css`.

### 15.3 Clases utilitarias personalizadas

Definidas en `src/index.css` dentro de `@layer utilities`:

| Clase | Efecto |
|---|---|
| `container-page` | `max-w-7xl mx-auto px-5 sm:px-8` |
| `container-prose` | `max-w-3xl mx-auto px-5 sm:px-8` |
| `hover-elevate` | `translateY(-2px) shadow-md` al hacer hover |
| `reveal-ready` | Estado inicial de animación (opacity 0, translateY 18px) |
| `tweet-ticker-track` | Animación marquee 40s para el ticker de tweets |
| `ig-ticker-track` | Animación marquee 35s para el ticker de Instagram |

### 15.4 Tailwind CSS v4

Este proyecto usa **Tailwind CSS v4**, que introduce cambios importantes respecto a v3:
- Los tokens de diseño se definen en `@theme { }` dentro del CSS, no en `tailwind.config.js`.
- Los colores se referencian con variables CSS: `hsl(var(--primary))`.
- El plugin de Vite `@tailwindcss/vite` reemplaza el procesador PostCSS.

---

## 16. Errores frecuentes y soluciones

### ❌ `Error: PORT environment variable is required`

**Causa:** El proceso se arrancó sin la variable `PORT`.

**Solución:**
```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/jspv run dev
```

### ❌ `Error: BASE_PATH environment variable is required`

**Causa:** Solo afecta al frontend. `BASE_PATH` es obligatorio en `vite.config.ts`.

**Solución:** Añade `BASE_PATH=/` al comando o al archivo `.env`.

### ❌ `Cannot find module '@esbuild/darwin-arm64'`

**Causa:** Los binarios nativos de esbuild para arm64 no están instalados (posible conflict con overrides).

**Solución:**
```bash
pnpm store prune
pnpm install --force
```

Si el problema persiste, verifica que Node.js sea native arm64:
```bash
node -e "console.log(process.arch)"  # debe ser "arm64"
```

### ❌ `Invalid hook call` en React

**Causa:** Versiones duplicadas de React en el bundle. El monorepo incluye `dedupe: ["react", "react-dom"]` en vite.config.ts para evitarlo. Si aparece, normalmente es por una librería que incluye React como dependencia directa.

**Solución:**
```bash
pnpm why react  # busca duplicados
# Añadir la librería conflictiva a "dedupe" en vite.config.ts
```

**Nota:** Por esto se decidió **no usar react-leaflet** para el mapa. `ValenciaMap` es un SVG puro para evitar este problema.

### ❌ Posts de Instagram no aparecen (solo placeholders)

**Causas posibles:**
1. `INSTAGRAM_TOKEN` no está configurado.
2. El token ha expirado (los tokens básicos duran 60 días; hay que renovarlos o usar tokens de larga duración).
3. La Instagram Graph API ha cambiado límites de rate.

**Solución:**
1. Verifica que el API server está corriendo: `curl http://localhost:3001/api/healthz`
2. Prueba el endpoint de Instagram: `curl http://localhost:3001/api/instagram`
3. Renueva el token en [developers.facebook.com](https://developers.facebook.com).

### ❌ El frontend no puede llegar a `/api/*`

**Causa:** En desarrollo local, el frontend (puerto 3000) y la API (puerto 3001) son procesos separados. Sin proxy configurado, `/api/instagram` irá al puerto 3000 y recibirá 404.

**Solución:** Añadir proxy en `vite.config.ts`:

```ts
server: {
  port,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
},
```

### ❌ `pnpm install` falla con errores de peer dependencies

**Causa:** `autoInstallPeers: false` en `pnpm-workspace.yaml` es deliberado para tener control explícito de dependencias.

**Solución:** Instala el peer que falta explícitamente:
```bash
pnpm add <dependencia-faltante> --filter @workspace/jspv
```

### ❌ Tailwind classes no se aplican

**Causa:** Tailwind v4 require que el archivo CSS con `@import "tailwindcss"` esté correctamente importado en el punto de entrada de React.

**Verificar:** `src/main.tsx` debe importar `./index.css`.

### ❌ Tipografías Barlow no cargan

**Causa:** Sin conexión a internet o la URL de Google Fonts está bloqueada.

**Solución para desarrollo offline:** Descarga las fuentes localmente y actualiza la importación en `index.css`:

```bash
# Descargar con fontsource
pnpm add @fontsource/barlow @fontsource/barlow-condensed --filter @workspace/jspv
```

Luego en `index.css`:
```css
/* Reemplazar el @import de Google Fonts con: */
@import "@fontsource/barlow/400.css";
@import "@fontsource/barlow/700.css";
@import "@fontsource-variable/barlow-condensed";
```

---

## 17. Despliegue en producción

### 17.1 Frontend estático (Nginx en Linux)

```bash
# Build
PORT=80 BASE_PATH=/ pnpm --filter @workspace/jspv run build

# El output está en: artifacts/jspv/dist/public/
```

Configuración Nginx mínima para SPA (todas las rutas al `index.html`):

```nginx
server {
    listen 80;
    server_name jspv.example.com;

    root /var/www/jspv/dist/public;
    index index.html;

    # Assets con cache largo
    location ~* \.(js|css|png|jpg|webp|svg|ico|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 17.2 API Server (proceso Node.js)

En producción, usa un gestor de procesos como **PM2**:

```bash
# Instalar PM2
npm install -g pm2

# Arrancar la API
PORT=3001 pm2 start artifacts/api-server/src/index.ts \
  --name "jspv-api" \
  --interpreter "node" \
  --interpreter-args "--import tsx/esm"

# Guardar configuración para reinicios automáticos
pm2 save
pm2 startup
```

### 17.3 Variables en producción

Nunca incluyas `.env` en el repositorio. En producción, configura las variables directamente en el sistema o usa un gestor de secretos:

```bash
# systemd service (ejemplo)
[Service]
Environment="PORT=3001"
Environment="INSTAGRAM_TOKEN=tu_token_aquí"
Environment="DATABASE_URL=postgres://..."
```

### 17.4 Actualización del contenido

Los datos del portal (noticias, equipo, agenda) están en `src/data/content.ts`. Para actualizar:

1. Editar el archivo localmente.
2. Hacer `git commit` y `git push`.
3. Ejecutar el build de producción nuevamente.

No hay CMS — el contenido es código TypeScript versionado en Git.

---

## Licencia y contacto

**Joves Socialistes del País Valencià**
- Web: [jspv.es](https://jspv.es)
- Email: organitzaciojspv@gmail.com
- Twitter/X: [@JSPV_oficial](https://x.com/JSPV_oficial)
- Instagram: [@jovesocialistes](https://instagram.com/jovesocialistes)
