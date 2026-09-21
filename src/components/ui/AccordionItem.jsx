// Controlled accordion row (question + collapsible answer). The parent owns the
// open state so pages can enforce "only one open at a time" across groups.
export default function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="bg-white border border-[#eceee9] rounded-2xl shadow-[0_2px_8px_rgba(22,26,29,.04)] overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left cursor-pointer px-6 py-5 flex items-center justify-between gap-4 font-heading font-bold text-[16.5px] sm:text-[17px] text-brand-ink"
      >
        <span>{question}</span>
        <span
          className={`flex-none w-7 h-7 rounded-full bg-surface-leaf text-brand-green-dark flex items-center justify-center text-xl transition-transform duration-200 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-[15.5px] leading-[1.7] text-body">{answer}</div>
      )}
    </div>
  );
}
