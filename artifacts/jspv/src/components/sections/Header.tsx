import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Qui som", href: "#historia" },
    { name: "Actualitat", href: "#actualidad" },
    { name: "Valors", href: "#valores" },
    { name: "Em Representa", href: "#me-representa" },
    { name: "Contacte", href: "#footer" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3" : "bg-white border-b border-gray-100 py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group" aria-label="JSPV Home">
          <div className="w-2 h-8 bg-[#E30613] rounded-sm group-hover:scale-y-110 transition-transform"></div>
          <span className="font-montserrat font-black text-2xl tracking-tight text-[#E30613]">
            JSPV
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-[#E30613] transition-colors"
              aria-label={`Go to ${link.name}`}
            >
              {link.name}
            </a>
          ))}
          <Button
            asChild
            className="bg-[#E30613] hover:bg-[#c20510] text-white font-montserrat font-bold"
            data-testid="button-nav-afiliate"
          >
            <a href="#afiliate">Afíliate</a>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md py-4 flex flex-col px-4 gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button
            asChild
            className="bg-[#E30613] hover:bg-[#c20510] text-white font-montserrat font-bold w-full mt-2"
          >
            <a href="#afiliate" onClick={() => setMobileMenuOpen(false)}>
              Afíliate
            </a>
          </Button>
        </motion.nav>
      )}
    </header>
  );
}
