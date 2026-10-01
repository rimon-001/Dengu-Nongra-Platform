import React from 'react';
import { X, Building2, ShieldCheck, AlertOctagon, CheckCircle2, MapPin, Award } from 'lucide-react';

export default function WardScorecardModal({ isOpen, onClose, reports = [], isBengali = false }) {
  if (!isOpen) return null;

  // Municipal ward zones across Ashulia & Campus footprint
  const wards = [
    {
      id: 'W-01',
      name: isBengali ? 'ওয়ার্ড ০১: আশুলিয়া মডেল টাউন ও পরিবহন টার্মিনাল' : 'Ward 01: Ashulia Model Town & Transport Bay',
      keywords: ['transport', 'terminal', 'drain', 'puddle'],
      inspector: 'Squad A (Lead: Tanvir H.)'
    },
    {
      id: 'W-02',
      name: isBengali ? 'ওয়ার্ড ০২: ডিআইইউ স্মার্ট ক্যাম্পাস ও ক্যাফেটেরিয়া লেক' : 'Ward 02: DIU Smart Campus & Cafeteria Lake',
      keywords: ['cafeteria', 'gate', 'lake', 'block'],
      inspector: 'DIU Eco Club Unit'
    },
    {
      id: 'W-03',
      name: isBengali ? 'ওয়ার্ড ০৩: বহুতল নির্মাণ এলাকা ও আবাসিক ছাদ' : 'Ward 03: Rooftops, Hostels & Construction Yards',
      keywords: ['tank', 'rooftop', 'construction', 'plastic', 'tire'],
      inspector: 'Green Ashulia Rapid Squad'
    }
  ];

  // Compute live scores dynamically from active reports
  const wardMetrics = wards.map(ward => {
    const matchingReports = reports.filter(r => {
      const desc = (r.description || '').toLowerCase();
      return ward.keywords.some(kw => desc.includes(kw));
    });

    const total = Math.max(1, matchingReports.length);
    const resolved = matchingReports.filter(r => r.status === 'resolved').length;
    const active = matchingReports.filter(r => r.status === 'reported').length;
    const inProgress = matchingReports.filter(r => r.status === 'claimed').length;
    const clearanceRatio = Math.round((resolved / total) * 100);

    let grade = 'A+ (Safe)';
    let gradeColor = '#16a34a';
    let gradeBg = '#dcfce7';

    if (active >= 2) {
      grade = 'C (High Alert)';
      gradeColor = '#dc2626';
      gradeBg = '#fee2e2';
    } else if (active === 1 || inProgress >= 1) {
      grade = 'B (Monitored)';
      gradeColor = '#d97706';
      gradeBg = '#fef3c7';
    }

    return {
      ...ward,
      total,
      resolved,
      active,
      inProgress,
      clearanceRatio,
      grade,
      gradeColor,
      gradeBg
    };
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'পৌরসভা ওয়ার্ড ডেঙ্গু প্রতিরোধ স্কোরকার্ড' : 'Municipal Ward Dengue Scorecard'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>
                {isBengali ? 'এলাকাভিত্তিক ঝুঁকি মূল্যায়ন ও পরিচ্ছন্নতা গ্রেডিং' : 'Sector-Wise Hazard Audit & Cleanliness Rating'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 20px', lineHeight: 1.5 }}>
            {isBengali
              ? 'আশুলিয়া ও বিশ্ববিদ্যালয় এলাকার বিভিন্ন ওয়ার্ডের সক্রিয় লার্ভা প্রজননস্থল এবং সমাধানের হারের ভিত্তিতে সাপ্তাহিক ঝুঁকি মূল্যায়ন।'
              : 'Weekly comparative surveillance rating calculated for local administrative zones based on breeding site density and rapid response times.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
            {wardMetrics.map(ward => (
              <div
                key={ward.id}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '16px',
                  background: '#ffffff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#475569' }}>
                        {ward.id}
                      </span>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{ward.name}</strong>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '3px' }}>
                      {isBengali ? 'দায়িত্বপ্রাপ্ত ইউনিট:' : 'Assigned Squad:'} {ward.inspector}
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: ward.gradeBg,
                    color: ward.gradeColor,
                    border: `1px solid ${ward.gradeColor}30`
                  }}>
                    {ward.grade}
                  </span>
                </div>

                {/* Progress Clearance Bar */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginBottom: '4px' }}>
                    <span>{isBengali ? 'লার্ভা নির্মূলের অগ্রগতি' : 'Breeding Site Clearance Rate'}</span>
                    <strong style={{ color: ward.gradeColor }}>{ward.clearanceRatio}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, Math.max(8, ward.clearanceRatio))}%`, height: '100%', background: ward.gradeColor, borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#475569', borderTop: '1px solid #f8fafc', paddingTop: '8px' }}>
                  <span>🔴 {ward.active} {isBengali ? 'সক্রিয় ঝুঁকি' : 'Active'}</span>
                  <span>🟡 {ward.inProgress} {isBengali ? 'চলমান' : 'In Progress'}</span>
                  <span>🟢 {ward.resolved} {isBengali ? 'সমাধানকৃত' : 'Neutralized'}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 14px', fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={18} color="#0f766e" flexShrink={0} />
            <span>
              {isBengali
                ? 'যে ওয়ার্ডের রেটিং "A+ (Safe)" বজায় থাকবে, সেই ওয়ার্ডের ভলান্টিয়ার টিমকে সিটি কর্পোরেশন স্টার ব্যাজ প্রদান করা হবে।'
                : 'Wards maintaining an "A+ (Safe)" rating for two consecutive weeks qualify for the City Health Taskforce Civic Excellence Grant.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}