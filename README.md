# The Complete Human

An evidence-based personal development platform. A daily-use tool that helps you practice, track, and compound small improvements across 8 interdependent life dimensions backed by behavioral science.

**Private by design.** All data stays on your device. No accounts, no cloud, no analytics, no tracking.

## Features

- **Today view** — daily practice checklist, consistency heatmap, rotating research insight, meditation/deep-work timers, box breathing and cyclic-sigh guides
- **Roadmap** — structured research content across 8 layers with evidence-strength badges and one-tap "add to practice"
- **Practice library** — filterable catalog of practices; add, remove, or create custom ones
- **Embedded tools** — Decision Journal (with calibration analytics), SIFT Tracker, Evening Review, NVC reflection, Pre-Mortem, Skills Audit, Reading Log, Exercise Log
- **Progress & insights** — weekly completion, layer-balance bars, year heatmap, calibration chart, streaks shown honestly (not as pressure)
- **Settings & data** — theme toggle, JSON export/import, clear-all with confirmation
- **Offline-first** — service worker + manifest, installable as a PWA

## Tech

React 18 + TypeScript · Vite · Tailwind CSS · Lucide icons · localStorage only. No backend.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds and deploys to the `gh-pages` branch. Enable Pages in the repo settings to serve from that branch.

Live URL pattern: `https://<username>.github.io/complete_human/`

## The 8 layers

1. **Foundation** — character, truthfulness, ethical reasoning, emotional regulation, contemplative practice
2. **Relational** — deep listening, empathy vs compassion, NVC, weak ties
3. **Cognitive** — critical evaluation (SIFT), reasoning under uncertainty, learning, deep reading
4. **Physical** — sleep, movement, breath
5. **Practical** — deep work, money literacy
6. **Civic** — community, civic information diet
7. **Adaptive** — deliberate practice, decision-making
8. **Integration** — habits, review, teaching

Content drawn from the research document in `RESEARCH.md`.

## Disclaimer

This tool implements practices from published research. It is not a substitute for professional mental health support.

## License

See `LICENSE`.
