import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { asset } from '@/lib/assets';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const services = [
  "Gypsum Ceilings & Plasterwork","Full Interior Design & Fit-Out","TV & Feature Walls",
  "Kitchen Design & Installation","Bedrooms & Wardrobes","Bathroom Renovation","Cabro Paving & Landscaping",
];
const WHATSAPP_URL = `https://wa.me/254729714252?text=${encodeURIComponent("Hi Ricky, I'd like a free consultation for my home.")}`;

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 50) {
          navRef.current.classList.add('bg-background/95','backdrop-blur-md','shadow-sm');
          navRef.current.classList.remove('bg-transparent');
        } else {
          navRef.current.classList.remove('bg-background/95','backdrop-blur-md','shadow-sm');
          navRef.current.classList.add('bg-transparent');
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const closeAndGo = (href: string) => {
    setOpen(false);
    setTimeout(() => { const el = document.querySelector(href); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 300);
  };

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-4 px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src={asset('logo.jpg')} alt="Ricky Interiors Logo" className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm md:text-lg text-foreground uppercase tracking-wider leading-tight">Ricky Interiors</span>
            <span className="font-sans text-[10px] md:text-xs text-primary uppercase tracking-widest">Kitengela, Kenya</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide uppercase">
          <a href="#services" className="text-foreground/80 hover:text-primary transition-colors">Services</a>
          <a href="#portfolio" className="text-foreground/80 hover:text-primary transition-colors">Portfolio</a>
          <a href="#process" className="text-foreground/80 hover:text-primary transition-colors">Process</a>
          <ThemeToggle />
          <a href="#contact" className="px-6 py-2.5 bg-primary text-primary-foreground hover:opacity-90 transition-colors">Book Consultation</a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <a href="#contact" className="text-[11px] px-4 py-2 bg-primary text-primary-foreground uppercase tracking-wider font-medium">Book Now</a>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="flex flex-col justify-center items-center w-10 h-10 gap-1.5">
            <span className="block w-6 h-px bg-foreground transition-all" />
            <span className="block w-4 h-px bg-foreground transition-all" />
            <span className="block w-6 h-px bg-foreground transition-all" />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)} />

      <aside className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm z-[70] bg-background border-l border-border/30 flex flex-col transition-transform duration-350 ease-out md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/20">
          <span className="font-serif text-lg text-foreground">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <nav className="space-y-1 mb-8">
            {['#services','#portfolio','#process','#contact'].map((href) => (
              <button key={href} onClick={() => closeAndGo(href)} className="w-full text-left py-3 border-b border-border/15 text-sm uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors">
                {href.replace('#', '')}
              </button>
            ))}
          </nav>
          <div>
            <span className="text-primary text-[10px] uppercase tracking-[0.2em] block mb-4">Our Services</span>
            <ul className="space-y-3">
              {services.map((svc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary/50 font-serif text-sm mt-0.5 shrink-0">{String(i+1).padStart(2,'0')}</span>
                  <button onClick={() => closeAndGo('#services')} className="text-sm text-foreground/70 hover:text-primary transition-colors text-left leading-snug">{svc}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-6 py-6 border-t border-border/20 space-y-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-medium text-sm rounded-sm hover:bg-[#20bd5a] transition-colors" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
          <a href="#contact" onClick={() => setOpen(false)} className="flex items-center justify-center w-full py-3 border border-primary/40 text-primary text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">Book Free Consultation</a>
        </div>
      </aside>
    </>
  );
}
