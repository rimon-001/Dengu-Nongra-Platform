import React from 'react';
import { 
  AlertTriangle, CloudRain, Droplets, Thermometer, 
  PhoneCall, ShieldAlert, ArrowRight, Activity 
} from 'lucide-react';

export default function WeatherAdvisory({ 
  activeCount = 0, 
  onOpenHelpline, 
  isBengali = false 
}) {
  // Simulated October Post-Monsoon Dhaka/Ashulia Microclimate
  const temperature = 31;
  const humidity = 84;
  const rainfallMm = 12;

  // Dengue pupation acceleration indicator based on humidity & standing water
  const isHighRisk = humidity >= 75 || activeCount > 5;

  return (
    <div style={{
      background: '#fff1f2',
      border: '1px solid #fecdd3',
      borderRadius: '14px',
      padding: '12px 18px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      boxShadow: '0 2px 6px rgba(225, 29, 72, 0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: '#ffe4e6',
          color: '#e11d48',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <AlertTriangle size={18} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <strong style={{ fontSize: '0.86rem', color: '#9f1239' }}>
              {isBengali ? 'উচ্চ ভেক্টর প্রজনন সতর্কতা' : 'High Vector Breeding Alert'}
            </strong>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '12px',
              background: '#e11d48',
              color: '#ffffff',
              textTransform: 'uppercase'
            }}>
              Breteau Index: Elevated (BI &gt; 35)
            </span>
          </div>

          <p style={{ margin: '2px 0 0', fontSize: '0.76rem', color: '#881337', lineHeight: 1.4 }}>
            {isBengali
              ? `উচ্চ আর্দ্রতা (${humidity}%) ও সাম্প্রতিক বৃষ্টিপাত এডিস মশার ডিম ফুটে লার্ভা হওয়ার সময়কাল সংক্ষিপ্ত করে। ছাদের ড্রেন ও পাত্র পরীক্ষা করুন।`
              : `High humidity (${humidity}%) and standing rain accelerate Aedes mosquito hatching in stagnant puddles. Inspect open drums and rooftop drains today.`}
          </p>
        </div>
      </div>

      {/* Climate Telemetry Numbers & Referral Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.74rem', color: '#be123c', fontWeight: 700 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Thermometer size={14} /> {temperature}°C
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Droplets size={14} /> {humidity}%
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenHelpline}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '8px',
            background: '#ffffff',
            border: '1px solid #fecdd3',
            color: '#be123c',
            fontSize: '0.74rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#ffe4e6'}
          onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
        >
          <PhoneCall size={12} />
          {isBengali ? 'ক্লিনিক্যাল হেল্পলাইন' : 'Clinical Depot'}
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}