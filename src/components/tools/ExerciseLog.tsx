import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey, formatDate, daysAgo } from '../../utils/dateUtils';
import type { ExerciseEntry } from '../../types';
import { EmptyState } from '../ui/EmptyState';

const TYPE_COLORS: Record<ExerciseEntry['type'], string> = {
  strength: '#B86B5C',
  cardio: '#4A6B8A',
  mobility: '#7A8B6F',
  walk: '#8A7355',
};

export function ExerciseLog() {
  const { state, addExercise } = useApp();
  const { t } = useTranslation();
  const [e, setE] = useState<Omit<ExerciseEntry, 'id' | 'date'>>({ type: 'strength', minutes: 30, notes: '' });

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    addExercise({ ...e, date: todayKey() });
    setE({ type: 'strength', minutes: 30, notes: '' });
  };

  const week: Record<ExerciseEntry['type'], number> = { strength: 0, cardio: 0, mobility: 0, walk: 0 };
  for (let i = 0; i < 7; i++) {
    const d = daysAgo(i);
    state.exerciseLog.filter((x) => x.date === d).forEach((x) => { week[x.type] += x.minutes; });
  }

  return (
    <div className="space-y-5">
      <h2 className="h-title">{t('el.title')}</h2>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">{t('el.type')}</label>
            <select className="input" value={e.type} onChange={(ev) => setE({ ...e, type: ev.target.value as ExerciseEntry['type'] })}>
              <option value="strength">{t('el.type.strength')}</option>
              <option value="cardio">{t('el.type.cardio')}</option>
              <option value="mobility">{t('el.type.mobility')}</option>
              <option value="walk">{t('el.type.walk')}</option>
            </select>
          </div>
          <div><label className="label">{t('el.minutes')}</label><input type="number" min={1} className="input" value={e.minutes} onChange={(ev) => setE({ ...e, minutes: Number(ev.target.value) })} /></div>
        </div>
        <div><label className="label">{t('el.notes')}</label><input className="input" value={e.notes} onChange={(ev) => setE({ ...e, notes: ev.target.value })} /></div>
        <div className="flex justify-end"><button className="btn">{t('rl.log_btn')}</button></div>
      </form>

      <div className="card p-4">
        <h3 className="h-section mb-3">{t('el.week_title')}</h3>
        <div className="space-y-2">
          {(Object.keys(week) as ExerciseEntry['type'][]).map((tp) => (
            <div key={tp}>
              <div className="flex justify-between text-xs mb-1"><span>{t(`el.type.${tp}`)}</span><span>{week[tp]} {t('misc.minutes_word')}</span></div>
              <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                <div className="h-full" style={{ width: `${Math.min(100, (week[tp] / 150) * 100)}%`, background: TYPE_COLORS[tp] }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs opacity-60 mt-3">{t('el.who_note')}</p>
      </div>

      {state.exerciseLog.length === 0 ? (
        <EmptyState>{t('el.empty')}</EmptyState>
      ) : (
        <div className="space-y-2">
          {state.exerciseLog.map((x) => (
            <article key={x.id} className="card p-3 text-sm flex items-center justify-between">
              <span style={{ color: TYPE_COLORS[x.type] }}>{t(`el.type.${x.type}`)}</span>
              <span>{x.minutes} {t('misc.minutes_word')}</span>
              <span className="text-xs opacity-60">{formatDate(x.date)}</span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
