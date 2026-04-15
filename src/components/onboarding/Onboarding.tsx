import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { LAYERS, LAYER_COLORS, type Phase } from '../../types';
import { LanguageToggle } from '../ui/LanguageToggle';
import { Check, ChevronRight, Pause, Play } from 'lucide-react';

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function Onboarding() {
  const { state, updateSettings, togglePracticeActive } = useApp();
  const { t, l } = useTranslation();
  const [step, setStep] = useState<Step>(0);
  const [phase, setPhase] = useState<Phase>(1);

  const phasePractices = state.practices.filter((p) => p.phase <= phase);
  const activeCount = state.practices.filter((p) => p.active).length;

  const finish = () => updateSettings({ onboardingComplete: true, currentPhase: phase });
  const skip = () => {
    // Keep defaults active (they already are) and drop into the app.
    finish();
  };

  const next = () => setStep((s) => Math.min(6, (s + 1)) as Step);
  const back = () => setStep((s) => Math.max(0, (s - 1)) as Step);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full card p-6 md:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 rounded-full border-2 border-layer-relational" />
            <span className="font-serif text-lg">{t('onboarding.welcome.title')}</span>
          </div>
          <StepDots current={step} />
        </div>

        {step === 0 && (
          <div className="space-y-5 fade-in">
            <h1 className="h-title leading-tight">{t('onboarding.welcome.subtitle')}</h1>
            <p className="text-sm opacity-85 leading-relaxed">{t('onboarding.welcome.desc')}</p>
            <div>
              <div className="label">{t('onboarding.welcome.language')}</div>
              <LanguageToggle />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button className="btn flex-1 justify-center" onClick={next}>
                {t('onboarding.welcome.start')} <ChevronRight size={14} />
              </button>
              <button className="btn-ghost border border-black/10 dark:border-white/15 flex-1 justify-center" onClick={skip}>
                {t('onboarding.welcome.skip')}
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 fade-in">
            <h2 className="h-section">{t('onboarding.layers.title')}</h2>
            <p className="text-sm opacity-75">{t('onboarding.layers.desc')}</p>
            <ul className="space-y-2">
              {LAYERS.map((layer, i) => (
                <li
                  key={layer}
                  className="flex items-center gap-3 rounded-xl p-2.5 bg-black/5 dark:bg-white/5 fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: LAYER_COLORS[layer] }} />
                  <span className="flex-1">
                    <span className="block text-sm font-medium" style={{ color: LAYER_COLORS[layer] }}>{t(`layer.${layer}`)}</span>
                    <span className="block text-xs opacity-75">{t(`layer.${layer}.short`)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <NavRow onBack={back} onNext={next} t={t} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 fade-in">
            <h2 className="h-section">{t('onboarding.phase.title')}</h2>
            <div className="space-y-2">
              {[1, 2, 3].map((n) => (
                <PhaseOption
                  key={n}
                  n={n as Phase}
                  cur={phase}
                  set={setPhase}
                  title={t(`phase.${n}.name`)}
                  weeks={t(`onboarding.phase.weeks${n}`)}
                  desc={t(`phase.${n}.desc`)}
                />
              ))}
            </div>
            {phase === 1 && <p className="text-xs opacity-70">{t('onboarding.phase.note')}</p>}
            <NavRow onBack={back} onNext={next} t={t} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 fade-in">
            <h2 className="h-section">{t('onboarding.practices.title')}</h2>
            <p className="text-sm opacity-75">{t('onboarding.practices.note')}</p>
            <ul className="space-y-1 max-h-80 overflow-y-auto">
              {phasePractices.map((p) => (
                <li key={p.id}>
                  <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                    <input type="checkbox" checked={p.active} onChange={() => togglePracticeActive(p.id)} className="mt-1" />
                    <span>
                      <span className="block text-sm font-medium">{l(p.name)}</span>
                      <span className="block text-xs mt-0.5" style={{ color: LAYER_COLORS[p.layer] }}>
                        {t(`layer.${p.layer}`)} · {t('practices.time_min', { min: p.timeMinutes })} · {t(`practices.freq.${p.frequency}`)}
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <NavRow onBack={back} onNext={next} t={t} />
          </div>
        )}

        {step === 4 && <TryBreathing t={t} onBack={back} onNext={next} />}

        {step === 5 && (
          <div className="space-y-4 fade-in">
            <h2 className="h-section">{t('onboarding.tour.title')}</h2>
            <TourSteps t={t} />
            <NavRow onBack={back} onNext={next} t={t} />
          </div>
        )}

        {step === 6 && (
          <div className="space-y-5 fade-in text-center">
            <h2 className="h-title">{t('onboarding.ready.title')}</h2>
            <p className="text-sm opacity-80 leading-relaxed">{t('onboarding.ready.desc')}</p>
            <div className="text-left">
              <div className="label">{t('onboarding.ready.selected')} ({activeCount})</div>
              <ul className="space-y-1 max-h-40 overflow-y-auto">
                {state.practices.filter((p) => p.active).map((p) => (
                  <li key={p.id} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-black/5 dark:bg-white/5">
                    <Check size={14} style={{ color: LAYER_COLORS[p.layer] }} />
                    <span>{l(p.name)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn w-full justify-center" onClick={finish}>
              {t('onboarding.ready.button')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepDots({ current }: { current: Step }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 7 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition ${i <= current ? 'bg-layer-relational' : 'bg-black/15 dark:bg-white/15'}`}
        />
      ))}
    </div>
  );
}

function NavRow({ onBack, onNext, t }: { onBack: () => void; onNext: () => void; t: (k: string) => string }) {
  return (
    <div className="flex justify-between pt-2">
      <button className="btn-ghost" onClick={onBack}>{t('common.back')}</button>
      <button className="btn" onClick={onNext}>{t('common.next')}</button>
    </div>
  );
}

function PhaseOption({ n, cur, set, title, weeks, desc }: { n: Phase; cur: Phase; set: (p: Phase) => void; title: string; weeks: string; desc: string }) {
  const active = n === cur;
  return (
    <button
      onClick={() => set(n)}
      className={`w-full text-left rounded-xl p-3 border transition ${
        active ? 'border-layer-relational bg-layer-relational/10' : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="font-medium">{title}</div>
        <div className="text-xs opacity-60">{weeks}</div>
      </div>
      <div className="text-xs opacity-75 mt-1">{desc}</div>
    </button>
  );
}

function TourSteps({ t }: { t: (k: string) => string }) {
  const steps = [
    { title: t('onboarding.tour.step1.title'), body: t('onboarding.tour.step1.body') },
    { title: t('onboarding.tour.step2.title'), body: t('onboarding.tour.step2.body') },
    { title: t('onboarding.tour.step3.title'), body: t('onboarding.tour.step3.body') },
    { title: t('onboarding.tour.step4.title'), body: t('onboarding.tour.step4.body') },
  ];
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3 fade-in" style={{ animationDelay: `${i * 80}ms` }}>
          <span className="w-6 h-6 shrink-0 rounded-full bg-layer-relational/20 text-layer-relational text-xs flex items-center justify-center font-semibold">
            {i + 1}
          </span>
          <div>
            <div className="text-sm font-medium">{s.title}</div>
            <div className="text-xs opacity-75 mt-0.5 leading-relaxed">{s.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

// Inline cyclic-sigh breathing guide — 2 minutes (12 cycles of 9s).
function TryBreathing({ t, onBack, onNext }: { t: (k: string) => string; onBack: () => void; onNext: () => void }) {
  const pattern = [2, 1, 6]; // inhale, top-up, long exhale (seconds)
  const labels = [t('breathing.inhale'), t('breathing.topup'), t('breathing.long_exhale')];
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [remaining, setRemaining] = useState(120);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!running || done) return;
    const stepTimer = window.setTimeout(() => {
      setPhase((p) => (p + 1) % pattern.length);
    }, pattern[phase] * 1000);
    return () => window.clearTimeout(stepTimer);
  }, [phase, running, done]);

  useEffect(() => {
    if (!running || done) return;
    const tick = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { setDone(true); setRunning(false); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(tick);
  }, [running, done]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const isInhaleLike = phase === 0 || phase === 1;
  const isExhale = phase === 2;

  return (
    <div className="space-y-4 fade-in">
      <h2 className="h-section">{t('onboarding.try.title')}</h2>
      <p className="text-sm opacity-75">{t('onboarding.try.desc')}</p>
      <div className="rounded-xl p-6 bg-black/5 dark:bg-white/5 flex flex-col items-center">
        <div
          className="breath-circle rounded-full flex items-center justify-center"
          style={{
            width: 180, height: 180,
            transform: `scale(${running && isInhaleLike ? 1.15 : running && isExhale ? 0.7 : 1})`,
            background: 'radial-gradient(circle, rgba(201,139,107,0.35), rgba(201,139,107,0.1))',
            transitionDuration: `${(pattern[phase] || 1) * 1000}ms`,
          }}
        >
          <span className="font-serif text-lg">{done ? '✓' : running ? labels[phase] : t('breathing.ready')}</span>
        </div>
        <div className="mt-3 text-xs opacity-60 tabular-nums">{mm}:{ss}</div>
        {!done ? (
          <div className="mt-4 flex gap-2">
            <button onClick={() => setRunning((r) => !r)} className="btn">
              {running ? <Pause size={14} /> : <Play size={14} />}
              {running ? t('timers.pause') : t('timers.start')}
            </button>
          </div>
        ) : (
          <div className="mt-4 text-sm text-center">
            <p className="font-medium">{t('onboarding.try.complete')}</p>
          </div>
        )}
      </div>
      <p className="text-xs opacity-60 text-center">{t('onboarding.try.skip_hint')}</p>
      <NavRow onBack={onBack} onNext={onNext} t={t} />
    </div>
  );
}

