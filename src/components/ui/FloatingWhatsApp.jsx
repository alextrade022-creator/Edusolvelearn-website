import { WhatsAppIcon } from '../icons';
import { CONTACT } from '../../data/site';

// Fixed pulsing WhatsApp button pinned to the bottom-right on every page.
export default function FloatingWhatsApp() {
  return (
    <a
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-[200] w-[60px] h-[60px] rounded-full bg-whatsapp flex items-center justify-center text-white shadow-[0_8px_22px_rgba(37,211,102,.45)] animate-pulse-ring"
    >
      <WhatsAppIcon size={32} />
    </a>
  );
}
