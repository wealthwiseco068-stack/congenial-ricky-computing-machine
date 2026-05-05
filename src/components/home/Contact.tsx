import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({ title: "Request received.", description: "We will call you within 24 hours to confirm your consultation.", duration: 5000 });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="text-primary tracking-widest uppercase text-sm font-medium mb-4 block">Get a Free Quote</span>
          <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-8">Ready to transform<br />your home?</h2>
          <p className="text-muted-foreground mb-12 max-w-md leading-relaxed">
            Fill in the form and we will get back to you within 24 hours with a clear, no-obligation quote. Whether it is a single room or a full house fit-out — we bring the same level of craft to every project.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email us</p>
                <a href="mailto:simonthondu2@gmail.com" className="text-lg font-serif hover:text-primary transition-colors">simonthondu2@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <a href="https://wa.me/254729714252" target="_blank" rel="noopener noreferrer" className="text-lg font-serif hover:text-primary transition-colors">+254 729 714 252</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-lg font-serif">Kitengela, Kenya · Serving Nationwide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary p-8 md:p-10 rounded-xl border border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name</label>
                <input type="text" id="name" required className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground" placeholder="John Mwangi" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone / WhatsApp</label>
                <input type="tel" id="phone" required className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground" placeholder="0729 714 252" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-medium text-foreground">What do you need?</label>
              <select id="service" required className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground appearance-none">
                <option value="">Select a service...</option>
                <option>Gypsum Ceilings & Plasterwork</option>
                <option>Full Interior Design & Fit-Out</option>
                <option>TV & Feature Walls</option>
                <option>Kitchen Design & Installation</option>
                <option>Bedroom & Wardrobes</option>
                <option>Bathroom Renovation</option>
                <option>Landscaping & Cabro Paving</option>
                <option>Multiple Services / Full House</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">Tell us about your project</label>
              <textarea id="message" rows={4} required className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground resize-none" placeholder="Briefly describe the space, your style, and your timeline..."></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground font-medium uppercase tracking-wider py-4 rounded-md hover:opacity-90 transition-all disabled:opacity-70 text-sm">
              {isSubmitting ? "Sending..." : "Send My Quote Request"}
            </button>
            <p className="text-center text-xs text-muted-foreground">We respond within 24 hours · No obligation · 100% free</p>
          </form>
        </div>
      </div>
    </section>
  );
}
