import { useId, type SVGProps } from 'react';

// Scalloped "Approved to teach" seal (our own vector, deep brand green).
const SCALLOP =
  'M 143.00 75.00 Q 148.25 85.53 140.25 94.16 Q 142.31 105.74 132.21 111.76 Q 130.93 123.46 119.53 126.39 Q 115.01 137.25 103.25 136.85 Q 95.85 146.00 84.68 142.31 Q 75.00 149.00 65.32 142.31 Q 54.15 146.00 46.75 136.85 Q 34.99 137.25 30.47 126.39 Q 19.07 123.46 17.79 111.76 Q 7.69 105.74 9.75 94.16 Q 1.75 85.53 7.00 75.00 Q 1.75 64.47 9.75 55.84 Q 7.69 44.26 17.79 38.24 Q 19.07 26.54 30.47 23.61 Q 34.99 12.75 46.75 13.15 Q 54.15 4.00 65.32 7.69 Q 75.00 1.00 84.68 7.69 Q 95.85 4.00 103.25 13.15 Q 115.01 12.75 119.53 23.61 Q 130.93 26.54 132.21 38.24 Q 142.31 44.26 140.25 55.84 Q 148.25 64.47 143.00 75.00 Z';

export function ApprovalSeal(props: SVGProps<SVGSVGElement>) {
  const id = useId().replace(/:/g, '');
  const top = `${id}-top`;
  const bottom = `${id}-bottom`;
  return (
    <svg viewBox="0 0 150 150" role="img" aria-label="Approved to teach" {...props}>
      <defs>
        <path id={top} d="M 26 75 A 49 49 0 0 1 124 75" />
        <path id={bottom} d="M 18 75 A 57 57 0 0 0 132 75" />
      </defs>
      <path d={SCALLOP} fill="#3F6B14" />
      <circle cx="75" cy="75" r="63" fill="#FFFFFF" />
      <circle cx="75" cy="75" r="60" fill="none" stroke="#3F6B14" strokeWidth="1.5" />
      <circle cx="75" cy="75" r="40" fill="none" stroke="#3F6B14" strokeWidth="2" />
      <text fontFamily="var(--font-manrope), sans-serif" fontSize="12.5" fontWeight="800" letterSpacing="3" fill="#3F6B14">
        <textPath href={`#${top}`} startOffset="50%" textAnchor="middle">
          APPROVED
        </textPath>
      </text>
      <text fontFamily="var(--font-manrope), sans-serif" fontSize="10.5" fontWeight="800" letterSpacing="2.4" fill="#3F6B14">
        <textPath href={`#${bottom}`} startOffset="50%" textAnchor="middle">
          TO TEACH
        </textPath>
      </text>
      <text x="29" y="79" fontSize="9" fill="#3F6B14" textAnchor="middle">
        ★
      </text>
      <text x="121" y="79" fontSize="9" fill="#3F6B14" textAnchor="middle">
        ★
      </text>
      <path d="M60 76 l10 10 l20 -22" fill="none" stroke="#3F6B14" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
