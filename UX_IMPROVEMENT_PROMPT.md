# Improvement Prompt: The Complete Human — Onboarding, UX Flow, and Turkish Language Support

## Context

We have a working React + TypeScript + Vite application called "The Complete Human" deployed on GitHub Pages. It's an evidence-based personal development platform with 8 layers, daily practice tracking, built-in tools (decision journal, breathing exercises, meditation timer, etc.), a roadmap knowledge base, and progress analytics.

**The problem:** The app works well but is hard to use at first. A new user lands on the Today view and doesn't know what this app does, why these practices exist, or how to use the tools. The flow between sections isn't intuitive enough. We need to make the first 5 minutes magical and the daily use effortless.

**Three goals for this update:**
1. Add a proper onboarding experience that teaches by doing, not by reading
2. Improve the overall UX flow — navigation, discoverability, contextual help
3. Add full Turkish language support (bilingual EN/TR)

---

## 1. ONBOARDING — "Learn by Doing" Flow

### Design Philosophy
The onboarding should NOT be a tutorial slideshow. It should feel like a guided first day — the user actually DOES things during onboarding. By the end, they've already completed their first practice, understand the structure, and have a personalized setup. Think of it like the first day with a thoughtful mentor, not a software manual.

### Flow (5-7 screens, skippable but encouraged)

#### Screen 1: Welcome
- Clean, warm hero with the app name and a single line:
  - EN: "Small daily actions. Real science. Lasting change."
  - TR: "Küçük günlük adımlar. Gerçek bilim. Kalıcı değişim."
- Brief 2-sentence explanation: "This is a private, evidence-based tool that helps you build meaningful habits across 8 dimensions of life. All your data stays on your device — no accounts, no tracking."
- Language selector toggle (EN / TR) prominently placed here — this sets the app language for everything going forward
- Two buttons: "Show me how it works" (starts guided flow) / "I'll figure it out" (skips to Today view with defaults)

#### Screen 2: "Why This Exists" — The 8 Layers (Visual Overview)
- Show the 8 layers as a beautiful vertical stack or circular diagram, each with its color, icon, and one-line description:
  1. 🟤 Foundation — Character, honesty, self-awareness
  2. 🟠 Relational — Listening, empathy, community
  3. 🔵 Cognitive — Critical thinking, learning, decisions
  4. 🟢 Physical — Exercise, sleep, nutrition
  5. 🟡 Practical — Finance, communication, time
  6. 🔴 Civic — Service, justice, institutions
  7. 🟣 Adaptive — AI literacy, resilience, creativity
  8. ⚫ Integration — Habits, systems, sustainability
- Brief explanation: "Each layer strengthens the others. You don't need to do everything — you start where you are and grow from there."
- Animate layers in with staggered fade-up

#### Screen 3: "Choose Your Starting Point" — Phase Selection
- Three phase cards with clear descriptions:
  - **Phase 1: Foundations** (Weeks 1-8) — "Sleep, movement, mindfulness, environment design. Build the base everything else rests on."
  - **Phase 2: Connection & Cognition** (Months 3-6) — "Deepen relationships, sharpen thinking, start financial literacy. You've stabilized the basics."
  - **Phase 3: Expansion** (Months 7+) — "Civic engagement, AI literacy, creativity, career adaptability. You're ready to reach outward."
- Default highlight on Phase 1 with a note: "Most people start here. No shame in foundations — they're called that for a reason."
- Tapping a phase shows which practices are recommended

#### Screen 4: "Pick Your First Practices" — Practice Selection
- Show the 5-8 recommended practices for the selected phase as toggleable cards
- Each card shows: name, time required, which layer, one-sentence "why"
- Pre-select 3-4 defaults with a note: "Start with 3-5. You can always add more later. (BJ Fogg's research: starting tiny beats starting ambitious.)"
- "Add custom practice" option at bottom for users who have specific habits they want to track

#### Screen 5: "Try It Now" — First Practice Experience
- Instead of just showing the checklist, GUIDE the user through completing their first practice right now
- Example flow:
  - "Let's try a 2-minute breathing exercise right now."
  - Open the cyclic sigh breathing tool inline
  - Animated guide: double inhale through nose → long exhale through mouth
  - After completion: "You just completed your first practice. ✓ That's how easy every day can be."
- This screen transforms the onboarding from informational to experiential
- If user skips, that's fine — mark first practice as "try later"

#### Screen 6: "Your Daily Rhythm" — How the App Works
- Quick animated walkthrough of the Today view layout:
  - "Each morning, your practices appear here" → highlight checklist
  - "Tap to complete. Some open tools — journals, timers, breathing guides" → show interaction
  - "Your consistency builds here" → highlight the heatmap grid
  - "Explore the research anytime" → point to Roadmap tab
  - "Track your growth" → point to Progress tab
- This is a VISUAL walkthrough with pointer/highlight animations, NOT text paragraphs
- 3-4 animated steps max, auto-advancing or tappable

#### Screen 7: "You're Ready"
- Warm completion screen
- Show their selected practices in a mini-checklist preview
- "Your journey is private. Your data stays on this device. There's no perfect way to do this — just start."
- Button: "Begin" → navigates to Today view with their practices loaded
- Subtle confetti or gentle pulse animation (tasteful, not cheesy)

### Onboarding Technical Notes
- Store `onboardingComplete: true` in localStorage after completion
- Store `selectedLanguage: 'en' | 'tr'` from Screen 1
- Allow re-accessing onboarding from Settings ("Replay introduction")
- The onboarding should use the SAME components as the main app (breathing tool, checklist, etc.) — not separate onboarding-only components. This teaches the real interface.

---

## 2. UX/UI IMPROVEMENTS — Making Daily Use Effortless

### A. Contextual Help System ("?" Tooltips)

Add small, unobtrusive "?" icons next to key features that expand into brief explanations on tap/click. These appear throughout the app, not just during onboarding.

**Examples:**
- Next to "Decision Journal": "Log predictions with confidence levels, then track whether they come true. This builds calibration — the skill of knowing what you know. (Based on Tetlock's superforecasting research.)"
- Next to "SIFT Tracker": "SIFT = Stop, Investigate the source, Find better coverage, Trace claims to origin. Practice this on 1 article daily to build information literacy."
- Next to "Consistency Grid": "This shows your daily completion rate over 12 weeks. Darker = more practices completed that day. Don't aim for perfection — Lally's research shows missing one day doesn't reset your progress."
- Next to "Evening Review": "Marcus Aurelius did this nightly. Two questions: What went well? What could improve? 5 minutes of reflection builds self-awareness over time."
- Next to "Layer Balance" radar chart: "This shows how evenly you're developing across all 8 dimensions. Imbalance is normal — but persistent neglect of any layer creates a bottleneck."

**Implementation:** A reusable `<HelpTooltip text="..." />` component that renders a small "?" circle. On tap (mobile) or hover (desktop), it shows a popover/tooltip with the explanation. Dismiss by tapping elsewhere. Keep explanations to 2-3 sentences max.

### B. Empty States with Guidance

Every section that can be empty should have a helpful empty state instead of blank space:

- **Decision Journal (empty):** "You haven't logged any predictions yet. Try this: think of something you believe will happen this week. How confident are you? Tap '+' to log it."
- **Evening Review (empty):** "No entries yet. Tonight before bed, take 5 minutes to write what went well and what you'd do differently. Tap '+' to start."
- **Reading Log (empty):** "Track your deep reading here. Maryanne Wolf's research shows sustained reading builds cognitive capacities that skimming can't — empathy, critical analysis, analogical reasoning."
- **Exercise Log (empty):** "Log your movement here. Even a 10-minute walk counts. Shailendra et al. found just 60 minutes of resistance training per week reduces all-cause mortality by 15%."
- **Progress charts (no data):** "Complete a few days of practices to start seeing your patterns here. Consistency data appears after your first week."

### C. Improved Navigation Flow

#### Bottom Navigation (Mobile)
5 tabs maximum — keep it clean:
1. **Today** (home icon) — Daily checklist and quick tools
2. **Practices** (grid icon) — Practice library with filters
3. **Tools** (wrench/pen icon) — All built-in tools (journals, timers, breathing)
4. **Learn** (book icon) — The roadmap/knowledge base
5. **Progress** (chart icon) — Analytics and insights

Settings accessible from a gear icon in the header, not as a tab.

#### Desktop Navigation
- Left sidebar with the same 5 sections, collapsible
- Breadcrumb trail for deep navigation (e.g., Learn > Cognitive Layer > Spaced Repetition)

### D. Practice-to-Tool Connection

When a user checks off a practice that has an associated tool, offer a direct link:

- User taps "Decision Journal Entry" checkbox → instead of just checking it off, show a brief prompt: "Want to log an entry now?" with a button that opens the Decision Journal tool inline or navigates to it
- User taps "10-min meditation" → offer to open the meditation timer
- User taps "Evening Review" → offer to open the journal

This creates a **guided flow from checklist → tool → completion** instead of requiring users to know that tools exist separately. The checkbox still works as a simple toggle if the user just wants to mark it done without using the tool.

### E. "What's This?" First-Time Badges

The FIRST time a user visits any major section (Roadmap, Progress, Decision Journal, etc.), show a one-time banner at the top:

- **Roadmap (first visit):** "This is the research behind every practice. Each topic shows WHY it matters (evidence), WHAT to develop, HOW to start, and where to GO DEEPER. Tap any topic to explore."
- **Progress (first visit):** "Your personal analytics. As you log practices, patterns emerge here — consistency trends, layer balance, and calibration accuracy. Data appears after your first week."
- **Decision Journal (first visit):** "This implements Philip Tetlock's calibration method. Log a prediction, assign a confidence %, then come back to mark the outcome. Over time, you'll see if your 70% predictions actually come true 70% of the time."

Store which banners have been dismissed in localStorage. Show each only once.

### F. Quick Actions / Floating Action Button

On the Today view (mobile), add a floating action button (FAB) that expands to show quick-start actions:
- ▶ Start breathing exercise
- ▶ Start meditation timer  
- ▶ Log a decision
- ▶ Write evening review
- ▶ Log exercise

This gives instant access to the most common actions without navigating away from the Today view.

### G. Smooth Transitions & Micro-interactions

- **Checkbox completion:** When tapping a practice complete, animate a subtle checkmark draw-in and the card briefly glows with the layer's color, then settles. Not a dramatic animation — just satisfying confirmation.
- **Page transitions:** Fade + slight slide between main sections (Today → Practices → Tools → Learn → Progress). 200-300ms, ease-out.
- **Heatmap cells:** Fade in staggered on scroll-into-view.
- **Progress numbers:** Count-up animation when progress stats come into view.
- **Tool opening:** Slide-up from bottom on mobile (like a bottom sheet), fade-in on desktop.

### H. Improved Today View Layout

Reorganize the Today view for better flow:

1. **Greeting + Date** — "Good morning, [time-based greeting]" with today's date. Keep it simple and warm.
2. **Phase indicator** — Small, subtle badge showing current phase
3. **Daily Insight** — Today's research finding in a visually distinct card (different background, serif font for the quote). Collapsible after reading.
4. **Today's Practices** — The checklist, grouped by layer with subtle color indicators. Show completion count: "3 of 7 complete"
5. **Quick Tools** — Horizontal scrollable row of tool cards (breathing, timer, journal) for instant access
6. **Consistency Grid** — The 12-week heatmap, below the fold. Summary stat above it: "You've practiced 23 of the last 30 days"

---

## 3. TURKISH LANGUAGE SUPPORT (i18n)

### Architecture

Create a lightweight i18n system — no need for a heavy library. A simple context-based approach:

```typescript
// src/i18n/types.ts
type Language = 'en' | 'tr';

// src/i18n/translations.ts
const translations = {
  en: {
    // Navigation
    'nav.today': 'Today',
    'nav.practices': 'Practices',
    'nav.tools': 'Tools',
    'nav.learn': 'Learn',
    'nav.progress': 'Progress',
    'nav.settings': 'Settings',
    
    // Today View
    'today.greeting.morning': 'Good morning',
    'today.greeting.afternoon': 'Good afternoon',
    'today.greeting.evening': 'Good evening',
    'today.phase': 'Phase',
    'today.practices_complete': '{completed} of {total} complete',
    'today.consistency': "You've practiced {count} of the last {total} days",
    'today.daily_insight': "Today's Research Insight",
    'today.quick_tools': 'Quick Tools',
    
    // Practices
    'practices.title': 'Practice Library',
    'practices.filter.all': 'All Layers',
    'practices.filter.active': 'Active',
    'practices.filter.inactive': 'Available',
    'practices.time': '{min} min',
    'practices.add': 'Add to Daily',
    'practices.remove': 'Remove',
    'practices.empty': 'No practices match your filters',
    
    // Tools
    'tools.title': 'Tools',
    'tools.decision_journal': 'Decision Journal',
    'tools.evening_review': 'Evening Review',
    'tools.breathing': 'Breathing Exercises',
    'tools.meditation': 'Meditation Timer',
    'tools.sift': 'SIFT Tracker',
    'tools.nvc': 'NVC Practice',
    'tools.premortem': 'Pre-Mortem',
    'tools.reading_log': 'Reading Log',
    'tools.exercise_log': 'Exercise Log',
    'tools.skills_audit': 'Skills Audit',
    
    // Decision Journal
    'dj.prediction': 'What do you predict will happen?',
    'dj.confidence': 'How confident are you?',
    'dj.outcome': 'What actually happened?',
    'dj.pending': 'Pending',
    'dj.correct': 'Correct',
    'dj.incorrect': 'Incorrect',
    'dj.empty': "You haven't logged any predictions yet. Try this: think of something you believe will happen this week. How confident are you?",
    
    // Evening Review
    'er.went_well': 'What went well today?',
    'er.improve': 'What could I improve?',
    'er.empty': 'No entries yet. Tonight before bed, take 5 minutes to reflect.',
    
    // Breathing
    'breathing.inhale': 'Inhale',
    'breathing.hold': 'Hold',
    'breathing.exhale': 'Exhale',
    'breathing.box': 'Box Breathing',
    'breathing.cyclic_sigh': 'Cyclic Sigh',
    'breathing.478': '4-7-8 Breathing',
    
    // Meditation
    'meditation.start': 'Start',
    'meditation.pause': 'Pause',
    'meditation.reset': 'Reset',
    'meditation.minutes': 'minutes',
    'meditation.complete': 'Session complete',
    
    // Progress
    'progress.title': 'Your Progress',
    'progress.consistency': 'Consistency',
    'progress.layer_balance': 'Layer Balance',
    'progress.calibration': 'Decision Calibration',
    'progress.weekly_rate': 'Weekly Completion Rate',
    'progress.no_data': 'Complete a few days of practices to see your patterns here.',
    
    // Layers
    'layer.foundation': 'Foundation',
    'layer.relational': 'Relational',
    'layer.cognitive': 'Cognitive',
    'layer.physical': 'Physical',
    'layer.practical': 'Practical',
    'layer.civic': 'Civic',
    'layer.adaptive': 'Adaptive',
    'layer.integration': 'Integration',
    
    // Phases
    'phase.1.name': 'Foundations',
    'phase.1.desc': 'Sleep, movement, mindfulness, environment design. Build the base everything else rests on.',
    'phase.2.name': 'Connection & Cognition',
    'phase.2.desc': 'Deepen relationships, sharpen thinking, start financial literacy.',
    'phase.3.name': 'Expansion & Integration',
    'phase.3.desc': 'Civic engagement, AI literacy, creativity, career adaptability.',
    
    // Onboarding
    'onboarding.welcome.title': 'The Complete Human',
    'onboarding.welcome.subtitle': 'Small daily actions. Real science. Lasting change.',
    'onboarding.welcome.desc': 'A private, evidence-based tool that helps you build meaningful habits across 8 dimensions of life. All your data stays on your device.',
    'onboarding.welcome.start': 'Show me how it works',
    'onboarding.welcome.skip': "I'll figure it out",
    'onboarding.layers.title': 'Eight Dimensions of Growth',
    'onboarding.layers.desc': 'Each layer strengthens the others. You start where you are and grow from there.',
    'onboarding.phase.title': 'Choose Your Starting Point',
    'onboarding.phase.note': "Most people start here. No shame in foundations — they're called that for a reason.",
    'onboarding.practices.title': 'Pick Your First Practices',
    'onboarding.practices.note': "Start with 3-5. You can always add more later.",
    'onboarding.try.title': "Let's try one right now",
    'onboarding.try.desc': "A 2-minute breathing exercise. Follow the rhythm.",
    'onboarding.try.complete': 'You just completed your first practice. ✓',
    'onboarding.tour.title': 'Your Daily Rhythm',
    'onboarding.ready.title': "You're ready",
    'onboarding.ready.desc': 'Your journey is private. Your data stays on this device. There\'s no perfect way to do this — just start.',
    'onboarding.ready.button': 'Begin',
    
    // Settings
    'settings.title': 'Settings',
    'settings.theme': 'Theme',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',
    'settings.theme.system': 'System',
    'settings.language': 'Language',
    'settings.export': 'Export Data',
    'settings.import': 'Import Data',
    'settings.clear': 'Clear All Data',
    'settings.clear.confirm': 'This will delete all your data permanently. Are you sure?',
    'settings.replay_onboarding': 'Replay Introduction',
    'settings.privacy': 'Your data never leaves this device. No accounts, no tracking, no analytics.',
    
    // Help tooltips
    'help.decision_journal': 'Log predictions with confidence levels, then track outcomes. This builds calibration — knowing what you know. Based on Tetlock\'s superforecasting research.',
    'help.sift': 'SIFT = Stop, Investigate the source, Find better coverage, Trace claims. Practice on 1 article daily.',
    'help.consistency_grid': "Darker = more practices completed. Don't aim for perfection — research shows missing one day doesn't reset your progress.",
    'help.evening_review': 'Marcus Aurelius did this nightly. Two questions: What went well? What could improve? 5 minutes builds lasting self-awareness.',
    'help.layer_balance': 'Shows development across all 8 dimensions. Imbalance is normal — persistent neglect creates bottlenecks.',
    'help.breathing': 'Cyclic sighing activates your parasympathetic nervous system within seconds. Used in military and clinical stress management.',
    'help.nvc': "Rosenberg's 4 steps: Observation → Feeling → Need → Request. Separates what happened from your interpretation.",
    'help.premortem': "Gary Klein's technique: imagine the decision failed, then work backward. More effective than pros/cons lists for debiasing.",
    'help.calibration': 'Are your 70% predictions actually right 70% of the time? Perfect calibration = the diagonal line. Above = overconfident. Below = underconfident.',

    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.next': 'Next',
    'common.back': 'Back',
    'common.skip': 'Skip',
    'common.done': 'Done',
    'common.today': 'Today',
    'common.daily': 'Daily',
    'common.weekly': 'Weekly',
    'common.monthly': 'Monthly',
  },
  
  tr: {
    // Navigation
    'nav.today': 'Bugün',
    'nav.practices': 'Pratikler',
    'nav.tools': 'Araçlar',
    'nav.learn': 'Öğren',
    'nav.progress': 'İlerleme',
    'nav.settings': 'Ayarlar',
    
    // Today View
    'today.greeting.morning': 'Günaydın',
    'today.greeting.afternoon': 'İyi günler',
    'today.greeting.evening': 'İyi akşamlar',
    'today.phase': 'Aşama',
    'today.practices_complete': '{total} pratiğin {completed} tanesi tamamlandı',
    'today.consistency': 'Son {total} günün {count} tanesinde pratik yaptın',
    'today.daily_insight': 'Günün Araştırma Bulgusu',
    'today.quick_tools': 'Hızlı Araçlar',
    
    // Practices
    'practices.title': 'Pratik Kütüphanesi',
    'practices.filter.all': 'Tüm Katmanlar',
    'practices.filter.active': 'Aktif',
    'practices.filter.inactive': 'Mevcut',
    'practices.time': '{min} dk',
    'practices.add': 'Günlüğe Ekle',
    'practices.remove': 'Kaldır',
    'practices.empty': 'Filtrelere uygun pratik bulunamadı',
    
    // Tools
    'tools.title': 'Araçlar',
    'tools.decision_journal': 'Karar Günlüğü',
    'tools.evening_review': 'Akşam Değerlendirmesi',
    'tools.breathing': 'Nefes Egzersizleri',
    'tools.meditation': 'Meditasyon Zamanlayıcı',
    'tools.sift': 'SIFT Takipçisi',
    'tools.nvc': 'ŞİD Pratiği',
    'tools.premortem': 'Ön-Mortem Analizi',
    'tools.reading_log': 'Okuma Günlüğü',
    'tools.exercise_log': 'Egzersiz Günlüğü',
    'tools.skills_audit': 'Beceri Değerlendirmesi',
    
    // Decision Journal
    'dj.prediction': 'Ne olacağını öngörüyorsun?',
    'dj.confidence': 'Ne kadar eminsin?',
    'dj.outcome': 'Gerçekte ne oldu?',
    'dj.pending': 'Beklemede',
    'dj.correct': 'Doğru',
    'dj.incorrect': 'Yanlış',
    'dj.empty': 'Henüz bir öngörü kaydetmedin. Şunu dene: bu hafta olacağına inandığın bir şeyi düşün. Ne kadar eminsin?',
    
    // Evening Review
    'er.went_well': 'Bugün ne iyi gitti?',
    'er.improve': 'Neyi geliştirebilirim?',
    'er.empty': 'Henüz kayıt yok. Bu gece yatmadan önce 5 dakika düşünmeye ayır.',
    
    // Breathing
    'breathing.inhale': 'Nefes Al',
    'breathing.hold': 'Tut',
    'breathing.exhale': 'Nefes Ver',
    'breathing.box': 'Kutu Nefesi',
    'breathing.cyclic_sigh': 'Döngüsel İç Çekme',
    'breathing.478': '4-7-8 Nefesi',
    
    // Meditation
    'meditation.start': 'Başla',
    'meditation.pause': 'Duraklat',
    'meditation.reset': 'Sıfırla',
    'meditation.minutes': 'dakika',
    'meditation.complete': 'Seans tamamlandı',
    
    // Progress
    'progress.title': 'İlerlemen',
    'progress.consistency': 'Tutarlılık',
    'progress.layer_balance': 'Katman Dengesi',
    'progress.calibration': 'Karar Kalibrasyonu',
    'progress.weekly_rate': 'Haftalık Tamamlama Oranı',
    'progress.no_data': 'Örüntülerini görmek için birkaç gün pratik yap.',
    
    // Layers
    'layer.foundation': 'Temel',
    'layer.relational': 'İlişkisel',
    'layer.cognitive': 'Bilişsel',
    'layer.physical': 'Fiziksel',
    'layer.practical': 'Pratik',
    'layer.civic': 'Toplumsal',
    'layer.adaptive': 'Uyumsal',
    'layer.integration': 'Bütünleşme',
    
    // Phases
    'phase.1.name': 'Temeller',
    'phase.1.desc': 'Uyku, hareket, farkındalık, çevre tasarımı. Her şeyin üzerine inşa edileceği temeli kur.',
    'phase.2.name': 'Bağlantı ve Biliş',
    'phase.2.desc': 'İlişkileri derinleştir, düşünmeyi keskinleştir, finansal okuryazarlığa başla.',
    'phase.3.name': 'Genişleme ve Bütünleşme',
    'phase.3.desc': 'Toplumsal katılım, yapay zeka okuryazarlığı, yaratıcılık, kariyer uyumluluğu.',
    
    // Onboarding
    'onboarding.welcome.title': 'Bütün İnsan',
    'onboarding.welcome.subtitle': 'Küçük günlük adımlar. Gerçek bilim. Kalıcı değişim.',
    'onboarding.welcome.desc': 'Yaşamın 8 boyutunda anlamlı alışkanlıklar geliştirmene yardımcı olan özel ve kanıta dayalı bir araç. Tüm verilerin cihazında kalır.',
    'onboarding.welcome.start': 'Nasıl çalıştığını göster',
    'onboarding.welcome.skip': 'Kendim keşfederim',
    'onboarding.layers.title': 'Büyümenin Sekiz Boyutu',
    'onboarding.layers.desc': 'Her katman diğerlerini güçlendirir. Olduğun yerden başla ve oradan büyü.',
    'onboarding.phase.title': 'Başlangıç Noktanı Seç',
    'onboarding.phase.note': 'Çoğu kişi buradan başlar. Temellerde utanılacak bir şey yok — bir sebebi var.',
    'onboarding.practices.title': 'İlk Pratiklerini Seç',
    'onboarding.practices.note': '3-5 ile başla. Sonra istediğin zaman daha fazlasını ekleyebilirsin.',
    'onboarding.try.title': 'Şimdi birini deneyelim',
    'onboarding.try.desc': '2 dakikalık bir nefes egzersizi. Ritmi takip et.',
    'onboarding.try.complete': 'İlk pratiğini tamamladın. ✓',
    'onboarding.tour.title': 'Günlük Ritmin',
    'onboarding.ready.title': 'Hazırsın',
    'onboarding.ready.desc': 'Yolculuğun sana özel. Verilerin bu cihazda kalır. Bunu yapmanın mükemmel bir yolu yok — sadece başla.',
    'onboarding.ready.button': 'Başla',
    
    // Settings
    'settings.title': 'Ayarlar',
    'settings.theme': 'Tema',
    'settings.theme.light': 'Açık',
    'settings.theme.dark': 'Koyu',
    'settings.theme.system': 'Sistem',
    'settings.language': 'Dil',
    'settings.export': 'Verileri Dışa Aktar',
    'settings.import': 'Verileri İçe Aktar',
    'settings.clear': 'Tüm Verileri Sil',
    'settings.clear.confirm': 'Bu işlem tüm verilerini kalıcı olarak silecek. Emin misin?',
    'settings.replay_onboarding': 'Tanıtımı Tekrar Oynat',
    'settings.privacy': 'Verilerin asla bu cihazdan çıkmaz. Hesap yok, takip yok, analitik yok.',
    
    // Help tooltips
    'help.decision_journal': 'Öngörüleri güven düzeyleriyle kaydet, sonuçları takip et. Bu kalibrasyon geliştirir — ne bildiğini bilme becerisi. Tetlock\'un süperforekasting araştırmasına dayanır.',
    'help.sift': 'SIFT = Dur, Kaynağı araştır, Daha iyi haber bul, İddiaları kökenine kadar izle. Günde 1 makaleyle pratik yap.',
    'help.consistency_grid': 'Koyu = daha fazla pratik tamamlanmış. Mükemmelliği hedefleme — araştırmalar bir gün atlamenın ilerlemeyi sıfırlamadığını gösteriyor.',
    'help.evening_review': 'Marcus Aurelius bunu her gece yapardı. İki soru: Ne iyi gitti? Neyi farklı yapardım? 5 dakika kalıcı öz-farkındalık geliştirir.',
    'help.layer_balance': 'Tüm 8 boyutta gelişimi gösterir. Dengesizlik normal — sürekli ihmal darboğaz yaratır.',
    'help.breathing': 'Döngüsel iç çekme parasempatik sinir sistemini saniyeler içinde aktive eder. Askeri ve klinik stres yönetiminde kullanılır.',
    'help.nvc': "Rosenberg'in 4 adımı: Gözlem → Duygu → İhtiyaç → Rica. Olanı yorumundan ayırır.",
    'help.premortem': "Klein'ın tekniği: kararın başarısız olduğunu hayal et, sonra geriye doğru çalış. Artılar/eksiler listelerinden daha etkili.",
    'help.calibration': "%70 öngörülerin gerçekten %70 oranında doğru mu? Mükemmel kalibrasyon = köşegen çizgi. Üstünde = aşırı güvenli. Altında = az güvenli.",

    // Common
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.delete': 'Sil',
    'common.edit': 'Düzenle',
    'common.close': 'Kapat',
    'common.next': 'İleri',
    'common.back': 'Geri',
    'common.skip': 'Atla',
    'common.done': 'Tamam',
    'common.today': 'Bugün',
    'common.daily': 'Günlük',
    'common.weekly': 'Haftalık',
    'common.monthly': 'Aylık',
  }
};
```

### i18n Hook

```typescript
// src/hooks/useTranslation.ts
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { translations } from '../i18n/translations';

export function useTranslation() {
  const { state } = useContext(AppContext);
  const lang = state.settings.language || 'en';
  
  function t(key: string, vars?: Record<string, string | number>): string {
    let text = translations[lang]?.[key] || translations['en'][key] || key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  }
  
  return { t, lang, isRTL: false }; // Turkish is LTR
}
```

### Usage Pattern
```tsx
function TodayView() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('today.greeting.morning')}</h1>
      <p>{t('today.practices_complete', { completed: 3, total: 7 })}</p>
    </div>
  );
}
```

### Roadmap Content in Turkish
The roadmap content (the research document) should also be available in Turkish. Create a parallel `roadmapContent.tr.ts` with translated layer names, topic names, and summaries. The detailed WHY/WHAT/HOW/RESOURCES sections can remain in English for the initial release with a note: "Detaylı araştırma içeriği şimdilik İngilizce'dir" — since accurately translating 30+ pages of research citations requires careful attention. The UI, navigation, all tools, all empty states, all tooltips, and all practice names/descriptions should be fully in Turkish.

### Language-Aware Practice Names
Each practice in the practice library needs both an English and Turkish name/description:

```typescript
const practices = [
  {
    id: 'meditation',
    name: { en: '10-min meditation', tr: '10 dk meditasyon' },
    description: { 
      en: 'Sit quietly, focus on breath. When mind wanders, gently return.',
      tr: 'Sessizce otur, nefesine odaklan. Zihnin dağıldığında nazikçe geri dön.'
    },
    layer: 'foundation',
    timeMinutes: 10,
    // ...
  },
  // ...
];
```

### Daily Insights in Turkish
Each insight should have both English and Turkish versions:

```typescript
const insights = [
  {
    text: {
      en: "Watts et al. (2018) replicated the marshmallow test with 918 diverse children...",
      tr: "Watts ve ark. (2018) marshmallow testini 918 farklı çocukla tekrarladı..."
    },
    source: "Watts, Duncan & Quan, 2018",
    layer: "foundation"
  },
  // ...
];
```

---

## 4. ADDITIONAL POLISH

### A. "New to this?" Link on Every Tool
Each built-in tool should have a small link/button at the top: "What is this?" / "Bu nedir?" that expands a 2-3 sentence explanation of the tool's purpose and the research behind it. Collapse after first read. Different from the "?" tooltip — this is more detailed, shown once.

### B. Keyboard Shortcuts (Desktop)
- `1-5` to switch tabs (Today/Practices/Tools/Learn/Progress)
- `n` to create new entry in current tool
- `?` to toggle help tooltips
- `Esc` to close modals/overlays
- Show keyboard shortcut hints in a settings section

### C. Data Export Improvements
- Export as JSON (full backup — already exists)
- Add: Export evening review entries as readable Markdown file
- Add: Export decision journal as CSV

### D. Print-Friendly Roadmap
Add a "Print this section" button on roadmap topics that generates a clean, printer-friendly view. Some users will want to print and annotate physically.

### E. Seasonal Refresh
The daily insight system should weight insights toward the user's current phase. If in Phase 1, show more Foundation/Physical layer insights. If in Phase 3, show more Civic/Adaptive insights. Not exclusively — just weighted 60/40 toward current phase vs. general.

---

## Implementation Order

1. **i18n system** — Build the translation infrastructure first (context, hook, translations file). Wire it through ALL existing components. This touches everything so do it before adding new features.
2. **Onboarding flow** — The 7-screen guided experience. Reuse existing components (breathing tool, checklist).
3. **Contextual help** — HelpTooltip component, first-visit banners, empty states with guidance
4. **Navigation improvements** — Reorganize bottom nav, add FAB, improve practice-to-tool connections
5. **Micro-interactions** — Checkbox animations, page transitions, count-up stats
6. **Turkish content** — Translate all practice names/descriptions, daily insights, roadmap summaries
7. **Polish** — Keyboard shortcuts, export improvements, seasonal insight weighting

---

## What NOT to Change

- Keep the existing warm minimalist aesthetic — don't redesign the visual language
- Keep localStorage — don't add a backend
- Keep the research content accurate — don't simplify it for marketing
- Keep the privacy-first approach — no analytics, no tracking
- Keep the anti-gamification stance — no points, no badges, no manipulative streaks
