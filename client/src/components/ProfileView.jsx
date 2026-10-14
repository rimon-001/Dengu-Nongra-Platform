import React, { useRef } from 'react';
import { 
  Award, Shield, CheckCircle2, User, Trophy, Download, 
  Printer, LogOut, LogIn, ExternalLink, QrCode, Sparkles, Flame, Target, Star, ShieldCheck
} from 'lucide-react';

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

  // Dynamic Badge Tier Calculation
  const getBadgeTier = (pts) => {
    if (pts >= 500) {
      return {
        nameEn: 'Platinum Sentinel',
        nameBn: 'প্লাটিনাম সেন্টিনেল',
        icon: '💎',
        color: '#7c3aed',
        bg: '#faf5ff',
        border: '#c084fc',
        nextTarget: 1000
      };
    }
    if (pts >= 250) {
      return {
        nameEn: 'Gold Sentinel',
        nameBn: 'গোল্ড সেন্টিনেল (Gold Badge)',
        icon: '🥇',
        color: '#d97706',
        bg: '#fffbeb',
        border: '#fde68a',
        nextTarget: 500
      };
    }
    if (pts >= 100) {
      return {
        nameEn: 'Silver Guardian',
        nameBn: 'সিলভার গার্ডিয়ান (Silver Badge)',
        icon: '🥈',
        color: '#475569',
        bg: '#f8fafc',
        border: '#cbd5e1',
        nextTarget: 250
      };
    }
    return {
      nameEn: 'Bronze Contributor',
      nameBn: 'ব্রোঞ্জ কন্ট্রিবিউটর (Bronze Badge)',
      icon: '🥉',
      color: '#b45309',
      bg: '#fff7ed',
      border: '#fed7aa',
      nextTarget: 100
    };
  };

  const badgeTier = getBadgeTier(userPoints);
  const nextTarget = badgeTier.nextTarget;
  const progressPercent = Math.min(100, Math.round((userPoints / nextTarget) * 100));

  // Targeted Single-Page Certificate Print Generator
  const handlePrintCertificate = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=650');
    if (!printWindow) {
      window.print();
      return;
    }

    const recipientName = user?.name || (isBengali ? 'নাগরিক পরিদর্শক' : 'Civic Contributor');
    const squadTitle = user?.squad_name ? `Squad: ${user.squad_name}` : (isVolunteer ? 'Field Squad Taskforce' : 'Resident Surveillance Cell');
    const trackingCode = `NONGRA-${user?.id || 'CITIZEN'}-2026-CERT`;
    const issueDate = new Date().toLocaleDateString(isBengali ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Nongra Official Citation Certificate - ${recipientName}</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          * {
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          }
          body {
            margin: 0;
            padding: 0;
            background: #ffffff;
            color: #0f172a;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .certificate-frame {
            width: 100%;
            max-width: 960px;
            border: 6px double #059669;
            padding: 32px 40px;
            background: #ffffff;
            position: relative;
            box-shadow: none;
            border-radius: 8px;
            text-align: center;
          }
          .header-crest {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 8px;
          }
          .emblem {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: #047857;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            font-weight: bold;
            border: 2px solid #059669;
          }
          .govt-title {
            font-size: 13px;
            font-weight: 800;
            color: #065f46;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 2px;
          }
          .cert-main-title {
            font-size: 26px;
            font-weight: 900;
            color: #064e3b;
            margin: 8px 0;
            letter-spacing: -0.5px;
          }
          .cert-subtitle {
            font-size: 12px;
            color: #64748b;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 24px;
          }
          .citation-body {
            font-size: 14px;
            line-height: 1.6;
            color: #334155;
            max-width: 740px;
            margin: 0 auto 20px;
          }
          .recipient-highlight {
            font-size: 24px;
            font-weight: 900;
            color: #047857;
            display: block;
            margin: 8px 0 12px 0;
            border-bottom: 2px solid #a7f3d0;
            padding-bottom: 4px;
          }
          .badge-row {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #f0fdf4;
            border: 1.5px solid #86efac;
            padding: 6px 18px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 800;
            color: #166534;
            margin-bottom: 28px;
          }
          .footer-grid {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 30px;
            padding-top: 16px;
            border-top: 1px dashed #cbd5e1;
            font-size: 11px;
            color: #64748b;
          }
          .signature-box {
            text-align: center;
            width: 200px;
          }
          .sign-line {
            border-top: 1.5px solid #334155;
            margin-bottom: 4px;
          }
          .hash-stamp {
            text-align: left;
            font-family: monospace;
            font-size: 10px;
            color: #047857;
          }
        </style>
      </head>
      <body>
        <div class="certificate-frame">
          <div class="header-crest">
            <div class="emblem">🛡️</div>
            <div>
              <div class="govt-title">Directorate General of Health Services (DGHS) & Municipal Grid</div>
              <div style="font-size: 11px; font-weight: 700; color: #047857;">National Dengue & Vector Surveillance Mission • Ashulia Sector</div>
            </div>
          </div>

          <div class="cert-main-title">CIVIC EPIDEMIOLOGICAL CITATION</div>
          <div class="cert-subtitle">Official Sanitary Honor & Vector Containment Award</div>

          <div class="citation-body">
            This official civic commendation is proudly presented to
            <span class="recipient-highlight">${recipientName}</span>
            in formal recognition of active participation, Breteau Index container remediation, and steadfast service toward eradicating <em>Aedes aegypti</em> breeding reservoirs within the Daffodil Smart Campus and Ashulia territory.
          </div>

          <div class="badge-row">
            ${badgeTier.icon} Rank Status: ${badgeTier.nameEn} (${userPoints} Verified Civic Points)
          </div>

          <div class="footer-grid">
            <div class="hash-stamp">
              <div><strong>System Hash:</strong> ${trackingCode}</div>
              <div><strong>Issue Date:</strong> ${issueDate}</div>
              <div><strong>Registry:</strong> Verified Municipal Ledger (SHA-256)</div>
            </div>

            <div class="signature-box">
              <div class="sign-line"></div>
              <strong>Dr. M. Rahman</strong><br/>
              Chief Vector Control Epidemiologist<br/>
              DGHS Taskforce
            </div>

            <div class="signature-box">
              <div class="sign-line"></div>
              <strong>Director of Field Services</strong><br/>
              DIU Smart Campus Environment Cell<br/>
              Ashulia, Dhaka
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 600);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(certificateHTML);
    printWindow.document.close();
  };

  return (
    <div className="profile-view-container" style={{ paddingBottom: '80px' }}>
      {/* 1. Header Card with Dynamic Badge Pill */}
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
              color: '#ffffff',
              fontSize: '1.8rem'
            }}>
              {badgeTier.icon}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
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

                {/* Badge Rank Pill */}
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: '#fef3c7',
                  color: '#92400e',
                  border: '1px solid #fde68a'
                }}>
                  {badgeTier.icon} {isBengali ? badgeTier.nameBn : badgeTier.nameEn}
                </span>
              </div>

              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900 }}>
                {user?.name || (isBengali ? 'গেস্ট নাগরিক' : 'Guest Citizen')}
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                {user?.squad_name ? `${user.squad_name} • ` : ''}
                {user?.email || (isBengali ? 'লগইন ছাড়াই পরিচালিত (গেস্ট মোড)' : 'Unauthenticated session (Guest Mode)')}
              </div>
            </div>
          </div>

          {/* Points & Auth Switcher */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#38bdf8', lineHeight: 1 }}>
              {userPoints}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {isBengali ? 'মোট অর্জিত পয়েন্ট' : 'Accumulated Civic Points'}
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

        {/* Level Progression Progress Bar */}
        <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '4px' }}>
            <span>
              {isBengali ? `পরবর্তী টার্গেট: ${nextTarget} পয়েন্ট` : `Next Badge Tier: ${nextTarget} pts target`}
            </span>
            <strong>{progressPercent}%</strong>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: '#38bdf8', borderRadius: '4px' }} />
          </div>
        </div>
      </div>

      {/* 2. Three Metric Stats Cards */}
      <div className="metrics-summary-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '22px' }}>
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
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: badgeTier.color }}>
            {badgeTier.icon} {userPoints >= 250 ? 'Gold' : userPoints >= 100 ? 'Silver' : 'Bronze'}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>
            {isBengali ? 'প্রোফাইল ব্যাজ' : 'Profile Badge'}
          </div>
        </div>
      </div>

      {/* 3. Official Municipal & DGHS Certificate */}
      <div 
        id="nongra-certificate-card"
        style={{
          background: '#ffffff',
          border: '2px solid #059669',
          borderRadius: '16px',
          padding: '24px',
          position: 'relative',
          marginBottom: '24px',
          boxShadow: '0 4px 16px rgba(5,150,105,0.06)'
        }}
      >
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
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#ecfdf5',
              border: '1.5px solid #059669',
              color: '#065f46',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease'
            }}
          >
            <Printer size={14} /> {isBengali ? 'সনদ প্রিন্ট করুন' : 'Print Certificate'}
          </button>
        </div>

        <div style={{
          border: '1px dashed #a7f3d0',
          borderRadius: '10px',
          padding: '20px',
          background: '#f0fdf4',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ fontSize: '0.7rem', color: '#065f46', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            GOVERNMENT SANITARY & VECTOR TASKFORCE
          </div>
          <h3 style={{ margin: '6px 0 4px', fontSize: '1.25rem', fontWeight: 900, color: '#064e3b' }}>
            CERTIFICATE OF CIVIC EPIDEMIOLOGICAL CITATION
          </h3>
          <p style={{ margin: '0 auto 12px', maxWidth: '520px', fontSize: '0.82rem', color: '#334155', lineHeight: 1.55 }}>
            {isBengali
              ? `এই সনদটি নিশ্চিত করে যে ${user?.name || 'নাগরিক'}, আশুলিয়া ও ডিআইইউ ক্যাম্পাস এলাকায় এডিস মশার প্রজননস্থল প্রতিরোধ ও পরিচ্ছন্নতা অভিযানে সক্রিয়ভাবে অংশ নিয়েছেন।`
              : `Presented to ${user?.name || 'Registered Resident'} in official recognition of proactive vector hazard remediation, Breteau Index containment, and community health protection in Ashulia.`}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', fontSize: '0.76rem', color: '#047857', fontWeight: 700, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <QrCode size={14} /> Hash: NONGRA-{user?.id || 'GUEST'}-2026
            </span>
            <span>•</span>
            <span>Status: Verified Civic Contributor</span>
            <span>•</span>
            <span style={{ color: badgeTier.color }}>Badge: {badgeTier.nameEn}</span>
          </div>
        </div>
      </div>

      {/* 4. Volunteer Leaderboard Table */}
      <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={18} color="#d97706" />
            <strong style={{ fontSize: '0.9rem', color: '#1e293b' }}>
              {isBengali ? 'সেরা ভলান্টিয়ার ও স্কোয়াড লিডারবোর্ড' : 'Top Volunteer Squads & Responders'}
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

      {/* Embedded Print CSS to guarantee clean single-sheet certificate output */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #nongra-certificate-card, #nongra-certificate-card * {
            visibility: visible !important;
          }
          #nongra-certificate-card {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: auto !important;
            margin: 0 !important;
            padding: 24px !important;
            border: 4px double #059669 !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }
          #nongra-certificate-card button {
            display: none !important;
          }
          .bottom-nav, .portal-banner-container, .portal-marquee-bar, .hero-header {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}