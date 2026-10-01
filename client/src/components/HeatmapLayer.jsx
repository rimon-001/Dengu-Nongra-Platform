import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

export default function HeatmapLayer({ reports, visible }) {
  const map = useMap();

  useEffect(() => {
    if (!visible || !reports || reports.length === 0) return;

    // Weight active reports higher (intensity 1.0) than resolved (intensity 0.2)
    const heatPoints = reports.map((r) => [
      r.latitude,
      r.longitude,
      r.status === 'reported' ? 1.0 : r.status === 'claimed' ? 0.6 : 0.2
    ]);

    const heatLayer = L.heatLayer(heatPoints, {
      radius: 35,
      blur: 25,
      maxZoom: 17,
      gradient: {
        0.2: '#10b981', // low risk / resolved
        0.5: '#f59e0b', // moderate risk
        0.8: '#ef4444'  // severe breeding cluster
      }
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, reports, visible]);

  return null;
}