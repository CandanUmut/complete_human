import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { todayKey, formatDate } from '../../utils/dateUtils';

export function PreMortem() {
  const { state, addPreMortem } = useApp();
  const [e, setE] = useState({ decision: '', failureScenario: '', preventiveActions: '' });

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!e.decision.trim()) return;
    addPreMortem({ ...e, date: todayKey() });
    setE({ decision: '', failureScenario: '', preventiveActions: '' });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="h-title">Pre-mortem</h2>
        <p className="opacity-70 text-sm mt-1">Klein's prospective hindsight: imagine the decision has failed spectacularly. Why? What would you have done differently?</p>
      </div>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <div>
          <label className="label">The decision</label>
          <textarea className="input" rows={2} value={e.decision} onChange={(ev) => setE({ ...e, decision: ev.target.value })} />
        </div>
        <div>
          <label className="label">Imagine it failed spectacularly — what went wrong?</label>
          <textarea className="input" rows={4} value={e.failureScenario} onChange={(ev) => setE({ ...e, failureScenario: ev.target.value })} />
        </div>
        <div>
          <label className="label">Preventive actions now</label>
          <textarea className="input" rows={3} value={e.preventiveActions} onChange={(ev) => setE({ ...e, preventiveActions: ev.target.value })} />
        </div>
        <div className="flex justify-end"><button className="btn">Save</button></div>
      </form>
      <div className="space-y-2">
        {state.premortems.map((p) => (
          <article key={p.id} className="card p-4 text-sm space-y-1">
            <div className="text-xs opacity-60">{formatDate(p.date)}</div>
            <p className="font-medium">{p.decision}</p>
            <p><span className="opacity-60 uppercase tracking-wider text-[11px]">Failure.</span> {p.failureScenario}</p>
            {p.preventiveActions && <p><span className="opacity-60 uppercase tracking-wider text-[11px]">Prevent.</span> {p.preventiveActions}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
