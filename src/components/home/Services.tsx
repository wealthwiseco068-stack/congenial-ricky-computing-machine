import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/assets';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: "01", title: "Gypsum Ceilings & Plasterwork", desc: "Coffered trays, cove lighting channels, and ornate ceiling designs that instantly elevate the perceived value of any room.", img: asset('bedroom-3.jpg') },
  { num: "02", title: "Full Interior Design & Fit-Out", desc: "From bare slab to fully furnished space — we handle everything. One team, one quote, zero surprises.", img: asset('living-room-1.jpg') },
  { num: "03", title: "TV & Feature Walls", desc: "Statement entertainment units combining timber, stone, and ambient LED — the centrepiece your living room deserves.", img: asset('tv-wall-3.jpg') },
  { num: "04", title: "Kitchen Design & Installation", desc: "Functional, beautiful kitchens built around how you actually cook. Island units, integrated appliances, and clean-line cabinetry.", img: asset('kitchen-1.jpg') },
  { num: "05", title: "Bedrooms & Wardrobes", desc: "Bespoke fitted wardrobes and restful bedroom environments designed to maximise space without sacrificing style.", img: asset('bedroom-4.jpg') },
  { num: "06", title: "Bathroom Renovation", desc: "Spa-grade ensuites with marble finishes, frameless showers, and premium fixtures — your daily ritual reimagined.", img: asset('bathroom-2.jpg') },
  { num: "07", title: "Landscaping & Cabro Paving", desc: "Lush outdoor living spaces and precision-laid interlocking paving that make your compound as impressive as your interior.", img: asset('landscaping-1.jpg') },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.service-item');
    items.forEach((item) => {
      gsap.fromTo(item, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top bottom-=80', toggleActions: 'play none none reverse' }
      });
    });
  }, []);

  return (
    <section id="services" className="py-24 bg-secondary text-secondary-foreground" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-primary tracking-widest uppercase text-sm font-medium mb-4 block">Our Expertise</span>
          <h2 className="font-serif text-4xl md:text-6xl max-w-2xl leading-tight">Every room. Every detail. Done right.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {services.map((service, idx) => (
            <div key={idx} className="service-item group cursor-default">
              <div className="relative h-56 md:h-72 w-full mb-5 overflow-hidden rounded-md">
                <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img src={service.img} alt={service.title} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-primary font-sans text-sm mt-1 shrink-0">{service.num}</span>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <a href="#contact" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-all duration-300">
            Book a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
