import { motion } from "framer-motion";

const noticias = [
  {
    id: 1,
    title: "JSPV exigeix un parc públic d'habitatge: la vivenda és un dret, no un negoci",
    category: "Vivienda",
    date: "15 Jun 2026",
    excerpt: "Davant la crisi d'habitatge que expulsa als joves dels nostres barris, proposem mesures contundents per garantir l'emancipació.",
    featured: true,
    color: "from-gray-900 to-gray-800"
  },
  {
    id: 2,
    title: "En defensa de l'educació pública: No als retalls de la Conselleria",
    category: "Educació",
    date: "10 Jun 2026",
    excerpt: "No permetrem que l'educació pública valenciana patisca retalls. La igualtat d'oportunitats comença a les aules.",
    featured: false,
    color: "from-gray-800 to-gray-700"
  },
  {
    id: 3,
    title: "La resposta de la DANA: la generació de ferro que es va emplenar de fang",
    category: "Emergències",
    date: "2 Jun 2026",
    excerpt: "Quan altres van fugir, la joventut valenciana va estar en primera línia ajudant als pobles afectats.",
    featured: false,
    color: "from-[#1a0000] to-gray-900"
  },
  {
    id: 4,
    title: "XIV Congrés Nacional a Alcoi: nova executiva, nou impuls per al País Valencià",
    category: "Congrés",
    date: "7 Jun 2026",
    excerpt: "Marcos Durà és elegit Secretari General amb una executiva renovada per afrontar els reptes del futur.",
    featured: false,
    color: "from-red-950 to-gray-900"
  }
];

export function Actualidad() {
  return (
    <section id="actualidad" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-4"
        >
          <div className="w-2 h-10 bg-[#E30613]" />
          <h2 className="font-montserrat font-black text-4xl text-gray-900">
            Actualitat i Campanyes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {noticias.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer
                ${item.featured ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}
              `}
            >
              <div className={`h-32 md:h-48 w-full bg-gradient-to-br ${item.color} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#E30613] bg-red-50 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <time className="text-sm font-medium text-gray-500">{item.date}</time>
                </div>
                <h3 className={`font-montserrat font-bold text-gray-900 group-hover:text-[#E30613] transition-colors mb-3 leading-tight
                  ${item.featured ? "text-2xl md:text-3xl" : "text-xl"}
                `}>
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium mt-auto">
                  {item.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
