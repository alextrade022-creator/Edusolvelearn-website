// Small uppercase label shown above section headings.
export default function Eyebrow({ children, className = '' }) {
  return <div className={`eyebrow mb-3 ${className}`}>{children}</div>;
}
