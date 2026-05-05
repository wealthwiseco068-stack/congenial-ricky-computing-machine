import { useRef, useState } from 'react';

const STARS = '★★★★★';

const ALL_TESTIMONIALS = [
  { name: "Grace Wanjiku", loc: "Nairobi, Karen", svc: "Interior Design", quote: "Ricky transformed our living room beyond what I imagined. The attention to detail was extraordinary — every element felt intentional." },
  { name: "David Kamau", loc: "Kiambu", svc: "Gypsum Ceilings", quote: "Professional, punctual, and precise. My ceiling is the first thing every guest comments on. Worth every shilling." },
  { name: "Faith Njeri", loc: "Kitengela", svc: "Kitchen Design", quote: "Our kitchen went from functional to stunning. The team worked neatly, finished on time, and cleaned up completely. Highly recommend." },
  { name: "Samuel Otieno", loc: "Kisumu", svc: "Bedroom & Wardrobes", quote: "The built-in wardrobe system they designed for us uses every inch perfectly. My wife and I are both amazed at how much space we gained." },
  { name: "Anne Muthoni", loc: "Nakuru", svc: "Bathroom Renovation", quote: "I asked for a luxury spa bathroom and that's exactly what I received. The marble work and fixtures are impeccable." },
  { name: "Peter Njoroge", loc: "Thika", svc: "TV Feature Wall", quote: "The feature wall they built is the centrepiece of our home. LED lighting, timber panels, marble insert — absolutely premium." },
  { name: "Lucy Achieng", loc: "Nairobi, Westlands", svc: "Full Fit-Out", quote: "From bare concrete to a fully furnished home in 6 weeks. The pace and quality were both impressive. Will definitely call them again." },
  { name: "James Mwangi", loc: "Machakos", svc: "Cabro Paving", quote: "Our driveway and perimeter path look incredible. The pattern they chose was perfect for our home's style. Solid workmanship." },
  { name: "Esther Wambua", loc: "Nairobi, Ruaka", svc: "Gypsum Ceilings", quote: "Three rooms done in record time without any disruption to our daily life. The ceilings have completely elevated the home's feel." },
  { name: "Charles Njeru", loc: "Embu", svc: "Interior Design", quote: "I gave them a rough idea and they delivered something far more beautiful than I described. Truly gifted designers." },
  { name: "Mary Waweru", loc: "Nairobi, Lavington", svc: "Kitchen Design", quote: "The kitchen island they designed is a dream. My friends keep asking for the designer's contacts. Very talented team." },
  { name: "Daniel Kipchoge", loc: "Eldoret", svc: "Bedroom & Wardrobes", quote: "Flew them in from Nairobi and it was worth every cent. Incredible craft, polite team, zero stress." },
];

const TOTAL_COUNT = "1,000+";
const VISIBLE = ALL_TESTIMONIALS.slice(0, 6);
const REST = ALL_TESTIMONIALS.slice(6);

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft ?? 0));
    setScrollLeft(trackRef.current?.scrollLeft ?? 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };
  const stopDrag = () => setIsDragging(false);

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-primary tracking-widest uppercase text-sm font-medium mb-4 block">Client Reviews</span>
            <h2 className="font-serif text-4xl md:text-6xl text-foreground">Over {TOTAL_COUNT} homeowners<br />trust us.</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-primary text-2xl">{STARS}</span>
            <div>
              <p className="font-bold text-foreground text-sm">{TOTAL_COUNT} verified reviews</p>
              <p className="text-muted-foreground text-xs">5.0 average · across Kenya</p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-end">
          <svg className="w-5 h-5 text-muted-foreground mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          <span className="text-xs text-muted-foreground uppercase tracking-widest mr-2">Drag to browse</span>
          <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
        </div>

        <div ref={trackRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth select-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: isDragging ? 'grabbing' : 'grab' }} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
          {VISIBLE.map((t, i) => <TestimonialCard key={i} t={t} />)}
          {!showAll && (
            <div className="flex-none w-64 snap-start bg-secondary border border-border flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300 group rounded-sm" onClick={() => setShowAll(true)}>
              <span className="font-serif text-5xl text-primary group-hover:text-primary-foreground mb-2">{TOTAL_COUNT}</span>
              <p className="text-sm font-medium mb-1">verified reviews</p>
              <p className="text-xs opacity-60 mb-6">across Kenya · 5.0 stars</p>
              <span className="text-xs uppercase tracking-widest border border-current px-4 py-2 group-hover:bg-primary-foreground group-hover:text-primary group-hover:border-primary-foreground transition-all">Read All Reviews</span>
            </div>
          )}
        </div>

        {showAll && (
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {REST.map((t, i) => <TestimonialCard key={i} t={t} compact />)}
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => { setShowAll(false); trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' }); }} className="text-xs uppercase tracking-widest border border-border px-6 py-2.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                Collapse reviews
              </button>
            </div>
          </div>
        )}

        <div className="mt-14 text-center">
          <a href={`https://wa.me/254729714252?text=${encodeURIComponent("Hi Ricky, I'd like a free consultation for my home.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 font-medium text-sm uppercase tracking-widest hover:opacity-90 transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Join over 1,000 satisfied clients
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, compact }: { t: typeof ALL_TESTIMONIALS[0]; compact?: boolean }) {
  return (
    <div className={`flex-none snap-start bg-secondary border border-border flex flex-col rounded-sm ${compact ? 'p-6' : 'p-8 md:p-9 w-[85vw] md:w-[480px]'}`}>
      <div className="text-primary text-sm tracking-widest mb-3">{STARS}</div>
      <svg className="w-6 h-6 text-primary mb-4 opacity-60 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
      <p className={`font-serif leading-relaxed text-foreground/85 flex-1 ${compact ? 'text-base mb-5' : 'text-lg md:text-xl mb-7'}`}>"{t.quote}"</p>
      <div className="flex items-end justify-between pt-4 border-t border-border">
        <div>
          <p className="font-bold text-xs tracking-wide uppercase text-foreground">{t.name}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{t.loc}</p>
        </div>
        <span className="text-[9px] uppercase tracking-widest text-primary border border-primary/30 px-2 py-1 shrink-0 ml-2">{t.svc}</span>
      </div>
    </div>
  );
}
