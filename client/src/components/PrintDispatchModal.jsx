import React from 'react';
import { X, Printer, ShieldAlert, CheckSquare, MapPin } from 'lucide-react';

export default function PrintDispatchModal({ isOpen, onClose, reports = [], isBengali = false }) {
  if (!isOpen) return null;

  const activeReports = reports.filter(r => r.status !== 'resolved');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', borderBottom: '2px solid #0f766e', paddingBottom: '12px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#0f766e' }}>
                নংরা (Nongra) • Field Intervention Manifest
              </h2>
              <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                {isBengali ? 'পৌরসভা ও ক্যাম্পাস এডিস মশা নিয়ন্ত্রণ কার্যক্রম তালিকা' : 'Municipal & Campus Aedes Larvicide Vector Triage Sheet'}
              </p>
            </div>
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
              <Printer size={15} /> {isBengali ? 'প্রিন্ট / পিডিএফ' : 'Print / Save PDF'}
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '16px', display: 'flex', gap: '20px' }}>
            <span><strong>Date:</strong> {new Date().toLocaleDateString()}</span>
            <span><strong>Sector:</strong> Ashulia / Permanent Campus</span>
            <span><strong>Pending Sites:</strong> {activeReports.length}</span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '20px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '8px' }}>#ID</th>
                <th style={{ padding: '8px' }}>Hazard / Description</th>
                <th style={{ padding: '8px' }}>Coordinates</th>
                <th style={{ padding: '8px' }}>Intervention</th>
                <th style={{ padding: '8px' }}>Sign-off</th>
              </tr>
            </thead>
            <tbody>
              {activeReports.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px', fontWeight: 700 }}>#{r.id}</td>
                  <td style={{ padding: '8px' }}>{r.description || 'Breeding site'}</td>
                  <td style={{ padding: '8px', color: '#64748b' }}>
                    {r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}
                  </td>
                  <td style={{ padding: '8px' }}>
                    <span style={{ fontSize: '0.72rem', padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9' }}>
                      Bti / Drainage
                    </span>
                  </td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ borderBottom: '1px dashed #94a3b8', width: '70px', height: '16px' }}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.75rem', color: '#64748b' }}>
            <strong>Operational Protocol:</strong> Field personnel must apply biological larvicide (Bti) or empty standing water containers within 24 hours of notification to prevent pupal emergence.
          </div>
        </div>
      </div>
    </div>
  );
}