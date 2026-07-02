export default function SectionHeading({ index, kicker, children }) {
  return (
    <div className="mb-12 md:mb-18">
      <div
        data-reveal
        className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-dim"
      >
        <span className="text-gradient font-semibold">{index}</span>
        <span className="h-px w-10 bg-white/20" />
        {kicker}
      </div>
      <h2
        data-reveal
        data-delay="0.08"
        className="font-display display-tight text-[clamp(2.4rem,6vw,4.6rem)] font-semibold"
      >
        {children}
      </h2>
    </div>
  );
}
