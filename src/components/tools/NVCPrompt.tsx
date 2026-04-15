import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey, formatDate } from '../../utils/dateUtils';
import { HelpTooltip } from '../ui/HelpTooltip';
import { EmptyState } from '../ui/EmptyState';

export function NVCPrompt() {
  const { state, addNVC } = useApp();
  const { t } = useTranslation();
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
        <div className="flex items-center gap-2">
          <h2 className="h-title">{t('nvc.title')}</h2>
          <HelpTooltip text={t('help.nvc')} />
        </div>
        <p className="opacity-70 text-sm mt-1">{t('nvc.blurb')}</p>
      </div>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <Field label={t('nvc.observation')} value={e.observation} onChange={(v) => setE({ ...e, observation: v })} />
        <Field label={t('nvc.feeling')} value={e.feeling} onChange={(v) => setE({ ...e, feeling: v })} />
        <Field label={t('nvc.need')} value={e.need} onChange={(v) => setE({ ...e, need: v })} />
        <Field label={t('nvc.request')} value={e.request} onChange={(v) => setE({ ...e, request: v })} />
        <div className="flex justify-end"><button className="btn">{t('common.save')}</button></div>
      </form>
      {state.nvcEntries.length === 0 ? (
        <EmptyState>{t('nvc.empty')}</EmptyState>
      ) : (
        <div className="space-y-2">
          {state.nvcEntries.map((n) => (
            <article key={n.id} className="card p-4 text-sm space-y-1">
              <div className="text-xs opacity-60">{formatDate(n.date)}</div>
              <p><span className="opacity-60 uppercase tracking-wider text-[11px]">{t('nvc.observation')}</span><br />{n.observation}</p>
              {n.feeling && <p><span className="opacity-60 uppercase tracking-wider text-[11px]">{t('nvc.feeling')}</span><br />{n.feeling}</p>}
              {n.need && <p><span className="opacity-60 uppercase tracking-wider text-[11px]">{t('nvc.need')}</span><br />{n.need}</p>}
              {n.request && <p><span className="opacity-60 uppercase tracking-wider text-[11px]">{t('nvc.request')}</span><br />{n.request}</p>}
            </article>
          ))}
        </div>
      )}
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
