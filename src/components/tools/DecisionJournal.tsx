import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey, formatDate } from '../../utils/dateUtils';
import type { DecisionEntry } from '../../types';
import { HelpTooltip } from '../ui/HelpTooltip';
import { EmptyState } from '../ui/EmptyState';
import { FirstVisitBanner } from '../ui/FirstVisitBanner';

const CONFIDENCES: DecisionEntry['confidence'][] = [50, 60, 70, 80, 90, 95];

export function DecisionJournal() {
  const { state, addDecision, updateDecision } = useApp();
  const { t } = useTranslation();
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState<DecisionEntry['confidence']>(70);
  const [notes, setNotes] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prediction.trim()) return;
    addDecision({ date: todayKey(), prediction: prediction.trim(), confidence, outcome: 'pending', notes });
    setPrediction(''); setNotes(''); setConfidence(70);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <h2 className="h-title">{t('dj.title')}</h2>
        <HelpTooltip text={t('help.decision_journal')} />
      </div>
      <FirstVisitBanner id="decision" />
      <p className="opacity-70 text-sm">{t('dj.blurb')}</p>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <div>
          <label className="label">{t('dj.prediction')}</label>
          <textarea className="input" rows={2} value={prediction} onChange={(e) => setPrediction(e.target.value)} placeholder={t('dj.prediction_ph')} />
        </div>
        <div>
          <label className="label">{t('dj.confidence')}</label>
          <div className="flex flex-wrap gap-1.5">
            {CONFIDENCES.map((c) => (
              <button type="button" key={c} onClick={() => setConfidence(c)}
                className={`px-3 py-1 rounded-full text-xs ${confidence === c ? 'bg-charcoal text-cream dark:bg-cream dark:text-charcoal' : 'bg-black/5 dark:bg-white/10'}`}>
                {c}%
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="label">{t('dj.notes')}</label>
          <textarea className="input" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="flex justify-end"><button className="btn">{t('dj.log_btn')}</button></div>
      </form>

      {state.decisions.length === 0 ? (
        <EmptyState>{t('dj.empty')}</EmptyState>
      ) : (
        <div className="space-y-2">
          {state.decisions.map((d) => (
            <article key={d.id} className="card p-4">
              <div className="flex items-center justify-between text-xs opacity-60 mb-1">
                <span>{formatDate(d.date)} · {d.confidence}%</span>
                <span className={
                  d.outcome === 'correct' ? 'text-green-700 dark:text-green-400' :
                  d.outcome === 'incorrect' ? 'text-red-700 dark:text-red-400' : ''
                }>{t(`dj.${d.outcome}`)}</span>
              </div>
              <p className="text-sm">{d.prediction}</p>
              {d.notes && <p className="text-xs opacity-70 mt-1">{d.notes}</p>}
              {d.outcome === 'pending' && (
                <div className="mt-2 flex gap-2">
                  <button onClick={() => updateDecision(d.id, { outcome: 'correct', resolvedAt: todayKey() })} className="btn-ghost text-xs border border-black/10 dark:border-white/10">{t('dj.mark_correct')}</button>
                  <button onClick={() => updateDecision(d.id, { outcome: 'incorrect', resolvedAt: todayKey() })} className="btn-ghost text-xs border border-black/10 dark:border-white/10">{t('dj.mark_incorrect')}</button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
