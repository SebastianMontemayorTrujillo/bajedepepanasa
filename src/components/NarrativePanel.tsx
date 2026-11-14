import type { Bilingual, Locale } from '../modules/types';
import { t, ui } from '../i18n/locale';

type Props = {
  hooks: Bilingual[];
  locale: Locale;
};

export function NarrativePanel({ hooks, locale }: Props) {
  return (
    <aside className="narrative-panel" aria-label={t(ui.narratives, locale)}>
      <h2>{t(ui.narratives, locale)}</h2>
      <ul>
        {hooks.map((h, i) => (
          <li key={i}>
            <p>{t(h, locale)}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
