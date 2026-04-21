import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey, formatDate } from '../../utils/dateUtils';
import type { DecisionEntry } from '../../types';
import { HelpTooltip } from '../ui/HelpTooltip';
import { EmptyState } from '../ui/EmptyState';
import { FirstVisitBanner } from '../ui/FirstVisitBanner';
import { CompletionMoment } from '../ui/CompletionMoment';
import { calibrationData } from '../../utils/statsUtils';

const CONFIDENCES: DecisionEntry['confidence'][] = [50, 60, 70, 80, 90, 95];

export function DecisionJournal() {
  const { state, addDecision, updateDecision } = useApp();
  const { t } = useTranslation();
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState<DecisionEntry['confidence']>(70);
  const [notes, setNotes] = useState('');
  const [resolveBy, setResolveBy] = useState('');
  const [completion, setCompletion] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prediction.trim()) return;
    addDecision({
      date: todayKey(),
      prediction: prediction.trim(),
      confidence,
      outcome: 'pending',
      notes,
      resolveBy: resolveBy || undefined,
    });
    setPrediction('');
    setNotes('');
    setResolveBy('');
    setConfidence(70);
    setCompletion(true);
  };

  const today = todayKey();
  const dueNow = state.decisions.filter(
    (d) => d.outcome === 'pending' && d.resolveBy && d.resolveBy <= today,
  );
  const otherPending = state.decisions.filter(
    (d) => d.outcome === 'pending' && !(d.resolveBy && d.resolveBy <= today),
  );
  const resolved = state.decisions.filter((d) => d.outcome !== 'pending');

  const calibration = useMemo(() => calibrationData(state.decisions), [state.decisions]);
  const hasEnoughForCalibration = resolved.length >= 10;

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
          <textarea
            className="input"
            rows={2}
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            placeholder={t('dj.prediction_ph')}
          />
        </div>
        <div>
          <label className="label">{t('dj.confidence')}</label>
          <div className="flex flex-wrap gap-1.5">
            {CONFIDENCES.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setConfidence(c)}
                className={`px-3 py-1 rounded-full text-xs ${
                  confidence === c
                    ? 'bg-charcoal text-cream dark:bg-cream dark:text-charcoal'
                    : 'bg-black/5 dark:bg-white/10'
                }`}
              >
                {c}%
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="label">{t('dj.resolve_by')}</label>
          <input
            type="date"
            className="input"
            value={resolveBy}
            min={today}
            onChange={(e) => setResolveBy(e.target.value)}
          />
          <p className="text-[11px] opacity-60 mt-1">{t('dj.resolve_by_help')}</p>
        </div>
        <div>
          <label className="label">{t('dj.notes')}</label>
          <textarea
            className="input"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button className="btn">{t('dj.log_btn')}</button>
        </div>
      </form>

      {hasEnoughForCalibration && (
        <section className="card p-4 border-l-4 border-layer-cognitive">
          <div className="text-xs uppercase tracking-wider opacity-60 mb-2">
            {t('dj.calibration_overview')}
          </div>
          <div className="space-y-1 text-sm">
            {calibration
              .filter((c) => c.n > 0 && c.actual !== null)
              .map((c) => (
                <p key={c.confidence} className="opacity-80">
                  {t('dj.calibration_overview_body', {
                    conf: c.confidence,
                    actual: Math.round((c.actual ?? 0) * 100),
                    n: c.n,
                  })}
                </p>
              ))}
          </div>
        </section>
      )}

      {dueNow.length > 0 && (
        <section className="card p-4 border-l-4 border-amber-500/60">
          <div className="text-xs uppercase tracking-wider opacity-60 mb-2">
            {t('dj.pending_due')}
          </div>
          <div className="space-y-3">
            {dueNow.map((d) => (
              <div key={d.id} className="text-sm">
                <p className="mb-1">{d.prediction}</p>
                <div className="text-xs opacity-60 mb-2">
                  {formatDate(d.date)} · {d.confidence}% · due {formatDate(d.resolveBy!)}
                </div>
                <div className="text-xs opacity-80 mb-1">{t('dj.follow_up')}</div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() =>
                      updateDecision(d.id, { outcome: 'correct', resolvedAt: today })
                    }
                    className="btn-ghost text-xs border border-black/10 dark:border-white/10"
                  >
                    {t('dj.mark_correct')}
                  </button>
                  <button
                    onClick={() =>
                      updateDecision(d.id, { outcome: 'incorrect', resolvedAt: today })
                    }
                    className="btn-ghost text-xs border border-black/10 dark:border-white/10"
                  >
                    {t('dj.mark_incorrect')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {state.decisions.length === 0 ? (
        <EmptyState>{t('dj.empty')}</EmptyState>
      ) : (
        <div className="space-y-2">
          {[...dueNow, ...otherPending, ...resolved].map((d) => (
            <article key={d.id} className="card p-4">
              <div className="flex items-center justify-between text-xs opacity-60 mb-1">
                <span>
                  {formatDate(d.date)} · {d.confidence}%
                  {d.resolveBy && d.outcome === 'pending' && (
                    <span className="ml-2 opacity-80">
                      → {formatDate(d.resolveBy)}
                    </span>
                  )}
                </span>
                <span
                  className={
                    d.outcome === 'correct'
                      ? 'text-green-700 dark:text-green-400'
                      : d.outcome === 'incorrect'
                      ? 'text-red-700 dark:text-red-400'
                      : ''
                  }
                >
                  {t(`dj.${d.outcome}`)}
                </span>
              </div>
              <p className="text-sm">{d.prediction}</p>
              {d.notes && <p className="text-xs opacity-70 mt-1">{d.notes}</p>}
              {d.outcome === 'pending' && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => updateDecision(d.id, { outcome: 'correct', resolvedAt: today })}
                    className="btn-ghost text-xs border border-black/10 dark:border-white/10"
                  >
                    {t('dj.mark_correct')}
                  </button>
                  <button
                    onClick={() => updateDecision(d.id, { outcome: 'incorrect', resolvedAt: today })}
                    className="btn-ghost text-xs border border-black/10 dark:border-white/10"
                  >
                    {t('dj.mark_incorrect')}
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {completion && (
        <CompletionMoment
          kind="decision"
          historyCount={state.decisions.length + 1}
          onClose={() => setCompletion(false)}
        />
      )}
    </div>
  );
}
