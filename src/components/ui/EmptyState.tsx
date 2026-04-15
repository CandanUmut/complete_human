import type { ReactNode } from 'react';

export function EmptyState({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-black/10 dark:border-white/15 p-6 text-sm opacity-80 text-center space-y-2">
      {icon && <div className="opacity-60 flex justify-center">{icon}</div>}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
