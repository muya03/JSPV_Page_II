import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip } from "react-leaflet";
import { MapPin } from "lucide-react";
import type { Feature, Polygon } from "geojson";

type ProvId = "castello" | "valencia" | "alacant";
interface Seccio { nom: string; comarca: string; }
interface Marker { nom: string; lat: number; lng: number; }

// GeoJSON coordinates [lng, lat] — extracted from official Spain provinces dataset
const CASTELLO_RING: [number, number][] = [[-0.16496,40.78863],[-0.14453,40.78544],[-0.12684,40.75332],[-0.0647,40.72741],[0.01574,40.72843],[0.02644,40.69495],[0.04217,40.69101],[0.1125,40.72714],[0.14392,40.71825],[0.22612,40.73316],[0.23652,40.70168],[0.26243,40.70585],[0.29184,40.68855],[0.26783,40.659],[0.27883,40.63006],[0.40196,40.60238],[0.44394,40.57822],[0.43796,40.54706],[0.51316,40.51601],[0.41783,40.40059],[0.40845,40.35735],[0.27836,40.24415],[0.264,40.20855],[0.19051,40.17043],[0.14755,40.08291],[0.04967,40.03544],[-0.00516,39.91517],[-0.06699,39.85736],[-0.08887,39.85398],[-0.18827,39.72191],[-0.26418,39.7455],[-0.27653,39.77054],[-0.32826,39.80148],[-0.37792,39.79988],[-0.39609,39.75861],[-0.45618,39.7147],[-0.53059,39.79598],[-0.57705,39.7732],[-0.58822,39.74169],[-0.65235,39.75408],[-0.65615,39.83596],[-0.69111,39.85246],[-0.71255,39.81685],[-0.73046,39.81483],[-0.77356,39.8698],[-0.8329,39.911],[-0.8463,39.9477],[-0.83794,39.97655],[-0.77765,39.99841],[-0.75362,40.04661],[-0.68294,40.04422],[-0.62722,40.0762],[-0.61359,40.07001],[-0.62853,40.10258],[-0.57864,40.13734],[-0.54419,40.25166],[-0.49451,40.22873],[-0.42807,40.2438],[-0.38363,40.26485],[-0.40041,40.29485],[-0.38864,40.30694],[-0.36627,40.30505],[-0.34062,40.33999],[-0.28203,40.36529],[-0.28524,40.38632],[-0.34736,40.44394],[-0.27264,40.47376],[-0.27764,40.50153],[-0.30184,40.5154],[-0.29329,40.61104],[-0.37048,40.61359],[-0.38113,40.66423],[-0.32882,40.68028],[-0.307,40.6595],[-0.23599,40.69111],[-0.22403,40.75416],[-0.19718,40.78446],[-0.16496,40.78863]];

const VALENCIA_RING: [number, number][] = [[-0.98714,39.98072],[-0.91851,39.96267],[-0.90266,39.93185],[-0.91279,39.87305],[-0.88857,39.85211],[-0.86355,39.84741],[-0.79377,39.88143],[-0.73046,39.81483],[-0.71255,39.81685],[-0.69111,39.85246],[-0.65615,39.83596],[-0.65235,39.75408],[-0.63586,39.74787],[-0.58822,39.74169],[-0.57705,39.7732],[-0.53059,39.79598],[-0.45618,39.7147],[-0.39609,39.75861],[-0.37792,39.79988],[-0.32826,39.80148],[-0.27653,39.77054],[-0.26418,39.7455],[-0.1885,39.72194],[-0.20815,39.6433],[-0.21574,39.65512],[-0.25433,39.62082],[-0.31596,39.52344],[-0.32126,39.4634],[-0.30197,39.44931],[-0.30213,39.43418],[-0.32976,39.46159],[-0.31662,39.44334],[-0.3283,39.44443],[-0.33443,39.43366],[-0.3101,39.42802],[-0.33572,39.42469],[-0.27852,39.27848],[-0.21628,39.18634],[-0.23832,39.17671],[-0.23948,39.14692],[-0.20346,39.066],[-0.14429,38.99528],[-0.15629,38.99811],[-0.16114,38.99237],[-0.14678,38.99443],[-0.0274,38.8616],[-0.04215,38.85645],[-0.07062,38.88572],[-0.14808,38.85843],[-0.16083,38.88739],[-0.23054,38.85349],[-0.31081,38.88151],[-0.38144,38.8349],[-0.40339,38.83971],[-0.46188,38.80765],[-0.59522,38.7951],[-0.56564,38.75543],[-0.52963,38.76709],[-0.50711,38.74298],[-0.6287,38.68655],[-0.64344,38.72777],[-0.70719,38.73382],[-0.73493,38.75944],[-0.83462,38.73243],[-0.86169,38.77089],[-0.91322,38.76961],[-0.93385,38.79398],[-0.92454,38.89175],[-0.95652,38.92012],[-0.95941,38.94458],[-1.14665,38.92935],[-1.22654,39.02467],[-1.2639,39.04509],[-1.25572,39.10617],[-1.18083,39.21182],[-1.16189,39.30542],[-1.20791,39.32624],[-1.22333,39.31611],[-1.31274,39.34317],[-1.33665,39.334],[-1.41468,39.3803],[-1.42603,39.36276],[-1.43229,39.37758],[-1.4551,39.36085],[-1.44879,39.37819],[-1.46819,39.38333],[-1.45288,39.38374],[-1.45274,39.39867],[-1.47331,39.39115],[-1.47057,39.40751],[-1.48881,39.40165],[-1.48325,39.42246],[-1.49899,39.41536],[-1.49665,39.42932],[-1.52172,39.43268],[-1.52887,39.45527],[-1.51339,39.45827],[-1.51245,39.49627],[-1.49915,39.50045],[-1.5026,39.54562],[-1.52066,39.54997],[-1.46208,39.57662],[-1.41793,39.65494],[-1.36854,39.68962],[-1.31283,39.67048],[-1.2679,39.69115],[-1.27541,39.73864],[-1.215,39.80877],[-1.20004,39.85871],[-1.20398,39.94934],[-1.1424,39.97184],[-1.12175,39.96085],[-1.10502,39.97498],[-0.98714,39.98072]];

const ALACANT_RING: [number, number][] = [[-0.15968,38.88351],[-0.14808,38.85843],[-0.07062,38.88572],[-0.03468,38.85689],[-0.0248,38.87255],[-0.03751,38.88693],[0.01527,38.86379],[0.1258,38.8486],[0.1095,38.84553],[0.19752,38.80405],[0.18206,38.79385],[0.19024,38.77347],[0.22477,38.76428],[0.22165,38.75825],[0.224,38.74896],[0.23392,38.73693],[0.18241,38.72078],[0.14861,38.67926],[0.09846,38.67284],[0.07359,38.6447],[0.08386,38.63103],[0.05137,38.64131],[0.03055,38.62592],[-0.01588,38.62666],[-0.06174,38.58205],[-0.04958,38.56219],[-0.09756,38.52347],[-0.15198,38.53504],[-0.37501,38.44304],[-0.40457,38.40145],[-0.40384,38.35248],[-0.44426,38.36325],[-0.51063,38.3259],[-0.51371,38.19746],[-0.59527,38.18788],[-0.63085,38.14894],[-0.64764,37.99999],[-0.66598,37.97622],[-0.69674,37.96947],[-0.71983,37.91138],[-0.74906,37.89973],[-0.76239,37.84695],[-0.83191,37.86513],[-0.92119,37.94424],[-1.0226,38.07569],[-1.03676,38.13772],[-0.98855,38.19953],[-0.96768,38.27564],[-0.98915,38.32088],[-1.08438,38.34622],[-1.08806,38.36777],[-1.07721,38.43147],[-1.09416,38.43793],[-1.01364,38.49673],[-1.02606,38.52282],[-1.00157,38.57267],[-1.02693,38.65552],[-0.96247,38.65693],[-0.91579,38.69597],[-0.96143,38.77479],[-0.92894,38.78383],[-0.90499,38.76708],[-0.86169,38.77089],[-0.83462,38.73243],[-0.73493,38.75944],[-0.70719,38.73382],[-0.64403,38.72814],[-0.64247,38.70414],[-0.61805,38.68665],[-0.50711,38.74298],[-0.52963,38.76709],[-0.56564,38.75543],[-0.59129,38.79682],[-0.46188,38.80765],[-0.40339,38.83971],[-0.38144,38.8349],[-0.31081,38.88151],[-0.23054,38.85349],[-0.15968,38.88351]];

function makeFeature(ring: [number, number][], id: ProvId): Feature<Polygon> {
  return { type: "Feature", properties: { id }, geometry: { type: "Polygon", coordinates: [ring] } };
}

interface Provincia {
  id: ProvId;
  nom: string; nomEs: string; codi: string; color: string;
  feature: Feature<Polygon>;
  seccions: Seccio[];
  markers: Marker[];
}

const PROVINCIES: Provincia[] = [
  {
    id: "castello",
    nom: "Castelló", nomEs: "Castellón", codi: "FPC", color: "#8B0D18",
    feature: makeFeature(CASTELLO_RING, "castello"),
    seccions: [
      { nom: "Castelló capital", comarca: "La Plana Alta"    },
      { nom: "Vila-real",        comarca: "La Plana Baixa"   },
      { nom: "Borriana",         comarca: "La Plana Baixa"   },
      { nom: "Vinaròs",          comarca: "El Baix Maestrat" },
      { nom: "Almassora",        comarca: "La Plana Alta"    },
      { nom: "Benicàssim",       comarca: "La Plana Alta"    },
    ],
    markers: [
      { nom: "Castelló",   lat: 39.987, lng: -0.054 },
      { nom: "Vila-real",  lat: 39.934, lng: -0.100 },
      { nom: "Borriana",   lat: 39.886, lng: -0.073 },
      { nom: "Vinaròs",    lat: 40.469, lng:  0.474 },
      { nom: "Almassora",  lat: 39.956, lng: -0.057 },
      { nom: "Benicàssim", lat: 40.053, lng:  0.066 },
    ],
  },
  {
    id: "valencia",
    nom: "València", nomEs: "Valencia", codi: "FPV", color: "#C8000F",
    feature: makeFeature(VALENCIA_RING, "valencia"),
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
      { nom: "València",  lat: 39.470, lng: -0.376 },
      { nom: "Torrent",   lat: 39.437, lng: -0.467 },
      { nom: "Paterna",   lat: 39.503, lng: -0.441 },
      { nom: "Burjassot", lat: 39.511, lng: -0.413 },
      { nom: "Gandia",    lat: 38.971, lng: -0.183 },
      { nom: "Alzira",    lat: 39.153, lng: -0.430 },
      { nom: "Sagunt",    lat: 39.682, lng: -0.272 },
      { nom: "Sueca",     lat: 39.202, lng: -0.313 },
      { nom: "Ontinyent", lat: 38.822, lng: -0.607 },
    ],
  },
  {
    id: "alacant",
    nom: "Alacant", nomEs: "Alicante", codi: "FPA", color: "#A30010",
    feature: makeFeature(ALACANT_RING, "alacant"),
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
      { nom: "Alacant",    lat: 38.345, lng: -0.482 },
      { nom: "Elx",        lat: 38.264, lng: -0.707 },
      { nom: "Dénia",      lat: 38.839, lng:  0.106 },
      { nom: "Alcoi",      lat: 38.698, lng: -0.475 },
      { nom: "Benidorm",   lat: 38.543, lng: -0.132 },
      { nom: "Torrevieja", lat: 37.979, lng: -0.682 },
      { nom: "Petrer",     lat: 38.475, lng: -0.773 },
    ],
  },
];

export function ValenciaMap({ lang }: { lang: string }) {
  const [selected, setSelected] = useState<ProvId | null>(null);

  const selectedProv = selected
    ? (PROVINCIES.find((p) => p.id === selected) ?? null)
    : null;

  const toggle = (id: ProvId) =>
    setSelected((s) => (s === id ? null : id));

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start">
      {/* ── Map ──────────────────────────────────────────────────── */}
      <div className="w-full xl:w-[380px] flex-shrink-0">
        <div
          className="rounded-2xl overflow-hidden border border-border shadow-sm"
          style={{ height: 480 }}
        >
          <MapContainer
            center={[39.25, -0.45]}
            zoom={8}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
            zoomControl
          >
            {/* Light basemap tiles */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
              subdomains="abcd"
              maxZoom={20}
            />

            {/* Province overlays */}
            {PROVINCIES.map((p) => (
              <GeoJSON
                key={`${p.id}-${selected}`}
                data={p.feature}
                pathOptions={{
                  fillColor: p.color,
                  fillOpacity:
                    selected === p.id ? 0.82 : selected ? 0.22 : 0.6,
                  color: "white",
                  weight: 2,
                }}
                eventHandlers={{ click: () => toggle(p.id) }}
              />
            ))}

            {/* City markers */}
            {PROVINCIES.map((p) =>
              p.markers.map((m) => (
                <CircleMarker
                  key={`${p.id}-${m.nom}`}
                  center={[m.lat, m.lng]}
                  radius={5}
                  pathOptions={{
                    fillColor: "white",
                    fillOpacity: 0.95,
                    color: p.color,
                    weight: 2,
                    opacity:
                      !selected || selected === p.id ? 1 : 0.25,
                  }}
                >
                  <Tooltip
                    direction="top"
                    offset={[0, -8]}
                    opacity={0.92}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      {m.nom}
                    </span>
                  </Tooltip>
                </CircleMarker>
              ))
            )}
          </MapContainer>
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
          <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border p-10">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "#E3061312" }}
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
