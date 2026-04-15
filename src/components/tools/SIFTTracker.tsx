import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { todayKey, formatDate } from '../../utils/dateUtils';
import type { SiftEntry } from '../../types';

export function SIFTTracker() {
  const { state, addSift } = useApp();
  const [e, setE] = useState<Omit<SiftEntry, 'id' | 'date'>>({
    source: '',
    sourceChecked: false,
    betterCoverageFound: false,
    originalTraced: false,
    verdict: 'reliable',
    notes: '',
  });

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!e.source.trim()) return;
    addSift({ ...e, date: todayKey() });
    setE({ source: '', sourceChecked: false, betterCoverageFound: false, originalTraced: false, verdict: 'reliable', notes: '' });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="h-title">SIFT Tracker</h2>
        <p className="opacity-70 text-sm mt-1"><strong>Stop</strong> · <strong>Investigate</strong> the source · <strong>Find</strong> better coverage · <strong>Trace</strong> claims. Wineburg's lateral-reading method.</p>
      </div>

      <form onSubmit={submit} className="card p-4 space-y-3">
        <div>
          <label className="label">Article / claim / source</label>
          <input className="input" value={e.source} onChange={(ev) => setE({ ...e, source: ev.target.value })} placeholder="URL or description" />
        </div>
        <div className="flex flex-wrap gap-4">
          {([
            ['sourceChecked', 'Source investigated'],
            ['betterCoverageFound', 'Better coverage found'],
            ['originalTraced', 'Original claim traced'],
          ] as const).map(([k, label]) => (
            <label key={k} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={e[k]} onChange={(ev) => setE({ ...e, [k]: ev.target.checked })} />
              {label}
            </label>
          ))}
        </div>
        <div>
          <label className="label">Verdict</label>
          <select className="input" value={e.verdict} onChange={(ev) => setE({ ...e, verdict: ev.target.value as SiftEntry['verdict'] })}>
            <option value="reliable">Reliable</option>
            <option value="mixed">Mixed</option>
            <option value="unreliable">Unreliable</option>
          </select>
        </div>
        <div>
          <label className="label">Notes</label>
          <textarea className="input" rows={2} value={e.notes} onChange={(ev) => setE({ ...e, notes: ev.target.value })} />
        </div>
        <div className="flex justify-end"><button className="btn">Log evaluation</button></div>
      </form>

      <div className="space-y-2">
        {state.siftLogs.map((s) => (
          <article key={s.id} className="card p-4">
            <div className="flex items-center justify-between text-xs opacity-60 mb-1">
              <span>{formatDate(s.date)}</span>
              <span className="uppercase tracking-wider">{s.verdict}</span>
            </div>
            <p className="text-sm break-words">{s.source}</p>
            <p className="text-xs mt-1 opacity-70">
              {s.sourceChecked ? '✓ source ' : '· source '}
              {s.betterCoverageFound ? '✓ coverage ' : '· coverage '}
              {s.originalTraced ? '✓ traced' : '· traced'}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
