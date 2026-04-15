import type { AppState } from '../types';
import { DEFAULT_PRACTICES } from './practices';

export const INITIAL_STATE: AppState = {
  settings: {
    theme: 'system',
    language: 'en',
    currentPhase: 1,
    onboardingComplete: false,
    createdAt: new Date().toISOString(),
    seenBanners: [],
  },
  practices: DEFAULT_PRACTICES,
  dailyLogs: {},
  decisions: [],
  journalEntries: [],
  siftLogs: [],
  nvcEntries: [],
  premortems: [],
  readingLog: [],
  exerciseLog: [],
  skillsAudits: [],
};

export const STORAGE_KEY = 'complete-human:v1';
