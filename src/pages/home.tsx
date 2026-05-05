import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { MarqueeStrip } from '@/components/home/MarqueeStrip';
import { TrustSignals } from '@/components/home/TrustSignals';
import { Portfolio } from '@/components/home/Portfolio';
import { Services } from '@/components/home/Services';
import { Process } from '@/components/home/Process';
import { HowWeWork } from '@/components/home/HowWeWork';
import { Testimonials } from '@/components/home/Testimonials';
import { Contact } from '@/components/home/Contact';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { useLenis } from '@/hooks/useLenis';

export default function Home() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <TrustSignals />
        <Portfolio />
        <Services />
        <HowWeWork />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
