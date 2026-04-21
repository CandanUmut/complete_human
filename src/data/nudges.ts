import type { AppState, Layer } from '../types';
import type { Language, MaybeLocalized } from '../i18n';
import { localize } from '../i18n';
import { daysAgo, todayKey } from '../utils/dateUtils';
import { layerActivityCounts } from '../utils/statsUtils';

export interface Nudge {
  id: string;
  title: MaybeLocalized<string>;
  body: MaybeLocalized<string>;
  cta?: { labelKey: string; route: string };
}

const daysSince = (iso: string): number => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return 999;
  const diff = Date.now() - d.getTime();
  return Math.floor(diff / 86_400_000);
};

// Count how many days of evening-review journal entries in a window (last N days).
const recentJournalCount = (state: AppState, windowDays = 14): number => {
  const cutoff = daysAgo(windowDays - 1);
  return state.journalEntries.filter((j) => j.date >= cutoff).length;
};

const recentSiftCount = (state: AppState, windowDays = 14): number => {
  const cutoff = daysAgo(windowDays - 1);
  return state.siftLogs.filter((s) => s.date >= cutoff).length;
};

const pendingDecisionCount = (state: AppState): number => {
  return state.decisions.filter((d) => d.outcome === 'pending').length;
};

const overduePredictions = (state: AppState): number => {
  const today = todayKey();
  return state.decisions.filter((d) => d.outcome === 'pending' && d.resolveBy && d.resolveBy <= today).length;
};

const consecutivePracticedDays = (state: AppState): number => {
  let count = 0;
  for (let i = 0; i < 120; i++) {
    const log = state.dailyLogs[daysAgo(i)];
    if (log && log.completedPractices.length > 0) count++;
    else break;
  }
  return count;
};

const weakestLayer = (state: AppState, days = 28): Layer | null => {
  const counts = layerActivityCounts(state, days);
  const entries = Object.entries(counts) as [Layer, number][];
  // Only return a layer that is both the weakest AND below a threshold.
  entries.sort((a, b) => a[1] - b[1]);
  const [layer, n] = entries[0];
  if (n <= 1) return layer;
  return null;
};

// Select at most one nudge for this session, or null.
// `dismissed` is the list of nudge IDs already dismissed — we never show the same one twice.
export function pickNudge(state: AppState, lang: Language, dismissed: string[] = []): Nudge | null {
  const dset = new Set(dismissed);
  const candidates: Nudge[] = [];

  // 1) Overdue decision predictions
  const overdue = overduePredictions(state);
  if (overdue > 0 && !dset.has('nudge.overdue_predictions')) {
    candidates.push({
      id: 'nudge.overdue_predictions',
      title: {
        en: `${overdue} prediction${overdue === 1 ? '' : 's'} ready to resolve`,
        tr: `Çözümlenmeye hazır ${overdue} öngörü`,
      },
      body: {
        en: 'You have predictions past their resolution date. Marking outcomes is where calibration is actually built.',
        tr: 'Çözüm tarihi geçmiş öngörülerin var. Kalibrasyon asıl sonuçları işaretledikçe gelişir.',
      },
      cta: { labelKey: 'common.open', route: 'tools' },
    });
  }

  // 2) SIFT hasn't been done in 2+ weeks
  if (recentSiftCount(state, 14) === 0 && state.dailyLogs && Object.keys(state.dailyLogs).length > 3 && !dset.has('nudge.sift_quiet')) {
    candidates.push({
      id: 'nudge.sift_quiet',
      title: { en: 'Your SIFT practice has been quiet', tr: 'SIFT pratiğin bir süredir sessiz' },
      body: {
        en: 'Even one evaluation this week keeps the information-literacy muscle active. It takes about 5 minutes.',
        tr: 'Bu hafta tek bir değerlendirme bile bilgi okuryazarlığı kasını ayakta tutar. Yaklaşık 5 dakika sürer.',
      },
      cta: { labelKey: 'common.open', route: 'tools' },
    });
  }

  // 3) Evening review has been quiet
  if (recentJournalCount(state, 10) === 0 && !dset.has('nudge.evening_quiet')) {
    candidates.push({
      id: 'nudge.evening_quiet',
      title: { en: 'Evening review has been quiet', tr: 'Akşam değerlendirmesi sessiz' },
      body: {
        en: 'Even 5 minutes of “what went well / what to improve” builds lasting self-awareness over weeks.',
        tr: 'Sadece 5 dakikalık "ne iyi gitti / ne geliştirilebilir" haftalar içinde kalıcı öz-farkındalık kurar.',
      },
      cta: { labelKey: 'common.open', route: 'tools' },
    });
  }

  // 4) Long consistency milestone
  const streak = consecutivePracticedDays(state);
  if (streak >= 30 && !dset.has(`nudge.streak_${Math.floor(streak / 10) * 10}`)) {
    candidates.push({
      id: `nudge.streak_${Math.floor(streak / 10) * 10}`,
      title: {
        en: `You’ve practiced ${streak} days in a row`,
        tr: `${streak} gündür üst üste pratik yapıyorsun`,
      },
      body: {
        en: 'Research on long-term meditators suggests qualitative shifts in attention begin around here. Honest acknowledgment, not pressure.',
        tr: 'Uzun vadeli meditatörler üzerine araştırmalar, dikkatte niteliksel kaymaların burada başladığını gösteriyor. Baskı değil, dürüst bir kabul.',
      },
    });
  }

  // 5) Layer imbalance
  const weak = weakestLayer(state, 28);
  if (weak && !dset.has(`nudge.weak_${weak}`)) {
    const layerLabels: Record<Layer, { en: string; tr: string }> = {
      foundation: { en: 'Foundation', tr: 'Temel' },
      relational: { en: 'Relational', tr: 'İlişkisel' },
      cognitive: { en: 'Cognitive', tr: 'Bilişsel' },
      physical: { en: 'Physical', tr: 'Fiziksel' },
      practical: { en: 'Practical', tr: 'Pratik' },
      civic: { en: 'Civic', tr: 'Toplumsal' },
      adaptive: { en: 'Adaptive', tr: 'Uyumsal' },
      integration: { en: 'Integration', tr: 'Bütünleşme' },
    };
    candidates.push({
      id: `nudge.weak_${weak}`,
      title: {
        en: `Your ${layerLabels[weak].en} layer has been quiet`,
        tr: `${layerLabels[weak].tr} katmanın sessiz`,
      },
      body: {
        en: 'Balance matters — each layer supports the others. Consider adding one practice from this layer this week.',
        tr: 'Denge önemlidir — her katman diğerlerini destekler. Bu hafta bu katmandan bir pratik eklemeyi düşün.',
      },
      cta: { labelKey: 'common.open', route: 'practices' },
    });
  }

  // 6) Pending predictions stale
  const pending = pendingDecisionCount(state);
  if (pending >= 5 && overdue === 0 && !dset.has('nudge.pending_predictions')) {
    candidates.push({
      id: 'nudge.pending_predictions',
      title: {
        en: `${pending} predictions waiting for outcomes`,
        tr: `Sonucu bekleyen ${pending} öngörü`,
      },
      body: {
        en: 'Resolving predictions is where calibration is actually trained. Even a quick pass through them helps.',
        tr: 'Öngörüleri çözümlemek kalibrasyonun gerçekten eğitildiği yerdir. Hızlı bir gözden geçirme bile yardımcı olur.',
      },
      cta: { labelKey: 'common.open', route: 'tools' },
    });
  }

  if (candidates.length === 0) return null;
  // Deterministic pick — rotate based on day so the same one isn't always first.
  const today = todayKey();
  let h = 0;
  for (let i = 0; i < today.length; i++) h = (h * 31 + today.charCodeAt(i)) >>> 0;
  const picked = candidates[h % candidates.length];
  // Return a pre-localized copy to simplify render.
  return {
    id: picked.id,
    title: localize(picked.title, lang),
    body: localize(picked.body, lang),
    cta: picked.cta,
  };
}

export function shouldShowNudgeNow(state: AppState): boolean {
  const last = state.settings.lastNudgeShownAt;
  if (!last) return true;
  return daysSince(last) >= 1;
}
