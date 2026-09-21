import Eyebrow from './Eyebrow';

// Centered eyebrow + title + optional subtitle block used at the top of most
// content sections. `light` flips the colours for use on dark backgrounds.
const TITLE_SIZES = {
  lg: 'text-3xl sm:text-[38px]',
  md: 'text-[28px] sm:text-[32px]',
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  size = 'lg',
  className = '',
  maxWidth = 'max-w-2xl',
}) {
  return (
    <div className={`${maxWidth} mx-auto text-center ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={`section-title ${TITLE_SIZES[size] ?? TITLE_SIZES.lg} ${light ? 'text-white' : ''}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3.5 text-[17px] leading-relaxed ${light ? 'text-[#aeb4b8]' : 'text-body'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
