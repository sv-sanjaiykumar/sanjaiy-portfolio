import { useRef } from "react";
import { about, profile } from "../data.js";
import { useReveal } from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";

export default function About() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} id="about" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeading index="01" kicker="About">
        Apps that feel <span className="text-gradient">alive</span>
      </SectionHeading>

      <div className="grid gap-10 md:grid-cols-5 md:gap-14">
        <p data-reveal className="text-pretty text-lg leading-relaxed text-dim md:col-span-3 md:text-2xl md:leading-relaxed">
          {about.narrative}
        </p>

        <div data-reveal data-delay="0.15" className="glass rounded-3xl p-7 md:col-span-2 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">Education</p>
          <h3 className="mt-4 font-display text-xl font-medium leading-snug">{about.degree}</h3>
          <p className="mt-2 text-sm text-dim">{about.college}</p>
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
            <div>
              <p className="font-display text-3xl font-semibold text-gradient">{about.cgpa}</p>
              <p className="mt-1 text-xs text-dim">CGPA (to 6th sem)</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold">{about.years}</p>
              <p className="mt-1 text-xs text-dim">Batch</p>
            </div>
          </div>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-flutter transition-colors hover:text-white"
          >
            Connect on LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
