import { useEffect } from 'react';
import {
  ImageOverlay,
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { LayerDescriptor } from '../modules/types';
import { MAP_CENTER, MONTERREY_AOI } from '../lib/monterrey';

type Props = {
  layers: LayerDescriptor[];
  afterOpacity: number;
  flags: {
    gcov: boolean;
    dswx: boolean;
    gibs: boolean;
    hh: boolean;
    hv: boolean;
  };
};

function FitAoi() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([
      [MONTERREY_AOI.south, MONTERREY_AOI.west],
      [MONTERREY_AOI.north, MONTERREY_AOI.east],
    ]);
  }, [map]);
  return null;
}

function kindEnabled(
  kind: LayerDescriptor['kind'],
  flags: Props['flags'],
): boolean {
  switch (kind) {
    case 'gibs-basemap':
      return flags.gibs;
    case 'gcov-browse':
      return flags.gcov;
    case 'opera-dswx':
      return flags.dswx;
    case 'polarization-hh':
      return flags.hh;
    case 'polarization-hv':
      return flags.hv;
    default:
      return true;
  }
}

export function MapView({ layers, afterOpacity, flags }: Props) {
  const gibs = layers.find((l) => l.kind === 'gibs-basemap');
  const overlays = layers.filter((l) => l.kind !== 'gibs-basemap');

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={11}
      className="map-root"
      scrollWheelZoom
    >
      <FitAoi />
      {flags.gibs && gibs ? (
        <TileLayer
          url={gibs.url}
          attribution={gibs.attribution ?? 'NASA GIBS'}
          maxZoom={9}
          maxNativeZoom={8}
        />
      ) : (
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
      )}
      {overlays.map((layer) => {
        if (!kindEnabled(layer.kind, flags) || !layer.bounds) return null;
        const opacity =
          layer.dateRole === 'after'
            ? (layer.opacity ?? 0.7) * afterOpacity
            : (layer.opacity ?? 0.7) * (1.05 - afterOpacity * 0.4);
        const bounds = L.latLngBounds(layer.bounds);
        return (
          <ImageOverlay
            key={layer.id}
            url={layer.url}
            bounds={bounds}
            opacity={Math.min(1, Math.max(0, opacity))}
            zIndex={layer.kind.startsWith('polarization') ? 450 : 400}
          />
        );
      })}
    </MapContainer>
  );
}
