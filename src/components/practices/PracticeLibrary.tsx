import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LAYERS, LAYER_COLORS, LAYER_LABELS } from '../../types';
import type { Layer, Frequency, Phase, Practice } from '../../types';
import { Check, Plus, X } from 'lucide-react';

export function PracticeLibrary() {
  const { state, togglePracticeActive, addPractice, removePractice } = useApp();
  const [layer, setLayer] = useState<Layer | 'all'>('all');
  const [freq, setFreq] = useState<Frequency | 'all'>('all');
  const [phase, setPhase] = useState<Phase | 'all'>('all');
  const [showOnly, setShowOnly] = useState<'all' | 'active' | 'inactive'>('all');
  const [adding, setAdding] = useState(false);

  const filtered = useMemo(() => {
    return state.practices.filter((p) => {
      if (layer !== 'all' && p.layer !== layer) return false;
      if (freq !== 'all' && p.frequency !== freq) return false;
      if (phase !== 'all' && p.phase !== phase) return false;
      if (showOnly === 'active' && !p.active) return false;
      if (showOnly === 'inactive' && p.active) return false;
      return true;
    });
  }, [state.practices, layer, freq, phase, showOnly]);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="h-title">Practice library</h1>
          <p className="opacity-70 text-sm mt-1">Toggle practices on or off. Active daily practices appear in your Today checklist.</p>
        </div>
        <button className="btn" onClick={() => setAdding(true)}><Plus size={14} /> Custom</button>
      </div>

      <div className="card p-3 space-y-2">
        <FilterRow label="Layer">
          <Chip active={layer === 'all'} onClick={() => setLayer('all')}>All</Chip>
          {LAYERS.map((l) => (
            <Chip key={l} active={layer === l} onClick={() => setLayer(l)} color={LAYER_COLORS[l]}>
              {LAYER_LABELS[l]}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Frequency">
          {(['all', 'daily', 'weekly', 'asNeeded'] as const).map((f) => (
            <Chip key={f} active={freq === f} onClick={() => setFreq(f)}>
              {f === 'asNeeded' ? 'As needed' : f[0].toUpperCase() + f.slice(1)}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Phase">
          {(['all', 1, 2, 3] as const).map((p) => (
            <Chip key={String(p)} active={phase === p} onClick={() => setPhase(p)}>{p === 'all' ? 'All' : `Phase ${p}`}</Chip>
          ))}
        </FilterRow>
        <FilterRow label="Status">
          {(['all', 'active', 'inactive'] as const).map((s) => (
            <Chip key={s} active={showOnly === s} onClick={() => setShowOnly(s)}>{s[0].toUpperCase() + s.slice(1)}</Chip>
          ))}
        </FilterRow>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((p) => (
          <article key={p.id} className="card p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="chip" style={{ color: LAYER_COLORS[p.layer] }}>{LAYER_LABELS[p.layer]}</span>
              <span className="text-xs opacity-60">{p.timeMinutes} min · {p.frequency === 'asNeeded' ? 'as needed' : p.frequency}</span>
            </div>
            <h3 className="font-serif text-lg leading-snug">{p.name}</h3>
            <p className="text-sm opacity-80 flex-1">{p.description}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs opacity-60">Phase {p.phase}</span>
              <div className="flex gap-2">
                {p.custom && (
                  <button onClick={() => removePractice(p.id)} className="btn-ghost text-xs"><X size={12} /> Remove</button>
                )}
                <button
                  onClick={() => togglePracticeActive(p.id)}
                  className={p.active ? 'btn' : 'btn-ghost border border-black/10 dark:border-white/10'}
                >
                  {p.active ? <><Check size={14} /> Active</> : <><Plus size={14} /> Add</>}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {adding && <CustomPracticeModal onClose={() => setAdding(false)} onAdd={addPractice} />}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[11px] uppercase tracking-wider opacity-60 w-16 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children, color }: { active: boolean; onClick: () => void; children: React.ReactNode; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-full border transition ${
        active
          ? 'bg-charcoal text-cream border-charcoal dark:bg-cream dark:text-charcoal dark:border-cream'
          : 'bg-transparent border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5'
      }`}
      style={active && color ? { background: color, borderColor: color, color: 'white' } : undefined}
    >
      {children}
    </button>
  );
}

function CustomPracticeModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: Practice) => void }) {
  const [name, setName] = useState('');
  const [layer, setLayer] = useState<Layer>('foundation');
  const [mins, setMins] = useState(10);
  const [freq, setFreq] = useState<Frequency>('daily');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: 'custom-' + Math.random().toString(36).slice(2, 8),
      name: name.trim(),
      description: 'Custom practice.',
      layer,
      timeMinutes: mins,
      frequency: freq,
      phase: 1,
      active: true,
      custom: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-30 bg-black/40 flex items-end md:items-center justify-center p-4" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="card p-5 w-full max-w-md space-y-3">
        <h3 className="h-section">Add a custom practice</h3>
        <div>
          <label className="label">Name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Layer</label>
            <select className="input" value={layer} onChange={(e) => setLayer(e.target.value as Layer)}>
              {LAYERS.map((l) => <option key={l} value={l}>{LAYER_LABELS[l]}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Frequency</label>
            <select className="input" value={freq} onChange={(e) => setFreq(e.target.value as Frequency)}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="asNeeded">As needed</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Minutes</label>
          <input type="number" min={1} max={240} className="input" value={mins} onChange={(e) => setMins(Number(e.target.value))} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
          <button type="submit" className="btn">Add</button>
        </div>
      </form>
    </div>
  );
}
