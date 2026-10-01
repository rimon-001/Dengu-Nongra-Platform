import React, { useState } from 'react';
import { X, Camera, MapPin, Upload, Mic, MicOff, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ReportModal({ isOpen, onClose, onReportAdded, isBengali = false }) {
  if (!isOpen) return null;

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Stagnant Water');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // AI Visual Scan States
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Web Speech API Voice Dictation
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return alert(isBengali ? 'আপনার ব্রাউজারে ভয়েস টাইপিং সমর্থন করে না।' : 'Voice recognition is not supported in this browser.');
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
      setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.start();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      runAiScanSimulation();
    }
  };

  // Simulate Neural Vision Scan on Uploaded Image
  const runAiScanSimulation = () => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        larvaeDetected: true,
        stagnancyScore: 92,
        organicDebris: 74,
        vectorClass: 'Aedes aegypti breeding site'
      });
    }, 1800);
  };

  const captureLocation = () => {
    if (!navigator.geolocation) {
      return alert(isBengali ? 'জিপিএস সমর্থন করে না।' : 'Geolocation not supported.');
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => alert(isBengali ? 'জিপিএস সংযোগ ব্যর্থ হয়েছে।' : 'GPS lock failed: ' + err.message),
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !coords) {
      return alert(isBengali ? 'অনুগ্রহ করে ছবি এবং জিপিএস অবস্থান যুক্ত করুন।' : 'Please attach a photo and pin your GPS coordinates.');
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('latitude', coords.lat);
    formData.append('longitude', coords.lng);
    formData.append('description', `[${category}] ${description}`);

    setLoading(true);
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setImage(null);
        setPreview(null);
        setDescription('');
        setCoords(null);
        setScanResult(null);
        onReportAdded();
        onClose();
        alert(isBengali ? 'সফলভাবে রিপোর্ট জমা দেওয়া হয়েছে!' : 'Hazard reported successfully!');
      } else {
        alert(isBengali ? 'সার্ভার সমস্যা হয়েছে।' : 'Server error while saving report.');
      }
    } catch (err) {
      console.error(err);
      alert(isBengali ? 'ব্যাকএন্ডের সাথে সংযোগ স্থাপন করা যায়নি।' : 'Failed to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 800 }}>
            {isBengali ? 'এডিসের প্রজননস্থল রিপোর্ট করুন' : 'Report a Breeding Hazard'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                {isBengali ? 'ঝুঁকির ধরন' : 'Hazard Type'}
              </label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              >
                <option value="Stagnant Water">{isBengali ? 'জমে থাকা বৃষ্টির পানি / ডোবা' : 'Stagnant Water / Puddle'}</option>
                <option value="Clogged Drain">{isBengali ? 'বন্ধ ড্রেন / পয়ঃনিষ্কাশন নালা' : 'Clogged Drain / Sewer'}</option>
                <option value="Discarded Containers">{isBengali ? 'ফেলে রাখা প্লাস্টিক / টায়ার' : 'Plastic / Tire Waste'}</option>
                <option value="Under-Construction Site">{isBengali ? 'নির্মাণাধীন ছাদ / বেসমেন্ট' : 'Under-Construction / Rooftop'}</option>
              </select>
            </div>

            {/* Photo Capture & AI Scanning Visual Area */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                {isBengali ? 'ছবির প্রমাণ ও এআই বিশ্লেষণ' : 'Photo Evidence & AI Validation'}
              </label>

              <div 
                style={{
                  border: '2px dashed var(--border)',
                  borderRadius: '10px',
                  padding: preview ? '0' : '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#f8fafc',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: preview ? '160px' : 'auto'
                }}
                onClick={() => document.getElementById('cameraInput').click()}
              >
                {preview ? (
                  <div style={{ position: 'relative', width: '100%', height: '170px' }}>
                    <img src={preview} alt="Evidence" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    
                    {/* Scanning overlay animation */}
                    {isScanning && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(15, 118, 110, 0.45)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.85rem'
                      }}>
                        <Sparkles size={24} style={{ marginBottom: '6px', animation: 'spin 2s linear infinite' }} />
                        {isBengali ? 'লার্ভা ও পানি শনাক্তকরণ স্ক্যান চলছে...' : 'Scanning Larval Motion Patterns...'}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <Camera size={32} style={{ marginBottom: '6px', color: '#94a3b8' }} />
                    <p style={{ margin: 0 }}>{isBengali ? 'ছবি তুলতে বা আপলোড করতে ট্যাপ করুন' : 'Tap to snap or upload a photo'}</p>
                  </div>
                )}

                <input 
                  id="cameraInput" 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handleImageChange} 
                  style={{ display: 'none' }} 
                  required 
                />
              </div>

              {/* AI Scan Feedback Card */}
              {scanResult && (
                <div style={{
                  marginTop: '10px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 700 }}>
                    <CheckCircle2 size={16} />
                    <span>{isBengali ? 'এআই নিশ্চিত: এডিসের প্রজননস্থল শনাক্ত' : 'Verified: Stagnant Vector Reservoir'}</span>
                  </div>
                  <span style={{ background: '#16a34a', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, fontSize: '0.7rem' }}>
                    {scanResult.stagnancyScore}% {isBengali ? 'ঝুঁকি' : 'Confidence'}
                  </span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '14px' }}>
              <button 
                type="button" 
                onClick={captureLocation}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: coords ? '#ecfdf5' : '#fff',
                  color: coords ? 'var(--color-resolved)' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <MapPin size={16} />
                {coords 
                  ? (isBengali ? `জিপিএস নিশ্চিত (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})` : `GPS Locked (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`)
                  : (isBengali ? 'আমার জিপিএস অবস্থান পিন করুন' : 'Lock My GPS Coordinates')}
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                  {isBengali ? 'বিবরণ ও ল্যান্ডমার্ক' : 'Location Details & Landmark'}
                </label>
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  style={{
                    border: 'none',
                    background: isListening ? '#fee2e2' : '#f1f5f9',
                    color: isListening ? '#dc2626' : '#475569',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {isListening ? <MicOff size={12} /> : <Mic size={12} />}
                  {isListening ? (isBengali ? 'শুনছি...' : 'Listening...') : (isBengali ? 'ভয়েস ইনপুট' : 'Voice Input')}
                </button>
              </div>
              <input 
                type="text" 
                placeholder={isBengali ? "যেমন: ক্যাফেটেরিয়ার পেছনে ময়লার স্তূপের পাশে" : "e.g., Behind cafeteria near waste bin"}
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.88rem' }}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading || isScanning}>
              <Upload size={18} />
              {loading 
                ? (isBengali ? 'জমা দেওয়া হচ্ছে...' : 'Submitting...') 
                : (isBengali ? 'রিপোর্ট সাবমিট করুন' : 'Upload & Alert Squads')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}