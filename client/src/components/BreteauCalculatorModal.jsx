import React, { useState } from 'react';
import { X, Calculator, Bug, AlertTriangle, ShieldCheck, Download, Info, Sparkles, Building, Layers } from 'lucide-react';

export default function BreteauCalculatorModal({ isOpen, onClose, isBengali = false }) {
  if (!isOpen) return null;

  const [housesSampled, setHousesSampled] = useState(100);
  const [containersChecked, setContainersChecked] = useState(240);
  const [positiveContainers, setPositiveContainers] = useState(28);
  const [positiveHouses, setPositiveHouses] = useState(18);

  // Quick sampling presets
  const applyPreset = (houses, containers, posContainers, posHouses) => {
    setHousesSampled(houses);
    setContainersChecked(containers);
    setPositiveContainers(posContainers);
    setPositiveHouses(posHouses);
  };

  // WHO & DGHS Vector Indices Calculations
  const breteauIndex = housesSampled > 0 ? ((positiveContainers / housesSampled) * 100).toFixed(1) : 0;
  const houseIndex = housesSampled > 0 ? ((positiveHouses / housesSampled) * 100).toFixed(1) : 0;
  const containerIndex = containersChecked > 0 ? ((positiveContainers / containersChecked) * 100).toFixed(1) : 0;

  // Epidemiological risk grading based on WHO standards
  let riskLevel = isBengali ? 'উচ্চ মহামারী ঝুঁকি' : 'ELEVATED EPIDEMIC RISK';
  let riskColor = '#dc2626';
  let riskBg = '#fef2f2';
  let guidance = isBengali
    ? 'ব্রেটো ইনডেক্স ২০ এর বেশি। অবিলম্বে sampled এলাকায় ইউএলভি (ULV) ফগিং এবং বিটিআই (Bti) লার্ভিসাইড স্প্রে অভিযান পরিচালনা করুন।'
    : 'Breteau Index exceeds 20. Explosive epidemic transmission potential. Mandatory municipal ULV fogging and Bti bio-larvicide sweep required across sampled quadrant.';

  if (breteauIndex < 5) {
    riskLevel = isBengali ? 'নিয়ন্ত্রিত (কম ঝুঁকি)' : 'CONTROLLED (LOW RISK)';
    riskColor = '#16a34a';
    riskBg = '#f0fdf4';
    guidance = isBengali
      ? 'বিআই < ৫ নির্দেশ করে সংক্রমণ ঝুঁকি নগণ্য। নিয়মিত ৩ দিনের পানি নিষ্কাশন ও নাগরিক সচেতনতা অব্যাহত রাখুন।'
      : 'BI < 5 indicates negligible transmission potential. Maintain routine physical cleanup cycles and citizen surveillance.';
  } else if (breteauIndex <= 20) {
    riskLevel = isBengali ? 'সতর্কতা স্তর (মাঝারি)' : 'MODERATE ALERT';
    riskColor = '#d97706';
    riskBg = '#fffbeb';
    guidance = isBengali
      ? 'বিআই ৫–২০ এর মধ্যে। এডিস মশার বিস্তার মাঝারি। হটস্পটগুলোতে ড্রেন পরিষ্কার ও লার্ভিসাইড প্রয়োগ বৃদ্ধি করুন।'
      : 'BI between 5–20. Moderate Aedes proliferation risk. Intensify community awareness campaigns and targeted biological larviciding.';
  }

  const handleExportSurvey = () => {
    const surveyData = [
      ['Metric', 'Value'],
      ['Houses Inspected', housesSampled],
      ['Total Containers Checked', containersChecked],
      ['Containers Positive for Larvae/Pupae', positiveContainers],
      ['Houses Positive for Breeding', positiveHouses],
      ['Breteau Index (BI)', breteauIndex],
      ['House Index (HI)', `${houseIndex}%`],
      ['Container Index (CI)', `${containerIndex}%`],
      ['Epidemiological Status', riskLevel],
      ['Survey Date', new Date().toISOString()]
    ];

    const csvContent = '\uFEFF' + surveyData.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dengue-entomological-survey-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calculator size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'ব্রুটো ইনডেক্স ও লার্ভা জরিপ ক্যালকুলেটর' : 'Breteau Index & Larval Survey Matrix'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase' }}>
                {isBengali ? 'হু (WHO) ও ডিজিএইচএস কীটতাত্ত্বিক জরিপ মানদণ্ড' : 'WHO / DGHS Entomological Vector Surveillance Standard'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
            {isBengali
              ? 'ক্যাম্পাস ও পৌর এলাকার বিভিন্ন বাড়ি এবং স্থাপনায় পরিচালিত নমুনা পরীক্ষার ভিত্তিতে এডিস মশার ব্রুটো ইনডেক্স (BI), কন্টেইনার ইনডেক্স (CI) ও হাউস ইনডেক্স (HI) পরিমাপ করুন।'
              : 'Calculate standardized Aedes entomological indices from field dipping samples to determine whether active vector density exceeds explosive transmission thresholds.'}
          </p>

          {/* Quick Presets Bar */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
              {isBengali ? 'দ্রুত ফিল্ড প্রিসেট নির্বাচন:' : 'Quick Sampling Presets:'}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => applyPreset(100, 240, 32, 22)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '14px',
                  border: '1px solid #fee2e2',
                  background: '#fef2f2',
                  color: '#dc2626',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isBengali ? 'নির্মাণাধীন এলাকা (BI > 30)' : 'Construction Pit Area (High Risk)'}
              </button>
              <button
                type="button"
                onClick={() => applyPreset(80, 160, 12, 8)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '14px',
                  border: '1px solid #fef3c7',
                  background: '#fffbeb',
                  color: '#b45309',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isBengali ? 'ছাত্রাবাস ও বাজার মোড়' : 'Hostel & Market Yard'}
              </button>
              <button
                type="button"
                onClick={() => applyPreset(120, 300, 4, 3)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '14px',
                  border: '1px solid #dcfce7',
                  background: '#f0fdf4',
                  color: '#166534',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isBengali ? 'নিয়মিত ক্যাম্পাস এলাকা (BI < 5)' : 'Inspected Campus (Controlled)'}
              </button>
            </div>
          </div>

          {/* Form Input Variables */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                {isBengali ? 'পরিদর্শনকৃত বাড়ি / স্থাপনা সংখ্যা' : 'Sampled Premises / Blocks'}
              </label>
              <input
                type="number"
                min="1"
                value={housesSampled}
                onChange={e => setHousesSampled(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                {isBengali ? 'পরীক্ষিত মোট পানির পাত্র' : 'Inspected Water Containers'}
              </label>
              <input
                type="number"
                min="1"
                value={containersChecked}
                onChange={e => setContainersChecked(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                {isBengali ? 'লার্ভা পাওয়া পাত্র সংখ্যা (Positive Containers)' : 'Larvae Positive Containers'}
              </label>
              <input
                type="number"
                min="0"
                value={positiveContainers}
                onChange={e => setPositiveContainers(Math.max(0, parseInt(e.target.value) || 0))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                {isBengali ? 'লার্ভাযুক্ত আক্রান্ত বাড়ি (Positive Premises)' : 'Breeding Positive Premises'}
              </label>
              <input
                type="number"
                min="0"
                value={positiveHouses}
                onChange={e => setPositiveHouses(Math.max(0, parseInt(e.target.value) || 0))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          {/* Core Calculated Indices Output Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>Breteau Index (BI)</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: riskColor, marginTop: '2px' }}>
                {breteauIndex}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>pos. containers / 100 houses</div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>House Index (HI)</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#1e293b', marginTop: '2px' }}>
                {houseIndex}%
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>% premises positive</div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>Container Index (CI)</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#1e293b', marginTop: '2px' }}>
                {containerIndex}%
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>% containers holding larvae</div>
            </div>
          </div>

          {/* Evaluator Verdict Card */}
          <div style={{
            background: riskBg,
            border: `1px solid ${riskColor}30`,
            borderRadius: '10px',
            padding: '14px',
            marginBottom: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: riskColor }}>
                Status: {riskLevel}
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: riskColor, color: '#fff' }}>
                BI {breteauIndex > 20 ? '> 20' : breteauIndex >= 5 ? '5 - 20' : '< 5'}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#334155', lineHeight: 1.45 }}>
              {guidance}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={handleExportSurvey}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                width: '100%',
                padding: '11px'
              }}
            >
              <Download size={15} />
              {isBengali ? 'জরিপ রিপোর্ট এক্সপোর্ট (CSV)' : 'Export Field Survey Audit (CSV)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}