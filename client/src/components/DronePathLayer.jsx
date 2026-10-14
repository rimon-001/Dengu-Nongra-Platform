import React, { useState, useEffect } from 'react';
import { useMap, Polyline, CircleMarker, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { PlaneTakeoff, Radio, Battery, Gauge } from 'lucide-react';

export default function DronePathLayer({ reports = [], visible = false, isBengali = false }) {
  const map = useMap();
  const [droneIndex, setDroneIndex] = useState(0);

  // Filter active and high-priority hotspots for drone waypoints
  const activeWaypoints = reports
    .filter(r => r && r.status !== 'resolved' && !isNaN(Number(r.latitude)) && !isNaN(Number(r.longitude)))
    .map(r => ({
      coords: [Number(r.latitude), Number(r.longitude)],
      id: r.id,
      desc: r.description || 'Breeding Site'
    }));

  // Campus Drone Launch Station (DIU Innovation / Central Field)
  const baseStation = [23.8765, 90.3200];
  const allCoordinates = [baseStation, ...activeWaypoints.map(w => w.coords), baseStation];

  // Animated flight simulation along corridor
  useEffect(() => {
    if (!visible || allCoordinates.length < 2) return;

    const interval = setInterval(() => {
      setDroneIndex(prev => (prev + 1) % allCoordinates.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [visible, allCoordinates.length]);

  if (!visible || activeWaypoints.length === 0) return null;

  const currentDronePos = allCoordinates[droneIndex] || baseStation;

  // Custom Animated Quadcopter DivIcon
  const droneIcon = L.divIcon({
    className: 'custom-drone-icon',
    html: `
      <div style="
        width: 30px; 
        height: 30px; 
        border-radius: 50%; 
        background: #1d4ed8; 
        border: 2px solid #ffffff; 
        box-shadow: 0 0 14px 4px rgba(37, 99, 235, 0.85); 
        display: flex; 
        align-items: center; 
        justify-content: center;
        animation: pulse 1.4s infinite;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
        </svg>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  return (
    <>
      {/* Flight Path Corridor */}
      <Polyline
        positions={allCoordinates}
        pathOptions={{
          color: '#3b82f6',
          weight: 3,
          dashArray: '8, 8',
          opacity: 0.85
        }}
      />

      {/* Drone Base Launch Station */}
      <CircleMarker
        center={baseStation}
        radius={10}
        pathOptions={{
          color: '#1d4ed8',
          fillColor: '#60a5fa',
          fillOpacity: 0.9,
          weight: 3
        }}
      >
        <Tooltip direction="top" offset={[0, -10]} opacity={0.9} permanent={false}>
          <span>{isBengali ? 'ড্রোন বেস স্টেশন: ডিআইইউ সেন্ট্রাল ফিল্ড' : 'Drone Base Station: DIU Quad'}</span>
        </Tooltip>
      </CircleMarker>

      {/* Target Waypoint Sequence Markers */}
      {activeWaypoints.map((wp, idx) => (
        <CircleMarker
          key={`wp-${wp.id || idx}`}
          center={wp.coords}
          radius={7}
          pathOptions={{
            color: '#dc2626',
            fillColor: '#ef4444',
            fillOpacity: 0.85,
            weight: 2
          }}
        >
          <Tooltip direction="bottom" offset={[0, 10]} opacity={0.9}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700 }}>
              <div>Waypoint #{idx + 1}</div>
              <div style={{ color: '#dc2626' }}>Spray Dose: 250ml Bti</div>
            </div>
          </Tooltip>
        </CircleMarker>
      ))}

      {/* Moving Drone Position Marker */}
      <Marker position={currentDronePos} icon={droneIcon}>
        <Tooltip permanent direction="top" offset={[0, -18]} opacity={0.95}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f172a' }}>
            <span>🚁 DIU-Drone-01 (45m AGL)</span>
            <div style={{ fontSize: '0.64rem', color: '#059669', fontWeight: 700 }}>
              {isBengali ? 'স্প্রে সিস্টেম প্রস্তুত' : 'ULV Aerosol Arm Active'}
            </div>
          </div>
        </Tooltip>
      </Marker>
    </>
  );
}