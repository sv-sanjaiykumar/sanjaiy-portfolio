import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "../data.js";
import { scrollToId } from "../lib/gsap";
import Magnetic from "./Magnetic.jsx";

export default function Navbar({ ready }) {
  const [shrunk, setShrunk] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShrunk(window.scrollY > 48);
      // Active section = the one straddling the 35%-viewport line (pin-friendly)
      const probe = window.innerHeight * 0.35;
      let current = "";
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[90]"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-500 md:px-8 ${
          shrunk ? "mt-3" : "mt-0"
        }`}
      >
        <div
          className={`flex w-full items-center justify-between rounded-2xl px-4 transition-all duration-500 md:px-6 ${
            shrunk ? "glass-strong py-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.45)]" : "bg-transparent py-5"
          }`}
        >
          <button
            onClick={() => window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl font-semibold tracking-tight"
            aria-label="Back to top"
          >
            S<span className="text-gradient">V</span>.
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active === id ? "text-white" : "text-dim hover:text-white"
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              </li>
            ))}
            <li className="ml-2">
              <Magnetic strength={0.3}>
                <a
                  href={profile.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full bg-gradient-to-r from-flutter to-violet px-5 py-2 text-sm font-medium text-ink transition-transform duration-300 hover:scale-105"
                >
                  Resume
                </a>
              </Magnetic>
            </li>
          </ul>

          {/* Mobile burger */}
          <button
            className="relative z-[92] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`h-px w-6 bg-white transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[91] flex flex-col justify-center bg-ink/95 px-10 backdrop-blur-xl md:hidden"
          >
            {navLinks.map(({ id, label }, i) => (
              <motion.button
                key={id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => go(id)}
                className="py-3 text-left font-display text-4xl font-medium display-tight text-mist"
              >
                <span className="mr-4 font-mono text-sm text-dim">0{i + 1}</span>
                {label}
              </motion.button>
            ))}
            <motion.a
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.36, duration: 0.45 }}
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block w-fit rounded-full bg-gradient-to-r from-flutter to-violet px-8 py-3 font-medium text-ink"
            >
              Resume ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
