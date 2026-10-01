import React, { useState, useEffect } from 'react';
import { X, Radar, Volume2, VolumeX, AlertTriangle, ShieldCheck, Navigation2, Compass } from 'lucide-react';

export default function ProximityRadarModal({ isOpen, onClose, reports = [], isBengali = false }) {
  if (!isOpen) return null;

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userSimLat, setUserSimLat] = useState(23.8765);
  const [userSimLng, setUserSimLng] = useState(23.8765 ? 90.3204 : 90.3204);
  const [nearestSite, setNearestSite] = useState(null);
  const [nearestDistance, setNearestDistance] = useState(0);

  // Haversine distance calculator in meters
  const computeDistanceMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  };

  // Find nearest active hazard
  useEffect(() => {
    const activeHazards = reports.filter(r => r.status !== 'resolved');
    if (activeHazards.length === 0) return;

    let minDistance = Infinity;
    let closest = null;

    activeHazards.forEach(report => {
      const d = computeDistanceMeters(userSimLat, userSimLng, report.latitude, report.longitude);
      if (d < minDistance) {
        minDistance = d;
        closest = report;
      }
    });

    setNearestSite(closest);
    setNearestDistance(minDistance);
  }, [userSimLat, userSimLng, reports]);

  // Web Audio API synthesized sonar ping
  const triggerSonarBeep = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(nearestDistance < 120 ? 880 : 540, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio synthesis context blocked:', e);
    }
  };

  const handleSimWalkCloser = () => {
    if (!nearestSite) return;
    // Step 20 meters closer towards the nearest site
    setUserSimLat(prev => prev + (nearestSite.latitude - prev) * 0.3);
    setUserSimLng(prev => prev + (nearestSite.longitude - prev) * 0.3);

    if (soundEnabled) {
      triggerSonarBeep();
    }
  };

  const isCriticalZone = nearestDistance > 0 && nearestDistance <= 120;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: isCriticalZone ? '#fee2e2' : '#eff6ff',
                color: isCriticalZone ? '#dc2626' : '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Radar size={20} className="spin-anim" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                  {isBengali ? 'লাইভ প্রক্সিমিটি রেডার ও জিও-ফেন্স' : 'Field Proximity Radar & Geo-Fence'}
                </h2>
                <span style={{ fontSize: '0.72rem', color: isCriticalZone ? '#dc2626' : '#2563eb', fontWeight: 700, textTransform: 'uppercase' }}>
                  {isBengali ? 'স্বয়ংক্রিয় বিপদ সংকেত মনিটর' : 'Real-Time Vector Hazard Proximity'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              style={{
                background: soundEnabled ? '#dbeafe' : '#f1f5f9',
                color: soundEnabled ? '#1d4ed8' : '#64748b',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              {soundEnabled ? (isBengali ? 'সাউন্ড অন' : 'Sound ON') : (isBengali ? 'মিউট' : 'Muted')}
            </button>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
            {isBengali
              ? 'ক্যাম্পাস বা রাস্তায় চলার সময় আপনি কোনো এডিস মশার প্রজননস্থলের ১৫০ মিটারের মধ্যে প্রবেশ করলে স্বয়ংক্রিয়ভাবে অডিও বিপ সংকেত বেজে উঠবে।'
              : 'Emits localized ultrasonic audio alerts and dynamic threat indicators when field responders enter a 150m radius of active larval pools.'}
          </p>

          {/* Proximity Distance Dial */}
          <div style={{
            background: isCriticalZone ? '#fef2f2' : '#f0fdf4',
            border: `1px solid ${isCriticalZone ? '#fca5a5' : '#bbf7d0'}`,
            borderRadius: '16px',
            padding: '24px 18px',
            textAlign: 'center',
            marginBottom: '18px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: isCriticalZone ? '#b91c1c' : '#15803d', letterSpacing: '0.5px' }}>
              {isCriticalZone
                ? (isBengali ? 'সতর্কতা: উচ্চ ঝুঁকি অঞ্চলের নিকটে' : 'WARNING: ACTIVE VECTOR ZONE NEARBY')
                : (isBengali ? 'নিরাপদ দূরত্বে অবস্থান করছেন' : 'CLEAR: NO IMMEDIATE PERIL DETECTED')}
            </div>

            <div style={{ fontSize: '3rem', fontWeight: 900, color: isCriticalZone ? '#dc2626' : '#16a34a', margin: '4px 0' }}>
              {nearestDistance} <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>meters</span>
            </div>

            <div style={{ fontSize: '0.84rem', color: '#334155', fontWeight: 600 }}>
              {isBengali ? 'নিকটতম ঝুঁকি:' : 'Nearest Target:'} <strong>{nearestSite ? nearestSite.description : 'Scanning surroundings...'}</strong>
            </div>
          </div>

          {/* Action Simulation Controls */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={handleSimWalkCloser}
              className="btn-primary"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.82rem'
              }}
            >
              <Navigation2 size={16} />
              {isBengali ? 'হাঁটার সিমুলেশন (নিকটে যান)' : 'Simulate Walking Closer (-20m)'}
            </button>

            <button
              type="button"
              onClick={triggerSonarBeep}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: '#fff',
                color: 'var(--text-main)',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isBengali ? 'টেস্ট বিপ' : 'Ping Sonar'}
            </button>
          </div>

          <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', fontSize: '0.75rem', color: '#64748b' }}>
            <strong>Municipal GPS Geo-Fence Protocol:</strong> Autonomous device telemetry polls location coordinates at 10-second intervals to warn sanitation inspectors before stepping into infested standing drains.
          </div>
        </div>
      </div>
    </div>
  );
}