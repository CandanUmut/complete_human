import { useState } from 'react';
import { DecisionJournal } from './DecisionJournal';
import { SIFTTracker } from './SIFTTracker';
import { EveningReview } from './EveningReview';
import { NVCPrompt } from './NVCPrompt';
import { PreMortem } from './PreMortem';
import { SkillsAudit } from './SkillsAudit';
import { ReadingLog } from './ReadingLog';
import { ExerciseLog } from './ExerciseLog';
import { Brain, Search, BookOpen, MessageSquareHeart, AlertTriangle, Layers, Book, Dumbbell } from 'lucide-react';

type Tool = 'decision' | 'sift' | 'evening' | 'nvc' | 'premortem' | 'skills' | 'reading' | 'exercise';

const TOOLS: { id: Tool; label: string; Icon: typeof Brain; blurb: string }[] = [
  { id: 'decision', label: 'Decision Journal', Icon: Brain, blurb: 'Tetlock-style calibrated prediction log.' },
  { id: 'sift', label: 'SIFT Tracker', Icon: Search, blurb: 'Log sources evaluated using the fact-checker method.' },
  { id: 'evening', label: 'Evening Review', Icon: BookOpen, blurb: 'What went well, what to improve. Date-stamped.' },
  { id: 'nvc', label: 'NVC Reflection', Icon: MessageSquareHeart, blurb: "Rosenberg's 4 steps: observation, feeling, need, request." },
  { id: 'premortem', label: 'Pre-Mortem', Icon: AlertTriangle, blurb: "Klein's prospective hindsight for major decisions." },
  { id: 'skills', label: 'Skills Audit', Icon: Layers, blurb: 'Quarterly honest review across the 8 layers.' },
  { id: 'reading', label: 'Reading Log', Icon: Book, blurb: 'Track deep reading minutes and pages.' },
  { id: 'exercise', label: 'Exercise Log', Icon: Dumbbell, blurb: 'Simple log: type, minutes, date.' },
];

export function ToolsView() {
  const [open, setOpen] = useState<Tool | null>(null);

  if (open) {
    return (
      <div className="space-y-4">
        <button className="btn-ghost" onClick={() => setOpen(null)}>← Back to tools</button>
        {open === 'decision' && <DecisionJournal />}
        {open === 'sift' && <SIFTTracker />}
        {open === 'evening' && <EveningReview />}
        {open === 'nvc' && <NVCPrompt />}
        {open === 'premortem' && <PreMortem />}
        {open === 'skills' && <SkillsAudit />}
        {open === 'reading' && <ReadingLog />}
        {open === 'exercise' && <ExerciseLog />}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="h-title">Tools</h1>
        <p className="opacity-70 text-sm mt-1">Built-in tools for the practices that need structure. All data stays on this device.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {TOOLS.map(({ id, label, Icon, blurb }) => (
          <button key={id} onClick={() => setOpen(id)} className="card p-4 text-left hover:translate-y-[-1px] transition">
            <div className="flex items-center gap-2 mb-2"><Icon size={18} /><h3 className="font-serif text-lg">{label}</h3></div>
            <p className="text-sm opacity-75">{blurb}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
