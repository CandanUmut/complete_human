import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import type { Language, MaybeLocalized } from '../i18n';
import { localize } from '../i18n';

export function useTranslation() {
  const { state } = useApp();
  const lang: Language = state.settings.language ?? 'en';

  function t(key: string, vars?: Record<string, string | number>): string {
    let text = translations[lang]?.[key] ?? translations.en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  }

  function l<T>(v: MaybeLocalized<T> | undefined, fallback?: T): T {
    return localize(v, lang, fallback);
  }

  return { t, l, lang };
}
