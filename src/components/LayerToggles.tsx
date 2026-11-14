import type { Locale } from '../modules/types';
import { t, ui } from '../i18n/locale';

export type LayerFlags = {
  gcov: boolean;
  dswx: boolean;
  gibs: boolean;
  hh: boolean;
  hv: boolean;
};

type Props = {
  flags: LayerFlags;
  locale: Locale;
  onChange: (flags: LayerFlags) => void;
};

const LABELS: Record<keyof LayerFlags, { en: string; es: string }> = {
  gcov: { en: 'GCOV browse', es: 'GCOV browse' },
  dswx: { en: 'OPERA DSWx', es: 'OPERA DSWx' },
  gibs: { en: 'GIBS basemap', es: 'Basemap GIBS' },
  hh: { en: 'HH', es: 'HH' },
  hv: { en: 'HV', es: 'HV' },
};

export function LayerToggles({ flags, locale, onChange }: Props) {
  return (
    <fieldset className="layer-toggles">
      <legend>{t(ui.layers, locale)}</legend>
      {(Object.keys(flags) as (keyof LayerFlags)[]).map((key) => (
        <label key={key} className="toggle-row">
          <input
            type="checkbox"
            checked={flags[key]}
            onChange={(e) => onChange({ ...flags, [key]: e.target.checked })}
          />
          <span>{LABELS[key][locale]}</span>
        </label>
      ))}
    </fieldset>
  );
}
