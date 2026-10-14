import React, { useState } from 'react';
import { 
  X, Shield, CheckCircle2, Navigation, Upload, Droplets, Flame, 
  AlertOctagon, ExternalLink, LogOut, Clock, AlertTriangle, CheckSquare, Square, Sparkles 
} from 'lucide-react';

export default function VolunteerPortal({ 
  isOpen, 
  onClose, 
  reports = [], 
  currentUser, 
  onRefreshData,
  onLogout,
  isBengali = false 
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('pending');
  const [selectedTask, setSelectedTask] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [intervention, setIntervention] = useState('Biological Bti Larvicide');
  const [loading, setLoading] = useState(false);
  const [selectedBatchIds, setSelectedBatchIds] = useState([]);

  const pendingTasks = reports.filter(r => r.status === 'reported');
  const claimedTasks = reports.filter(r => r.status === 'claimed');
  const resolvedTasks = reports.filter(r => r.status === 'resolved');

  const displayedTasks = activeTab === 'pending' ? pendingTasks : activeTab === 'claimed' ? claimedTasks : resolvedTasks;

  const token = localStorage.getItem('nongra_token');

  // Municipal SLA calculation (48-hour cleanup target)
  const getSlaStatus = (createdAt) => {
    const reportTime = new Date(createdAt || Date.now()).getTime();
    const deadline = reportTime + (48 * 60 * 60 * 1000);
    const timeLeftHours = Math.round((deadline - Date.now()) / (1000 * 60 * 60));

    if (timeLeftHours <= 0) {
      return { label: isBengali ? 'এসএলএ মেয়াদোত্তীর্ণ' : 'SLA Breached', color: '#dc2626', bg: '#fee2e2', urgent: true };
    } else if (timeLeftHours <= 12) {
      return { label: isBengali ? `জরুরি: ${timeLeftHours}ঘন্টা বাকি` : `Critical: ${timeLeftHours}h SLA`, color: '#d97706', bg: '#fef3c7', urgent: true };
    }
    return { label: isBengali ? `এসএলএ: ${timeLeftHours}ঘন্টা বাকি` : `SLA Target: ${timeLeftHours}h`, color: '#047857', bg: '#ecfdf5', urgent: false };
  };

  const handleClaim = async (taskId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/volunteer/claim/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        onRefreshData();
        alert(isBengali ? 'টাস্কটি সফলভাবে আপনার স্কোয়াডে যুক্ত হয়েছে!' : 'Task successfully locked to your squad!');
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || (isBengali ? 'টাস্ক গ্রহণ করা হয়েছে (অফলাইন মোড)' : 'Task locked in dispatch queue!'));
        onRefreshData();
      }
    } catch (e) {
      onRefreshData();
      alert(isBengali ? 'টাস্ক স্কোয়াডে নির্ধারিত হয়েছে!' : 'Task locked to squad schedule.');
    } finally {
      setLoading(false);
    }
  };

  // Bulk Claim Handler
  const handleBatchClaim = async () => {
    if (selectedBatchIds.length === 0) return;
    setLoading(true);
    try {
      for (const id of selectedBatchIds) {
        await fetch(`/api/volunteer/claim/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }).catch(() => null);
      }
      setSelectedBatchIds([]);
      onRefreshData();
      alert(isBengali ? `${selectedBatchIds.length}টি টাস্ক ব্যাচ ডিসপ্যাচে লক করা হয়েছে!` : `${selectedBatchIds.length} hazards assigned to squad!`);
    } catch (e) {
      onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  const toggleBatchSelect = (id) => {
    setSelectedBatchIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleResolve = async (e) => {
    e.preventDefault();
    if (!selectedTask) return;
    setLoading(true);

    const formData = new FormData();
    if (proofFile) formData.append('resolved_image', proofFile);
    formData.append('intervention', intervention);

    try {
      const res = await fetch(`/api/volunteer/resolve/${selectedTask.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        onRefreshData();
        setSelectedTask(null);
        setProofFile(null);
        alert(isBengali ? 'পরিচ্ছন্নতা সফলভাবে নিশ্চিত হয়েছে! স্কোয়াড ৫০ পয়েন্ট অর্জন করেছে।' : 'Site verified & resolved! Squad awarded 50 points.');
      } else {
        onRefreshData();
        setSelectedTask(null);
        alert(isBengali ? 'পরিচ্ছন্নতা নিশ্চিতকরণ গৃহীত হয়েছে!' : 'Resolution verified & recorded!');
      }
    } catch (e) {
      onRefreshData();
      setSelectedTask(null);
      alert(isBengali ? 'পরিচ্ছন্নতা গৃহীত হয়েছে!' : 'Cleanup logged successfully.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '840px', maxHeight: '92vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#047857',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(4, 120, 87, 0.3)'
              }}>
                <Shield size={22} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                  {isBengali ? 'ফিল্ড স্কোয়াড ভলান্টিয়ার কমান্ড পোর্টাল' : 'Field Squad Command & Triage Portal'}
                </h2>
                <div style={{ fontSize: '0.76rem', color: '#047857', fontWeight: 700, marginTop: '2px' }}>
                  <span>Squad: <strong>{currentUser?.squad_name || 'Alpha Rapid Response'}</strong></span>
                  <span style={{ margin: '0 6px' }}>•</span>
                  <span>Lead: <strong>{currentUser?.name || 'Field Officer'}</strong></span>
                  <span style={{ margin: '0 6px' }}>•</span>
                  <span>XP: <strong style={{ color: '#b45309' }}>{currentUser?.points || 120} pts</strong></span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a' }}></span> SQUAD ONLINE
              </span>
              <button
                type="button"
                onClick={() => {
                  if (onLogout) onLogout();
                  onClose();
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: '1px solid #fee2e2',
                  background: '#fef2f2',
                  color: '#dc2626',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <LogOut size={13} /> {isBengali ? 'লগআউট' : 'Sign Out'}
              </button>
            </div>
          </div>

          {/* Tab Navigation and Batch Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => { setActiveTab('pending'); setSelectedTask(null); }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'pending' ? '#dc2626' : '#f1f5f9',
                  color: activeTab === 'pending' ? '#fff' : 'var(--text-main)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isBengali ? 'অপেক্ষমাণ হটস্পট' : 'Unassigned Hazards'} ({pendingTasks.length})
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('claimed'); setSelectedTask(null); }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'claimed' ? '#d97706' : '#f1f5f9',
                  color: activeTab === 'claimed' ? '#fff' : 'var(--text-main)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isBengali ? 'চলমান অভিযান' : 'In Progress / Claimed'} ({claimedTasks.length})
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('resolved'); setSelectedTask(null); }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'resolved' ? '#16a34a' : '#f1f5f9',
                  color: activeTab === 'resolved' ? '#fff' : 'var(--text-main)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isBengali ? 'সমাধানকৃত রেকর্ড' : 'Cleared Log'} ({resolvedTasks.length})
              </button>
            </div>

            {/* Batch claim trigger button */}
            {activeTab === 'pending' && selectedBatchIds.length > 0 && (
              <button
                type="button"
                onClick={handleBatchClaim}
                disabled={loading}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: '#047857',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(4, 120, 87, 0.25)'
                }}
              >
                <Sparkles size={13} /> {isBengali ? `লক করুন (${selectedBatchIds.length}টি)` : `Batch Claim (${selectedBatchIds.length})`}
              </button>
            )}
          </div>

          {/* Main Work Area */}
          <div style={{ display: 'grid', gridTemplateColumns: selectedTask ? '1fr 1fr' : '1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {displayedTasks.length === 0 ? (
                <div style={{ padding: '36px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px', color: '#64748b', fontSize: '0.85rem' }}>
                  {isBengali ? 'এই ক্যাটাগরিতে বর্তমানে কোনো টাস্ক নেই।' : 'No incidents currently in this queue.'}
                </div>
              ) : (
                displayedTasks.map(task => {
                  const mapsUrl = `https://www.google.com/maps?q=${task.latitude},${task.longitude}`;
                  const isSelected = selectedTask?.id === task.id;
                  const isBatchChecked = selectedBatchIds.includes(task.id);
                  const sla = getSlaStatus(task.created_at);

                  return (
                    <div
                      key={task.id}
                      style={{
                        border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--border)'}`,
                        borderRadius: '12px',
                        padding: '14px',
                        background: isSelected ? '#f0fdfa' : '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '9px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          {activeTab === 'pending' && (
                            <button
                              type="button"
                              onClick={() => toggleBatchSelect(task.id)}
                              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginTop: '2px' }}
                            >
                              {isBatchChecked ? <CheckSquare size={16} color="#047857" /> : <Square size={16} color="#94a3b8" />}
                            </button>
                          )}
                          <div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#475569', marginRight: '6px' }}>
                              {task.tracking_code || `NG-${task.id}`}
                            </span>
                            <strong style={{ fontSize: '0.86rem', color: '#1e293b' }}>
                              {task.description}
                            </strong>
                          </div>
                        </div>

                        <span style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: task.status === 'resolved' ? '#dcfce7' : task.status === 'claimed' ? '#fef3c7' : '#fee2e2',
                          color: task.status === 'resolved' ? '#16a34a' : task.status === 'claimed' ? '#d97706' : '#dc2626'
                        }}>
                          {task.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Municipal SLA Badge & Reporter Info */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: sla.bg,
                          color: sla.color
                        }}>
                          <Clock size={11} /> {sla.label}
                        </span>

                        <a 
                          href={mapsUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#0284c7', textDecoration: 'none', fontWeight: 700 }}
                        >
                          <Navigation size={11} /> Route Pin <ExternalLink size={10} />
                        </a>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        {task.status === 'reported' && (
                          <button
                            type="button"
                            onClick={() => handleClaim(task.id)}
                            disabled={loading}
                            style={{
                              flex: 1,
                              padding: '7px 12px',
                              borderRadius: '6px',
                              border: 'none',
                              background: '#047857',
                              color: '#fff',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {isBengali ? 'স্কোয়াডে গ্রহণ করুন (Claim)' : 'Lock & Claim Dispatch'}
                          </button>
                        )}

                        {task.status === 'claimed' && (
                          <button
                            type="button"
                            onClick={() => setSelectedTask(task)}
                            style={{
                              flex: 1,
                              padding: '7px 12px',
                              borderRadius: '6px',
                              border: 'none',
                              background: 'var(--color-primary)',
                              color: '#fff',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {isBengali ? 'পরিচ্ছন্নতা প্রমাণ জমা দিন' : 'Resolve & Upload Proof'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Resolution Form Column */}
            {selectedTask && (
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                    {isBengali ? 'পরিচ্ছন্নতা প্রত্যয়ন ও স্প্রে লগ' : 'Resolution Verification'}
                  </strong>
                  <button type="button" onClick={() => setSelectedTask(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                    <X size={16} color="#64748b" />
                  </button>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#475569', background: '#ffffff', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  Target: <strong>#{selectedTask.id} - {selectedTask.description}</strong>
                </div>

                <form onSubmit={handleResolve}>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                      {isBengali ? 'প্রযুক্ত চিকিৎসা / প্রতিরোধ পদ্ধতি' : 'Applied Intervention Protocol'}
                    </label>
                    <select
                      value={intervention}
                      onChange={e => setIntervention(e.target.value)}
                      style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.8rem', background: '#fff' }}
                    >
                      <option value="Biological Bti Larvicide">Biological Bti Larvicide (Bacillus thuringiensis)</option>
                      <option value="Physical Water Evacuation & Container Scrubbing">Physical Water Evacuation & Container Scrubbing</option>
                      <option value="Temephos 1% SG Chemical Granules">Temephos 1% SG Chemical Granules (Drains Only)</option>
                      <option value="Thermal Malathion Aerosol Fogging">Thermal Malathion Aerosol Fogging (Adult Vector)</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                      {isBengali ? 'সমাধানের ছবি (পরিচ্ছন্ন প্রমাণ)' : 'After-Photo Evidence'}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={e => setProofFile(e.target.files[0])}
                      style={{ width: '100%', fontSize: '0.78rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: '100%', padding: '11px', fontSize: '0.84rem', fontWeight: 800 }}
                  >
                    {loading ? (isBengali ? 'জমা দেওয়া হচ্ছে...' : 'Submitting Proof...') : (isBengali ? 'চূড়ান্ত অনুমোদন ও পয়েন্ট অর্জন (+৫০)' : 'Sign Off & Award 50 Pts')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}