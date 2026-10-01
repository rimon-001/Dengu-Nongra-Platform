import React from 'react';
import { Sparkles, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AiInspectorBadge({ description = '', isBengali = false }) {
  const desc = description.toLowerCase();

  // Heuristic AI detection simulated based on environmental keywords
  let hazardType = 'Moderate Breeding Risk';
  let hazardTypeBn = 'মাঝারি মাত্রার প্রজনন ঝুঁকি';
  let confidence = 88;
  let vector = 'Aedes aegypti';
  let badgeColor = '#f59e0b';
  let bgColor = '#fffbeb';
  let borderColor = '#fef3c7';

  if (desc.includes('tire') || desc.includes('plastic') || desc.includes('tank') || desc.includes('rooftop')) {
    hazardType = 'Critical Aedes Hotspot';
    hazardTypeBn = 'মারাত্মক এডিস মশার প্রজনন ক্ষেত্র';
    confidence = 94;
    vector = 'Aedes aegypti (Dengue/Chikungunya)';
    badgeColor = '#dc2626';
    bgColor = '#fef2f2';
    borderColor = '#fee2e2';
  } else if (desc.includes('drain') || desc.includes('sewer') || desc.includes('sludge')) {
    hazardType = 'Organic Waste Drainage';
    hazardTypeBn = 'পয়ঃনিষ্কাশন ও জৈব বর্জ্য ঝুঁকি';
    confidence = 91;
    vector = 'Culex quinquefasciatus';
    badgeColor = '#d97706';
    bgColor = '#fffbeb';
    borderColor = '#fde68a';
  }

  return (
    <div style={{
      background: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '10px',
      padding: '10px 14px',
      marginBottom: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={16} color={badgeColor} />
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: badgeColor }}>
            {isBengali ? hazardTypeBn : hazardType}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
            {isBengali ? 'সম্ভাব্য ভেক্টর:' : 'Predicted Vector:'} {vector}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
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
      </div>
    </div>
  );
}