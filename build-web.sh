#!/usr/bin/env bash
# ============================================================================
# Genera el sitio web estático de JSPV, listo para subir a un hosting (IONOS…).
#
# Uso:
#   ./build-web.sh                  → sitio pensado para la RAÍZ del dominio
#   BASE_PATH=/subcarpeta/ ./build-web.sh   → si va dentro de una subcarpeta
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")"

# La configuración de Vite exige la variable PORT (no afecta al build estático).
export PORT="${PORT:-5000}"
# Ruta base del sitio. "/" = raíz del dominio (lo normal en IONOS).
export BASE_PATH="${BASE_PATH:-/}"

echo "▸ Instalando dependencias (pnpm)…"
pnpm install

echo "▸ Generando el sitio estático (BASE_PATH=$BASE_PATH)…"
pnpm --filter @workspace/jspv build

OUT="artifacts/jspv/dist/public"
echo ""
echo "✓ Build terminado."
echo "  Sube TODO el contenido de esta carpeta a la raíz de tu hosting:"
echo "      $(pwd)/$OUT"
echo "  Incluye el archivo oculto .htaccess (activa 'mostrar archivos ocultos')."
