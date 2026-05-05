import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/assets';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { num: "01", title: "Speed Without Shortcuts", desc: "Eight years of repeat projects means we have solved every challenge before. We move fast because we know exactly what we are doing — not because we are cutting corners." },
  { num: "02", title: "Quality You Can Feel", desc: "Premium materials, trained craftsmen, no unskilled labour. You will know the difference the moment you open a cabinet door or look up at a finished ceiling." },
  { num: "03", title: "Reliability You Can Count On", desc: "Clear quotes. Honest timelines. A team that actually shows up. We understand what is at stake when someone trusts us with their home — and we earn that trust every single day." },
];

const values = [
  { title: "Honest Pricing", desc: "We quote once and we mean it. No hidden additions, no mid-project surprises, no material swaps without your sign-off.", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { title: "Master Craftsmanship", desc: "Every joint, tile, and gypsum curve is executed by hands that have done this hundreds of times. Precision is not a target — it is our minimum standard.", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
  { title: "Your Home, Our Respect", desc: "We treat your property as if it were our own — clean workspace, careful handling of your belongings, spotless handover when the job is done.", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg> },
  { title: "No Compromise on Quality", desc: "We do not accept 'good enough'. Every project is signed off against a standard we would be proud to put our name to permanently.", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg> },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('.anim-in');
    els.forEach((el, i) => {
      gsap.fromTo(el, { y: 35, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, delay: (i % 4) * 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top bottom-=80', toggleActions: 'play none none reverse' }
      });
    });
  }, []);

  return (
    <section id="process" className="bg-background" ref={sectionRef}>
      <div className="py-24 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="anim-in">
              <span className="text-primary tracking-widest uppercase text-sm font-medium mb-4 block">Why Ricky Interiors</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-tight mb-6">
                8 years of trust.<br /><span className="text-primary italic">One reputation we'd never risk.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">We built this business the slow way — one homeowner at a time, one referral at a time. Not through ads, but through results that speak for themselves.</p>
              <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg">We are not the cheapest option. We are the team that shows up on day one, keeps you informed throughout, and hands over a home that exceeds everything we promised.</p>
              <div className="space-y-7">
                {pillars.map((p, i) => (
                  <div key={i} className="flex gap-5 anim-in">
                    <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center shrink-0 text-primary font-sans text-xs tracking-widest">{p.num}</div>
                    <div>
                      <h3 className="font-serif text-xl text-foreground mb-1.5">{p.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="anim-in">
              <div className="grid grid-cols-2 gap-3 h-[580px]">
                <div className="rounded-md overflow-hidden"><img src={asset('kitchen-3.jpg')} alt="Premium kitchen design" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" /></div>
                <div className="rounded-md overflow-hidden"><img src={asset('kitchen-4.jpg')} alt="Modern kitchen with LED lighting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" /></div>
              </div>
              <p className="text-muted-foreground text-xs text-center mt-3 uppercase tracking-widest">Real kitchens. Ricky Interiors craftsmanship.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14 anim-in">
            <span className="text-primary tracking-widest uppercase text-sm font-medium block mb-4">Our Values</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">The principles behind every project.</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">Anyone can promise a beautiful home. These four commitments govern how we actually behave — on every job, every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="anim-in bg-background border border-border/30 p-7 group hover:border-primary/40 transition-colors duration-300">
                <div className="text-primary mb-5 group-hover:scale-110 transition-transform duration-300 w-fit">{v.icon}</div>
                <h3 className="font-serif text-xl text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center anim-in">
            <a href="#contact" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 font-medium text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-all">
              Claim Your Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
