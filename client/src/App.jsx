import React, { useState, useEffect, useRef } from 'react';
import HotspotMap from './components/HotspotMap';
import ActivityList from './components/ActivityList';
import TaskModal from './components/TaskModal';
import ReportModal from './components/ReportModal';
import ProfileView from './components/ProfileView';
import WeatherAdvisory from './components/WeatherAdvisory';
import ImpactModal from './components/ImpactModal';
import TriageModal from './components/TriageModal';
import PitchDeckModal from './components/PitchDeckModal';
import PrintDispatchModal from './components/PrintDispatchModal';
import BroadcastModal from './components/BroadcastModal';
import TrendAnalyticsModal from './components/TrendAnalyticsModal';
import WardScorecardModal from './components/WardScorecardModal';
import OfflineSyncModal from './components/OfflineSyncModal';
import InventoryModal from './components/InventoryModal';
import HelplineModal from './components/HelplineModal';
import BreteauCalculatorModal from './components/BreteauCalculatorModal';
import AwarenessModal from './components/AwarenessModal';
import ProximityRadarModal from './components/ProximityRadarModal';
import AuditLogModal from './components/AuditLogModal';
import ClimateSimulatorModal from './components/ClimateSimulatorModal';
import RouteOptimizerModal from './components/RouteOptimizerModal';
import CitizenRatingModal from './components/CitizenRatingModal';
import ExecutiveBriefModal from './components/ExecutiveBriefModal';
import ClearanceCertificateModal from './components/ClearanceCertificateModal';
import CommandHubModal from './components/CommandHubModal';
import ShowcaseRunnerModal from './components/ShowcaseRunnerModal';
import AuthModal from './components/AuthModal';
import VolunteerPortal from './components/VolunteerPortal';
import { 
  Map, Activity, User, Plus, BarChart3, Zap, Navigation, Globe, 
  Presentation, FileText, Radio, LineChart, Building2, RefreshCw, 
  PackageCheck, HeartPulse, Calculator, BookOpen, Radar, ClipboardCheck, 
  CloudRain, Route, Star, FileCheck, ShieldCheck, LayoutGrid, LogIn, Shield, LogOut, Bell
} from 'lucide-react';

const FALLBACK_REPORTS = [
  {
    id: 1,
    tracking_code: 'NG-8812',
    latitude: 23.8768,
    longitude: 90.3201,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
    resolved_image_url: null,
    description: 'Stagnant rain puddle behind cafeteria block',
    status: 'reported',
    claimed_by: null,
    intervention: null,
    created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString()
  },
  {
    id: 2,
    tracking_code: 'NG-8813',
    latitude: 23.8795,
    longitude: 90.3225,
    image_url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=400&q=80',
    resolved_image_url: null,
    description: 'Discarded plastic bottles accumulating larvae near Gate 1',
    status: 'reported',
    claimed_by: null,
    intervention: null,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: 3,
    tracking_code: 'NG-8814',
    latitude: 23.8725,
    longitude: 90.3230,
    image_url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=400&q=80',
    resolved_image_url: null,
    description: 'Clogged municipal drainage conduit beside bus terminal',
    status: 'claimed',
    claimed_by: 1,
    intervention: null,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  }
];

export default function App() {
  const [reports, setReports] = useState(FALLBACK_REPORTS);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newDispatchAlert, setNewDispatchAlert] = useState(null);
  const previousReportCount = useRef(FALLBACK_REPORTS.length);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nongra_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVolunteerPortalOpen, setIsVolunteerPortalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isImpactOpen, setIsImpactOpen] = useState(false);
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isTrendOpen, setIsTrendOpen] = useState(false);
  const [isWardOpen, setIsWardOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isBreteauOpen, setIsBreteauOpen] = useState(false);
  const [isAwarenessOpen, setIsAwarenessOpen] = useState(false);
  const [isRadarOpen, setIsRadarOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isClimateOpen, setIsClimateOpen] = useState(false);
  const [isRouteOpen, setIsRouteOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [isClearanceOpen, setIsClearanceOpen] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);

  const [currentView, setCurrentView] = useState('map');
  const [isBengali, setIsBengali] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchData = async () => {
    try {
      const [reportsRes, usersRes] = await Promise.all([
        fetch('/api/reports').catch(() => null),
        fetch('/api/users/leaderboard').catch(() => null)
      ]);

      if (reportsRes && reportsRes.ok) {
        const data = await reportsRes.json();
        if (Array.isArray(data) && data.length > 0) {
          // Detect new incident arrival for squads
          if (data.length > previousReportCount.current) {
            const newest = data[0];
            setNewDispatchAlert(newest);
            setTimeout(() => setNewDispatchAlert(null), 6000);
          }
          previousReportCount.current = data.length;
          setReports(data);
        }
      }

      if (usersRes && usersRes.ok) {
        const data = await usersRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setUsers(data);
        }
      }
    } catch (err) {
      console.warn('Backend connection warning:', err);
    }
  };

  useEffect(() => {
    fetchData();
    // Background polling interval: 8 seconds
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nongra_token');
    localStorage.removeItem('nongra_user');
    setCurrentUser(null);
    setIsVolunteerPortalOpen(false);
  };

  const handleSimulateReport = () => {
    const randomOffsetLat = (Math.random() - 0.5) * 0.008;
    const randomOffsetLng = (Math.random() - 0.5) * 0.008;
    const newSimulatedReport = {
      id: Date.now(),
      tracking_code: `NG-${Math.floor(1000 + Math.random() * 9000)}`,
      latitude: 23.8759 + randomOffsetLat,
      longitude: 90.3205 + randomOffsetLng,
      image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
      resolved_image_url: null,
      description: isBengali
        ? '⚠️ [সিমুলেশন] উন্মুক্ত ছাদে বৃষ্টির জমে থাকা পানি ও এডিসের লার্ভা'
        : '⚠️ [Simulated] Uncovered rooftop water storage tank with mosquito pupae',
      status: 'reported',
      claimed_by: null,
      intervention: null,
      created_at: new Date().toISOString()
    };

    setReports(prev => [newSimulatedReport, ...prev]);
    setSelectedTask(newSimulatedReport);
  };

  const handleClaim = async (id) => {
    try {
      await fetch(`/api/reports/${id}/claim`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser?.id || 1 })
      });
    } catch (e) {
      console.warn('Fallback update:', e);
    }

    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'claimed', claimed_by: 1 } : r))
    );
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask((prev) => ({ ...prev, status: 'claimed', claimed_by: 1 }));
    }
  };

  const handleResolve = async (id, proofFile, intervention = 'Physical Water Evacuation') => {
    const previewUrl = proofFile ? URL.createObjectURL(proofFile) : null;

    try {
      const formData = new FormData();
      if (proofFile) formData.append('resolved_image', proofFile);
      formData.append('intervention', intervention);

      await fetch(`/api/reports/${id}/resolve`, {
        method: 'POST',
        body: formData,
      });
    } catch (e) {
      console.warn('Fallback update:', e);
    }

    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'resolved', resolved_image_url: previewUrl, intervention } : r
      )
    );
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask((prev) => ({
        ...prev,
        status: 'resolved',
        resolved_image_url: previewUrl,
        intervention
      }));
    }
    alert(isBengali ? 'পরিচ্ছন্নতা নিশ্চিত করা হয়েছে!' : `Site cleanup verified via ${intervention}!`);
  };

  const handleLaunchModal = (modalId) => {
    if (modalId === 'showcase') setIsShowcaseOpen(true);
    else if (modalId === 'triage') setIsTriageOpen(true);
    else if (modalId === 'route') setIsRouteOpen(true);
    else if (modalId === 'radar') setIsRadarOpen(true);
    else if (modalId === 'sync') setIsSyncOpen(true);
    else if (modalId === 'climate') setIsClimateOpen(true);
    else if (modalId === 'breteau') setIsBreteauOpen(true);
    else if (modalId === 'trends') setIsTrendOpen(true);
    else if (modalId === 'inventory') setIsInventoryOpen(true);
    else if (modalId === 'audit') setIsAuditOpen(true);
    else if (modalId === 'clearance') setIsClearanceOpen(true);
    else if (modalId === 'ward') setIsWardOpen(true);
    else if (modalId === 'brief') setIsBriefOpen(true);
    else if (modalId === 'deck') setIsDeckOpen(true);
    else if (modalId === 'manifest') setIsPrintOpen(true);
    else if (modalId === 'rating') setIsRatingOpen(true);
    else if (modalId === 'guide') setIsAwarenessOpen(true);
    else if (modalId === 'helpline') setIsHelplineOpen(true);
    else if (modalId === 'broadcast') setIsBroadcastOpen(true);
  };

  const activeCount = reports.filter((r) => r.status === 'reported').length;
  const clearedCount = reports.filter((r) => r.status === 'resolved').length;
  const helperCount = users.length > 0 ? users.length : 5;

  const filteredReports = reports.filter((report) => {
    const matchesSearch = (report.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      {/* Live Ingestion Toast Alert */}
      {newDispatchAlert && (
        <div style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          background: '#0f172a',
          color: '#ffffff',
          padding: '10px 18px',
          borderRadius: '30px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: '1px solid #38bdf8',
          fontSize: '0.8rem'
        }}>
          <span style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell size={13} color="#fff" />
          </span>
          <div>
            <strong>{isBengali ? 'নতুন ঝুঁকি রিপোর্ট দাখিল হয়েছে!' : 'New Stagnant Hazard Ingested!'}</strong>
            <span style={{ marginLeft: '6px', color: '#94a3b8' }}>{newDispatchAlert.description?.slice(0, 36)}...</span>
          </div>
          {currentUser?.role === 'volunteer' && (
            <button
              type="button"
              onClick={() => setIsVolunteerPortalOpen(true)}
              style={{
                marginLeft: '8px',
                padding: '4px 10px',
                borderRadius: '14px',
                background: '#047857',
                border: 'none',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Open Squad Queue
            </button>
          )}
        </div>
      )}

      <div className="container">
        <header className="hero-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div className="brand-badge">
              <div className="brand-icon-box">
                <Map size={16} color="white" />
              </div>
              <span>নংরা Nongra</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              {/* Authenticated Role Portal Switcher */}
              {currentUser?.role === 'volunteer' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setIsVolunteerPortalOpen(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: '1px solid #059669',
                      background: '#047857',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(4,120,87,0.3)'
                    }}
                  >
                    <Shield size={14} /> {isBengali ? 'ভলান্টিয়ার কমান্ড' : 'Squad Portal'}
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Sign Out to Guest Mode"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 10px',
                      borderRadius: '20px',
                      border: '1px solid #fee2e2',
                      background: '#fef2f2',
                      color: '#dc2626',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={12} /> {isBengali ? 'লগআউট' : 'Sign Out'}
                  </button>
                </div>
              ) : currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentView('profile')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      border: '1px solid #0f172a',
                      background: '#0f172a',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <User size={13} /> {currentUser.name.split(' ')[0]} ({currentUser.points || 0} pts)
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Sign Out to Guest Mode"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 10px',
                      borderRadius: '20px',
                      border: '1px solid #fee2e2',
                      background: '#fef2f2',
                      color: '#dc2626',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={12} /> {isBengali ? 'লগআউট' : 'Sign Out'}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  <LogIn size={13} /> {isBengali ? 'লগইন / রেজিস্টার' : 'Sign In'}
                </button>
              )}

              {/* Central Command Hub Button */}
              <button
                type="button"
                onClick={() => setIsHubOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid #0f766e',
                  background: 'var(--color-primary)',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(15,118,110,0.2)'
                }}
              >
                <LayoutGrid size={14} /> {isBengali ? 'কমান্ড হাব' : 'Command Hub'}
              </button>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={() => setIsBengali(!isBengali)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                  background: '#ffffff',
                  color: 'var(--text-main)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Globe size={13} color="var(--color-primary)" />
                {isBengali ? 'EN' : 'বাংলা'}
              </button>

              {/* Quick Simulation Button */}
              <button
                type="button"
                onClick={handleSimulateReport}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid #fed7aa',
                  background: '#fff7ed',
                  color: '#c2410c',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Zap size={13} /> {isBengali ? 'সিমুলেট' : 'Simulate'}
              </button>
            </div>
          </div>

          <h1 className="hero-title">
            {isBengali ? 'ঝুঁকি দেখেছেন? রিপোর্ট করুন।' : 'See a hazard? Report it.'}
            <span className="hero-highlight">{isBengali ? 'সমাধানে অংশ নিন।' : 'Help fix it.'}</span>
          </h1>
          <p className="hero-subtitle">
            {currentUser 
              ? (isBengali ? `স্বাগতম, ${currentUser.name}! আপনি এখন ভেক্টর প্রতিরোধ নেটওয়ার্কে সক্রিয় রয়েছেন।` : `Welcome, ${currentUser.name}! You are currently authenticated on the municipal vector surveillance grid.`)
              : (isBengali ? 'গেস্ট মোড সক্রিয়: আপনি লগইন ছাড়াই সরাসরি রিপোর্ট ও মানচিত্র ব্যবহার করতে পারেন।' : 'Guest Mode Active: Direct frictionless reporting and vector intelligence enabled without mandatory login.')}
          </p>
        </header>

        {/* 3 Metrics Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value red">{activeCount}</div>
            <div className="metric-label">{isBengali ? 'সক্রিয় ঝুঁকি' : 'Active'}</div>
          </div>
          <div className="metric-card">
            <div className="metric-value green">{clearedCount}</div>
            <div className="metric-label">{isBengali ? 'সমাধানকৃত' : 'Cleared'}</div>
          </div>
          <div className="metric-card">
            <div className="metric-value blue">{helperCount}</div>
            <div className="metric-label">{isBengali ? 'স্বেচ্ছাসেবক' : 'Helpers'}</div>
          </div>
        </div>

        {/* Climate & Larvae Risk Advisory Bar */}
        <WeatherAdvisory activeCount={activeCount} />

        {/* Dynamic Views */}
        {currentView === 'map' && (
          <>
            <HotspotMap 
              reports={filteredReports} 
              onSelectTask={setSelectedTask} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              isBengali={isBengali}
            />
            <ActivityList 
              reports={filteredReports} 
              onSelectTask={setSelectedTask} 
            />
          </>
        )}

        {currentView === 'activity' && (
          <ActivityList 
            reports={filteredReports} 
            onSelectTask={setSelectedTask} 
          />
        )}

        {currentView === 'profile' && (
          <ProfileView 
            user={currentUser} 
            leaderboard={users} 
            reports={reports} 
            onLogout={handleLogout}
            onOpenAuth={() => setIsAuthOpen(true)}
            isBengali={isBengali}
          />
        )}
      </div>

      <nav className="bottom-nav">
        <button 
          type="button"
          className={`nav-item ${currentView === 'map' ? 'active' : ''}`}
          onClick={() => setCurrentView('map')}
        >
          <Map size={20} />
          <span>{isBengali ? 'মানচিত্র' : 'Map'}</span>
        </button>

        <button type="button" className="nav-item-report" onClick={() => setIsReportOpen(true)}>
          <div className="report-fab-circle">
            <Plus size={24} strokeWidth={2.5} />
          </div>
          <span className="report-fab-label">{isBengali ? 'রিপোর্ট' : 'Report'}</span>
        </button>

        <button 
          type="button"
          className={`nav-item ${currentView === 'activity' ? 'active' : ''}`}
          onClick={() => setCurrentView('activity')}
        >
          <Activity size={20} />
          <span>{isBengali ? 'কার্যক্রম' : 'Activity'}</span>
        </button>
        
        <button 
          type="button"
          className={`nav-item ${currentView === 'profile' ? 'active' : ''}`}
          onClick={() => setCurrentView('profile')}
        >
          <User size={20} />
          <span>{isBengali ? 'প্রোফাইল' : 'Profile'}</span>
        </button>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'volunteer') {
            setIsVolunteerPortalOpen(true);
          }
        }}
        isBengali={isBengali}
      />

      {/* Volunteer Operations Portal */}
      <VolunteerPortal
        isOpen={isVolunteerPortalOpen}
        onClose={() => setIsVolunteerPortalOpen(false)}
        reports={reports}
        currentUser={currentUser}
        onRefreshData={fetchData}
        onLogout={handleLogout}
        isBengali={isBengali}
      />

      {/* Task Modal */}
      <TaskModal 
        task={selectedTask} 
        onClose={() => setSelectedTask(null)} 
        onClaim={handleClaim}
        onResolve={handleResolve}
        isBengali={isBengali}
      />

      {/* Report Modal */}
      <ReportModal 
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onReportAdded={fetchData}
        isBengali={isBengali}
      />

      {/* Command Hub Drawer */}
      <CommandHubModal
        isOpen={isHubOpen}
        onClose={() => setIsHubOpen(false)}
        onOpenModal={handleLaunchModal}
        onSimulate={handleSimulateReport}
        isBengali={isBengali}
      />

      {/* SDG Impact Analytics Modal */}
      <ImpactModal
        isOpen={isImpactOpen}
        onClose={() => setIsImpactOpen(false)}
        reports={reports}
      />

      {/* Spray Triage Queue Modal */}
      <TriageModal
        isOpen={isTriageOpen}
        onClose={() => setIsTriageOpen(false)}
        reports={reports}
        onSelectTask={setSelectedTask}
      />

      {/* Pitch Deck Modal */}
      <PitchDeckModal
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
        isBengali={isBengali}
      />

      {/* Printable Dispatch Manifest */}
      <PrintDispatchModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Emergency Broadcast Modal */}
      <BroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* 7-Day Outbreak Trend Analytics Modal */}
      <TrendAnalyticsModal
        isOpen={isTrendOpen}
        onClose={() => setIsTrendOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Municipal Ward Scorecard Modal */}
      <WardScorecardModal
        isOpen={isWardOpen}
        onClose={() => setIsWardOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Offline Field Sync Modal */}
      <OfflineSyncModal
        isOpen={isSyncOpen}
        onClose={() => setIsSyncOpen(false)}
        isBengali={isBengali}
      />

      {/* Larvicide Supply Inventory Modal */}
      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Clinical Dengue Referral & Helpline Modal */}
      <HelplineModal
        isOpen={isHelplineOpen}
        onClose={() => setIsHelplineOpen(false)}
        isBengali={isBengali}
      />

      {/* Breteau Index & Larval Survey Calculator Modal */}
      <BreteauCalculatorModal
        isOpen={isBreteauOpen}
        onClose={() => setIsBreteauOpen(false)}
        isBengali={isBengali}
      />

      {/* Public Health Awareness & Prevention Hub Modal */}
      <AwarenessModal
        isOpen={isAwarenessOpen}
        onClose={() => setIsAwarenessOpen(false)}
        isBengali={isBengali}
      />

      {/* Proximity Threat Radar Modal */}
      <ProximityRadarModal
        isOpen={isRadarOpen}
        onClose={() => setIsRadarOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Municipal Audit Log & Compliance Ledger Modal */}
      <AuditLogModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Predictive Climate Larval Hatch Simulator Modal */}
      <ClimateSimulatorModal
        isOpen={isClimateOpen}
        onClose={() => setIsClimateOpen(false)}
        isBengali={isBengali}
      />

      {/* Volunteer Field Patrol Route Optimizer Modal */}
      <RouteOptimizerModal
        isOpen={isRouteOpen}
        onClose={() => setIsRouteOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Public Community Citizen Rating & Feedback Modal */}
      <CitizenRatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Executive Project Brief & Jury Card Modal */}
      <ExecutiveBriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Municipal Sanitary Clearance Certificate Modal */}
      <ClearanceCertificateModal
        isOpen={isClearanceOpen}
        onClose={() => setIsClearanceOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Automated Jury Pitch Demo Runner */}
      <ShowcaseRunnerModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
        onTriggerSimulate={handleSimulateReport}
        isBengali={isBengali}
      />
    </>
  );
}