import Button from './Button';
import { WhatsAppIcon } from '../icons';
import { CONTACT } from '../../data/site';

// Red call-to-action band that closes almost every page. `size="sm"` renders
// the slightly smaller variant used on the FAQ page.
export default function CtaSection({
  title,
  subtitle,
  size = 'lg',
  whatsappFirst = false,
}) {
  const demo = (
    <Button to="/contact" variant="light-solid" size="lg" key="demo">
      Book a Free Demo
    </Button>
  );
  const whatsapp = (
    <Button href={CONTACT.whatsappUrl} variant="light-outline" size="lg" key="wa">
      <WhatsAppIcon size={20} /> Chat on WhatsApp
    </Button>
  );

  return (
    <section className={`px-6 bg-brand-red ${size === 'sm' ? 'py-[70px]' : 'py-20'}`}>
      <div className="max-w-[820px] mx-auto text-center text-white">
        <h2 className={`font-heading font-extrabold leading-[1.15] mb-4 ${size === 'sm' ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-[40px]'}`}>
          {title}
        </h2>
        <p className="text-lg leading-relaxed text-[#ffe0e4] mb-8">{subtitle}</p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          {whatsappFirst ? [whatsapp, demo] : [demo, whatsapp]}
        </div>
      </div>
    </section>
  );
}
