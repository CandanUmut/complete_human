import { useMemo, useState } from 'react';
import { ROADMAP, type RoadmapTopic } from '../../data/roadmapContent';
import { LAYER_COLORS } from '../../types';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { Search, Plus, Check } from 'lucide-react';
import { FirstVisitBanner } from '../ui/FirstVisitBanner';

const DOT: Record<RoadmapTopic['evidence'], string> = {
  strong: '#4a8a5c',
  moderate: '#C98B6B',
  emerging: '#C9A86B',
  consensus: '#888',
};

export function RoadmapView() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const { t, lang } = useTranslation();
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return ROADMAP;
    return ROADMAP
      .map((l) => ({
        ...l,
        topics: l.topics.filter((topic) =>
          topic.title.toLowerCase().includes(q) ||
          topic.why.toLowerCase().includes(q) ||
          topic.what.toLowerCase().includes(q) ||
          topic.how.join(' ').toLowerCase().includes(q)
        ),
      }))
      .filter((l) => l.topics.length > 0);
  }, [q]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="h-title">{t('learn.title')}</h1>
        <p className="opacity-70 text-sm mt-1">{t('learn.subtitle')}</p>
      </div>

      <FirstVisitBanner id="learn" />

      {lang === 'tr' && <p className="text-xs opacity-60 italic">{t('learn.tr_note')}</p>}

      <div className="card p-3 flex items-center gap-2">
        <Search size={16} className="opacity-60" />
        <input
          className="flex-1 bg-transparent focus:outline-none text-sm py-1.5"
          placeholder={t('learn.search_ph')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.map((layer) => (
        <section key={layer.layer} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: LAYER_COLORS[layer.layer] }} />
            <h2 className="h-section">{t(`layer.${layer.layer}`)} — {layer.title.split(' — ')[1] ?? ''}</h2>
          </div>
          <p className="text-sm opacity-70">{layer.summary}</p>
          <div className="space-y-2">
            {layer.topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                color={LAYER_COLORS[layer.layer]}
                open={openId === topic.id}
                onToggle={() => setOpenId(openId === topic.id ? null : topic.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function TopicCard({ topic, color, open, onToggle }: { topic: RoadmapTopic; color: string; open: boolean; onToggle: () => void }) {
  const { state, togglePracticeActive } = useApp();
  const { t, l } = useTranslation();

  return (
    <article className="card overflow-hidden">
      <button onClick={onToggle} className="w-full px-5 py-4 flex items-center justify-between text-left">
        <div>
          <div className="font-serif text-lg">{topic.title}</div>
          <div className="text-xs mt-1 flex items-center gap-1 opacity-70">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: DOT[topic.evidence] }} />
            {t(`learn.evidence.${topic.evidence}`)}
          </div>
        </div>
        <span className="text-xs opacity-50">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-4 fade-in">
          <Section title={t('learn.why')} color={color}>{topic.why}</Section>
          <Section title={t('learn.what')} color={color}>{topic.what}</Section>
          <div>
            <SectionTitle color={color}>{t('learn.how')}</SectionTitle>
            <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
              {topic.how.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
          {topic.resources.length > 0 && (
            <div>
              <SectionTitle color={color}>{t('learn.resources')}</SectionTitle>
              <ul className="mt-2 text-sm space-y-1 opacity-80">
                {topic.resources.map((r, i) => <li key={i}>· {r}</li>)}
              </ul>
            </div>
          )}
          {topic.practiceIds && topic.practiceIds.length > 0 && (
            <div>
              <SectionTitle color={color}>{t('learn.add_practice')}</SectionTitle>
              <div className="mt-2 flex flex-wrap gap-2">
                {topic.practiceIds.map((pid) => {
                  const p = state.practices.find((x) => x.id === pid);
                  if (!p) return null;
                  return (
                    <button key={pid} onClick={() => togglePracticeActive(pid)}
                      className={`chip ${p.active ? 'bg-layer-foundation/20' : ''}`}>
                      {p.active ? <Check size={12} /> : <Plus size={12} />}
                      {l(p.name)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function SectionTitle({ children, color }: { children: string; color: string }) {
  return <div className="text-xs uppercase tracking-wider font-semibold" style={{ color }}>{children}</div>;
}
function Section({ title, color, children }: { title: string; color: string; children: string }) {
  return (
    <div>
      <SectionTitle color={color}>{title}</SectionTitle>
      <p className="mt-1 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
