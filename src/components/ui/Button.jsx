import { Link } from 'react-router-dom';

// Pill button available in a few visual variants. Renders as a router <Link>
// (internal `to`), a plain <a> (external `href`), or a <button> (onClick only).
const VARIANTS = {
  primary:
    'bg-brand-red text-white shadow-cta hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(210,3,33,.4)]',
  outline:
    'bg-white border-2 border-brand-green text-brand-ink hover:bg-surface-leaf',
  dark: 'bg-brand-ink text-white hover:bg-black',
  green: 'bg-brand-green text-brand-ink hover:bg-brand-green-light',
  'light-solid':
    'bg-white text-brand-red shadow-[0_12px_26px_rgba(0,0,0,.16)] hover:-translate-y-0.5',
  'light-outline':
    'bg-white/15 border-[1.5px] border-white/60 text-white hover:bg-white/25',
};

const SIZES = {
  sm: 'text-sm px-5 py-3',
  md: 'text-base px-7 py-3.5',
  lg: 'text-[16.5px] px-7 py-4',
};

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  const classes = `btn ${VARIANTS[variant] ?? VARIANTS.primary} ${SIZES[size] ?? SIZES.md} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
