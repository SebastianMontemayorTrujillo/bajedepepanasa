import { useEffect, useState } from 'react';
import { DEFAULT_DATES, MONTERREY_AOI } from '../lib/monterrey';
import { DEFAULT_MODULE_ID, getModule } from '../modules/registry';
import type { DatePair, LayerDescriptor, Locale } from '../modules/types';
import { t, ui } from '../i18n/locale';
import { DatePairPicker } from './DatePairPicker';
import { LayerToggles, type LayerFlags } from './LayerToggles';
import { MapView } from './MapView';
import { NarrativePanel } from './NarrativePanel';

type Props = {
  locale: Locale;
  demoMode: boolean;
};

export function Explorer({ locale, demoMode }: Props) {
  const mod = getModule(DEFAULT_MODULE_ID)!;
  const [dates, setDates] = useState<DatePair>(DEFAULT_DATES);
  const [afterOpacity, setAfterOpacity] = useState(0.72);
  const [flags, setFlags] = useState<LayerFlags>({
    gcov: true,
    dswx: true,
    gibs: true,
    hh: true,
    hv: false,
  });
  const [layers, setLayers] = useState<LayerDescriptor[]>([]);
  const [guideQ, setGuideQ] = useState('');
  const [guideA, setGuideA] = useState<string | null>(null);
  const [guideBusy, setGuideBusy] = useState(false);

  const polarization =
    flags.hh && flags.hv ? 'both' : flags.hh ? 'HH' : flags.hv ? 'HV' : 'HH';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const built = await mod.buildLayers({
        aoi: MONTERREY_AOI,
        dates,
        locale,
        polarization,
        demoMode,
      });
      if (!cancelled) setLayers(built);
    })();
    return () => {
      cancelled = true;
    };
  }, [dates, locale, polarization, demoMode, mod]);

  const hooks = mod.narrativeHooks({
    aoi: MONTERREY_AOI,
    dates,
    locale,
    polarization,
    demoMode,
  });

  async function askGuide(e: React.FormEvent) {
    e.preventDefault();
    if (!guideQ.trim()) return;
    setGuideBusy(true);
    setGuideA(null);
    try {
      const res = await fetch('/api/sar-guide/stub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: guideQ }),
      });
      if (res.ok) {
        const data = (await res.json()) as { reply: string };
        setGuideA(data.reply);
      } else {
        setGuideA(
          locale === 'es'
            ? 'Guía no disponible — revisa el servidor catalog (puerto 8787).'
            : 'Guide unavailable — check catalog server on port 8787.',
        );
      }
    } catch {
      setGuideA(
        locale === 'es'
          ? 'Sin conexión al stub de la guía SAR.'
          : 'Could not reach SAR guide stub.',
      );
    } finally {
      setGuideBusy(false);
    }
  }

  return (
    <section className="explorer" id="explorer">
      <header className="explorer-bar">
        <div>
          <h2>{t(mod.title, locale)}</h2>
          <p>{t(mod.description, locale)}</p>
        </div>
        <DatePairPicker dates={dates} locale={locale} onChange={setDates} />
      </header>

      <div className="explorer-grid">
        <div className="map-stage">
          <MapView layers={layers} afterOpacity={afterOpacity} flags={flags} />
          <div className="compare-rail">
            <label>
              <span>{t(ui.compare, locale)}</span>
              <span className="muted">{t(ui.opacity, locale)}</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={afterOpacity}
                onChange={(e) => setAfterOpacity(Number(e.target.value))}
              />
            </label>
          </div>
        </div>

        <div className="side-stack">
          <LayerToggles flags={flags} locale={locale} onChange={setFlags} />
          <NarrativePanel hooks={hooks} locale={locale} />
          <form className="guide-box" onSubmit={askGuide}>
            <label htmlFor="guide-q">{t(ui.askGuide, locale)}</label>
            <textarea
              id="guide-q"
              rows={3}
              value={guideQ}
              onChange={(e) => setGuideQ(e.target.value)}
              placeholder={
                locale === 'es'
                  ? '¿Qué indica HH vs HV tras la tormenta?'
                  : 'What does HH vs HV show after the storm?'
              }
            />
            <button type="submit" disabled={guideBusy}>
              {guideBusy ? '…' : t(ui.askGuide, locale)}
            </button>
            {guideA && <p className="guide-reply">{guideA}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
