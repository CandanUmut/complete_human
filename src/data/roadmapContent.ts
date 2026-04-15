import type { Layer, EvidenceStrength } from '../types';

export interface RoadmapTopic {
  id: string;
  title: string;
  evidence: EvidenceStrength;
  why: string;
  what: string;
  how: string[];
  resources: string[];
  practiceIds?: string[];
}

export interface RoadmapLayer {
  layer: Layer;
  title: string;
  summary: string;
  topics: RoadmapTopic[];
}

export const ROADMAP: RoadmapLayer[] = [
  {
    layer: 'foundation',
    title: 'Foundation — Character & Inner Development',
    summary: 'Trust, truthfulness, ethical reasoning, emotional regulation, and contemplative practice. The substrate everything else rests on.',
    topics: [
      {
        id: 'foundation-truth',
        title: 'Truthfulness and psychological safety',
        evidence: 'strong',
        why: 'Zak (2005, Nature) identified oxytocin as a driver of trust; high-trust environments increased generosity to strangers by up to 80%. High-trust organizations report 74% less stress, 106% more energy, and 50% higher productivity (HBR 2017). Edmondson\'s work on psychological safety — validated at scale by Google\'s Project Aristotle — found 85% of employees withhold important information from managers out of fear. Note: oxytocin also increases in-group bias; it\'s not a pure "trust molecule."',
        what: 'Habitual truthfulness, intellectual honesty about what you do and don\'t know, willingness to surface errors and disagreements.',
        how: [
          'State uncertainty explicitly: "I\'m not sure, but…"',
          'Keep a decision journal recording predictions and outcomes',
          'Surface one uncomfortable truth per week that would otherwise stay buried',
        ],
        resources: [
          'Amy Edmondson — The Fearless Organization (2018)',
          'Paul Zak — "The Neuroscience of Trust" (HBR, Jan 2017)',
          'Philip Tetlock — Superforecasting (2015)',
        ],
        practiceIds: ['uncertainty-statement', 'decision-journal'],
      },
      {
        id: 'foundation-ethics',
        title: 'Ethical reasoning beyond intuition',
        evidence: 'moderate',
        why: 'Haidt\'s Social Intuitionist Model shows moral judgments are typically fast intuitions we then rationalize. Kohlberg mapped six stages of moral reasoning; Rest found only ~13.5% of adults reach post-conventional reasoning after age 20. Gilligan\'s critique correctly identified care-oriented ethics as underrepresented. The practical implication: ethical reasoning is a skill, because defaults are biased and parochial.',
        what: 'Fluency across multiple ethical frameworks (virtue, duty, consequence, care, traditional religious ethics) and the habit of checking intuitions against them.',
        how: [
          'Study one ethical framework deeply, then a contrasting one',
          'When facing decisions, articulate the reasoning and steelman the opposition',
          'Notice when an intuition is doing the work and ask which framework supports it',
        ],
        resources: [
          'Jonathan Haidt — The Righteous Mind (2012)',
          'Kwame Anthony Appiah — Experiments in Ethics (2008)',
        ],
      },
      {
        id: 'foundation-regulation',
        title: 'Self-awareness and emotional regulation',
        evidence: 'strong',
        why: 'Gross\'s Process Model (1998) shows antecedent-focused strategies (cognitive reappraisal) outperform response-focused ones (suppression), which alter expression but increase physiological arousal. Kohn et al. (2014) meta-analysis confirms prefrontal/amygdala networks are central — this is a trainable neural skill. de Vos et al. (2015) meta-analyzed MBSR: g = 0.55 pre-post, with effects maintained 1–34 months.',
        what: 'Accurate emotional labeling, reappraisal over suppression, recovery after stress.',
        how: [
          'Label the feeling precisely before reacting',
          'Practice reappraisal: reinterpret the situation rather than suppress the reaction',
          'Take an 8-week MBSR course as a structured starting point',
        ],
        resources: [
          'James Gross — emotion regulation research',
          'Davidson & Goleman — Altered Traits (2017)',
        ],
      },
      {
        id: 'foundation-willpower',
        title: 'What survives about mindset, willpower, and grit',
        evidence: 'moderate',
        why: 'Sisk et al. (2018) meta-analysis of growth mindset: average d = 0.08. Watts, Duncan & Quan (2018) showed marshmallow test effects largely vanish after controlling for family background. Ego depletion failed registered replication (Hagger 2016; Vohs 2021). What survives: Dunning-Kruger remains replicable; intellectual humility improves calibration (Leman 2021).',
        what: 'Intellectual humility over inflated self-belief; environmental design over willpower.',
        how: [
          'Seek disconfirming evidence for your beliefs',
          'Track prediction accuracy with a decision journal',
          'Design environments that make the right action the easy one',
        ],
        resources: [
          'Philip Tetlock — Superforecasting (2015)',
          'BJ Fogg — Tiny Habits (2019)',
        ],
        practiceIds: ['decision-journal'],
      },
      {
        id: 'foundation-contemplative',
        title: 'Contemplative practice',
        evidence: 'strong',
        why: 'Davidson\'s PNAS work (Lutz et al. 2004) found sustained gamma oscillations in long-term practitioners. The 2003 MBSR study showed left-anterior activation increases and higher influenza antibody titers. Islamic prayer research (Achour 2021; Doufesh EEG) is emerging with smaller samples. Stoic practice inherits CBT\'s evidence base (Ellis explicitly acknowledged Stoic origins); MacLellan (2024) showed Stoic journaling helped anxiety-prone participants.',
        what: '10+ minutes of daily contemplative practice (mindfulness, loving-kindness, prayer, or Stoic reflection) plus a brief evening review.',
        how: [
          '10 minutes of daily meditation or contemplative prayer in your tradition',
          'Evening review (Marcus Aurelius style): what went well, what could improve',
          'Try loving-kindness meditation weekly for compassion training (Singer ReSource)',
        ],
        resources: [
          'Jon Kabat-Zinn — MBSR curriculum',
          'Marcus Aurelius — Meditations',
          'William Irvine — A Guide to the Good Life (2008)',
        ],
        practiceIds: ['meditation-10', 'evening-review'],
      },
    ],
  },
  {
    layer: 'relational',
    title: 'Relational — How We Connect',
    summary: 'Deep listening, compassion, conflict skill, and the weak ties that make communities resilient.',
    topics: [
      {
        id: 'relational-listening',
        title: 'Deep listening',
        evidence: 'strong',
        why: 'Rogers & Farson (1957) framed listening as the core vehicle for change. Weger et al. (2014, n=115) found active listening produced significantly greater feelings of being understood than advice or acknowledgment. Weger 2018 (n=434) found active empathic listening by instructors correlated negatively with three types of classroom incivility.',
        what: 'Presence, paraphrasing, emotional attunement, non-judgment. Being with someone\'s experience rather than waiting to speak.',
        how: [
          'One daily conversation: 5+ minutes of listening without advice or interruption',
          'Paraphrase: "What I hear you saying is…"',
          'Notice the urge to solve; stay with the person instead',
        ],
        resources: [
          'Michael Nichols — The Lost Art of Listening',
          'Carl Rogers — A Way of Being (1980)',
        ],
        practiceIds: ['deep-listening'],
      },
      {
        id: 'relational-empathy',
        title: 'Empathy vs. compassion',
        evidence: 'strong',
        why: 'Singer (2004, Science) showed watching a loved one in pain activates affective pain networks. Later work found empathy and compassion activate non-overlapping networks: empathy engages pain-related regions (burnout-prone); compassion activates reward circuits (sustainable). The ReSource Project (Singer 2017) found different mental trainings produce different neural, behavioral, and cortisol effects — "it matters what you practice." Bloom (2016) argues empathy is biased and numerically blind; rational compassion is the better target.',
        what: 'Compassion (motivation to help) over pure empathy (absorbing distress). Impartial concern built deliberately.',
        how: [
          'Loving-kindness meditation 10 min/day: self, loved, neutral, difficult, all beings',
          'When empathic distress arises, shift to: "What can I do to help?"',
          'Try Singer\'s contemplative dyad practice with a partner',
        ],
        resources: [
          'Paul Bloom — Against Empathy (2016)',
          'Tania Singer — ReSource Project papers',
        ],
        practiceIds: ['loving-kindness'],
      },
      {
        id: 'relational-conflict',
        title: 'Difficult conversations and negotiation',
        evidence: 'moderate',
        why: 'Rosenberg\'s NVC (observation, feeling, need, request) has a 2024 scoping review showing improved interpersonal relationships and reduced workplace conflict. Fisher/Ury/Patton\'s Getting to Yes introduced BATNA and principled negotiation, now foundational. Patterson et al.\'s Crucial Conversations: mutual safety is the prerequisite for productive content dialogue.',
        what: 'NVC\'s four steps for daily practice; BATNA awareness for negotiation; safety-building in high-stakes conversations.',
        how: [
          'Practice NVC\'s four steps in one conversation this week',
          'Before your next negotiation, write down your BATNA',
          'In tough conversations, restore mutual safety before discussing content',
        ],
        resources: [
          'Marshall Rosenberg — Nonviolent Communication (2003)',
          'Fisher, Ury & Patton — Getting to Yes (1981)',
          'Patterson et al. — Crucial Conversations (2002)',
        ],
        practiceIds: ['nvc-reflection'],
      },
      {
        id: 'relational-ties',
        title: 'Weak ties and social infrastructure',
        evidence: 'moderate',
        why: 'Granovetter (1973): weak ties carry novel information — most jobs come from acquaintances. Putnam (2000): civic participation predicts health and institutional trust. Klinenberg (2002, Heat Wave): neighborhoods with stronger social infrastructure had dramatically lower death rates in the 1995 Chicago heat wave, controlling for poverty. Harvard Study of Adult Development: relationship quality at 50 predicts physical health at 80 better than cholesterol.',
        what: 'An active network of weak ties plus high-quality close relationships, supported by regular presence in shared third places.',
        how: [
          'Weekly: spend time in a third place (café, library, gym, place of worship)',
          'Initiate one weak-tie conversation per week',
          'Protect a small number of deep relationships with recurring time',
        ],
        resources: [
          'Eric Klinenberg — Palaces for the People (2018)',
          'Robert Putnam — Bowling Alone (2000)',
        ],
        practiceIds: ['third-place'],
      },
    ],
  },
  {
    layer: 'cognitive',
    title: 'Cognitive — Thinking & Learning',
    summary: 'Evaluating information, reasoning under uncertainty, learning that actually sticks, and deep reading.',
    topics: [
      {
        id: 'cognitive-critical',
        title: 'Critical evaluation of information',
        evidence: 'strong',
        why: 'Wineburg & McGrew (2017, Stanford History Education Group): professional fact-checkers were twice as effective as PhD historians at evaluating online sources. Fact-checkers read laterally (checking what others say about a source); experts read vertically (staying on the source site). This is the single most actionable finding in modern media literacy.',
        what: 'Lateral reading habits and a consistent check protocol (SIFT).',
        how: [
          'SIFT one piece of content per day: Stop, Investigate the source, Find better coverage, Trace claims to originals',
          'Open multiple tabs before trusting any single source',
          'Track Wikipedia\'s sourcing for contested topics',
        ],
        resources: [
          'Mike Caulfield — SIFT method',
          'Sam Wineburg & Sarah McGrew — Stanford Digital Inquiry Group',
        ],
        practiceIds: ['sift'],
      },
      {
        id: 'cognitive-reasoning',
        title: 'Reasoning under uncertainty',
        evidence: 'strong',
        why: 'Tetlock\'s superforecasters beat intelligence analysts with classified data by ~30%. Keys: probabilistic thinking, frequent belief updating, calibration tracking, and team deliberation. Kahneman\'s System 1 / System 2 framework, Gigerenzer\'s heuristics research, and Klein\'s naturalistic decision-making all converge on explicit structures for hard calls.',
        what: 'Calibrated confidence, explicit probability language, and a habit of recording predictions before outcomes are known.',
        how: [
          'Use the Decision Journal: record prediction, confidence %, reasoning, outcome',
          'Review calibration quarterly — are your 70% predictions right ~70% of the time?',
          'Before major decisions, do a pre-mortem',
        ],
        resources: [
          'Philip Tetlock — Superforecasting (2015)',
          'Daniel Kahneman — Thinking, Fast and Slow (2011)',
          'Annie Duke — Thinking in Bets (2018)',
        ],
        practiceIds: ['decision-journal', 'pre-mortem'],
      },
      {
        id: 'cognitive-learning',
        title: 'Learning that actually sticks',
        evidence: 'strong',
        why: 'Dunlosky et al. (2013) rated only two techniques "high utility": retrieval practice and spaced repetition. Highlighting, rereading, and summarization ranked low — despite being the most common student strategies. Karpicke & Blunt (2011, Science): retrieval beats elaborate concept mapping for durable learning.',
        what: 'Active recall + spacing + interleaving as the core learning loop.',
        how: [
          'Use spaced repetition software (Anki) for factual material',
          'After reading, close the book and write from memory before checking',
          'Interleave topics rather than blocking practice',
        ],
        resources: [
          'Peter C. Brown — Make It Stick (2014)',
          'Dunlosky et al. (2013, PSPI)',
        ],
        practiceIds: ['spaced-repetition'],
      },
      {
        id: 'cognitive-reading',
        title: 'Deep reading',
        evidence: 'moderate',
        why: 'Maryanne Wolf\'s research: long-form uninterrupted reading recruits neural networks that skimming does not. Digital skimming is displacing deep reading even among strong readers. The capacity for sustained analytic thought depends on preserving deep-reading time.',
        what: '20+ minutes daily of uninterrupted long-form reading, ideally on paper, ideally a single book carried over days.',
        how: [
          '20 minutes daily, phone in another room',
          'Prefer one book deep over many books shallow',
          'Note questions and counterarguments in the margin',
        ],
        resources: [
          'Maryanne Wolf — Reader, Come Home (2018)',
        ],
        practiceIds: ['deep-read-20'],
      },
    ],
  },
  {
    layer: 'physical',
    title: 'Physical — Body as Infrastructure',
    summary: 'Sleep, movement, breath, and recovery. Body state sets the ceiling for everything above it.',
    topics: [
      {
        id: 'physical-sleep',
        title: 'Sleep',
        evidence: 'strong',
        why: 'Walker (2017) synthesizes evidence that sleep deprivation impairs memory consolidation, emotional regulation, immune function, and metabolic health. Windred et al. (2024) found sleep regularity may predict mortality risk more strongly than duration.',
        what: 'Consistent sleep window, 7–9 hours, protected from screens and late caffeine.',
        how: [
          'Fix a sleep window and defend it; regularity often matters more than duration',
          '60-minute wind-down: dim lights, no screens, light reading',
          'Cut caffeine after early afternoon',
        ],
        resources: [
          'Matthew Walker — Why We Sleep (2017)',
        ],
        practiceIds: ['sleep-prep'],
      },
      {
        id: 'physical-exercise',
        title: 'Movement and resistance',
        evidence: 'strong',
        why: 'WHO: 150–300 min/week moderate aerobic + 2 strength sessions. Momma et al. (2022) meta-analysis: resistance training twice weekly reduces all-cause mortality independently of aerobic activity. Paluch et al. (2022): mortality benefits from walking plateau near ~8,000 steps/day for adults under 60 — 10,000 is marketing, not science.',
        what: 'Aerobic baseline + twice-weekly strength, plus daily movement.',
        how: [
          'Build 150+ aerobic minutes weekly at zone 2 conversational pace',
          'Two full-body strength sessions weekly (compound movements)',
          'Daily walk target somewhere between 7,000 and 10,000 steps',
        ],
        resources: [
          'WHO physical activity guidelines (2020)',
          'Peter Attia — Outlive (2023)',
        ],
        practiceIds: ['exercise-30'],
      },
      {
        id: 'physical-breath',
        title: 'Breath as state regulator',
        evidence: 'strong',
        why: 'Balban, Huberman et al. (2023, Cell Reports Medicine): 5 minutes of cyclic sighing outperformed mindfulness and other breathwork for mood and HRV. Mechanism: long exhales increase parasympathetic activation via vagal tone. Box breathing is used in Navy SEAL and first-responder training for acute state regulation.',
        what: 'A brief daily breath practice (cyclic sighing, box breathing, or 4-7-8) to downshift physiological arousal.',
        how: [
          'Cyclic sighing, 5 min: double inhale through the nose, long exhale through the mouth',
          'Box breathing 4-4-4-4 before high-stakes moments',
          'Use the app\'s animated breathing guide',
        ],
        resources: [
          'Balban et al., 2023',
          'James Nestor — Breath (2020) — popular, with caveats',
        ],
        practiceIds: ['cyclic-sigh'],
      },
    ],
  },
  {
    layer: 'practical',
    title: 'Practical — Work, Money, Systems',
    summary: 'The load-bearing systems of daily life. Choice architecture beats willpower.',
    topics: [
      {
        id: 'practical-work',
        title: 'Deep work and attention',
        evidence: 'moderate',
        why: 'Newport synthesizes evidence that cognitively demanding work benefits from long uninterrupted blocks. Context-switching costs are measurable and substantial. The daily ceiling of true cognitive flow is roughly 3–4 hours for most knowledge workers.',
        what: 'Protected deep-work blocks, a shallow-work box, and explicit shutdown rituals.',
        how: [
          'One 90-minute deep work block per day, no context switching',
          'Batch shallow work into defined windows',
          'Close the day with a written "done / tomorrow" list',
        ],
        resources: [
          'Cal Newport — Deep Work (2016)',
        ],
        practiceIds: ['deep-work-block'],
      },
      {
        id: 'practical-money',
        title: 'Money literacy and choice architecture',
        evidence: 'moderate',
        why: 'Thaler & Sunstein show default options dominate stated preferences; choice architecture outperforms willpower in organ donation, retirement savings, and more. Dunn & Norton (Happy Money) find spending on experiences and others produces more durable well-being than spending on things.',
        what: 'Basic fluency with compound interest, fees, tax-advantaged accounts; automation of saving and investing.',
        how: [
          'Weekly 10-minute budget review',
          'Automate savings; make the default save-first',
          'Spend marginal dollars on experiences and relationships',
        ],
        resources: [
          'Thaler & Sunstein — Nudge (2008)',
          'Dunn & Norton — Happy Money (2013)',
        ],
        practiceIds: ['budget-check'],
      },
    ],
  },
  {
    layer: 'civic',
    title: 'Civic — Community & Institutions',
    summary: 'Participation, institutional literacy, and the infrastructure of trust.',
    topics: [
      {
        id: 'civic-community',
        title: 'Community and social infrastructure',
        evidence: 'moderate',
        why: 'Klinenberg\'s Palaces for the People: libraries, cafés, recreation centers are load-bearing social infrastructure. Ostrom\'s Nobel-winning work: commons can be self-governed sustainably when design principles are met. Putnam documents a decades-long decline in civic participation correlated with health and trust decline.',
        what: 'Regular presence in at least one third place; contribution to at least one local institution or mutual-aid effort.',
        how: [
          'Weekly: time in a third place',
          'Contribute to one local institution (library, school, mosque/church, co-op)',
          'Attend one public meeting per quarter',
        ],
        resources: [
          'Eric Klinenberg — Palaces for the People (2018)',
          'Elinor Ostrom — Governing the Commons (1990)',
        ],
        practiceIds: ['third-place'],
      },
      {
        id: 'civic-info',
        title: 'Civic information diet',
        evidence: 'strong',
        why: 'Same evidence as cognitive-critical but applied to civic life: lateral reading dominates vertical reading for accurate evaluation. Algorithmic feeds narrow rather than broaden perspective; actively diversifying sources is required.',
        what: 'Deliberately diversified news sources; lateral reading before sharing.',
        how: [
          'Follow at least two sources across the political spectrum',
          'Never share a claim you haven\'t traced to its original source',
          'Weekly: lateral-read one civic topic thoroughly',
        ],
        resources: [
          'Mike Caulfield — SIFT',
          'AllSides / Ground News — source diversity tools',
        ],
        practiceIds: ['lateral-reading', 'sift'],
      },
    ],
  },
  {
    layer: 'adaptive',
    title: 'Adaptive — Skills for a Changing World',
    summary: 'Deliberate practice, decision-making under uncertainty, digital minimalism.',
    topics: [
      {
        id: 'adaptive-learning',
        title: 'Deliberate practice',
        evidence: 'strong',
        why: 'Ericsson\'s 30 years of research: top performers accumulate hours of effortful, feedback-rich practice at the edge of current ability. Most "experience" is not deliberate — repetition without feedback entrenches errors.',
        what: 'Targeted practice at your edge with fast, specific feedback.',
        how: [
          'Identify one skill to deliberately practice this quarter',
          'Find a feedback mechanism — teacher, peer, metric',
          '20-minute focused sessions beat hour-long unfocused ones',
        ],
        resources: [
          'Ericsson & Pool — Peak (2016)',
        ],
        practiceIds: ['skill-learning'],
      },
      {
        id: 'adaptive-decisions',
        title: 'Better decisions under uncertainty',
        evidence: 'moderate',
        why: 'Klein\'s pre-mortem: prospective hindsight (imagining failure) improved identification of failure modes by ~30%. Duke reframes decision quality separately from outcome quality — a good decision can yield a bad outcome and vice versa.',
        what: 'Structured tools for major decisions — pre-mortem, BATNA, explicit confidence.',
        how: [
          'Run a pre-mortem before any major decision',
          'Record decisions in the Decision Journal with confidence %',
          'Separate decision quality from outcome quality when reviewing',
        ],
        resources: [
          'Gary Klein — "Performing a Project Premortem" (HBR 2007)',
          'Annie Duke — Thinking in Bets (2018)',
        ],
        practiceIds: ['pre-mortem', 'decision-journal'],
      },
    ],
  },
  {
    layer: 'integration',
    title: 'Integration — Sustainable Habits & Sense-Making',
    summary: 'Small, compounding changes; teaching others; periodic honest review.',
    topics: [
      {
        id: 'integration-habits',
        title: 'Habit formation that actually works',
        evidence: 'strong',
        why: 'Lally et al. (2010) found habit formation times from 18 to 254 days, median 66 — the "21 days" claim has no basis. Fogg: anchor new behaviors to existing routines and make them small enough for a bad day. Clear synthesizes the literature: cue → craving → response → reward; environment design beats willpower.',
        what: 'Tiny, anchored behaviors; environment shaped to default to the right action.',
        how: [
          'Shrink the habit until you can do it on your worst day',
          'Anchor it to an existing cue ("after I brush my teeth, I meditate")',
          'Design environment: phone out of bedroom, book by the bed',
        ],
        resources: [
          'BJ Fogg — Tiny Habits (2019)',
          'James Clear — Atomic Habits (2018)',
        ],
      },
      {
        id: 'integration-review',
        title: 'Periodic honest review',
        evidence: 'consensus',
        why: 'Across traditions (Stoic evening review, examen, muhasaba) and modern sources (OKRs, quarterly reviews), periodic structured reflection consistently outperforms ad hoc self-assessment. The goal is not judgment but calibration.',
        what: 'Quarterly skills audit across the 8 layers; weekly shorter review.',
        how: [
          'Daily evening review: went well / to improve',
          'Weekly: one honest sentence per layer — any movement?',
          'Quarterly: full skills audit with notes',
        ],
        resources: [
          'Marcus Aurelius — Meditations',
          'Peter Drucker — Managing Oneself (1999)',
        ],
        practiceIds: ['evening-review', 'skills-audit'],
      },
      {
        id: 'integration-teach',
        title: 'Teaching consolidates understanding',
        evidence: 'strong',
        why: 'Protégé effect (Fiorella & Mayer 2013): students who expected to teach learned more than those who expected to be tested. Feynman technique formalizes this: explain in plain language; friction reveals gaps.',
        what: 'A weekly act of teaching, writing, or explaining something you\'re learning.',
        how: [
          'Weekly: explain something you learned to someone else',
          'Keep a public or private notes practice — explanations, not summaries',
          'Prefer the "learn to teach" framing over "learn to pass"',
        ],
        resources: [
          'Fiorella & Mayer (2013)',
          'Feynman lectures',
        ],
        practiceIds: ['teach-one-thing'],
      },
    ],
  },
];
