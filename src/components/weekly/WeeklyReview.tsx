import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { daysAgo, formatDate, todayKey } from '../../utils/dateUtils';
import { LAYER_COLORS, LAYERS } from '../../types';
import type { Layer } from '../../types';
import { layerActivityCounts } from '../../utils/statsUtils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  onClose: () => void;
}

// 7-screen weekly review flow. Opens as a full-height overlay.
export function WeeklyReview({ onClose }: Props) {
  const { state, updateSettings } = useApp();
  const { t, l } = useTranslation();
  const [step, setStep] = useState(0);

  const weekRange = useMemo(() => ({
    from: daysAgo(6),
    to: daysAgo(0),
  }), []);

  // --- Data ---
  const activeDailyPractices = state.practices.filter(
    (p) => p.active && p.frequency === 'daily',
  );
  const activePracticeIds = new Set(activeDailyPractices.map((p) => p.id));

  const thisWeekDays = useMemo(() => {
    const out: string[] = [];
    for (let i = 6; i >= 0; i--) out.push(daysAgo(i));
    return out;
  }, []);

  const lastWeekDays = useMemo(() => {
    const out: string[] = [];
    for (let i = 13; i >= 7; i--) out.push(daysAgo(i));
    return out;
  }, []);

  // Per-practice completion counts this week
  const perPractice: Record<string, number> = {};
  for (const p of activeDailyPractices) perPractice[p.id] = 0;

  let daysPracticed = 0;
  let totalDone = 0;
  const possible = activeDailyPractices.length * 7;

  for (const d of thisWeekDays) {
    const log = state.dailyLogs[d];
    if (!log) continue;
    let any = false;
    for (const id of log.completedPractices) {
      if (activePracticeIds.has(id)) {
        perPractice[id] = (perPractice[id] ?? 0) + 1;
        totalDone++;
        any = true;
      }
    }
    if (any) daysPracticed++;
  }

  const sortedByCount = Object.entries(perPractice).sort((a, b) => b[1] - a[1]);
  const mostConsistent = sortedByCount.slice(0, 2).filter(([, n]) => n > 0);
  const leastConsistent = sortedByCount.slice(-2).filter(([, n]) => n < 7 && n >= 0);

  // Layer balance: this vs last
  const thisLayer = layerActivityCounts(state, 7);
  const lastLayer = useMemo(() => {
    const counts: Record<Layer, number> = {
      foundation: 0, relational: 0, cognitive: 0, physical: 0,
      practical: 0, civic: 0, adaptive: 0, integration: 0,
    };
    const byId = new Map(state.practices.map((p) => [p.id, p]));
    for (const d of lastWeekDays) {
      const log = state.dailyLogs[d];
      if (!log) continue;
      for (const id of log.completedPractices) {
        const p = byId.get(id);
        if (p) counts[p.layer]++;
      }
    }
    return counts;
  }, [state, lastWeekDays]);

  const grew: Layer[] = [];
  const dropped: Layer[] = [];
  const untouched: Layer[] = [];
  for (const lyr of LAYERS) {
    const diff = thisLayer[lyr] - lastLayer[lyr];
    if (thisLayer[lyr] === 0 && lastLayer[lyr] === 0) untouched.push(lyr);
    else if (diff >= 1) grew.push(lyr);
    else if (diff <= -1) dropped.push(lyr);
  }

  // Journal pattern hints — simple keyword signals on this week's entries
  const weekJournals = state.journalEntries.filter(
    (j) => j.date >= weekRange.from && j.date <= weekRange.to,
  );

  const patternHints: string[] = [];
  const joined = weekJournals.map((j) => [j.wentWell, j.improve, j.body ?? ''].join(' ').toLowerCase()).join(' | ');

  const mentions = (re: RegExp) => (joined.match(re) ?? []).length;
  const stressCount = mentions(/\b(stress|overwhelm|anxious|rushed|burned|tired)\b/g) +
                      mentions(/\b(stres|baskı|yorgun|aceleci|endişe)\b/g);
  const gratitudeCount = mentions(/\b(grateful|gratitude|thankful)\b/g) +
                         mentions(/\b(minnettar|şükran|müteşekkir)\b/g);
  const workCount = mentions(/\b(work|meeting|deadline|project)\b/g) +
                    mentions(/\b(iş|toplantı|proje|süre)\b/g);

  if (stressCount >= 3) {
    patternHints.push(t('wr.hint_stress', { n: stressCount }));
  }
  if (gratitudeCount >= 2) {
    patternHints.push(t('wr.hint_gratitude', { n: gratitudeCount }));
  }
  if (workCount >= 3) {
    patternHints.push(t('wr.hint_work', { n: workCount }));
  }

  // Wins
  const wins: string[] = [];
  if (daysPracticed >= 5) wins.push(t('wr.win_days', { n: daysPracticed }));
  for (const [pid, n] of sortedByCount) {
    if (n >= 5) {
      const p = state.practices.find((x) => x.id === pid);
      if (p) wins.push(t('wr.win_practice', { name: l(p.name), n }));
    }
  }
  const decisionsLogged = state.decisions.filter(
    (d) => d.date >= weekRange.from && d.date <= weekRange.to,
  ).length;
  if (decisionsLogged > 0) wins.push(t('wr.win_decisions', { n: decisionsLogged }));
  const readingPages = state.readingLog
    .filter((r) => r.date >= weekRange.from && r.date <= weekRange.to)
    .reduce((a, b) => a + b.pages, 0);
  if (readingPages > 0) wins.push(t('wr.win_reading', { n: readingPages }));

  // Suggestion for next week: weakest layer
  const layerEntries = (Object.entries(thisLayer) as [Layer, number][])
    .sort((a, b) => a[1] - b[1]);
  const weakest = layerEntries[0]?.[0];

  const finish = () => {
    updateSettings({ lastWeeklyReviewAt: new Date().toISOString() });
    onClose();
  };

  const steps = [
    // Step 1: Week at a glance
    () => (
      <div className="space-y-3">
        <h2 className="h-title">{t('wr.step1_title')}</h2>
        <p className="text-sm opacity-70">
          {t('wr.week_range', { from: formatDate(weekRange.from), to: formatDate(weekRange.to) })}
        </p>
        <div className="space-y-2 pt-2">
          <p className="text-sm">{t('wr.step1_days_practiced', { n: daysPracticed })}</p>
          <p className="text-sm">{t('wr.step1_total_sessions', { done: totalDone, target: possible })}</p>
          {mostConsistent.length > 0 && (
            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
                {t('wr.step1_most_consistent')}
              </div>
              <ul className="text-sm space-y-1">
                {mostConsistent.map(([pid, n]) => {
                  const p = state.practices.find((x) => x.id === pid);
                  return (
                    <li key={pid} className="flex justify-between">
                      <span>{p ? l(p.name) : pid}</span>
                      <span className="opacity-60">{n}/7</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {leastConsistent.length > 0 && (
            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
                {t('wr.step1_least_consistent')}
              </div>
              <ul className="text-sm space-y-1">
                {leastConsistent.map(([pid, n]) => {
                  const p = state.practices.find((x) => x.id === pid);
                  return (
                    <li key={pid} className="flex justify-between">
                      <span>{p ? l(p.name) : pid}</span>
                      <span className="opacity-60">{n}/7</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    ),

    // Step 2: Layer balance
    () => (
      <div className="space-y-3">
        <h2 className="h-title">{t('wr.step2_title')}</h2>
        {(grew.length === 0 && dropped.length === 0 && untouched.length === LAYERS.length) ? (
          <p className="text-sm opacity-70">{t('wr.step2_none')}</p>
        ) : (
          <>
            <div className="space-y-2">
              {LAYERS.map((lyr) => (
                <div key={lyr}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: LAYER_COLORS[lyr] }}>{t(`layer.${lyr}`)}</span>
                    <span className="opacity-60">{thisLayer[lyr]} · last {lastLayer[lyr]}</span>
                  </div>
                  <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${Math.min(100, thisLayer[lyr] * 14)}%`,
                        background: LAYER_COLORS[lyr],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs opacity-70 space-y-1 pt-2">
              {grew.length > 0 && (
                <p>{t('wr.step2_grew')}: {grew.map((l) => t(`layer.${l}`)).join(', ')}</p>
              )}
              {dropped.length > 0 && (
                <p>{t('wr.step2_dropped')}: {dropped.map((l) => t(`layer.${l}`)).join(', ')}</p>
              )}
              {untouched.length > 0 && (
                <p>{t('wr.step2_untouched')}: {untouched.map((l) => t(`layer.${l}`)).join(', ')}</p>
              )}
            </div>
          </>
        )}
      </div>
    ),

    // Step 3: Patterns from journal
    () => (
      <div className="space-y-3">
        <h2 className="h-title">{t('wr.step3_title')}</h2>
        {weekJournals.length === 0 ? (
          <p className="text-sm opacity-70">{t('wr.step3_empty')}</p>
        ) : patternHints.length === 0 ? (
          <p className="text-sm opacity-70">{t('wr.step3_intro')}</p>
        ) : (
          <>
            <p className="text-xs opacity-60">{t('wr.step3_intro')}</p>
            <ul className="list-disc list-inside text-sm space-y-2 opacity-85">
              {patternHints.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </>
        )}
      </div>
    ),

    // Step 4: Decision journal check-in
    () => {
      const today = todayKey();
      const due = state.decisions.filter(
        (d) => d.outcome === 'pending' && d.resolveBy && d.resolveBy <= today,
      );
      return (
        <div className="space-y-3">
          <h2 className="h-title">{t('wr.step4_title')}</h2>
          {due.length === 0 ? (
            <p className="text-sm opacity-70">{t('wr.step4_none')}</p>
          ) : (
            <>
              <p className="text-xs opacity-60">{t('wr.step4_body')}</p>
              <ul className="text-sm space-y-2">
                {due.map((d) => (
                  <li key={d.id} className="rounded-xl p-3 bg-black/5 dark:bg-white/5">
                    <div className="text-xs opacity-60 mb-1">
                      {formatDate(d.date)} · {d.confidence}%
                    </div>
                    <p>{d.prediction}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      );
    },

    // Step 5: Wins
    () => (
      <div className="space-y-3">
        <h2 className="h-title">{t('wr.step5_title')}</h2>
        {wins.length === 0 ? (
          <p className="text-sm opacity-70">{t('wr.step3_empty')}</p>
        ) : (
          <>
            <ul className="text-sm space-y-2">
              {wins.map((w, i) => <li key={i}>✓ {w}</li>)}
            </ul>
            <p className="text-xs opacity-60 pt-2">{t('wr.step5_intro')}</p>
          </>
        )}
      </div>
    ),

    // Step 6: Next week's focus
    () => (
      <div className="space-y-3">
        <h2 className="h-title">{t('wr.step6_title')}</h2>
        {weakest ? (
          <>
            <p className="text-xs uppercase tracking-wider opacity-60">{t('wr.step6_suggestion')}</p>
            <p className="text-sm leading-relaxed">
              <span style={{ color: LAYER_COLORS[weakest] }}>{t(`layer.${weakest}`)}</span>{' '}
              <span className="opacity-75">— {t(`layer.${weakest}.short`)}.</span>
            </p>
            <p className="text-sm opacity-75">
              {t('wr.step6_add_hint')}
            </p>
          </>
        ) : (
          <p className="text-sm opacity-70">{t('wr.step2_none')}</p>
        )}
      </div>
    ),

    // Step 7: One question
    () => (
      <div className="space-y-4">
        <h2 className="h-title">{t('wr.step7_title')}</h2>
        <p className="font-serif text-lg leading-snug">“{t('wr.step7_prompt')}”</p>
        <p className="text-xs opacity-60">{t('wr.step5_intro')}</p>
      </div>
    ),
  ];

  const isLast = step === steps.length - 1;
  const Body = steps[step];

  return (
    <div className="fixed inset-0 z-40 bg-cream dark:bg-charcoal flex flex-col">
      <header className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5">
        <div>
          <div className="text-xs uppercase tracking-wider opacity-60">{t('wr.title')}</div>
          <div className="text-sm opacity-75">{t('wr.subtitle')}</div>
        </div>
        <button onClick={onClose} aria-label={t('common.close')} className="btn-ghost !px-2">
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-5 max-w-2xl mx-auto w-full">
        <Body />
      </div>

      <div className="border-t border-black/5 dark:border-white/5 p-3 flex items-center gap-2">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="btn-ghost disabled:opacity-40"
        >
          <ChevronLeft size={16} /> {t('common.back')}
        </button>
        <div className="flex-1 flex items-center justify-center gap-1 text-xs opacity-60">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i === step ? 'bg-charcoal dark:bg-cream' : 'bg-black/20 dark:bg-white/20'}`}
            />
          ))}
        </div>
        {isLast ? (
          <button onClick={finish} className="btn">{t('wr.finish')}</button>
        ) : (
          <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} className="btn">
            {t('common.next')} <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
