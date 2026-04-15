import { useApp } from '../../context/AppContext';
import { todayKey } from '../../utils/dateUtils';
import { Check, Circle } from 'lucide-react';
import { LAYER_COLORS, LAYER_LABELS } from '../../types';
import type { Route } from '../../App';

export function DailyChecklist({ go }: { go: (r: Route) => void }) {
  const { state, togglePracticeComplete } = useApp();
  const key = todayKey();
  const done = new Set(state.dailyLogs[key]?.completedPractices ?? []);
  const active = state.practices.filter((p) => p.active && p.frequency === 'daily');
  const weekly = state.practices.filter((p) => p.active && p.frequency !== 'daily');

  const doneCount = active.filter((p) => done.has(p.id)).length;

  return (
    <section className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="h-section">Today's practices</h2>
        <span className="text-sm opacity-60">{doneCount}/{active.length}</span>
      </div>
      {active.length === 0 ? (
        <div className="text-sm opacity-70">
          No active daily practices yet.{' '}
          <button onClick={() => go('practices')} className="underline">Browse the library</button> to add some.
        </div>
      ) : (
        <ul className="space-y-2">
          {active.map((p) => {
            const checked = done.has(p.id);
            return (
              <li key={p.id}>
                <button
                  onClick={() => togglePracticeComplete(p.id)}
                  className={`w-full flex items-start gap-3 text-left rounded-xl px-3 py-3 transition
                    ${checked ? 'bg-black/5 dark:bg-white/5 opacity-70' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  <span
                    className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2`}
                    style={{
                      borderColor: LAYER_COLORS[p.layer],
                      backgroundColor: checked ? LAYER_COLORS[p.layer] : 'transparent',
                      color: checked ? 'white' : 'transparent',
                    }}
                  >
                    {checked ? <Check size={14} /> : <Circle size={10} className="opacity-0" />}
                  </span>
                  <span className="flex-1">
                    <span className={`block font-medium ${checked ? 'line-through' : ''}`}>{p.name}</span>
                    <span className="block text-xs mt-0.5 opacity-60">
                      <span style={{ color: LAYER_COLORS[p.layer] }}>{LAYER_LABELS[p.layer]}</span>
                      <span> · {p.timeMinutes} min</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {weekly.length > 0 && (
        <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5">
          <div className="text-xs uppercase tracking-wider opacity-60 mb-2">Weekly / as-needed</div>
          <ul className="flex flex-wrap gap-2">
            {weekly.map((p) => (
              <li key={p.id}>
                <span className="chip" style={{ color: LAYER_COLORS[p.layer] }}>{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
