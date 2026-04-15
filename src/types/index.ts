export type Layer =
  | 'foundation'
  | 'relational'
  | 'cognitive'
  | 'physical'
  | 'practical'
  | 'civic'
  | 'adaptive'
  | 'integration';

export type Phase = 1 | 2 | 3;
export type Frequency = 'daily' | 'weekly' | 'asNeeded';
export type EvidenceStrength = 'strong' | 'moderate' | 'emerging' | 'consensus';

export type ToolType =
  | 'meditation'
  | 'breathing'
  | 'decision'
  | 'sift'
  | 'evening'
  | 'nvc'
  | 'premortem'
  | 'skills'
  | 'reading'
  | 'exercise'
  | null;

export interface Practice {
  id: string;
  name: string;
  description: string;
  layer: Layer;
  timeMinutes: number;
  frequency: Frequency;
  phase: Phase;
  roadmapSection?: string;
  isDefault?: boolean;
  active: boolean;
  custom?: boolean;
  toolType?: ToolType;
}

export interface DailyLog {
  completedPractices: string[];
  notes?: string;
}

export interface DecisionEntry {
  id: string;
  date: string;
  prediction: string;
  confidence: 50 | 60 | 70 | 80 | 90 | 95;
  outcome: 'pending' | 'correct' | 'incorrect';
  resolvedAt?: string;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  wentWell: string;
  improve: string;
}

export interface SiftEntry {
  id: string;
  date: string;
  source: string;
  sourceChecked: boolean;
  betterCoverageFound: boolean;
  originalTraced: boolean;
  verdict: 'reliable' | 'unreliable' | 'mixed';
  notes?: string;
}

export interface NVCEntry {
  id: string;
  date: string;
  observation: string;
  feeling: string;
  need: string;
  request: string;
}

export interface PreMortemEntry {
  id: string;
  date: string;
  decision: string;
  failureScenario: string;
  preventiveActions: string;
}

export interface ReadingEntry {
  id: string;
  date: string;
  book: string;
  pages: number;
  format: 'print' | 'digital' | 'audio';
  notes?: string;
}

export interface ExerciseEntry {
  id: string;
  date: string;
  type: 'strength' | 'cardio' | 'mobility' | 'walk';
  minutes: number;
  notes?: string;
}

export type AuditLevel = 0 | 1 | 2 | 3 | 4; // not-started, beginning, developing, practicing, integrated

export interface SkillsAudit {
  id: string;
  date: string;
  ratings: Record<Layer, AuditLevel>;
  notes?: Partial<Record<Layer, string>>;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  currentPhase: Phase;
  onboardingComplete: boolean;
  createdAt: string;
}

export interface AppState {
  settings: Settings;
  practices: Practice[];
  dailyLogs: Record<string, DailyLog>;
  decisions: DecisionEntry[];
  journalEntries: JournalEntry[];
  siftLogs: SiftEntry[];
  nvcEntries: NVCEntry[];
  premortems: PreMortemEntry[];
  readingLog: ReadingEntry[];
  exerciseLog: ExerciseEntry[];
  skillsAudits: SkillsAudit[];
}

export const LAYERS: Layer[] = [
  'foundation',
  'relational',
  'cognitive',
  'physical',
  'practical',
  'civic',
  'adaptive',
  'integration',
];

export const LAYER_LABELS: Record<Layer, string> = {
  foundation: 'Foundation',
  relational: 'Relational',
  cognitive: 'Cognitive',
  physical: 'Physical',
  practical: 'Practical',
  civic: 'Civic',
  adaptive: 'Adaptive',
  integration: 'Integration',
};

export const LAYER_COLORS: Record<Layer, string> = {
  foundation: '#7A8B6F',
  relational: '#C98B6B',
  cognitive: '#4A6B8A',
  physical: '#B86B5C',
  practical: '#8A7355',
  civic: '#6B7A8A',
  adaptive: '#8A6B8A',
  integration: '#6B8A7A',
};
