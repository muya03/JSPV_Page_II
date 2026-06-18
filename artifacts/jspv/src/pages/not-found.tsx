import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { useT } from "@/i18n/context";

export default function NotFound() {
  const { t } = useT();

  useSEO({
    path: "/404",
    title: t.seo.notFound.title,
    description: t.seo.notFound.description,
  });

  return (
    <Layout>
      <section className="bg-white">
        <div className="container-page py-24 md:py-32 text-center">
          <p className="font-display font-extrabold text-7xl sm:text-8xl text-primary leading-none">
            404
          </p>
          <h1 className="mt-6 font-display font-extrabold text-3xl sm:text-4xl text-foreground">
            {t.notFound.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
            {t.notFound.desc}
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-md bg-primary text-primary-foreground font-display font-bold hover:bg-primary/90 transition-colors"
          >
            {t.notFound.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
