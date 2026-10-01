import React from 'react';
import { Award, Shield, CheckCircle2, User, Trophy, Download, Printer, LogOut, LogIn, ExternalLink } from 'lucide-react';

export default function ProfileView({ 
  user, 
  leaderboard = [], 
  reports = [], 
  onLogout,
  onOpenAuth,
  isBengali = false 
}) {
  const isGuest = !user || !user.email;
  const isVolunteer = user?.role === 'volunteer';

  // Compute live user metrics
  const myReports = reports.filter(r => r.reporter_id === user?.id || (isGuest && r.reporter_name === 'Anonymous Citizen'));
  const myResolved = isVolunteer 
    ? reports.filter(r => r.status === 'resolved' && (r.claimed_by === user?.id || r.claimed_squad === user?.squad_name)).length
    : reports.filter(r => r.status === 'resolved' && (r.reporter_id === user?.id)).length;

  const userPoints = user?.points || (isGuest ? 0 : 50);

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="profile-view-container" style={{ paddingBottom: '80px' }}>
      {/* 1. Header Card */}
      <div style={{
        background: isVolunteer 
          ? 'linear-gradient(135deg, #064e3b 0%, #047857 100%)' 
          : isGuest 
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: '16px',
        padding: '24px',
        color: '#ffffff',
        marginBottom: '20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              {isVolunteer ? <Shield size={32} /> : <User size={32} />}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: isVolunteer ? '#10b981' : isGuest ? '#64748b' : '#38bdf8',
                  color: isVolunteer ? '#064e3b' : '#ffffff'
                }}>
                  {isVolunteer ? 'Field Volunteer Squad' : isGuest ? 'Guest Mode' : 'Resident Citizen'}
                </span>
                {isVolunteer && <span style={{ fontSize: '0.72rem', color: '#a7f3d0' }}>● Active Responder</span>}
              </div>

              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900 }}>
                {user?.name || (isBengali ? 'গেস্ট নাগরিক' : 'Guest Citizen')}
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                {user?.squad_name ? `${user.squad_name} • ` : ''}{user?.email || (isBengali ? 'লগইন ছাড়াই পরিচালিত' : 'Unauthenticated session')}
              </div>
            </div>
          </div>

          {/* Points & Action */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#38bdf8', lineHeight: 1 }}>
              {userPoints}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {isBengali ? 'অর্জিত পয়েন্ট' : 'Civic Impact Points'}
            </div>

            <div style={{ marginTop: '12px' }}>
              {isGuest ? (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: 'none',
                    background: '#38bdf8',
                    color: '#0f172a',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  <LogIn size={13} /> {isBengali ? 'লগইন / রেজিস্টার' : 'Sign In Account'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onLogout}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={12} /> {isBengali ? 'লগআউট' : 'Sign Out'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Three Metric Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '22px' }}>
        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#dc2626' }}>
            {myReports.length}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>
            {isBengali ? 'মোট রিপোর্ট' : 'Filed Hazards'}
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#16a34a' }}>
            {myResolved}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>
            {isVolunteer ? (isBengali ? 'সমাধানকৃত সাইট' : 'Cleared Sites') : (isBengali ? 'সমাধানকৃত' : 'Resolved')}
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0284c7' }}>
            {isVolunteer ? 'Tier 1' : userPoints > 100 ? 'Guardian' : 'Contributor'}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>
            {isBengali ? 'কমিউনিটি র‍্যাংক' : 'Civic Rank'}
          </div>
        </div>
      </div>

      {/* 3. Official Municipal & DGHS Certificate */}
      <div style={{
        background: '#ffffff',
        border: '2px solid #059669',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        marginBottom: '24px',
        boxShadow: '0 4px 16px rgba(5,150,105,0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="#059669" />
            <strong style={{ fontSize: '0.9rem', color: '#064e3b', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {isBengali ? 'ডিজিএইচএস জনস্বাস্থ্য প্রতিরোধ সনদ' : 'DGHS & Municipal Recognition Certificate'}
            </strong>
          </div>

          <button
            type="button"
            onClick={handlePrintCertificate}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Printer size={13} /> {isBengali ? 'প্রিন্ট / সেভ' : 'Print Certificate'}
          </button>
        </div>

        <div style={{
          border: '1px dashed #a7f3d0',
          borderRadius: '10px',
          padding: '18px',
          background: '#f0fdf4',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.7rem', color: '#065f46', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            GOVERNMENT SANITARY & VECTOR TASKFORCE
          </div>
          <h3 style={{ margin: '6px 0 4px', fontSize: '1.2rem', fontWeight: 900, color: '#064e3b' }}>
            CERTIFICATE OF CIVIC EPIDEMIOLOGICAL CITATION
          </h3>
          <p style={{ margin: '0 auto 12px', maxWidth: '500px', fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>
            {isBengali
              ? `এই সনদটি নিশ্চিত করে যে ${user?.name || 'নাগরিক'}, আশুলিয়া ও ডিআইইউ ক্যাম্পাস এলাকায় এডিস মশার প্রজননস্থল প্রতিরোধ ও পরিচ্ছন্নতা অভিযানে সক্রিয়ভাবে অংশ নিয়েছেন।`
              : `Presented to ${user?.name || 'Registered Resident'} in official recognition of proactive vector hazard remediation, Breteau Index containment, and community health protection in Ashulia.`}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.74rem', color: '#047857', fontWeight: 700 }}>
            <span>Registry ID: NONGRA-{user?.id || 'GUEST'}-2026</span>
            <span>•</span>
            <span>Status: Verified Civic Contributor</span>
          </div>
        </div>
      </div>

      {/* 4. Volunteer Leaderboard Table */}
      <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={18} color="#d97706" />
            <strong style={{ fontSize: '0.9rem', color: '#1e293b' }}>
              {isBengali ? 'সেরা ভলান্টিয়ার ও স্কোয়াড লিডারবোর্ড' : 'Top Volunteer Squads & Responders'}
            </strong>
          </div>
          <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
            Live Regional Rankings
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {leaderboard.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
              Loading squad leaderboard...
            </div>
          ) : (
            leaderboard.map((leader, idx) => (
              <div
                key={leader.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: idx === 0 ? '#fef3c7' : idx === 1 ? '#f1f5f9' : '#ffffff',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: idx === 0 ? '#d97706' : '#64748b',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 900
                  }}>
                    {idx + 1}
                  </span>
                  <div>
                    <strong style={{ fontSize: '0.82rem', color: '#1e293b' }}>
                      {leader.username || leader.name}
                    </strong>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                      {leader.squad_name || (leader.role === 'volunteer' ? 'Field Squad' : 'Citizen')}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                    {leader.points || 0}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', marginLeft: '4px' }}>pts</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}