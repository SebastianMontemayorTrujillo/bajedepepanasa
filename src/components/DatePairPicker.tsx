import type { DatePair, Locale } from '../modules/types';
import { t, ui } from '../i18n/locale';

type Props = {
  dates: DatePair;
  locale: Locale;
  onChange: (dates: DatePair) => void;
};

export function DatePairPicker({ dates, locale, onChange }: Props) {
  return (
    <div className="date-pair">
      <label>
        <span>{t(ui.before, locale)}</span>
        <input
          type="date"
          value={dates.before}
          max={dates.after}
          onChange={(e) => onChange({ ...dates, before: e.target.value })}
        />
      </label>
      <label>
        <span>{t(ui.after, locale)}</span>
        <input
          type="date"
          value={dates.after}
          min={dates.before}
          onChange={(e) => onChange({ ...dates, after: e.target.value })}
        />
      </label>
    </div>
  );
}
