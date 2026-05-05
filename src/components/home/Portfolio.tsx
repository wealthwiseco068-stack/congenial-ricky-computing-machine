import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/assets';

gsap.registerPlugin(ScrollTrigger);

type Category = 'All' | 'Interiors' | 'Kitchen' | 'Bedroom' | 'Bathroom' | 'Gypsum' | 'Landscape';

const TABS: Category[] = ['All', 'Interiors', 'Kitchen', 'Bedroom', 'Bathroom', 'Gypsum', 'Landscape'];

const images: { src: string; title: string; sub: string; location: string; cat: Category }[] = [
  { src: asset('bedroom-3.jpg'),     title: 'Lighted Ceiling Suite',     sub: 'Tray Ceiling · Ambient LED',           location: 'Nairobi',    cat: 'Gypsum' },
  { src: asset('living-room-1.jpg'), title: 'Open-Plan Living',          sub: 'Full Fit-Out · Stone & Timber',        location: 'Karen',      cat: 'Interiors' },
  { src: asset('wardrobe-1.jpg'),    title: 'Westlands Loft',            sub: 'Walk-In · Mirrored Sliding Doors',     location: 'Nairobi',    cat: 'Bedroom' },
  { src: asset('kitchen-2.jpg'),     title: 'Island Kitchen',            sub: 'Quartz Tops · Integrated Appliances',  location: 'Kiambu',     cat: 'Kitchen' },
  { src: asset('bedroom-4.jpg'),     title: 'Elgon View Estate',         sub: 'Master Suite · Upholstered Walls',     location: 'Eldoret',    cat: 'Bedroom' },
  { src: asset('bathroom-1.jpg'),    title: 'Spa Ensuite',               sub: 'Travertine Wash · Double Vanity',      location: 'Lavington',  cat: 'Bathroom' },
  { src: asset('landscaping-1.jpg'), title: 'Garden Terrace',            sub: 'Soft Landscaping · Feature Planting',  location: 'Kitengela',  cat: 'Landscape' },
  { src: asset('cabro-paving.png'),  title: 'Cabro Driveway',            sub: 'Interlocking Paving · Perimeter Path', location: 'Machakos',   cat: 'Landscape' },
  { src: asset('bathroom-2.jpg'),    title: 'Dark Marble Bathroom',      sub: 'Gold Fixtures · Freestanding Vanity',  location: 'Runda',      cat: 'Bathroom' },
  { src: asset('kitchen-1.jpg'),     title: 'Matte-Black Kitchen',       sub: 'Island · Pendant Lighting',            location: 'Westlands',  cat: 'Kitchen' },
  { src: asset('landscaping-2.jpg'), title: 'Lawn & Hedge Design',       sub: 'Bermuda Grass · Sculpted Hedges',      location: 'Ngong',      cat: 'Landscape' },
  { src: asset('ceiling-2.jpg'),     title: 'Coffered Statement Ceiling', sub: 'Gypsum Coffers · Cove Lighting',      location: 'Kileleshwa', cat: 'Gypsum' },
];

export function Portfolio() {
  const [active, setActive] = useState<Category>('All');
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = active === 'All' ? images : images.filter(img => img.cat === active);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top bottom-=100', toggleActions: 'play none none reverse' }
    });
  }, []);

  const handleTabChange = (tab: Category) => {
    if (tab === active || animating) return;
    setAnimating(true);
    if (gridRef.current) {
      gsap.to(gridRef.current.querySelectorAll('.p-card'), {
        opacity: 0, y: 16, duration: 0.22, stagger: 0.03, ease: 'power2.in',
        onComplete: () => { setActive(tab); setAnimating(false); }
      });
    } else {
      setActive(tab);
      setAnimating(false);
    }
  };

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.p-card');
    gsap.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.38, stagger: 0.06, ease: 'power2.out' });
  }, [active]);

  return (
    <section id="portfolio" className="py-24 bg-background relative z-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10">
          <span className="text-primary tracking-widest uppercase text-xs font-medium mb-3 block">Selected Works</span>
          <h2 className="font-serif text-4xl md:text-6xl text-foreground">Where craft<br /><em className="text-primary">becomes home.</em></h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={[
                'relative px-5 py-2 text-[11px] uppercase tracking-[0.18em] font-medium border transition-all duration-300',
                active === tab
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-foreground/60 border-border hover:border-primary/60 hover:text-foreground'
              ].join(' ')}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid - 2 columns like the dark gallery */}
        <div ref={gridRef} className="grid grid-cols-2 gap-2">
          {filtered.map((img, idx) => (
            <ProjectCard key={img.title + idx} img={img} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-all duration-300">
            Request a Quote
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ img }: { img: typeof images[0] }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div className="p-card group relative overflow-hidden rounded-sm aspect-square cursor-pointer" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
        style={{ background: 'radial-gradient(circle 300px at var(--mx,50%) var(--my,50%), rgba(255,220,130,0.18), transparent 70%)' }} />
      <img
        src={img.src}
        alt={img.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        style={{ filter: 'brightness(1.1) saturate(1.2) sepia(0.08)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 p-3 z-30">
        <h3 className="font-serif text-sm text-white leading-snug drop-shadow">{img.title}</h3>
        <span className="text-[9px] text-white/60 uppercase tracking-widest">{img.location}</span>
      </div>
    </div>
  );
}
