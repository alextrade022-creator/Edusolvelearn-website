import { useState } from 'react';
import PageHero from '../components/ui/PageHero';
import AccordionItem from '../components/ui/AccordionItem';
import CtaSection from '../components/ui/CtaSection';
import { FAQ_GROUPS } from '../data/content';

export default function FAQ() {
  // Single open question across all groups, keyed "groupIndex-itemIndex".
  const [openKey, setOpenKey] = useState('0-0');

  return (
    <>
      <PageHero badge="Frequently asked questions" title="Everything you'd like to know">
        Can’t find your answer here? Message us on WhatsApp — we’re happy to help.
      </PageHero>

      <section className="px-6 pt-10 pb-20 bg-white">
        <div className="max-w-[820px] mx-auto flex flex-col gap-10">
          {FAQ_GROUPS.map((group, gi) => (
            <div key={group.title}>
              <div className="flex items-center gap-3 mb-[18px]">
                <div className="w-10 h-10 rounded-xl bg-surface-leaf flex items-center justify-center text-xl">
                  {group.icon}
                </div>
                <h2 className="section-title text-2xl sm:text-[26px]">{group.title}</h2>
              </div>
              <div className="flex flex-col gap-3">
                {group.items.map((item, ii) => {
                  const key = `${gi}-${ii}`;
                  return (
                    <AccordionItem
                      key={key}
                      question={item.q}
                      answer={item.a}
                      isOpen={openKey === key}
                      onToggle={() => setOpenKey((prev) => (prev === key ? '' : key))}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSection
        title="Still have a question?"
        subtitle="We’d love to help — reach out and we’ll get back to you quickly."
        size="sm"
        whatsappFirst
      />
    </>
  );
}
