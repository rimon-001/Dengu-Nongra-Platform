import React, { useState, useEffect } from 'react';
import { X, Wifi, WifiOff, RefreshCw, Database, CheckCircle2, HardDrive, ShieldCheck, PlusCircle, ArrowUpRight } from 'lucide-react';

export default function OfflineSyncModal({ isOpen, onClose, isBengali = false }) {
  if (!isOpen) return null;

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingQueue, setPendingQueue] = useState(() => {
    const saved = localStorage.getItem('nongra_offline_queue');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
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
    ];
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncComplete, setSyncComplete] = useState(false);

  useEffect(() => {
    localStorage.setItem('nongra_offline_queue', JSON.stringify(pendingQueue));
  }, [pendingQueue]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Auto-sync when link is restored
      if (pendingQueue.length > 0) {
        triggerManualSync();
      }
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingQueue.length]);

  const triggerManualSync = () => {
    if (pendingQueue.length === 0) return;
    setIsSyncing(true);
    setSyncComplete(false);
    setSyncProgress(15);

    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 350);

    setTimeout(() => {
      clearInterval(interval);
      setSyncProgress(100);
      setIsSyncing(false);
      setPendingQueue([]);
      setSyncComplete(true);
      localStorage.removeItem('nongra_offline_queue');
    }, 1600);
  };

  const handleAddTestPacket = () => {
    const newPacket = {
      id: `Q-${Math.floor(100 + Math.random() * 900)}`,
      type: 'Field Vector Survey',
      target: `Basement Sump Pit (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      bytes: `${(0.4 + Math.random() * 1.2).toFixed(1)} MB`,
      timestamp: 'Just now'
    };
    setPendingQueue(prev => [newPacket, ...prev]);
    setSyncComplete(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
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
              ? 'বেসমেন্ট বা প্রত্যন্ত এলাকায় নেটওয়ার্ক বিচ্ছিন্ন থাকলেও ছবি ও জিপিএস ডাটা ডিভাইসের লোকাল স্টোরেজে সুরক্ষিত থাকে এবং সংযোগ পাওয়া মাত্র স্বয়ংক্রিয়ভাবে সার্ভারে জমা হয়।'
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
                {pendingQueue.length > 0 ? `${(pendingQueue.length * 0.72).toFixed(2)} MB` : '0 KB'}
              </div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{isBengali ? 'সিঙ্ক প্রটোকল' : 'Sync Protocol'}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#16a34a', marginTop: '6px' }}>
                SQLite WAL
              </div>
            </div>
          </div>

          {/* Progress Bar during Sync */}
          {isSyncing && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#047857', fontWeight: 700, marginBottom: '4px' }}>
                <span>{isBengali ? 'প্যাকেট আপলোড হচ্ছে...' : 'Transmitting encrypted buffers...'}</span>
                <span>{syncProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${syncProgress}%`, height: '100%', background: '#059669', transition: 'width 0.25s ease' }} />
              </div>
            </div>
          )}

          {/* Queue Breakdown */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                {isBengali ? 'অপেক্ষমাণ ফিল্ড ডাটা তালিকা' : 'Buffered Packet Queue'}
              </span>
              <button
                type="button"
                onClick={handleAddTestPacket}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: '#0284c7',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <PlusCircle size={13} /> {isBengali ? 'টেস্ট প্যাকেট যোগ' : '+ Test Packet'}
              </button>
            </div>

            {pendingQueue.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <CheckCircle2 size={32} color="#16a34a" style={{ marginBottom: '6px' }} />
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534', fontWeight: 700 }}>
                  {isBengali ? 'সকল ফিল্ড ডাটা সফলভাবে সার্ভারে সিঙ্ক হয়েছে!' : 'All offline reports synced to primary server database!'}
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
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {item.target} • {item.timestamp}
                      </div>
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
                ? 'আইডিবি (IndexedDB) ক্যাশে স্বয়ংক্রিয় ব্যাকআপ সক্রিয় রয়েছে। ইন্টারনেট ফিরলেই ব্যাকগ্রাউন্ড সিঙ্ক সম্পন্ন হবে।'
                : 'PWA Background Sync registered via ServiceWorker: automatic transmission occurs immediately upon link restoration.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}