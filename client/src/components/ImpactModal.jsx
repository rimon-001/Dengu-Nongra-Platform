import React from 'react';
import { X, Award, Droplet, ShieldCheck, Bug, HeartPulse, Building2, Trees } from 'lucide-react';

export default function ImpactModal({ isOpen, onClose, reports = [] }) {
  if (!isOpen) return null;

  const resolvedCount = reports.filter(r => r.status === 'resolved').length;
  const activeCount = reports.filter(r => r.status === 'reported').length;
  const claimedCount = reports.filter(r => r.status === 'claimed').length;

  // Empirical vector control estimation models
  const estimatedWaterClearedLiters = resolvedCount * 120; // Avg 120L per cleared drum/drain
  const estimatedLarvaeSuppressed = resolvedCount * 4500; // Avg ~4,500 larvae potential per stagnant pool
  const populationProtected = resolvedCount * 85; // Ashulia campus block density footprint

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <HeartPulse size={18} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Civic & SDG Impact Summary</h2>
          </div>
          <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Real-time public health and environmental protection metrics computed across the DIU Smart City campus & Ashulia region.
          </p>

          {/* Quick Quantitative Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '14px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Droplet size={14} /> Water Evacuated
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803d', marginTop: '4px' }}>
                {estimatedWaterClearedLiters.toLocaleString()} L
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#4b5563' }}>Stagnant volume neutralized</p>
            </div>

            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '14px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991b1b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Bug size={14} /> Larvae Suppressed
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#b91c1c', marginTop: '4px' }}>
                ~{estimatedLarvaeSuppressed.toLocaleString()}
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#4b5563' }}>Potential Aedes vectors blocked</p>
            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '14px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1e40af', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <ShieldCheck size={14} /> Direct Protection
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1d4ed8', marginTop: '4px' }}>
                {populationProtected.toLocaleString()}
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#4b5563' }}>Students & residents shielded</p>
            </div>

            <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', padding: '14px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b21a8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Award size={14} /> Volunteer Operations
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#7e22ce', marginTop: '4px' }}>
                {resolvedCount + claimedCount} Active
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#4b5563' }}>Squad tasks processed</p>
            </div>
          </div>

          {/* SDG Alignment Breakdown */}
          <h3 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: 700 }}>UN Sustainable Development Goals</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', background: '#f8fafc', border: '1px solid var(--border)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#4c9f38', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                SDG 3
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Good Health and Well-Being (Target 3.3)</div>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Halting transmission of neglected tropical and vector-borne diseases like Dengue and Chikungunya through crowdsourced early detection.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', background: '#f8fafc', border: '1px solid var(--border)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fd9d24', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                SDG 11
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Sustainable Cities and Communities (Target 11.6)</div>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Reducing environmental health impact via municipal data export and rapid urban sanitation triage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}