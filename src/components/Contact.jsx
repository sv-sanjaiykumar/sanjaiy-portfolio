import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data.js";
import { useReveal } from "../hooks/useReveal.js";
import Magnetic from "./Magnetic.jsx";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-mist placeholder:text-dim/60 outline-none transition-colors duration-300 focus:border-flutter/50 focus:bg-white/[0.05]";

const buttonLabel = {
  idle: "Send message",
  sending: "Sending…",
  sent: "Sent — talk soon ✓",
  error: "Failed — email me instead",
};

export default function Contact() {
  const ref = useRef(null);
  const [status, setStatus] = useState("idle");
  useReveal(ref);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `Portfolio message from ${data.name}` }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      window.open(
        `mailto:${profile.email}?subject=Hello Sanjaiykumar&body=${encodeURIComponent(data.message || "")}`,
        "_self"
      );
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section ref={ref} id="contact" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <div data-reveal className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-dim">
        <span className="text-gradient font-semibold">07</span>
        <span className="h-px w-10 bg-white/20" />
        Contact
      </div>
      <h2
        data-reveal
        data-delay="0.08"
        className="font-display display-tight text-[clamp(2.8rem,8vw,6.5rem)] font-semibold"
      >
        Let's build something
        <br />
        <span className="text-gradient">people love to tap.</span>
      </h2>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
        <div data-reveal className="space-y-8">
          <p className="max-w-md text-lg leading-relaxed text-dim">
            Open to internships, freelance mobile projects, and good conversations about Flutter.
            My inbox is always open.
          </p>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 inline-block font-display text-xl font-medium transition-colors hover:text-flutter md:text-2xl"
            >
              {profile.email}
            </a>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">Phone</p>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="mt-2 inline-block font-display text-xl font-medium transition-colors hover:text-flutter md:text-2xl"
            >
              {profile.phone}
            </a>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              ["GitHub", profile.links.github],
              ["LinkedIn", profile.links.linkedin],
              ["LeetCode", profile.links.leetcode],
              ["HackerRank", profile.links.hackerrank],
              ["GFG", profile.links.gfg],
            ].map(([label, href]) => (
              <Magnetic key={label} strength={0.25}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-block rounded-full px-5 py-2.5 text-sm text-mist transition-colors duration-300 hover:border-flutter/40 hover:text-white"
                >
                  {label}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <form data-reveal data-delay="0.12" onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-7 md:p-9">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required name="name" type="text" placeholder="Your name" className={inputClass} aria-label="Your name" />
            <input required name="email" type="email" placeholder="Your email" className={inputClass} aria-label="Your email" />
          </div>
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Tell me about your idea…"
            className={`${inputClass} resize-none`}
            aria-label="Your message"
          />
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
            whileTap={{ scale: 0.97 }}
            className={`relative w-full overflow-hidden rounded-2xl py-4 font-medium transition-colors duration-500 ${
              status === "sent"
                ? "bg-emerald-400 text-ink"
                : status === "error"
                  ? "bg-rose-400 text-ink"
                  : "bg-gradient-to-r from-flutter to-violet text-ink"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={status}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="block"
              >
                {buttonLabel[status]}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </form>
      </div>
    </section>
  );
}
