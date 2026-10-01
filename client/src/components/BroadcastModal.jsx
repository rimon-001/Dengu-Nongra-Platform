import React, { useState } from 'react';
import { X, Send, Radio, Users, CheckCircle2, AlertTriangle, PhoneCall } from 'lucide-react';

export default function BroadcastModal({ isOpen, onClose, reports = [], isBengali = false }) {
  if (!isOpen) return null;

  const [targetAudience, setTargetAudience] = useState('hostel');
  const [customNote, setCustomNote] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const activeReportsCount = reports.filter(r => r.status === 'reported').length;

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        onClose();
      }, 2200);
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Radio size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'জরুরি ভেক্টর অ্যালার্ট ব্রডকাস্ট' : 'Community Vector Alert Broadcast'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase' }}>
                {isBengali ? 'পৌরসভা ও ক্যাম্পাস রেসপন্স চ্যানেল' : 'Emergency Field SMS & Push Gateway'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
            {isBengali
              ? 'আশুলিয়া ও স্থায়ী ক্যাম্পাস অঞ্চলে শনাক্তকৃত হটস্পটগুলোর ১ কিমি ব্যাসার্ধে থাকা টিম লিডার এবং হোস্টেল দায়িত্বপ্রাপ্তদের তাৎক্ষণিক বার্তা পাঠান।'
              : 'Trigger localized push/SMS dispatch to campus squads, hostel monitors, and municipal sanitation captains within a 1km radius of unverified hotspots.'}
          </p>

          <div style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.8rem',
            color: '#9f1239'
          }}>
            <AlertTriangle size={18} flexShrink={0} />
            <span>
              <strong>{activeReportsCount} {isBengali ? 'টি সক্রিয় প্রজননস্থল' : 'Active Hotspots'}</strong> {isBengali ? 'বর্তমানে জরুরি পরিষ্কারের অপেক্ষায় রয়েছে।' : 'currently require immediate drainage or Bti spraying.'}
            </span>
          </div>

          {sentSuccess ? (
            <div style={{ padding: '24px', textAlign: 'center', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <CheckCircle2 size={44} color="#16a34a" style={{ marginBottom: '8px' }} />
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#166534', fontWeight: 800 }}>
                {isBengali ? 'অ্যালার্ট সফলভাবে পাঠানো হয়েছে!' : 'Broadcast Dispatched Successfully!'}
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#4b5563' }}>
                {isBengali ? '২৪ জন ফিল্ড ক্যাপ্টেনের ফোনে এসএমএস পৌঁছেছে।' : 'SMS delivered to 24 registered local squad leaders.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendBroadcast}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  {isBengali ? 'প্রাপক নির্বাচন করুন' : 'Target Recipient Group'}
                </label>
                <select
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.85rem', background: '#fff' }}
                >
                  <option value="hostel">{isBengali ? 'সকল হল ও হোস্টেল সুপারভাইজার' : 'Campus Hall & Hostel Wardens'}</option>
                  <option value="squads">{isBengali ? 'নিবন্ধিত রেড ক্রিসেন্ট ও ইকো ক্লাব ভলান্টিয়ার' : 'Red Crescent & Eco Club Volunteers'}</option>
                  <option value="municipal">{isBengali ? 'পৌরসভা বর্জ্য ব্যবস্থাপনা ও ফগিং টিম' : 'Municipal Waste & Fogging Crew'}</option>
                  <option value="all">{isBengali ? 'সার্বিক আশুলিয়া জরুরি রেসপন্স নেটওয়ার্ক' : 'Complete Ashulia Emergency Response Network'}</option>
                </select>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  {isBengali ? 'বিশেষ নির্দেশনা (ঐচ্ছিক)' : 'Intervention Directive / Notes'}
                </label>
                <textarea
                  rows={3}
                  value={customNote}
                  onChange={e => setCustomNote(e.target.value)}
                  placeholder={isBengali ? 'যেমন: পরিবহন ডিপো ও একাডেমিক ব্লক-৪ এর ছাদ দ্রুত পরিদর্শন করুন।' : 'e.g., Immediate Bti application requested near transport bay and Rooftop Block 4.'}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '18px', fontSize: '0.78rem', color: '#64748b' }}>
                <PhoneCall size={14} style={{ display: 'inline', marginRight: '6px' }} />
                <strong>Gateway:</strong> Teletalk Gov Civic SMS Gateway (Ashulia Sector 09 Node)
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSending}
                style={{ background: '#dc2626' }}
              >
                <Send size={16} />
                {isSending
                  ? (isBengali ? 'পাঠানো হচ্ছে...' : 'Transmitting SMS...')
                  : (isBengali ? 'জরুরি অ্যালার্ট পাঠান' : 'Transmit Emergency Alert')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}