import type { AppState, DecisionEntry, Layer } from '../types';
import { LAYERS } from '../types';
import { daysAgo, todayKey } from './dateUtils';

export const activePracticesFor = (state: AppState, dateKey: string): number => {
  // Simple: active daily practices count as the target for that day.
  // Weekly/asNeeded aren't counted against daily completion.
  const today = todayKey();
  if (dateKey > today) return 0;
  return state.practices.filter((p) => p.active && p.frequency === 'daily').length;
};

export const completionRate = (state: AppState, dateKey: string): number => {
  const target = activePracticesFor(state, dateKey);
  if (target === 0) return 0;
  const log = state.dailyLogs[dateKey];
  if (!log) return 0;
  const dailyIds = new Set(
    state.practices.filter((p) => p.active && p.frequency === 'daily').map((p) => p.id)
  );
  const done = log.completedPractices.filter((id) => dailyIds.has(id)).length;
  return Math.min(1, done / target);
};

export const weeklyCompletionSeries = (state: AppState, weeks = 12): { week: string; rate: number }[] => {
  const out: { week: string; rate: number }[] = [];
  for (let w = weeks - 1; w >= 0; w--) {
    let sum = 0;
    let count = 0;
    for (let d = 0; d < 7; d++) {
      const key = daysAgo(w * 7 + d);
      sum += completionRate(state, key);
      count++;
    }
    out.push({ week: `W-${w}`, rate: count ? sum / count : 0 });
  }
  return out;
};

export const layerActivityCounts = (state: AppState, days = 28): Record<Layer, number> => {
  const counts: Record<Layer, number> = {
    foundation: 0, relational: 0, cognitive: 0, physical: 0,
    practical: 0, civic: 0, adaptive: 0, integration: 0,
  };
  const byId = new Map(state.practices.map((p) => [p.id, p]));
  for (let d = 0; d < days; d++) {
    const log = state.dailyLogs[daysAgo(d)];
    if (!log) continue;
    for (const id of log.completedPractices) {
      const p = byId.get(id);
      if (p) counts[p.layer]++;
    }
  }
  return counts;
};

export const currentStreak = (state: AppState, practiceId: string): number => {
  let s = 0;
  for (let d = 0; d < 365; d++) {
    const log = state.dailyLogs[daysAgo(d)];
    if (log && log.completedPractices.includes(practiceId)) s++;
    else if (d > 0) break;
    else break; // today not done → streak 0
  }
  // Recalculate properly
  s = 0;
  for (let d = 0; d < 365; d++) {
    const log = state.dailyLogs[daysAgo(d)];
    if (log && log.completedPractices.includes(practiceId)) s++;
    else break;
  }
  return s;
};

export const longestStreak = (state: AppState, practiceId: string): number => {
  let max = 0, cur = 0;
  for (let d = 365; d >= 0; d--) {
    const log = state.dailyLogs[daysAgo(d)];
    if (log && log.completedPractices.includes(practiceId)) {
      cur++;
      max = Math.max(max, cur);
    } else {
      cur = 0;
    }
  }
  return max;
};

export const calibrationData = (decisions: DecisionEntry[]) => {
  const buckets: Record<number, { n: number; correct: number }> = {
    50: { n: 0, correct: 0 },
    60: { n: 0, correct: 0 },
    70: { n: 0, correct: 0 },
    80: { n: 0, correct: 0 },
    90: { n: 0, correct: 0 },
    95: { n: 0, correct: 0 },
  };
  for (const d of decisions) {
    if (d.outcome === 'pending') continue;
    const b = buckets[d.confidence];
    if (!b) continue;
    b.n++;
    if (d.outcome === 'correct') b.correct++;
  }
  return Object.entries(buckets).map(([conf, b]) => ({
    confidence: Number(conf),
    n: b.n,
    actual: b.n > 0 ? b.correct / b.n : null,
  }));
};

export const layerList: Layer[] = LAYERS;
