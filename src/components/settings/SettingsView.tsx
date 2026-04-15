import { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { exportState, importState } from '../../utils/exportImport';
import { Download, Upload, Trash2 } from 'lucide-react';

export function SettingsView() {
  const { state, updateSettings, replaceState, clearAll } = useApp();
  const [confirming, setConfirming] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onImport = async (file: File) => {
    try {
      const next = await importState(file);
      replaceState(next);
      alert('Data imported.');
    } catch (e) {
      alert('Import failed: ' + (e as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="h-title">Settings & data</h1>
      </div>

      <section className="card p-5 space-y-3">
        <h2 className="h-section">Theme</h2>
        <div className="flex gap-2">
          {(['light', 'dark', 'system'] as const).map((t) => (
            <button key={t} onClick={() => updateSettings({ theme: t })}
              className={`px-3 py-1.5 rounded-full text-sm ${state.settings.theme === t ? 'bg-charcoal text-cream dark:bg-cream dark:text-charcoal' : 'bg-black/5 dark:bg-white/10'}`}>
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="h-section">Your data</h2>
        <p className="text-sm opacity-80">All your data is stored locally on this device. Nothing is sent to any server. No accounts, analytics, or tracking. Your growth is yours alone.</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn" onClick={() => exportState(state)}><Download size={14} /> Export JSON</button>
          <button className="btn-ghost border border-black/10 dark:border-white/10" onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> Import JSON
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onImport(f); e.target.value = ''; }} />
          <button className="btn-ghost border border-red-400/50 text-red-700 dark:text-red-400" onClick={() => setConfirming(true)}>
            <Trash2 size={14} /> Clear all data
          </button>
        </div>
      </section>

      <section className="card p-5 space-y-2">
        <h2 className="h-section">About</h2>
        <p className="text-sm opacity-80">The Complete Human is an open-source personal development tool built on behavioral science. Practices, evidence, and daily insights are drawn from published research across psychology, neuroscience, and sociology.</p>
        <p className="text-sm opacity-80">This tool implements practices from published research. It is not a substitute for professional mental health support.</p>
        <p className="text-xs opacity-60 mt-2">Repository: <a className="underline" href="https://github.com/CandanUmut/complete_human" target="_blank" rel="noreferrer">github.com/CandanUmut/complete_human</a></p>
      </section>

      {confirming && (
        <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center p-4" onClick={() => setConfirming(false)}>
          <div className="card p-5 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="h-section mb-2">Clear all data?</h3>
            <p className="text-sm opacity-80 mb-4">This deletes all practices, logs, journal entries, and settings from this device. You may want to export a backup first.</p>
            <div className="flex justify-end gap-2">
              <button className="btn-ghost" onClick={() => setConfirming(false)}>Cancel</button>
              <button className="btn !bg-red-700 !text-white" onClick={() => { clearAll(); setConfirming(false); location.hash = '#/today'; }}>
                Clear everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
