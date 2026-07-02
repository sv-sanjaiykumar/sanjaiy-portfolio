import { useEffect, useRef, useState } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "../lib/gsap";

export default function CustomCursor() {
  const [enabled] = useState(() => isFinePointer() && !prefersReducedMotion());
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("app-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
    };

    const over = (e) => {
      const hot = e.target.closest("a, button, [role='button'], input, textarea, [data-cursor]");
      gsap.to(ring, { scale: hot ? 1.9 : 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      gsap.to(dot, { scale: hot ? 0.4 : 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
    };

    const leave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
    const down = () => gsap.to(ring, { scale: 0.8, duration: 0.2, overwrite: "auto" });
    const up = () => gsap.to(ring, { scale: 1, duration: 0.3, overwrite: "auto" });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("app-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-flutter to-violet opacity-0"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 opacity-0 mix-blend-difference"
      />
    </>
  );
}
