import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { DailyChecklist } from './DailyChecklist';
import { ConsistencyGrid } from './ConsistencyGrid';
import { QuickInsight } from './QuickInsight';
import { Timers } from './Timers';
import { QuickHelpPanel } from './QuickHelpPanel';
import type { ToolTarget } from './QuickHelpPanel';
import { SmartNudge } from './SmartNudge';
import type { Route } from '../../App';
import type { BreathPreset } from '../tools/ImmersiveBreathing';
import type { ToolId } from '../tools/ToolsView';
import { Compass, CalendarDays } from 'lucide-react';

interface Props {
  go: (r: Route) => void;
  openImmersive: (preset: BreathPreset) => void;
  openTool: (tool: ToolId) => void;
  openWeeklyReview: () => void;
}

type TimeBand = 'morning' | 'afternoon' | 'evening' | 'night';

const bandFor = (h: number): TimeBand => {
  if (h < 5) return 'night';
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  if (h < 21) return 'evening';
  return 'night';
};

const daysSinceISO = (iso?: string): number => {
  if (!iso) return 999;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return 999;
  return Math.floor((Date.now() - d.getTime()) / 86_400_000);
};

export function TodayView({ go, openImmersive, openTool, openWeeklyReview }: Props) {
  const { state, updateSettings } = useApp();
  const { t, lang } = useTranslation();
  const [energy, setEnergy] = useState<null | 'low' | 'okay' | 'good' | 'high'>(null);

  const band = useMemo(() => bandFor(new Date().getHours()), []);
  const greeting = useMemo(() => t(`today.greeting.${band}`), [t, band]);

  const dateStr = new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : undefined, {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  const onOpenTool = (tool: ToolTarget) => {
    switch (tool.kind) {
      case 'breathing':
        openImmersive(tool.pattern);
        break;
      case 'decision':
        openTool('decision');
        break;
      case 'premortem':
        openTool('premortem');
        break;
      case 'nvc':
        openTool('nvc');
        break;
      case 'sift':
        openTool('sift');
        break;
      case 'exercise':
        openTool('exercise');
        break;
      case 'quick_journal':
        openTool('quick_journal');
        break;
      case 'evening':
        openTool('evening');
        break;
    }
  };

  // Weekly review availability: offer if never done, or ≥7 days since last, and the user is on Sun/Mon.
  const lastReview = state.settings.lastWeeklyReviewAt;
  const daysSinceReview = daysSinceISO(lastReview);
  const weeklyAvailable = daysSinceReview >= 7;

  const intro = t(`home.${band}_intro`);

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm opacity-60">{dateStr}</p>
        <h1 className="h-title mt-1">{greeting}.</h1>
        <p className="text-sm opacity-70 mt-2 leading-relaxed">{intro}</p>
      </section>

      <SmartNudge go={go} />

      <QuickInsight />

      <QuickHelpPanel go={go} onOpenTool={onOpenTool} />

      {/* Afternoon energy check-in */}
      {band === 'afternoon' && (
        <section className="card p-5">
          <h2 className="h-section mb-3">{t('home.energy_prompt')}</h2>
          <div className="grid grid-cols-4 gap-2">
            {(['low', 'okay', 'good', 'high'] as const).map((e) => (
              <button
                key={e}
                onClick={() => setEnergy(e)}
                className={`btn-ghost !rounded-xl !py-2 flex-col border border-black/5 dark:border-white/10 ${energy === e ? 'bg-black/5 dark:bg-white/5' : ''}`}
              >
                <span className="text-xs">{t(`home.energy.${e}`)}</span>
              </button>
            ))}
          </div>
          {energy && (
            <p className="mt-3 text-sm opacity-80 leading-relaxed">
              {t(`home.energy.${energy}_suggestion`)}
            </p>
          )}
        </section>
      )}

      {/* Evening: invite into review */}
      {band === 'evening' && (
        <section className="card p-5 border-l-4 border-layer-foundation">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="h-section">{t('home.ready_for_review')}</h2>
              <p className="text-xs opacity-60 mt-1">
                {t('er.blurb')}
              </p>
            </div>
            <button className="btn" onClick={() => openTool('evening')}>
              {t('home.start_review')}
            </button>
          </div>
        </section>
      )}

      {/* Night: sleep help */}
      {band === 'night' && (
        <section className="card p-5 border-l-4 border-layer-cognitive">
          <h2 className="h-section mb-1">{t('home.sleep_help')}</h2>
          <p className="text-sm opacity-80 leading-relaxed">{t('home.sleep_help_body')}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn" onClick={() => openImmersive('478')}>
              {t('home.start_sleep_breathing')}
            </button>
            <button
              className="btn-ghost border border-black/10 dark:border-white/15"
              onClick={() => openTool('quick_journal')}
            >
              {t('home.brain_dump')}
            </button>
          </div>
        </section>
      )}

      {/* Weekly review invite */}
      {weeklyAvailable && (
        <section className="card p-5 border-l-4 border-layer-integration">
          <div className="flex items-center gap-3">
            <CalendarDays size={18} className="opacity-70" />
            <div className="flex-1">
              <h2 className="h-section">{t('wr.title')}</h2>
              <p className="text-xs opacity-70 mt-1">{t('wr.available_message')}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="btn" onClick={openWeeklyReview}>{t('wr.start')}</button>
              <button
                className="btn-ghost text-xs"
                onClick={() =>
                  updateSettings({ lastWeeklyReviewAt: new Date().toISOString() })
                }
              >
                {t('wr.dismiss_for_week')}
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="h-section flex items-center gap-2"><Compass size={18} /> {t('today.current_phase')}</h2>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => updateSettings({ currentPhase: p as 1 | 2 | 3 })}
                className={`px-3 py-1 rounded-full text-xs ${state.settings.currentPhase === p ? 'bg-charcoal text-cream dark:bg-cream dark:text-charcoal' : 'bg-black/5 dark:bg-white/10'}`}
              >
                {t(`phase.${p}.short`)}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm opacity-80 leading-relaxed">
          {t(`phase.${state.settings.currentPhase}.blurb`)}
        </p>
      </section>

      <DailyChecklist go={go} />
      <Timers />
      <ConsistencyGrid />
    </div>
  );
}
