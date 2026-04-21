import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { todayKey, formatDate } from '../../utils/dateUtils';
import { EmptyState } from '../ui/EmptyState';
import { Search, X } from 'lucide-react';
import type { JournalEntry } from '../../types';

// Free-form "Just Write" journal with tagging, full-text search and
// an "On this day" lookback surfaced from past entries.
export function QuickJournal() {
  const { state, addJournal } = useApp();
  const { t } = useTranslation();
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [query, setQuery] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;
    const tags = tagInput
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    addJournal({
      date: todayKey(),
      wentWell: '',
      improve: '',
      kind: 'quick',
      body: text,
      tags: tags.length ? tags : undefined,
    });
    setBody('');
    setTagInput('');
  };

  const entries: JournalEntry[] = state.journalEntries;

  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter((j) => {
      const hay = [j.wentWell, j.improve, j.body ?? '', (j.tags ?? []).join(' ')]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [entries, query]);

  const onThisDay = useMemo(() => {
    // Find an entry from exactly 30 days ago (or nearest within 2 days).
    const today = new Date();
    for (const offset of [30, 29, 31, 28, 60, 90]) {
      const target = new Date(today);
      target.setDate(today.getDate() - offset);
      const y = target.getFullYear();
      const m = String(target.getMonth() + 1).padStart(2, '0');
      const d = String(target.getDate()).padStart(2, '0');
      const key = `${y}-${m}-${d}`;
      const match = entries.find((j) => j.date === key);
      if (match) return { entry: match, offset };
    }
    return null;
  }, [entries]);

  const entryLabel = (j: JournalEntry): string => {
    if (j.kind === 'quick') return t('qj.entry_quick');
    if (j.kind === 'prompt') return t('qj.entry_prompt');
    if (j.wentWell || j.improve) return t('qj.entry_evening');
    return t('qj.entry_quick');
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="h-title">{t('qj.title')}</h2>
        <p className="opacity-70 text-sm mt-1">{t('qj.blurb')}</p>
      </div>

      <form onSubmit={submit} className="card p-4 space-y-3">
        <textarea
          className="input min-h-[140px]"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t('qj.placeholder')}
          autoFocus
        />
        <div>
          <label className="label">{t('qj.tags_label')}</label>
          <input
            className="input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder={t('qj.tags_ph')}
          />
        </div>
        <div className="flex justify-end">
          <button className="btn" disabled={!body.trim()}>{t('qj.save')}</button>
        </div>
      </form>

      {onThisDay && (
        <section className="card p-4 border-l-4 border-layer-integration">
          <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
            {t('qj.on_this_day')} · {onThisDay.offset}d
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            {onThisDay.entry.body || onThisDay.entry.wentWell || onThisDay.entry.improve}
          </p>
          <p className="text-xs opacity-60 mt-2">{t('qj.on_this_day_body')}</p>
        </section>
      )}

      {entries.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 input">
            <Search size={14} className="opacity-60" />
            <input
              className="bg-transparent outline-none flex-1 text-sm"
              placeholder={t('qj.search_ph')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="opacity-50 hover:opacity-100"
                onClick={() => setQuery('')}
                aria-label={t('common.close')}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {entries.length === 0 ? (
        <EmptyState>{t('qj.empty')}</EmptyState>
      ) : (
        <div className="space-y-2">
          {filtered.map((j) => (
            <article key={j.id} className="card p-4">
              <div className="flex items-center justify-between text-xs opacity-60 mb-2">
                <span>{formatDate(j.date)}</span>
                <span>{entryLabel(j)}</span>
              </div>
              {j.body && <p className="text-sm whitespace-pre-wrap">{j.body}</p>}
              {!j.body && j.wentWell && (
                <div className="mb-2">
                  <div className="text-[11px] uppercase tracking-wider opacity-60">
                    {t('er.went_well')}
                  </div>
                  <p className="text-sm">{j.wentWell}</p>
                </div>
              )}
              {!j.body && j.improve && (
                <div>
                  <div className="text-[11px] uppercase tracking-wider opacity-60">
                    {t('er.improve')}
                  </div>
                  <p className="text-sm">{j.improve}</p>
                </div>
              )}
              {j.tags && j.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {j.tags.map((tag) => (
                    <span key={tag} className="chip text-[10px]">#{tag}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
