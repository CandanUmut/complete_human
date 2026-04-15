export type Language = 'en' | 'tr';

export type Localized<T = string> = { en: T; tr: T };
export type MaybeLocalized<T = string> = T | Localized<T>;

export const localize = <T,>(v: MaybeLocalized<T> | undefined, lang: Language, fallback?: T): T => {
  if (v === undefined || v === null) return fallback as T;
  if (typeof v === 'object' && v !== null && 'en' in (v as object)) {
    const lv = (v as Localized<T>)[lang];
    return (lv ?? (v as Localized<T>).en ?? fallback) as T;
  }
  return v as T;
};
