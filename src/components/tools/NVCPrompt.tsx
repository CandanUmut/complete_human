import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { todayKey, formatDate } from '../../utils/dateUtils';

export function NVCPrompt() {
  const { state, addNVC } = useApp();
  const [e, setE] = useState({ observation: '', feeling: '', need: '', request: '' });

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!e.observation.trim()) return;
    addNVC({ ...e, date: todayKey() });
    setE({ observation: '', feeling: '', need: '', request: '' });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="h-title">NVC reflection</h2>
        <p className="opacity-70 text-sm mt-1">Rosenberg's four steps. Use after a difficult interaction to surface what's really going on underneath judgment.</p>
      </div>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <Field label="Observation (what happened, no judgment)" value={e.observation} onChange={(v) => setE({ ...e, observation: v })} />
        <Field label="Feeling (what I felt)" value={e.feeling} onChange={(v) => setE({ ...e, feeling: v })} />
        <Field label="Need (what need wasn't met)" value={e.need} onChange={(v) => setE({ ...e, need: v })} />
        <Field label="Request (what I'd ask for)" value={e.request} onChange={(v) => setE({ ...e, request: v })} />
        <div className="flex justify-end"><button className="btn">Save</button></div>
      </form>
      <div className="space-y-2">
        {state.nvcEntries.map((n) => (
          <article key={n.id} className="card p-4 text-sm space-y-1">
            <div className="text-xs opacity-60">{formatDate(n.date)}</div>
            <p><span className="opacity-60 uppercase tracking-wider text-[11px]">Obs.</span> {n.observation}</p>
            {n.feeling && <p><span className="opacity-60 uppercase tracking-wider text-[11px]">Feel.</span> {n.feeling}</p>}
            {n.need && <p><span className="opacity-60 uppercase tracking-wider text-[11px]">Need.</span> {n.need}</p>}
            {n.request && <p><span className="opacity-60 uppercase tracking-wider text-[11px]">Req.</span> {n.request}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea className="input" rows={2} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
