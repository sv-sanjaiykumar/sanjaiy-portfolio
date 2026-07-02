import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { achievements } from "../data.js";
import { useReveal } from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";

function Counter({ value, suffix }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      ref.current.textContent = value;
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: value,
      duration: 2.2,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.v);
      },
    });
  }, []);

  return (
    <span className="font-display text-6xl font-semibold display-tight md:text-7xl">
      <span ref={ref}>0</span>
      <span className="text-gradient">{suffix}</span>
    </span>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} id="achievements" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeading index="05" kicker="Achievements">
        Problem-solving <span className="text-gradient">record</span>
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-3">
        {achievements.map((a, i) => (
          <a
            key={a.platform}
            href={a.link}
            target="_blank"
            rel="noreferrer"
            data-reveal
            data-delay={String(i * 0.08)}
            className="glass group rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-flutter/30"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">{a.platform}</p>
            <div className="mt-6">
              <Counter value={a.value} suffix={a.suffix} />
            </div>
            <p className="mt-2 text-sm text-dim">{a.label}</p>
            <p className="mt-6 border-t border-line pt-4 text-sm text-mist">
              {a.detail}
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
