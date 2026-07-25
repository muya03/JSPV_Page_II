# Guía de despliegue — Web JSPV (Mac M1 → IONOS)

Esta guía explica cómo **ejecutar el proyecto en un Mac M1**, **generar la web**
y **subirla a un hosting** tipo IONOS.

La web es un sitio **estático** (HTML + CSS + JS ya generados). No necesita base
de datos ni servidor para funcionar: basta con subir unos archivos a tu hosting.

---

## 1. Requisitos en el Mac (una sola vez)

Instala estas tres herramientas:

1. **Node.js 22 LTS** (versión para Apple Silicon / arm64):
   - Descárgalo de <https://nodejs.org> (botón "LTS"), o con Homebrew:
     ```bash
     brew install node@22
     ```
   - Comprueba que funciona:
     ```bash
     node --version    # debe mostrar v22.x
     ```

2. **pnpm** (el gestor de paquetes que usa el proyecto):
   ```bash
   corepack enable
   corepack prepare pnpm@10 --activate
   pnpm --version      # debe mostrar 10.x
   ```

3. **Git** (para descargar el proyecto). macOS suele pedir instalar las
   "Command Line Tools" la primera vez que ejecutas `git`; acepta.

---

## 2. Descargar el proyecto en tu Mac

Abre la app **Terminal** y ejecuta:

```bash
cd ~/Sites            # o la carpeta donde quieras guardarlo (créala si no existe)
git clone https://github.com/muya03/JSPV_Page_II.git
cd JSPV_Page_II
```

> Si prefieres no usar Git, puedes descargar el proyecto como ZIP desde GitHub
> (botón verde **Code → Download ZIP**), descomprimirlo y entrar en la carpeta.

---

## 3. Ver la web en local (modo desarrollo)

Sirve para trabajar y ver los cambios al instante en tu navegador:

```bash
pnpm install                                   # instala dependencias (la 1ª vez tarda un poco)
PORT=5173 pnpm --filter @workspace/jspv dev
```

Abre <http://localhost:5173> en el navegador. Para pararlo, pulsa `Ctrl + C`.

> **Importante (Mac M1):** usa `pnpm install` (sin `--frozen-lockfile`). Así pnpm
> descarga los binarios nativos de macOS/Apple Silicon que necesita el proyecto.

---

## 4. Generar la web para publicar (build)

Cuando quieras crear los archivos definitivos para subir al hosting:

```bash
./build-web.sh
```

Esto genera la web en la carpeta:

```
artifacts/jspv/dist/public/
```

Ese es **el contenido que hay que subir al hosting** (el `index.html`, la carpeta
`assets/`, las páginas, `.htaccess`, etc.).

> Alternativa manual (equivale al script):
> ```bash
> PORT=5000 pnpm install
> PORT=5000 pnpm --filter @workspace/jspv build
> ```

### Probar el build antes de subirlo (opcional pero recomendable)

```bash
PORT=4173 pnpm --filter @workspace/jspv serve
```

Abre <http://localhost:4173>. Si se ve bien aquí, se verá bien en el hosting.

---

## 5. Subir la web a IONOS

En IONOS, un **Web Hosting / Webspace** es hosting estático (Apache) y es
perfecto para esta web. Hay dos formas de subir los archivos:

### Opción A — Por SFTP (recomendada, más rápida)

1. En el **panel de IONOS**: entra en tu producto de Hosting → busca **SFTP /
   Acceso SFTP** y anota:
   - **Servidor** (algo como `home…….1and1-data.host` o una IP)
   - **Usuario** y **Contraseña** de SFTP
   - **Puerto: 22**

2. En el Mac, usa un cliente gratuito como **Cyberduck** o **FileZilla**:
   - Protocolo: **SFTP**
   - Rellena servidor, usuario, contraseña y puerto 22 → **Conectar**.

3. Entra en la **carpeta raíz de tu dominio** dentro del webspace (para el dominio
   principal suele ser la carpeta en la que apareces al conectar; puedes
   confirmarlo en IONOS: **Dominios → tu dominio → Carpeta de destino**).

4. **Sube TODO el contenido** de `artifacts/jspv/dist/public/` a esa carpeta
   (los archivos de dentro, no la carpeta en sí).
   - Activa **"mostrar archivos ocultos"** en tu cliente SFTP para que se suba
     también el archivo **`.htaccess`** (empieza por punto). Es imprescindible.

### Opción B — Con el Administrador de archivos de IONOS

1. Panel de IONOS → **Administrador de archivos** (File Manager).
2. Entra en la carpeta raíz del dominio.
3. Sube el contenido de `dist/public/`. Si el gestor no deja subir `.htaccess`,
   créalo a mano allí y pega el contenido del archivo
   `artifacts/jspv/public/.htaccess` del proyecto.

Cuando termine, abre tu dominio en el navegador: la web debería verse.

---

## 6. Actualizar la web más adelante

Cada vez que cambies algo (o yo te pase cambios nuevos):

```bash
git pull                 # trae los últimos cambios (si usas Git)
./build-web.sh           # regenera la web
```

Y vuelve a subir el contenido de `dist/public/` al hosting (puedes sobrescribir).

---

## 7. Notas importantes

### El feed de Instagram
La franja de Instagram de la portada intenta cargar los últimos posts desde un
pequeño servidor (`/api/instagram`). En un hosting **estático** de IONOS ese
servidor no existe, así que esa franja mostrará **cuadros de relleno** (no da
error, simplemente no salen los posts reales).

Para que salgan los posts reales necesitas un backend Node ejecutándose (por
ejemplo un **IONOS VPS** o el servicio **Deploy Now** con Node) y un token de
Instagram. Si te interesa, se prepara aparte. Para una web informativa, dejarlo
con los cuadros de relleno es perfectamente válido.

### Si la web va en una subcarpeta (no en la raíz del dominio)
Por defecto la web se genera para la **raíz** del dominio (`https://tudominio.es/`).
Si necesitas publicarla dentro de una subcarpeta (p. ej. `https://tudominio.es/web/`),
genera el build indicando la ruta:

```bash
BASE_PATH=/web/ ./build-web.sh
```

y sube el resultado a esa subcarpeta.

### Certificado HTTPS
En IONOS activa el **certificado SSL gratuito** (SSL/Let's Encrypt) para tu
dominio desde el panel, para que la web se sirva por `https://`.

---

## 8. Solución de problemas

| Síntoma | Causa probable | Solución |
|---|---|---|
| La portada carga, pero al entrar en una página interna y **recargar** da error 404 | No se subió el `.htaccess` | Sube el archivo `.htaccess` (oculto) a la raíz del sitio |
| **Pantalla en blanco** y en la consola errores de archivos `/assets/...` que no cargan | La web se subió a una subcarpeta pero se generó para la raíz | Regenera con `BASE_PATH=/subcarpeta/ ./build-web.sh` |
| `pnpm install` falla en el Mac con errores de `esbuild`/`rollup`/binarios | Se usó `--frozen-lockfile` | Ejecuta `pnpm install` a secas (sin frozen) |
| `Error: PORT environment variable is required` al hacer build | Falta la variable PORT | Usa `./build-web.sh`, o antepon `PORT=5000` al comando |

---

### Resumen rápido

```bash
# Requisitos: Node 22 + pnpm + git
git clone https://github.com/muya03/JSPV_Page_II.git
cd JSPV_Page_II
./build-web.sh
# Sube el contenido de artifacts/jspv/dist/public/ (incluido .htaccess) a la raíz del hosting
```
