import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { todayKey, formatDate } from '../../utils/dateUtils';

export function EveningReview() {
  const { state, addJournal } = useApp();
  const [wentWell, setWentWell] = useState('');
  const [improve, setImprove] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wentWell.trim() && !improve.trim()) return;
    addJournal({ date: todayKey(), wentWell: wentWell.trim(), improve: improve.trim() });
    setWentWell(''); setImprove('');
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="h-title">Evening review</h2>
        <p className="opacity-70 text-sm mt-1">Marcus Aurelius in the evening: what did I do well? What could I improve? Private, on-device.</p>
      </div>

      <form onSubmit={submit} className="card p-4 space-y-3">
        <div>
          <label className="label">What went well today?</label>
          <textarea className="input" rows={3} value={wentWell} onChange={(e) => setWentWell(e.target.value)} />
        </div>
        <div>
          <label className="label">What could I improve?</label>
          <textarea className="input" rows={3} value={improve} onChange={(e) => setImprove(e.target.value)} />
        </div>
        <div className="flex justify-end"><button className="btn">Save entry</button></div>
      </form>

      <div className="space-y-2">
        {state.journalEntries.map((j) => (
          <article key={j.id} className="card p-4">
            <div className="text-xs opacity-60 mb-2">{formatDate(j.date)}</div>
            {j.wentWell && <div className="mb-2"><div className="text-[11px] uppercase tracking-wider opacity-60">Went well</div><p className="text-sm">{j.wentWell}</p></div>}
            {j.improve && <div><div className="text-[11px] uppercase tracking-wider opacity-60">To improve</div><p className="text-sm">{j.improve}</p></div>}
          </article>
        ))}
      </div>
    </div>
  );
}
