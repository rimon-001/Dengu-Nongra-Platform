import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, ChevronLeft, ChevronRight, MapPin, 
  ShieldCheck, Cpu, PlaneTakeoff, Award, Droplets, 
  Sparkles, CheckCircle2, ArrowRight, BookOpen, Layers, Users
} from 'lucide-react';

const STATIONS = [
  {
    id: 'entrance',
    deskLabel: 'Entrance / HQ',
    titleEn: 'Mission Nongra (নংরা) — National Dengue Surveillance',
    titleBn: 'মিশন নংরা (নংরা) — জাতীয় ডেঙ্গু প্রতিরোধ প্ল্যাটফর্ম',
    subtitleEn: 'Crowdsourced municipal vector intelligence engineered for DIU Smart Campus and Ashulia.',
    subtitleBn: 'ড্যাফোডিল স্মার্ট ক্যাম্পাস ও আশুলিয়া এলাকার জন্য নির্মিত ভেক্টর সার্ভিল্যান্স ও লার্ভা দমন ব্যবস্থা।',
    themeEn: 'Civic Epidemiological Action',
    themeBn: 'নাগরিক স্বাস্থ্য ও প্রতিরোধ ব্যবস্থা',
    points: [
      {
        headEn: 'What is Nongra?',
        headBn: 'নংরা কী?',
        bodyEn: 'A real-time civic-municipal platform transforming citizen reports into rapid field squad dispatches.',
        bodyBn: 'নাগরিকদের সরাসরি রিপোর্টকে দ্রুত স্বেচ্ছাসেবক স্কোয়াড ও পরিচ্ছন্নতা অভিযানে রূপান্তরের ডিজিটাল নেটওয়ার্ক।'
      },
      {
        headEn: 'The Urgent Challenge',
        headBn: 'জরুরি স্বাস্থ্য সংকট',
        bodyEn: 'Bangladesh witnessed over 321,000 hospitalizations in 2023. Stagnant puddles and open containers trigger explosive vector outbreaks.',
        bodyBn: '২০২৩ সালে ৩,২১,০০০-এর বেশি ডেঙ্গু রোগী হাসপাতালে ভর্তি হন। জমে থাকা পানি ও খোলা পাত্রই এই প্রাদুর্ভাবের মূল কারণ।'
      },
      {
        headEn: 'Geographic Scope',
        headBn: 'ভৌগোলিক পরিধি',
        bodyEn: 'Micro-targeted on 15,000+ residents across DIU Academic Blocks, Hostels, and surrounding Ashulia Union sectors.',
        bodyBn: 'ডিআইইউ ক্যাম্পাস, আবাসিক হল এবং আশুলিয়া ইউনিয়নের ১৫,০০০+ বাসিন্দাদের সরাসরি সুরক্ষায় নিবেদিত।'
      }
    ],
    deskColor: '#3b82f6',
    plant: true
  },
  {
    id: 'idea',
    deskLabel: 'Idea & Science',
    titleEn: 'The Core Idea: Breaking the 7-Day Pupation Cycle',
    titleBn: 'মূল বৈজ্ঞানিক ধারণা: এডিসের ৭ দিনের প্রজনন চক্র ধ্বংস',
    subtitleEn: 'Targeting vector breeding before mosquitoes take flight through community source reduction.',
    subtitleBn: 'মশা ডানা মেলার পূর্বেই লার্ভা অবস্থায় উৎস নির্মূল করার বৈজ্ঞানিক পদ্ধতি।',
    themeEn: 'Biological Source Reduction',
    themeBn: 'উৎস নির্মূল ও প্রতিরোধ বিজ্ঞান',
    points: [
      {
        headEn: '3-Day Intervention Rule',
        headBn: '৩ দিনের পরিচ্ছন্নতা নিয়ম',
        bodyEn: 'Aedes aegypti eggs require 7 to 9 days in standing water to pupate. Emptying water every 3 days terminates development with 100% efficacy.',
        bodyBn: 'এডিস মশার ডিম থেকে পূর্ণাঙ্গ মশা হতে ৭-৯ দিন লাগে। প্রতি ৩ দিনে জমে থাকা পানি ফেলে দিলে বংশবৃদ্ধি সম্পূর্ণ বন্ধ হয়।'
      },
      {
        headEn: 'WHO Breteau Index Surveillance',
        headBn: 'ডব্লিউএইচও ব্রেটো ইনডেক্স মডেল',
        bodyEn: 'Automated calculation of Breteau Index (BI > 20) triggers municipal sirens and prioritizing chemical & biological intervention.',
        bodyBn: 'ব্রেটো সূচক (BI > ২০) পার হলে স্বয়ংক্রিয়ভাবে প্রাদুর্ভাব সতর্কতা জারি ও স্প্রে কার্যক্রম শুরু হয়।'
      },
      {
        headEn: 'Zero Friction Reporting',
        headBn: 'সবার জন্য উন্মুক্ত রিপোর্টিং',
        bodyEn: 'Citizens report standing water with GPS and photos in under 15 seconds without forced sign-up hurdles.',
        bodyBn: 'লগইন করার ঝামেলা ছাড়াই যেকোনো নাগরিক ১৫ সেকেন্ডের মধ্যে ছবি ও জিপিএস দিয়ে রিপোর্ট করতে পারেন।'
      }
    ],
    deskColor: '#10b981',
    plant: false
  },
  {
    id: 'gis',
    deskLabel: 'GIS & Tech',
    titleEn: 'GIS Telemetry, Vision AI & Aerial Drone Grid',
    titleBn: 'জিআইএস টেলিমეტ্রি, এআই ভিশন ও ড্রোন করিডোর',
    subtitleEn: 'Layered geospatial intelligence connecting smart satellite mapping and computer vision.',
    subtitleBn: 'স্যাটেলাইট মানচিত্র, এআই লার্ভা শনাক্তকরণ এবং ড্রোন স্প্রে করিডোরের সমন্বয়।',
    themeEn: 'Spatial AI Architecture',
    themeBn: 'স্পেশাল কৃত্রিম বুদ্ধিমত্তা প্রযুক্তি',
    points: [
      {
        headEn: 'Edge Computer Vision Scanner',
        headBn: 'এআই ভিশন লার্ভা ডায়াগনস্টিক',
        bodyEn: 'Heuristic & vision detection analyzes water biofilm, tyre containers, and outputs risk confidence in milliseconds.',
        bodyBn: 'ছবি আপলোড করলেই এআই স্বয়ংক্রিয়ভাবে পাত্রের ধরন, পানির স্থায়িত্ব ও লার্ভা ঝুঁকি বিশ্লেষণ করে।'
      },
      {
        headEn: 'Multi-Layer GIS Engine',
        headBn: 'মাল্টি-লেয়ার জিআইএস ইঞ্জিন',
        bodyEn: 'Interactive Leaflet map overlaying Kernel Density Heatmaps, municipal culverts, and high-density student dorm polygons.',
        bodyBn: 'কার্নেল ডেনসিটি হিটম্যাপ, পৌর কালভার্ট নালা ও শিক্ষার্থী হলের ঝুঁকিপূর্ণ সীমানা রিয়েল-টাইমে প্রদর্শন।'
      },
      {
        headEn: 'Autonomous UAV Corridor',
        headBn: 'স্বয়ংক্রিয় ড্রোন স্প্রে রুট',
        bodyEn: 'Simulated 35m AGL drone flight paths targeting inaccessible rooftops, basements, and open marshlands with biological Bti.',
        bodyBn: 'দুর্গম ছাদ ও ড্রেনে ৩৫ মিটার উচ্চতায় ইউএভি ড্রোন দিয়ে পরিবেশবান্ধব বিটিআই তরল স্প্রে সিমুলেশন।'
      }
    ],
    deskColor: '#8b5cf6',
    plant: true
  },
  {
    id: 'squad',
    deskLabel: 'Squad Ops',
    titleEn: 'Field Volunteer Taskforce & 48-Hour SLA',
    titleBn: 'ফিল্ড ভলান্টিয়ার স্কোয়াড ও ৪৮ ঘণ্টার এসএলএ',
    subtitleEn: 'Empowering campus students & municipality cleaners with rapid-action triage routing.',
    subtitleBn: 'শিক্ষার্থী ও পরিচ্ছন্নতাকর্মীদের জন্য দ্রুততম ফিল্ড ডিসপ্যাচ ও টাস্ক ম্যানেজমেন্ট।',
    themeEn: 'Rapid Operational Triage',
    themeBn: 'দ্রুত সাড়াদান ও পরিচ্ছন্নতা প্রটোকল',
    points: [
      {
        headEn: 'Strict Municipal SLA',
        headBn: '৪৮ ঘণ্টার নাগরিক এসএলএ',
        bodyEn: 'Every reported hazard triggers a live 48-hour countdown timer, transitioning from Normal → Critical (<12h) → Breached.',
        bodyBn: 'প্রতিটি রিপোর্টের জন্য ৪৮ ঘণ্টার সময়সীমা গণনা করা হয়, যা যথাসময়ে নিষ্পত্তি নিশ্চিত করে।'
      },
      {
        headEn: 'Proof-of-Clearance Validation',
        headBn: 'আগে ও পরের ছবি যাচাই',
        bodyEn: 'Squads cannot resolve cases without uploading mandatory "After" photos, verified against the original hazard.',
        bodyBn: 'পরিচ্ছন্নতা সম্পন্ন করতে সাইটের নতুন প্রমাণ ছবি আপলোড ও যাচাইকরণ বাধ্যতামূলক।'
      },
      {
        headEn: 'Eco-Friendly Bio-Treatment',
        headBn: 'পরিবেশবান্ধব বিটিআই স্প্রে',
        bodyEn: 'Focus on Bacillus thuringiensis israelensis (Bti) — destroying vector pupae without harming fish, pets, or humans.',
        bodyBn: 'ক্ষতিকর রাসায়নিকের পরিবর্তে বিটিআই ব্যবহার, যা মাছ বা মানবদেহের কোনো ক্ষতি না করে লার্ভা ধ্বংস করে।'
      }
    ],
    deskColor: '#f59e0b',
    plant: false
  },
  {
    id: 'rewards',
    deskLabel: 'Rewards & Quiz',
    titleEn: 'Civic Badges, Rewards & Dengue Knowledge Hub',
    titleBn: 'নাগরিক ব্যাজ, কুইজ পুরস্কার ও জ্ঞানকোষ',
    subtitleEn: 'Gamified civic engagement rewarding citizens and volunteers with verifiable recognition.',
    subtitleBn: 'কুইজ খেলে পয়েন্ট অর্জন এবং ব্রোঞ্জ, সিলভার, গোল্ড ও প্ল্যাটিনাম নাগরিক ব্যাজ আনলক।',
    themeEn: 'Gamified Public Participation',
    themeBn: 'জনঅংশগ্রহণ ও স্বীকৃতি সিস্টেম',
    points: [
      {
        headEn: 'Dynamic Profile Badges',
        headBn: 'প্রোফাইল ব্যাজ স্তরসমূহ',
        bodyEn: 'Earn points across reports, cleanups, and quizzes: Bronze (<100 pts) → Silver (100) → Gold (250) → Platinum (500+).',
        bodyBn: 'পয়েন্টের ভিত্তিতে ব্রোঞ্জ (<১০০), সিলভার (১০০-২৪৯), গোল্ড (২৫০-৪৯৯) এবং প্ল্যাটিনাম (৫০০+) ব্যাজ।'
      },
      {
        headEn: 'Interactive Prize Quiz',
        headBn: 'পুরস্কার ভিত্তিক কুইজ',
        bodyEn: '5-question Dengue knowledge test awarding +20 points per correct answer, directly updating user profile points.',
        bodyBn: 'ডেঙ্গু প্রতিরোধ ও চিকিৎসার ওপর ৫টি প্রশ্নের কুইজ খেলে প্রতি সঠিক উত্তরে +২০ পয়েন্ট যোগ হয়।'
      },
      {
        headEn: 'DGHS Printable Citation',
        headBn: 'প্রিন্টযোগ্য সরকারি স্বীকৃতি সনদ',
        bodyEn: 'One-click printable Vector Surveillance Citation signed with cryptographic tracking hashes.',
        bodyBn: 'নাগরিক ও স্বেচ্ছাসেবকদের জন্য ওয়ান-ক্লিক প্রিন্টযোগ্য স্বাস্থ্য সনদপত্র।'
      }
    ],
    deskColor: '#ec4899',
    plant: true
  },
  {
    id: 'governance',
    deskLabel: 'Governance',
    titleEn: 'SDG Impact, Transparent Audit & Scalability',
    titleBn: 'এসডিজি প্রভাব, অডিট ট্রেইল ও ভবিষ্যৎ সম্প্রসারণ',
    subtitleEn: 'Targeting UN SDGs 3 & 11 with cryptographic ledger verification and city-wide replication.',
    subtitleBn: 'জাতিসংঘের এসডিজি ৩ ও ১১ লক্ষ্যমাত্রা অর্জন এবং যেকোনো পৌরসভায় বাস্তবায়নের সক্ষমতা।',
    themeEn: 'Public Health Governance',
    themeBn: 'সুশাসন ও প্রযুক্তিগত পরিমাপযোগ্যতা',
    points: [
      {
        headEn: 'UN SDG 3 & 11 Alignment',
        headBn: 'এসডিজি ৩ ও ১১ অর্জনে ভূমিকা',
        bodyEn: 'Directly advances Good Health & Well-being (3.3 End Vector Neglected Diseases) and Sustainable Smart Cities (11.5).',
        bodyBn: 'সুস্বাস্থ্য নিশ্চিতকরণ এবং দুর্যোগ সহনশীল টেকসই নগর গড়তে সরাসরি অবদান রাখে।'
      },
      {
        headEn: 'Cryptographic Audit Trail',
        headBn: 'নন-রিপুডিয়েবল অডিট লগ',
        bodyEn: 'Every report, triage dispatch, and resolution generates a SHA-256 state hash for municipal transparency.',
        bodyBn: 'প্রতিটি অ্যাকশন SHA-256 হ্যাশ কোডে রেকর্ড থাকে, যা নিরপেক্ষ অডিটিং নিশ্চিত করে।'
      },
      {
        headEn: 'National Scalability',
        headBn: 'জাতীয় পর্যায়ে সম্প্রসারণ',
        bodyEn: 'Lightweight architecture designed to scale seamlessly to Dhaka North, Chittagong, and municipal city corporations.',
        bodyBn: 'ঢাকা উত্তর ও দক্ষিণ সহ যেকোনো পৌরসভায় সরাসরি ব্যবহারের উপযোগী ওপেন আর্কিটেকচার।'
      }
    ],
    deskColor: '#0ea5e9',
    plant: false
  }
];

export default function ProjectWalkthroughModal({ 
  isOpen, 
  onClose, 
  isBengali = false, 
  onOpenQuiz,
  onOpenReport 
}) {
  if (!isOpen) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef(null);

  const activeStation = STATIONS[activeIndex];

  // Auto-walk step timer
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % STATIONS.length);
      }, 4500);
    } else {
      clearInterval(playIntervalRef.current);
    }
    return () => clearInterval(playIntervalRef.current);
  }, [isPlaying]);

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex(prev => (prev === 0 ? STATIONS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex(prev => (prev + 1) % STATIONS.length);
  };

  const handleSelect = (idx) => {
    setIsPlaying(false);
    setActiveIndex(idx);
  };

  // Avatar position offset across the visual walkway
  const avatarLeftPercent = 8 + (activeIndex * (84 / (STATIONS.length - 1)));

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        style={{
          maxWidth: '880px',
          width: '94vw',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#090d16',
          borderRadius: '20px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65)',
          border: '1px solid #1e293b',
          overflow: 'hidden',
          color: '#ffffff'
        }}
      >
        {/* Top Navbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#0f766e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(15, 118, 110, 0.4)'
            }}>
              <ShieldCheck size={18} color="#ffffff" />
            </div>
            <div>
              <strong style={{ fontSize: '0.92rem', color: '#ffffff', letterSpacing: '0.3px' }}>
                Nongra HQ • Interactive Walkthrough
              </strong>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                {isBengali ? 'প্রজেক্ট থিম, বৈজ্ঞানিক আর্কিটেকচার ও পূর্ণ বিবরণ' : 'Project Theme, Architecture & Walkthrough Tour'}
              </div>
            </div>
          </div>

          {/* Stepper Dots & Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Pagination Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {STATIONS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(i)}
                  aria-label={`Go to station ${i + 1}`}
                  style={{
                    width: i === activeIndex ? '20px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    border: 'none',
                    background: i === activeIndex ? '#38bdf8' : 'rgba(255, 255, 255, 0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                />
              ))}
            </div>

            {/* Auto Walk / Walk me through button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid #38bdf8',
                background: isPlaying ? '#0284c7' : 'rgba(56, 189, 248, 0.12)',
                color: '#ffffff',
                fontSize: '0.74rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              {isPlaying ? (isBengali ? 'পজ ট্যুর' : 'Pause Walk') : (isBengali ? 'ট্যুর শুরু করুন' : 'Walk me through')}
            </button>

            <button 
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Top Content Showcase Area */}
        <div style={{
          padding: '24px 28px',
          flex: '1',
          overflowY: 'auto',
          background: 'radial-gradient(ellipse at top left, rgba(15, 118, 110, 0.15) 0%, rgba(9, 13, 22, 0.95) 70%)'
        }}>
          {/* Station Badge & Subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '3px 10px',
              borderRadius: '6px',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              Station {activeIndex + 1} of {STATIONS.length}: {isBengali ? activeStation.themeBn : activeStation.themeEn}
            </span>

            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              Press arrow keys or click desks below to explore
            </span>
          </div>

          <h2 style={{
            margin: '0 0 6px',
            fontSize: '1.45rem',
            fontWeight: 900,
            color: '#f8fafc',
            lineHeight: 1.3
          }}>
            {isBengali ? activeStation.titleBn : activeStation.titleEn}
          </h2>

          <p style={{
            margin: '0 0 20px',
            fontSize: '0.86rem',
            color: '#94a3b8',
            maxWidth: '720px',
            lineHeight: 1.45
          }}>
            {isBengali ? activeStation.subtitleBn : activeStation.subtitleEn}
          </p>

          {/* 3 Detail Cards for this Station */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '16px'
          }}>
            {activeStation.points.map((pt, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 800, fontSize: '0.8rem' }}>
                  <CheckCircle2 size={13} color="#38bdf8" />
                  {isBengali ? pt.headBn : pt.headEn}
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  {isBengali ? pt.bodyBn : pt.bodyEn}
                </p>
              </div>
            ))}
          </div>

          {/* Quick CTA Actions based on context */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {activeIndex === 4 && onOpenQuiz && (
              <button
                type="button"
                onClick={() => { onClose(); onOpenQuiz(); }}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.78rem', background: '#059669', width: 'auto' }}
              >
                <Award size={14} /> {isBengali ? 'কুইজ খুলুন ও পয়েন্ট জিতুন' : 'Open Dengue Prize Quiz'}
              </button>
            )}

            {activeIndex === 0 && onOpenReport && (
              <button
                type="button"
                onClick={() => { onClose(); onOpenReport(); }}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.78rem', width: 'auto' }}
              >
                <MapPin size={14} /> {isBengali ? 'ঝুঁকি রিপোর্ট করুন' : 'File Hazard Report'}
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isBengali ? 'পরবর্তী ডেস্কে যান' : 'Next Station'} <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* ==============================================================
            BOTTOM 2D SIDE-SCROLLING OFFICE WALKTHROUGH ENVIRONMENT
        ============================================================== */}
        <div style={{
          position: 'relative',
          height: '190px',
          background: 'linear-gradient(180deg, #0b1220 0%, #060911 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          userSelect: 'none'
        }}>
          {/* Ambient Wall Lighting & Poster Boards */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '75px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            opacity: 0.35,
            pointerEvents: 'none'
          }}>
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                style={{
                  width: '38px',
                  height: '24px',
                  borderRadius: '3px',
                  border: '1px solid #38bdf8',
                  background: 'rgba(56, 189, 248, 0.15)',
                  boxShadow: '0 0 16px rgba(56, 189, 248, 0.3)'
                }}
              />
            ))}
          </div>

          {/* Wall Clock and Overhead Lights */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '48px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.5rem',
            color: '#ffffff'
          }}>
            🕒
          </div>

          {/* Interactive Desks Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 32px 34px',
            position: 'relative',
            zIndex: 2
          }}>
            {STATIONS.map((station, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={station.id}
                  onClick={() => handleSelect(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    width: '84px'
                  }}
                >
                  {/* Floating Desk Label Signboard */}
                  <div style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: isSelected ? '#38bdf8' : 'rgba(15, 23, 42, 0.85)',
                    color: isSelected ? '#0f172a' : '#94a3b8',
                    border: `1px solid ${isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)'}`,
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    marginBottom: '8px',
                    whiteSpace: 'nowrap',
                    boxShadow: isSelected ? '0 0 12px rgba(56, 189, 248, 0.5)' : 'none',
                    transition: 'all 0.2s ease'
                  }}>
                    {station.deskLabel}
                  </div>

                  {/* Monitor on Desk */}
                  <div style={{
                    width: '28px',
                    height: '20px',
                    background: isSelected ? '#1e293b' : '#0f172a',
                    border: `1.5px solid ${isSelected ? '#38bdf8' : '#334155'}`,
                    borderRadius: '3px',
                    position: 'relative',
                    boxShadow: isSelected ? '0 0 10px rgba(56, 189, 248, 0.7)' : 'none'
                  }}>
                    {/* Glowing screen graphic */}
                    <div style={{
                      position: 'absolute',
                      inset: '2px',
                      background: isSelected ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : '#1e293b',
                      borderRadius: '1px'
                    }} />
                    {/* Monitor Stand */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: '11px',
                      width: '6px',
                      height: '5px',
                      background: '#475569'
                    }} />
                  </div>

                  {/* Office Desk Table */}
                  <div style={{
                    width: '68px',
                    height: '24px',
                    background: isSelected ? 'linear-gradient(180deg, #334155, #1e293b)' : '#1e293b',
                    borderRadius: '4px 4px 0 0',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginTop: '5px',
                    position: 'relative'
                  }}>
                    {/* Desk Drawer Knob */}
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      right: '10px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#94a3b8'
                    }} />
                  </div>

                  {/* Office Plant accessory */}
                  {station.plant && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '-8px',
                      fontSize: '0.75rem'
                    }}>
                      🪴
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Walking Floor / Carpet Line */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: 0,
            right: 0,
            height: '34px',
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            borderTop: '2px solid rgba(56, 189, 248, 0.3)',
            zIndex: 1
          }}>
            {/* Floor tile line pattern */}
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)'
            }} />
          </div>

          {/* Animated 2D Walking Character Avatar */}
          <div 
            style={{
              position: 'absolute',
              bottom: '14px',
              left: `${avatarLeftPercent}%`,
              transform: 'translateX(-50%)',
              transition: 'left 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            {/* Field Officer Avatar Graphic */}
            <div style={{ position: 'relative' }}>
              {/* Head / Cap */}
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#fdba74',
                border: '1.5px solid #0f172a',
                position: 'relative',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                {/* Municipal Green Beret/Cap */}
                <div style={{
                  position: 'absolute',
                  top: '-3px',
                  left: '-2px',
                  width: '18px',
                  height: '7px',
                  background: '#047857',
                  borderRadius: '6px 6px 0 0'
                }} />
              </div>

              {/* Body / High-Vis Jacket */}
              <div style={{
                width: '20px',
                height: '20px',
                background: '#0284c7',
                borderRadius: '3px',
                marginTop: '1px',
                border: '1px solid #0f172a',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
              }}>
                {/* High-vis yellow safety stripe */}
                <div style={{
                  width: '6px',
                  height: '100%',
                  background: '#eab308'
                }} />
              </div>

              {/* Legs */}
              <div style={{
                display: 'flex',
                gap: '4px',
                justifyContent: 'center',
                marginTop: '1px'
              }}>
                <div style={{ width: '5px', height: '14px', background: '#1e293b', borderRadius: '1px' }} />
                <div style={{ width: '5px', height: '14px', background: '#1e293b', borderRadius: '1px' }} />
              </div>
            </div>

            {/* Pulsing Walking Shadow */}
            <div style={{
              width: '24px',
              height: '5px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.65)',
              marginTop: '-2px',
              filter: 'blur(1px)'
            }} />
          </div>

          {/* Left/Right Bottom Nav Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '8px',
              bottom: '40px',
              zIndex: 20,
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '8px',
              bottom: '40px',
              zIndex: 20,
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}