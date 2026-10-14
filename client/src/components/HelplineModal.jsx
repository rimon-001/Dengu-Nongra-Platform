import React, { useState } from 'react';
import { 
  X, HeartPulse, PhoneCall, Hospital, Clock, MapPin, 
  ExternalLink, ShieldCheck, AlertCircle, Droplet, UserPlus, CheckCircle2, Navigation 
} from 'lucide-react';

export default function HelplineModal({ isOpen, onClose, isBengali = false }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('centers');
  const [donorPledged, setDonorPledged] = useState(false);
  const [donorBloodGroup, setDonorBloodGroup] = useState('O+');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorName, setDonorName] = useState('');

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
      location: isBengali ? 'সাভার বাস স্ট্যান্ড (প্রায় ৫.৮ কিমি)' : 'Savar Bus Stand (approx. 5.8 km)',
      coords: '23.8447,90.2585',
      ns1Testing: isBengali ? 'প্রস্তুত (২৪ ঘণ্টা)' : 'Available (24/7)',
      plateletStatus: isBengali ? 'মজুত সক্রিয়' : 'Blood Bank Active',
      phone: '+88027743217',
      isPrimary: true
    },
    {
      name: isBengali ? 'সাভার উপজেলা স্বাস্থ্য কমপ্লেক্স' : 'Savar Upazila Health Complex',
      location: isBengali ? 'সাভার সদর (প্রায় ৭.২ কিমি)' : 'Savar Sadar (approx. 7.2 km)',
      coords: '23.8580,90.2612',
      ns1Testing: isBengali ? 'সরকারি ফি (৫০ টাকা)' : 'Govt Rate (50 BDT)',
      plateletStatus: isBengali ? 'রেফারেল সুবিধা' : 'Referral Depot',
      phone: '+8801711223344',
      isPrimary: false
    },
    {
      name: isBengali ? 'হাবিব ক্লিনিক ও ডায়াগনস্টিক সেন্টার' : 'Habib Clinic & Diagnostic',
      location: isBengali ? 'আশুলিয়া বাজার (প্রায় ২.১ কিমি)' : 'Ashulia Bazar (approx. 2.1 km)',
      coords: '23.8920,90.3250',
      ns1Testing: isBengali ? 'র‍্যাপিড কিট টেস্ট' : 'Rapid Kit Available',
      plateletStatus: isBengali ? 'সীমিত' : 'Limited Storage',
      phone: '+8801911889900',
      isPrimary: false
    }
  ];

  const handlePledgeDonor = (e) => {
    e.preventDefault();
    if (!donorPhone) return;

    // Save donor locally so it survives refreshes
    const existingDonors = JSON.parse(localStorage.getItem('nongra_blood_donors') || '[]');
    const newDonor = {
      name: donorName || (isBengali ? 'ক্যাম্পাস ভলান্টিয়ার' : 'Campus Volunteer'),
      bloodGroup: donorBloodGroup,
      phone: donorPhone,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('nongra_blood_donors', JSON.stringify([newDonor, ...existingDonors]));

    setDonorPledged(true);
    setTimeout(() => {
      setDonorPledged(false);
      setDonorPhone('');
      setDonorName('');
    }, 3200);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        style={{ maxWidth: '660px', maxHeight: '90vh', overflowY: 'auto' }}
      >
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

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
            {isBengali
              ? 'তীব্র জ্বর, চোখের পেছনে ব্যথা বা ডেঙ্গুর উপসর্গ দেখা দিলে নিকটস্থ সরকারি-বেসরকারি এনএস১ (NS1) অ্যান্টিজেন টেস্ট এবং রক্ত পরিসঞ্চালন কেন্দ্রের তালিকা।'
              : 'Direct hotline links, NS1 rapid antigen diagnostic availability, and verified blood/platelet referral points near Ashulia Permanent Campus.'}
          </p>

          {/* Quick Helplines */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
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
                  transition: 'transform 0.15s ease'
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

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('centers')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'centers' ? 'var(--color-primary)' : '#f1f5f9',
                color: activeTab === 'centers' ? '#fff' : 'var(--text-main)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isBengali ? 'ডায়াগনস্টিক ও প্লেটলেট ব্যাংক' : 'Hospital Directory & Diagnostics'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('donor')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'donor' ? '#dc2626' : '#f1f5f9',
                color: activeTab === 'donor' ? '#fff' : 'var(--text-main)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Droplet size={13} /> {isBengali ? 'অন-কল রক্তদাতা রেজিস্ট্রি' : 'Platelet Donor Registry'}
            </button>
          </div>

          {activeTab === 'centers' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
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

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <a
                      href={`https://www.google.com/maps?q=${h.coords}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: '#f1f5f9',
                        border: '1px solid var(--border)',
                        color: '#334155',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      <Navigation size={13} /> {isBengali ? 'ম্যাপ' : 'Map'}
                    </a>

                    <a
                      href={`tel:${h.phone}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        background: 'var(--color-primary)',
                        border: 'none',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      <PhoneCall size={13} /> {isBengali ? 'কল' : 'Call Desk'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Volunteer Donor Registry Form */
            <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', padding: '18px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Droplet size={18} color="#dc2626" />
                <strong style={{ fontSize: '0.88rem', color: '#1e293b' }}>
                  {isBengali ? 'জরুরি প্লেটলেট রক্তদাতা রেজিস্ট্রি' : 'Emergency Campus Platelet Pool'}
                </strong>
              </div>
              <p style={{ margin: '0 0 14px', fontSize: '0.76rem', color: '#64748b', lineHeight: 1.4 }}>
                {isBengali
                  ? 'ডেঙ্গু রোগীর রক্তের প্লেটলেট আশঙ্কাজনকভাবে কমে গেলে তাৎক্ষণিক রক্তদাতাদের সাথে যোগাযোগ করা হয়। আপনার নাম তালিকায় যুক্ত করতে তথ্য প্রদান করুন।'
                  : 'Critical dengue patients often require apheresis platelets on short notice. Volunteer donors in the campus footprint can register below.'}
              </p>

              {donorPledged ? (
                <div style={{ padding: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', textAlign: 'center' }}>
                  <CheckCircle2 size={32} color="#16a34a" style={{ marginBottom: '6px' }} />
                  <strong style={{ fontSize: '0.85rem', color: '#166534', display: 'block' }}>
                    {isBengali ? 'ধন্যবাদ! আপনার তথ্য সংরক্ষিত হয়েছে।' : 'Pledge Recorded! You are now on standby.'}
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: '#4b5563' }}>
                    {isBengali ? 'জরুরি প্রয়োজনে স্বাস্থ্য ডেস্ক থেকে যোগাযোগ করা হবে।' : 'Local hospitals will reach out in emergency blood deficiency situations.'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handlePledgeDonor} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '4px' }}>
                      {isBengali ? 'আপনার পূর্ণ নাম' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={e => setDonorName(e.target.value)}
                      placeholder={isBengali ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '0.8rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '4px' }}>
                        {isBengali ? 'রক্তের গ্রুপ' : 'Blood Group'}
                      </label>
                      <select
                        value={donorBloodGroup}
                        onChange={e => setDonorBloodGroup(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '0.8rem', background: '#fff' }}
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, marginBottom: '4px' }}>
                        {isBengali ? 'মোবাইল নম্বর' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={donorPhone}
                        onChange={e => setDonorPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '0.8rem' }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '9px', fontSize: '0.8rem', background: '#dc2626' }}
                  >
                    <UserPlus size={14} />
                    {isBengali ? 'অন-কল রক্তদাতা হিসেবে যুক্ত হোন' : 'Register as Standby Platelet Donor'}
                  </button>
                </form>
              )}
            </div>
          )}

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
                ? 'ডেঙ্গু ধরা পড়লে চিকিৎসকের পরামর্শ ছাড়া অ্যাসপিরিন বা আইবুপ্রোফেন জাতীয় ব্যথানাশক গ্রহণ করবেন না। শুধুমাত্র প্যারাসিটামল ও প্রচুর তরল খাবার গ্রহণ করুন।'
                : 'Medical Advisory: Avoid NSAIDs (Aspirin/Ibuprofen) during suspected dengue onset as they worsen bleeding risk. Maintain oral hydration and seek immediate platelet counts.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}