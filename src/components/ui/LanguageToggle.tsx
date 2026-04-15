import { useApp } from '../../context/AppContext';

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { state, updateSettings } = useApp();
  const lang = state.settings.language;

  return (
    <div className={`inline-flex rounded-full overflow-hidden border border-black/10 dark:border-white/15 ${compact ? 'text-xs' : 'text-sm'}`}>
      {(['en', 'tr'] as const).map((l) => (
        <button
          key={l}
          onClick={() => updateSettings({ language: l })}
          className={`px-3 py-1.5 transition ${
            lang === l ? 'bg-charcoal text-cream dark:bg-cream dark:text-charcoal' : 'hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          {l === 'en' ? 'English' : 'Türkçe'}
        </button>
      ))}
    </div>
  );
}
