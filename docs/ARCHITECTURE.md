# Architecture — Vals del Agua

## Overview

Monorepo-style Space Apps MVP:

| Path | Role |
| --- | --- |
| `src/` | Vite + React + TypeScript explorer |
| `src/modules/` | `ChangeModule` plugins + registry |
| `src/adapters/` | NASA catalog adapters (ASF / CMR / GIBS / demo) |
| `server/catalogProxy.ts` | Express proxy + SAR-guide stub |
| `public/demo/` | Credential-free fixtures |
| `sar-guide/` | Agent SDK bilingual domain assistant |

## ChangeModule

```ts
export interface ChangeModule {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  defaultAoi: Aoi;
  supportedLayers: string[];
  narrativeHooks: (ctx) => { en: string; es: string }[];
  buildLayers(ctx): Promise<LayerDescriptor[]>;
}
```

- Modules register in `src/modules/registry.ts`.
- **v1 ships only `flood-water`.** Wildfire / subsidence can plug in later without rewriting the shell.

## Adapters

| File | Dataset | Search |
| --- | --- | --- |
| `nisarGcov.ts` | `NISAR_L2_GCOV_PROVISIONAL_V1` | ASF `platform=NISAR` `processingLevel=GCOV` |
| `operaRtc.ts` | `OPERA_L2_RTC-S1_V1` | ASF OPERA RTC |
| `operaDswx.ts` | `OPERA_L3_DSWX-HLS_V1` | CMR granules |
| `gibs.ts` | Blue Marble / VIIRS | WMTS tile templates |
| `demo.ts` | fixtures | `public/demo/*.json` |

Search metadata works without Earthdata Login. Product download/stream requires `EARTHDATA_USERNAME` / `EARTHDATA_PASSWORD` or `~/.netrc` — never committed.

## Data flow

```
UI (Explorer) → flood-water.buildLayers()
               → adapters (demo | ASF/CMR via fetch or /api proxy)
               → LayerDescriptor[] → Leaflet MapView
```

SAR guide:

```
UI → POST /api/sar-guide/stub   (always available)
  or Agent SDK serve (sar-guide/) when Cursor credential is present
```

## Default AOI

Monterrey metro / Santa Catarina corridor:

`west=-100.55, south=25.50, east=-100.05, north=25.85`
