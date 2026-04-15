import { Sun, Moon, Laptop, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import type { Route } from '../../App';

const MAIN_TABS: { id: Route; key: string }[] = [
  { id: 'today', key: 'nav.today' },
  { id: 'practices', key: 'nav.practices' },
  { id: 'tools', key: 'nav.tools' },
  { id: 'roadmap', key: 'nav.learn' },
  { id: 'progress', key: 'nav.progress' },
];

export function Header({ route, go }: { route: Route; go: (r: Route) => void }) {
  const { state, updateSettings } = useApp();
  const { t } = useTranslation();
  const cycle = () => {
    const order = ['light', 'dark', 'system'] as const;
    const idx = order.indexOf(state.settings.theme);
    updateSettings({ theme: order[(idx + 1) % order.length] });
  };
  const Icon = state.settings.theme === 'dark' ? Moon : state.settings.theme === 'light' ? Sun : Laptop;

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-cream/80 dark:bg-charcoal/80 border-b border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-2">
        <button onClick={() => go('today')} className="flex items-center gap-2 font-serif text-base md:text-lg font-semibold">
          <span className="inline-block w-5 h-5 rounded-full border-2 border-layer-relational" />
          <span className="hidden sm:inline">The Complete Human</span>
        </button>
        <nav className="hidden md:flex items-center gap-1">
          {MAIN_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => go(tab.id)}
              className={`btn-ghost ${route === tab.id ? 'bg-black/5 dark:bg-white/10' : ''}`}
            >
              {t(tab.key)}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={cycle} aria-label={t('settings.theme')} className="btn-ghost !px-2">
            <Icon size={16} />
          </button>
          <button
            onClick={() => go('settings')}
            aria-label={t('nav.settings')}
            className={`btn-ghost !px-2 ${route === 'settings' ? 'bg-black/5 dark:bg-white/10' : ''}`}
          >
            <SettingsIcon size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
