import React from 'react';
import { X, Navigation, AlertOctagon, CheckCircle2, MapPin, ExternalLink } from 'lucide-react';

export default function TriageModal({ isOpen, onClose, reports = [], onSelectTask }) {
  if (!isOpen) return null;

  // Filter unresolved/active hazards
  const activeReports = reports.filter(r => r.status !== 'resolved');

  // Compute urgency scores dynamically
  const scoredReports = activeReports.map(report => {
    let score = 5;
    const desc = (report.description || '').toLowerCase();

    // High risk environments
    if (desc.includes('tank') || desc.includes('rooftop')) score += 3;
    if (desc.includes('tire') || desc.includes('drain')) score += 2;
    if (desc.includes('puddle') || desc.includes('plastic')) score += 1;

    // Time multiplier: older stagnant water has higher pupation risk
    const hoursOld = (Date.now() - new Date(report.created_at).getTime()) / (1000 * 60 * 60);
    if (hoursOld > 24) score += 2;

    const finalScore = Math.min(10, Math.max(1, score));

    return {
      ...report,
      urgencyScore: finalScore,
      priorityLevel: finalScore >= 8 ? 'CRITICAL' : finalScore >= 6 ? 'HIGH' : 'MEDIUM'
    };
  }).sort((a, b) => b.urgencyScore - a.urgencyScore);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <AlertOctagon size={18} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Municipal Spray Triage Queue</h2>
          </div>
          <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Ranked mosquito larvicide intervention dispatch for Dhaka City Corporation & Campus Sanitation Teams.
          </p>

          {scoredReports.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={36} color="#10b981" style={{ marginBottom: '8px' }} />
              <p style={{ margin: 0 }}>All reported breeding grounds have been neutralized!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {scoredReports.map((item, index) => {
                const badgeColor = item.priorityLevel === 'CRITICAL' ? '#ef4444' : item.priorityLevel === 'HIGH' ? '#f59e0b' : '#3b82f6';
                const mapsUrl = `https://www.google.com/maps?q=${item.latitude},${item.longitude}`;

                return (
                  <div
                    key={item.id}
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '14px 16px',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: `${badgeColor}15`,
                        color: badgeColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        flexShrink: 0
                      }}>
                        #{index + 1}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                            {item.description || 'Breeding site'}
                          </span>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '6px',
                            background: badgeColor,
                            color: '#fff'
                          }}>
                            {item.priorityLevel} ({item.urgencyScore}/10)
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                          Lat: {item.latitude.toFixed(4)}, Lng: {item.longitude.toFixed(4)} • Status: {item.status.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          color: '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Open in Google Maps"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectTask(item);
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: 'var(--color-primary)',
                          color: '#fff',
                          border: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}