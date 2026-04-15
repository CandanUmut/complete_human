import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Wind, Timer as TimerIcon, Brain } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { HelpTooltip } from '../ui/HelpTooltip';

type Mode = null | 'meditation' | 'deep' | 'box' | 'sigh';

export function Timers() {
  const [mode, setMode] = useState<Mode>(null);
  const { t } = useTranslation();

  return (
    <section className="card p-5">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="h-section">{t('timers.title')}</h2>
        <HelpTooltip text={t('help.breathing')} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button onClick={() => setMode('meditation')} className={`btn-ghost !rounded-xl !py-3 flex-col border border-black/5 dark:border-white/10 ${mode === 'meditation' ? 'bg-black/5 dark:bg-white/5' : ''}`}>
          <Brain size={18} /><span className="text-xs">{t('timers.meditation')}</span>
        </button>
        <button onClick={() => setMode('deep')} className={`btn-ghost !rounded-xl !py-3 flex-col border border-black/5 dark:border-white/10 ${mode === 'deep' ? 'bg-black/5 dark:bg-white/5' : ''}`}>
          <TimerIcon size={18} /><span className="text-xs">{t('timers.deep')}</span>
        </button>
        <button onClick={() => setMode('box')} className={`btn-ghost !rounded-xl !py-3 flex-col border border-black/5 dark:border-white/10 ${mode === 'box' ? 'bg-black/5 dark:bg-white/5' : ''}`}>
          <Wind size={18} /><span className="text-xs">{t('timers.box')}</span>
        </button>
        <button onClick={() => setMode('sigh')} className={`btn-ghost !rounded-xl !py-3 flex-col border border-black/5 dark:border-white/10 ${mode === 'sigh' ? 'bg-black/5 dark:bg-white/5' : ''}`}>
          <Wind size={18} /><span className="text-xs">{t('timers.sigh')}</span>
        </button>
      </div>

      <div className="mt-4">
        {mode === 'meditation' && <CountdownTimer label={t('timers.meditation')} presets={[10, 15, 20, 25]} />}
        {mode === 'deep' && <CountdownTimer label={t('timers.deep')} presets={[25, 45, 90]} />}
        {mode === 'box' && <BreathingGuide pattern={[4, 4, 4, 4]} kinds={['inhale', 'hold', 'exhale', 'hold']} labels={[t('breathing.inhale'), t('breathing.hold'), t('breathing.exhale'), t('breathing.hold')]} />}
        {mode === 'sigh' && <BreathingGuide pattern={[2, 1, 6, 0]} kinds={['inhale', 'inhale', 'exhale', 'none']} labels={[t('breathing.inhale'), t('breathing.topup'), t('breathing.long_exhale'), '']} />}
      </div>
    </section>
  );
}

function CountdownTimer({ label, presets }: { label: string; presets: number[] }) {
  const [minutes, setMinutes] = useState(presets[0]);
  const [remaining, setRemaining] = useState(presets[0] * 60);
  const [running, setRunning] = useState(false);
  const { t } = useTranslation();
  const ref = useRef<number | null>(null);

  useEffect(() => { setRemaining(minutes * 60); }, [minutes]);

  useEffect(() => {
    if (!running) return;
    ref.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { bell(); setRunning(false); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => { if (ref.current) window.clearInterval(ref.current); };
  }, [running]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <div className="rounded-xl p-4 bg-black/5 dark:bg-white/5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm opacity-70">{label}</span>
        <div className="flex gap-1">
          {presets.map((p) => (
            <button key={p} onClick={() => { setMinutes(p); setRunning(false); }}
              className={`text-xs px-2 py-1 rounded-full ${minutes === p ? 'bg-charcoal text-cream dark:bg-cream dark:text-charcoal' : 'bg-black/10 dark:bg-white/10'}`}>
              {p}m
            </button>
          ))}
        </div>
      </div>
      <div className="font-serif text-5xl tabular-nums text-center">{mm}:{ss}</div>
      <div className="mt-3 flex justify-center gap-2">
        <button onClick={() => setRunning((r) => !r)} className="btn">{running ? <Pause size={14} /> : <Play size={14} />}{running ? t('timers.pause') : t('timers.start')}</button>
        <button onClick={() => { setRunning(false); setRemaining(minutes * 60); }} className="btn-ghost"><RotateCcw size={14} /> {t('timers.reset')}</button>
      </div>
    </div>
  );
}

function bell() {
  try {
    const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    const ctx = new AC();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = 528;
    g.gain.value = 0.0001;
    o.connect(g); g.connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(0.4, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
    o.start(now); o.stop(now + 2.3);
  } catch {/* noop */}
}

type BreathKind = 'inhale' | 'hold' | 'exhale' | 'none';
function BreathingGuide({ pattern, labels, kinds }: { pattern: number[]; labels: string[]; kinds: BreathKind[] }) {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [cycles, setCycles] = useState(0);
  const { t } = useTranslation();
  const totals = pattern.filter((p) => p > 0);
  const activeLabels = labels.filter((_, i) => pattern[i] > 0);

  useEffect(() => {
    if (!running) return;
    const step = pattern[phase];
    if (step === 0) { setPhase((p) => (p + 1) % pattern.length); return; }
    const timer = window.setTimeout(() => {
      const next = (phase + 1) % pattern.length;
      setPhase(next);
      if (next === 0) setCycles((c) => c + 1);
    }, step * 1000);
    return () => window.clearTimeout(timer);
  }, [phase, running, pattern]);

  const activePhaseIdx = Math.max(0, pattern.slice(0, phase + 1).filter((p) => p > 0).length - 1);
  const activeKinds = kinds.filter((_, i) => pattern[i] > 0);
  const currentKind = activeKinds[activePhaseIdx];
  const isInhaleLike = currentKind === 'inhale';
  const isExhale = currentKind === 'exhale';

  return (
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
        <span className="font-serif text-lg">{running ? activeLabels[activePhaseIdx] : t('breathing.ready')}</span>
      </div>
      <div className="mt-3 text-xs opacity-60">{t('breathing.pattern')}: {totals.join('-')} · {t('breathing.cycles')}: {cycles}</div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => setRunning((r) => !r)} className="btn">
          {running ? <Pause size={14} /> : <Play size={14} />}{running ? t('timers.pause') : t('timers.start')}
        </button>
        <button onClick={() => { setRunning(false); setPhase(0); setCycles(0); }} className="btn-ghost">
          <RotateCcw size={14} /> {t('timers.reset')}
        </button>
      </div>
    </div>
  );
}
