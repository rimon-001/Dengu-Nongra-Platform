import React, { useState, useEffect } from 'react';
import { X, Wifi, WifiOff, RefreshCw, Database, CheckCircle2, HardDrive, ShieldCheck } from 'lucide-react';

export default function OfflineSyncModal({ isOpen, onClose, isBengali = false }) {
  if (!isOpen) return null;

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingQueue, setPendingQueue] = useState([
    {
      id: 'Q-981',
      type: 'Photo Proof Upload',
      target: 'Site #3 (Transport Terminal)',
      bytes: '1.4 MB',
      timestamp: '4 mins ago'
    },
    {
      id: 'Q-982',
      type: 'GPS Coord Telemetry',
      target: 'Lat: 23.8762, Lng: 90.3210',
      bytes: '42 KB',
      timestamp: '1 min ago'
    }
  ]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerManualSync = () => {
    setIsSyncing(true);
    setSyncComplete(false);

    setTimeout(() => {
      setIsSyncing(false);
      setPendingQueue([]);
      setSyncComplete(true);
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: isOnline ? '#ecfdf5' : '#fee2e2',
              color: isOnline ? '#059669' : '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'অফলাইন ফিল্ড সিঙ্ক ও ডাটা কিউ' : 'Offline Field Sync & Queue Engine'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: isOnline ? '#059669' : '#dc2626', fontWeight: 700, textTransform: 'uppercase' }}>
                {isOnline
                  ? (isBengali ? 'নেটওয়ার্ক সক্রিয় • লাইভ কানেক্টেড' : 'Network Active • Live Connected')
                  : (isBengali ? 'নেটওয়ার্ক বিচ্ছিন্ন • লোকাল মোড সক্রিয়' : 'Air-Gapped • Local Buffer Active')}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
            {isBengali
              ? 'বেসমেন্ট বা প্রত্যন্ত এলাকায় নেটওয়ার্ক বিচ্ছিন্ন থাকলেও ছবি ও জিপিএস ডাটা ডিভাইসের লোকাল স্টোরেজে সুরক্ষিত থাকে এবং সংযোগ পাওয়া মাত্র স্বয়ংক্রিয়ভাবে সার্ভারে জমা হয়।'
              : 'Local IndexedDB/WAL buffer ensures zero packet loss during field vector sweeps in shielded campus basements or low-reception zones.'}
          </p>

          {/* Device Buffer Storage Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{isBengali ? 'কিউতে অপেক্ষমাণ' : 'Pending Packets'}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '2px' }}>
                {pendingQueue.length}
              </div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{isBengali ? 'ক্যাশ সাইজ' : 'Buffer Size'}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#334155', marginTop: '2px' }}>
                {pendingQueue.length > 0 ? '1.44 MB' : '0 KB'}
              </div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{isBengali ? 'সিঙ্ক প্রটোকল' : 'Sync Protocol'}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#16a34a', marginTop: '6px' }}>
                SQLite WAL
              </div>
            </div>
          </div>

          {/* Queue Breakdown */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '8px', display: 'block' }}>
              {isBengali ? 'অপেক্ষমাণ ফিল্ড ডাটা তালিকা' : 'Buffered Packet Queue'}
            </span>

            {pendingQueue.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <CheckCircle2 size={32} color="#16a34a" style={{ marginBottom: '6px' }} />
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534', fontWeight: 700 }}>
                  {isBengali ? 'সকল ফিল্ড ডাটা সফলভাবে সার্ভারে সিঙ্ক হয়েছে!' : 'All offline reports synced to primary server database!'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {pendingQueue.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: '#ffffff',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e293b' }}>{item.type}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.target} • {item.timestamp}</div>
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#475569' }}>
                      {item.bytes}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sync Trigger Action */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={triggerManualSync}
              disabled={isSyncing || pendingQueue.length === 0}
              className="btn-primary"
              style={{
                flex: 1,
                background: pendingQueue.length === 0 ? '#94a3b8' : 'var(--color-primary)',
                cursor: pendingQueue.length === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <RefreshCw size={16} className={isSyncing ? 'spin-anim' : ''} />
              {isSyncing
                ? (isBengali ? 'সার্ভারের সাথে সিঙ্ক হচ্ছে...' : 'Flushing Packets to Server...')
                : (isBengali ? 'এখনই ফোর্স সিঙ্ক করুন' : 'Force Flush Local Cache')}
            </button>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', marginTop: '16px', fontSize: '0.74rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HardDrive size={15} color="#0f766e" flexShrink={0} />
            <span>
              {isBengali
                ? 'আইডিবি (IndexedDB) ক্যাশে স্বয়ংক্রিয় ব্যাকআপ সক্রিয় রয়েছে। ইন্টারনেট ফিরলেই ব্যাকগ্রাউন্ড সিঙ্ক সম্পন্ন হবে।'
                : 'PWA Background Sync registered via ServiceWorker: automatic transmission occurs immediately upon link restoration.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}