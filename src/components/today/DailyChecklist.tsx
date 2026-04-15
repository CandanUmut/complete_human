import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey } from '../../utils/dateUtils';
import { Check, Circle } from 'lucide-react';
import { LAYER_COLORS } from '../../types';
import type { Practice, ToolType } from '../../types';
import type { Route } from '../../App';

// Map a practice toolType to the Tools route (all tools live under /tools)
const toolTargets: Record<NonNullable<ToolType>, Route> = {
  meditation: 'today', // handled by timers; stay on today
  breathing: 'today',
  decision: 'tools',
  sift: 'tools',
  evening: 'tools',
  nvc: 'tools',
  premortem: 'tools',
  skills: 'tools',
  reading: 'tools',
  exercise: 'tools',
};

export function DailyChecklist({ go }: { go: (r: Route) => void }) {
  const { state, togglePracticeComplete } = useApp();
  const { t, l } = useTranslation();
  const key = todayKey();
  const done = new Set(state.dailyLogs[key]?.completedPractices ?? []);
  const active = state.practices.filter((p) => p.active && p.frequency === 'daily');
  const weekly = state.practices.filter((p) => p.active && p.frequency !== 'daily');

  const doneCount = active.filter((p) => done.has(p.id)).length;
  const [prompt, setPrompt] = useState<Practice | null>(null);

  const onTap = (p: Practice) => {
    // If the practice has a tool and isn't already done, offer to open it.
    const isDone = done.has(p.id);
    if (!isDone && p.toolType && p.toolType !== 'meditation' && p.toolType !== 'breathing') {
      setPrompt(p);
      return;
    }
    togglePracticeComplete(p.id);
  };

  const confirmTool = () => {
    if (!prompt) return;
    togglePracticeComplete(prompt.id);
    const route = prompt.toolType ? toolTargets[prompt.toolType] : 'tools';
    setPrompt(null);
    go(route);
  };

  const justMark = () => {
    if (!prompt) return;
    togglePracticeComplete(prompt.id);
    setPrompt(null);
  };

  return (
    <section className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="h-section">{t('today.practices_title')}</h2>
        <span className="text-sm opacity-60">
          {t('today.practices_complete', { completed: doneCount, total: active.length })}
        </span>
      </div>
      {active.length === 0 ? (
        <div className="text-sm opacity-70">
          {t('today.no_active_practices')}{' '}
          <button onClick={() => go('practices')} className="underline">{t('today.browse_library')}</button>.
        </div>
      ) : (
        <ul className="space-y-2">
          {active.map((p) => {
            const checked = done.has(p.id);
            return (
              <li key={p.id}>
                <button
                  onClick={() => onTap(p)}
                  className={`w-full flex items-start gap-3 text-left rounded-xl px-3 py-3 transition
                    ${checked ? 'bg-black/5 dark:bg-white/5 opacity-70' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  <span
                    className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2"
                    style={{
                      borderColor: LAYER_COLORS[p.layer],
                      backgroundColor: checked ? LAYER_COLORS[p.layer] : 'transparent',
                      color: checked ? 'white' : 'transparent',
                    }}
                  >
                    {checked ? <Check size={14} /> : <Circle size={10} className="opacity-0" />}
                  </span>
                  <span className="flex-1">
                    <span className={`block font-medium ${checked ? 'line-through' : ''}`}>{l(p.name)}</span>
                    <span className="block text-xs mt-0.5 opacity-60">
                      <span style={{ color: LAYER_COLORS[p.layer] }}>{t(`layer.${p.layer}`)}</span>
                      <span> · {t('practices.time_min', { min: p.timeMinutes })}</span>
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
          <div className="text-xs uppercase tracking-wider opacity-60 mb-2">{t('today.weekly_asneeded')}</div>
          <ul className="flex flex-wrap gap-2">
            {weekly.map((p) => (
              <li key={p.id}>
                <span className="chip" style={{ color: LAYER_COLORS[p.layer] }}>{l(p.name)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {prompt && (
        <div className="fixed inset-0 z-30 bg-black/40 flex items-end md:items-center justify-center p-4" onClick={() => setPrompt(null)}>
          <div className="card p-5 w-full max-w-sm space-y-3" onClick={(e) => e.stopPropagation()}>
            <h3 className="h-section">{l(prompt.name)}</h3>
            <p className="text-sm opacity-80">{t('today.use_tool_prompt')}</p>
            <div className="flex flex-col gap-2">
              <button className="btn justify-center" onClick={confirmTool}>{t('today.open_tool')}</button>
              <button className="btn-ghost border border-black/10 dark:border-white/15 justify-center" onClick={justMark}>
                {t('today.just_mark_done')}
              </button>
              <button className="btn-ghost justify-center" onClick={() => setPrompt(null)}>{t('common.cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
