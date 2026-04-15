import { Sun, Moon, Laptop } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Route } from '../../App';

const TABS: { id: Route; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'practices', label: 'Practices' },
  { id: 'tools', label: 'Tools' },
  { id: 'progress', label: 'Progress' },
  { id: 'settings', label: 'Settings' },
];

export function Header({ route, go }: { route: Route; go: (r: Route) => void }) {
  const { state, updateSettings } = useApp();
  const cycle = () => {
    const order = ['light', 'dark', 'system'] as const;
    const idx = order.indexOf(state.settings.theme);
    updateSettings({ theme: order[(idx + 1) % order.length] });
  };
  const Icon = state.settings.theme === 'dark' ? Moon : state.settings.theme === 'light' ? Sun : Laptop;

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-cream/80 dark:bg-charcoal/80 border-b border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <button onClick={() => go('today')} className="flex items-center gap-2 font-serif text-lg font-semibold">
          <span className="inline-block w-5 h-5 rounded-full border-2 border-layer-relational" />
          The Complete Human
        </button>
        <nav className="hidden md:flex items-center gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => go(t.id)}
              className={`btn-ghost ${route === t.id ? 'bg-black/5 dark:bg-white/10' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <button onClick={cycle} aria-label="Toggle theme" className="btn-ghost">
          <Icon size={16} />
          <span className="hidden sm:inline capitalize">{state.settings.theme}</span>
        </button>
      </div>
    </header>
  );
}
