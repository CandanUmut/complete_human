import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LAYER_COLORS, LAYER_LABELS, type Phase } from '../../types';

export function Onboarding() {
  const { state, updateSettings, togglePracticeActive } = useApp();
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>(1);

  const phasePractices = state.practices.filter((p) => p.phase <= phase);

  const finish = () => updateSettings({ onboardingComplete: true, currentPhase: phase });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full card p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-5 rounded-full border-2 border-layer-relational" />
          <span className="font-serif text-lg">The Complete Human</span>
        </div>

        {step === 0 && (
          <div className="space-y-4 fade-in">
            <h1 className="h-title">Welcome.</h1>
            <p className="text-sm opacity-85 leading-relaxed">
              This is a personal development tool built on behavioral science research — not motivation. It helps you practice small daily actions that compound into real growth across 8 interdependent dimensions of life.
            </p>
            <p className="text-sm opacity-85 leading-relaxed">
              <strong>All data stays on this device.</strong> No accounts. No cloud. No analytics. No tracking. You own your growth.
            </p>
            <div className="flex justify-end"><button className="btn" onClick={() => setStep(1)}>Begin</button></div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 fade-in">
            <h2 className="h-section">Where are you starting?</h2>
            <div className="space-y-2">
              <PhaseOption n={1} cur={phase} set={setPhase} title="Phase 1 — Foundations" desc="Sleep, daily movement, one contemplative practice, evening review. Small and sustainable." />
              <PhaseOption n={2} cur={phase} set={setPhase} title="Phase 2 — Connection & cognition" desc="Deep listening, decision journal, deliberate practice, third places." />
              <PhaseOption n={3} cur={phase} set={setPhase} title="Phase 3 — Expansion & integration" desc="Teaching, skills audit, civic contribution, all 8 layers active." />
            </div>
            <div className="flex justify-between">
              <button className="btn-ghost" onClick={() => setStep(0)}>Back</button>
              <button className="btn" onClick={() => setStep(2)}>Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 fade-in">
            <h2 className="h-section">Pick a small starting set</h2>
            <p className="text-sm opacity-75">Fogg's tiny-habits principle: start with 3–5 practices you can do on a bad day. You can add more later from the library.</p>
            <ul className="space-y-1 max-h-80 overflow-y-auto">
              {phasePractices.map((p) => (
                <li key={p.id}>
                  <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                    <input type="checkbox" checked={p.active} onChange={() => togglePracticeActive(p.id)} className="mt-1" />
                    <span>
                      <span className="block text-sm font-medium">{p.name}</span>
                      <span className="block text-xs mt-0.5" style={{ color: LAYER_COLORS[p.layer] }}>
                        {LAYER_LABELS[p.layer]} · {p.timeMinutes} min · {p.frequency === 'asNeeded' ? 'as needed' : p.frequency}
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="flex justify-between">
              <button className="btn-ghost" onClick={() => setStep(1)}>Back</button>
              <button className="btn" onClick={finish}>Start</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PhaseOption({ n, cur, set, title, desc }: { n: Phase; cur: Phase; set: (p: Phase) => void; title: string; desc: string }) {
  const active = n === cur;
  return (
    <button onClick={() => set(n)}
      className={`w-full text-left rounded-xl p-3 border transition ${active ? 'border-layer-relational bg-layer-relational/10' : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'}`}>
      <div className="font-medium">{title}</div>
      <div className="text-xs opacity-75 mt-0.5">{desc}</div>
    </button>
  );
}
