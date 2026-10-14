import React, { useState } from 'react';
import { 
  X, MapPin, Clock, ShieldCheck, CheckCircle2, Camera, 
  ExternalLink, Sparkles, Navigation, UserCheck, AlertTriangle 
} from 'lucide-react';

export default function TaskDetailModal({ 
  task, 
  isOpen, 
  onClose, 
  onClaim, 
  onResolve, 
  user, 
  isBengali = false 
}) {
  if (!isOpen || !task) return null;

  const [intervention, setIntervention] = useState('Biological Bti Larvicide Application');
  const [resolvedImageFile, setResolvedImageFile] = useState(null);
  const [resolvedImagePreview, setResolvedImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResolveForm, setShowResolveForm] = useState(false);

  const isVolunteer = user?.role === 'volunteer';
  const isClaimedByMe = task.claimed_by === user?.id || (task.claimed_squad && task.claimed_squad === user?.squad_name);
  const isResolved = task.status === 'resolved';
  const isClaimed = task.status === 'claimed';

  const mapsUrl = `https://www.google.com/maps?q=${task.latitude},${task.longitude}`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResolvedImageFile(file);
    setResolvedImagePreview(URL.createObjectURL(file));
  };

  const handleClaimClick = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('nongra_token');
      await fetch(`/api/volunteer/claim/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
    } catch (e) {
      // Local fallback
    } finally {
      setIsSubmitting(false);
      onClaim(task.id);
    }
  };

  const handleResolveSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('intervention', intervention);
    if (resolvedImageFile) {
      formData.append('resolved_image', resolvedImageFile);
    }

    try {
      const token = localStorage.getItem('nongra_token');
      await fetch(`/api/volunteer/resolve/${task.id}`, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData
      });
    } catch (e) {
      // Local fallback
    } finally {
      setIsSubmitting(false);
      onResolve(task.id, intervention);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px', maxHeight: '92vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase',
                background: isResolved ? '#dcfce7' : isClaimed ? '#fef3c7' : '#fee2e2',
                color: isResolved ? '#15803d' : isClaimed ? '#b45309' : '#dc2626'
              }}>
                {task.status.toUpperCase()}
              </span>
              <strong style={{ fontSize: '1rem', color: '#1e293b' }}>
                Case #{task.id}
              </strong>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.76rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textDecoration: 'none'
              }}
            >
              <Navigation size={13} /> {isBengali ? 'গুগল ম্যাপে দেখুন' : 'Navigate GPS'} <ExternalLink size={11} />
            </a>
          </div>

          <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
            {task.description}
          </h3>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.76rem', color: '#64748b', marginBottom: '18px', flexWrap: 'wrap' }}>
            <span>
              <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
              {Number(task.latitude).toFixed(4)}, {Number(task.longitude).toFixed(4)}
            </span>
            <span>
              <Clock size={12} style={{ display: 'inline', marginRight: '3px' }} />
              {task.created_at ? new Date(task.created_at).toLocaleString(isBengali ? 'bn-BD' : 'en-US') : 'Recent'}
            </span>
            {task.claimed_squad && (
              <span style={{ color: '#047857', fontWeight: 700 }}>
                <UserCheck size={12} style={{ display: 'inline', marginRight: '3px' }} />
                {task.claimed_squad}
              </span>
            )}
          </div>

          {/* Photographic Verification Grid (Before / After) */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
              {isBengali ? 'ফটোগ্রাফিক যাচাইকরণ প্রমাণ' : 'Photographic Verification Evidence'}
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: task.resolved_image_url || resolvedImagePreview ? '1fr 1fr' : '1fr', gap: '10px' }}>
              {/* Before Photo */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', background: '#f8fafc' }}>
                <div style={{ padding: '6px 10px', background: '#fee2e2', color: '#991b1b', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {isBengali ? 'রিপোর্টকালীন ছবি (BEFORE)' : 'Initial Hazard (Before)'}
                </div>
                <img
                  src={task.image_url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'}
                  alt="Initial Hazard"
                  style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                />
              </div>

              {/* After Photo (if resolved) */}
              {(task.resolved_image_url || resolvedImagePreview) && (
                <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', background: '#f8fafc' }}>
                  <div style={{ padding: '6px 10px', background: '#dcfce7', color: '#166534', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    {isBengali ? 'সমাধান পরবর্তী প্রমাণ (AFTER)' : 'Neutralized Proof (After)'}
                  </div>
                  <img
                    src={task.resolved_image_url || resolvedImagePreview}
                    alt="Resolved Proof"
                    style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Resolution / Claim Controller */}
          {isResolved ? (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <CheckCircle2 size={32} color="#16a34a" style={{ marginBottom: '4px' }} />
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#166534' }}>
                {isBengali ? 'এই স্থানটি সফলভাবে লার্ভামুক্ত ঘোষণা করা হয়েছে' : 'Site Verified & Cleared by Field Taskforce'}
              </strong>
              <div style={{ fontSize: '0.76rem', color: '#4b5563', marginTop: '2px' }}>
                Intervention Applied: <strong>{task.intervention || 'Physical Evacuation & Bti Spray'}</strong>
              </div>
            </div>
          ) : showResolveForm ? (
            /* Volunteer Resolution Form */
            <form onSubmit={handleResolveSubmit} style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>
                {isBengali ? 'স্থানটি সমাধান ও প্রত্যয়ন করুন' : 'Submit Eradication Sign-Off'}
              </h4>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, marginBottom: '4px' }}>
                  {isBengali ? 'প্রয়োগকৃত ব্যবস্থা' : 'Intervention Applied'}
                </label>
                <select
                  value={intervention}
                  onChange={e => setIntervention(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '0.82rem', background: '#fff' }}
                >
                  <option value="Biological Bti Larvicide Application">Biological Bti Larvicide Spray</option>
                  <option value="Physical Stagnant Water Evacuation">Physical Drainage & Container Inversion</option>
                  <option value="Temephos 1% SG Chemical Granules">Temephos 1% SG Granule Treatment</option>
                  <option value="Thermal Fogging Adulticide">Thermal Fogging (Adult Knockdown)</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, marginBottom: '4px' }}>
                  {isBengali ? 'ক্লিনআপ পরবর্তী প্রমাণ ছবি (Mandatory)' : 'Upload Cleanup Proof Photo'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  style={{ fontSize: '0.8rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ flex: 1, padding: '9px', fontSize: '0.82rem', background: '#059669' }}
                >
                  <ShieldCheck size={15} />
                  {isSubmitting ? 'প্রসেস হচ্ছে...' : (isBengali ? 'সমাধান নিশ্চিত করুন (+৫০ পয়েন্ট)' : 'Verify Clearance (+50 pts)')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowResolveForm(false)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: '#fff', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  {isBengali ? 'বাতিল' : 'Cancel'}
                </button>
              </div>
            </form>
          ) : (
            /* Squad Claim / Resolve Actions */
            <div style={{ display: 'flex', gap: '10px' }}>
              {!isClaimed ? (
                <button
                  type="button"
                  onClick={handleClaimClick}
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', fontSize: '0.84rem' }}
                >
                  <UserCheck size={16} />
                  {isBengali ? 'কাজের দায়িত্ব গ্রহণ করুন (Claim Task)' : 'Claim Field Task'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowResolveForm(true)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', fontSize: '0.84rem', background: '#059669' }}
                >
                  <Sparkles size={16} />
                  {isBengali ? 'পরিষ্কার সম্পন্ন ও প্রমাণ দিন' : 'Resolve & Upload After Proof'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}