import React from 'react';
import { X, HeartPulse, PhoneCall, Hospital, Clock, MapPin, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

export default function HelplineModal({ isOpen, onClose, isBengali = false }) {
  if (!isOpen) return null;

  const emergencyContacts = [
    {
      title: isBengali ? 'জাতীয় স্বাস্থ্য বাতায়ন (স্বাস্থ্য অধিদপ্তর)' : 'National Health Helpline (DGHS)',
      number: '16263',
      badge: isBengali ? '২৪/৭ ফ্রি কল' : '24/7 Toll-Free',
      color: '#059669',
      bgColor: '#ecfdf5'
    },
    {
      title: isBengali ? 'জাতীয় জরুরি সেবা' : 'National Emergency Dispatch',
      number: '999',
      badge: isBengali ? 'তাৎক্ষণিক সহায়তা' : 'Police / Ambulance',
      color: '#dc2626',
      bgColor: '#fef2f2'
    },
    {
      title: isBengali ? 'ডিআইইউ ক্যাম্পাস জরুরি মেডিকেল সেন্টার' : 'DIU Campus Emergency Medical Center',
      number: '+8809617901234',
      badge: isBengali ? 'অন-ক্যাম্পাস' : 'On-Campus Facility',
      color: '#2563eb',
      bgColor: '#eff6ff'
    }
  ];

  const hospitals = [
    {
      name: isBengali ? 'এনাম মেডিকেল কলেজ ও হাসপাতাল' : 'Enam Medical College & Hospital',
      location: 'Savar Bus Stand (approx. 5.8 km)',
      ns1Testing: isBengali ? 'প্রস্তুত (২৪ ঘণ্টা)' : 'Available (24/7)',
      plateletStatus: isBengali ? 'মজুত সক্রিয়' : 'Blood Bank Active',
      phone: '+88027743217',
      isPrimary: true
    },
    {
      name: isBengali ? 'সাভার উপজেলা স্বাস্থ্য কমপ্লেক্স' : 'Savar Upazila Health Complex',
      location: 'Savar Sadar (approx. 7.2 km)',
      ns1Testing: isBengali ? 'সরকারি ফি (৫০ টাকা)' : 'Govt Rate (50 BDT)',
      plateletStatus: isBengali ? 'রেফারেল সুবিধা' : 'Referral Depot',
      phone: '+8801711223344',
      isPrimary: false
    },
    {
      name: isBengali ? 'হাবিব ক্লিনিক ও ডায়াগনস্টিক সেন্টার' : 'Habib Clinic & Diagnostic',
      location: 'Ashulia Bazar (approx. 2.1 km)',
      ns1Testing: isBengali ? 'র‍্যাপিড কিট টেস্ট' : 'Rapid Kit Available',
      plateletStatus: isBengali ? 'সীমিত' : 'Limited Storage',
      phone: '+8801911889900',
      isPrimary: false
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartPulse size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'ডেঙ্গু ক্লিনিকাল রেফারেল ও জরুরি সেবা' : 'Dengue Clinical & Emergency Referral'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase' }}>
                {isBengali ? 'আশুলিয়া ও সাভার অঞ্চল স্বাস্থ্য হাব' : 'Ashulia & Savar Regional Healthcare Network'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
            {isBengali
              ? 'তীব্র জ্বর, চোখের পেছনে ব্যথা বা ডেঙ্গুর উপসর্গ দেখা দিলে নিকটস্থ সরকারি-বেসরকারি এনএস১ (NS1) অ্যান্টিজেন টেস্ট এবং রক্ত পরিসঞ্চালন কেন্দ্রের তালিকা।'
              : 'Direct hotline links, NS1 rapid antigen diagnostic availability, and verified blood/platelet referral points near Ashulia Permanent Campus.'}
          </p>

          {/* Quick Helplines */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {emergencyContacts.map((contact, idx) => (
              <a
                key={idx}
                href={`tel:${contact.number}`}
                style={{
                  textDecoration: 'none',
                  background: contact.bgColor,
                  border: `1px solid ${contact.color}25`,
                  borderRadius: '10px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.1s ease'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: contact.color, textTransform: 'uppercase' }}>
                    {contact.badge}
                  </span>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e293b', marginTop: '4px', lineHeight: 1.3 }}>
                    {contact.title}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '1rem', fontWeight: 800, color: contact.color }}>
                  <PhoneCall size={14} />
                  <span>{contact.number}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Clinical Hospital Directory */}
          <div className="section-header" style={{ marginBottom: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>
              {isBengali ? 'নিকটবর্তী এনএস১ টেস্ট ও প্লেটলেট ব্যাংক' : 'Nearby NS1 Diagnostic & Platelet Centers'}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {hospitals.map((h, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  background: '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Hospital size={16} color="var(--color-primary)" />
                    <strong style={{ fontSize: '0.88rem', color: '#1e293b' }}>{h.name}</strong>
                    {h.isPrimary && (
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: '#dcfce7', color: '#15803d' }}>
                        {isBengali ? 'প্রধান কেন্দ্র' : 'Primary Hub'}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
                    <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                    {h.location}
                  </div>
                  <div style={{ display: 'flex', gap: '14px', marginTop: '6px', fontSize: '0.72rem' }}>
                    <span style={{ color: '#0f766e', fontWeight: 600 }}>
                      🧪 NS1: <strong>{h.ns1Testing}</strong>
                    </span>
                    <span style={{ color: '#dc2626', fontWeight: 600 }}>
                      🩸 Platelets: <strong>{h.plateletStatus}</strong>
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${h.phone}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid var(--border)',
                    color: 'var(--color-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <PhoneCall size={14} /> {isBengali ? 'কল করুন' : 'Call Desk'}
                </a>
              </div>
            ))}
          </div>

          {/* Warning Banner */}
          <div style={{
            background: '#fffbeb',
            border: '1px solid #fef3c7',
            borderRadius: '10px',
            padding: '12px 14px',
            fontSize: '0.75rem',
            color: '#92400e',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} flexShrink={0} />
            <span>
              {isBengali
                ? 'ডেঙ্গু ধরা পড়লে চিকিৎসকের পরামর্শ ছাড়া অ্যাসপিরিন বা আইবুপ্রোফেন জাতীয় ব্যথানাশক গ্রহণ করবেন না। শুধুমাত্র প্যারাসিটামল ও প্রচুর তরল খাবার গ্রহণ করুন।'
                : 'Medical Advisory: Avoid NSAIDs (Aspirin/Ibuprofen) during suspected dengue onset as they worsen bleeding risk. Maintain oral hydration and seek immediate platelet counts.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}