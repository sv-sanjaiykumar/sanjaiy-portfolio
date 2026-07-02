import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { skillGroups } from "../data.js";
import { useReveal } from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";

const marqueeItems = skillGroups.flatMap((g) => g.items);

export default function Skills() {
  const ref = useRef(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ref.current.querySelectorAll(".skill-card").forEach((card) => {
          const bar = card.querySelector(".skill-bar");
          const pills = card.querySelectorAll(".skill-pill");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          });
          tl.fromTo(
            bar,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.3, ease: "expo.out" }
          ).fromTo(
            pills,
            { autoAlpha: 0, y: 14, scale: 0.9 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.8)" },
            "-=0.9"
          );
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="skills" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="02" kicker="Skills">
          The <span className="text-gradient">toolkit</span>
        </SectionHeading>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <div
              key={group.label}
              data-reveal
              data-delay={String(gi * 0.06)}
              className="skill-card glass group rounded-3xl p-7 transition-colors duration-500 hover:border-flutter/30"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-medium">{group.label}</h3>
                <span className="font-mono text-xs text-dim">{group.level}%</span>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="skill-bar h-full origin-left rounded-full bg-gradient-to-r from-flutter to-violet"
                  style={{ width: `${group.level}%` }}
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="skill-pill rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-mist transition-colors duration-300 group-hover:border-white/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills marquee strip */}
      <div data-reveal className="mt-20 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium text-white/25">
              {item} <span className="text-gradient text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
