import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

export default function HeatmapLayer({ 
  reports = [], 
  visible = false, 
  weatherMultiplier = 1.25, // Simulated 84% humidity & rainfall acceleration
  radius = 38,
  blur = 26
}) {
  const map = useMap();

  useEffect(() => {
    if (!visible || !reports || reports.length === 0) return;
    if (typeof L.heatLayer !== 'function') {
      console.warn('Leaflet.heat plugin is not initialized.');
      return;
    }

    // Predictive weighting algorithm:
    // Unresolved reported hazards + high humidity + rainfall accelerate larval hatching
    const heatPoints = reports.map((r) => {
      let baseWeight = 0.25;

      if (r.status === 'reported') {
        const desc = (r.description || '').toLowerCase();
        if (desc.includes('tyre') || desc.includes('tire') || desc.includes('tank') || desc.includes('drain')) {
          baseWeight = 1.0;
        } else {
          baseWeight = 0.85;
        }
      } else if (r.status === 'claimed') {
        baseWeight = 0.55;
      } else if (r.status === 'resolved') {
        baseWeight = 0.15; // Low residual risk
      }

      // Climate multiplication (High humidity accelerates vector density)
      const adjustedIntensity = Math.min(1.0, baseWeight * weatherMultiplier);

      return [
        Number(r.latitude),
        Number(r.longitude),
        adjustedIntensity
      ];
    });

    // Custom gradient mimicking Dengue epidemiological surveillance
    const heatLayer = L.heatLayer(heatPoints, {
      radius: radius,
      blur: blur,
      maxZoom: 17,
      minOpacity: 0.35,
      gradient: {
        0.15: '#10b981', // Safe / Low Density (BI < 10)
        0.45: '#38bdf8', // Mild accumulation
        0.65: '#f59e0b', // Moderate Alert (BI 20 - 35)
        0.85: '#ef4444', // Critical Vector Outbreak Trigger (BI > 35)
        1.0: '#991b1b'   // Maximum transmission cluster
      }
    });

    heatLayer.addTo(map);

    return () => {
      if (map && heatLayer) {
        map.removeLayer(heatLayer);
      }
    };
  }, [map, reports, visible, weatherMultiplier, radius, blur]);

  return null;
}