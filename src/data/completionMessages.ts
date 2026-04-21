import type { MaybeLocalized } from '../i18n';

export type CompletionKind = 'breathing' | 'meditation' | 'evening' | 'journal' | 'decision' | 'generic';

export interface CompletionMessage {
  title: MaybeLocalized<string>;
  body: MaybeLocalized<string>;
}

export const COMPLETION_COPY: Record<CompletionKind, CompletionMessage> = {
  breathing: {
    title: { en: 'A few minutes. That’s all it took.', tr: 'Birkaç dakika. Bu kadar yetti.' },
    body: {
      en: 'Your parasympathetic nervous system just activated. Heart rate slows. Cortisol drops. You brought yourself back — that’s a skill.',
      tr: 'Parasempatik sinir sistemin şimdi aktive oldu. Kalp atışı yavaşlıyor, kortizol düşüyor. Kendini geri getirdin — bu bir beceri.',
    },
  },
  meditation: {
    title: { en: 'Minutes of presence.', tr: 'Dakikalarca mevcudiyet.' },
    body: {
      en: 'Davidson’s research: even 8 weeks of consistent practice shifts left prefrontal activation — a marker of positive affect. Every session adds.',
      tr: 'Davidson araştırması: tutarlı 8 haftalık pratik bile sol prefrontal aktivasyonu kaydırır — olumlu duygunun göstergesi. Her oturum birikir.',
    },
  },
  evening: {
    title: { en: 'Reflection logged.', tr: 'Değerlendirme kaydedildi.' },
    body: {
      en: 'Marcus Aurelius did this practice nightly. Structured reflection outperforms free-form venting for emotional regulation.',
      tr: 'Marcus Aurelius bu pratiği her gece yapardı. Yapılandırılmış yansıma, duygu düzenlemede serbest boşaltmadan daha etkilidir.',
    },
  },
  journal: {
    title: { en: 'Words down. Weight lighter.', tr: 'Kelimeler kâğıda döküldü. Yük hafifledi.' },
    body: {
      en: 'Pennebaker’s research: 15–20 minutes of structured writing about difficult experiences produces measurable immune and mood benefits over weeks.',
      tr: 'Pennebaker araştırması: zor deneyimler üzerine 15–20 dakikalık yapılandırılmış yazı, haftalar içinde ölçülebilir bağışıklık ve ruh hali faydaları üretir.',
    },
  },
  decision: {
    title: { en: 'Prediction logged.', tr: 'Öngörü kaydedildi.' },
    body: {
      en: 'Tetlock’s superforecasters started exactly here. The magic isn’t in any one prediction — it’s in tracking many over time.',
      tr: 'Tetlock’un süperforecaster’ları tam buradan başladı. Sihir tek bir öngörüde değil — zaman içinde çokça öngörüyü takip etmekte.',
    },
  },
  generic: {
    title: { en: 'Done.', tr: 'Tamamlandı.' },
    body: {
      en: 'Small, consistent actions compound. That’s the whole game.',
      tr: 'Küçük ve tutarlı eylemler birikir. Tüm oyun bu.',
    },
  },
};
