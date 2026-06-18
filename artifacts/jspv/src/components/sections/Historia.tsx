import { motion } from "framer-motion";

const milestones = [
  { year: "1903", desc: "Tomás Meabe funda les Joventuts Socialistes a Erandio" },
  { year: "1939", desc: "Resistència a l'exili i la clandestinitat franquista" },
  { year: "1977", desc: "Reorganització democràtica en universitats i centres de treball" },
  { year: "1988", desc: "Constitució de les Joves Socialistes del País Valencià amb plena autonomia orgànica" },
  { year: "2026", desc: "XIV Congrés Nacional a Alcoi — nova etapa liderada per Marcos Durà" },
];

export function Historia() {
  return (
    <section id="historia" className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-gray-900 mb-6">
            La Nostra Història
          </h2>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 leading-snug max-w-3xl mx-auto border-l-4 border-[#E30613] pl-6 text-left italic">
            "Des de 1903, lluitant per la joventut. La nostra memòria és el motor del nostre futur."
          </blockquote>
        </motion.div>

        <div className="relative border-l-2 border-gray-200 ml-4 md:ml-8 pl-8 md:pl-12 py-4">
          {milestones.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-5 h-5 rounded-full border-4 border-white bg-[#E30613] shadow-sm"></div>
              
              <h3 className="font-montserrat font-black text-3xl text-gray-900 mb-2 tracking-tight">
                {item.year}
              </h3>
              <p className="text-lg text-gray-600 font-medium max-w-2xl">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
