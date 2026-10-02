import Image from 'next-image-export-optimizer';

interface Screen {
  src: string;
  alt: string;
}

// Two phones that start stacked (straight, centred) and fan out to their tilted
// positions as the section scrolls into view; the back phone moves a little
// later, so they feel layered. Scrolling back up stacks them again.
// Pure CSS (a scroll-driven animation, see `.app-phones` in globals.css): the
// browser runs it straight from the scroll position — no JavaScript. Browsers
// without support, and "reduce motion", show the phones fanned out.
export function AppPhones({ front, back }: { front: Screen; back: Screen }) {
  return (
    <div
      role="img"
      aria-label="Two phones showing the EduSolve app: a recorded class and a question bank"
      className="app-phones relative mx-auto h-[25rem] w-full max-w-[22rem] sm:h-[30rem] sm:max-w-[28rem] lg:h-[36rem] lg:max-w-none"
    >
      <div className="app-phone-back absolute top-2 right-0 w-[52%] lg:right-[4%] lg:w-[46%]">
        <Image src={back.src} alt="" width={971} height={1620} sizes="(min-width: 1024px) 260px, 50vw" className="h-auto w-full drop-shadow-[0_24px_40px_rgba(22,24,26,0.18)]" />
      </div>
      <div className="app-phone-front absolute top-8 left-0 w-[54%] lg:left-[4%] lg:w-[48%]">
        <Image src={front.src} alt="" width={994} height={1583} sizes="(min-width: 1024px) 270px, 52vw" className="h-auto w-full drop-shadow-[0_28px_48px_rgba(22,24,26,0.22)]" />
      </div>
    </div>
  );
}
