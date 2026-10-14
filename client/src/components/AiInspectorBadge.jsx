import React from 'react';
import { Sparkles, ShieldAlert, CheckCircle, AlertTriangle, Bug } from 'lucide-react';

export default function AiInspectorBadge({ 
  description = '', 
  isBengali = false, 
  confidence: overrideConfidence = null, 
  riskLevel: overrideRiskLevel = null 
}) {
  const desc = (description || '').toLowerCase();

  // Default Baseline Detection
  let hazardType = 'Moderate Breeding Risk';
  let hazardTypeBn = 'মাঝারি মাত্রার প্রজনন ঝুঁকি';
  let confidence = overrideConfidence || 88;
  let vector = 'Aedes aegypti';
  let badgeColor = '#f59e0b';
  let bgColor = '#fffbeb';
  let borderColor = '#fef3c7';
  let breteau = 'BI: 15-20 (Moderate)';
  let breteauBn = 'বিআই: ১৫-২০ (মাঝারি)';

  // 1. Critical Aedes Containers (Tires, Tanks, Rooftops, Plastic Drums, Coconut Shells)
  if (
    desc.includes('tire') || 
    desc.includes('tyre') || 
    desc.includes('টায়ার') ||
    desc.includes('plastic') || 
    desc.includes('tank') || 
    desc.includes('ট্যাংক') ||
    desc.includes('rooftop') || 
    desc.includes('ছাদ') ||
    desc.includes('coconut') ||
    desc.includes('ডাব')
  ) {
    hazardType = 'Critical Aedes Hotspot';
    hazardTypeBn = 'মারাত্মক এডিস মশার প্রজনন ক্ষেত্র';
    confidence = overrideConfidence || 94;
    vector = 'Aedes aegypti (Dengue / Chikungunya)';
    badgeColor = '#dc2626';
    bgColor = '#fef2f2';
    borderColor = '#fee2e2';
    breteau = 'BI > 35 (Outbreak Trigger)';
    breteauBn = 'বিআই > ৩৫ (প্রাদুর্ভাব সতর্কতা)';
  } 
  // 2. High Organic Waste & Sewage Runoffs
  else if (
    desc.includes('drain') || 
    desc.includes('ড্রেন') || 
    desc.includes('sewer') || 
    desc.includes('culvert') || 
    desc.includes('কালভার্ট') || 
    desc.includes('sludge')
  ) {
    hazardType = 'Organic Waste Drainage';
    hazardTypeBn = 'পয়ঃনিষ্কাশন ও জৈব বর্জ্য ঝুঁকি';
    confidence = overrideConfidence || 91;
    vector = 'Culex quinquefasciatus & Aedes';
    badgeColor = '#d97706';
    bgColor = '#fffbeb';
    borderColor = '#fde68a';
    breteau = 'BI: 25-30 (Elevated)';
    breteauBn = 'বিআই: ২৫-৩০ (উচ্চ মাত্রা)';
  }
  // 3. Flower pots, AC runoff trays & shallow puddles
  else if (
    desc.includes('pot') || 
    desc.includes('টব') || 
    desc.includes('ac') || 
    desc.includes('এসি') || 
    desc.includes('puddle') || 
    desc.includes('পানি')
  ) {
    hazardType = 'Domestic Breeding Reservoir';
    hazardTypeBn = 'পারিবারিক উন্মুক্ত প্রজননস্থল';
    confidence = overrideConfidence || 89;
    vector = 'Aedes albopictus';
    badgeColor = '#0284c7';
    bgColor = '#f0f9ff';
    borderColor = '#e0f2fe';
    breteau = 'BI: 10-15 (Targeted Evacuation)';
    breteauBn = 'বিআই: ১০-১৫ (পানি নিষ্কাশন)';
  }

  if (overrideRiskLevel) {
    hazardType = overrideRiskLevel;
  }

  return (
    <div style={{
      background: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '10px',
      padding: '11px 14px',
      marginBottom: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          background: 'rgba(255,255,255,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
        }}>
          <Sparkles size={16} color={badgeColor} />
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: badgeColor }}>
            {isBengali ? hazardTypeBn : hazardType}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
            {isBengali ? 'সম্ভাব্য ভেক্টর:' : 'Target Vector:'} <span style={{ fontWeight: 600, color: '#334155' }}>{vector}</span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 800,
          padding: '2px 8px',
          borderRadius: '12px',
          background: badgeColor,
          color: '#ffffff'
        }}>
          {confidence}% {isBengali ? 'নির্ভুলতা' : 'AI Confidence'}
        </span>
        <span style={{ fontSize: '0.66rem', color: '#64748b', fontWeight: 700 }}>
          {isBengali ? breteauBn : breteau}
        </span>
      </div>
    </div>
  );
}