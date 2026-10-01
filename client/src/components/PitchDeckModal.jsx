import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, ShieldCheck, Target, Layers, Trophy, CheckCircle2 } from 'lucide-react';

export default function PitchDeckModal({ isOpen, onClose, isBengali = false }) {
  if (!isOpen) return null;

  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: isBengali ? 'প্রকল্পের পরিচিতি ও সমস্যা' : 'The Crisis & The Core Problem',
      subtitle: isBengali ? 'বাংলাদেশে ডেঙ্গু মহামারী ও এডিস মশার প্রজনন' : 'Dengue Outbreak in Bangladesh & Aedes Propagation',
      icon: <Target size={28} color="#dc2626" />,
      content: (
        <div>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
            {isBengali 
              ? 'বাংলাদেশে বর্ষা ও পরবর্তী সময়ে জমা পানি এডিস মশার লার্ভার প্রধান প্রজনন ক্ষেত্র হয়ে দাঁড়ায়। প্রথাগত পৌরসভা জরিপের গতি ধীর হওয়ায় দ্রুত পদক্ষেপ নেওয়া সম্ভব হয় না।'
              : 'Post-monsoon humidity creates explosive Aedes mosquito breeding conditions across urban Dhaka and university campuses. Traditional municipal surveys take days to document stagnant water pools.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '16px' }}>
            <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#dc2626' }}>7–10 Days</div>
              <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>Aedes Larvae Incubation</div>
            </div>
            <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>80%+</div>
              <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>Dhaka Post-Monsoon Humidity</div>
            </div>
            <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>SDG 3 & 11</div>
              <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>Global Target Alignment</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: isBengali ? 'ত্রিমুখী সমাধান পদ্ধতি' : 'The 3-Tier Nongra Lifecycle',
      subtitle: isBengali ? 'নাগরিক রিপোর্ট থেকে পৌরসভা পরিষ্কারের সম্পূর্ণ চক্র' : 'From Citizen Sighting to Municipal Cleanup Verification',
      icon: <Layers size={28} color="#2563eb" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid var(--border)' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#dc2626', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>1</span>
            <div>
              <strong style={{ fontSize: '0.85rem' }}>Geo-Tagged Citizen Reporting</strong>
              <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>GPS location, hazard category, and photo evidence captured in seconds.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid var(--border)' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>2</span>
            <div>
              <strong style={{ fontSize: '0.85rem' }}>Municipal Triage & Larvicide Dispatch</strong>
              <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>Urgency algorithms prioritize Bti, Temephos, or physical drainage.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid var(--border)' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>3</span>
            <div>
              <strong style={{ fontSize: '0.85rem' }}>Side-by-Side Proof & Gamified Reward</strong>
              <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>Mandatory "After" proof photo verification and leaderboard point credits.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: isBengali ? 'প্রযুক্তিগত আর্কিটেকচার ও নির্ভরযোগ্যতা' : 'Technical Stack & Scalability',
      subtitle: isBengali ? 'উচ্চগতির আধুনিক ওয়েব কাঠামো' : 'Lightweight, Zero-Failure Local & Cloud Architecture',
      icon: <ShieldCheck size={28} color="#059669" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid var(--border)' }}>
            <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>Frontend Engine:</strong>
            <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>React 19 + Leaflet GIS + Radial Density Heatmaps + Web Speech Dictation API.</p>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid var(--border)' }}>
            <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>Backend & Data Engine:</strong>
            <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>Node.js / Express REST API with SQLite ACID persistence and CSV export streaming.</p>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid var(--border)' }}>
            <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>Zero-Network Resilience:</strong>
            <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>Instant mock fallback prevents app crashes if local network or Wi-Fi drops during presentation.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {slides[slide].icon}
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.5px' }}>
                Slide {slide + 1} of {slides.length} • Judge Presentation
              </span>
              <h2 style={{ margin: '2px 0 0', fontSize: '1.2rem', fontWeight: 800 }}>
                {slides[slide].title}
              </h2>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '18px' }}>
            {slides[slide].subtitle}
          </div>

          {/* Slide Content */}
          <div style={{ minHeight: '180px' }}>
            {slides[slide].content}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <button
              onClick={() => setSlide(Math.max(0, slide - 1))}
              disabled={slide === 0}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: '#fff',
                color: slide === 0 ? '#cbd5e1' : 'var(--text-main)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: slide === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={16} /> Back
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setSlide(idx)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: idx === slide ? 'var(--color-primary)' : '#cbd5e1',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>

            {slide < slides.length - 1 ? (
              <button
                onClick={() => setSlide(slide + 1)}
                className="btn-primary"
                style={{ width: 'auto', padding: '6px 14px', fontSize: '0.82rem' }}
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="btn-primary"
                style={{ width: 'auto', padding: '6px 14px', fontSize: '0.82rem', background: '#059669' }}
              >
                Start Demo <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}