import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "@assets/BANNER-WEB-2_1781811528519.jpg";
import banner2 from "@assets/2_1781811550015.png";
import banner3 from "@assets/3_1781811550015.png";
import banner4 from "@assets/ConVencer_1781818987849.png";

const SLIDES = [
  { src: banner1, alt: "Per fi! Per un finançament just" },
  { src: banner2, alt: "Una Nova Legislatura — Marcos Durà, JSPV" },
  { src: banner3, alt: "Joves Socialistes del País Valencià" },
  { src: banner4, alt: "ConVèncer — campanya JSPV" },
];

const AUTOPLAY_MS = 5000;

export function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => emblaApi?.scrollNext(), AUTOPLAY_MS);
  }, [emblaApi]);

  const scrollTo = useCallback(
    (i: number) => {
      emblaApi?.scrollTo(i);
      resetTimer();
    },
    [emblaApi, resetTimer],
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    resetTimer();
  }, [emblaApi, resetTimer]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    resetTimer();
  }, [emblaApi, resetTimer]);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", () => {
      if (timerRef.current) clearInterval(timerRef.current);
    });
    emblaApi.on("pointerUp", resetTimer);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  return (
    <section
      className="relative w-full bg-[#E30613]"
      aria-label="Banner principal JSPV"
    >
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide, i) => (
            <div key={i} className="flex-none w-full min-w-0">
              <img
                src={slide.src}
                alt={slide.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "sync" : "async"}
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fletxes de navegació */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Diapositiva anterior"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 text-white transition-colors"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Diapositiva següent"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 text-white transition-colors"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>

      {/* Indicadors */}
      {count > 1 && (
        <div
          className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10"
          role="tablist"
          aria-label="Diapositives"
        >
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`Diapositiva ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                i === selected
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
