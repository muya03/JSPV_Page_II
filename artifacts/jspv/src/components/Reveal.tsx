import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import anime from "animejs";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** translate distance in px (default 18) */
  y?: number;
  /** disable IntersectionObserver and animate on mount */
  immediate?: boolean;
  [key: string]: unknown;
}

/**
 * Sober entrance animation built on Anime.js.
 * Content renders fully visible by default (no-JS / crawler safe); on mount JS
 * applies the pre-animation state and then eases it in — no bounces, no overshoot.
 */
export function Reveal({
  children,
  as,
  className,
  delay = 0,
  y = 18,
  immediate = false,
  ...rest
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      return; // leave content in its natural, fully-visible state
    }

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.willChange = "opacity, transform";

    const run = () => {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [y, 0],
        duration: 620,
        delay,
        easing: "easeOutCubic",
        complete: () => {
          el.style.willChange = "auto";
          el.style.transform = "";
        },
      });
    };

    if (immediate) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, y, immediate]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
