import React, { useState, useEffect } from 'react';
import { X, User, Award, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function CitizenProfileModal({ isOpen, onClose, currentUser, onLogout, isBengali = false }) {
  if (!isOpen) return null;

  const [myReports, setMyReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('nongra_token');

  useEffect(() => {
    if (token) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.myReports) setMyReports(data.myReports);
        })
        .catch(console.warn)
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header Profile Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '12px',
            padding: '20px',
            color: '#fff',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.15)', color: '#38bdf8', textTransform: 'uppercase' }}>
                  {currentUser?.role || 'Citizen'} Account
                </span>
                <h3 style={{ margin: '6px 0 2px', fontSize: '1.2rem', fontWeight: 800 }}>
                  {currentUser?.name || 'Resident Citizen'}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{currentUser?.email}</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38bdf8' }}>
                  {currentUser?.points || 0}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Civic Points</div>
              </div>
            </div>
          </div>

          {/* Activity Ledger Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <strong style={{ fontSize: '0.88rem', color: '#1e293b' }}>
              {isBengali ? 'আমার দাখিলকৃত রিপোর্টসমূহ' : 'My Filed Incident Reports'}
            </strong>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
              {myReports.length} {isBengali ? 'টি রিপোর্ট' : 'reports'}
            </span>
          </div>

          {/* List of citizen reports */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {myReports.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', color: '#64748b', fontSize: '0.8rem' }}>
                {isBengali ? 'আপনি এখনও কোনো রিপোর্ট জমা দেননি।' : 'No reports filed under this account yet. Use the central "+" button to report.'}
              </div>
            ) : (
              myReports.map(report => (
                <div
                  key={report.id}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    background: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1e293b' }}>
                      {report.description}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
                      Ref: {report.tracking_code} • {new Date(report.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: report.status === 'resolved' ? '#dcfce7' : report.status === 'claimed' ? '#fef3c7' : '#fee2e2',
                    color: report.status === 'resolved' ? '#16a34a' : report.status === 'claimed' ? '#d97706' : '#dc2626'
                  }}>
                    {report.status.toUpperCase()}
                  </span>
                </div>
              ))
            )}
          </div>

          <button
            type="button"
            onClick={onLogout}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #fee2e2',
              background: '#fef2f2',
              color: '#dc2626',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            {isBengali ? 'লগআউট করুন' : 'Sign Out of Account'}
          </button>
        </div>
      </div>
    </div>
  );
}