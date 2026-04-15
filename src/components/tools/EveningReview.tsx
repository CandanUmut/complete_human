import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey, formatDate } from '../../utils/dateUtils';
import { HelpTooltip } from '../ui/HelpTooltip';
import { EmptyState } from '../ui/EmptyState';

export function EveningReview() {
  const { state, addJournal } = useApp();
  const { t } = useTranslation();
  const [wentWell, setWentWell] = useState('');
  const [improve, setImprove] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wentWell.trim() && !improve.trim()) return;
    addJournal({ date: todayKey(), wentWell: wentWell.trim(), improve: improve.trim() });
    setWentWell(''); setImprove('');
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="h-title">{t('er.title')}</h2>
          <HelpTooltip text={t('help.evening_review')} />
        </div>
        <p className="opacity-70 text-sm mt-1">{t('er.blurb')}</p>
      </div>

      <form onSubmit={submit} className="card p-4 space-y-3">
        <div>
          <label className="label">{t('er.went_well')}</label>
          <textarea className="input" rows={3} value={wentWell} onChange={(e) => setWentWell(e.target.value)} />
        </div>
        <div>
          <label className="label">{t('er.improve')}</label>
          <textarea className="input" rows={3} value={improve} onChange={(e) => setImprove(e.target.value)} />
        </div>
        <div className="flex justify-end"><button className="btn">{t('er.save')}</button></div>
      </form>

      {state.journalEntries.length === 0 ? (
        <EmptyState>{t('er.empty')}</EmptyState>
      ) : (
        <div className="space-y-2">
          {state.journalEntries.map((j) => (
            <article key={j.id} className="card p-4">
              <div className="text-xs opacity-60 mb-2">{formatDate(j.date)}</div>
              {j.wentWell && <div className="mb-2"><div className="text-[11px] uppercase tracking-wider opacity-60">{t('er.went_well')}</div><p className="text-sm">{j.wentWell}</p></div>}
              {j.improve && <div><div className="text-[11px] uppercase tracking-wider opacity-60">{t('er.improve')}</div><p className="text-sm">{j.improve}</p></div>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
