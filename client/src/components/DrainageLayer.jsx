import React from 'react';
import { Polyline, Circle } from 'react-leaflet';

export default function DrainageLayer({ visible = false }) {
  if (!visible) return null;

  // Key campus and municipal drainage lines across Ashulia / DIU
  const primaryDrain = [
    [23.8795, 90.3225],
    [23.8768, 90.3201],
    [23.8725, 90.3230]
  ];

  const secondaryDrain = [
    [23.8780, 90.3150],
    [23.8760, 90.3180],
    [23.8768, 90.3201]
  ];

  return (
    <>
      <Polyline
        positions={primaryDrain}
        pathOptions={{
          color: '#0284c7',
          weight: 4,
          dashArray: '4, 4',
          opacity: 0.9
        }}
      />
      <Polyline
        positions={secondaryDrain}
        pathOptions={{
          color: '#0284c7',
          weight: 3,
          dashArray: '2, 6',
          opacity: 0.75
        }}
      />

      {/* Clogged Sump Point Buffer */}
      <Circle
        center={[23.8768, 90.3201]}
        radius={45}
        pathOptions={{
          color: '#0369a1',
          fillColor: '#38bdf8',
          fillOpacity: 0.25,
          weight: 1
        }}
      />
    </>
  );
}