import React, { useState } from 'react';

export default function ReportForm({ onReportAdded }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  const captureLocation = () => {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => alert('Unable to retrieve location: ' + err.message),
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !coords) return alert('Take a photo and grab your GPS coordinates first.');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('latitude', coords.lat);
    formData.append('longitude', coords.lng);
    formData.append('description', description);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setImage(null);
        setDescription('');
        setCoords(null);
        onReportAdded();
        alert('Breeding hazard reported successfully!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '16px', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Report Stagnant Water</h3>
      <input type="file" accept="image/*" capture="environment" onChange={(e) => setImage(e.target.files[0])} required />

      <div style={{ marginTop: '10px' }}>
        <button type="button" onClick={captureLocation} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          {coords ? `GPS Locked (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})` : 'Pin My Exact Location'}
        </button>
      </div>

      <input 
        type="text" 
        placeholder="Description (e.g. Broken pot on rooftop)" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        style={{ width: '100%', marginTop: '10px', padding: '8px', boxSizing: 'border-box' }}
      />

      <button type="submit" disabled={loading} style={{ marginTop: '10px', width: '100%', padding: '10px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        {loading ? 'Submitting...' : 'Upload Hotspot'}
      </button>
    </form>
  );
}