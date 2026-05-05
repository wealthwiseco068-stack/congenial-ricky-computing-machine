import { useEffect, useRef } from 'react';
import { masterLoop } from '@/hooks/useMasterLoop';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/assets';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 160 }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      size: Math.random() * 2.2 + 0.4, speedY: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.1, baseOpacity: Math.random() * 0.5 + 0.1,
    }));

    const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    const getAccentRgb = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
      return v || '201, 168, 76';
    };

    const unsubscribe = masterLoop.subscribe(({ scrollY, delta }) => {
      ctx.clearRect(0, 0, width, height);
      const scrollFactor = scrollY * 0.05;
      const rgb = getAccentRgb();
      particles.forEach(p => {
        p.y -= (p.speedY + scrollFactor * p.speedY) * (delta * 60);
        p.x += p.speedX * (delta * 60);
        if (p.y < 0) { p.y = height; p.x = Math.random() * width; }
        const targetOpacity = p.baseOpacity + (scrollY > 10 ? Math.random() * 0.2 : 0);
        p.opacity += (targetOpacity - p.opacity) * 0.1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb}, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    const tl = gsap.timeline({ delay: 0.1 });
    if (titleRef.current) tl.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' });
    if (subRef.current) tl.fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.8');
    if (ctaRef.current) tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6');

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: true },
        y: 150, opacity: 0.4,
      });
    }

    return () => { unsubscribe(); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-background">
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url(${asset('hero-ceiling.jpg')})`, filter: 'brightness(0.55) contrast(1.1) saturate(1.0)' }} />
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none opacity-60 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10" />

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <span className="text-primary font-sans tracking-[0.25em] uppercase text-xs md:text-sm mb-5 block">
          Ricky Interiors · Kitengela, Kenya
        </span>
        <h1 ref={titleRef} className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground max-w-4xl leading-[1.05] mb-6">
          Your Home,<br /><span className="text-primary italic">Transformed.</span>
        </h1>
        <p ref={subRef} className="text-foreground/70 text-base md:text-lg max-w-lg mb-4 leading-relaxed">
          Premium gypsum ceilings · Bespoke interiors · Landscape & paving<br />
          <span className="text-primary/90">Crafted for Kenyan homes. Built to last a lifetime.</span>
        </p>
        <p className="text-foreground/65 text-xs uppercase tracking-[0.2em] mb-10">Serving Nairobi · Eldoret · All of Kenya</p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium uppercase tracking-widest text-sm hover:opacity-90 transition-all hover:scale-[1.03] duration-200">
            Get a Free Quote
          </a>
          <a href={`https://wa.me/254729714252?text=${encodeURIComponent("Hi Ricky, I'd like a free consultation for my home.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 border border-foreground/25 text-foreground/80 hover:border-primary hover:text-primary text-sm uppercase tracking-widest transition-all duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-foreground/30 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <svg className="w-4 h-4 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
      </div>
    </section>
  );
}
