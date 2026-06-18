import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Actualidad } from "@/components/sections/Actualidad";
import { Historia } from "@/components/sections/Historia";
import { Equipo } from "@/components/sections/Equipo";
import { Valores } from "@/components/sections/Valores";
import { MeRepresenta } from "@/components/sections/MeRepresenta";
import { Afiliate } from "@/components/sections/Afiliate";
import { Footer } from "@/components/sections/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Actualidad />
        <Historia />
        <Equipo />
        <Valores />
        <MeRepresenta />
        <Afiliate />
      </main>
      <Footer />
    </div>
  );
}
