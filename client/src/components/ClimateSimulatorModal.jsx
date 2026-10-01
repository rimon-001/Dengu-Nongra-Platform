import React, { useState } from 'react';
import { X, CloudRain, Thermometer, Droplets, AlertTriangle, ShieldCheck, Play, RotateCcw, Sparkles } from 'lucide-react';

export default function ClimateSimulatorModal({ isOpen, onClose, isBengali = false }) {
  if (!isOpen) return null;

  // Meteorological sliders for Ashulia post-monsoon climate
  const [temperature, setTemperature] = useState(31); // °C
  const [humidity, setHumidity] = useState(84);       // %
  const [rainfall, setRainfall] = useState(25);       // mm (24h accumulation)

  // Reset to current October baseline
  const resetToBaseline = () => {
    setTemperature(31);
    setHumidity(84);
    setRainfall(18);
  };

  // Entomological Model calculations
  // Optimal Aedes development occurs between 28°C and 32°C with humidity > 70%
  const calculateLarvalCycle = () => {
    let days = 9.5;

    if (temperature >= 30) days -= 2.2;
    else if (temperature >= 27) days -= 1.0;
    else if (temperature < 22) days += 3.5;

    if (humidity >= 80) days -= 1.3;
    else if (humidity < 60) days += 2.0;

    const hatchDurationDays = Math.max(4.5, Math.min(14, days)).toFixed(1);

    // Outbreak surge probability
    let riskScore = 40;
    if (rainfall > 20) riskScore += 30;
    else if (rainfall > 5) riskScore += 15;

    if (temperature >= 28 && temperature <= 33) riskScore += 20;
    if (humidity >= 75) riskScore += 15;

    const outbreakProbability = Math.min(98, riskScore);

    return {
      incubationDays: hatchDurationDays,
      probability: outbreakProbability,
      peakOutbreakWindow: Math.round(Number(hatchDurationDays) + 4)
    };
  };

  const metrics = calculateLarvalCycle();

  const isHighAlert = metrics.probability >= 75;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: isHighAlert ? '#fef2f2' : '#eff6ff',
                color: isHighAlert ? '#dc2626' : '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CloudRain size={20} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                  {isBengali ? 'জলবায়ু ও বৃষ্টিপাত লার্ভা প্রজনন সিমুলেটর' : 'Climate & Rainfall Larval Hatch Simulator'}
                </h2>
                <span style={{ fontSize: '0.72rem', color: isHighAlert ? '#dc2626' : '#2563eb', fontWeight: 700, textTransform: 'uppercase' }}>
                  {isBengali ? 'মাইক্রো-ক্লাইমেট পূর্বাভাস ইঞ্জিন' : 'Micro-Climatic Vector Proliferation Model'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={resetToBaseline}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '6px',
                background: '#f1f5f9',
                color: '#475569',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={12} /> {isBengali ? 'বর্তমান আবহাওয়া' : 'Baseline'}
            </button>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
            {isBengali
              ? 'তাপমাত্রা, আর্দ্রতা ও বর্ষণের তারতম্য পরিবর্তন করে এডিস মশার ডিম থেকে পূর্ণাঙ্গ মশা হওয়ার সময়সীমা এবং প্রাদুর্ভাবের সম্ভাবনা তাৎক্ষণিকভাবে পরীক্ষা করুন।'
              : 'Interactive meteorological sensitivity tool calculating larval instar acceleration and outbreak risk across Ashulia under shifting weather variables.'}
          </p>

          {/* Meteorological Sliders */}
          <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
            {/* 1. Temperature */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Thermometer size={15} color="#dc2626" />
                  {isBengali ? 'গড় তাপমাত্রা (°C)' : 'Ambient Temperature (°C)'}
                </span>
                <span style={{ color: '#dc2626', fontWeight: 800 }}>{temperature}°C</span>
              </div>
              <input
                type="range"
                min="18"
                max="38"
                value={temperature}
                onChange={e => setTemperature(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#dc2626', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94a3b8' }}>
                <span>18°C (Cold/Slow)</span>
                <span>28°C–32°C (Aedes Optimum)</span>
                <span>38°C (Lethal)</span>
              </div>
            </div>

            {/* 2. Relative Humidity */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Droplets size={15} color="#0284c7" />
                  {isBengali ? 'আপেক্ষিক আর্দ্রতা (%)' : 'Relative Humidity (%)'}
                </span>
                <span style={{ color: '#0284c7', fontWeight: 800 }}>{humidity}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="98"
                value={humidity}
                onChange={e => setHumidity(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#0284c7', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94a3b8' }}>
                <span>40% (Dry/Desiccation)</span>
                <span>70% (Average)</span>
                <span>98% (High Adult Longevity)</span>
              </div>
            </div>

            {/* 3. Precipitation Accumulation */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CloudRain size={15} color="#2563eb" />
                  {isBengali ? '২৪ ঘণ্টার বৃষ্টিপাত (mm)' : '24-Hour Rainfall Accumulation (mm)'}
                </span>
                <span style={{ color: '#2563eb', fontWeight: 800 }}>{rainfall} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={rainfall}
                onChange={e => setRainfall(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94a3b8' }}>
                <span>0 mm (Dry Spells)</span>
                <span>15 mm (Puddles Form)</span>
                <span>60 mm (Flash Waterlogging)</span>
              </div>
            </div>
          </div>

          {/* Simulated Entomological Outputs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
            <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>
                {isBengali ? 'ডিম থেকে পিউপা' : 'Larval Incubation'}
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#dc2626', marginTop: '2px' }}>
                {metrics.incubationDays} <span style={{ fontSize: '0.8rem' }}>days</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>
                {metrics.incubationDays < 6 ? '⚡ Accelerated Hatch' : 'Normal Hatch Speed'}
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>
                {isBengali ? 'প্রাদুর্ভাবের সম্ভাবনা' : 'Outbreak Probability'}
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: isHighAlert ? '#dc2626' : '#16a34a', marginTop: '2px' }}>
                {metrics.probability}%
              </div>
              <div style={{ fontSize: '0.68rem', color: isHighAlert ? '#dc2626' : '#16a34a', marginTop: '2px' }}>
                {isHighAlert ? 'High Vector Density' : 'Manageable Risk'}
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>
                {isBengali ? 'পিক কামড়ানোর সময়' : 'Expected Adult Peak'}
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#1e293b', marginTop: '2px' }}>
                +{metrics.peakOutbreakWindow} <span style={{ fontSize: '0.8rem' }}>days</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>
                Post-rainfall window
              </div>
            </div>
          </div>

          {/* Preventive Protocol Recommendation */}
          <div style={{
            background: isHighAlert ? '#fef2f2' : '#f0fdf4',
            border: `1px solid ${isHighAlert ? '#fee2e2' : '#bbf7d0'}`,
            borderRadius: '10px',
            padding: '12px 14px',
            fontSize: '0.76rem',
            color: isHighAlert ? '#991b1b' : '#166534',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {isHighAlert ? <AlertTriangle size={18} flexShrink={0} /> : <ShieldCheck size={18} flexShrink={0} />}
            <span>
              {isHighAlert
                ? (isBengali
                  ? 'উচ্চ তাপমাত্রা ও বৃষ্টিপাতের সংমিশ্রণে এডিস লার্ভার বৃদ্ধি অস্বাভাবিক দ্রুত হচ্ছে। আগামী ৪৮ ঘণ্টার মধ্যে ক্যাম্পাস ও ছাদে জৈব লার্ভিসাইড প্রয়োগ বাধ্যতামূলক।'
                  : 'Critical Vector Window: Elevated temperature and standing rain accelerate larval development. Initiate biological Bti larviciding and roof drainage within 48 hours to avert an adult mosquito wave.')
                : (isBengali
                  ? 'বর্তমান আবহাওয়া স্থিতিশীল। রুটিনমাফিক ৩ দিনের পানি নিষ্কাশন কার্যক্রম বজায় রাখুন।'
                  : 'Favorable condition: Normal larval incubation pace. Maintain standard 3-day water evacuation cycles.')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}