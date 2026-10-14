import React from 'react';
import { X, Navigation, AlertOctagon, CheckCircle2, MapPin, ExternalLink, ShieldCheck, Flame, ArrowRight } from 'lucide-react';

export default function TriageModal({ isOpen, onClose, reports = [], onSelectTask, isBengali = false }) {
  if (!isOpen) return null;

  // Filter unresolved/active hazards
  const activeReports = reports.filter(r => r.status !== 'resolved');

  // Compute urgency scores dynamically
  const scoredReports = activeReports.map(report => {
    let score = 5;
    const desc = (report.description || '').toLowerCase();

    // High risk vector breeding environments
    if (desc.includes('tank') || desc.includes('rooftop')) score += 3;
    if (desc.includes('tire') || desc.includes('tyre')) score += 3;
    if (desc.includes('drain') || desc.includes('culvert')) score += 2;
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
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
              <AlertOctagon size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'পৌরসভা স্প্রে ট্রায়াজ অগ্রাধিকার কিউ' : 'Municipal Spray Triage Queue'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase' }}>
                {isBengali ? 'ঝুঁকি অ্যালগরিদম ভিত্তিক ডিসপ্যাচ র‍্যাংকিং' : 'Heuristic Risk & Pupal Acceleration Dispatch'}
              </span>
            </div>
          </div>

          <p style={{ margin: '0 0 18px 0', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {isBengali
              ? 'শনাক্তকৃত জমা পানির ধরন ও স্থায়িত্বের ভিত্তিতে সর্বাধিক ঝুঁকিপূর্ণ স্থানগুলোকে স্বয়ংক্রিয়ভাবে অগ্রাধিকার প্রদান করে তালিকাভুক্ত করা হয়েছে।'
              : 'Ranked mosquito larvicide intervention dispatch prioritizing stagnant water containers by pupal emergence timeline and residential proximity.'}
          </p>

          {scoredReports.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <CheckCircle2 size={40} color="#16a34a" style={{ marginBottom: '8px' }} />
              <p style={{ margin: 0, fontWeight: 700, color: '#166534', fontSize: '0.9rem' }}>
                {isBengali ? 'অভিনন্দন! সকল রিপোর্টকৃত প্রজননস্থল সফলভাবে পরিষ্কার করা হয়েছে!' : 'All reported breeding grounds have been neutralized!'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {scoredReports.map((item, index) => {
                const badgeColor = item.priorityLevel === 'CRITICAL' ? '#ef4444' : item.priorityLevel === 'HIGH' ? '#f59e0b' : '#3b82f6';
                const badgeBg = item.priorityLevel === 'CRITICAL' ? '#fee2e2' : item.priorityLevel === 'HIGH' ? '#fef3c7' : '#eff6ff';
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
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: badgeBg,
                        color: badgeColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        flexShrink: 0
                      }}>
                        #{index + 1}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1e293b' }}>
                            {item.description || 'Breeding site'}
                          </span>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: badgeBg,
                            color: badgeColor,
                            border: `1px solid ${badgeColor}30`
                          }}>
                            {item.priorityLevel} ({item.urgencyScore}/10)
                          </span>
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                          <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                          Lat: {Number(item.latitude).toFixed(4)}, Lng: {Number(item.longitude).toFixed(4)} • Status: <strong style={{ color: item.status === 'claimed' ? '#d97706' : '#dc2626' }}>{item.status.toUpperCase()}</strong>
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
                          justifyContent: 'center',
                          background: '#f8fafc'
                        }}
                        title="Open in Google Maps"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectTask(item);
                        }}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '8px',
                          background: 'var(--color-primary)',
                          color: '#fff',
                          border: 'none',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {isBengali ? 'পরিদর্শন' : 'Inspect'}
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