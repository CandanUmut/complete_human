import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { todayKey, formatDate } from '../../utils/dateUtils';
import { LAYERS, LAYER_COLORS, LAYER_LABELS, type AuditLevel, type Layer } from '../../types';

const LEVELS = ['Not started', 'Beginning', 'Developing', 'Practicing', 'Integrated'];

export function SkillsAudit() {
  const { state, addAudit } = useApp();
  const [ratings, setRatings] = useState<Record<Layer, AuditLevel>>(() => {
    const r: Record<Layer, AuditLevel> = {} as Record<Layer, AuditLevel>;
    LAYERS.forEach((l) => (r[l] = 0));
    return r;
  });

  const submit = () => {
    addAudit({ date: todayKey(), ratings });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="h-title">Skills audit</h2>
        <p className="opacity-70 text-sm mt-1">Not a score. A structured reflection across the 8 layers. Use quarterly.</p>
      </div>
      <div className="card p-4 space-y-3">
        {LAYERS.map((l) => (
          <div key={l}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium" style={{ color: LAYER_COLORS[l] }}>{LAYER_LABELS[l]}</span>
              <span className="text-xs opacity-60">{LEVELS[ratings[l]]}</span>
            </div>
            <input type="range" min={0} max={4} step={1}
              value={ratings[l]}
              onChange={(e) => setRatings({ ...ratings, [l]: Number(e.target.value) as AuditLevel })}
              className="w-full"
              style={{ accentColor: LAYER_COLORS[l] }}
            />
          </div>
        ))}
        <div className="flex justify-end pt-2"><button onClick={submit} className="btn">Save audit</button></div>
      </div>
      <div className="space-y-2">
        {state.skillsAudits.map((a) => (
          <article key={a.id} className="card p-4 text-sm">
            <div className="text-xs opacity-60 mb-2">{formatDate(a.date)}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {LAYERS.map((l) => (
                <div key={l}>
                  <div className="text-[11px]" style={{ color: LAYER_COLORS[l] }}>{LAYER_LABELS[l]}</div>
                  <div>{LEVELS[a.ratings[l]]}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
