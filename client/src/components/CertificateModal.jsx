import React from 'react';
import { X, Award, Printer, CheckCircle, ShieldCheck, QrCode } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, user, isBengali = false }) {
  if (!isOpen || !user) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString(isBengali ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid #0f766e',
                background: '#0f766e',
                color: '#fff',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Printer size={15} /> {isBengali ? 'প্রিন্ট / সেভ করুন' : 'Print / Save PDF'}
            </button>
          </div>

          {/* Certificate Body Container */}
          <div style={{
            border: '8px double #0f766e',
            borderRadius: '12px',
            padding: '36px 28px',
            textAlign: 'center',
            background: '#ffffff',
            boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ecfdf5', color: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={32} />
              </div>
            </div>

            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0f766e' }}>
              {isBengali ? 'নাগরিক সেবা ও জনস্বাস্থ্য স্বীকৃতি সনদ' : 'CERTIFICATE OF CIVIC COMMENDATION'}
            </span>

            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '8px 0 14px', color: '#0f172a' }}>
              নংরা (NONGRA) VECTOR CONTROL
            </h1>

            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 auto 16px', maxWidth: '440px', lineHeight: 1.5 }}>
              {isBengali 
                ? 'ক্যাম্পাস ও পৌর এলাকায় এডিস মশার প্রজননস্থল নির্মূল এবং ডেঙ্গু সংক্রমণ প্রতিরোধে বিশেষ অবদানের জন্য এই সনদ প্রদান করা হলো:'
                : 'This commendation is proudly presented in recognition of outstanding community service, active larval habitat eradication, and dengue outbreak mitigation to:'}
            </p>

            <div style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#0f766e',
              borderBottom: '2px solid #cbd5e1',
              display: 'inline-block',
              padding: '4px 32px 8px',
              marginBottom: '16px'
            }}>
              {user.username || user.name}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                🏆 {isBengali ? 'অর্জিত স্কোর:' : 'Points Earned:'} {user.points || 50} pts
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a' }}>
                <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {isBengali ? 'যাচাইকৃত স্বেচ্ছাসেবক' : 'Verified Field Squad'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '0.78rem', color: '#64748b' }}>
              <div style={{ textAlign: 'left' }}>
                <strong>{isBengali ? 'তারিখ:' : 'Date Issued:'}</strong> {currentDate}
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <QrCode size={11} /> ID: NONGRA-{user.id || '01'}-2026
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ borderBottom: '1px solid #475569', width: '130px', marginBottom: '4px' }}></div>
                <strong>{isBengali ? 'টাস্কফোর্স প্রধান' : 'Head of Public Health Taskforce'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}