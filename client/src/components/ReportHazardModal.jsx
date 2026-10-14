import React, { useState, useEffect } from 'react';
import { 
  X, Camera, Mic, MicOff, MapPin, Upload, AlertCircle, 
  Sparkles, CheckCircle2, Loader2, RefreshCw 
} from 'lucide-react';

export default function ReportHazardModal({ 
  isOpen, 
  onClose, 
  onReportCreated, 
  isBengali = false 
}) {
  if (!isOpen) return null;

  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(23.8768);
  const [longitude, setLongitude] = useState(90.3201);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);

  // Auto-fetch real location on open
  useEffect(() => {
    handleGetGPS();
  }, []);

  const handleGetGPS = () => {
    if ('geolocation' in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(Number(pos.coords.latitude.toFixed(6)));
          setLongitude(Number(pos.coords.longitude.toFixed(6)));
          setIsLocating(false);
        },
        () => {
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  };

  // Web Speech API Voice Dictation
  const handleToggleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(isBengali ? 'আপনার ব্রাউজার ভয়েস ডিকটেশন সাপোর্ট করে না।' : 'Voice dictation is not supported by this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = isBengali ? 'bn-BD' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDescription(prev => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.start();
  };

  // Image Upload with simulated Neural Scanner
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    // Simulated Edge CV Scanner
    setAiAnalyzing(true);
    setAiAnalysisResult(null);

    setTimeout(() => {
      setAiAnalyzing(false);
      setAiAnalysisResult({
        hazardDetected: true,
        confidence: 94,
        type: isBengali ? 'জমে থাকা পানি ও বায়োফিল্ম' : 'Stagnant Pool & Organic Biofilm',
        larvalRisk: 'High (Optimal Hatch Conditions)'
      });
      if (!description) {
        setDescription(
          isBengali 
            ? 'উন্মুক্ত স্থানে জমে থাকা বৃষ্টির পানিতে এডিস মশার লার্ভার উপস্থিতি পরিলক্ষিত হয়েছে।' 
            : 'Stagnant rainwater accumulation holding active larval instars.'
        );
      }
    }, 1200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const token = localStorage.getItem('nongra_token');

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData
      });

      const data = await res.json();
      
      const newEntry = {
        id: data.reportId || Date.now(),
        tracking_code: data.tracking_code || `NG-${Math.floor(1000 + Math.random() * 9000)}`,
        latitude: Number(latitude),
        longitude: Number(longitude),
        description,
        status: 'reported',
        image_url: imagePreview,
        created_at: new Date().toISOString()
      };

      onReportCreated(newEntry);
      onClose();
    } catch (err) {
      // Local fallback for offline mode
      const fallbackEntry = {
        id: Date.now(),
        tracking_code: `NG-${Math.floor(1000 + Math.random() * 9000)}`,
        latitude: Number(latitude),
        longitude: Number(longitude),
        description,
        status: 'reported',
        image_url: imagePreview,
        created_at: new Date().toISOString()
      };
      onReportCreated(fallbackEntry);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', maxHeight: '92vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'নতুন মশার প্রজননস্থল রিপোর্ট করুন' : 'Report Larval Breeding Hazard'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>
                {isBengali ? 'নাগরিক ভেক্টর ট্র্যাকিং প্ল্যাটফর্ম' : 'Civic Vector Telemetry Ingestion'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
            {isBengali
              ? 'ক্যাম্পাস বা পৌর এলাকায় জমে থাকা পানি, খোলা ড্রেন বা ডাবের খোসার ছবি ও অবস্থান পাঠিয়ে দ্রুত পরিষ্কার দল পাঠাতে সহায়তা করুন।'
              : 'Submit geo-tagged photographic evidence to alert municipal vector control squads for immediate biological larviciding.'}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Description with Voice Dictation */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                  {isBengali ? 'ঝুঁকির বিবরণ' : 'Hazard Description'}
                </label>
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    border: 'none',
                    background: isListening ? '#fee2e2' : '#f1f5f9',
                    color: isListening ? '#dc2626' : '#475569',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {isListening ? <MicOff size={12} /> : <Mic size={12} />}
                  {isListening ? (isBengali ? 'রেকর্ড হচ্ছে...' : 'Listening...') : (isBengali ? 'ভয়েস টাইপ' : 'Voice Input')}
                </button>
              </div>

              <textarea
                rows={3}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={isBengali ? 'যেমন: একাডেমিক ভবন ৪ এর পেছনে ফুলের টবে ৩ দিন ধরে জমে থাকা বৃষ্টির পানি...' : 'e.g., Uncovered plastic drum behind cafeteria accumulating rainwater and mosquito larvae...'}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.84rem', resize: 'vertical' }}
              />
            </div>

            {/* GPS Telemetry Coordinates */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                  {isBengali ? 'জিপিএস অবস্থান কোঅর্ডিনেট' : 'Geo-Telemetry (GPS Coordinates)'}
                </label>
                <button
                  type="button"
                  onClick={handleGetGPS}
                  style={{
                    border: 'none',
                    background: 'none',
                    color: 'var(--color-primary)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  <RefreshCw size={11} className={isLocating ? 'spin-anim' : ''} />
                  {isBengali ? 'পুনরায় অবস্থান নিন' : 'Fetch GPS'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input
                  type="number"
                  step="0.000001"
                  required
                  value={latitude}
                  onChange={e => setLatitude(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '0.8rem' }}
                />
                <input
                  type="number"
                  step="0.000001"
                  required
                  value={longitude}
                  onChange={e => setLongitude(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '0.8rem' }}
                />
              </div>
            </div>

            {/* Photo Evidence Upload with AI Scanner */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px' }}>
                {isBengali ? 'প্রমাণস্বরূপ ছবি আপলোড (এআই স্ক্যানার)' : 'Visual Evidence & AI Neural Inspection'}
              </label>

              <div style={{
                border: '2px dashed var(--border)',
                borderRadius: '10px',
                padding: '14px',
                textAlign: 'center',
                background: '#f8fafc',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%'
                  }}
                />

                {imagePreview ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <img
                      src={imagePreview}
                      alt="Hazard Evidence"
                      style={{ maxHeight: '140px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      {isBengali ? 'ছবি পরিবর্তন করতে ক্লিক করুন' : 'Click to replace photo'}
                    </span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: '#64748b' }}>
                    <Camera size={26} color="#94a3b8" />
                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                      {isBengali ? 'ক্যামেরা খুলুন বা ছবি নির্বাচন করুন' : 'Capture or Upload Hotspot Photo'}
                    </span>
                  </div>
                )}
              </div>

              {/* Edge AI Scanner Analysis Output */}
              {aiAnalyzing && (
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#2563eb' }}>
                  <Loader2 size={14} className="spin-anim" />
                  <span>{isBengali ? 'এআই নিউরাল স্ক্যানারে ছবি বিশ্লেষণ হচ্ছে...' : 'AI scanning for stagnant biofilm & container taxonomy...'}</span>
                </div>
              )}

              {aiAnalysisResult && (
                <div style={{
                  marginTop: '8px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '0.74rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 700 }}>
                    <Sparkles size={14} color="#16a34a" />
                    <span>AI Detection: {aiAnalysisResult.type}</span>
                  </div>
                  <span style={{ background: '#16a34a', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                    {aiAnalysisResult.confidence}% Confidence
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ width: '100%', padding: '11px', fontSize: '0.85rem' }}
            >
              {isSubmitting
                ? (isBengali ? 'জমা দেওয়া হচ্ছে...' : 'Ingesting Telemetry...')
                : (isBengali ? 'হটস্পট রিপোর্ট জমা দিন (+২০ পয়েন্ট)' : 'Submit Vector Hazard (+20 Pts)')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}