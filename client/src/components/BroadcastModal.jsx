import React, { useState } from 'react';
import { 
  X, Send, Radio, Users, CheckCircle2, AlertTriangle, 
  PhoneCall, MessageSquare, BellRing, Sparkles 
} from 'lucide-react';

export default function BroadcastModal({ isOpen, onClose, reports = [], isBengali = false }) {
  if (!isOpen) return null;

  const [targetAudience, setTargetAudience] = useState('hostel');
  const [customNote, setCustomNote] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const activeReportsCount = reports.filter(r => r.status === 'reported').length;

  const templates = [
    {
      id: 'rain',
      label: isBengali ? 'বৃষ্টিপাত পরবর্তী ডেঙ্গু সতর্কতা' : 'Post-Rainfall Larvae Flush Directive',
      textEn: 'URGENT: Stagnant rainwater reported across Sector 09. All squad captains and hostel wardens must inspect open drums, buckets, and rooftop perimeter gutters within 4 hours.',
      textBn: 'জরুরি নোটিশ: অতিবৃষ্টির কারণে জমে থাকা পানি দ্রুত নিষ্কাশন করুন। আগামী ৪ ঘণ্টার মধ্যে ছাদ ও উন্মুক্ত পাত্রে লার্ভিসাইড স্প্রে নিশ্চিত করুন।'
    },
    {
      id: 'platelet',
      label: isBengali ? 'জরুরি রক্ত / প্লেটলেট বার্তা' : 'Critical Platelet Request (Savar Hospital)',
      textEn: 'BLOOD DRIVE ALERT: Severe Dengue case admitted to Enam Medical. Standby O+ and B+ apheresis platelet donors in Ashulia please report to Campus Medical Desk.',
      textBn: 'জরুরি রক্তের আবেদন: সাভার হাসপাতালে ভর্তি ডেঙ্গু রোগীর জন্য জরুরি ভিত্তিতে ও+ এবং বি+ রক্তের প্লেটলেট প্রয়োজন।'
    },
    {
      id: 'fogging',
      label: isBengali ? 'সান্ধ্যকালীন ফগিং শিডিউল' : 'Municipal Fogging Team Dispatch',
      textEn: 'FIELD NOTICE: Thermal fogging unit Alpha arriving at Academic Block 4 & Cafeteria Lake sector at 5:30 PM. Keep windows screened.',
      textBn: 'ফিল্ড নোটিশ: আজ বিকাল ৫:৩০ মিনিটে ক্যাফেটেরিয়া লেক ও একাডেমিক ব্লক ৪ প্রাঙ্গণে ফগিং পরিচালিত হবে।'
    }
  ];

  const handleTemplateSelect = (tmplId) => {
    setSelectedTemplate(tmplId);
    if (tmplId === 'custom') {
      setCustomNote('');
    } else {
      const tmpl = templates.find(t => t.id === tmplId);
      if (tmpl) {
        setCustomNote(isBengali ? tmpl.textBn : tmpl.textEn);
      }
    }
  };

  const recipientCounts = {
    hostel: 18,
    squads: 42,
    municipal: 12,
    all: 72
  };

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
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
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

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
            {isBengali
              ? 'আশুলিয়া ও স্থায়ী ক্যাম্পাস অঞ্চলে শনাক্তকৃত হটস্পটগুলোর ১ কিমি ব্যাসার্ধে থাকা টিম লিডার এবং হোস্টেল দায়িত্বপ্রাপ্তদের তাৎক্ষণিক বার্তা পাঠান।'
              : 'Trigger localized push/SMS dispatch to campus squads, hostel monitors, and municipal sanitation captains within a 1km radius of unverified hotspots.'}
          </p>

          <div style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '16px',
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
                {isBengali ? `${recipientCounts[targetAudience]} জন ফিল্ড ক্যাপ্টেনের ফোনে এসএমএস ও পুশ বার্তা পৌঁছেছে।` : `SMS & In-App alert transmitted to ${recipientCounts[targetAudience]} registered field operators.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendBroadcast}>
              {/* Quick Template Picker */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px' }}>
                  {isBengali ? 'দ্রুত নোটিশ টেমপ্লেট' : 'Quick Notice Templates'}
                </label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {templates.map(tmpl => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => handleTemplateSelect(tmpl.id)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '14px',
                        border: `1px solid ${selectedTemplate === tmpl.id ? '#dc2626' : 'var(--border)'}`,
                        background: selectedTemplate === tmpl.id ? '#fee2e2' : '#f8fafc',
                        color: selectedTemplate === tmpl.id ? '#991b1b' : '#334155',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {tmpl.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleTemplateSelect('custom')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '14px',
                      border: `1px solid ${selectedTemplate === 'custom' ? '#dc2626' : 'var(--border)'}`,
                      background: selectedTemplate === 'custom' ? '#fee2e2' : '#f8fafc',
                      color: selectedTemplate === 'custom' ? '#991b1b' : '#334155',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {isBengali ? 'কাস্টম বার্তা' : 'Custom'}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    {isBengali ? 'প্রাপক নির্বাচন করুন' : 'Target Recipient Group'}
                  </label>
                  <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 800 }}>
                    {recipientCounts[targetAudience]} {isBengali ? 'জন প্রাপক সক্রিয়' : 'nodes active'}
                  </span>
                </div>
                <select
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value)}
                  style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.84rem', background: '#fff' }}
                >
                  <option value="hostel">{isBengali ? 'সকল হল ও হোস্টেল সুপারভাইজার' : 'Campus Hall & Hostel Wardens'}</option>
                  <option value="squads">{isBengali ? 'নিবন্ধিত রেড ক্রিসেন্ট ও ইকো ক্লাব ভলান্টিয়ার' : 'Red Crescent & Eco Club Volunteers'}</option>
                  <option value="municipal">{isBengali ? 'পৌরসভা বর্জ্য ব্যবস্থাপনা ও ফগিং টিম' : 'Municipal Waste & Fogging Crew'}</option>
                  <option value="all">{isBengali ? 'সার্বিক আশুলিয়া জরুরি রেসপন্স নেটওয়ার্ক' : 'Complete Ashulia Emergency Response Network'}</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                  {isBengali ? 'বার্তা বিবরণ' : 'Intervention Directive / Notes'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={customNote}
                  onChange={e => setCustomNote(e.target.value)}
                  placeholder={isBengali ? 'যেমন: পরিবহন ডিপো ও একাডেমিক ব্লক-৪ এর ছাদ দ্রুত পরিদর্শন করুন।' : 'e.g., Immediate Bti application requested near transport bay and Rooftop Block 4.'}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.84rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '18px', fontSize: '0.76rem', color: '#64748b' }}>
                <PhoneCall size={14} style={{ display: 'inline', marginRight: '6px' }} />
                <strong>Gateway:</strong> Teletalk Gov Civic SMS Gateway (Ashulia Sector 09 Node)
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSending}
                style={{ background: '#dc2626', width: '100%', padding: '12px' }}
              >
                <Send size={16} />
                {isSending
                  ? (isBengali ? 'পাঠানো হচ্ছে...' : 'Transmitting SMS & Push...')
                  : (isBengali ? `জরুরি অ্যালার্ট পাঠান (${recipientCounts[targetAudience]} জন)` : `Transmit Emergency Alert (${recipientCounts[targetAudience]} nodes)`)}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}