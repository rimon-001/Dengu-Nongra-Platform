import React, { useEffect, useRef } from 'react';
import { Layers, Droplets, Building, Flame, Check, CloudRain, Activity } from 'lucide-react';

export default function GisLayersOverlay({
  layers = { heatmap: false, breteau: false, drainage: false, vulnerable: false },
  onToggleLayer,
  isOpen = false,
  onToggleOpen,
  activeRiskFilter = 'all',
  onSelectRiskFilter,
  isBengali = false
}) {
  const overlayRef = useRef(null);

  // Click-outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && overlayRef.current && !overlayRef.current.contains(e.target)) {
        onToggleOpen();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggleOpen]);

  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 1000
      }}
    >
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
          top: '42px',
          right: '0',
          width: '260px',
          maxHeight: '360px',
          overflowY: 'auto',
          background: '#ffffff',
          borderRadius: '14px',
          boxShadow: '0 10px 25px rgba(15, 23, 42, 0.18)',
          border: '1px solid var(--border)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Header & Climate Index Telemetry */}
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '6px', marginBottom: '2px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {isBengali ? 'সক্রিয় জিআইএস লেয়ার' : 'Active GIS Telemetry'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px', fontSize: '0.68rem', color: '#0369a1', background: '#e0f2fe', padding: '3px 8px', borderRadius: '6px' }}>
              <CloudRain size={12} />
              <span>{isBengali ? 'আবহাওয়া: ৮৪% আর্দ্রতা (উচ্চ ঝুঁকি)' : 'Climate: 84% RH (Hatch Alert)'}</span>
            </div>
          </div>

          {/* Layer 1: Larval Heatmap */}
          <div
            onClick={() => onToggleLayer('heatmap')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 9px',
              borderRadius: '8px',
              background: layers.heatmap ? '#fee2e2' : '#f8fafc',
              border: `1px solid ${layers.heatmap ? '#fca5a5' : 'var(--border)'}`,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Flame size={14} color={layers.heatmap ? '#dc2626' : '#64748b'} />
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: layers.heatmap ? '#dc2626' : 'var(--text-main)', display: 'block' }}>
                  {isBengali ? 'ঝুঁকি হিটম্যাপ' : 'Risk Heatmap'}
                </span>
                <span style={{ fontSize: '0.64rem', color: '#64748b' }}>
                  {isBengali ? 'আবহাওয়া-ভিত্তিক লার্ভা ক্লাস্টার' : 'Climate-weighted kernel density'}
                </span>
              </div>
            </div>
            {layers.heatmap && <Check size={14} color="#dc2626" />}
          </div>

          {/* Layer 2: Predictive Breteau Index Zones */}
          <div
            onClick={() => onToggleLayer('breteau')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 9px',
              borderRadius: '8px',
              background: layers.breteau ? '#fef2f2' : '#f8fafc',
              border: `1px solid ${layers.breteau ? '#f87171' : 'var(--border)'}`,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Activity size={14} color={layers.breteau ? '#b91c1c' : '#64748b'} />
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: layers.breteau ? '#b91c1c' : 'var(--text-main)', display: 'block' }}>
                  {isBengali ? 'ব্রেটো ইনডেক্স স্তর' : 'Breteau Index Zones'}
                </span>
                <span style={{ fontSize: '0.64rem', color: '#64748b' }}>
                  {isBengali ? 'BI > 35 প্রাদুর্ভাব সতর্কতা' : 'BI > 35 outbreak threshold'}
                </span>
              </div>
            </div>
            {layers.breteau && <Check size={14} color="#b91c1c" />}
          </div>

          {/* Layer 3: Municipal Drainage Network */}
          <div
            onClick={() => onToggleLayer('drainage')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 9px',
              borderRadius: '8px',
              background: layers.drainage ? '#e0f2fe' : '#f8fafc',
              border: `1px solid ${layers.drainage ? '#7dd3fc' : 'var(--border)'}`,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Droplets size={14} color={layers.drainage ? '#0284c7' : '#64748b'} />
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: layers.drainage ? '#0284c7' : 'var(--text-main)', display: 'block' }}>
                  {isBengali ? 'ড্রেনেজ নেটওয়ার্ক' : 'Drain Network'}
                </span>
                <span style={{ fontSize: '0.64rem', color: '#64748b' }}>
                  {isBengali ? 'কালভার্ট ও জলাবদ্ধ নালা' : 'Culverts & storm conduits'}
                </span>
              </div>
            </div>
            {layers.drainage && <Check size={14} color="#0284c7" />}
          </div>

          {/* Layer 4: High Density Vulnerability Sectors */}
          <div
            onClick={() => onToggleLayer('vulnerable')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 9px',
              borderRadius: '8px',
              background: layers.vulnerable ? '#fef3c7' : '#f8fafc',
              border: `1px solid ${layers.vulnerable ? '#fde68a' : 'var(--border)'}`,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Building size={14} color={layers.vulnerable ? '#d97706' : '#64748b'} />
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: layers.vulnerable ? '#d97706' : 'var(--text-main)', display: 'block' }}>
                  {isBengali ? 'জনবহুল ঝুঁকি এলাকা' : 'Hostels & Hubs'}
                </span>
                <span style={{ fontSize: '0.64rem', color: '#64748b' }}>
                  {isBengali ? 'শিক্ষার্থী হল ও বাজার অঞ্চল' : 'Student dorms & terminals'}
                </span>
              </div>
            </div>
            {layers.vulnerable && <Check size={14} color="#d97706" />}
          </div>

          {/* Interactive Clickable Risk Level Buttons */}
          <div style={{
            marginTop: '4px',
            paddingTop: '8px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <div style={{ fontSize: '0.66rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
              {isBengali ? 'হিটম্যাপ তীব্রতা ফিল্টার' : 'Heatmap Intensity Filter:'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
              <button
                type="button"
                onClick={() => onSelectRiskFilter && onSelectRiskFilter('low')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  border: `1px solid ${activeRiskFilter === 'low' ? '#10b981' : '#e2e8f0'}`,
                  background: activeRiskFilter === 'low' ? '#ecfdf5' : '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: activeRiskFilter === 'low' ? '#047857' : '#334155',
                  cursor: 'pointer'
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }}></span> Low
              </button>

              <button
                type="button"
                onClick={() => onSelectRiskFilter && onSelectRiskFilter('moderate')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  border: `1px solid ${activeRiskFilter === 'moderate' ? '#f59e0b' : '#e2e8f0'}`,
                  background: activeRiskFilter === 'moderate' ? '#fffbeb' : '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: activeRiskFilter === 'moderate' ? '#b45309' : '#334155',
                  cursor: 'pointer'
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f59e0b' }}></span> Moderate
              </button>

              <button
                type="button"
                onClick={() => onSelectRiskFilter && onSelectRiskFilter('high')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  border: `1px solid ${activeRiskFilter === 'high' ? '#ef4444' : '#e2e8f0'}`,
                  background: activeRiskFilter === 'high' ? '#fef2f2' : '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: activeRiskFilter === 'high' ? '#b91c1c' : '#334155',
                  cursor: 'pointer'
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444' }}></span> High
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}