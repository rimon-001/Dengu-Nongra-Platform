import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Search, Download, Flame, PlaneTakeoff, Sliders, AlertTriangle } from 'lucide-react';
import HeatmapLayer from './HeatmapLayer';
import MapController from './MapController';
import ZoneSelector, { CAMPUS_ZONES } from './ZoneSelector';
import DronePathLayer from './DronePathLayer';
import GisLayersOverlay from './GisLayersOverlay';
import DrainageLayer from './DrainageLayer';
import VulnerabilityLayer from './VulnerabilityLayer';

export default function HotspotMap({ 
  reports = [], 
  onSelectTask, 
  searchTerm = '', 
  setSearchTerm, 
  filterStatus = 'all', 
  setFilterStatus,
  onLaunchModal,
  isBengali = false
}) {
  const [mapCenter, setMapCenter] = useState([23.8759, 90.3205]);
  const [mapZoom, setMapZoom] = useState(14);
  const [activeZone, setActiveZone] = useState('all');
  const [showDronePath, setShowDronePath] = useState(false);
  const [heatmapRiskFilter, setHeatmapRiskFilter] = useState('all'); // 'all', 'low', 'moderate', 'high'

  // Multi-layer GIS telemetry states
  const [gisOpen, setGisOpen] = useState(false);
  const [layers, setLayers] = useState({
    heatmap: false,
    breteau: false,
    drainage: false,
    vulnerable: false
  });

  const handleToggleLayer = (layerName) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };

  const handleZoneSelect = (zone) => {
    setActiveZone(zone.id);
    setMapCenter(zone.coords);
    setMapZoom(zone.zoom);
  };

  // Status pill click toggle
  const handleStatusLegendClick = (statusKey) => {
    if (filterStatus === statusKey) {
      setFilterStatus('all');
    } else {
      setFilterStatus(statusKey);
    }
  };

  // Risk gradient filter click
  const handleRiskFilterClick = (riskTier) => {
    // If heatmap isn't active, activate it automatically
    if (!layers.heatmap) {
      setLayers(prev => ({ ...prev, heatmap: true }));
    }
    setHeatmapRiskFilter(prev => prev === riskTier ? 'all' : riskTier);
  };

  const createCustomIcon = (status) => {
    const color = status === 'resolved' ? 'var(--color-resolved)' : status === 'claimed' ? 'var(--color-progress)' : 'var(--color-reported)';
    return L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });
  };

  const handleExportCSV = () => {
    if (!reports || reports.length === 0) {
      return alert(isBengali ? 'এক্সপোর্ট করার জন্য কোনো রিপোর্ট নেই।' : 'No reports to export.');
    }

    const headers = ['ID', 'Tracking Code', 'Status', 'Latitude', 'Longitude', 'Description', 'Reported At', 'Google Maps Link', 'Photo URL', 'Resolved Proof URL'];
    const rows = reports.map(r => {
      const mapsLink = `https://www.google.com/maps?q=${r.latitude},${r.longitude}`;
      const cleanDesc = (r.description || '').replace(/"/g, '""');
      return [
        r.id,
        r.tracking_code || `NG-${r.id}`,
        r.status,
        r.latitude,
        r.longitude,
        `"${cleanDesc}"`,
        r.created_at,
        mapsLink,
        r.image_url || '',
        r.resolved_image_url || ''
      ].join(',');
    });

    const csvString = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nongra-dengue-hotspots-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter reports for Heatmap based on active risk level
  const heatmapFilteredReports = reports.filter((r) => {
    if (heatmapRiskFilter === 'all') return true;
    if (heatmapRiskFilter === 'low') return r.status === 'resolved';
    if (heatmapRiskFilter === 'moderate') return r.status === 'claimed';
    if (heatmapRiskFilter === 'high') return r.status === 'reported';
    return true;
  });

  return (
    <div>
      <div className="section-header">
        <h2>{isBengali ? 'লাইভ কমিউনিটি মানচিত্র' : 'Live Community Map'}</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Drone Spray Flight Route Toggle */}
          <button 
            type="button"
            onClick={() => setShowDronePath(!showDronePath)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: showDronePath ? '#dbeafe' : '#ffffff',
              color: showDronePath ? '#1d4ed8' : 'var(--text-main)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <PlaneTakeoff size={14} /> {showDronePath ? (isBengali ? 'ড্রোন রুট বন্ধ' : 'Drone Active') : (isBengali ? 'ড্রোন স্প্রে রুট' : 'Drone Path')}
          </button>

          <button 
            type="button"
            onClick={handleExportCSV}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: '#ffffff',
              color: 'var(--color-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Download size={14} /> CSV
          </button>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '0.8rem', background: '#fff', color: 'var(--text-muted)' }}
          >
            <option value="all">{isBengali ? 'সকল ঝুঁকি' : 'All Hazards'}</option>
            <option value="reported">{isBengali ? 'রিপোর্টকৃত' : 'Reported Only'}</option>
            <option value="claimed">{isBengali ? 'চলমান' : 'In Progress Only'}</option>
            <option value="resolved">{isBengali ? 'সমাধানকৃত' : 'Resolved Only'}</option>
          </select>
        </div>
      </div>

      {/* Zone Bookmark Pills */}
      <ZoneSelector 
        selectedZone={activeZone} 
        onSelectZone={handleZoneSelect} 
        reports={reports}
        isBengali={isBengali} 
      />
      
      <div className="map-wrapper" style={{ position: 'relative' }}>
        {/* Floating GIS Multi-Layer Controller */}
        <GisLayersOverlay
          layers={layers}
          onToggleLayer={handleToggleLayer}
          isOpen={gisOpen}
          onToggleOpen={() => setGisOpen(!gisOpen)}
          activeRiskFilter={heatmapRiskFilter}
          onSelectRiskFilter={handleRiskFilterClick}
          isBengali={isBengali}
        />

        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 900,
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          padding: '6px 14px',
          width: '220px'
        }}>
          <Search size={16} color="#94a3b8" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder={isBengali ? "এলাকা খুঁজুন..." : "Search area..."} 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
          />
        </div>

        <MapContainer center={mapCenter} zoom={mapZoom} className="map-container" zoomControl={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          <MapController center={mapCenter} zoom={mapZoom} />

          {/* GIS Layer: Kernel Density Predictive Heatmap */}
          <HeatmapLayer 
            reports={heatmapFilteredReports} 
            visible={layers.heatmap} 
          />

          {/* GIS Layer: Predictive Breteau Outbreak Perimeter Rings */}
          {layers.breteau && reports.map((report) => (
            report.status === 'reported' ? (
              <Circle
                key={`breteau-${report.id}`}
                center={[report.latitude, report.longitude]}
                radius={85}
                pathOptions={{
                  color: '#dc2626',
                  fillColor: '#ef4444',
                  fillOpacity: 0.18,
                  dashArray: '4, 6',
                  weight: 2
                }}
              />
            ) : null
          ))}

          {/* GIS Layer: Municipal Drainage & Water Network */}
          <DrainageLayer visible={layers.drainage} isBengali={isBengali} />

          {/* GIS Layer: High-Density Vulnerability Zones */}
          <VulnerabilityLayer visible={layers.vulnerable} isBengali={isBengali} />

          {/* Automated Drone Flight Path Layer */}
          <DronePathLayer reports={reports} visible={showDronePath} isBengali={isBengali} />

          {/* Individual Hotspot Markers */}
          {!layers.heatmap && reports.map((report) => (
            <Marker 
              key={report.id} 
              position={[report.latitude, report.longitude]}
              icon={createCustomIcon(report.status)}
              eventHandlers={{
                click: () => onSelectTask(report),
              }}
            />
          ))}
        </MapContainer>

        {/* Fully Interactive Bottom-Left Map Legend */}
        <div className="map-legend">
          <button
            type="button"
            onClick={() => handleStatusLegendClick('reported')}
            className={`legend-item-btn ${filterStatus === 'reported' ? 'active-filter' : ''}`}
            title="Filter by Reported"
          >
            <div className="legend-dot" style={{ background: 'var(--color-reported)' }}></div>
            <span>{isBengali ? 'রিপোর্টকৃত' : 'Reported'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleStatusLegendClick('claimed')}
            className={`legend-item-btn ${filterStatus === 'claimed' ? 'active-filter' : ''}`}
            title="Filter by In Progress"
          >
            <div className="legend-dot" style={{ background: 'var(--color-progress)' }}></div>
            <span>{isBengali ? 'চলমান' : 'Progress'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleStatusLegendClick('resolved')}
            className={`legend-item-btn ${filterStatus === 'resolved' ? 'active-filter' : ''}`}
            title="Filter by Resolved"
          >
            <div className="legend-dot" style={{ background: 'var(--color-resolved)' }}></div>
            <span>{isBengali ? 'সমাধানকৃত' : 'Resolved'}</span>
          </button>

          {filterStatus !== 'all' && (
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              style={{
                marginLeft: '4px',
                padding: '2px 8px',
                borderRadius: '12px',
                border: 'none',
                background: '#e2e8f0',
                color: '#475569',
                fontSize: '0.68rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {isBengali ? 'রিসেট' : 'Reset'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}