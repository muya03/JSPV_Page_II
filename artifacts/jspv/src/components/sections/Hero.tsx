import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-[#1a0000] to-[#0a0000]"
    >
      {/* Animated dark red overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E30613] via-transparent to-transparent"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-1.5 bg-[#E30613] mb-8 mx-auto"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-montserrat font-black text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-5xl mx-auto"
        >
          Transformem el present,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            liderem el futur
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed"
        >
          Som la generació que es va emplenar de fang per ajudar. Som la generació de ferro que no abandona. Ens toca liderar el canvi que el nostre País Valencià necessita.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-[#E30613] hover:bg-[#c20510] text-white font-montserrat font-bold text-lg h-14 px-8 rounded-md"
          >
            <a href="#afiliate">Uneix-te a JSPV</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white font-montserrat font-semibold text-lg h-14 px-8 rounded-md bg-transparent"
          >
            <a href="#actualidad">Coneix les campanyes</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
