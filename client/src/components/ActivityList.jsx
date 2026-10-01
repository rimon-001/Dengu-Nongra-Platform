import React from 'react';
import { MapPin, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ActivityList({ reports, onSelectTask }) {
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
    if (!isoString) return 'Just now';
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 60) return `${Math.max(1, diffMins)} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <div style={{ marginTop: '28px' }}>
      <div className="section-header">
        <h2>Recent Activity</h2>
      </div>

      <div className="activity-list">
        {reports.length === 0 ? (
          <div style={{
            background: 'var(--bg-card)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            No recent activity reported.
          </div>
        ) : (
          reports.map((report) => {
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
                      {report.description || 'Breeding Risk Hotspot'}
                    </div>
                    <div className="activity-subtitle">
                      <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                      Location ID: #{report.id} • Lat: {report.latitude.toFixed(4)}, Lng: {report.longitude.toFixed(4)}
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
                    {report.status}
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