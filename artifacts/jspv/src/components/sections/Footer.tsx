import { SiInstagram, SiX } from "react-icons/si";

export function Footer() {
  return (
    <footer id="footer" className="bg-[#0a0a0a] text-white pt-20 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-[#E30613] rounded-sm"></div>
              <span className="font-montserrat font-black text-3xl tracking-tight text-white">
                JSPV
              </span>
            </div>
            <p className="text-gray-400 font-medium mb-8">
              La joventut socialista del País Valencià. Transformem el present, liderem el futur.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E30613] transition-colors" aria-label="Instagram">
                <SiInstagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E30613] transition-colors" aria-label="X (Twitter)">
                <SiX size={20} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 uppercase tracking-wider">Enllaços</h4>
            <ul className="space-y-4">
              <li><a href="#historia" className="text-gray-400 hover:text-[#E30613] transition-colors font-medium">Qui som</a></li>
              <li><a href="#actualidad" className="text-gray-400 hover:text-[#E30613] transition-colors font-medium">Actualitat</a></li>
              <li><a href="#valores" className="text-gray-400 hover:text-[#E30613] transition-colors font-medium">Valors</a></li>
              <li><a href="#me-representa" className="text-gray-400 hover:text-[#E30613] transition-colors font-medium">Em Representa</a></li>
              <li><a href="#afiliate" className="text-gray-400 hover:text-[#E30613] transition-colors font-medium">Afíliate</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 uppercase tracking-wider">Contacte</h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Nom" 
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E30613]"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E30613]"
              />
              <textarea 
                placeholder="Missatge" 
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E30613]"
              ></textarea>
              <button 
                className="bg-white/10 hover:bg-[#E30613] text-white font-bold py-2 px-6 rounded-md transition-colors w-full"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 uppercase tracking-wider">Institucional</h4>
            <div className="flex flex-col gap-4 mb-8">
              <span className="font-black text-gray-500 text-xl tracking-tighter">JSPV | JSE | PSPV-PSOE</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Política de Privacitat</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Avís Legal</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 Joves Socialistes del País Valencià · Tots els drets reservats</p>
          <p className="mt-2 md:mt-0">XIV Congrés Nacional — Alcoi</p>
        </div>
      </div>
    </footer>
  );
}
