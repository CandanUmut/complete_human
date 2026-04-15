import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { LAYERS, LAYER_COLORS } from '../../types';
import type { Layer, Frequency, Phase, Practice } from '../../types';
import { Check, Plus, X } from 'lucide-react';
import { FirstVisitBanner } from '../ui/FirstVisitBanner';
import { EmptyState } from '../ui/EmptyState';

export function PracticeLibrary() {
  const { state, togglePracticeActive, addPractice, removePractice } = useApp();
  const { t, l } = useTranslation();
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
          <h1 className="h-title">{t('practices.title')}</h1>
          <p className="opacity-70 text-sm mt-1">{t('practices.subtitle')}</p>
        </div>
        <button className="btn" onClick={() => setAdding(true)}><Plus size={14} /> {t('practices.custom')}</button>
      </div>

      <FirstVisitBanner id="practices" />

      <div className="card p-3 space-y-2">
        <FilterRow label={t('practices.filter.layer')}>
          <Chip active={layer === 'all'} onClick={() => setLayer('all')}>{t('practices.filter.all')}</Chip>
          {LAYERS.map((lyr) => (
            <Chip key={lyr} active={layer === lyr} onClick={() => setLayer(lyr)} color={LAYER_COLORS[lyr]}>
              {t(`layer.${lyr}`)}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label={t('practices.filter.frequency')}>
          <Chip active={freq === 'all'} onClick={() => setFreq('all')}>{t('practices.filter.all')}</Chip>
          {(['daily', 'weekly', 'asNeeded'] as const).map((f) => (
            <Chip key={f} active={freq === f} onClick={() => setFreq(f)}>{t(`practices.freq.${f}`)}</Chip>
          ))}
        </FilterRow>
        <FilterRow label={t('practices.filter.phase')}>
          <Chip active={phase === 'all'} onClick={() => setPhase('all')}>{t('practices.filter.all')}</Chip>
          {[1, 2, 3].map((p) => (
            <Chip key={p} active={phase === p} onClick={() => setPhase(p as Phase)}>{t(`phase.${p}.short`)}</Chip>
          ))}
        </FilterRow>
        <FilterRow label={t('practices.filter.status')}>
          {(['all', 'active', 'inactive'] as const).map((s) => (
            <Chip key={s} active={showOnly === s} onClick={() => setShowOnly(s)}>{t(`practices.filter.${s}`)}</Chip>
          ))}
        </FilterRow>
      </div>

      {filtered.length === 0 ? (
        <EmptyState>{t('practices.empty')}</EmptyState>
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((p) => (
            <article key={p.id} className="card p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="chip" style={{ color: LAYER_COLORS[p.layer] }}>{t(`layer.${p.layer}`)}</span>
                <span className="text-xs opacity-60">{t('practices.time_min', { min: p.timeMinutes })} · {t(`practices.freq.${p.frequency}`)}</span>
              </div>
              <h3 className="font-serif text-lg leading-snug">{l(p.name)}</h3>
              <p className="text-sm opacity-80 flex-1">{l(p.description)}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs opacity-60">{t(`phase.${p.phase}.short`)}</span>
                <div className="flex gap-2">
                  {p.custom && (
                    <button onClick={() => removePractice(p.id)} className="btn-ghost text-xs"><X size={12} /> {t('practices.remove')}</button>
                  )}
                  <button
                    onClick={() => togglePracticeActive(p.id)}
                    className={p.active ? 'btn' : 'btn-ghost border border-black/10 dark:border-white/10'}
                  >
                    {p.active ? <><Check size={14} /> {t('practices.active_btn')}</> : <><Plus size={14} /> {t('practices.add')}</>}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

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
  const { t } = useTranslation();
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
      description: '',
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
        <h3 className="h-section">{t('practices.custom_add_title')}</h3>
        <div>
          <label className="label">{t('practices.custom_name')}</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">{t('practices.filter.layer')}</label>
            <select className="input" value={layer} onChange={(e) => setLayer(e.target.value as Layer)}>
              {LAYERS.map((l2) => <option key={l2} value={l2}>{t(`layer.${l2}`)}</option>)}
            </select>
          </div>
          <div>
            <label className="label">{t('practices.filter.frequency')}</label>
            <select className="input" value={freq} onChange={(e) => setFreq(e.target.value as Frequency)}>
              <option value="daily">{t('practices.freq.daily')}</option>
              <option value="weekly">{t('practices.freq.weekly')}</option>
              <option value="asNeeded">{t('practices.freq.asNeeded')}</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">{t('practices.custom_minutes')}</label>
          <input type="number" min={1} max={240} className="input" value={mins} onChange={(e) => setMins(Number(e.target.value))} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="btn-ghost">{t('common.cancel')}</button>
          <button type="submit" className="btn">{t('practices.add')}</button>
        </div>
      </form>
    </div>
  );
}
