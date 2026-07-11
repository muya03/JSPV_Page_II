import { useState } from "react";
import { MapPin } from "lucide-react";

type ProvId = "castello" | "valencia" | "alacant";

interface Seccio { nom: string; comarca: string; }
interface Marker { nom: string; cx: number; cy: number; }
interface Provincia {
  id: ProvId;
  nom: string; nomEs: string; codi: string; color: string;
  path: string; labelX: number; labelY: number;
  seccions: Seccio[];
  markers: Marker[];
}

const PROVINCIES: Provincia[] = [
  {
    id: "castello",
    nom: "Castelló", nomEs: "Castellón", codi: "FPC", color: "#8B0D18",
    path: "M 90,2 L 280,2 L 275,55 L 260,110 L 245,160 L 230,200 L 265,242 L 225,248 L 175,255 L 130,252 L 90,230 L 65,155 L 70,80 Z",
    labelX: 158, labelY: 125,
    seccions: [
      { nom: "Castelló capital", comarca: "La Plana Alta" },
      { nom: "Vila-real",        comarca: "La Plana Baixa" },
      { nom: "Borriana",         comarca: "La Plana Baixa" },
      { nom: "Vinaròs",          comarca: "El Baix Maestrat" },
      { nom: "Almassora",        comarca: "La Plana Alta" },
      { nom: "Benicàssim",       comarca: "La Plana Alta" },
    ],
    markers: [
      { nom: "Castelló",   cx: 220, cy: 176 },
      { nom: "Vila-real",  cx: 212, cy: 192 },
      { nom: "Borriana",   cx: 223, cy: 203 },
      { nom: "Vinaròs",    cx: 264, cy: 66  },
      { nom: "Almassora",  cx: 216, cy: 181 },
      { nom: "Benicàssim", cx: 241, cy: 153 },
    ],
  },
  {
    id: "valencia",
    nom: "València", nomEs: "Valencia", codi: "FPV", color: "#E30613",
    path: "M 90,230 L 130,252 L 175,255 L 225,248 L 265,242 L 265,330 L 265,362 L 268,390 L 165,405 L 90,405 L 20,388 L 0,340 L 5,285 L 35,255 Z",
    labelX: 143, labelY: 322,
    seccions: [
      { nom: "València capital", comarca: "L'Horta"             },
      { nom: "Torrent",          comarca: "L'Horta Sud"         },
      { nom: "Paterna",          comarca: "L'Horta Nord"        },
      { nom: "Burjassot",        comarca: "L'Horta Nord"        },
      { nom: "Gandia",           comarca: "La Safor"            },
      { nom: "Alzira",           comarca: "La Ribera Alta"      },
      { nom: "Sagunt",           comarca: "El Camp de Morvedre" },
      { nom: "Sueca",            comarca: "La Ribera Baixa"     },
      { nom: "Ontinyent",        comarca: "El Comtat"           },
    ],
    markers: [
      { nom: "València",  cx: 165, cy: 265 },
      { nom: "Torrent",   cx: 152, cy: 276 },
      { nom: "Paterna",   cx: 158, cy: 257 },
      { nom: "Burjassot", cx: 163, cy: 254 },
      { nom: "Gandia",    cx: 220, cy: 351 },
      { nom: "Alzira",    cx: 168, cy: 313 },
      { nom: "Sagunt",    cx: 197, cy: 233 },
      { nom: "Sueca",     cx: 188, cy: 331 },
      { nom: "Ontinyent", cx: 128, cy: 379 },
    ],
  },
  {
    id: "alacant",
    nom: "Alacant", nomEs: "Alicante", codi: "FPA", color: "#C0182A",
    path: "M 268,390 L 270,425 L 268,460 L 255,485 L 230,505 L 190,520 L 155,525 L 120,522 L 85,510 L 40,490 L 10,460 L 5,425 L 20,388 L 90,405 L 165,405 Z",
    labelX: 148, labelY: 462,
    seccions: [
      { nom: "Alacant capital", comarca: "L'Alacantí"         },
      { nom: "Elx",             comarca: "El Baix Vinalopó"   },
      { nom: "Dénia",           comarca: "La Marina Alta"     },
      { nom: "Alcoi",           comarca: "L'Alcoià"           },
      { nom: "Benidorm",        comarca: "La Marina Baixa"    },
      { nom: "Torrevieja",      comarca: "La Vega Baixa"      },
      { nom: "Petrer",          comarca: "El Vinalopó Mitjà"  },
    ],
    markers: [
      { nom: "Alacant",    cx: 165, cy: 448 },
      { nom: "Elx",        cx: 128, cy: 465 },
      { nom: "Dénia",      cx: 266, cy: 403 },
      { nom: "Alcoi",      cx: 162, cy: 413 },
      { nom: "Benidorm",   cx: 223, cy: 429 },
      { nom: "Torrevieja", cx: 132, cy: 515 },
      { nom: "Petrer",     cx: 112, cy: 436 },
    ],
  },
];

export function ValenciaMap({ lang }: { lang: string }) {
  const [selected, setSelected] = useState<ProvId | null>(null);
  const [hovered, setHovered]   = useState<ProvId | null>(null);
  const [tooltip, setTooltip]   = useState<{ nom: string; x: number; y: number } | null>(null);

  const selectedProv = selected ? PROVINCIES.find((p) => p.id === selected) ?? null : null;

  const opacity = (p: Provincia) => {
    if (selected === p.id) return 1;
    if (hovered  === p.id) return 0.88;
    if (selected)          return 0.38;
    return 0.72;
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start">
      {/* ── SVG Map ─────────────────────────────────────────────── */}
      <div className="w-full xl:w-72 flex-shrink-0">
        <div className="relative select-none">
          <svg
            viewBox="0 0 280 540"
            className="w-full max-w-[290px] mx-auto drop-shadow-md"
            aria-label={lang === "es" ? "Mapa de la Comunitat Valenciana" : "Mapa de la Comunitat Valenciana"}
          >
            {PROVINCIES.map((p) => (
              <g key={p.id}>
                {/* Province fill */}
                <path
                  d={p.path}
                  fill={p.color}
                  fillOpacity={opacity(p)}
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  className="cursor-pointer"
                  style={{ transition: "fill-opacity 0.18s ease" }}
                  onClick={() => setSelected(selected === p.id ? null : p.id)}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={lang === "es" ? p.nomEs : p.nom}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelected(selected === p.id ? null : p.id)}
                />
                {/* Province label */}
                <text
                  x={p.labelX}
                  y={p.labelY}
                  textAnchor="middle"
                  style={{
                    fill: "white",
                    fontSize: "13px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    pointerEvents: "none",
                    paintOrder: "stroke",
                    stroke: p.color,
                    strokeWidth: "3px",
                    strokeOpacity: opacity(p) * 0.7,
                    fillOpacity: Math.min(opacity(p) * 1.4, 1),
                  }}
                >
                  {lang === "es" ? p.nomEs.toUpperCase() : p.nom.toUpperCase()}
                </text>
              </g>
            ))}

            {/* City markers */}
            {PROVINCIES.map((p) =>
              p.markers.map((m) => {
                const isActive = !selected || selected === p.id;
                return (
                  <g
                    key={`${p.id}-${m.nom}`}
                    style={{ cursor: "default", transition: "opacity 0.18s" }}
                    opacity={isActive ? 1 : 0.25}
                    onMouseEnter={() => setTooltip({ nom: m.nom, x: m.cx, y: m.cy })}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <circle cx={m.cx} cy={m.cy} r="5.5" fill="white" opacity={0.92} />
                    <circle cx={m.cx} cy={m.cy} r="3.5" fill={p.color} />
                  </g>
                );
              })
            )}

            {/* Tooltip */}
            {tooltip && (
              <g style={{ pointerEvents: "none" }}>
                <rect
                  x={tooltip.x - 30}
                  y={tooltip.y - 26}
                  width={60}
                  height={18}
                  rx="4"
                  fill="#1A1A1A"
                  opacity={0.85}
                />
                <text
                  x={tooltip.x}
                  y={tooltip.y - 13}
                  textAnchor="middle"
                  style={{
                    fill: "white",
                    fontSize: "9px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                  }}
                >
                  {tooltip.nom}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Province selector pills */}
        <div className="flex gap-1.5 justify-center mt-5 flex-wrap">
          {PROVINCIES.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(active ? null : p.id)}
                className="px-3 py-1 rounded-full text-[11px] font-display font-bold tracking-wide transition-all"
                style={{
                  backgroundColor: active ? p.color : `${p.color}40`,
                  color: active ? "#fff" : p.color,
                  border: `1.5px solid ${p.color}`,
                }}
              >
                {lang === "es" ? p.nomEs : p.nom}
              </button>
            );
          })}
          {selected && (
            <button
              onClick={() => setSelected(null)}
              className="px-3 py-1 rounded-full text-[11px] font-display font-bold tracking-wide border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              {lang === "es" ? "Ver todo" : "Veure tot"}
            </button>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-3 font-light">
          {lang === "es"
            ? "Haz clic en una provincia para ver sus secciones"
            : "Fes clic en una federació per veure les seccions"}
        </p>
      </div>

      {/* ── Sections panel ───────────────────────────────────────── */}
      <div className="flex-1 min-h-[260px]">
        {selectedProv ? (
          <div>
            {/* Province header */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="px-2.5 py-0.5 rounded text-xs font-display font-bold text-white tracking-wide"
                style={{ backgroundColor: selectedProv.color }}
              >
                {selectedProv.codi}
              </span>
              <h3 className="font-display font-extrabold text-xl leading-tight text-foreground">
                {lang === "es"
                  ? `Federació de ${selectedProv.nomEs}`
                  : `Federació de ${selectedProv.nom}`}
              </h3>
              <span className="ml-auto text-sm text-muted-foreground font-light">
                {selectedProv.seccions.length}{" "}
                {lang === "es" ? "secciones" : "seccions"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {selectedProv.seccions.map((s) => (
                <div
                  key={s.nom}
                  className="group bg-white rounded-xl border border-border p-4 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-2">
                    <MapPin
                      size={12}
                      className="shrink-0 mt-0.5 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-display font-bold text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
                        {s.nom}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground font-light">
                        {s.comarca}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border p-10">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "#E3061315" }}
            >
              <MapPin size={26} className="text-primary" aria-hidden="true" />
            </div>
            <p className="font-display font-extrabold text-base text-foreground mb-1">
              {lang === "es"
                ? "Selecciona una federació"
                : "Selecciona una federació"}
            </p>
            <p className="text-sm text-muted-foreground font-light max-w-xs">
              {lang === "es"
                ? "Haz clic en una provincia del mapa o en los botones para ver sus secciones locales."
                : "Fes clic en una federació al mapa o als botons per veure les seccions locals."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
