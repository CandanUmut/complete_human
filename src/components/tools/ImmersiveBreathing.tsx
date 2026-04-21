import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { CompletionMoment } from '../ui/CompletionMoment';

type BreathKind = 'inhale' | 'hold' | 'exhale' | 'none';
export type BreathPreset = 'box' | 'sigh' | '478';

interface Preset {
  id: BreathPreset;
  pattern: number[];
  kinds: BreathKind[];
  labels: string[];
  targetCycles: number;
  title: string;
}

// Uses translated labels at runtime
function getPreset(id: BreathPreset, t: (k: string) => string): Preset {
  switch (id) {
    case 'box':
      return {
        id: 'box',
        pattern: [4, 4, 4, 4],
        kinds: ['inhale', 'hold', 'exhale', 'hold'],
        labels: [t('breathing.inhale'), t('breathing.hold'), t('breathing.exhale'), t('breathing.hold')],
        targetCycles: 8,
        title: t('timers.box'),
      };
    case 'sigh':
      return {
        id: 'sigh',
        pattern: [2, 1, 6, 0],
        kinds: ['inhale', 'inhale', 'exhale', 'none'],
        labels: [t('breathing.inhale'), t('breathing.topup'), t('breathing.long_exhale'), ''],
        targetCycles: 15,
        title: t('timers.sigh'),
      };
    case '478':
      return {
        id: '478',
        pattern: [4, 7, 8, 0],
        kinds: ['inhale', 'hold', 'exhale', 'none'],
        labels: [t('breathing.inhale'), t('breathing.hold'), t('breathing.long_exhale'), ''],
        targetCycles: 4,
        title: '4-7-8',
      };
  }
}

interface Props {
  preset: BreathPreset;
  onClose: () => void;
}

export function ImmersiveBreathing({ preset, onClose }: Props) {
  const { t } = useTranslation();
  const p = getPreset(preset, t);
  const [phase, setPhase] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [running, setRunning] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    // Start automatically a moment after mount for a smoother entry.
    const t = window.setTimeout(() => setRunning(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!running) return;
    const step = p.pattern[phase];
    if (step === 0) {
      setPhase((px) => (px + 1) % p.pattern.length);
      return;
    }
    const timer = window.setTimeout(() => {
      const next = (phase + 1) % p.pattern.length;
      setPhase(next);
      if (next === 0) {
        setCycles((c) => {
          const nc = c + 1;
          if (nc >= p.targetCycles) {
            setRunning(false);
            setShowCompletion(true);
          }
          return nc;
        });
      }
    }, step * 1000);
    return () => window.clearTimeout(timer);
  }, [phase, running, p]);

  const activeKinds = p.kinds.filter((_, i) => p.pattern[i] > 0);
  const activeLabels = p.labels.filter((_, i) => p.pattern[i] > 0);
  const activeIdx = Math.max(0, p.pattern.slice(0, phase + 1).filter((x) => x > 0).length - 1);
  const kind = activeKinds[activeIdx];
  const label = activeLabels[activeIdx];

  const isInhale = kind === 'inhale';
  const isExhale = kind === 'exhale';
  const scale = running ? (isInhale ? 1.25 : isExhale ? 0.65 : 1.0) : 1.0;
  const color = isExhale
    ? 'rgba(122,139,111,0.45)' // sage / cool
    : 'rgba(201,139,107,0.55)'; // warm amber

  const close = () => {
    setRunning(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal text-cream flex flex-col items-center justify-center select-none">
      <button
        onClick={close}
        aria-label={t('immersive.exit')}
        className="absolute top-4 right-4 p-2 rounded-full opacity-60 hover:opacity-100"
      >
        <X size={22} />
      </button>

      <div className="text-xs uppercase tracking-[0.25em] opacity-60 mb-6">{p.title}</div>

      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: 260,
          height: 260,
          transform: `scale(${scale})`,
          background: `radial-gradient(circle, ${color}, rgba(255,255,255,0.02))`,
          transitionProperty: 'transform, background',
          transitionTimingFunction: 'cubic-bezier(.4,0,.4,1)',
          transitionDuration: `${(p.pattern[phase] || 1) * 1000}ms`,
        }}
      >
        <span className="font-serif text-2xl tracking-wide">
          {running ? label : t('breathing.ready')}
        </span>
      </div>

      <div className="mt-10 text-xs opacity-60 tracking-widest uppercase">
        {t('breathing.cycles')}: {cycles} / {p.targetCycles}
      </div>

      <button
        onClick={close}
        className="absolute bottom-10 text-xs opacity-60 hover:opacity-90 tracking-widest uppercase"
      >
        {t('immersive.tap_to_exit')}
      </button>

      {showCompletion && (
        <CompletionMoment kind="breathing" onClose={close} />
      )}
    </div>
  );
}
