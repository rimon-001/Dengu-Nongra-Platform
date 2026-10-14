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
import DengueKnowledgeQuizModal from './components/DengueKnowledgeQuizModal';
import ProjectWalkthroughModal from './components/ProjectWalkthroughModal';
import NongraBriefSection from './components/NongraBriefSection';
import { 
  Map, Activity, User, Plus, Globe, LayoutGrid, LogIn, Shield, LogOut, Bell,
  ChevronLeft, ChevronRight, AlertTriangle, Zap, Award, BookOpen, Sparkles
} from 'lucide-react';

const BANNER_SLIDES = [
  {
    id: 1,
    titleEn: 'National Dengue & Vector Surveillance Mission',
    titleBn: 'জাতীয় ডেঙ্গু প্রতিরোধ ও ভেক্টর নজরদারি মিশন',
    subtitleEn: 'Crowdsourced community hazard mapping and rapid larvae eradication.',
    subtitleBn: 'নাগরিক রিপোর্ট ও দ্রুত লার্ভা নিষ্কাশনের সমন্বিত ডিজিটাল নেটওয়ার্ক।',
    tagEn: 'Surveillance & Cleanup',
    tagBn: 'নজরদারি ও পরিচ্ছন্নতা',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    titleEn: 'Eliminate Stagnant Water & Breeding Sites',
    titleBn: 'জমে থাকা পানি ও এডিস মশার প্রজননস্থল ধ্বংস করুন',
    subtitleEn: 'Inspect open drums, flower pots, discarded tyres, and rooftop drains.',
    subtitleBn: 'খোলা ড্রাম, টব, পরিত্যক্ত টায়ার ও ছাদের ড্রেন নিয়মিত পরিষ্কার রাখুন।',
    tagEn: 'Larval Prevention',
    tagBn: 'লার্ভা দমন অভিযান',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    titleEn: 'Community Drone & Geo-Tagged Reporting',
    titleBn: 'ড্রোন ও রিয়েল-টাইম জিও-ট্যাগিং প্রযুক্তি',
    subtitleEn: 'Pin unreachable breeding spots, storm drains, and open reservoirs.',
    subtitleBn: 'দুর্গম প্রজননস্থল ও জলাবদ্ধ এলাকা ম্যাপে চিহ্নিত করে দ্রুত ব্যবস্থা নিন।',
    tagEn: 'GIS & Aerial Tech',
    tagBn: 'জিআইএস প্রযুক্তি',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    titleEn: 'Join As a Squad Volunteer Today',
    titleBn: 'স্বেচ্ছাসেবক স্কোয়াডে যুক্ত হোন আজই',
    subtitleEn: 'Verify hazards, perform physical clearing, and earn sanitary badges.',
    subtitleBn: 'ঝুঁকিপূর্ণ স্থান চিহ্নিত করুন, পরিচ্ছন্নতা অভিযানে অংশ নিয়ে সনদ অর্জন করুন।',
    tagEn: 'Citizen Action',
    tagBn: 'নাগরিক অংশগ্রহণ',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
  }
];

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

const SIMULATION_SCENARIOS = [
  {
    type: 'Stagnant Water / Puddle',
    descEn: '⚠️ [Simulated] Deep rain puddle behind cafeteria block with mosquito larvae',
    descBn: '⚠️ [সিমুলেশন] ক্যাফেটেরিয়ার পেছনে বৃষ্টির জমে থাকা পানি ও এডিসের লার্ভা',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'
  },
  {
    type: 'Discarded Plastic & Coconut Shells',
    descEn: '⚠️ [Simulated] Discarded coconut shells & plastic containers near Gate 2',
    descBn: '⚠️ [সিমুলেশন] গেট ২ এর কাছে ফেলে দেওয়া ডাবের খোসা ও প্লাস্টিকে জমে থাকা পানি',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=400&q=80'
  },
  {
    type: 'Clogged Municipal Storm Drain',
    descEn: '⚠️ [Simulated] Blocked culvert drain accumulating stagnant water and pupae',
    descBn: '⚠️ [সিমুলেশন] বন্ধ কালভার্ট ড্রেনে আবর্জনা ও এডিসের লার্ভার বিস্তার',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'
  },
  {
    type: 'Uncovered Rooftop Water Tank',
    descEn: '⚠️ [Simulated] Uncovered rooftop overhead water tank with vector breeding',
    descBn: '⚠️ [সিমুলেশন] ছাদের উন্মুক্ত পানির ট্যাংকে এডিস মশার লার্ভার প্রজননস্থল',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=400&q=80'
  },
  {
    type: 'Discarded Vehicle Tyres',
    descEn: '⚠️ [Simulated] Abandoned automobile tyres holding rain near transport depot',
    descBn: '⚠️ [সিমুলেশন] পরিবহন ডিপোর পাশে পরিত্যক্ত টায়ারে বৃষ্টির পানি ও লার্ভা',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'
  }
];

export default function App() {
  const [reports, setReports] = useState(FALLBACK_REPORTS);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newDispatchAlert, setNewDispatchAlert] = useState(null);
  const previousReportCount = useRef(FALLBACK_REPORTS.length);

  const [currentSlide, setCurrentSlide] = useState(0);

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
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

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
          if (data.length > previousReportCount.current) {
            const newest = data[0];
            setNewDispatchAlert(newest);
            setTimeout(() => setNewDispatchAlert(null), 5000);
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
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? BANNER_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const handleLogout = () => {
    localStorage.removeItem('nongra_token');
    localStorage.removeItem('nongra_user');
    setCurrentUser(null);
    setIsVolunteerPortalOpen(false);
  };

  const handleRewardEarned = (pointsEarned) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      points: (currentUser.points || 0) + pointsEarned
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('nongra_user', JSON.stringify(updatedUser));

    fetch('/api/users/reward', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, points: pointsEarned })
    }).catch(() => null);
  };

  // Immediate Local & Remote Addition Handler
  const handleReportAdded = (newReport) => {
    if (newReport && typeof newReport === 'object') {
      setReports((prev) => [newReport, ...prev]);
      setNewDispatchAlert(newReport);
      setTimeout(() => setNewDispatchAlert(null), 5000);
    }
    fetchData();
  };

  // Volunteer Delete Handler
  const handleDeleteReport = async (reportId) => {
    setReports(prev => prev.filter(r => r.id !== reportId));
    if (selectedTask?.id === reportId) {
      setSelectedTask(null);
    }

    try {
      const token = localStorage.getItem('nongra_token');
      await fetch(`/api/reports/${reportId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      fetchData();
    } catch (e) {
      console.warn('Offline report deletion complete:', e);
    }
  };

  // Volunteer Edit Handler
  const handleUpdateReport = async (reportId, updatedFields) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, ...updatedFields } : r));
    setSelectedTask(prev => prev?.id === reportId ? { ...prev, ...updatedFields } : prev);

    try {
      const token = localStorage.getItem('nongra_token');
      await fetch(`/api/reports/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updatedFields)
      });
      fetchData();
    } catch (e) {
      console.warn('Offline report update fallback:', e);
    }
  };

  const handleSimulateReport = async () => {
    const scenario = SIMULATION_SCENARIOS[Math.floor(Math.random() * SIMULATION_SCENARIOS.length)];
    const randomOffsetLat = (Math.random() - 0.5) * 0.009;
    const randomOffsetLng = (Math.random() - 0.5) * 0.009;

    const newSimulatedReport = {
      id: Date.now(),
      tracking_code: `NG-${Math.floor(1000 + Math.random() * 9000)}`,
      latitude: 23.8768 + randomOffsetLat,
      longitude: 90.3201 + randomOffsetLng,
      image_url: scenario.image,
      resolved_image_url: null,
      description: isBengali ? scenario.descBn : scenario.descEn,
      status: 'reported',
      claimed_by: null,
      intervention: null,
      created_at: new Date().toISOString()
    };

    try {
      await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hazard_type: scenario.type,
          description: newSimulatedReport.description,
          latitude: newSimulatedReport.latitude,
          longitude: newSimulatedReport.longitude,
          image_url: newSimulatedReport.image_url
        })
      });
    } catch (e) {
      console.warn('Simulation persistence fallback:', e);
    }

    setReports((prev) => [newSimulatedReport, ...prev]);
    setNewDispatchAlert(newSimulatedReport);
    setTimeout(() => setNewDispatchAlert(null), 5000);
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
      prev.map((r) => (r.id === id ? { ...r, status: 'claimed', claimed_by: currentUser?.id || 1 } : r))
    );
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask((prev) => ({ ...prev, status: 'claimed', claimed_by: currentUser?.id || 1 }));
    }
  };

  const handleResolve = async (id, proofFile, intervention = 'Physical Water Evacuation & Container Scrubbing') => {
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
    alert(isBengali ? 'পরিচ্ছন্নতা সফলভাবে নিশ্চিত হয়েছে!' : `Site cleanup verified via ${intervention}!`);
  };

  const handleLaunchModal = (modalId) => {
    if (modalId === 'showcase') setIsShowcaseOpen(true);
    else if (modalId === 'walkthrough') setIsWalkthroughOpen(true);
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
    else if (modalId === 'quiz') setIsQuizOpen(true);
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
      {/* Real-time Ingestion Toast */}
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
            <strong>{isBengali ? 'নতুন ঝুঁকি গ্রিডে যুক্ত হয়েছে!' : 'New Hazard Pinned to Map!'}</strong>
            <span style={{ marginLeft: '6px', color: '#94a3b8' }}>
              {newDispatchAlert.description?.slice(0, 36)}...
            </span>
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
        {/* Top Slideshow Banner */}
        <section className="portal-banner-container">
          <div className="portal-slides-wrapper">
            {BANNER_SLIDES.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`portal-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img 
                  src={slide.image} 
                  alt={isBengali ? slide.titleBn : slide.titleEn} 
                  className="portal-slide-img" 
                />
                <div className="portal-slide-overlay" />
                <div className="portal-slide-content">
                  <div className="portal-badge-row">
                    <div className="portal-govt-emblem">
                      <Shield size={18} color="#ffffff" />
                    </div>
                    <span className="portal-badge-text">
                      {isBengali ? slide.tagBn : slide.tagEn}
                    </span>
                  </div>
                  <h2 className="portal-banner-title">
                    {isBengali ? slide.titleBn : slide.titleEn}
                  </h2>
                  <p className="portal-banner-subtitle">
                    {isBengali ? slide.subtitleBn : slide.subtitleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button 
            type="button" 
            className="portal-nav-btn portal-nav-prev" 
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            type="button" 
            className="portal-nav-btn portal-nav-next" 
            onClick={handleNextSlide}
            aria-label="Next Slide"
          >
            <ChevronRight size={18} />
          </button>

          <div className="portal-slide-dots">
            {BANNER_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`portal-dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Live Ticker */}
        <div className="portal-marquee-bar">
          <div className="marquee-badge">
            <AlertTriangle size={13} />
            <span>{isBengali ? 'জরুরি নোটিশ' : 'LIVE TICKER'}</span>
          </div>
          <div className="marquee-content-wrap">
            <span className="marquee-text">
              {isBengali 
                ? '📢 বিশেষ ডেঙ্গু সতর্কতা: সাম্প্রতিক বৃষ্টিপাতের কারণে বাড়ির আশপাশের ছাদ, ফুলের টব ও খোলা পাত্রে জমে থাকা পানি অবিলম্বে পরিষ্কার করুন। সন্দেহজনক প্রজননস্থল দেখলে সাথে সাথে অ্যাপে রিপোর্ট দিন।' 
                : '📢 High Vector Alert: Incessant rain increases Aedes mosquito larvae breeding risks. Inspect rooftops, tyres, and open containers immediately. Report stagnant water pools directly on the map.'}
            </span>
          </div>
        </div>

        <header className="hero-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div className="brand-badge">
              <div className="brand-icon-box">
                <Map size={16} color="white" />
              </div>
              <span>নংরা Nongra</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setIsWalkthroughOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid #38bdf8',
                  background: '#0f172a',
                  color: '#38bdf8',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(56, 189, 248, 0.2)'
                }}
              >
                <Sparkles size={14} color="#38bdf8" />
                {isBengali ? 'প্রজেক্ট ওয়াকথ্রু (ট্যুর)' : 'About / Tour'}
              </button>

              <button
                type="button"
                onClick={() => setIsQuizOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid #bbf7d0',
                  background: '#f0fdf4',
                  color: '#15803d',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(22,163,74,0.15)'
                }}
              >
                <Award size={14} color="#16a34a" /> {isBengali ? 'ডেঙ্গু কুইজ ও জ্ঞানকোষ' : 'Quiz & Knowledge'}
              </button>

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
                    <Shield size={14} /> {isBengali ? 'ভলান্টিয়ার কমান্ড' : 'Squad Portal'}
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
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
                  cursor: 'pointer'
                }}
              >
                <LayoutGrid size={14} /> {isBengali ? 'কমান্ড হাব' : 'Command Hub'}
              </button>

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
              ? (isBengali ? `স্বাগতম, ${currentUser.name}! আপনি এখন ভেক্টর প্রতিরোধ নেটওয়ার্কে সক্রিয় রয়েছেন।` : `Welcome, ${currentUser.name}! You are currently authenticated on the municipal vector surveillance grid.`)
              : (isBengali ? 'গেস্ট মোড সক্রিয়: আপনি লগইন ছাড়াই সরাসরি রিপোর্ট ও মানচিত্র ব্যবহার করতে পারেন।' : 'Guest Mode Active: Direct frictionless reporting and vector intelligence enabled without mandatory login.')}
          </p>
        </header>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value red">{activeCount}</div>
            <div className="metric-label">{isBengali ? 'সক্রিয় ঝুঁকি' : 'Active'}</div>
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

        {/* Weather Advisory */}
        <WeatherAdvisory 
          activeCount={activeCount} 
          onOpenHelpline={() => setIsHelplineOpen(true)} 
          isBengali={isBengali} 
        />

        {/* Views */}
        {currentView === 'map' && (
          <>
            <HotspotMap 
              reports={filteredReports} 
              onSelectTask={setSelectedTask} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              onLaunchModal={handleLaunchModal}
              isBengali={isBengali}
            />
            
            <ActivityList 
              reports={filteredReports} 
              onSelectTask={setSelectedTask} 
            />

            {/* Dedicated Presentation & Registration Form Section placed at the bottom */}
            <NongraBriefSection 
              onOpenTour={() => setIsWalkthroughOpen(true)}
              onOpenReport={() => setIsReportOpen(true)}
              onOpenQuiz={() => setIsQuizOpen(true)}
              isBengali={isBengali}
            />
          </>
        )}

        {currentView === 'activity' && (
          <>
            <ActivityList 
              reports={filteredReports} 
              onSelectTask={setSelectedTask} 
            />

            <NongraBriefSection 
              onOpenTour={() => setIsWalkthroughOpen(true)}
              onOpenReport={() => setIsReportOpen(true)}
              onOpenQuiz={() => setIsQuizOpen(true)}
              isBengali={isBengali}
            />
          </>
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

      {/* Project Walkthrough */}
      <ProjectWalkthroughModal
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        isBengali={isBengali}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
      />

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
        onDelete={handleDeleteReport}
        onUpdate={handleUpdateReport}
        currentUser={currentUser}
        isBengali={isBengali}
      />

      {/* Report Modal with Real-time Optimistic Placement */}
      <ReportModal 
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onReportAdded={handleReportAdded}
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

      {/* Dengue Quiz */}
      <DengueKnowledgeQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        user={currentUser}
        onRewardEarned={handleRewardEarned}
        onOpenAuth={() => setIsAuthOpen(true)}
        isBengali={isBengali}
      />

      {/* Impact Modal */}
      <ImpactModal
        isOpen={isImpactOpen}
        onClose={() => setIsImpactOpen(false)}
        reports={reports}
      />

      {/* Triage Modal */}
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

      {/* Print Dispatch Manifest */}
      <PrintDispatchModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Emergency Broadcast */}
      <BroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Trend Analytics */}
      <TrendAnalyticsModal
        isOpen={isTrendOpen}
        onClose={() => setIsTrendOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Ward Scorecard */}
      <WardScorecardModal
        isOpen={isWardOpen}
        onClose={() => setIsWardOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Offline Sync */}
      <OfflineSyncModal
        isOpen={isSyncOpen}
        onClose={() => setIsSyncOpen(false)}
        isBengali={isBengali}
      />

      {/* Inventory Modal */}
      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Helpline Modal */}
      <HelplineModal
        isOpen={isHelplineOpen}
        onClose={() => setIsHelplineOpen(false)}
        isBengali={isBengali}
      />

      {/* Breteau Calculator */}
      <BreteauCalculatorModal
        isOpen={isBreteauOpen}
        onClose={() => setIsBreteauOpen(false)}
        isBengali={isBengali}
      />

      {/* Public Health Awareness */}
      <AwarenessModal
        isOpen={isAwarenessOpen}
        onClose={() => setIsAwarenessOpen(false)}
        isBengali={isBengali}
      />

      {/* Proximity Radar */}
      <ProximityRadarModal
        isOpen={isRadarOpen}
        onClose={() => setIsRadarOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Audit Log */}
      <AuditLogModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Climate Simulator */}
      <ClimateSimulatorModal
        isOpen={isClimateOpen}
        onClose={() => setIsClimateOpen(false)}
        isBengali={isBengali}
      />

      {/* Route Optimizer */}
      <RouteOptimizerModal
        isOpen={isRouteOpen}
        onClose={() => setIsRouteOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Citizen Rating */}
      <CitizenRatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Executive Brief */}
      <ExecutiveBriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Clearance Certificate */}
      <ClearanceCertificateModal
        isOpen={isClearanceOpen}
        onClose={() => setIsClearanceOpen(false)}
        reports={reports}
        isBengali={isBengali}
      />

      {/* Showcase Runner */}
      <ShowcaseRunnerModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
        onTriggerSimulate={handleSimulateReport}
        isBengali={isBengali}
      />
    </>
  );
}