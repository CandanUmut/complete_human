import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { DailyChecklist } from './DailyChecklist';
import { ConsistencyGrid } from './ConsistencyGrid';
import { QuickInsight } from './QuickInsight';
import { Timers } from './Timers';
import type { Route } from '../../App';
import { Compass } from 'lucide-react';

export function TodayView({ go }: { go: (r: Route) => void }) {
  const { state, updateSettings } = useApp();
  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 5) return 'Late night';
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    if (h < 21) return 'Good evening';
    return 'Good night';
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm opacity-60">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        <h1 className="h-title mt-1">{greeting}.</h1>
      </section>

      <QuickInsight />

      <section className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="h-section flex items-center gap-2"><Compass size={18} /> Current phase</h2>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => updateSettings({ currentPhase: p as 1 | 2 | 3 })}
                className={`px-3 py-1 rounded-full text-xs ${state.settings.currentPhase === p ? 'bg-charcoal text-cream dark:bg-cream dark:text-charcoal' : 'bg-black/5 dark:bg-white/10'}`}
              >
                Phase {p}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm opacity-80 leading-relaxed">
          {state.settings.currentPhase === 1 && 'Foundations — sleep, daily movement, one contemplative practice, evening review. Keep the number of active practices small.'}
          {state.settings.currentPhase === 2 && 'Connection & cognition — deep listening, decision journal, deliberate practice, third places.'}
          {state.settings.currentPhase === 3 && 'Expansion & integration — teaching, skills audit, civic contribution, sustained habits across all 8 layers.'}
        </p>
      </section>

      <DailyChecklist go={go} />
      <Timers />
      <ConsistencyGrid />
    </div>
  );
}
