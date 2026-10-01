import React, { useState } from 'react';
import { X, Camera, MapPin, Clock, ShieldCheck, CheckCircle2, FlaskConical } from 'lucide-react';
import AiInspectorBadge from './AiInspectorBadge';

export default function TaskModal({ task, onClose, onClaim, onResolve, isBengali = false }) {
  if (!task) return null;

  const [proofImage, setProofImage] = useState(null);
  const [previewProof, setPreviewProof] = useState(null);
  const [intervention, setIntervention] = useState('Physical Water Evacuation');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusColor = () => {
    if (task.status === 'resolved') return 'var(--color-resolved)';
    if (task.status === 'claimed') return 'var(--color-progress)';
    return 'var(--color-reported)';
  };

  const getStatusText = () => {
    if (task.status === 'resolved') return isBengali ? 'সমাধানকৃত' : 'Resolved';
    if (task.status === 'claimed') return isBengali ? 'চলমান' : 'In Progress';
    return isBengali ? 'রিপোর্টকৃত' : 'Reported';
  };

  const handleProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofImage(file);
      setPreviewProof(URL.createObjectURL(file));
    }
  };

  const submitResolution = async () => {
    if (!proofImage) {
      return alert(isBengali ? 'অনুগ্রহ করে পরিষ্কার করার প্রমাণ ছবি আপলোড করুন।' : 'Please snap or select an "After Cleanup" proof photo.');
    }

    setIsSubmitting(true);
    await onResolve(task.id, proofImage, intervention);
    setIsSubmitting(false);
    setProofImage(null);
    setPreviewProof(null);
  };

  const formattedDate = new Date(task.created_at).toLocaleDateString(isBengali ? 'bn-BD' : 'en-US', { hour: 'numeric', minute: 'numeric' });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        {/* Side-by-Side Images if Resolved */}
        {task.status === 'resolved' && task.resolved_image_url ? (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '180px', gap: '2px', background: '#e2e8f0' }}>
              <div style={{ position: 'relative', height: '100%' }}>
                <img src={task.image_url} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>BEFORE</span>
              </div>
              <div style={{ position: 'relative', height: '100%' }}>
                <img src={task.resolved_image_url} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(16, 185, 129, 0.9)', color: '#fff', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>AFTER</span>
              </div>
            </div>
            <div className="modal-status-pill" style={{ position: 'relative', bottom: '12px', margin: '0 24px' }}>
              <div className="legend-dot" style={{ background: getStatusColor() }}></div>
              {getStatusText()}
            </div>
          </div>
        ) : (
          <div 
            className="modal-image-area" 
            style={task.image_url ? { backgroundImage: `url(${task.image_url})` } : {}}
          >
            {!task.image_url && <Camera size={48} strokeWidth={1} />}
            <div className="modal-status-pill">
              <div className="legend-dot" style={{ background: getStatusColor() }}></div>
              {getStatusText()}
            </div>
          </div>
        )}

        <div className="modal-body">
          <h2 className="modal-title">{task.description || 'Breeding Hazard'}</h2>
          
          <div className="modal-meta">
            <span><MapPin size={14} /> Location ID: #{task.id}</span>
            <span><Clock size={14} /> {formattedDate}</span>
          </div>

          {/* Automated AI Visual Triage Analysis */}
          <AiInspectorBadge description={task.description} isBengali={isBengali} />

          <div className="modal-desc">
            {task.description || "Hazard reported by community member."}
          </div>

          {/* Larvicide Intervention Tag if Resolved */}
          {task.intervention && (
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '8px',
              padding: '10px 14px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              color: '#065f46',
              fontWeight: 600
            }}>
              <FlaskConical size={16} color="#059669" />
              {isBengali ? 'প্রয়োগকৃত পদ্ধতি:' : 'Applied Method:'} {task.intervention}
            </div>
          )}

          {/* Action Chain Timeline */}
          <div className="action-chain">
            <div className="chain-step">
              <div className="chain-line"></div>
              <div className="chain-dot active-red"></div>
              <div className="chain-content">
                <h4>{isBengali ? 'ঝুঁকি চিহ্নিত' : 'Hazard Mapped'}</h4>
                <p>{isBengali ? 'নাগরিক ডাটাবেসে অন্তর্ভুক্ত' : 'Logged in civic geo-registry'} • {formattedDate}</p>
              </div>
            </div>

            <div className="chain-step">
              <div className="chain-line"></div>
              <div className={`chain-dot ${task.status !== 'reported' ? 'active-orange' : ''}`}></div>
              <div className="chain-content">
                <h4>{isBengali ? 'স্বেচ্ছাসেবক দল নিযুক্ত' : 'Volunteer Assigned'}</h4>
                <p>{task.status !== 'reported' ? (isBengali ? 'স্থানীয় দল দায়িত্ব নিয়েছে' : 'Claimed by Local Squad') : (isBengali ? 'অপেক্ষমাণ' : 'Waiting for responder')}</p>
              </div>
            </div>

            <div className="chain-step">
              <div className={`chain-dot ${task.status === 'resolved' ? 'active-green' : ''}`}></div>
              <div className="chain-content">
                <h4>{isBengali ? 'লার্ভিসাইড ও যাচাইকরণ' : 'Intervention & Verification'}</h4>
                <p>{task.status === 'resolved' ? (isBengali ? 'পরিষ্কার সম্পন্ন ও যাচাইকৃত (+৫০ পয়েন্ট)' : 'Larvicide/Drainage verified (+50 pts)') : (isBengali ? 'যাচাইয়ের অপেক্ষায়' : 'Pending verification')}</p>
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          {task.status === 'reported' && (
            <button className="btn-primary" onClick={() => onClaim(task.id)}>
              <ShieldCheck size={18} /> {isBengali ? 'এই কাজটির দায়িত্ব নিন' : 'Claim This Task (Volunteer)'}
            </button>
          )}

          {task.status === 'claimed' && (
            <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                {isBengali ? 'পৌরসভা / স্বেচ্ছাসেবক প্রয়োগ পদ্ধতি' : 'Intervention Method'}
              </label>
              <select
                value={intervention}
                onChange={(e) => setIntervention(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  fontSize: '0.85rem',
                  marginBottom: '14px',
                  background: '#fff'
                }}
              >
                <option value="Physical Water Evacuation">{isBengali ? 'পানি নিষ্কাশন বা পাত্র উল্টানো' : 'Physical Water Evacuation (Overturned / Drained)'}</option>
                <option value="Bti Biological Larvicide">{isBengali ? 'বিটিআই (Bti) ব্যাকটেরিয়াল লার্ভিসাইড' : 'Bti Biological Larvicide'}</option>
                <option value="Temephos / Chemical Spray">{isBengali ? 'টেমিফোস / রাসায়নিক কীটনাশক' : 'Temephos Granules / Chemical Spray'}</option>
                <option value="Container Removal & Disposal">{isBengali ? 'আবর্জনা ও পাত্র অপসারণ' : 'Container Removal & Disposal'}</option>
              </select>

              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                {isBengali ? 'পরিষ্কার করার পরের প্রমাণ ছবি' : 'Upload After-Cleanup Proof Photo'}
              </label>

              <div 
                style={{
                  border: '2px dashed var(--border)',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#f8fafc',
                  marginBottom: '12px'
                }}
                onClick={() => document.getElementById('proofInput').click()}
              >
                {previewProof ? (
                  <img src={previewProof} alt="Proof" style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <Camera size={26} style={{ color: '#94a3b8', marginBottom: '4px' }} />
                    <p style={{ margin: 0 }}>{isBengali ? 'পরিচ্ছন্ন স্থানের ছবি তুলতে ট্যাপ করুন' : 'Tap to snap clean site photo'}</p>
                  </div>
                )}
                <input 
                  id="proofInput" 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handleProofChange} 
                  style={{ display: 'none' }} 
                />
              </div>

              <button 
                className="btn-primary" 
                style={{ background: 'var(--color-resolved)' }} 
                onClick={submitResolution}
                disabled={isSubmitting}
              >
                <CheckCircle2 size={18} /> {isSubmitting ? (isBengali ? 'যাচাই করা হচ্ছে...' : 'Verifying...') : (isBengali ? 'পরিচ্ছন্নতা নিশ্চিত করুন (+৫০ পয়েন্ট)' : 'Verify Cleanup (+50 pts)')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}