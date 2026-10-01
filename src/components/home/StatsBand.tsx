import { CountUp } from '@/components/motion/CountUp';
import { HOME_STATS } from '@/content/home';
import { cn } from '@/lib/cn';

// Four centred stats with thin dividers: 2×2 on phones, one row from tablet up.
export function StatsBand() {
  return (
    <section aria-label="EduSolve in numbers">
      <div className="container-site">
        <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4 md:py-12">
          {HOME_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col-reverse items-center gap-2 px-3 py-6 text-center md:py-0',
                index % 2 === 1 && 'border-l border-line',
                index < 2 && 'border-b border-line md:border-b-0',
                index === 2 && 'md:border-l md:border-line',
              )}
            >
              <dt className="text-sm text-muted md:text-[0.9375rem]">{stat.label}</dt>
              <dd>
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-serif text-[2.25rem] leading-none font-medium tracking-[-0.03em] md:text-[2.75rem] xl:text-[3.5rem]"
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
