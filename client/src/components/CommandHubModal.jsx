import React, { useState } from 'react';
import { 
  X, Search, Navigation, Route, Radar, PlaneTakeoff, 
  Calculator, CloudRain, PackageCheck, ClipboardCheck, 
  ShieldCheck, Building2, Presentation, Star, BookOpen, 
  HeartPulse, Radio, FileText, BarChart3, RefreshCw, Zap, Play
} from 'lucide-react';

export default function CommandHubModal({
  isOpen,
  onClose,
  onOpenModal,
  onSimulate,
  isBengali = false
}) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const tools = [
    // Field Ops
    { id: 'triage', category: 'field', label: isBengali ? 'স্প্রে ট্রায়াজ' : 'Spray Triage Queue', desc: 'Prioritize unverified breeding pools', icon: Navigation, color: '#dc2626', bg: '#fef2f2' },
    { id: 'route', category: 'field', label: isBengali ? 'ভলান্টিয়ার রুট' : 'Patrol Route Optimizer', desc: 'Shortest-path turn-by-turn navigation', icon: Route, color: '#047857', bg: '#ecfdf5' },
    { id: 'radar', category: 'field', label: isBengali ? 'প্রক্সিমিটি রেডার' : 'Threat Proximity Radar', desc: 'Ultrasonic hazard warning bubble', icon: Radar, color: '#1d4ed8', bg: '#dbeafe' },
    { id: 'sync', category: 'field', label: isBengali ? 'অফলাইন সিঙ্ক' : 'Offline Buffer Sync', desc: 'WAL SQLite packet sync status', icon: RefreshCw, color: '#475569', bg: '#f1f5f9' },
    { id: 'simulate', category: 'field', label: isBengali ? 'হটস্পট সিমুলেশন' : 'Hotspot Simulation', desc: 'Generate synthetic breeding report', icon: Zap, color: '#c2410c', bg: '#fff7ed', isAction: true },

    // Analytical & Climate
    { id: 'climate', category: 'science', label: isBengali ? 'জলবায়ু সিমুলেটর' : 'Larval Hatch Simulator', desc: 'Temperature & rain hatch sensitivity', icon: CloudRain, color: '#2563eb', bg: '#eff6ff' },
    { id: 'breteau', category: 'science', label: isBengali ? 'ব্রুটো ইনডেক্স' : 'WHO Breteau Matrix', desc: 'Calculate BI, HI, CI epidemic threshold', icon: Calculator, color: '#b91c1c', bg: '#fef2f2' },
    { id: 'trends', category: 'science', label: isBengali ? '৭ দিনের ট্রেন্ডস' : 'Outbreak Risk Trends', desc: 'Reported vs cleared trajectory', icon: BarChart3, color: '#1d4ed8', bg: '#eff6ff' },
    { id: 'inventory', category: 'science', label: isBengali ? 'কীটনাশক মজুত' : 'Larvicide Stock Ledger', desc: 'Bti and fogging fuel reserve ledger', icon: PackageCheck, color: '#065f46', bg: '#ecfdf5' },

    // Governance & Compliance
    { id: 'audit', category: 'gov', label: isBengali ? 'অডিট লগ' : 'Municipal Audit Trail', desc: 'Non-repudiable transaction log', icon: ClipboardCheck, color: '#334155', bg: '#f8fafc' },
    { id: 'clearance', category: 'gov', label: isBengali ? 'ছাড়পত্র সনদ' : 'Clearance Certificate', desc: 'Official DGHS sanitation certificate', icon: ShieldCheck, color: '#059669', bg: '#ecfdf5' },
    { id: 'ward', category: 'gov', label: isBengali ? 'ওয়ার্ড স্কোরকার্ড' : 'Ward Safety Scorecard', desc: 'Sector-wise A/B/C safety grades', icon: Building2, color: '#15803d', bg: '#f0fdf4' },
    { id: 'brief', category: 'gov', label: isBengali ? 'সারসংক্ষেপ কার্ড' : 'Executive Jury Brief', desc: 'One-page print architecture summary', icon: Presentation, color: '#047857', bg: '#ecfdf5' },
    { id: 'deck', category: 'gov', label: isBengali ? 'পিচ ডেক' : 'Pitch Deck Presentation', desc: 'Competition presentation slides', icon: Presentation, color: '#3730a3', bg: '#e0e7ff' },
    { id: 'manifest', category: 'gov', label: isBengali ? 'ডিসপ্যাচ ম্যানিফেস্ট' : 'Dispatch Manifest', desc: 'Printable team field manifest', icon: FileText, color: '#0f766e', bg: '#f0fdfa' },

    // Public Health & Community
    { id: 'rating', category: 'community', label: isBengali ? 'নাগরিক ফিডব্যাক' : 'Citizen Verification', desc: '5-star reviews & re-infestation flags', icon: Star, color: '#b45309', bg: '#fef3c7' },
    { id: 'guide', category: 'community', label: isBengali ? 'প্রতিরোধ গাইড' : 'Awareness & 3-Day Rule', desc: 'Public health mosquito protocols', icon: BookOpen, color: '#047857', bg: '#ecfdf5' },
    { id: 'helpline', category: 'community', label: isBengali ? 'মেডিকেল হেল্পলাইন' : 'Clinical Referral Depot', desc: 'Hospital NS1 & platelet centers', icon: HeartPulse, color: '#e11d48', bg: '#fff1f2' },
    { id: 'broadcast', category: 'community', label: isBengali ? 'জরুরি অ্যালার্ট' : 'Emergency SMS Gateway', desc: '1km geo-targeted squad alert', icon: Radio, color: '#dc2626', bg: '#fef2f2' }
  ];

  const filteredTools = tools.filter(t => 
    t.label.toLowerCase().includes(query.toLowerCase()) || 
    t.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectTool = (tool) => {
    onClose();
    if (tool.id === 'simulate') {
      onSimulate();
    } else {
      onOpenModal(tool.id);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                {isBengali ? 'কমান্ড সেন্টার টুলকিট' : 'Municipal Command Toolkit'}
              </h2>
              <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
                {isBengali ? 'নংরা (Nongra) প্ল্যাটফর্মের সক্রিয় মডিউল হাব' : 'Unified municipal health & field operations hub'}
              </span>
            </div>
          </div>

          {/* Highlighted Live Demo Stepper Launcher */}
          <div
            onClick={() => {
              onClose();
              onOpenModal('showcase');
            }}
            style={{
              background: '#fef3c7',
              border: '1px solid #fde68a',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#d97706', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={16} />
              </div>
              <div>
                <strong style={{ fontSize: '0.86rem', color: '#78350f' }}>
                  {isBengali ? '৬০ সেকেন্ডের লাইভ জুরি ডেমো' : 'Run 60s Live Pitch Demo'}
                </strong>
                <div style={{ fontSize: '0.72rem', color: '#92400e' }}>
                  {isBengali ? 'সম্পূর্ণ ভেক্টর সার্ভিল্যান্স সাইকেলের অটোমেটেড ওয়াকথ্রু' : 'Automated step-by-step presentation runner for judges'}
                </div>
              </div>
            </div>

            <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', background: '#d97706', color: '#fff' }}>
              START
            </span>
          </div>

          {/* Quick Search */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f8fafc',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '8px 12px',
            marginBottom: '18px'
          }}>
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={isBengali ? "মডিউল বা টুল খুঁজুন (যেমন: Breteau, Triage, Route)..." : "Search modules (e.g. Breteau, Triage, Route, Audit)..."}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.84rem' }}
            />
          </div>

          {/* Grid Layout of Tools */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
            gap: '12px'
          }}>
            {filteredTools.map(tool => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelectTool(tool)}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '12px',
                    background: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'border-color 0.15s ease, transform 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = tool.color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: tool.bg,
                    color: tool.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={16} />
                  </div>

                  <strong style={{ fontSize: '0.82rem', color: '#1e293b' }}>
                    {tool.label}
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.3 }}>
                    {tool.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}