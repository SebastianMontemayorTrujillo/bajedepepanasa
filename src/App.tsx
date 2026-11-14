import { useState } from 'react';
import { Explorer } from './components/Explorer';
import type { Locale } from './modules/types';
import { t, ui } from './i18n/locale';

export default function App() {
  const [locale, setLocale] = useState<Locale>('es');
  const [demoMode, setDemoMode] = useState(true);
  const [showExplorer, setShowExplorer] = useState(false);

  return (
    <div className="app-shell">
      <div className="atmosphere" aria-hidden />
      <header className="topbar">
        <a className="wordmark" href="#top">
          <span className="wordmark-main">{ui.brand}</span>
          <span className="wordmark-sub">{t(ui.brandSub, locale)}</span>
        </a>
        <div className="topbar-actions">
          <button
            type="button"
            className={demoMode ? 'chip active' : 'chip'}
            onClick={() => setDemoMode((v) => !v)}
            aria-pressed={demoMode}
          >
            {t(ui.demoOn, locale)}
          </button>
          <button
            type="button"
            className="chip"
            onClick={() => setLocale((l) => (l === 'es' ? 'en' : 'es'))}
          >
            {t(ui.language, locale)}
          </button>
        </div>
      </header>

      {!showExplorer ? (
        <main className="hero" id="top">
          <div className="hero-copy">
            <p className="brand-hero">{ui.brand}</p>
            <h1>{t(ui.brandSub, locale)}</h1>
            <p className="lede">{t(ui.tagline, locale)}</p>
            <div className="cta-row">
              <button
                type="button"
                className="cta"
                onClick={() => setShowExplorer(true)}
              >
                {t(ui.openExplorer, locale)}
              </button>
            </div>
          </div>
          <div className="hero-visual" aria-hidden>
            <div className="radar-wash" />
            <div className="river-line" />
            <div className="rain-grain" />
          </div>
        </main>
      ) : (
        <Explorer locale={locale} demoMode={demoMode} />
      )}

      <footer className="site-foot">
        <span>bajedepepanasa · Space Apps 2026 · Dancing with the SARs</span>
        <span>NISAR GCOV · OPERA · GIBS</span>
      </footer>
    </div>
  );
}
