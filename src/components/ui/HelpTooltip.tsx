import { useEffect, useRef, useState } from 'react';
import { HelpCircle } from 'lucide-react';

export function HelpTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        aria-label="Help"
        className="inline-flex items-center justify-center w-5 h-5 rounded-full opacity-50 hover:opacity-100 transition"
      >
        <HelpCircle size={14} />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute z-30 top-full right-0 mt-1 w-64 p-3 rounded-xl bg-charcoal text-cream dark:bg-cream dark:text-charcoal shadow-lg text-xs leading-relaxed fade-in"
        >
          {text}
        </span>
      )}
    </span>
  );
}
