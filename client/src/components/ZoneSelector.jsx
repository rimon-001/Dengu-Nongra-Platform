import React from 'react';
import { MapPin, Navigation, School, Coffee, Bus, Building2, HardHat } from 'lucide-react';

export const CAMPUS_ZONES = [
  {
    id: 'all',
    nameEn: 'All Sectors',
    nameBn: 'সকল সেক্টর',
    icon: MapPin,
    coords: [23.8759, 90.3205],
    zoom: 14,
    bounds: { minLat: 23.868, maxLat: 23.885, minLng: 90.310, maxLng: 90.330 }
  },
  {
    id: 'lake',
    nameEn: 'Cafeteria & Lake',
    nameBn: 'ক্যাফেটেরিয়া ও লেক',
    icon: Coffee,
    coords: [23.8768, 90.3201],
    zoom: 17,
    bounds: { minLat: 23.8750, maxLat: 23.8780, minLng: 90.3185, maxLng: 90.3215 }
  },
  {
    id: 'terminal',
    nameEn: 'Transport Hub',
    nameBn: 'পরিবহন টার্মিনাল',
    icon: Bus,
    coords: [23.8725, 90.3230],
    zoom: 17,
    bounds: { minLat: 23.8710, maxLat: 23.8740, minLng: 90.3215, maxLng: 90.3245 }
  },
  {
    id: 'academic',
    nameEn: 'Academic Blocks',
    nameBn: 'একাডেমিক ভবন',
    icon: School,
    coords: [23.8795, 90.3225],
    zoom: 17,
    bounds: { minLat: 23.8780, maxLat: 23.8810, minLng: 90.3210, maxLng: 90.3240 }
  },
  {
    id: 'extension',
    nameEn: 'Extension Site',
    nameBn: 'সম্প্রসারণ এলাকা',
    icon: HardHat,
    coords: [23.8780, 90.3150],
    zoom: 17,
    bounds: { minLat: 23.8760, maxLat: 23.8795, minLng: 90.3130, maxLng: 90.3170 }
  }
];

export default function ZoneSelector({ 
  selectedZone = 'all', 
  onSelectZone, 
  reports = [], 
  isBengali = false 
}) {
  // Count active/pending hazards per zone
  const getZoneReportCount = (zone) => {
    if (zone.id === 'all') {
      return reports.filter(r => r.status === 'reported').length;
    }
    return reports.filter(r => {
      const lat = Number(r.latitude);
      const lng = Number(r.longitude);
      return (
        r.status === 'reported' &&
        lat >= zone.bounds.minLat &&
        lat <= zone.bounds.maxLat &&
        lng >= zone.bounds.minLng &&
        lng <= zone.bounds.maxLng
      );
    }).length;
  };

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      paddingBottom: '10px',
      marginBottom: '14px',
      scrollbarWidth: 'thin'
    }}>
      {CAMPUS_ZONES.map((zone) => {
        const Icon = zone.icon;
        const isSelected = selectedZone === zone.id;
        const count = getZoneReportCount(zone);

        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => onSelectZone(zone)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--border)'}`,
              background: isSelected ? 'var(--color-primary)' : '#ffffff',
              color: isSelected ? '#ffffff' : '#334155',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: isSelected ? '0 2px 8px rgba(15, 118, 110, 0.25)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Icon size={14} color={isSelected ? '#ffffff' : 'var(--color-primary)'} />
            <span>{isBengali ? zone.nameBn : zone.nameEn}</span>
            {count > 0 && (
              <span style={{
                fontSize: '0.66rem',
                fontWeight: 900,
                padding: '1px 6px',
                borderRadius: '10px',
                background: isSelected ? '#ffffff' : '#fee2e2',
                color: isSelected ? 'var(--color-primary)' : '#dc2626'
              }}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}