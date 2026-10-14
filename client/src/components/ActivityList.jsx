import React, { useState } from 'react';
import { MapPin, Clock, ShieldCheck, AlertCircle, Filter } from 'lucide-react';

export default function ActivityList({ reports = [], onSelectTask, isBengali = false }) {
  const [filter, setFilter] = useState('all');

  const getIconConfig = (status) => {
    if (status === 'resolved') {
      return { className: 'activity-icon green', icon: <ShieldCheck size={20} /> };
    }
    if (status === 'claimed') {
      return { className: 'activity-icon orange', icon: <Clock size={20} /> };
    }
    return { className: 'activity-icon red', icon: <AlertCircle size={20} /> };
  };

  const formatRelativeTime = (isoString) => {
    if (!isoString) return isBengali ? 'এইমাত্র' : 'Just now';
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 60) return isBengali ? `${Math.max(1, diffMins)} মিনিট আগে` : `${Math.max(1, diffMins)} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return isBengali ? `${diffHours} ঘণ্টা আগে` : `${diffHours} hours ago`;
    return isBengali ? `${Math.floor(diffHours / 24)} দিন আগে` : `${Math.floor(diffHours / 24)} days ago`;
  };

  const filteredReports = reports.filter(r => {
    if (filter === 'pending') return r.status === 'reported';
    if (filter === 'claimed') return r.status === 'claimed';
    if (filter === 'resolved') return r.status === 'resolved';
    return true;
  });

  return (
    <div style={{ marginTop: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
          {isBengali ? 'সর্বশেষ ফিল্ড অ্যাক্টিভিটি' : 'Recent Field Activity'}
        </h2>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {['all', 'pending', 'claimed', 'resolved'].map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              style={{
                border: 'none',
                background: filter === f ? 'var(--color-primary)' : '#f1f5f9',
                color: filter === f ? '#fff' : '#64748b',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'capitalize',
                cursor: 'pointer'
              }}
            >
              {f === 'all' && (isBengali ? 'সকল' : 'All')}
              {f === 'pending' && (isBengali ? 'অপেক্ষমাণ' : 'Pending')}
              {f === 'claimed' && (isBengali ? 'চলমান' : 'Claimed')}
              {f === 'resolved' && (isBengali ? 'সমাধানকৃত' : 'Resolved')}
            </button>
          ))}
        </div>
      </div>

      <div className="activity-list">
        {filteredReports.length === 0 ? (
          <div style={{
            background: 'var(--bg-card)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            {isBengali ? 'কোনো সাম্প্রতিক কার্যক্রম পাওয়া যায়নি।' : 'No recent activity reported under this filter.'}
          </div>
        ) : (
          filteredReports.map((report) => {
            const { className, icon } = getIconConfig(report.status);
            return (
              <div 
                key={report.id} 
                className="activity-card" 
                onClick={() => onSelectTask(report)}
              >
                <div className="activity-main">
                  <div className={className}>
                    {icon}
                  </div>
                  <div>
                    <div className="activity-title">
                      {report.description || (isBengali ? 'এডিস প্রজনন ঝুঁকি স্থান' : 'Breeding Risk Hotspot')}
                    </div>
                    <div className="activity-subtitle">
                      <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                      Location #{report.id} • Lat: {Number(report.latitude).toFixed(4)}, Lng: {Number(report.longitude).toFixed(4)}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="activity-time">
                    {formatRelativeTime(report.created_at)}
                  </div>
                  <span style={{
                    display: 'inline-block',
                    marginTop: '4px',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    background: report.status === 'resolved' ? '#d1fae5' : report.status === 'claimed' ? '#fef3c7' : '#fee2e2',
                    color: report.status === 'resolved' ? 'var(--color-resolved)' : report.status === 'claimed' ? 'var(--color-progress)' : 'var(--color-reported)'
                  }}>
                    {isBengali 
                      ? (report.status === 'resolved' ? 'সমাধানকৃত' : report.status === 'claimed' ? 'চলমান' : 'রিপোর্টকৃত')
                      : report.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}