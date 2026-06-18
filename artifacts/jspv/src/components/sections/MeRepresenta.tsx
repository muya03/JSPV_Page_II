import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const representatives = [
  { name: "Laia García", role: "Regidora d'Igualtat", inst: "Ajuntament de Burjassot", prov: "Valencia", type: "Ajuntaments" },
  { name: "Marc Ribera", role: "Diputat provincial", inst: "Diputació de Valencia", prov: "Valencia", type: "Valencia" },
  { name: "Júlia Navarro", role: "Regidora de Joventut", inst: "Ajuntament d'Alacant", prov: "Alacant", type: "Ajuntaments" },
  { name: "Sergi Palau", role: "Regidor de Medi Ambient", inst: "Ajuntament de Castelló", prov: "Castelló", type: "Ajuntaments" },
  { name: "Noa Ferrer", role: "Diputada", inst: "Les Corts Valencianes", prov: "Valencia", type: "Les Corts" },
  { name: "Àlex Molina", role: "Regidor d'Habitatge", inst: "Ajuntament de Gandia", prov: "Valencia", type: "Ajuntaments" },
  { name: "Isabel Vidal", role: "Regidora d'Educació", inst: "Ajuntament d'Elx", prov: "Alacant", type: "Ajuntaments" },
  { name: "Pau Soler", role: "Diputat provincial", inst: "Diputació d'Alacant", prov: "Alacant", type: "Alacant" },
  { name: "Marta Climent", role: "Regidora de Cultura", inst: "Ajuntament de Vila-real", prov: "Castelló", type: "Ajuntaments" },
  { name: "Dani Torres", role: "Diputat", inst: "Les Corts Valencianes", prov: "Castelló", type: "Les Corts" },
  { name: "Laura Pons", role: "Regidora de Serveis Socials", inst: "Ajuntament de Torrent", prov: "Valencia", type: "Ajuntaments" },
  { name: "Carles Miralles", role: "Regidor d'Esports", inst: "Ajuntament de Sagunt", prov: "Valencia", type: "Ajuntaments" },
];

const filters = ["Tots", "València", "Alacant", "Castelló", "Les Corts", "Ajuntaments"];

export function MeRepresenta() {
  const [activeFilter, setActiveFilter] = useState("Tots");

  const filtered = representatives.filter(rep => {
    if (activeFilter === "Tots") return true;
    if (activeFilter === "València" && rep.prov === "Valencia") return true;
    if (activeFilter === "Alacant" && rep.prov === "Alacant") return true;
    if (activeFilter === "Castelló" && rep.prov === "Castelló") return true;
    if (activeFilter === "Les Corts" && rep.type === "Les Corts") return true;
    if (activeFilter === "Ajuntaments" && rep.type === "Ajuntaments") return true;
    return false;
  });

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

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-montserrat font-bold text-sm transition-all duration-200
                ${activeFilter === filter 
                  ? "bg-[#E30613] text-white shadow-md scale-105" 
                  : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
              data-testid={`filter-${filter}`}
            >
              {filter}
            </button>
          ))}
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
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-montserrat font-bold text-gray-900 text-lg">
                    {rep.name}
                  </h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider
                    ${rep.prov === "Valencia" ? "bg-orange-100 text-orange-800" : ""}
                    ${rep.prov === "Alacant" ? "bg-blue-100 text-blue-800" : ""}
                    ${rep.prov === "Castelló" ? "bg-green-100 text-green-800" : ""}
                  `}>
                    {rep.prov}
                  </span>
                </div>
                <p className="text-[#E30613] font-semibold text-sm mb-1">{rep.role}</p>
                <p className="text-gray-500 font-medium text-sm">{rep.inst}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
