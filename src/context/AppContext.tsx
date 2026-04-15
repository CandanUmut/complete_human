import { createContext, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type {
  AppState,
  Practice,
  DecisionEntry,
  JournalEntry,
  SiftEntry,
  NVCEntry,
  PreMortemEntry,
  ReadingEntry,
  ExerciseEntry,
  SkillsAudit,
  Settings,
} from '../types';
import { INITIAL_STATE, STORAGE_KEY } from '../data/defaultSettings';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { todayKey } from '../utils/dateUtils';

interface Ctx {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  togglePracticeComplete: (id: string) => void;
  togglePracticeActive: (id: string) => void;
  addPractice: (p: Practice) => void;
  removePractice: (id: string) => void;
  addDecision: (e: Omit<DecisionEntry, 'id'>) => void;
  updateDecision: (id: string, patch: Partial<DecisionEntry>) => void;
  addJournal: (e: Omit<JournalEntry, 'id'>) => void;
  addSift: (e: Omit<SiftEntry, 'id'>) => void;
  addNVC: (e: Omit<NVCEntry, 'id'>) => void;
  addPreMortem: (e: Omit<PreMortemEntry, 'id'>) => void;
  addReading: (e: Omit<ReadingEntry, 'id'>) => void;
  addExercise: (e: Omit<ExerciseEntry, 'id'>) => void;
  addAudit: (e: Omit<SkillsAudit, 'id'>) => void;
  replaceState: (s: AppState) => void;
  clearAll: () => void;
}

const AppCtx = createContext<Ctx | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<AppState>(STORAGE_KEY, INITIAL_STATE);

  // Apply theme class to <html>
  useEffect(() => {
    const apply = () => {
      const theme = state.settings.theme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const dark = theme === 'dark' || (theme === 'system' && prefersDark);
      document.documentElement.classList.toggle('dark', dark);
    };
    apply();
    if (state.settings.theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
  }, [state.settings.theme]);

  const api = useMemo<Ctx>(() => {
    const update = (updater: (s: AppState) => AppState) => setState(updater);

    return {
      state,
      setState: update,
      updateSettings: (patch) =>
        update((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
      togglePracticeComplete: (id) =>
        update((s) => {
          const key = todayKey();
          const log = s.dailyLogs[key] ?? { completedPractices: [] };
          const done = log.completedPractices.includes(id)
            ? log.completedPractices.filter((x) => x !== id)
            : [...log.completedPractices, id];
          return { ...s, dailyLogs: { ...s.dailyLogs, [key]: { ...log, completedPractices: done } } };
        }),
      togglePracticeActive: (id) =>
        update((s) => ({
          ...s,
          practices: s.practices.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
        })),
      addPractice: (p) => update((s) => ({ ...s, practices: [...s.practices, p] })),
      removePractice: (id) =>
        update((s) => ({ ...s, practices: s.practices.filter((p) => p.id !== id) })),
      addDecision: (e) =>
        update((s) => ({ ...s, decisions: [{ ...e, id: uid() }, ...s.decisions] })),
      updateDecision: (id, patch) =>
        update((s) => ({
          ...s,
          decisions: s.decisions.map((d) => (d.id === id ? { ...d, ...patch } : d)),
        })),
      addJournal: (e) =>
        update((s) => ({ ...s, journalEntries: [{ ...e, id: uid() }, ...s.journalEntries] })),
      addSift: (e) => update((s) => ({ ...s, siftLogs: [{ ...e, id: uid() }, ...s.siftLogs] })),
      addNVC: (e) => update((s) => ({ ...s, nvcEntries: [{ ...e, id: uid() }, ...s.nvcEntries] })),
      addPreMortem: (e) =>
        update((s) => ({ ...s, premortems: [{ ...e, id: uid() }, ...s.premortems] })),
      addReading: (e) =>
        update((s) => ({ ...s, readingLog: [{ ...e, id: uid() }, ...s.readingLog] })),
      addExercise: (e) =>
        update((s) => ({ ...s, exerciseLog: [{ ...e, id: uid() }, ...s.exerciseLog] })),
      addAudit: (e) =>
        update((s) => ({ ...s, skillsAudits: [{ ...e, id: uid() }, ...s.skillsAudits] })),
      replaceState: (s) => setState(() => s),
      clearAll: () => setState(() => INITIAL_STATE),
    };
  }, [state, setState]);

  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
