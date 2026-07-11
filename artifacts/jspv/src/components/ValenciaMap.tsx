import { useState } from "react";
import { MapPin } from "lucide-react";

type ProvId = "castello" | "valencia" | "alacant";

interface Seccio  { nom: string; comarca: string; }
interface Marker  { nom: string; cx: number; cy: number; }
interface Provincia {
  id: ProvId;
  nom: string; nomEs: string; codi: string; color: string;
  path: string; labelX: number; labelY: number;
  seccions: Seccio[];
  markers: Marker[];
}

// SVG paths derived from real IGN/GeoJSON province boundaries
// viewBox="0 0 280 540"  projection: lon∈[-1.56,0.54] lat∈[37.83,40.82]
const PROVINCIES: Provincia[] = [
  {
    id: "castello",
    nom: "Castelló", nomEs: "Castellón", codi: "FPC", color: "#8B0D18",
    path:
      "M 186.0,5.7 L 199.4,16.7 L 210.1,16.5 L 213.6,23.3 L 238.1,15.7 " +
      "L 246.9,23.7 L 245.2,34.3 L 261.6,39.3 L 276.4,54.9 L 262.5,83.6 " +
      "L 233.4,117.3 L 227.7,133.1 L 214.6,141.7 L 207.3,163.4 L 182.9,198.3 " +
      "L 164.2,183.9 L 157.6,184.2 L 147.2,199.6 L 137.3,184.9 L 129.6,194.7 " +
      "L 121.0,192.5 L 120.5,177.7 L 115.9,174.7 L 110.6,181.5 L 96.9,164.2 " +
      "L 96.3,152.3 L 107.5,139.7 L 126.2,135.4 L 135.4,102.6 L 142.1,106.8 " +
      "L 150.9,104.1 L 156.8,100.3 L 156.2,92.7 L 170.4,82.1 L 161.7,67.9 " +
      "L 171.6,62.5 L 168.9,37.7 L 158.6,37.3 L 157.2,28.1 L 176.5,23.3 " +
      "L 178.1,11.9 L 186.0,5.7 Z",
    labelX: 190, labelY: 100,
    seccions: [
      { nom: "Castelló capital", comarca: "La Plana Alta"    },
      { nom: "Vila-real",        comarca: "La Plana Baixa"   },
      { nom: "Borriana",         comarca: "La Plana Baixa"   },
      { nom: "Vinaròs",          comarca: "El Baix Maestrat" },
      { nom: "Almassora",        comarca: "La Plana Alta"    },
      { nom: "Benicàssim",       comarca: "La Plana Alta"    },
    ],
    markers: [
      { nom: "Castelló",   cx: 200.8, cy: 150.4 },
      { nom: "Vila-real",  cx: 194.7, cy: 160.0 },
      { nom: "Borriana",   cx: 198.3, cy: 168.7 },
      { nom: "Vinaròs",    cx: 271.2, cy:  63.4 },
      { nom: "Almassora",  cx: 200.4, cy: 156.0 },
      { nom: "Benicàssim", cx: 216.8, cy: 138.5 },
    ],
  },
  {
    id: "valencia",
    nom: "València", nomEs: "Valencia", codi: "FPV", color: "#E30613",
    path:
      "M 76.4,151.6 L 85.5,154.8 L 89.5,174.8 L 102.2,169.5 L 110.6,181.5 " +
      "L 115.9,174.7 L 120.5,177.7 L 123.2,193.6 L 129.6,194.7 L 137.3,184.9 " +
      "L 147.2,199.6 L 157.6,184.2 L 164.2,183.9 L 182.9,198.3 L 180.2,212.5 " +
      "L 165.9,234.2 L 167.7,250.3 L 164.0,245.3 L 163.2,252.0 L 179.2,295.0 " +
      "L 176.1,302.2 L 180.9,316.8 L 204.3,353.7 L 198.6,349.3 L 188.3,354.3 " +
      "L 186.6,349.0 L 177.3,355.2 L 166.6,350.1 L 146.4,363.4 L 128.6,365.7 " +
      "L 140.4,375.1 L 124.2,385.3 L 122.2,377.9 L 110.0,372.1 L 96.7,377.0 " +
      "L 93.1,370.1 L 86.2,370.3 L 80.1,338.7 L 55.1,341.5 L 39.5,320.6 " +
      "L 53.1,273.5 L 29.8,268.4 L 19.4,260.0 L 14.0,263.5 L 14.3,256.7 " +
      "L 5.1,250.6 L 5.2,229.4 L 25.5,204.1 L 33.0,207.6 L 38.9,203.9 " +
      "L 47.5,157.2 L 76.4,151.6 Z",
    labelX: 90, labelY: 275,
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
      { nom: "València",  cx: 157.9, cy: 243.8 },
      { nom: "Torrent",   cx: 145.7, cy: 249.8 },
      { nom: "Paterna",   cx: 149.2, cy: 237.9 },
      { nom: "Burjassot", cx: 152.9, cy: 236.4 },
      { nom: "Gandia",    cx: 183.6, cy: 333.9 },
      { nom: "Alzira",    cx: 150.7, cy: 301.1 },
      { nom: "Sagunt",    cx: 171.7, cy: 205.5 },
      { nom: "Sueca",     cx: 166.3, cy: 292.2 },
      { nom: "Ontinyent", cx: 127.1, cy: 360.8 },
    ],
  },
  {
    id: "alacant",
    nom: "Alacant", nomEs: "Alicante", codi: "FPA", color: "#C0182A",
    path:
      "M 186.7,349.7 L 188.3,354.3 L 198.6,349.3 L 203.4,354.5 L 203.0,349.1 " +
      "L 224.8,356.0 L 239.2,376.2 L 221.1,387.8 L 219.2,395.3 L 205.9,396.1 " +
      "L 195.0,414.8 L 187.7,412.7 L 158.0,429.3 L 154.2,445.6 L 148.8,443.7 " +
      "L 139.9,450.4 L 139.5,473.6 L 128.6,475.4 L 123.9,482.4 L 121.6,509.3 " +
      "L 106.3,536.9 L 97.1,533.7 L 71.7,495.6 L 69.8,484.4 L 79.0,459.5 " +
      "L 76.1,451.3 L 62.9,442.9 L 62.1,430.2 L 72.8,419.6 L 71.1,390.9 " +
      "L 79.7,390.7 L 85.9,383.6 L 79.8,369.4 L 93.1,370.1 L 96.7,377.0 " +
      "L 110.0,372.1 L 125.6,385.3 L 140.4,375.1 L 129.2,365.4 L 146.4,363.4 " +
      "L 166.6,350.1 L 177.3,355.2 L 186.7,349.7 Z",
    labelX: 148, labelY: 468,
    seccions: [
      { nom: "Alacant capital", comarca: "L'Alacantí"        },
      { nom: "Elx",             comarca: "El Baix Vinalopó"  },
      { nom: "Dénia",           comarca: "La Marina Alta"    },
      { nom: "Alcoi",           comarca: "L'Alcoià"          },
      { nom: "Benidorm",        comarca: "La Marina Baixa"   },
      { nom: "Torrevieja",      comarca: "La Vega Baixa"     },
      { nom: "Petrer",          comarca: "El Vinalopó Mitjà" },
    ],
    markers: [
      { nom: "Alacant",    cx: 143.7, cy: 447.0 },
      { nom: "Elx",        cx: 113.7, cy: 461.6 },
      { nom: "Dénia",      cx: 222.1, cy: 357.8 },
      { nom: "Alcoi",      cx: 144.7, cy: 383.2 },
      { nom: "Benidorm",   cx: 190.4, cy: 411.2 },
      { nom: "Torrevieja", cx: 117.1, cy: 513.1 },
      { nom: "Petrer",     cx: 104.9, cy: 423.5 },
    ],
  },
];

export function ValenciaMap({ lang }: { lang: string }) {
  const [selected, setSelected] = useState<ProvId | null>(null);
  const [hovered,  setHovered]  = useState<ProvId | null>(null);
  const [tooltip,  setTooltip]  = useState<{ nom: string; x: number; y: number } | null>(null);

  const selectedProv = selected
    ? (PROVINCIES.find((p) => p.id === selected) ?? null)
    : null;

  const fillOpacity = (p: Provincia) => {
    if (selected === p.id) return 1;
    if (hovered  === p.id) return 0.88;
    if (selected)          return 0.32;
    return 0.75;
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start">

      {/* ── SVG Map ─────────────────────────────────────────────── */}
      <div className="w-full xl:w-72 flex-shrink-0">
        <div className="relative select-none">
          <svg
            viewBox="0 0 280 540"
            className="w-full max-w-[290px] mx-auto drop-shadow-lg"
            aria-label="Mapa interactiu de la Comunitat Valenciana"
          >
            {PROVINCIES.map((p) => (
              <g key={p.id}>
                <path
                  d={p.path}
                  fill={p.color}
                  fillOpacity={fillOpacity(p)}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  style={{ cursor: "pointer", transition: "fill-opacity 0.18s ease" }}
                  onClick={() => setSelected(selected === p.id ? null : p.id)}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  role="button"
                  aria-label={lang === "es" ? p.nomEs : p.nom}
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setSelected(selected === p.id ? null : p.id)
                  }
                />
                {/* Province label */}
                <text
                  x={p.labelX}
                  y={p.labelY}
                  textAnchor="middle"
                  style={{
                    fill: "white",
                    fontSize: "12px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    pointerEvents: "none",
                    paintOrder: "stroke",
                    stroke: p.color,
                    strokeWidth: "3px",
                    strokeOpacity: fillOpacity(p) * 0.6,
                    fillOpacity: Math.min(fillOpacity(p) * 1.5, 1),
                  }}
                >
                  {(lang === "es" ? p.nomEs : p.nom).toUpperCase()}
                </text>
              </g>
            ))}

            {/* City markers */}
            {PROVINCIES.map((p) =>
              p.markers.map((m) => {
                const active = !selected || selected === p.id;
                return (
                  <g
                    key={`${p.id}-${m.nom}`}
                    style={{ cursor: "default", transition: "opacity 0.18s" }}
                    opacity={active ? 1 : 0.2}
                    onMouseEnter={() => setTooltip({ nom: m.nom, x: m.cx, y: m.cy })}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <circle cx={m.cx} cy={m.cy} r="5"  fill="white"  opacity={0.9} />
                    <circle cx={m.cx} cy={m.cy} r="3"  fill={p.color} />
                  </g>
                );
              })
            )}

            {/* Hover tooltip */}
            {tooltip && (() => {
              const w = tooltip.nom.length * 5.8 + 12;
              const tx = Math.min(Math.max(tooltip.x - w / 2, 2), 280 - w - 2);
              return (
                <g style={{ pointerEvents: "none" }}>
                  <rect x={tx} y={tooltip.y - 27} width={w} height={17} rx="3" fill="#1A1A1A" opacity={0.86} />
                  <text
                    x={tx + w / 2}
                    y={tooltip.y - 14}
                    textAnchor="middle"
                    style={{
                      fill: "white",
                      fontSize: "9px",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {tooltip.nom}
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Province pills */}
        <div className="flex gap-2 justify-center mt-4 flex-wrap">
          {PROVINCIES.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(active ? null : p.id)}
                className="px-3 py-1 rounded-full text-[11px] font-display font-bold tracking-wide transition-all"
                style={{
                  backgroundColor: active ? p.color : `${p.color}30`,
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

        <p className="text-center text-[11px] text-muted-foreground mt-2.5 font-light">
          {lang === "es"
            ? "Haz clic en una provincia para ver sus secciones"
            : "Fes clic en una federació per veure les seccions"}
        </p>
      </div>

      {/* ── Sections panel ───────────────────────────────────────── */}
      <div className="flex-1 min-h-[240px]">
        {selectedProv ? (
          <div>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
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
                    <MapPin size={12} className="shrink-0 mt-0.5 text-primary" aria-hidden="true" />
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
          <div className="h-full min-h-[210px] flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border p-10">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "#E3061312" }}
            >
              <MapPin size={26} className="text-primary" aria-hidden="true" />
            </div>
            <p className="font-display font-extrabold text-base text-foreground mb-1">
              {lang === "es" ? "Selecciona una federació" : "Selecciona una federació"}
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
