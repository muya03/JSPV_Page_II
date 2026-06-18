import { motion } from "framer-motion";

const executiva = [
  { name: "Marcos Durà Gimeno", role: "Secretari/a General" },
  { name: "Itziar Lafita Balaguer", role: "Organització" },
  { name: "Francisco José Hidalgo Vidal", role: "Presidència" },
  { name: "Leire Juan Checa", role: "Portavocía" },
  { name: "Iván López Sánchez", role: "Vicesec. Habitatge" },
  { name: "Rocío Vila Soriano", role: "Vicesec. Educació" },
  { name: "Héctor Giner González", role: "Vicesec. Municipalisme" },
  { name: "José Luis Bravo Josemaría", role: "Vicesec. Organització" },
  { name: "Rafael Coloma Francés", role: "Acció Política i Estratègia" },
  { name: "Pedro Sabaté Roca", role: "Administració" },
  { name: "María Márquez Bonmatí", role: "Igualtat" },
  { name: "Alejandro Ruiz Cortés", role: "LGTBIQ+" },
  { name: "Victoria Ferri Hernández", role: "Política Social i Inclusió" },
  { name: "Manel Agea Tur", role: "Política Lingüística" },
  { name: "Ariadna López Martínez", role: "Cultura i Tradicions" },
  { name: "Andrea Cantos Martínez", role: "Memòria Democràtica" },
  { name: "Irene Martínez Romero", role: "Política Institucional" },
  { name: "Mari Carmen Deltell", role: "Acció Republicana" },
  { name: "M. Carmen Marqueño Moreno", role: "Medi Ambient" },
  { name: "José Alejandro Bernabeu Martínez", role: "Sanitat i Salut Mental" },
  { name: "Pablo Luis Más Llopis", role: "Moviments Socials" },
  { name: "Tarek Berrakkad Lasri", role: "Migracions i Multiculturalitat" },
  { name: "Marc Tormo Varoch", role: "Formació i Nova Militància" },
  { name: "Arnau López Guitart", role: "Universitats" },
  { name: "Claudia Garcia Llopis", role: "Drets Laborals" },
  { name: "Maria Arastey Sanmartín", role: "Sindicalisme" },
  { name: "Abel Ortega Gastaldo", role: "Associacionisme" },
  { name: "Carolina Lucena García", role: "Esports" },
  { name: "Pau de la Resurrección Pérez", role: "Europeisme" },
  { name: "Mohamed Al Howaidi Nasralla", role: "Ciència i Innovació" },
  { name: "Adrián Campos Campillo", role: "Comunicació i Xarxes" },
];

function getInitials(name: string) {
  const parts = name.split(" ");
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

export function Equipo() {
  return (
    <section id="equipo" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-gray-900 mb-4">
            L'Executiva Nacional
          </h2>
          <p className="text-xl text-[#E30613] font-bold uppercase tracking-wider">
            XIV Congrés · Alcoi, Juny 2026
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {executiva.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 10) * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center flex flex-col items-center hover:border-gray-200 transition-colors"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-xl font-montserrat font-bold text-gray-500">
                {getInitials(member.name)}
              </div>
              <h3 className="font-montserrat font-bold text-gray-900 text-sm md:text-base mb-1">
                {member.name}
              </h3>
              <p className="text-xs md:text-sm text-[#E30613] font-medium leading-tight">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
