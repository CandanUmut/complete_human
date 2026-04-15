import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { todayKey, formatDate, daysAgo } from '../../utils/dateUtils';
import type { ExerciseEntry } from '../../types';

const TYPE_COLORS: Record<ExerciseEntry['type'], string> = {
  strength: '#B86B5C',
  cardio: '#4A6B8A',
  mobility: '#7A8B6F',
  walk: '#8A7355',
};

export function ExerciseLog() {
  const { state, addExercise } = useApp();
  const [e, setE] = useState<Omit<ExerciseEntry, 'id' | 'date'>>({ type: 'strength', minutes: 30, notes: '' });

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    addExercise({ ...e, date: todayKey() });
    setE({ type: 'strength', minutes: 30, notes: '' });
  };

  // Weekly total by type
  const week: Record<ExerciseEntry['type'], number> = { strength: 0, cardio: 0, mobility: 0, walk: 0 };
  for (let i = 0; i < 7; i++) {
    const d = daysAgo(i);
    state.exerciseLog.filter((x) => x.date === d).forEach((x) => { week[x.type] += x.minutes; });
  }

  return (
    <div className="space-y-5">
      <h2 className="h-title">Exercise log</h2>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">Type</label>
            <select className="input" value={e.type} onChange={(ev) => setE({ ...e, type: ev.target.value as ExerciseEntry['type'] })}>
              <option value="strength">Strength</option><option value="cardio">Cardio</option>
              <option value="mobility">Mobility</option><option value="walk">Walk</option>
            </select>
          </div>
          <div><label className="label">Minutes</label><input type="number" min={1} className="input" value={e.minutes} onChange={(ev) => setE({ ...e, minutes: Number(ev.target.value) })} /></div>
        </div>
        <div><label className="label">Notes</label><input className="input" value={e.notes} onChange={(ev) => setE({ ...e, notes: ev.target.value })} /></div>
        <div className="flex justify-end"><button className="btn">Log</button></div>
      </form>

      <div className="card p-4">
        <h3 className="h-section mb-3">This week (minutes by type)</h3>
        <div className="space-y-2">
          {(Object.keys(week) as ExerciseEntry['type'][]).map((t) => (
            <div key={t}>
              <div className="flex justify-between text-xs mb-1"><span className="capitalize">{t}</span><span>{week[t]} min</span></div>
              <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                <div className="h-full" style={{ width: `${Math.min(100, (week[t] / 150) * 100)}%`, background: TYPE_COLORS[t] }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs opacity-60 mt-3">Scale reference: WHO guideline ~150 min/week moderate aerobic + 2 strength sessions.</p>
      </div>

      <div className="space-y-2">
        {state.exerciseLog.map((x) => (
          <article key={x.id} className="card p-3 text-sm flex items-center justify-between">
            <span className="capitalize" style={{ color: TYPE_COLORS[x.type] }}>{x.type}</span>
            <span>{x.minutes} min</span>
            <span className="text-xs opacity-60">{formatDate(x.date)}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
