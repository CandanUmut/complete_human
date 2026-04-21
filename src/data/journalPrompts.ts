import type { Layer } from '../types';
import type { MaybeLocalized } from '../i18n';

export type PromptBucket = 'self' | 'relational' | 'cognitive' | 'growth';

export interface JournalPrompt {
  id: string;
  bucket: PromptBucket;
  layer: Layer;
  text: MaybeLocalized<string>;
}

// A curated rotating bank. IDs are stable — do not renumber.
export const JOURNAL_PROMPTS: JournalPrompt[] = [
  // Self-Awareness (Foundation)
  { id: 's1', bucket: 'self', layer: 'foundation', text: {
    en: 'What emotion showed up most today? What triggered it?',
    tr: 'Bugün en çok hangi duygu ortaya çıktı? Onu ne tetikledi?',
  }},
  { id: 's2', bucket: 'self', layer: 'foundation', text: {
    en: 'When did I react automatically today instead of choosing my response?',
    tr: 'Bugün nerede otomatik tepki verdim ve tepkimi bilinçli seçmedim?',
  }},
  { id: 's3', bucket: 'self', layer: 'foundation', text: {
    en: 'What am I avoiding thinking about?',
    tr: 'Düşünmekten kaçındığım şey ne?',
  }},
  { id: 's4', bucket: 'self', layer: 'foundation', text: {
    en: 'Where was I most honest today? Where was I least honest?',
    tr: 'Bugün en dürüst olduğum an hangisiydi? En az dürüst olduğum?',
  }},
  { id: 's5', bucket: 'self', layer: 'foundation', text: {
    en: 'What assumption did I make today that might be wrong?',
    tr: 'Bugün yanlış olabilecek hangi varsayımı yaptım?',
  }},
  { id: 's6', bucket: 'self', layer: 'foundation', text: {
    en: 'What would I tell a friend in my exact situation right now?',
    tr: 'Şu an benim durumumda olan bir arkadaşıma ne söylerdim?',
  }},
  { id: 's7', bucket: 'self', layer: 'foundation', text: {
    en: 'What small thing did I do today that I’m quietly proud of?',
    tr: 'Bugün sessizce gurur duyduğum küçük bir şey ne?',
  }},
  { id: 's8', bucket: 'self', layer: 'foundation', text: {
    en: 'What am I carrying that I could put down?',
    tr: 'Taşıdığım ama bırakabileceğim bir şey var mı?',
  }},
  { id: 's9', bucket: 'self', layer: 'foundation', text: {
    en: 'If I had to name one pattern in my day, what would it be?',
    tr: 'Günümde bir örüntüye isim vermem gerekse, hangisi olurdu?',
  }},
  { id: 's10', bucket: 'self', layer: 'foundation', text: {
    en: 'What did my body tell me today that I ignored?',
    tr: 'Bugün bedenim bana ne söyledi ve ben neyi görmezden geldim?',
  }},
  { id: 's11', bucket: 'self', layer: 'foundation', text: {
    en: 'What would the calmest version of me have done differently today?',
    tr: 'Bugün en sakin halim olsaydım neyi farklı yapardım?',
  }},
  { id: 's12', bucket: 'self', layer: 'foundation', text: {
    en: 'What made me feel alive today, even briefly?',
    tr: 'Bugün kısa bir an bile olsa beni canlı hissettiren neydi?',
  }},

  // Relational
  { id: 'r1', bucket: 'relational', layer: 'relational', text: {
    en: 'Who did I really listen to today — not just hear, but understand?',
    tr: 'Bugün gerçekten dinlediğim — sadece duymadığım, anladığım — kimdi?',
  }},
  { id: 'r2', bucket: 'relational', layer: 'relational', text: {
    en: 'Did I make anyone feel seen today? Did anyone make me feel seen?',
    tr: 'Bugün birinin kendini görülmüş hissetmesini sağladım mı? Biri beni görülmüş hissettirdi mi?',
  }},
  { id: 'r3', bucket: 'relational', layer: 'relational', text: {
    en: 'What conversation am I avoiding? Why?',
    tr: 'Hangi konuşmadan kaçıyorum? Neden?',
  }},
  { id: 'r4', bucket: 'relational', layer: 'relational', text: {
    en: 'If I apply NVC to today’s friction: what was the observation, feeling, need, and request?',
    tr: 'Bugünkü sürtüşmeye ŞİD uygularsam: gözlem, duygu, ihtiyaç ve rica neydi?',
  }},
  { id: 'r5', bucket: 'relational', layer: 'relational', text: {
    en: 'What did someone do today that I appreciated but didn’t say out loud?',
    tr: 'Bugün takdir ettiğim ama sesli söylemediğim bir şey kim yaptı?',
  }},
  { id: 'r6', bucket: 'relational', layer: 'relational', text: {
    en: 'Where did I judge someone today without asking why they did what they did?',
    tr: 'Bugün nerede biri hakkında onun nedenini sormadan yargıya vardım?',
  }},
  { id: 'r7', bucket: 'relational', layer: 'relational', text: {
    en: 'Who have I not reached out to in a while that I miss?',
    tr: 'Uzun zamandır iletişim kurmadığım ama özlediğim biri kim?',
  }},
  { id: 'r8', bucket: 'relational', layer: 'relational', text: {
    en: 'What need of mine did I expect someone to read without saying it?',
    tr: 'Söylemeden okunmasını beklediğim ihtiyacım neydi?',
  }},
  { id: 'r9', bucket: 'relational', layer: 'relational', text: {
    en: 'When did I interrupt today? What was I afraid of losing if I waited?',
    tr: 'Bugün nerede sözünü kestim? Beklesem ne kaybedeceğimden korkuyordum?',
  }},

  // Cognitive
  { id: 'c1', bucket: 'cognitive', layer: 'cognitive', text: {
    en: 'What did I read or learn today that challenged something I believed?',
    tr: 'Bugün okuduğum ya da öğrendiğim, inandığım bir şeye meydan okuyan ne vardı?',
  }},
  { id: 'c2', bucket: 'cognitive', layer: 'cognitive', text: {
    en: 'Where did I fall for a cognitive bias today? (confirmation, anchoring, availability…)',
    tr: 'Bugün hangi bilişsel önyargıya düştüm? (doğrulama, çıpa, erişilebilirlik…)',
  }},
  { id: 'c3', bucket: 'cognitive', layer: 'cognitive', text: {
    en: 'What question am I not asking that I should be?',
    tr: 'Sormam gerekip sormadığım soru ne?',
  }},
  { id: 'c4', bucket: 'cognitive', layer: 'cognitive', text: {
    en: 'If I had to bet money on my biggest belief from today, how much would I wager?',
    tr: 'Bugünkü en büyük inancıma para yatırmam gerekse ne kadarını koyardım?',
  }},
  { id: 'c5', bucket: 'cognitive', layer: 'cognitive', text: {
    en: 'What would change my mind about the thing I’m most certain of?',
    tr: 'En emin olduğum konuda fikrimi değiştirecek şey ne olurdu?',
  }},
  { id: 'c6', bucket: 'cognitive', layer: 'cognitive', text: {
    en: 'What did I skim today that I should have read slowly?',
    tr: 'Bugün göz gezdirdiğim ama yavaş okumam gereken şey neydi?',
  }},
  { id: 'c7', bucket: 'cognitive', layer: 'cognitive', text: {
    en: 'Where did I confuse an opinion with a fact?',
    tr: 'Bir görüşü nerede bir gerçekle karıştırdım?',
  }},
  { id: 'c8', bucket: 'cognitive', layer: 'cognitive', text: {
    en: 'Who holds the opposite view of mine and what’s their strongest argument?',
    tr: 'Benimkine zıt görüşü kim savunuyor ve en güçlü argümanı ne?',
  }},

  // Growth / Integration
  { id: 'g1', bucket: 'growth', layer: 'integration', text: {
    en: 'What’s one tiny thing I did today that my future self will thank me for?',
    tr: 'Gelecekteki ben için bugün yaptığım küçük ama değerli şey ne?',
  }},
  { id: 'g2', bucket: 'growth', layer: 'integration', text: {
    en: 'What’s one thing I did today out of habit that doesn’t serve me?',
    tr: 'Bugün alışkanlıktan yaptığım ama bana hizmet etmeyen ne vardı?',
  }},
  { id: 'g3', bucket: 'growth', layer: 'integration', text: {
    en: 'Am I spending my time on what I say matters to me? Honestly?',
    tr: 'Önemli olduğunu söylediğim şeylere mi zaman ayırıyorum? Dürüstçe?',
  }},
  { id: 'g4', bucket: 'growth', layer: 'integration', text: {
    en: 'What would 10% more courage look like in my life right now?',
    tr: 'Şu an hayatımda %10 daha fazla cesaret nasıl görünürdü?',
  }},
  { id: 'g5', bucket: 'growth', layer: 'integration', text: {
    en: 'What did today teach me that’s worth repeating tomorrow?',
    tr: 'Bugün bana yarın tekrarlamaya değer olan neyi öğretti?',
  }},
  { id: 'g6', bucket: 'growth', layer: 'integration', text: {
    en: 'What would I try if I knew no one was watching?',
    tr: 'Kimse izlemese neyi denerdim?',
  }},
  { id: 'g7', bucket: 'growth', layer: 'integration', text: {
    en: 'What system could I design so this doesn’t rely on my willpower?',
    tr: 'İrademe bağlı kalmayacak şekilde nasıl bir sistem kurabilirim?',
  }},
  { id: 'g8', bucket: 'growth', layer: 'integration', text: {
    en: 'Where am I performing instead of living?',
    tr: 'Yaşamak yerine nerede bir rol oynuyorum?',
  }},
  { id: 'g9', bucket: 'growth', layer: 'physical', text: {
    en: 'Did my body get what it needed today — sleep, movement, food, breath?',
    tr: 'Bedenim bugün ihtiyacını aldı mı — uyku, hareket, yemek, nefes?',
  }},
  { id: 'g10', bucket: 'growth', layer: 'practical', text: {
    en: 'If I could drop one thing from my week without real consequence, what would it be?',
    tr: 'Haftamdan sonuçsuzca bir şey çıkarabilsem ne olurdu?',
  }},
];

// Pick one evening rotating prompt using a deterministic seed (date-based).
// Avoids repeats within the last N days via the shownPromptIds list.
export function pickDailyPrompt(
  lang: 'en' | 'tr',
  dateSeed: string,
  recentlyShownIds: string[] = [],
  starred: string[] = [],
): JournalPrompt {
  void lang;
  const recent = new Set(recentlyShownIds.slice(-10));
  const pool = JOURNAL_PROMPTS.filter((p) => !recent.has(p.id));
  const useStarred = starred.length > 0 && hashStr(dateSeed) % 4 === 0;
  const universe = useStarred
    ? JOURNAL_PROMPTS.filter((p) => starred.includes(p.id))
    : (pool.length ? pool : JOURNAL_PROMPTS);
  const idx = hashStr(dateSeed) % universe.length;
  return universe[idx];
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
