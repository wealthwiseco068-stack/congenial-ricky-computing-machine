import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const message = encodeURIComponent("Hi Ricky, I'd like a free consultation for my home.");
  const phone = "254729714252";
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-4 bg-background text-foreground px-4 py-2 rounded text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md border border-border">
        Start Your Project
      </span>
    </a>
  );
}
