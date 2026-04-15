import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey, formatDate, daysAgo } from '../../utils/dateUtils';
import type { ReadingEntry } from '../../types';
import { EmptyState } from '../ui/EmptyState';

export function ReadingLog() {
  const { state, addReading } = useApp();
  const { t } = useTranslation();
  const [e, setE] = useState<Omit<ReadingEntry, 'id' | 'date'>>({ book: '', pages: 10, format: 'print' });

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!e.book.trim()) return;
    addReading({ ...e, date: todayKey() });
    setE({ book: '', pages: 10, format: 'print' });
  };

  const weekPages = Array.from({ length: 7 }, (_, i) => {
    const d = daysAgo(6 - i);
    const total = state.readingLog.filter((r) => r.date === d).reduce((s, r) => s + r.pages, 0);
    return { d, total };
  });
  const max = Math.max(1, ...weekPages.map((w) => w.total));

  return (
    <div className="space-y-5">
      <h2 className="h-title">{t('rl.title')}</h2>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <div><label className="label">{t('rl.book')}</label><input className="input" value={e.book} onChange={(ev) => setE({ ...e, book: ev.target.value })} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">{t('rl.pages')}</label><input type="number" min={1} className="input" value={e.pages} onChange={(ev) => setE({ ...e, pages: Number(ev.target.value) })} /></div>
          <div><label className="label">{t('rl.format')}</label>
            <select className="input" value={e.format} onChange={(ev) => setE({ ...e, format: ev.target.value as ReadingEntry['format'] })}>
              <option value="print">{t('rl.format.print')}</option>
              <option value="digital">{t('rl.format.digital')}</option>
              <option value="audio">{t('rl.format.audio')}</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end"><button className="btn">{t('rl.log_btn')}</button></div>
      </form>

      <div className="card p-4">
        <h3 className="h-section mb-3">{t('rl.week')}</h3>
        <div className="flex items-end gap-2 h-24">
          {weekPages.map(({ d, total }) => (
            <div key={d} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-layer-cognitive rounded-t" style={{ height: `${(total / max) * 100}%`, minHeight: 2, opacity: total ? 1 : 0.15 }} />
              <span className="text-[10px] opacity-60">{d.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>

      {state.readingLog.length === 0 ? (
        <EmptyState>{t('rl.empty')}</EmptyState>
      ) : (
        <div className="space-y-2">
          {state.readingLog.map((r) => (
            <article key={r.id} className="card p-3 text-sm flex items-center justify-between">
              <span>{r.book}</span>
              <span className="text-xs opacity-60">{formatDate(r.date)} · {r.pages}p · {t(`rl.format.${r.format}`)}</span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
