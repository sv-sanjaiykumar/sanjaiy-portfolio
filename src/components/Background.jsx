import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "../lib/gsap";

/** Ambient gradient blobs + a cursor-follow spotlight, fixed behind everything. */
export default function Background() {
  const spotRef = useRef(null);
  const blobA = useRef(null);
  const blobB = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const tweens = [
      gsap.to(blobA.current, {
        xPercent: 18,
        yPercent: 26,
        scale: 1.15,
        duration: 16,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      }),
      gsap.to(blobB.current, {
        xPercent: -22,
        yPercent: -14,
        scale: 0.9,
        duration: 20,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      }),
    ];

    let off;
    if (isFinePointer()) {
      const xTo = gsap.quickTo(spotRef.current, "x", { duration: 1.1, ease: "power3.out" });
      const yTo = gsap.quickTo(spotRef.current, "y", { duration: 1.1, ease: "power3.out" });
      const move = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("mousemove", move);
      off = () => window.removeEventListener("mousemove", move);
    }
    return () => {
      tweens.forEach((t) => t.kill());
      off?.();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={blobA}
        className="absolute -left-[15%] -top-[20%] h-[60vmax] w-[60vmax] rounded-full opacity-[0.13]"
        style={{ background: "radial-gradient(circle, #45c1ff 0%, transparent 62%)" }}
      />
      <div
        ref={blobB}
        className="absolute -bottom-[25%] -right-[10%] h-[55vmax] w-[55vmax] rounded-full opacity-[0.13]"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 62%)" }}
      />
      <div
        ref={spotRef}
        className="absolute left-0 top-0 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #7aa8ff 0%, transparent 58%)" }}
      />
    </div>
  );
}
