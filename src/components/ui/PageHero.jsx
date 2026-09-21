// Inner-page hero: a soft radial-glow band with a pill badge, title and lead.
export default function PageHero({ badge, title, children }) {
  return (
    <section
      className="px-6 pt-16 pb-14"
      style={{
        background:
          'radial-gradient(900px 420px at 90% -10%, rgba(167,201,87,.20), transparent 60%), #ffffff',
      }}
    >
      <div className="max-w-[840px] mx-auto text-center">
        {badge && (
          <div className="inline-flex items-center gap-2.5 bg-surface-leaf border border-brand-green/50 px-4 py-1.5 rounded-full text-[13.5px] font-bold text-[#5a6b2f] mb-5">
            <span className="w-2 h-2 rounded-full bg-brand-green inline-block" />
            {badge}
          </div>
        )}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl leading-[1.1] tracking-[-0.02em] mb-5">
          {title}
        </h1>
        {children && (
          <p className="text-lg sm:text-[19px] leading-relaxed text-body max-w-[680px] mx-auto">
            {children}
          </p>
        )}
      </div>
    </section>
  );
}
