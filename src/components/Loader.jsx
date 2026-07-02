import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function Loader({ onDone }) {
  const rootRef = useRef(null);
  const numRef = useRef(null);
  const barRef = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      onDone();
      return;
    }
    const state = { v: 0 };
    const tl = gsap.timeline({ paused: true, onComplete: onDone });
    tl.to(".loader-word", {
      yPercent: 0,
      autoAlpha: 1,
      stagger: 0.08,
      duration: 0.7,
      ease: "power3.out",
    })
      .to(
        state,
        {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (numRef.current)
              numRef.current.textContent = String(Math.round(state.v)).padStart(2, "0");
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${state.v / 100})`;
          },
        },
        "<0.2"
      )
      .to(".loader-word", { yPercent: -120, duration: 0.5, ease: "power3.in", stagger: 0.05 }, "+=0.15")
      .to(".loader-meta", { autoAlpha: 0, duration: 0.3 }, "<")
      .to(rootRef.current, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "-=0.2");

    // Wait for webfonts so the hero SplitText measures the real glyphs
    let started = false;
    const start = () => {
      if (!started) {
        started = true;
        tl.play();
      }
    };
    document.fonts?.ready?.then(start);
    const fallback = setTimeout(start, 2200);
    return () => clearTimeout(fallback);
  }, { scope: rootRef });

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink">
      <div className="flex overflow-hidden font-display text-[clamp(2rem,6vw,4.5rem)] font-semibold display-tight">
        {["Sanjaiy", "kumar", " S V"].map((w, i) => (
          <span key={i} className="loader-word translate-y-[120%] opacity-0">
            {i === 2 ? <span className="text-gradient">{w}</span> : w}
          </span>
        ))}
      </div>
      <div className="loader-meta mt-8 flex w-[min(320px,70vw)] items-center gap-4">
        <div className="h-px flex-1 overflow-hidden bg-white/10">
          <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-flutter to-violet" />
        </div>
        <span ref={numRef} className="w-8 text-right font-mono text-xs text-dim">00</span>
      </div>
    </div>
  );
}
