import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./lib/gsap";
import Loader from "./components/Loader.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import Background from "./components/Background.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Achievements from "./components/Achievements.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [ready, setReady] = useState(false);
  const lenisRef = useRef(null);

  // Buttery smooth scrolling — Lenis drives native scroll, GSAP ticker drives Lenis
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Freeze scroll while the loading screen plays
  useEffect(() => {
    if (!ready) {
      document.documentElement.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.documentElement.style.overflow = "";
      lenisRef.current?.start();
      ScrollTrigger.refresh();
    }
  }, [ready]);

  return (
    <div className="grain relative min-h-screen">
      {!ready && <Loader onDone={() => setReady(true)} />}
      <CustomCursor />
      <Background />
      <Navbar ready={ready} />
      <main>
        <Hero start={ready} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
