import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey, formatDate } from '../../utils/dateUtils';
import { HelpTooltip } from '../ui/HelpTooltip';
import { EmptyState } from '../ui/EmptyState';

export function PreMortem() {
  const { state, addPreMortem } = useApp();
  const { t } = useTranslation();
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
        <div className="flex items-center gap-2">
          <h2 className="h-title">{t('pm.title')}</h2>
          <HelpTooltip text={t('help.premortem')} />
        </div>
        <p className="opacity-70 text-sm mt-1">{t('pm.blurb')}</p>
      </div>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <div>
          <label className="label">{t('pm.decision')}</label>
          <textarea className="input" rows={2} value={e.decision} onChange={(ev) => setE({ ...e, decision: ev.target.value })} />
        </div>
        <div>
          <label className="label">{t('pm.failure')}</label>
          <textarea className="input" rows={4} value={e.failureScenario} onChange={(ev) => setE({ ...e, failureScenario: ev.target.value })} />
        </div>
        <div>
          <label className="label">{t('pm.prevent')}</label>
          <textarea className="input" rows={3} value={e.preventiveActions} onChange={(ev) => setE({ ...e, preventiveActions: ev.target.value })} />
        </div>
        <div className="flex justify-end"><button className="btn">{t('common.save')}</button></div>
      </form>
      {state.premortems.length === 0 ? (
        <EmptyState>{t('pm.empty')}</EmptyState>
      ) : (
        <div className="space-y-2">
          {state.premortems.map((p) => (
            <article key={p.id} className="card p-4 text-sm space-y-1">
              <div className="text-xs opacity-60">{formatDate(p.date)}</div>
              <p className="font-medium">{p.decision}</p>
              <p><span className="opacity-60 uppercase tracking-wider text-[11px]">{t('pm.failure')}</span><br />{p.failureScenario}</p>
              {p.preventiveActions && <p><span className="opacity-60 uppercase tracking-wider text-[11px]">{t('pm.prevent')}</span><br />{p.preventiveActions}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
