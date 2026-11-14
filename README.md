# Vals del Agua · bajedepepanasa

**Flood Waltz** — modular flood & surface-water explorer for **Monterrey / NE Mexico**, built for NASA Space Apps 2026 **Dancing with the SARs**.

| | |
| --- | --- |
| **Award lanes** | **Local Impact** (primary) · **Best Use of Data** (secondary) |
| **Primary data** | NISAR L2 GCOV (`NISAR_L2_GCOV_PROVISIONAL_V1`) |
| **Fallbacks** | OPERA RTC-S1 · OPERA DSWx-HLS · GIBS Blue Marble / VIIRS |
| **Product** | Leaflet explorer + bilingual Agent SDK SAR guide |
| **Stakeholder** | Protección Civil / educators / local decision-makers |

## Challenge alignment

Judges reward a **named place + stakeholder problem + NASA data made actionable**. We target the Santa Catarina corridor and metro floodplains — radar that still “sees” water under convective cloud — with narrative drivers (rainfall, impermeable growth, reservoirs, channelization), not a generic NISAR globe.

**Non-goals (v1):** GUNW/InSAR, music-sonification hero, heavy ML before the modular shell works.

## Quick start

```bash
cd ~/spaceapps/bajedepepanasa   # or your clone path
npm install
npm run dev
```

- Web: http://127.0.0.1:5173  
- Catalog / SAR stub: http://127.0.0.1:8787  

Demo mode is **on by default** — curated fixtures under `public/demo/` so the UI works with **zero Earthdata credentials**.

### Agent SDK SAR guide

```bash
cd sar-guide
npm install
npx --yes "@grok/agent-sdk@0.6.0" login    # if needed
npx --yes "@grok/agent-sdk@0.6.0" validate
npx --yes "@grok/agent-sdk@0.6.0" serve
```

If login fails on this machine, keep using `POST /api/sar-guide/stub` from the web UI (started by `npm run dev`). See [sar-guide/README.md](sar-guide/README.md).

## Earthdata setup

- **Search** (ASF / CMR metadata): no login required.
- **Download / stream** products: Earthdata Login.

```bash
cp .env.example .env
# set EARTHDATA_USERNAME / EARTHDATA_PASSWORD
# or configure ~/.netrc for urs.earthdata.nasa.gov
```

**Never commit passwords.** `.env` is gitignored.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — `ChangeModule` plugin interface, adapters, registry (`flood-water` only in v1).

## Judge pack

- [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md) — 3-minute walkthrough (EN + ES)
- This README — lanes, data, how to run

## Award-lane pitch

**Local Impact:** Monterrey already knows optical weather apps; we add **all-weather radar water** along the Santa Catarina with bilingual language for Protección Civil.

**Best Use of Data:** NISAR GCOV as primary, OPERA RTC as SAR fallback, OPERA DSWx as water-extent ground truth, GIBS for zero-credential basemap — one modular explorer, not a single-layer screenshot.

## License

MIT — see [LICENSE](LICENSE).
