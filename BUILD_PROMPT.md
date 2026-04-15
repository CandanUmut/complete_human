# Build Prompt: The Complete Human — Evidence-Based Personal Development Platform

## Project Overview

Build a production-grade, single-page web application called **"The Complete Human"** — an evidence-based personal development platform that implements the actual practices, exercises, and tracking systems recommended by the research document provided below. This is NOT a motivational website or a static self-assessment quiz. It is a **daily-use tool** that helps people practice, track, and compound small improvements across 8 life dimensions backed by behavioral science.

**Deployment:** Static site (Vite + React + TypeScript), deployed via GitHub Pages with GitHub Actions CI/CD.

**Repository:** `the-complete-human` (already created on GitHub)

**Live URL pattern:** `https://[username].github.io/the-complete-human/`

---

## Core Architecture & Tech Stack

- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (via CDN or build step)
- **State Management:** React Context + useReducer (no external dependencies)
- **Data Persistence:** All user data stored in `localStorage` — NO backend, NO accounts, NO cloud. Everything stays on the user's device. This is a private, personal tool.
- **Routing:** Hash-based routing (react-router or manual hash routing for GitHub Pages compatibility)
- **Deployment:** GitHub Actions workflow that builds and deploys to `gh-pages` branch
- **PWA:** Add a service worker and `manifest.json` so users can install it as a mobile app and use it offline
- **Responsive:** Mobile-first design — this will be used primarily on phones during daily routines

---

## Design Direction

### Aesthetic: "Warm Minimalism meets Knowledge System"

Think: Notion meets a beautifully designed personal journal. Clean, calm, spacious — but with warmth and subtle texture. NOT cold corporate SaaS. NOT gamified dopamine-farming. This tool should feel like a trusted companion, not a productivity prison.

- **Color Palette:** Deep warm neutrals as base (warm charcoal `#2D2B2E`, warm cream `#F5F0EB`), with a muted earth-tone accent system — sage green for Foundation layer, warm terracotta for Physical layer, deep blue for Cognitive layer, etc. Each of the 8 layers gets its own muted color. Support both light and dark themes.
- **Typography:** Use a distinctive serif for headings (e.g., Fraunces, Literata, or Lora from Google Fonts) paired with a clean humanist sans-serif for body text (e.g., Source Sans 3, Nunito Sans). The serif gives it gravitas and warmth; the sans-serif keeps it readable.
- **Layout:** Generous whitespace. Card-based content areas with subtle shadows and rounded corners. No visual clutter. Content breathes.
- **Motion:** Subtle fade-in animations on section entry. Smooth transitions between views. Progress indicators that fill satisfyingly. No bouncing, no confetti, no aggressive gamification.
- **Icons:** Use Lucide React icons — clean, consistent line icons.
- **Dark Mode:** Default to system preference, with manual toggle. Dark mode uses warm dark backgrounds (not pure black), cream/warm white text.

### Key Design Principles
1. **Calm over exciting** — this is a daily practice tool, not entertainment
2. **Information density when needed, spaciousness when browsing** — the knowledge base can be dense; the daily practice view should be minimal
3. **Progress shown honestly** — no fake streaks, no manipulative gamification. Show real data: what you did, how consistent you've been, what patterns emerge
4. **Private by design** — prominent "Your data never leaves this device" messaging. No tracking, no analytics, no cookies.

---

## Application Structure — 6 Core Sections

### 1. TODAY VIEW (Default Landing Page)

The daily cockpit. What the user sees every time they open the app.

**Layout:** Single scrollable view, mobile-optimized.

**Components:**

#### A. Daily Practice Checklist
A clean, tappable checklist of today's active micro-practices. Each item is a tiny, specific action from the research — NOT vague goals. Examples:

- ☐ **10-min meditation/prayer** (Foundation Layer)
- ☐ **Deep listening practice** — one conversation, no interrupting (Relational Layer)
- ☐ **SIFT one article** — Stop, Investigate source, Find better coverage, Trace claims (Cognitive Layer)
- ☐ **30-min exercise** — type: [strength/cardio/walk] (Physical Layer)
- ☐ **Decision journal entry** — record one prediction with confidence % (Cognitive Layer)
- ☐ **Evening review** — what went well, what could improve (Foundation Layer)
- ☐ **Read 20 min (paper/deep)** (Cognitive Layer)
- ☐ **Sleep prep ritual started by [time]** (Physical Layer)

Users can customize which practices are active. Completing an item logs it with timestamp. The checklist resets daily.

#### B. Current Phase Indicator
Shows which phase the user is in (Phase 1: Foundations / Phase 2: Connection & Cognition / Phase 3: Expansion & Integration) with a brief summary of focus areas. Users can manually set their phase. The app suggests phase transitions based on consistency data but never forces them.

#### C. Consistency Tracker (GitHub-style Contribution Grid)
A 12-week heatmap grid (like GitHub's contribution graph) showing daily practice completion rate. Color intensity = percentage of daily practices completed. This provides honest visual feedback without streak-pressure manipulation.

#### D. Quick Insight
A rotating evidence-based insight from the research — one per day. NOT motivational quotes. Real findings: "Dunlosky et al. (2013) found retrieval practice and spaced repetition are the only two learning techniques rated 'high utility' — highlighting and rereading were rated low." These are pulled from a curated bank of 100+ research findings embedded in the app.

#### E. Active Timers
Quick-access timers for common practices:
- Meditation timer (10/15/20/25 min with gentle bell)
- Deep work timer (25/45/90 min Pomodoro-style)
- Box breathing guide (4-4-4-4 animated visual)
- Cyclic sigh guide (double inhale, long exhale — animated)

---

### 2. THE ROADMAP (Knowledge Base)

The full research document, beautifully rendered and navigable. This is the "why" behind every practice.

**Layout:** Left sidebar navigation (collapsible on mobile) with the 8 layers. Each layer expands to show its topics.

**Structure per topic:**
Each topic (e.g., "Deep Listening", "Spaced Repetition", "Resistance Training") is rendered as an expandable card with four sections:

1. **WHY IT MATTERS** — Evidence summary with specific findings, effect sizes, researcher names, and study years. Rendered as clean prose, not bullet lists.
2. **WHAT TO DEVELOP** — The specific skill or capacity, clearly defined.
3. **HOW TO START** — Concrete first steps, actionable this week. These link directly to practices the user can add to their daily checklist.
4. **GO DEEPER** — Recommended books, courses, and resources with brief descriptions.

**Evidence Strength Badges:** Each topic gets a small badge:
- 🟢 **Strong Evidence** — Multiple RCTs, meta-analyses, large effect sizes
- 🟡 **Moderate Evidence** — Some RCTs, consistent observational data, smaller effects
- 🟠 **Emerging Evidence** — Preliminary studies, tradition-based with some empirical support
- ⚪ **Expert Consensus** — Widely accepted by practitioners, limited formal research

**Search:** Full-text search across all roadmap content.

**"Add to My Practice" buttons:** Each "How to Start" section has a button that adds that specific practice to the user's daily checklist.

---

### 3. PRACTICE LIBRARY

A categorized, filterable library of every specific practice recommended by the research. This is the bridge between knowledge and action.

**Filter/sort by:**
- Layer (Foundation, Relational, Cognitive, Physical, Practical, Civic, Adaptive, Integration)
- Time required (2 min, 5 min, 10 min, 15 min, 30+ min)
- Phase recommended (1, 2, 3)
- Currently active / inactive

**Each practice card shows:**
- Practice name and brief description
- Which layer it belongs to (color-coded)
- Time required
- Frequency (daily, weekly, as-needed)
- Evidence basis (linked to roadmap section)
- Toggle: Active/Inactive (adds/removes from daily checklist)

**Built-in practice tools:** Some practices have interactive tools built directly into the app:

#### Embedded Practice Tools:

1. **Decision Journal** — Log predictions with confidence percentages (50%, 70%, 90%), outcomes (correct/incorrect/pending), and notes. Tracks calibration over time with a chart showing predicted vs. actual accuracy. This directly implements Tetlock's superforecasting calibration method.

2. **SIFT Tracker** — Quick form to log an article/claim evaluated: Source checked? ✓ Better coverage found? ✓ Original source traced? ✓ Verdict: reliable/unreliable/mixed. Tracks how many sources evaluated per week.

3. **Gratitude / Evening Review Journal** — Simple text entry with two prompts: "What went well today?" and "What could I improve?" Date-stamped, searchable, private. Implements Marcus Aurelius's evening review and gratitude research.

4. **Breathing Exercises** — Animated visual guides:
   - Box breathing (4-4-4-4)
   - Cyclic sighing (double inhale, long exhale)
   - 4-7-8 breathing
   Each with visual circle animation that expands/contracts with the rhythm.

5. **Meditation Timer** — Minimalist timer with interval bells option. Tracks sessions over time.

6. **NVC Practice Prompt** — When logging a difficult conversation, prompts through Rosenberg's 4 steps: Observation (what happened, no judgment) → Feeling (what I felt) → Need (what need wasn't met) → Request (what I'd ask for). Saves entries for reflection.

7. **Pre-Mortem Tool** — For major decisions: "Imagine this decision has failed spectacularly. What went wrong?" Free-text entry that helps implement Klein's pre-mortem debiasing technique.

8. **Skills Audit** — Periodic self-assessment across the 8 layers. Not a scored quiz — a structured reflection tool. For each layer, rate your current engagement (Not started / Beginning / Developing / Practicing / Integrated) with optional notes. Tracks changes over time.

9. **Deep Reading Log** — Track books read, pages per day, format (print/digital/audio). Weekly chart. Implements Wolf's deep reading research.

10. **Exercise Log** — Simple tracking: date, type (strength/cardio/mobility/walk), duration, notes. Weekly summary chart showing minutes by type. No complex rep/set tracking — keep it simple.

---

### 4. PROGRESS & INSIGHTS

A personal analytics dashboard showing patterns and progress over time.

**Components:**

#### A. Consistency Overview
- **Weekly completion rate** — % of active practices completed, charted over weeks
- **Layer balance radar chart** — Are you developing across all 8 layers or neglecting some? Spider/radar chart showing activity distribution
- **Streak data** — Current and longest streaks per practice (shown honestly, not used as manipulation)

#### B. Practice Heatmap
- Calendar heatmap (GitHub contribution style) — 52 weeks, color intensity = daily completion rate
- Filterable by layer or specific practice

#### C. Decision Journal Analytics
- Calibration chart — predicted confidence levels vs. actual accuracy
- Total predictions logged, % resolved, average calibration error

#### D. Journal Word Cloud / Patterns
- Simple word frequency analysis from evening review entries (all local, no data sent anywhere)
- Monthly reflection prompts based on patterns: "You mentioned 'overwhelmed' 7 times this month. The research suggests..."

#### E. Phase Progress
- Visual timeline showing when user started each phase
- Suggested criteria for phase advancement (not prescriptive, just informational):
  - Phase 1 → 2: Consistent sleep schedule, exercise 3x/week, daily mindfulness for 6+ weeks
  - Phase 2 → 3: Active community involvement, decision journal started, teaching/sharing regularly
  - Phase 3 → ongoing: Skills audit shows engagement across all 8 layers

---

### 5. SETTINGS & DATA

#### A. Theme Toggle
- Light / Dark / System

#### B. Practice Configuration
- Reorder daily checklist
- Set practice reminders (local notifications via PWA)
- Custom practices (user can add their own with layer assignment)

#### C. Data Management
- **Export all data** as JSON (full backup)
- **Import data** from JSON backup
- **Clear all data** with confirmation dialog
- **Data privacy statement** — prominent, always accessible: "All your data is stored locally on this device. Nothing is sent to any server. There are no accounts, no analytics, no tracking. Your growth is yours alone."

#### D. About
- Brief explanation of the project's evidence base
- Link to the full research document
- Open source license and repository link
- Credits and citations

---

### 6. ONBOARDING (First-time experience)

A brief, respectful onboarding flow shown only on first visit:

1. **Welcome screen** — "This is a personal development tool built on behavioral science research, not motivation. It helps you practice small daily actions that compound into real growth across 8 dimensions of life. All data stays on your device."

2. **Phase selection** — "Where are you starting?" Brief description of each phase. Default to Phase 1.

3. **Initial practice selection** — Show Phase 1 recommended practices. User toggles which ones they want to start with. Recommend starting with 3–5 maximum (Fogg's tiny habits principle — start small).

4. **Done** — Drop into the Today view with selected practices active.

---

## GitHub Actions CI/CD

Include a `.github/workflows/deploy.yml` that:
1. Triggers on push to `main` branch
2. Installs dependencies (`npm ci`)
3. Builds the project (`npm run build`)
4. Deploys the `dist` folder to `gh-pages` branch using `peaceiris/actions-gh-pages@v4`

Include proper `vite.config.ts` with `base` set to the repository name for GitHub Pages path compatibility.

---

## Data Model (localStorage)

```typescript
interface AppState {
  // User settings
  settings: {
    theme: 'light' | 'dark' | 'system';
    currentPhase: 1 | 2 | 3;
    onboardingComplete: boolean;
    createdAt: string; // ISO date
  };

  // Active practices with their configuration
  practices: Practice[];

  // Daily completion logs
  dailyLogs: {
    [dateKey: string]: { // "2026-04-14"
      completedPractices: string[]; // practice IDs
      notes?: string;
    };
  };

  // Decision journal entries
  decisions: DecisionEntry[];

  // Journal entries (evening review)
  journalEntries: JournalEntry[];

  // SIFT evaluations
  siftLogs: SiftEntry[];

  // NVC reflections
  nvcEntries: NVCEntry[];

  // Pre-mortem entries
  premortems: PreMortemEntry[];

  // Reading log
  readingLog: ReadingEntry[];

  // Exercise log
  exerciseLog: ExerciseEntry[];

  // Skills audit history
  skillsAudits: SkillsAudit[];
}
```

---

## Content Data

### Daily Insights Bank
Embed 100+ research findings as a JSON array. Each entry has:
- `text`: The finding in plain language (2-3 sentences max)
- `source`: Researcher/study name and year
- `layer`: Which of the 8 layers it relates to

Rotate daily based on date. Cycle through all before repeating.

Example entries:
```json
[
  {
    "text": "Watts et al. (2018) replicated the marshmallow test with 918 diverse children. After controlling for family background, delay of gratification had virtually no predictive power for later achievement (β dropped from 0.28 to 0.05). Self-control matters, but environment matters more.",
    "source": "Watts, Duncan & Quan, 2018, Psychological Science",
    "layer": "foundation"
  },
  {
    "text": "Tania Singer's neuroimaging research showed empathy and compassion activate completely non-overlapping brain networks. Empathy activates pain circuits and causes burnout. Compassion activates reward circuits and is sustainable. It matters what you practice.",
    "source": "Singer et al., 2014, Social Cognitive and Affective Neuroscience",
    "layer": "relational"
  },
  {
    "text": "Professional fact-checkers were twice as effective as PhD historians at evaluating online sources. The difference: fact-checkers read laterally (checking what others say about a source) while experts read vertically (staying on the source site).",
    "source": "Wineburg & McGrew, 2017, Stanford History Education Group",
    "layer": "cognitive"
  }
]
```

Include at least 100 entries covering all 8 layers proportionally, drawn directly from the research document.

### Practice Templates
Pre-build all practices from the research with their metadata. Each practice has:
- `id`: unique string
- `name`: display name
- `description`: 1-2 sentence description
- `layer`: which layer
- `timeMinutes`: typical time required
- `frequency`: daily | weekly | asNeeded
- `phase`: 1, 2, or 3 (when recommended to start)
- `roadmapSection`: link/anchor to the relevant roadmap section
- `isDefault`: whether it's pre-selected in onboarding
- `toolType`: if it has an embedded tool (journal, timer, breathing, etc.)

---

## Roadmap Content

Embed the full research document as structured data (not raw markdown) — organized by layer, with each topic as a structured object containing the WHY/WHAT/HOW/RESOURCES sections. This allows rendering with proper typography, evidence badges, and "Add to Practice" buttons.

---

## Technical Requirements

1. **Offline-first:** Service worker caches all assets. App works fully offline after first load.
2. **Performance:** Lighthouse score 90+ on Performance, Accessibility, Best Practices, SEO.
3. **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation, screen reader support, sufficient color contrast.
4. **Mobile-first:** Touch targets 44px minimum. Swipeable navigation where appropriate. Bottom navigation bar on mobile.
5. **No external API calls:** Zero network requests after initial load. Everything runs locally.
6. **Data safety:** localStorage with try/catch. Graceful handling of storage limits. Export/import for backup.
7. **Smooth transitions:** Page transitions, card animations, progress bar fills should all be smooth (CSS transitions, requestAnimationFrame).

---

## File Structure

```
the-complete-human/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── manifest.json
│   ├── sw.js
│   ├── favicon.svg
│   └── icons/ (PWA icons at various sizes)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css (Tailwind + custom styles)
│   ├── components/
│   │   ├── layout/ (Header, BottomNav, Sidebar, ThemeToggle)
│   │   ├── today/ (DailyChecklist, ConsistencyGrid, QuickInsight, Timers)
│   │   ├── roadmap/ (LayerView, TopicCard, EvidenceBadge, SearchBar)
│   │   ├── practices/ (PracticeLibrary, PracticeCard, PracticeFilters)
│   │   ├── tools/ (DecisionJournal, SIFTTracker, BreathingGuide, MeditationTimer, NVCPrompt, PreMortem, SkillsAudit, EveningReview, ReadingLog, ExerciseLog)
│   │   ├── progress/ (ConsistencyChart, LayerRadar, CalibrationChart, Heatmap, PhaseTimeline)
│   │   ├── settings/ (ThemeSettings, DataManagement, PracticeConfig)
│   │   └── onboarding/ (Welcome, PhaseSelect, PracticeSelect)
│   ├── data/
│   │   ├── roadmapContent.ts (full structured research content)
│   │   ├── practices.ts (all practice templates)
│   │   ├── insights.ts (100+ daily research findings)
│   │   └── defaultSettings.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useTheme.ts
│   │   └── useAppState.ts
│   ├── context/
│   │   └── AppContext.tsx
│   ├── utils/
│   │   ├── dateUtils.ts
│   │   ├── statsUtils.ts
│   │   └── exportImport.ts
│   └── types/
│       └── index.ts
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Implementation Priority

Build in this order:

1. **Project scaffolding** — Vite + React + TS + Tailwind + routing + GitHub Actions
2. **Data layer** — localStorage hooks, context, types, state management
3. **Today View** — Daily checklist, consistency grid, quick insight, timers
4. **Practice Library** — All practices, filtering, toggle active/inactive
5. **Built-in Tools** — Decision journal, breathing exercises, meditation timer, evening review, NVC prompts, pre-mortem, SIFT tracker, exercise log, reading log, skills audit
6. **Roadmap** — Full research content rendered beautifully with navigation and search
7. **Progress & Insights** — Charts, heatmap, radar, calibration analytics
8. **Settings & Data** — Theme, export/import, data management
9. **Onboarding** — First-time flow
10. **PWA** — Service worker, manifest, offline support
11. **Polish** — Animations, transitions, responsive refinements, accessibility audit

---

## What This App is NOT

- NOT a social platform. No sharing, no profiles, no leaderboards.
- NOT gamified. No points, no badges, no streaks used as pressure. Streaks are shown as information, not as incentives.
- NOT a content platform. The research is embedded and static — no feeds, no updates, no notifications.
- NOT a therapy replacement. Include a small disclaimer: "This tool implements practices from published research. It is not a substitute for professional mental health support."
- NOT collecting data. Zero analytics. Zero telemetry. Zero tracking.

---

## The Research Document

Below is the complete research document that serves as the content foundation for the entire application. ALL roadmap content, practice definitions, daily insights, and evidence citations should be derived from this document.

[ATTACH THE FULL RESEARCH MARKDOWN DOCUMENT HERE WHEN USING THIS PROMPT]
