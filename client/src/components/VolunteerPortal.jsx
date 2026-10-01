import React, { useState } from 'react';
import { X, Shield, CheckCircle2, Navigation, Upload, Droplets, Flame, AlertOctagon, ExternalLink, LogOut } from 'lucide-react';

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

  const pendingTasks = reports.filter(r => r.status === 'reported');
  const claimedTasks = reports.filter(r => r.status === 'claimed');
  const resolvedTasks = reports.filter(r => r.status === 'resolved');

  const displayedTasks = activeTab === 'pending' ? pendingTasks : activeTab === 'claimed' ? claimedTasks : resolvedTasks;

  const token = localStorage.getItem('nongra_token');

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
        alert(isBengali ? 'টাস্কটি সফলভাবে আপনার স্কোয়াডে যুক্ত হয়েছে!' : 'Task successfully locked to your squad!');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to claim task');
      }
    } catch (e) {
      alert('Network error claiming task');
    } finally {
      setLoading(false);
    }
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
        alert(isBengali ? 'পরিচ্ছন্নতা সফলভাবে নিশ্চিত হয়েছে! স্কোয়াড ৫০ পয়েন্ট অর্জন করেছে।' : 'Site verified & resolved! Squad awarded 50 points.');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to resolve task');
      }
    } catch (e) {
      alert('Network error submitting resolution');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '92vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#047857',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield size={22} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                  {isBengali ? 'ফিল্ড স্কোয়াড ভলান্টিয়ার কমান্ড পোর্টাল' : 'Field Squad Command & Triage Portal'}
                </h2>
                <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: 700 }}>
                  {currentUser?.squad_name || 'Active Squad Alpha'} • Personnel: {currentUser?.name} • Points: {currentUser?.points || 0}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', background: '#dcfce7', color: '#15803d' }}>
                ● SQUAD LOGGED IN
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

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
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

          {/* Main Work Area */}
          <div style={{ display: 'grid', gridTemplateColumns: selectedTask ? '1fr 1fr' : '1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {displayedTasks.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', background: '#f8fafc', borderRadius: '10px', color: '#64748b', fontSize: '0.85rem' }}>
                  {isBengali ? 'এই ক্যাটাগরিতে কোনো টাস্ক নেই।' : 'No incidents currently in this queue.'}
                </div>
              ) : (
                displayedTasks.map(task => {
                  const mapsUrl = `https://www.google.com/maps?q=${task.latitude},${task.longitude}`;
                  const isSelected = selectedTask?.id === task.id;

                  return (
                    <div
                      key={task.id}
                      style={{
                        border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--border)'}`,
                        borderRadius: '10px',
                        padding: '12px 14px',
                        background: isSelected ? '#f0fdfa' : '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        transition: 'border-color 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#475569', marginRight: '6px' }}>
                            {task.tracking_code || `NG-${task.id}`}
                          </span>
                          <strong style={{ fontSize: '0.85rem', color: '#1e293b' }}>
                            {task.description}
                          </strong>
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

                      <div style={{ fontSize: '0.74rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Reported by: <strong>{task.reporter_name || 'Anonymous Citizen'}</strong></span>
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#0284c7', textDecoration: 'none', fontWeight: 700 }}>
                          <Navigation size={11} /> GPS Pin <ExternalLink size={10} />
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
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: 'none',
                              background: '#047857',
                              color: '#fff',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {isBengali ? 'স্কোয়াডে গ্রহণ করুন (Claim)' : 'Lock & Claim Dispatch'}
                          </button>
                        )}

                        {task.status === 'claimed' && (
                          <button
                            type="button"
                            onClick={() => setSelectedTask(task)}
                            style={{
                              flex: 1,
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: 'none',
                              background: 'var(--color-primary)',
                              color: '#fff',
                              fontSize: '0.76rem',
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
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>
                    {isBengali ? 'পরিচ্ছন্নতা প্রত্যয়ন ও স্প্রে লগ' : 'Resolution Verification'}
                  </strong>
                  <button type="button" onClick={() => setSelectedTask(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                    <X size={16} color="#64748b" />
                  </button>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#475569' }}>
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
                      style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.8rem', background: '#fff' }}
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
                    style={{ width: '100%', padding: '10px', fontSize: '0.82rem' }}
                  >
                    {loading ? (isBengali ? 'জমা দেওয়া হচ্ছে...' : 'Submitting Proof...') : (isBengali ? 'চূড়ান্ত অনুমোদন ও পয়েন্ট অর্জন' : 'Sign Off & Earn 50 Pts')}
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