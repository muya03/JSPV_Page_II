import { motion } from "framer-motion";
import { Scale, Building2, Leaf, Users, Globe, Network, MapPin } from "lucide-react";

const valores = [
  {
    title: "Socialdemocràcia",
    icon: Scale,
    desc: "Defensa d'una societat justa i igualitària amb serveis públics de qualitat per a tothom.",
  },
  {
    title: "Republicanisme",
    icon: Building2,
    desc: "Compromís amb la sobirania popular i la separació entre Església i Estat.",
  },
  {
    title: "Ecologisme",
    icon: Leaf,
    desc: "La lluita contra el canvi climàtic és una prioritat inajornable per al nostre futur.",
  },
  {
    title: "Feminisme",
    icon: Users,
    desc: "La igualtat real entre dones i homes és un eix transversal de tota la nostra acció política.",
  },
  {
    title: "Europeisme",
    icon: Globe,
    desc: "Creiem en una Europa social, federal i democràtica que protegisca els drets de la ciutadania.",
  },
  {
    title: "Federalisme",
    icon: Network,
    desc: "Un estat federal que reconega la plurinacionalitat i garantisca la financiació justa per al País Valencià.",
  },
  {
    title: "Valencianisme",
    icon: MapPin,
    desc: "Defensa de l'autogovern, la llengua i la identitat valenciana des de la diversitat i el respecte.",
  },
];

export function Valores() {
  return (
    <section id="valores" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-gray-900 mb-4">
            Els Nostres Valors
          </h2>
          <div className="w-16 h-1.5 bg-[#E30613] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {valores.map((valor, index) => {
            const Icon = valor.icon;
            return (
              <motion.div
                key={valor.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md hover:border-[#E30613] hover:bg-red-50/30 transition-all duration-300
                  ${index === 6 ? "md:col-span-2 lg:col-span-3 xl:col-span-1" : ""}
                `}
              >
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-6 group-hover:bg-[#E30613] transition-colors">
                  <Icon className="text-[#E30613] group-hover:text-white transition-colors" size={24} />
                </div>
                <h3 className="font-montserrat font-bold text-gray-900 text-xl mb-3">
                  {valor.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                  {valor.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
