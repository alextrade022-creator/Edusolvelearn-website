// Stand-in for a photo that hasn't been supplied yet. Mirrors the "drop a
// photo here" slots from the original build; swap for a real <img> when ready.
export default function ImagePlaceholder({ label = 'Photo', className = '' }) {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-[#eef0ec] text-muted text-center px-4 ${className}`}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.8" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="text-xs font-semibold leading-snug">{label}</span>
    </div>
  );
}
