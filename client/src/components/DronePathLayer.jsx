import React, { useEffect } from 'react';
import { useMap, Polyline, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

export default function DronePathLayer({ reports = [], visible = false, isBengali = false }) {
  const map = useMap();

  if (!visible) return null;

  // Filter active and high-priority hotspots for drone waypoints
  const activeWaypoints = reports
    .filter(r => r.status !== 'resolved')
    .map(r => [r.latitude, r.longitude]);

  // Campus Drone Launch Station (DIU Innovation / Central Field)
  const baseStation = [23.8765, 90.3200];
  const fullFlightPath = [baseStation, ...activeWaypoints, baseStation];

  if (activeWaypoints.length === 0) return null;

  return (
    <>
      {/* Flight Path Corridor */}
      <Polyline
        positions={fullFlightPath}
        pathOptions={{
          color: '#3b82f6',
          weight: 3,
          dashArray: '6, 8',
          opacity: 0.85
        }}
      />

      {/* Drone Base Launch Station */}
      <CircleMarker
        center={baseStation}
        radius={9}
        pathOptions={{
          color: '#1d4ed8',
          fillColor: '#3b82f6',
          fillOpacity: 0.9,
          weight: 3
        }}
      >
        <span style={{ display: 'none' }}>Base</span>
      </CircleMarker>

      {/* Waypoint Sequence Markers */}
      {activeWaypoints.map((coord, idx) => (
        <CircleMarker
          key={idx}
          center={coord}
          radius={6}
          pathOptions={{
            color: '#dc2626',
            fillColor: '#ef4444',
            fillOpacity: 0.8,
            weight: 2
          }}
        />
      ))}
    </>
  );
}