import { Sunrise, ListChecks, Wrench, BookOpen, LineChart } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import type { Route } from '../../App';

const TABS: { id: Route; key: string; Icon: typeof Sunrise }[] = [
  { id: 'today', key: 'nav.today', Icon: Sunrise },
  { id: 'practices', key: 'nav.practices', Icon: ListChecks },
  { id: 'tools', key: 'nav.tools', Icon: Wrench },
  { id: 'roadmap', key: 'nav.learn', Icon: BookOpen },
  { id: 'progress', key: 'nav.progress', Icon: LineChart },
];

export function BottomNav({ route, go }: { route: Route; go: (r: Route) => void }) {
  const { t } = useTranslation();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-cream/95 dark:bg-charcoal/95 border-t border-black/10 dark:border-white/10 pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        {TABS.map(({ id, key, Icon }) => {
          const active = route === id;
          const label = t(key);
          return (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className={`w-full flex flex-col items-center gap-0.5 py-2 text-[10px] ${active ? 'text-layer-relational' : 'opacity-70'}`}
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
