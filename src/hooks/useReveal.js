import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

/**
 * Scroll-reveals every [data-reveal] element inside the scoped ref.
 * Optional per-element tuning: data-delay="0.15", data-y="60".
 */
export function useReveal(scopeRef) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        scopeRef.current.querySelectorAll("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: parseFloat(el.dataset.y || 48), scale: 0.985 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
              delay: parseFloat(el.dataset.delay || 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        });
      });
    },
    { scope: scopeRef }
  );
}
