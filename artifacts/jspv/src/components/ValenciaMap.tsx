import { useState } from "react";
import { MapPin } from "lucide-react";

type ProvId = "castello" | "valencia" | "alacant";
interface Seccio { nom: string; comarca: string; }
interface Marker { nom: string; cx: number; cy: number; }

// SVG viewBox="0 0 290 520"
// Projection: lon∈[-1.65,0.62] lat∈[37.75,40.90] — Mercator-corrected aspect ratio
// Full-resolution boundaries (78/114/79 pts) from official Spain provinces dataset

interface Provincia {
  id: ProvId;
  nom: string; nomEs: string; codi: string; color: string;
  path: string;
  labelX: number; labelY: number;
  seccions: Seccio[];
  markers: Marker[];
}

const PROVINCIES: Provincia[] = [
  {
    id: "castello",
    nom: "Castelló", nomEs: "Castellón", codi: "FPC", color: "#8B0D18",
    path: "M 189.7,18.4 L 192.3,18.9 L 194.6,24.2 L 202.5,28.5 L 212.8,28.3 L 214.2,33.8 L 216.2,34.5 L 225.2,28.5 L 229.2,30.0 L 239.7,27.5 L 241.0,32.7 L 244.3,32.1 L 248.1,34.9 L 245.0,39.8 L 246.4,44.6 L 262.1,49.1 L 267.5,53.1 L 266.7,58.3 L 276.4,63.4 L 264.2,82.4 L 263.0,89.6 L 246.4,108.3 L 244.5,114.1 L 235.1,120.4 L 229.6,134.9 L 217.1,142.7 L 210.1,162.6 L 202.2,172.1 L 199.4,172.7 L 186.7,194.5 L 177.0,190.6 L 175.5,186.5 L 168.9,181.3 L 162.5,181.6 L 160.2,188.4 L 152.5,195.7 L 143.0,182.3 L 137.1,186.0 L 135.6,191.2 L 127.5,189.2 L 127.0,175.7 L 122.5,172.9 L 119.8,178.8 L 117.5,179.1 L 112.0,170.1 L 104.4,163.3 L 102.7,157.2 L 103.7,152.4 L 111.4,148.8 L 114.5,140.9 L 123.5,141.3 L 130.7,136.0 L 132.4,137.0 L 130.5,131.6 L 136.9,125.9 L 141.3,107.0 L 147.6,110.8 L 156.1,108.3 L 161.8,104.9 L 159.6,99.9 L 161.1,97.9 L 164.0,98.2 L 167.3,92.4 L 174.8,88.3 L 174.4,84.8 L 166.4,75.3 L 176.0,70.4 L 175.3,65.8 L 172.2,63.5 L 173.3,47.7 L 163.5,47.3 L 162.1,38.9 L 168.8,36.3 L 171.6,39.7 L 180.6,34.5 L 182.2,24.1 L 185.6,19.1 L 189.7,18.4 Z",
    labelX: 198, labelY: 130,
    seccions: [
      { nom: "Castelló capital", comarca: "La Plana Alta"    },
      { nom: "Vila-real",        comarca: "La Plana Baixa"   },
      { nom: "Borriana",         comarca: "La Plana Baixa"   },
      { nom: "Vinaròs",          comarca: "El Baix Maestrat" },
      { nom: "Almassora",        comarca: "La Plana Alta"    },
      { nom: "Benicàssim",       comarca: "La Plana Alta"    },
    ],
    markers: [
      { nom: "Castelló",   cx: 203.9, cy: 150.7 },
      { nom: "Vila-real",  cx: 198.0, cy: 159.5 },
      { nom: "Borriana",   cx: 201.5, cy: 167.4 },
      { nom: "Vinaròs",    cx: 271.3, cy:  71.1 },
      { nom: "Almassora",  cx: 203.5, cy: 155.8 },
      { nom: "Benicàssim", cx: 219.2, cy: 139.8 },
    ],
  },
  {
    id: "valencia",
    nom: "València", nomEs: "Valencia", codi: "FPV", color: "#C8000F",
    path: "M 84.7,151.8 L 93.5,154.7 L 95.5,159.8 L 94.2,169.5 L 97.3,173.0 L 100.5,173.8 L 109.4,168.1 L 117.5,179.1 L 119.8,178.8 L 122.5,172.9 L 127.0,175.7 L 127.5,189.2 L 129.6,190.2 L 135.6,191.2 L 137.1,186.0 L 143.0,182.3 L 152.5,195.7 L 160.2,188.4 L 162.5,181.6 L 168.9,181.3 L 175.5,186.5 L 177.0,190.6 L 186.7,194.5 L 184.2,207.5 L 183.2,205.5 L 178.3,211.2 L 170.4,227.2 L 169.8,237.2 L 172.2,239.5 L 172.2,242.0 L 168.7,237.5 L 170.3,240.5 L 168.9,240.3 L 168.1,242.1 L 171.2,243.0 L 167.9,243.5 L 175.2,267.7 L 183.2,282.9 L 180.3,284.5 L 180.2,289.4 L 184.8,302.8 L 192.4,314.4 L 190.8,314.0 L 190.2,314.9 L 192.0,314.6 L 207.3,336.5 L 205.4,337.3 L 201.8,332.5 L 191.9,337.0 L 190.2,332.2 L 181.3,337.8 L 171.1,333.2 L 162.1,340.9 L 159.3,340.1 L 151.8,345.4 L 134.8,347.5 L 138.5,354.0 L 143.1,352.1 L 146.0,356.1 L 130.5,365.4 L 128.6,358.6 L 120.4,357.6 L 116.9,353.4 L 104.2,357.8 L 100.7,351.5 L 94.1,351.7 L 91.5,347.7 L 92.7,331.5 L 88.6,326.8 L 88.2,322.8 L 64.3,325.3 L 54.1,309.6 L 49.3,306.2 L 50.4,296.1 L 59.9,278.7 L 62.4,263.2 L 56.5,259.8 L 54.5,261.5 L 43.1,257.0 L 40.0,258.5 L 30.1,250.9 L 28.6,253.8 L 27.8,251.3 L 24.9,254.1 L 25.7,251.2 L 23.2,250.4 L 25.2,250.3 L 25.2,247.8 L 22.6,249.1 L 22.9,246.4 L 20.6,247.3 L 21.3,243.9 L 19.3,245.1 L 19.6,242.8 L 16.4,242.2 L 15.5,238.5 L 17.5,238.0 L 17.6,231.7 L 19.3,231.0 L 18.8,223.6 L 16.5,222.9 L 24.0,218.5 L 29.6,205.5 L 36.0,199.8 L 43.1,203.0 L 48.8,199.6 L 47.9,191.7 L 55.6,180.1 L 57.5,171.9 L 57.0,156.9 L 64.8,153.2 L 67.5,155.0 L 69.6,152.7 L 84.7,151.8 Z",
    labelX: 112, labelY: 256,
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
      { nom: "València",  cx: 162.8, cy: 236.1 },
      { nom: "Torrent",   cx: 151.1, cy: 241.5 },
      { nom: "Paterna",   cx: 154.5, cy: 230.6 },
      { nom: "Burjassot", cx: 158.0, cy: 229.3 },
      { nom: "Gandia",    cx: 187.4, cy: 318.4 },
      { nom: "Alzira",    cx: 155.9, cy: 288.4 },
      { nom: "Sagunt",    cx: 176.0, cy: 201.1 },
      { nom: "Sueca",     cx: 170.8, cy: 280.3 },
      { nom: "Ontinyent", cx: 133.2, cy: 343.0 },
    ],
  },
  {
    id: "alacant",
    nom: "Alacant", nomEs: "Alicante", codi: "FPA", color: "#A30010",
    path: "M 190.4,332.9 L 191.9,337.0 L 201.8,332.5 L 206.4,337.3 L 207.6,334.7 L 206.0,332.3 L 212.7,336.1 L 226.9,338.6 L 224.8,339.2 L 236.0,346.0 L 234.1,347.7 L 235.1,351.0 L 239.5,352.6 L 239.1,353.6 L 239.4,355.1 L 240.7,357.1 L 234.1,359.7 L 229.8,366.6 L 223.4,367.7 L 220.2,372.3 L 221.5,374.6 L 217.4,372.9 L 214.7,375.4 L 208.8,375.3 L 202.9,382.6 L 204.5,385.9 L 198.3,392.3 L 191.4,390.4 L 162.9,405.6 L 159.1,412.5 L 159.2,420.5 L 154.0,418.8 L 145.6,424.9 L 145.2,446.1 L 134.7,447.7 L 130.2,454.1 L 128.1,478.7 L 125.7,482.7 L 121.8,483.8 L 118.8,493.4 L 115.1,495.3 L 113.4,504.0 L 104.5,501.0 L 93.1,487.9 L 80.2,466.2 L 78.3,456.0 L 84.5,445.8 L 87.2,433.2 L 84.4,425.8 L 72.3,421.6 L 71.8,418.0 L 73.2,407.5 L 71.0,406.4 L 81.3,396.7 L 79.7,392.4 L 82.8,384.2 L 79.6,370.5 L 87.8,370.3 L 93.8,363.8 L 88.0,350.8 L 92.1,349.3 L 95.2,352.1 L 100.7,351.5 L 104.2,357.8 L 116.9,353.4 L 120.4,357.6 L 128.5,358.5 L 128.7,362.5 L 131.8,365.4 L 146.0,356.1 L 143.1,352.1 L 138.5,354.0 L 135.3,347.2 L 151.8,345.4 L 159.3,340.1 L 162.1,340.9 L 171.1,333.2 L 181.3,337.8 L 190.4,332.9 Z",
    labelX: 120, labelY: 438,
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
      { nom: "Alacant",    cx: 149.2, cy: 421.8 },
      { nom: "Elx",        cx: 120.5, cy: 435.1 },
      { nom: "Dénia",      cx: 224.3, cy: 340.2 },
      { nom: "Alcoi",      cx: 150.1, cy: 363.5 },
      { nom: "Benidorm",   cx: 193.9, cy: 389.1 },
      { nom: "Torrevieja", cx: 123.7, cy: 482.2 },
      { nom: "Petrer",     cx: 112.0, cy: 400.3 },
    ],
  },
];

export function ValenciaMap({ lang }: { lang: string }) {
  const [selected, setSelected] = useState<ProvId | null>(null);
  const [tooltip, setTooltip] = useState<{ nom: string; x: number; y: number } | null>(null);

  const selectedProv = selected
    ? (PROVINCIES.find((p) => p.id === selected) ?? null)
    : null;

  const toggle = (id: ProvId) => setSelected((s) => (s === id ? null : id));

  const fillOpacity = (p: Provincia) => {
    if (selected === p.id) return 0.92;
    if (selected) return 0.2;
    return 0.78;
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start">
      {/* ── SVG Map ──────────────────────────────────────────────── */}
      <div className="w-full xl:w-96 flex-shrink-0">
        <div className="relative select-none">
          <svg
            viewBox="0 0 290 520"
            className="w-full max-w-[380px] mx-auto drop-shadow-md"
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
                  style={{
                    cursor: "pointer",
                    transition: "fill-opacity 0.18s ease",
                    filter: selected === p.id ? "brightness(1.08)" : "none",
                  }}
                  onClick={() => toggle(p.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={lang === "es" ? p.nomEs : p.nom}
                  onKeyDown={(e) => e.key === "Enter" && toggle(p.id)}
                />
                {/* Province label */}
                <text
                  x={p.labelX}
                  y={p.labelY}
                  textAnchor="middle"
                  style={{
                    fill: "white",
                    fontSize: "11px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    pointerEvents: "none",
                    paintOrder: "stroke",
                    stroke: p.color,
                    strokeWidth: "3px",
                    strokeOpacity: fillOpacity(p) * 0.7,
                    fillOpacity: Math.min(fillOpacity(p) * 1.4, 1),
                  }}
                >
                  {(lang === "es" ? p.nomEs : p.nom).toUpperCase()}
                </text>
              </g>
            ))}

            {/* City markers */}
            {PROVINCIES.map((p) =>
              p.markers.map((m) => {
                const visible = !selected || selected === p.id;
                return (
                  <g
                    key={`${p.id}-${m.nom}`}
                    opacity={visible ? 1 : 0.15}
                    style={{ transition: "opacity 0.18s", cursor: "default" }}
                    onMouseEnter={() => setTooltip({ nom: m.nom, x: m.cx, y: m.cy })}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <circle cx={m.cx} cy={m.cy} r="5" fill="white" opacity={0.9} />
                    <circle cx={m.cx} cy={m.cy} r="3" fill={p.color} />
                  </g>
                );
              })
            )}

            {/* Hover tooltip */}
            {tooltip && (() => {
              const w = tooltip.nom.length * 5.6 + 12;
              const tx = Math.min(Math.max(tooltip.x - w / 2, 2), 288 - w);
              return (
                <g style={{ pointerEvents: "none" }}>
                  <rect x={tx} y={tooltip.y - 26} width={w} height={16} rx="3" fill="#1A1A1A" opacity={0.85} />
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
                onClick={() => toggle(p.id)}
                className="px-3 py-1 rounded-full text-[11px] font-display font-bold tracking-wide transition-all"
                style={{
                  backgroundColor: active ? p.color : `${p.color}28`,
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

        <p className="text-center text-[11px] text-muted-foreground mt-2 font-light">
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
          <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border p-10">
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
