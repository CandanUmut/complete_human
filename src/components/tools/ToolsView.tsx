import { useEffect, useState } from 'react';
import { DecisionJournal } from './DecisionJournal';
import { SIFTTracker } from './SIFTTracker';
import { EveningReview } from './EveningReview';
import { NVCPrompt } from './NVCPrompt';
import { PreMortem } from './PreMortem';
import { SkillsAudit } from './SkillsAudit';
import { ReadingLog } from './ReadingLog';
import { ExerciseLog } from './ExerciseLog';
import { QuickJournal } from './QuickJournal';
import {
  Brain, Search, BookOpen, MessageSquareHeart, AlertTriangle,
  Layers, Book, Dumbbell, PenLine,
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { FirstVisitBanner } from '../ui/FirstVisitBanner';

export type ToolId =
  | 'decision' | 'sift' | 'evening' | 'nvc' | 'premortem'
  | 'skills' | 'reading' | 'exercise' | 'quick_journal';

const TOOL_META: { id: ToolId; Icon: typeof Brain; labelKey: string; blurbKey: string }[] = [
  { id: 'quick_journal', Icon: PenLine, labelKey: 'qj.title', blurbKey: 'qj.blurb' },
  { id: 'evening', Icon: BookOpen, labelKey: 'tools.evening', blurbKey: 'tools.evening.blurb' },
  { id: 'decision', Icon: Brain, labelKey: 'tools.decision', blurbKey: 'tools.decision.blurb' },
  { id: 'sift', Icon: Search, labelKey: 'tools.sift', blurbKey: 'tools.sift.blurb' },
  { id: 'nvc', Icon: MessageSquareHeart, labelKey: 'tools.nvc', blurbKey: 'tools.nvc.blurb' },
  { id: 'premortem', Icon: AlertTriangle, labelKey: 'tools.premortem', blurbKey: 'tools.premortem.blurb' },
  { id: 'skills', Icon: Layers, labelKey: 'tools.skills', blurbKey: 'tools.skills.blurb' },
  { id: 'reading', Icon: Book, labelKey: 'tools.reading', blurbKey: 'tools.reading.blurb' },
  { id: 'exercise', Icon: Dumbbell, labelKey: 'tools.exercise', blurbKey: 'tools.exercise.blurb' },
];

interface Props {
  consumePending?: () => ToolId | null;
}

export function ToolsView({ consumePending }: Props) {
  const [open, setOpen] = useState<ToolId | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!consumePending) return;
    const pending = consumePending();
    if (pending) setOpen(pending);
  }, [consumePending]);

  if (open) {
    return (
      <div className="space-y-4">
        <button className="btn-ghost" onClick={() => setOpen(null)}>{t('tools.back')}</button>
        {open === 'decision' && <DecisionJournal />}
        {open === 'sift' && <SIFTTracker />}
        {open === 'evening' && <EveningReview />}
        {open === 'nvc' && <NVCPrompt />}
        {open === 'premortem' && <PreMortem />}
        {open === 'skills' && <SkillsAudit />}
        {open === 'reading' && <ReadingLog />}
        {open === 'exercise' && <ExerciseLog />}
        {open === 'quick_journal' && <QuickJournal />}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="h-title">{t('tools.title')}</h1>
        <p className="opacity-70 text-sm mt-1">{t('tools.subtitle')}</p>
      </div>
      <FirstVisitBanner id="tools" />
      <div className="grid md:grid-cols-2 gap-3">
        {TOOL_META.map(({ id, Icon, labelKey, blurbKey }) => (
          <button key={id} onClick={() => setOpen(id)} className="card p-4 text-left hover:translate-y-[-1px] transition">
            <div className="flex items-center gap-2 mb-2"><Icon size={18} /><h3 className="font-serif text-lg">{t(labelKey)}</h3></div>
            <p className="text-sm opacity-75">{t(blurbKey)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
