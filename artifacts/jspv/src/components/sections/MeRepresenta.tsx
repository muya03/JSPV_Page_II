import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type InstitutionType = "Les Corts" | "Ajuntaments" | "Diputacions";
type Province = "València" | "Alacant" | "Castelló";

interface Representative {
  name: string;
  role: string;
  inst: string;
  prov: Province;
  type: InstitutionType;
}

const representatives: Representative[] = [
  { name: "Laia García",     role: "Regidora d'Igualtat",        inst: "Ajuntament de Burjassot",      prov: "València", type: "Ajuntaments" },
  { name: "Marc Ribera",     role: "Diputat provincial",          inst: "Diputació de València",        prov: "València", type: "Diputacions" },
  { name: "Júlia Navarro",   role: "Regidora de Joventut",        inst: "Ajuntament d'Alacant",         prov: "Alacant",  type: "Ajuntaments" },
  { name: "Sergi Palau",     role: "Regidor de Medi Ambient",     inst: "Ajuntament de Castelló",       prov: "Castelló", type: "Ajuntaments" },
  { name: "Noa Ferrer",      role: "Diputada",                    inst: "Les Corts Valencianes",        prov: "València", type: "Les Corts"   },
  { name: "Àlex Molina",     role: "Regidor d'Habitatge",         inst: "Ajuntament de Gandia",         prov: "València", type: "Ajuntaments" },
  { name: "Isabel Vidal",    role: "Regidora d'Educació",         inst: "Ajuntament d'Elx",             prov: "Alacant",  type: "Ajuntaments" },
  { name: "Pau Soler",       role: "Diputat provincial",          inst: "Diputació d'Alacant",          prov: "Alacant",  type: "Diputacions" },
  { name: "Marta Climent",   role: "Regidora de Cultura",         inst: "Ajuntament de Vila-real",      prov: "Castelló", type: "Ajuntaments" },
  { name: "Dani Torres",     role: "Diputat",                     inst: "Les Corts Valencianes",        prov: "Castelló", type: "Les Corts"   },
  { name: "Laura Pons",      role: "Regidora de Serveis Socials", inst: "Ajuntament de Torrent",        prov: "València", type: "Ajuntaments" },
  { name: "Carles Miralles", role: "Regidor d'Esports",           inst: "Ajuntament de Sagunt",         prov: "València", type: "Ajuntaments" },
  { name: "Rosa Fullana",    role: "Diputada provincial",         inst: "Diputació de Castelló",        prov: "Castelló", type: "Diputacions" },
  { name: "Oriol Sanz",      role: "Diputat",                     inst: "Les Corts Valencianes",        prov: "Alacant",  type: "Les Corts"   },
];

const PROVINCES: Province[] = ["València", "Alacant", "Castelló"];
const INSTITUTIONS: InstitutionType[] = ["Les Corts", "Ajuntaments", "Diputacions"];

export function MeRepresenta() {
  const [activeProv, setActiveProv] = useState<Province | null>(null);
  const [activeInst, setActiveInst] = useState<InstitutionType | null>(null);

  const filtered = representatives.filter(rep => {
    const provMatch = activeProv === null || rep.prov === activeProv;
    const instMatch = activeInst === null || rep.type === activeInst;
    return provMatch && instMatch;
  });

  const filterBtn = (active: boolean) =>
    `px-5 py-2 rounded-full font-montserrat font-bold text-sm transition-all duration-200 ${
      active
        ? "bg-[#E30613] text-white shadow-md scale-105"
        : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
    }`;

  return (
    <section id="me-representa" className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-gray-900 mb-4">
            Em Representa
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            Joves Socialistes en les institucions valencianes
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400">Província</span>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveProv(null)}
                className={filterBtn(activeProv === null)}
                data-testid="filter-prov-all"
              >
                Totes
              </button>
              {PROVINCES.map(p => (
                <button
                  key={p}
                  onClick={() => setActiveProv(activeProv === p ? null : p)}
                  className={filterBtn(activeProv === p)}
                  data-testid={`filter-prov-${p}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:block w-px bg-gray-200 self-stretch" />

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400">Institució</span>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveInst(null)}
                className={filterBtn(activeInst === null)}
                data-testid="filter-inst-all"
              >
                Totes
              </button>
              {INSTITUTIONS.map(i => (
                <button
                  key={i}
                  onClick={() => setActiveInst(activeInst === i ? null : i)}
                  className={filterBtn(activeInst === i)}
                  data-testid={`filter-inst-${i}`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map((rep) => (
              <motion.div
                key={rep.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4 gap-2">
                  <h3 className="font-montserrat font-bold text-gray-900 text-base leading-tight">
                    {rep.name}
                  </h3>
                  <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider bg-gray-100 text-gray-500">
                    {rep.prov}
                  </span>
                </div>
                <p className="text-[#E30613] font-semibold text-sm mb-1">{rep.role}</p>
                <p className="text-gray-500 font-medium text-sm">{rep.inst}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 font-medium py-16"
          >
            Cap representant trobat per a aquesta selecció.
          </motion.p>
        )}
      </div>
    </section>
  );
}
