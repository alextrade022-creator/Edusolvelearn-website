import { WhatsAppIcon } from '@/components/icons';
import { CONTACT } from '@/content/site';

// Fixed to the bottom-right corner on every page. No pulsing animation.
export function FloatingWhatsApp() {
  return (
    <a
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with EduSolve on WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(22,24,26,0.18)] transition-transform duration-200 hover:scale-105 md:right-6 md:bottom-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
