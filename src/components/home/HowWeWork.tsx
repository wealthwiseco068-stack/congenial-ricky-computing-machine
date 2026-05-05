import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'We visit your space, listen to your vision, and understand your budget. No pressure, no obligations.',
  },
  {
    num: '02',
    title: 'Design & Quote',
    desc: 'We present a clear design concept with an honest, itemised quote. No hidden costs.',
  },
  {
    num: '03',
    title: 'Craftsmanship',
    desc: 'Our team works to schedule. Clean, professional, accountable. You are updated at every stage.',
  },
  {
    num: '04',
    title: 'Your Reveal',
    desc: 'We hand over a finished space that exceeds what you imagined — then we stay on call.',
  },
];

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('.hww-item');
    els.forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, delay: (i % 2) * 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top bottom-=80', toggleActions: 'play none none reverse' }
      });
    });
  }, []);

  return (
    <section id="how-we-work" ref={sectionRef} className="py-24 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 hww-item">
          <span className="text-primary tracking-widest uppercase text-xs font-medium block mb-4">How We Work</span>
          <h2 className="font-serif text-4xl md:text-6xl text-foreground">
            Simple process.<br />
            <em className="text-primary">Exceptional results.</em>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-lg mx-auto text-sm leading-relaxed">
            From your first call to the final reveal — here is what working with Ricky Interiors looks like.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="hww-item group flex flex-col items-center text-center p-10 border border-border/30 bg-background hover:border-primary/40 transition-colors duration-500">
              <div className="w-16 h-16 rounded-full border border-primary/50 flex items-center justify-center mb-6 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                <span className="font-sans text-primary text-sm tracking-widest">{step.num}</span>
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center hww-item">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-all duration-300"
          >
            Start Your Project Today
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
