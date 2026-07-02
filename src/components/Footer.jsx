import { profile } from "../data.js";
import Magnetic from "./Magnetic.jsx";

export default function Footer() {
  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
        <p className="text-sm text-dim">
          © {new Date().getFullYear()} {profile.name} · Designed & built with Flutter-grade polish
        </p>
        <div className="flex items-center gap-6">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-sm text-dim transition-colors hover:text-white">
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="text-sm text-dim transition-colors hover:text-white">
            LinkedIn
          </a>
          <Magnetic strength={0.3}>
            <button
              onClick={toTop}
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-sm transition-colors hover:border-flutter/40"
              aria-label="Back to top"
            >
              ↑
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
