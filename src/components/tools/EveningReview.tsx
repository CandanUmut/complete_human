import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey, formatDate } from '../../utils/dateUtils';
import { HelpTooltip } from '../ui/HelpTooltip';
import { EmptyState } from '../ui/EmptyState';
import { CompletionMoment } from '../ui/CompletionMoment';
import { JOURNAL_PROMPTS, pickDailyPrompt } from '../../data/journalPrompts';
import { Star } from 'lucide-react';

export function EveningReview() {
  const { state, addJournal, updateSettings } = useApp();
  const { t, l, lang } = useTranslation();
  const [wentWell, setWentWell] = useState('');
  const [improve, setImprove] = useState('');
  const [promptAnswer, setPromptAnswer] = useState('');
  const [shownCompletion, setShownCompletion] = useState(false);
  const [rotateCounter, setRotateCounter] = useState(0);

  const starred = state.settings.starredPromptIds ?? [];
  const shown = state.settings.shownPromptIds ?? [];

  const prompt = useMemo(() => {
    // Pick a deterministic prompt for today, but allow user to cycle with rotateCounter.
    const seed = todayKey() + ':' + rotateCounter;
    return pickDailyPrompt(lang, seed, shown, starred);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotateCounter, lang, shown.join(','), starred.join(',')]);

  const toggleStar = () => {
    const set = new Set(starred);
    if (set.has(prompt.id)) set.delete(prompt.id);
    else set.add(prompt.id);
    updateSettings({ starredPromptIds: Array.from(set) });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = wentWell.trim();
    const i = improve.trim();
    const p = promptAnswer.trim();
    if (!w && !i && !p) return;
    // Evening entry holds all three if provided.
    addJournal({
      date: todayKey(),
      wentWell: w,
      improve: i,
      kind: 'evening',
      body: p || undefined,
      promptId: p ? prompt.id : undefined,
    });
    // Remember this prompt as shown (last 10 rolling).
    const nextShown = [...shown, prompt.id].slice(-10);
    updateSettings({ shownPromptIds: nextShown });
    setWentWell('');
    setImprove('');
    setPromptAnswer('');
    setShownCompletion(true);
  };

  const eveningCount = state.journalEntries.filter(
    (j) => j.kind === undefined || j.kind === 'evening',
  ).length;
  const isStarred = starred.includes(prompt.id);

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="h-title">{t('er.title')}</h2>
          <HelpTooltip text={t('help.evening_review')} />
        </div>
        <p className="opacity-70 text-sm mt-1">{t('er.blurb')}</p>
      </div>

      <form onSubmit={submit} className="card p-4 space-y-4">
        <div>
          <label className="label">{t('er.went_well')}</label>
          <textarea
            className="input"
            rows={3}
            value={wentWell}
            onChange={(e) => setWentWell(e.target.value)}
          />
        </div>
        <div>
          <label className="label">{t('er.improve')}</label>
          <textarea
            className="input"
            rows={3}
            value={improve}
            onChange={(e) => setImprove(e.target.value)}
          />
        </div>

        <div className="pt-3 border-t border-black/5 dark:border-white/5 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="label !mb-0">{t('er.rotating_title')}</label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleStar}
                className={`btn-ghost !px-2 !py-1 text-xs ${isStarred ? 'text-amber-500' : ''}`}
                aria-label={isStarred ? t('er.prompt_unstar') : t('er.prompt_star')}
                title={isStarred ? t('er.prompt_unstar') : t('er.prompt_star')}
              >
                <Star size={14} fill={isStarred ? 'currentColor' : 'none'} />
              </button>
              <button
                type="button"
                onClick={() => setRotateCounter((c) => c + 1)}
                className="btn-ghost !px-2 !py-1 text-xs"
              >
                {t('er.prompt_next')}
              </button>
            </div>
          </div>
          <p className="font-serif text-base leading-snug">{l(prompt.text)}</p>
          <textarea
            className="input"
            rows={3}
            value={promptAnswer}
            onChange={(e) => setPromptAnswer(e.target.value)}
            placeholder={t('er.rotating_answer')}
          />
        </div>

        <div className="flex justify-end">
          <button className="btn">{t('er.save')}</button>
        </div>
      </form>

      {state.journalEntries.length === 0 ? (
        <EmptyState>{t('er.empty')}</EmptyState>
      ) : (
        <div className="space-y-2">
          {state.journalEntries.map((j) => {
            const matched = j.promptId ? JOURNAL_PROMPTS.find((p) => p.id === j.promptId) : null;
            return (
              <article key={j.id} className="card p-4">
                <div className="text-xs opacity-60 mb-2">{formatDate(j.date)}</div>
                {j.wentWell && (
                  <div className="mb-2">
                    <div className="text-[11px] uppercase tracking-wider opacity-60">
                      {t('er.went_well')}
                    </div>
                    <p className="text-sm">{j.wentWell}</p>
                  </div>
                )}
                {j.improve && (
                  <div className="mb-2">
                    <div className="text-[11px] uppercase tracking-wider opacity-60">
                      {t('er.improve')}
                    </div>
                    <p className="text-sm">{j.improve}</p>
                  </div>
                )}
                {j.body && (
                  <div>
                    {matched && (
                      <div className="text-[11px] uppercase tracking-wider opacity-60 mb-0.5">
                        {l(matched.text)}
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{j.body}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {shownCompletion && (
        <CompletionMoment
          kind="evening"
          historyCount={eveningCount + 1}
          onClose={() => setShownCompletion(false)}
        />
      )}
    </div>
  );
}
