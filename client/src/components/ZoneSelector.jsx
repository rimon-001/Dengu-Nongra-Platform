import React from 'react';
import { MapPin, Building, Bus, HardHat, Coffee } from 'lucide-react';

export const CAMPUS_ZONES = [
  { id: 'all', label: 'All Sectors', labelBn: 'সকল এলাকা', icon: MapPin, coords: [23.8759, 90.3205], zoom: 14 },
  { id: 'cafeteria', label: 'Cafeteria & Lake', labelBn: 'ক্যাফেটেরিয়া ও লেক', icon: Coffee, coords: [23.8768, 90.3201], zoom: 16 },
  { id: 'transport', label: 'Transport Hub', labelBn: 'বাস টার্মিনাল', icon: Bus, coords: [23.8725, 90.3230], zoom: 16 },
  { id: 'academic', label: 'Academic Blocks', labelBn: 'একাডেমিক ভবন', icon: Building, coords: [23.8795, 90.3225], zoom: 16 },
  { id: 'construction', label: 'Extension Site', labelBn: 'নির্মাণ এলাকা', icon: HardHat, coords: [23.8780, 90.3150], zoom: 16 }
];

export default function ZoneSelector({ selectedZone, onSelectZone, isBengali = false }) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      paddingBottom: '8px',
      marginBottom: '14px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
      {CAMPUS_ZONES.map((zone) => {
        const Icon = zone.icon;
        const isActive = selectedZone === zone.id;
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
              border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--border)'}`,
              background: isActive ? 'var(--color-primary)' : '#ffffff',
              color: isActive ? '#ffffff' : 'var(--text-main)',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Icon size={14} color={isActive ? '#ffffff' : '#64748b'} />
            {isBengali ? zone.labelBn : zone.label}
          </button>
        );
      })}
    </div>
  );
}