import React, { useState } from 'react';
import { X, Star, ThumbsUp, AlertTriangle, ShieldCheck, MessageSquare, CheckCircle2, Award } from 'lucide-react';

export default function CitizenRatingModal({ isOpen, onClose, reports = [], isBengali = false }) {
  if (!isOpen) return null;

  // Filter resolved hazard sites eligible for community review
  const resolvedSites = reports.filter(r => r.status === 'resolved');

  const [selectedSiteId, setSelectedSiteId] = useState(resolvedSites[0]?.id || null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [reInfested, setReInfested] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Default reviews ledger
  const [reviews, setReviews] = useState([
    {
      id: 'REV-01',
      site: 'Vehicle tires cleaned and water drained',
      rating: 5,
      comment: 'Very thorough cleanup by DIU squad. Standing water completely overturned.',
      reviewer: 'Ashulia Sector 04 Resident',
      date: 'Yesterday'
    },
    {
      id: 'REV-02',
      site: 'Cafeteria rear drain clearance',
      rating: 4,
      comment: 'Bti applied properly. Noticeable drop in adult mosquitoes around tea stalls.',
      reviewer: 'Campus Dorm Warden',
      date: '2 days ago'
    }
  ]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const activeSite = resolvedSites.find(s => s.id === selectedSiteId);

    const newRev = {
      id: `REV-${Date.now()}`,
      site: activeSite ? activeSite.description : 'Cleared Site',
      rating: Number(rating),
      comment: feedback || (isBengali ? 'সন্তোষজনক পরিচ্ছন্নতা কার্যক্রম।' : 'Work verified and approved by community.'),
      reviewer: isBengali ? 'যাচাইকৃত স্থানীয় নাগরিক' : 'Verified Local Resident',
      date: isBengali ? 'এইমাত্র' : 'Just now',
      reInfested
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
      setReInfested(false);
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Star size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'নাগরিক সেবা রেটিং ও ফিডব্যাক' : 'Citizen Verification & Quality Review'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 700, textTransform: 'uppercase' }}>
                {isBengali ? 'জনগণের সন্তুষ্টি ও পুনঃসংক্রমণ সতর্কতা' : 'Public Audit & Re-Infestation Watch'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
            {isBengali
              ? 'স্বেচ্ছাসেবক বা পৌরসভা দ্বারা পরিষ্কার করা স্থানগুলোর বাস্তব কাজের মান মূল্যায়ন করুন এবং পুনরায় পানি জমেছে কিনা তা অবিলম্বে জানান।'
              : 'Empowers local campus and Ashulia residents to verify resolved hazard sites, evaluate chemical spray quality, and flag recurring pools.'}
          </p>

          {/* Review Submission Form */}
          <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '14px 0' }}>
                <CheckCircle2 size={36} color="#16a34a" style={{ marginBottom: '6px' }} />
                <h4 style={{ margin: 0, color: '#166534', fontSize: '0.95rem', fontWeight: 800 }}>
                  {isBengali ? 'আপনার মতামত সফলভাবে জমা হয়েছে!' : 'Citizen Review Recorded Successfully!'}
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.76rem', color: '#4b5563' }}>
                  {isBengali ? 'স্বেচ্ছাসেবক দলের স্কোরে রেটিং ও বোনাস যোগ করা হয়েছে।' : 'Public rating bonus credited to assigned cleanup squad.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                    {isBengali ? 'পরিষ্কারকৃত স্থান নির্বাচন করুন' : 'Select Resolved Hazard Site'}
                  </label>
                  <select
                    value={selectedSiteId || ''}
                    onChange={e => setSelectedSiteId(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.82rem', background: '#fff' }}
                  >
                    {resolvedSites.map(site => (
                      <option key={site.id} value={site.id}>
                        #{site.id} - {site.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                    {isBengali ? 'কাজের সন্তুষ্টি স্কোর' : 'Cleanliness Rating'}
                  </label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        onClick={() => setRating(star)}
                        style={{
                          cursor: 'pointer',
                          color: star <= rating ? '#f59e0b' : '#cbd5e1',
                          fill: star <= rating ? '#f59e0b' : 'none'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <input
                    type="text"
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    placeholder={isBengali ? "নাগরিক মতামত লিখুন (যেমন: ড্রেনটি সঠিকভাবে পরিষ্কার হয়েছে)" : "Write citizen note (e.g. Water successfully pumped out)"}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                  />
                </div>

                {/* Re-infestation toggle flag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '14px',
                  background: reInfested ? '#fee2e2' : '#f1f5f9',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: `1px solid ${reInfested ? '#fca5a5' : 'transparent'}`
                }}
                onClick={() => setReInfested(!reInfested)}
                >
                  <AlertTriangle size={15} color={reInfested ? '#dc2626' : '#64748b'} />
                  <span style={{ fontSize: '0.76rem', fontWeight: 700, color: reInfested ? '#dc2626' : '#475569' }}>
                    {isBengali ? '⚠️ সতর্কবার্তা: এখানে পুনরায় পানি জমে লার্ভা দেখা গেছে?' : '⚠️ Re-Infestation Alert: Did standing water accumulate again?'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '9px' }}
                >
                  {isBengali ? 'রেটিং ও ফিডব্যাক সাবমিট করুন' : 'Submit Citizen Audit Verification'}
                </button>
              </form>
            )}
          </div>

          {/* Community Reviews Feed */}
          <div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '8px', display: 'block' }}>
              {isBengali ? 'সর্বশেষ নাগরিক মতামত ও নিরীক্ষা' : 'Recent Verified Resident Endorsements'}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {reviews.map(rev => (
                <div
                  key={rev.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    fontSize: '0.78rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ color: '#1e293b' }}>{rev.site}</strong>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={12} color="#f59e0b" fill="#f59e0b" />
                      ))}
                    </div>
                  </div>
                  <p style={{ margin: '0 0 6px', color: '#475569', fontSize: '0.75rem' }}>{rev.comment}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.68rem' }}>
                    <span>By: {rev.reviewer}</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}