import React from 'react';
import { Layers, Droplets, Building, Flame, Check } from 'lucide-react';

export default function GisLayersOverlay({
  layers,
  onToggleLayer,
  isOpen,
  onToggleOpen,
  isBengali = false
}) {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={onToggleOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          borderRadius: '24px',
          background: '#ffffff',
          border: '1px solid var(--border)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          color: 'var(--text-main)',
          fontSize: '0.82rem',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        <Layers size={16} color="var(--color-primary)" />
        {isBengali ? 'মানচিত্র স্তরসমূহ' : 'GIS Layers'}
      </button>

      {/* Floating Layer Selection Card */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '44px',
          right: '0',
          width: '240px',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          border: '1px solid var(--border)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
            {isBengali ? 'সক্রিয় জিআইএস লেয়ার' : 'Active GIS Telemetry'}
          </div>

          {/* Layer 1: Larval Heatmap */}
          <div
            onClick={() => onToggleLayer('heatmap')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              borderRadius: '8px',
              background: layers.heatmap ? '#fee2e2' : '#f8fafc',
              border: `1px solid ${layers.heatmap ? '#fca5a5' : 'var(--border)'}`,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={15} color={layers.heatmap ? '#dc2626' : '#64748b'} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: layers.heatmap ? '#dc2626' : 'var(--text-main)' }}>
                {isBengali ? 'ঝুঁকি হিটম্যাপ' : 'Risk Heatmap'}
              </span>
            </div>
            {layers.heatmap && <Check size={14} color="#dc2626" />}
          </div>

          {/* Layer 2: Municipal Drainage Network */}
          <div
            onClick={() => onToggleLayer('drainage')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              borderRadius: '8px',
              background: layers.drainage ? '#e0f2fe' : '#f8fafc',
              border: `1px solid ${layers.drainage ? '#7dd3fc' : 'var(--border)'}`,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Droplets size={15} color={layers.drainage ? '#0284c7' : '#64748b'} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: layers.drainage ? '#0284c7' : 'var(--text-main)' }}>
                {isBengali ? 'ড্রেনেজ নেটওয়ার্ক' : 'Drain Network'}
              </span>
            </div>
            {layers.drainage && <Check size={14} color="#0284c7" />}
          </div>

          {/* Layer 3: High Density Vulnerability Sectors */}
          <div
            onClick={() => onToggleLayer('vulnerable')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              borderRadius: '8px',
              background: layers.vulnerable ? '#fef3c7' : '#f8fafc',
              border: `1px solid ${layers.vulnerable ? '#fde68a' : 'var(--border)'}`,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={15} color={layers.vulnerable ? '#d97706' : '#64748b'} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: layers.vulnerable ? '#d97706' : 'var(--text-main)' }}>
                {isBengali ? 'জনবহুল ঝুঁকি এলাকা' : 'Hostels & Hubs'}
              </span>
            </div>
            {layers.vulnerable && <Check size={14} color="#d97706" />}
          </div>
        </div>
      )}
    </div>
  );
}