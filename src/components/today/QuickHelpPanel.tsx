import { useState } from 'react';
import { QUICK_HELP, type QuickHelpId } from '../../data/quickHelp';
import { useTranslation } from '../../hooks/useTranslation';
import type { Route } from '../../App';
import { X } from 'lucide-react';

interface Props {
  go: (r: Route) => void;
  onOpenTool: (tool: ToolTarget) => void;
}

export type ToolTarget =
  | { kind: 'breathing'; pattern: 'box' | 'sigh' | '478' }
  | { kind: 'decision' }
  | { kind: 'premortem' }
  | { kind: 'nvc' }
  | { kind: 'sift' }
  | { kind: 'exercise' }
  | { kind: 'quick_journal' }
  | { kind: 'evening' };

// Single most important UX addition: meet people where they are.
export function QuickHelpPanel({ go, onOpenTool }: Props) {
  const { t } = useTranslation();
  const [focused, setFocused] = useState<QuickHelpId | null>(null);

  const handle = (id: QuickHelpId) => {
    setFocused(id);
  };

  const proceed = (id: QuickHelpId) => {
    setFocused(null);
    switch (id) {
      case 'stressed':
        onOpenTool({ kind: 'breathing', pattern: 'sigh' });
        break;
      case 'decide':
        onOpenTool({ kind: 'premortem' });
        break;
      case 'hard_talk':
        onOpenTool({ kind: 'nvc' });
        break;
      case 'sift':
        onOpenTool({ kind: 'sift' });
        break;
      case 'learn':
        go('roadmap');
        break;
      case 'move':
        onOpenTool({ kind: 'exercise' });
        break;
      case 'sleep':
        onOpenTool({ kind: 'breathing', pattern: '478' });
        break;
      case 'think':
        onOpenTool({ kind: 'quick_journal' });
        break;
    }
  };

  return (
    <section className="card p-5">
      <div className="mb-3">
        <h2 className="h-section">{t('home.help_panel_title')}</h2>
        <p className="text-xs opacity-60 mt-1">{t('home.help_panel_subtitle')}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {QUICK_HELP.map((a) => (
          <button
            key={a.id}
            onClick={() => handle(a.id)}
            className="flex flex-col items-start gap-1 rounded-xl p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition text-left min-h-[72px]"
          >
            <span className="text-xl leading-none">{a.icon}</span>
            <span className="text-sm font-medium leading-tight">{t(a.labelKey)}</span>
          </button>
        ))}
      </div>

      {focused && (
        <div
          className="fixed inset-0 z-30 bg-black/40 flex items-end md:items-center justify-center p-4 fade-in"
          onClick={() => setFocused(null)}
        >
          <div
            className="card p-5 w-full max-w-sm space-y-3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFocused(null)}
              aria-label={t('common.close')}
              className="absolute top-3 right-3 opacity-50 hover:opacity-100 p-1 rounded"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{QUICK_HELP.find((x) => x.id === focused)?.icon}</span>
              <h3 className="h-section">{t(QUICK_HELP.find((x) => x.id === focused)!.labelKey)}</h3>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              {t(QUICK_HELP.find((x) => x.id === focused)!.whyKey)}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button className="btn-ghost" onClick={() => setFocused(null)}>{t('common.cancel')}</button>
              <button className="btn" onClick={() => proceed(focused)}>{t('common.begin')}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
