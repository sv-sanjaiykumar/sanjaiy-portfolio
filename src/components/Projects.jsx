import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, isFinePointer, prefersReducedMotion } from "../lib/gsap";
import { projects } from "../data.js";
import { useReveal } from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  // Custom GSAP tilt — rotate toward the cursor, spring back on leave
  useGSAP(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const card = cardRef.current;
    const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
    gsap.set(card, { transformPerspective: 900 });

    const move = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * 10);
      rx(-py * 10);
    };
    const enter = () => gsap.to(card, { scale: 1.02, duration: 0.4, ease: "power3.out" });
    const leave = () => {
      rx(0);
      ry(0);
      gsap.to(card, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    };
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mousemove", move);
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="proj-card glass group relative flex h-[460px] w-[85vw] max-w-[440px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl p-8 will-change-transform md:h-[500px] md:w-[440px]"
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.14] blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: project.accent }}
      />
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-dim">0{index + 1}</span>
          <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-dim">
            {project.year}
          </span>
        </div>
        <h3 className="mt-8 font-display text-4xl font-semibold display-tight md:text-[2.6rem]">
          {project.title}
        </h3>
        <p className="mt-5 leading-relaxed text-dim">{project.blurb}</p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-mist">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-6 border-t border-line pt-5 text-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-mist transition-colors hover:text-flutter"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          {project.app && (
            <a
              href={project.app}
              target="_blank"
              rel="noreferrer"
              className="text-mist transition-colors hover:text-flutter"
            >
              Download APK <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  useReveal(sectionRef);

  // Desktop: pin the section and scrub the track horizontally.
  // Mobile / reduced motion: native swipe rail with scroll-snap.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const amount = () => track.scrollWidth - window.innerWidth * 0.88;
        gsap.to(track, {
          x: () => -amount(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + amount(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current)
                progressRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden">
      <div className="flex flex-col justify-center py-28 md:h-screen md:py-0">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <div className="flex items-end justify-between">
            <SectionHeading index="04" kicker="Selected Work">
              Things I've <span className="text-gradient">built</span>
            </SectionHeading>
            <div className="mb-12 hidden w-40 md:mb-18 md:block">
              <p className="mb-2 text-right font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
                scroll →
              </p>
              <div className="h-px w-full overflow-hidden bg-white/10">
                <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-flutter to-violet" />
              </div>
            </div>
          </div>
        </div>

        <div className="no-scrollbar snap-x snap-mandatory overflow-x-auto md:snap-none md:overflow-visible">
          <div ref={trackRef} className="flex w-max gap-6 px-5 md:gap-8 md:px-[6vw]">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
            <div className="hidden w-[10vw] shrink-0 md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
