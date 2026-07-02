import { useRef } from "react";
import { certifications } from "../data.js";
import { useReveal } from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";

const platformColor = {
  Udemy: "#a435f0",
  Coursera: "#2a73ff",
  HackerRank: "#00ea64",
};

export default function Certifications() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} id="certifications" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeading index="06" kicker="Certifications">
        Proof of <span className="text-gradient">practice</span>
      </SectionHeading>

      <ul className="border-t border-line">
        {certifications.map((cert, i) => (
          <li key={cert.title} data-reveal data-delay={String(i * 0.05)} data-y="30">
            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-5 border-b border-line py-6 transition-all duration-300 hover:bg-white/[0.025] hover:pl-4 md:gap-8 md:py-7"
            >
              <span className="hidden font-mono text-sm text-dim md:block">0{i + 1}</span>
              <span className="flex-1 font-display text-lg font-medium leading-snug transition-colors duration-300 group-hover:text-white md:text-2xl">
                {cert.title}
              </span>
              <span className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-dim">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: platformColor[cert.platform] ?? "#45c1ff" }}
                />
                {cert.platform}
              </span>
              <span className="hidden shrink-0 font-mono text-sm text-dim sm:block">{cert.year}</span>
              <span
                className="shrink-0 text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-flutter"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
