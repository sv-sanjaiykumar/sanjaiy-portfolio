import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { experience } from "../data.js";
import { useReveal } from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Experience() {
  const ref = useRef(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".timeline-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline",
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="experience" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeading index="03" kicker="Experience">
        Where I've <span className="text-gradient">shipped</span>
      </SectionHeading>

      <div className="timeline relative pl-8 md:pl-12">
        <div className="absolute left-[5px] top-0 h-full w-px bg-white/[0.08] md:left-[7px]" />
        <div className="timeline-line absolute left-[5px] top-0 h-full w-px origin-top bg-gradient-to-b from-flutter to-violet md:left-[7px]" />

        {experience.map((item) => (
          <article key={item.role} data-reveal className="relative pb-4">
            <span className="absolute -left-8 top-2 h-3 w-3 rounded-full bg-gradient-to-br from-flutter to-violet shadow-[0_0_16px_rgba(69,193,255,0.6)] md:-left-12 md:h-4 md:w-4" />
            <p className="font-mono text-xs tracking-[0.25em] text-dim">{item.year}</p>
            <h3 className="mt-3 font-display text-2xl font-medium md:text-4xl">{item.role}</h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-dim">{item.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-mist">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
