import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import type { BannerId } from '../../types';

export function FirstVisitBanner({ id }: { id: BannerId }) {
  const { state, markBannerSeen } = useApp();
  const { t } = useTranslation();
  const seen = state.settings.seenBanners ?? [];
  if (seen.includes(id)) return null;

  return (
    <div className="card p-4 flex gap-3 items-start fade-in border-l-4 border-layer-relational">
      <div className="flex-1 text-sm leading-relaxed">{t(`banner.${id}`)}</div>
      <button
        onClick={() => markBannerSeen(id)}
        aria-label={t('banner.dismiss')}
        className="shrink-0 opacity-60 hover:opacity-100 p-1 rounded"
      >
        <X size={16} />
      </button>
    </div>
  );
}
