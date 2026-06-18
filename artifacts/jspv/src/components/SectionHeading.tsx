import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const Title = as;
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <Title className="font-display font-extrabold text-foreground text-3xl sm:text-4xl leading-[1.1]">
        {title}
      </Title>
      {intro && (
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{intro}</p>
      )}
    </Reveal>
  );
}

/** Internal page hero band (title + subtitle) used on secondary pages. */
export function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  if (image) {
    return (
      <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden border-b border-border">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-[#1A1A1A]/50 to-transparent" />
        <div className="relative h-full container-page flex flex-col justify-end pb-10 md:pb-14">
          <Reveal>
            <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl leading-[1.05] max-w-4xl drop-shadow">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl drop-shadow">
                {subtitle}
              </p>
            )}
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border bg-white">
      <div className="container-page py-12 md:py-16">
        <Reveal>
          <h1 className="font-display font-extrabold text-foreground text-4xl sm:text-5xl leading-[1.05] max-w-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
