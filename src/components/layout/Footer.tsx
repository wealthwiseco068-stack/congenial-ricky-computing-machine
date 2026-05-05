import { asset } from '@/lib/assets';

export function Footer() {
  return (
    <footer className="bg-secondary pt-24 pb-12 px-6 md:px-12 text-secondary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <img src={asset('logo.jpg')} alt="Ricky Interiors Logo" className="h-16 w-auto object-contain mb-6" />
          <h3 className="font-serif text-3xl mb-4">Built for Life.<br />Designed for You.</h3>
          <p className="text-muted-foreground max-w-sm">
            Premium interior design and fit-out services across Kenya. Trusted by 1,000+ homeowners. Delivered with speed, craft, and zero compromise.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-xl mb-6 text-primary">Contact</h4>
          <ul className="space-y-4 text-muted-foreground">
            <li><a href="mailto:simonthondu2@gmail.com" className="hover:text-primary transition-colors">simonthondu2@gmail.com</a></li>
            <li><a href="https://wa.me/254729714252" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+254 729 714 252</a></li>
            <li>Kitengela, Kenya</li>
            <li className="text-xs uppercase tracking-wider">Serving all of Kenya</li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-xl mb-6 text-primary">Services</h4>
          <ul className="space-y-3 text-muted-foreground text-sm">
            <li>Gypsum Ceilings</li>
            <li>Full Interior Design</li>
            <li>TV & Feature Walls</li>
            <li>Kitchen & Bathroom</li>
            <li>Bedrooms & Wardrobes</li>
            <li>Landscaping & Cabro Paving</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ricky Interiors. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex gap-6">
          <span>8+ Years in Business</span>
          <span>50+ Projects Completed</span>
          <span>Nationwide Service</span>
        </div>
      </div>
    </footer>
  );
}
