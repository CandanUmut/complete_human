import { useTranslation } from '../../hooks/useTranslation';
import { COMPLETION_COPY } from '../../data/completionMessages';
import type { CompletionKind } from '../../data/completionMessages';
import { X } from 'lucide-react';

interface Props {
  kind: CompletionKind;
  historyCount?: number;
  onClose: () => void;
}

// A small modal shown after a practice completes — quietly educational,
// acknowledges cumulative effort, never manipulative.
export function CompletionMoment({ kind, historyCount, onClose }: Props) {
  const { t, l } = useTranslation();
  const copy = COMPLETION_COPY[kind];

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4 fade-in"
      onClick={onClose}
    >
      <div
        className="card p-6 w-full max-w-sm space-y-3 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t('cm.dismiss')}
          className="absolute top-3 right-3 opacity-50 hover:opacity-100 p-1 rounded"
        >
          <X size={16} />
        </button>
        <h3 className="h-section font-serif">{l(copy.title)}</h3>
        <p className="text-sm leading-relaxed opacity-85">{l(copy.body)}</p>
        {typeof historyCount === 'number' && historyCount > 0 && (
          <p className="text-xs opacity-60 pt-2 border-t border-black/5 dark:border-white/5">
            {t('cm.history_bits', { n: historyCount })}
          </p>
        )}
        <div className="flex justify-end">
          <button className="btn" onClick={onClose}>{t('common.done')}</button>
        </div>
      </div>
    </div>
  );
}
