import { Suspense, lazy, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, prefersReducedMotion, scrollToId } from "../lib/gsap";
import { profile } from "../data.js";
import Magnetic from "./Magnetic.jsx";

const ParticleField = lazy(() => import("./ParticleField.jsx"));

const socials = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
];

export default function Hero({ start }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const roleRef = useRef(null);

  useGSAP(
    () => {
      if (!start) return;
      const q = gsap.utils.selector(sectionRef);

      if (prefersReducedMotion()) {
        gsap.set(q(".hero-in"), { opacity: 1, y: 0 });
        return;
      }

      // Char-split only the plain line — the gradient line animates as a masked
      // block, because background-clip:text doesn't survive SplitText's char divs
      const split = new SplitText(q(".hero-line-split"), { type: "chars" });
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.set(q(".hero-title"), { opacity: 1 })
        .from(split.chars, { yPercent: 115, duration: 1.15, stagger: 0.024 })
        .from(q(".hero-line-block"), { yPercent: 115, duration: 1.15 }, "-=0.95")
        .fromTo(
          q(".hero-in"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 },
          "-=0.7"
        );

      // Role cycling — slide the current role out, the next one in
      const roles = profile.roles;
      let i = 0;
      const cycle = () => {
        const el = roleRef.current;
        if (!el) return;
        i = (i + 1) % roles.length;
        gsap.to(el, {
          yPercent: -105,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            el.textContent = roles[i];
            gsap.fromTo(
              el,
              { yPercent: 105, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
          },
        });
      };
      const interval = setInterval(cycle, 2600);

      // Hero content drifts up + fades as you scroll past (parallax depth)
      gsap.to(contentRef.current, {
        yPercent: -14,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
        },
      });

      return () => clearInterval(interval);
    },
    { scope: sectionRef, dependencies: [start] }
  );

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-20 md:px-8">
        <p className="hero-in font-mono text-xs uppercase tracking-[0.35em] text-dim opacity-0">
          Mobile App Developer — {profile.location}
        </p>

        <h1 className="hero-title mt-6 font-display font-semibold display-tight opacity-0" aria-label={profile.name}>
          <span className="block overflow-hidden text-[clamp(3.2rem,11vw,9rem)]">
            <span className="hero-line-split block">Sanjaiykumar</span>
          </span>
          <span className="block overflow-hidden text-[clamp(3.2rem,11vw,9rem)]">
            <span className="hero-line-block text-gradient block">S V</span>
          </span>
        </h1>

        <div className="hero-in mt-8 flex items-baseline gap-3 text-lg text-dim opacity-0 md:text-2xl">
          <span className="shrink-0">I am a</span>
          <span className="block h-[1.6em] overflow-hidden">
            <span ref={roleRef} className="block font-display font-medium text-mist">
              {profile.roles[0]}
            </span>
          </span>
        </div>

        <div className="hero-in mt-12 flex flex-wrap items-center gap-4 opacity-0">
          <Magnetic strength={0.3}>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-gradient-to-r from-flutter to-violet px-8 py-3.5 font-medium text-ink shadow-[0_0_40px_rgba(69,193,255,0.25)] transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(139,92,246,0.4)]"
            >
              View Resume ↗
            </a>
          </Magnetic>
          {socials.map((s) => (
            <Magnetic key={s.label} strength={0.3}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="glass inline-block rounded-full px-6 py-3.5 text-sm text-mist transition-colors duration-300 hover:border-flutter/40 hover:text-white"
              >
                {s.label}
              </a>
            </Magnetic>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollToId("about")}
        className="hero-in absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim opacity-0 transition-colors hover:text-white"
        aria-label="Scroll to about section"
      >
        scroll
        <span className="mx-auto mt-2 block h-10 w-px animate-pulse bg-gradient-to-b from-flutter to-transparent" />
      </button>
    </section>
  );
}
