import { INSIGHTS } from '../../data/insights';
import { dayOfYear } from '../../utils/dateUtils';
import { LAYER_COLORS } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';

export function QuickInsight() {
  const { t, l } = useTranslation();
  const today = dayOfYear();
  const ins = INSIGHTS[today % INSIGHTS.length];
  return (
    <section className="card p-5" style={{ borderLeft: `4px solid ${LAYER_COLORS[ins.layer]}` }}>
      <div className="text-xs uppercase tracking-wider opacity-60 mb-2">
        {t('today.daily_insight')} · <span style={{ color: LAYER_COLORS[ins.layer] }}>{t(`layer.${ins.layer}`)}</span>
      </div>
      <p className="font-serif text-lg leading-snug">{l(ins.text)}</p>
      <p className="mt-3 text-xs opacity-60">— {ins.source}</p>
    </section>
  );
}
