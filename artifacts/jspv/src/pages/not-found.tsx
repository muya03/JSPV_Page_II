import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/seo";
import { NOT_FOUND_META } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  useSEO(NOT_FOUND_META);

  return (
    <Layout>
      <section className="bg-white">
        <div className="container-page py-24 md:py-32 text-center">
          <p className="font-display font-extrabold text-7xl sm:text-8xl text-primary leading-none">
            404
          </p>
          <h1 className="mt-6 font-display font-extrabold text-3xl sm:text-4xl text-foreground">
            Pàgina no trobada
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
            La pàgina que cerques no existeix o s'ha mogut. Torna a l'inici per a seguir navegant.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-md bg-primary text-primary-foreground font-display font-bold hover:bg-primary/90 transition-colors"
          >
            Tornar a l'inici
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
