import { useApp } from '../../context/AppContext';
import { last84Days, formatDate } from '../../utils/dateUtils';
import { completionRate } from '../../utils/statsUtils';

const INTENSITY = [
  'bg-black/5 dark:bg-white/5',
  'bg-layer-foundation/30',
  'bg-layer-foundation/55',
  'bg-layer-foundation/80',
  'bg-layer-foundation',
];

export function ConsistencyGrid() {
  const { state } = useApp();
  const days = last84Days();

  // 12 weeks x 7 days grid (columns = weeks)
  const weeks: string[][] = [];
  for (let w = 0; w < 12; w++) weeks.push(days.slice(w * 7, w * 7 + 7));

  return (
    <section className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="h-section">Consistency — last 12 weeks</h2>
      </div>
      <div className="flex gap-1 overflow-x-auto">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((d) => {
              const r = completionRate(state, d);
              const idx = r === 0 ? 0 : r < 0.25 ? 1 : r < 0.5 ? 2 : r < 0.85 ? 3 : 4;
              return (
                <div
                  key={d}
                  title={`${formatDate(d)} — ${Math.round(r * 100)}%`}
                  className={`heatmap-cell ${INTENSITY[idx]}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs opacity-60">
        <span>less</span>
        {INTENSITY.map((c, i) => <span key={i} className={`heatmap-cell ${c}`} />)}
        <span>more</span>
      </div>
    </section>
  );
}
