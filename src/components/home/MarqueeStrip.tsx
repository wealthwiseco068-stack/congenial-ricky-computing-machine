const items = [
  'Gypsum Ceilings',
  'Interior Fit-Outs',
  'Kitchen Design',
  'Bedroom & Wardrobes',
  'Bathroom Renovation',
  'TV Feature Walls',
  'Cabro Paving',
  'Landscape Design',
  'Nairobi · Kitengela · Eldoret',
  'Serving All of Kenya',
];

export function MarqueeStrip() {
  const repeated = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3.5 bg-primary text-primary-foreground select-none z-10">
      <div className="marquee-track flex whitespace-nowrap w-max">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5 text-[11px] uppercase tracking-[0.22em] font-medium">
            <span className="opacity-40 text-base leading-none">✦</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        .marquee-track {
          animation: marquee-scroll 38s linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
