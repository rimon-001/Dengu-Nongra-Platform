import React from 'react';
import { AlertTriangle, Droplets, Thermometer, Info } from 'lucide-react';

export default function WeatherAdvisory({ activeCount = 0 }) {
  // Post-monsoon October climate indicators in Dhaka/Ashulia
  const weather = {
    temp: '31°C',
    humidity: '84%',
    forecast: 'Intermittent Showers'
  };

  // Dynamic risk calculation based on open breeding grounds
  const isHighRisk = activeCount >= 2;

  return (
    <div style={{
      background: isHighRisk ? '#fff1f2' : '#f0fdf4',
      border: `1px solid ${isHighRisk ? '#fecdd3' : '#bbf7d0'}`,
      borderRadius: '12px',
      padding: '14px 18px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: isHighRisk ? '#ffe4e6' : '#dcfce7',
          color: isHighRisk ? '#e11d48' : '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <AlertTriangle size={18} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isHighRisk ? '#9f1239' : '#166534' }}>
              {isHighRisk ? 'High Vector Breeding Alert' : 'Moderate Larvae Activity'}
            </span>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '10px',
              background: isHighRisk ? '#e11d48' : '#16a34a',
              color: '#ffffff'
            }}>
              Breteau Index: {isHighRisk ? 'Elevated (BI > 35)' : 'Controlled'}
            </span>
          </div>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#475569' }}>
            High humidity ({weather.humidity}) accelerates Aedes mosquito hatching in stagnant puddles. Inspect open drums and rooftop drains today.
          </p>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        fontSize: '0.8rem',
        color: '#64748b',
        fontWeight: 600,
        background: '#ffffff',
        padding: '6px 12px',
        borderRadius: '8px',
        border: '1px solid var(--border)'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Thermometer size={14} color="#f97316" /> {weather.temp}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Droplets size={14} color="#0284c7" /> {weather.humidity}
        </span>
      </div>
    </div>
  );
}