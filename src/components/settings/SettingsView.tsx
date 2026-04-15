import { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { exportState, importState } from '../../utils/exportImport';
import { Download, Upload, Trash2, RotateCcw } from 'lucide-react';
import { LanguageToggle } from '../ui/LanguageToggle';

export function SettingsView() {
  const { state, updateSettings, replaceState, clearAll, resetOnboarding } = useApp();
  const { t } = useTranslation();
  const [confirming, setConfirming] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onImport = async (file: File) => {
    try {
      const next = await importState(file);
      replaceState(next);
    } catch (e) {
      alert('Import failed: ' + (e as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="h-title">{t('settings.title')}</h1>
      </div>

      <section className="card p-5 space-y-3">
        <h2 className="h-section">{t('settings.language')}</h2>
        <LanguageToggle />
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="h-section">{t('settings.theme')}</h2>
        <div className="flex gap-2">
          {(['light', 'dark', 'system'] as const).map((tn) => (
            <button key={tn} onClick={() => updateSettings({ theme: tn })}
              className={`px-3 py-1.5 rounded-full text-sm ${state.settings.theme === tn ? 'bg-charcoal text-cream dark:bg-cream dark:text-charcoal' : 'bg-black/5 dark:bg-white/10'}`}>
              {t(`settings.theme.${tn}`)}
            </button>
          ))}
        </div>
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="h-section">{t('settings.your_data')}</h2>
        <p className="text-sm opacity-80">{t('settings.privacy')}</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn" onClick={() => exportState(state)}><Download size={14} /> {t('settings.export')}</button>
          <button className="btn-ghost border border-black/10 dark:border-white/10" onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> {t('settings.import')}
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onImport(f); e.target.value = ''; }} />
          <button className="btn-ghost border border-black/10 dark:border-white/15" onClick={resetOnboarding}>
            <RotateCcw size={14} /> {t('settings.replay_onboarding')}
          </button>
          <button className="btn-ghost border border-red-400/50 text-red-700 dark:text-red-400" onClick={() => setConfirming(true)}>
            <Trash2 size={14} /> {t('settings.clear')}
          </button>
        </div>
      </section>

      <section className="card p-5 space-y-2">
        <h2 className="h-section">{t('settings.about')}</h2>
        <p className="text-sm opacity-80">{t('settings.about.body')}</p>
        <p className="text-sm opacity-80">{t('settings.disclaimer')}</p>
        <p className="text-xs opacity-60 mt-2">{t('settings.repo')}: <a className="underline" href="https://github.com/CandanUmut/complete_human" target="_blank" rel="noreferrer">github.com/CandanUmut/complete_human</a></p>
      </section>

      {confirming && (
        <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center p-4" onClick={() => setConfirming(false)}>
          <div className="card p-5 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="h-section mb-2">{t('settings.clear_confirm_title')}</h3>
            <p className="text-sm opacity-80 mb-4">{t('settings.clear_confirm_body')}</p>
            <div className="flex justify-end gap-2">
              <button className="btn-ghost" onClick={() => setConfirming(false)}>{t('common.cancel')}</button>
              <button className="btn !bg-red-700 !text-white" onClick={() => { clearAll(); setConfirming(false); location.hash = '#/today'; }}>
                {t('settings.clear_confirm_btn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
