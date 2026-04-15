import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { DailyChecklist } from './DailyChecklist';
import { ConsistencyGrid } from './ConsistencyGrid';
import { QuickInsight } from './QuickInsight';
import { Timers } from './Timers';
import type { Route } from '../../App';
import { Compass } from 'lucide-react';

export function TodayView({ go }: { go: (r: Route) => void }) {
  const { state, updateSettings } = useApp();
  const { t, lang } = useTranslation();

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 5) return t('today.greeting.night');
    if (h < 12) return t('today.greeting.morning');
    if (h < 17) return t('today.greeting.afternoon');
    if (h < 21) return t('today.greeting.evening');
    return t('today.greeting.night');
  }, [t, lang]);

  const dateStr = new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : undefined, {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm opacity-60">{dateStr}</p>
        <h1 className="h-title mt-1">{greeting}.</h1>
      </section>

      <QuickInsight />

      <section className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="h-section flex items-center gap-2"><Compass size={18} /> {t('today.current_phase')}</h2>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => updateSettings({ currentPhase: p as 1 | 2 | 3 })}
                className={`px-3 py-1 rounded-full text-xs ${state.settings.currentPhase === p ? 'bg-charcoal text-cream dark:bg-cream dark:text-charcoal' : 'bg-black/5 dark:bg-white/10'}`}
              >
                {t(`phase.${p}.short`)}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm opacity-80 leading-relaxed">
          {t(`phase.${state.settings.currentPhase}.blurb`)}
        </p>
      </section>

      <DailyChecklist go={go} />
      <Timers />
      <ConsistencyGrid />
    </div>
  );
}
