import React, { useState } from 'react';
import { X, ShieldCheck, Printer, CheckCircle, Building, Calendar, FileText, Stamp, QrCode } from 'lucide-react';

export default function ClearanceCertificateModal({ isOpen, onClose, reports = [], isBengali = false }) {
  if (!isOpen) return null;

  const resolvedReports = reports.filter(r => r.status === 'resolved');
  const [selectedReportId, setSelectedReportId] = useState(resolvedReports[0]?.id || null);

  const selectedReport = resolvedReports.find(r => r.id === selectedReportId) || resolvedReports[0];

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date().toLocaleDateString(isBengali ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                  {isBengali ? 'পৌরসভা স্বাস্থ্য ছাড়পত্র সনদ' : 'Municipal Sanitary Clearance Certificate'}
                </h2>
                <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>
                  {isBengali ? 'ডিজিএইচএস ভেক্টর কন্ট্রোল প্রত্যয়নপত্র' : 'DGHS Vector Compliance Certificate'}
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
                background: '#059669',
                color: '#fff',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Printer size={14} /> {isBengali ? 'প্রিন্ট / সেভ করুন' : 'Print Certificate'}
            </button>
          </div>

          {/* Select Hotspot dropdown */}
          {resolvedReports.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                {isBengali ? 'নিষ্পত্তিকৃত সাইট নির্বাচন করুন' : 'Select Cleared Site Registry'}
              </label>
              <select
                value={selectedReportId || ''}
                onChange={e => setSelectedReportId(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.82rem', background: '#fff' }}
              >
                {resolvedReports.map(r => (
                  <option key={r.id} value={r.id}>
                    Case #{r.id} - {r.description}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Certificate Container */}
          <div style={{
            border: '6px double #059669',
            borderRadius: '12px',
            padding: '28px 24px',
            background: '#ffffff',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
          }}>
            <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#059669' }}>
                GOVERNMENT HEALTH & SANITARY TASKFORCE
              </span>
              <h3 style={{ margin: '4px 0 2px', fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                CERTIFICATE OF VECTOR ERADICATION
              </h3>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Municipality Sector 09 • Savar/Ashulia Vector Control Registry
              </div>
            </div>

            {selectedReport ? (
              <>
                <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.6, margin: '0 0 16px' }}>
                  {isBengali
                    ? `এতদ্বারা প্রত্যয়ন করা যাচ্ছে যে, নংরা (Nongra) প্ল্যাটফর্মের মাধ্যমে নথিভুক্ত সাইট #${selectedReport.id} (${selectedReport.description})-এ পরিদর্শিত এডিস মশার প্রজননস্থল এবং জলাবদ্ধতা সফলভাবে নিষ্কাশন করা হয়েছে। উক্ত স্থানটি ডিজিএইচএস নির্দেশিকা অনুসারে লার্ভামুক্ত ঘোষণা করা হলো।`
                    : `This is to certify that the stagnant water breeding hazard identified under Registry Incident #${selectedReport.id} ("${selectedReport.description}") has undergone physical drainage and certified Bti bio-larvicide neutralization in full adherence with National Dengue Prevention Directives.`}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '18px', fontSize: '0.75rem' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Inspection Coords:</span>
                    <strong style={{ display: 'block', color: '#1e293b' }}>{selectedReport.latitude}, {selectedReport.longitude}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Intervention Applied:</span>
                    <strong style={{ display: 'block', color: '#059669' }}>{selectedReport.intervention || 'Physical Evacuation + Bti Spray'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Verification Date:</span>
                    <strong style={{ display: 'block', color: '#1e293b' }}>{formattedDate}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Compliance Registry:</span>
                    <strong style={{ display: 'block', color: '#1e293b' }}>NONGRA-SAN-2026-0{selectedReport.id}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '0.72rem', color: '#64748b' }}>
                  <div>
                    <div style={{ display: 'inline-block', border: '2px solid #059669', color: '#059669', padding: '4px 8px', borderRadius: '6px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                      ✓ INSPECTED & VERIFIED
                    </div>
                    <div>Audited by DIU Public Health Squad</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ borderBottom: '1px solid #475569', width: '140px', marginBottom: '4px' }}></div>
                    <strong>Municipal Chief Vector Inspector</strong>
                  </div>
                </div>
              </>
            ) : (
              <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                {isBengali ? 'কোনো সমাধানকৃত সাইট পাওয়া যায়নি।' : 'No resolved sites currently on file.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}