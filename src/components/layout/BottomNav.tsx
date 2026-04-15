import { Sunrise, BookOpen, ListChecks, Wrench, LineChart, Settings } from 'lucide-react';
import type { Route } from '../../App';

const TABS: { id: Route; label: string; Icon: typeof Sunrise }[] = [
  { id: 'today', label: 'Today', Icon: Sunrise },
  { id: 'roadmap', label: 'Roadmap', Icon: BookOpen },
  { id: 'practices', label: 'Practices', Icon: ListChecks },
  { id: 'tools', label: 'Tools', Icon: Wrench },
  { id: 'progress', label: 'Progress', Icon: LineChart },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

export function BottomNav({ route, go }: { route: Route; go: (r: Route) => void }) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-cream/95 dark:bg-charcoal/95 border-t border-black/10 dark:border-white/10 pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-6">
        {TABS.map(({ id, label, Icon }) => {
          const active = route === id;
          return (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className={`w-full flex flex-col items-center gap-0.5 py-2 text-[10px] ${
                  active ? 'text-layer-relational' : 'opacity-70'
                }`}
                aria-label={label}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
