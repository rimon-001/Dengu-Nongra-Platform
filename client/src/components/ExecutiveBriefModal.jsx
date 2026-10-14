import React from 'react';
import { X, Award, Shield, FileCheck, Layers, Cpu, Globe2, Printer, CheckCircle2, QrCode } from 'lucide-react';

export default function ExecutiveBriefModal({ isOpen, onClose, reports = [], isBengali = false }) {
  if (!isOpen) return null;

  const totalReports = reports.length;
  const resolved = reports.filter(r => r.status === 'resolved').length;
  const containmentRate = totalReports > 0 ? Math.round((resolved / totalReports) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '660px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#ecfdf5',
                color: '#047857',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileCheck size={20} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                  {isBengali ? 'প্রকল্প নির্বাহী সারসংক্ষেপ ও জুরি ব্রিফ' : 'Executive Project Brief & Jury Card'}
                </h2>
                <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>
                  {isBengali ? 'নংরা (Nongra) ভেক্টর সার্ভিল্যান্স আর্কিটেকচার' : 'Nongra Vector Surveillance Architecture'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: '#047857',
                color: '#fff',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Printer size={14} /> {isBengali ? 'প্রিন্ট / পিডিএফ' : 'Print PDF'}
            </button>
          </div>

          {/* Core Highlights */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #047857',
            borderRadius: '12px',
            padding: '18px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '12px' }}>
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>নংরা • Nongra</strong>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Municipal Dengue Vector Surveillance Platform (Ashulia & DIU)</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d' }}>
                  Containment: {containmentRate}%
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '0.78rem', marginBottom: '14px' }}>
              <div>
                <strong>🎯 Primary SDG Impact:</strong>
                <p style={{ margin: '2px 0 0', color: '#475569' }}>SDG 3 (Good Health & Well-being) & SDG 11 (Sustainable Cities & Communities).</p>
              </div>
              <div>
                <strong>🔬 Regulatory Alignment:</strong>
                <p style={{ margin: '2px 0 0', color: '#475569' }}>Aligned with WHO Vector Standards & DGHS Breteau Index (BI &lt; 20) protocols.</p>
              </div>
            </div>

            {/* Architecture Stack */}
            <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.78rem', color: '#1e293b', marginBottom: '4px' }}>
                <Cpu size={14} color="var(--color-primary)" /> Technical Stack & GIS Telemetry
              </div>
              <p style={{ margin: 0, fontSize: '0.74rem', color: '#64748b', lineHeight: 1.4 }}>
                Frontend: React 18, Leaflet GIS (Heatmaps, Drain Layers, Drone Waypoints). Backend: Node.js, Express, SQLite WAL-mode immutable audit storage. Offline sync powered by IndexedDB & Service Worker cache.
              </p>
            </div>

            {/* Completed Modules Checklist */}
            <div>
              <strong style={{ fontSize: '0.78rem', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
                Implemented Operational Capabilities:
              </strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', fontSize: '0.74rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} color="#059669" /> 7-Day Larval Trend Forecasting
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} color="#059669" /> Nearest-Neighbor TSP Routing
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} color="#059669" /> WHO Breteau Index Matrix
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} color="#059669" /> Autonomous Drone Flight Corridor
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} color="#059669" /> Ultrasonic Hazard Proximity Radar
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} color="#059669" /> Bti & Chemical Stock Ledger
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} color="#059669" /> Verified Citizen Rating Console
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} color="#059669" /> Non-repudiable Municipal Audit Logs
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#94a3b8' }}>
            <span>Prepared for Daffodil International University Innovation Showcase • 2026</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#047857', fontWeight: 800 }}>
              <QrCode size={14} /> VERIFIED-SYSTEM-ARCH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}