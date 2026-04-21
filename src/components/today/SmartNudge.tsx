import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { pickNudge, shouldShowNudgeNow } from '../../data/nudges';
import type { Route } from '../../App';

// At most one nudge per session. Never push, never guilt. Always dismissable.
export function SmartNudge({ go }: { go: (r: Route) => void }) {
  const { state, updateSettings } = useApp();
  const { t, lang } = useTranslation();
  const [hiddenThisSession, setHiddenThisSession] = useState(false);

  const nudge = useMemo(
    () => pickNudge(state, lang, state.settings.dismissedNudges ?? []),
    [state, lang],
  );

  const canShow = shouldShowNudgeNow(state);

  // Mark the nudge as "shown today" the first time it's actually rendered.
  useEffect(() => {
    if (!nudge || !canShow || hiddenThisSession) return;
    updateSettings({ lastNudgeShownAt: new Date().toISOString() });
    // Only on mount of a distinct nudge
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nudge?.id]);

  if (!nudge || !canShow || hiddenThisSession) return null;

  const dismiss = () => {
    const list = state.settings.dismissedNudges ?? [];
    updateSettings({ dismissedNudges: [...list, nudge.id] });
    setHiddenThisSession(true);
  };

  const cta = nudge.cta;

  return (
    <section className="card p-4 border-l-4 border-layer-adaptive fade-in">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="text-sm font-medium">{nudge.title as string}</div>
          <p className="text-sm opacity-80 mt-1 leading-relaxed">{nudge.body as string}</p>
          {cta && (
            <div className="mt-3">
              <button
                className="btn-ghost border border-black/10 dark:border-white/15 text-xs"
                onClick={() => {
                  setHiddenThisSession(true);
                  go(cta.route as Route);
                }}
              >
                {t(cta.labelKey)}
              </button>
            </div>
          )}
        </div>
        <button
          onClick={dismiss}
          aria-label={t('nudge.dismiss')}
          className="shrink-0 opacity-50 hover:opacity-100 p-1 rounded"
        >
          <X size={16} />
        </button>
      </div>
    </section>
  );
}
