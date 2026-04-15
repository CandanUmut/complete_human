import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey, formatDate } from '../../utils/dateUtils';
import type { SiftEntry } from '../../types';
import { HelpTooltip } from '../ui/HelpTooltip';
import { EmptyState } from '../ui/EmptyState';

export function SIFTTracker() {
  const { state, addSift } = useApp();
  const { t } = useTranslation();
  const [e, setE] = useState<Omit<SiftEntry, 'id' | 'date'>>({
    source: '',
    sourceChecked: false,
    betterCoverageFound: false,
    originalTraced: false,
    verdict: 'reliable',
    notes: '',
  });

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!e.source.trim()) return;
    addSift({ ...e, date: todayKey() });
    setE({ source: '', sourceChecked: false, betterCoverageFound: false, originalTraced: false, verdict: 'reliable', notes: '' });
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="h-title">{t('sift.title')}</h2>
          <HelpTooltip text={t('help.sift')} />
        </div>
        <p className="opacity-70 text-sm mt-1">{t('sift.blurb')}</p>
      </div>

      <form onSubmit={submit} className="card p-4 space-y-3">
        <div>
          <label className="label">{t('sift.source')}</label>
          <input className="input" value={e.source} onChange={(ev) => setE({ ...e, source: ev.target.value })} placeholder={t('sift.source_ph')} />
        </div>
        <div className="flex flex-wrap gap-4">
          {([
            ['sourceChecked', t('sift.checked_source')],
            ['betterCoverageFound', t('sift.checked_coverage')],
            ['originalTraced', t('sift.checked_traced')],
          ] as const).map(([k, label]) => (
            <label key={k} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={e[k]} onChange={(ev) => setE({ ...e, [k]: ev.target.checked })} />
              {label}
            </label>
          ))}
        </div>
        <div>
          <label className="label">{t('sift.verdict')}</label>
          <select className="input" value={e.verdict} onChange={(ev) => setE({ ...e, verdict: ev.target.value as SiftEntry['verdict'] })}>
            <option value="reliable">{t('sift.verdict.reliable')}</option>
            <option value="mixed">{t('sift.verdict.mixed')}</option>
            <option value="unreliable">{t('sift.verdict.unreliable')}</option>
          </select>
        </div>
        <div>
          <label className="label">{t('sift.notes')}</label>
          <textarea className="input" rows={2} value={e.notes} onChange={(ev) => setE({ ...e, notes: ev.target.value })} />
        </div>
        <div className="flex justify-end"><button className="btn">{t('sift.log_btn')}</button></div>
      </form>

      {state.siftLogs.length === 0 ? (
        <EmptyState>{t('sift.empty')}</EmptyState>
      ) : (
        <div className="space-y-2">
          {state.siftLogs.map((s) => (
            <article key={s.id} className="card p-4">
              <div className="flex items-center justify-between text-xs opacity-60 mb-1">
                <span>{formatDate(s.date)}</span>
                <span className="uppercase tracking-wider">{t(`sift.verdict.${s.verdict}`)}</span>
              </div>
              <p className="text-sm break-words">{s.source}</p>
              <p className="text-xs mt-1 opacity-70">
                {s.sourceChecked ? '✓' : '·'} {t('sift.checked_source')} {' '}
                {s.betterCoverageFound ? '✓' : '·'} {t('sift.checked_coverage')} {' '}
                {s.originalTraced ? '✓' : '·'} {t('sift.checked_traced')}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
