// "I need help with…" quick access actions for the home screen.
// Each action routes to an existing tool (or timer mode) with a brief framing.

export type QuickHelpId =
  | 'stressed'
  | 'decide'
  | 'hard_talk'
  | 'sift'
  | 'learn'
  | 'move'
  | 'sleep'
  | 'think';

export interface QuickHelpAction {
  id: QuickHelpId;
  icon: string; // emoji so we avoid adding new lucide imports here
  // Translation keys — resolved at render time
  labelKey: string;
  whyKey: string;
}

export const QUICK_HELP: QuickHelpAction[] = [
  { id: 'stressed', icon: '😤', labelKey: 'help_with.stressed.label', whyKey: 'help_with.stressed.why' },
  { id: 'decide', icon: '🤔', labelKey: 'help_with.decide.label', whyKey: 'help_with.decide.why' },
  { id: 'hard_talk', icon: '😶', labelKey: 'help_with.hard_talk.label', whyKey: 'help_with.hard_talk.why' },
  { id: 'sift', icon: '🧐', labelKey: 'help_with.sift.label', whyKey: 'help_with.sift.why' },
  { id: 'learn', icon: '📖', labelKey: 'help_with.learn.label', whyKey: 'help_with.learn.why' },
  { id: 'move', icon: '💪', labelKey: 'help_with.move.label', whyKey: 'help_with.move.why' },
  { id: 'sleep', icon: '😴', labelKey: 'help_with.sleep.label', whyKey: 'help_with.sleep.why' },
  { id: 'think', icon: '✍️', labelKey: 'help_with.think.label', whyKey: 'help_with.think.why' },
];
