import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { LAYERS, LAYER_COLORS } from '../../types';
import { calibrationData, layerActivityCounts, weeklyCompletionSeries, currentStreak, longestStreak } from '../../utils/statsUtils';
import { last364Days, formatDate } from '../../utils/dateUtils';
import { completionRate } from '../../utils/statsUtils';
import { HelpTooltip } from '../ui/HelpTooltip';
import { FirstVisitBanner } from '../ui/FirstVisitBanner';
import { EmptyState } from '../ui/EmptyState';

export function ProgressView() {
  const { state } = useApp();
  const { t, l } = useTranslation();
  const weekly = useMemo(() => weeklyCompletionSeries(state, 12), [state]);
  const layerCounts = useMemo(() => layerActivityCounts(state, 28), [state]);
  const calibration = useMemo(() => calibrationData(state.decisions), [state.decisions]);
  const maxLayer = Math.max(1, ...Object.values(layerCounts));
  const days = last364Days();

  const totalLogs = Object.keys(state.dailyLogs).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="h-title">{t('progress.title')}</h1>
        <p className="opacity-70 text-sm mt-1">{t('progress.subtitle')}</p>
      </div>

      <FirstVisitBanner id="progress" />

      {totalLogs === 0 && <EmptyState>{t('progress.no_data')}</EmptyState>}

      <section className="card p-5">
        <h2 className="h-section mb-3">{t('progress.weekly')}</h2>
        <div className="flex items-end gap-1.5 h-32">
          {weekly.map((w) => (
            <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-layer-foundation rounded-t" style={{ height: `${w.rate * 100}%`, minHeight: 2, opacity: w.rate ? 1 : 0.15 }} />
              <span className="text-[10px] opacity-50">{w.week}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="h-section">{t('progress.layer_balance')}</h2>
          <HelpTooltip text={t('help.layer_balance')} />
        </div>
        <div className="space-y-2">
          {LAYERS.map((lyr) => (
            <div key={lyr}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: LAYER_COLORS[lyr] }}>{t(`layer.${lyr}`)}</span>
                <span className="opacity-60">{layerCounts[lyr]}</span>
              </div>
              <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                <div className="h-full" style={{ width: `${(layerCounts[lyr] / maxLayer) * 100}%`, background: LAYER_COLORS[lyr] }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs opacity-60 mt-3">{t('progress.layer_note')}</p>
      </section>

      <section className="card p-5">
        <h2 className="h-section mb-3">{t('progress.year')}</h2>
        <div className="overflow-x-auto">
          <div className="grid grid-flow-col grid-rows-7 gap-0.5" style={{ width: `${(days.length / 7) * 14}px` }}>
            {days.map((d) => {
              const r = completionRate(state, d);
              const idx = r === 0 ? 0 : r < 0.25 ? 1 : r < 0.5 ? 2 : r < 0.85 ? 3 : 4;
              const bg = ['bg-black/5 dark:bg-white/5', 'bg-layer-integration/30', 'bg-layer-integration/55', 'bg-layer-integration/80', 'bg-layer-integration'][idx];
              return <div key={d} title={`${formatDate(d)} — ${Math.round(r * 100)}%`} className={`heatmap-cell ${bg}`} />;
            })}
          </div>
        </div>
      </section>

      <section className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="h-section">{t('progress.calibration')}</h2>
          <HelpTooltip text={t('help.calibration')} />
        </div>
        {state.decisions.filter((d) => d.outcome !== 'pending').length === 0 ? (
          <p className="opacity-60 text-sm">{t('progress.calibration_empty')}</p>
        ) : (
          <div className="space-y-2">
            {calibration.map((c) => (
              <div key={c.confidence}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{c.confidence}%</span>
                  <span className="opacity-60">{c.actual === null ? '—' : `${Math.round(c.actual * 100)}%`} · n={c.n}</span>
                </div>
                <div className="relative h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-0.5 bg-black/40 dark:bg-white/40" style={{ left: `${c.confidence}%` }} />
                  {c.actual !== null && (
                    <div className="h-full bg-layer-cognitive" style={{ width: `${c.actual * 100}%` }} />
                  )}
                </div>
              </div>
            ))}
            <p className="text-xs opacity-60 mt-3">{t('progress.calibration_note')}</p>
          </div>
        )}
      </section>

      <section className="card p-5">
        <h2 className="h-section mb-3">{t('progress.streaks')}</h2>
        <div className="grid md:grid-cols-2 gap-2">
          {state.practices.filter((p) => p.active).map((p) => {
            const cur = currentStreak(state, p.id);
            const long = longestStreak(state, p.id);
            return (
              <div key={p.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-black/5 dark:bg-white/5">
                <span className="truncate pr-2">{l(p.name)}</span>
                <span className="text-xs opacity-70">{t('progress.streak_line', { cur, best: long })}</span>
              </div>
            );
          })}
        </div>
        <p className="text-xs opacity-60 mt-3">{t('progress.streaks_note')}</p>
      </section>
    </div>
  );
}
