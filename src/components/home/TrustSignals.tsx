const signals = [
  { num: "8+",   label: "Years in business" },
  { num: "50+",  label: "Homes transformed" },
  { num: "100%", label: "Satisfaction guaranteed" },
  { num: "KE",   label: "Serving all of Kenya" },
];

export function TrustSignals() {
  return (
    <section className="py-14 bg-secondary border-y border-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {signals.map((s, i) => (
          <div key={i} className="text-center">
            <p className="font-serif text-3xl md:text-4xl text-primary mb-1">{s.num}</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
