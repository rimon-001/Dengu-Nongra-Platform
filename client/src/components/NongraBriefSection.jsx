import React from 'react';
import { 
  ShieldAlert, Target, Award, Cpu, Droplets, MapPin, 
  CheckCircle2, ArrowRight, Sparkles, BookOpen, Clock, Users,
  Activity, Zap, Building2, Flame, Globe2, Leaf, FileText, CheckSquare
} from 'lucide-react';

export default function NongraBriefSection({ 
  onOpenTour, 
  onOpenReport, 
  onOpenQuiz,
  isBengali = false 
}) {
  return (
    <section 
      id="nongra-about-section"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        border: '1.5px solid #0f766e33',
        padding: '30px 26px',
        marginTop: '36px',
        marginBottom: '24px',
        boxShadow: '0 10px 32px rgba(15, 23, 42, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* DIU Green Earth Club & Competition Header Ribbon */}
      <div style={{
        background: 'linear-gradient(90deg, #064e3b 0%, #0f766e 100%)',
        margin: '-30px -26px 24px -26px',
        padding: '12px 26px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: 800 }}>
          <Leaf size={16} color="#34d399" />
          <span>
            {isBengali 
              ? 'সাসটেইনেবল প্রজেক্ট কম্পিটিশন ২০২৬ • ডিআইইউ গ্রিন আর্থ ক্লাব (DIUGEC)' 
              : 'SUSTAINABLE PROJECT COMPETITION 2026 • DIU GREEN EARTH CLUB (DIUGEC)'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 900,
            padding: '2px 8px',
            borderRadius: '12px',
            background: '#10b981',
            color: '#064e3b'
          }}>
            {isBengali ? 'স্ট্যাটাস: কার্যকরী প্রোটোটাইপ' : 'Status: Working Prototype'}
          </span>
        </div>
      </div>

      {/* Header Pill & Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(15, 118, 110, 0.35)'
          }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
                {isBengali 
                  ? 'নংরা (Nongra) — স্মার্ট মিউনিসিপ্যাল ডেঙ্গু ভেক্টর নজরদারি' 
                  : 'নংরা (Nongra) — Smart Municipal Dengue Vector Surveillance'}
              </h2>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
              {isBengali
                ? 'নাগরিক টেলিমেট্রি ও এআই সমন্বিত ডেঙ্গু ভেক্টর নজরদারি ও টেকসই পরিবেশগত প্রতিকার ব্যবস্থা'
                : 'Full-stack civic-tech vector surveillance platform designed to curb mosquito-borne epidemics (Dengue/Chikungunya)'}
            </p>
          </div>
        </div>

        {/* Action Button: Opens the 2D Office Walkthrough */}
        {onOpenTour && (
          <button
            type="button"
            onClick={onOpenTour}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '20px',
              background: '#0f172a',
              color: '#38bdf8',
              border: '1px solid #38bdf844',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Sparkles size={14} color="#38bdf8" />
            {isBengali ? 'ইন্টারেক্টিভ ওয়াকথ্রু শুরু' : 'Launch Presentation Tour'}
          </button>
        )}
      </div>

      {/* ==============================================================
          SERIAL STEP-BY-STEP VERTICAL FLOW (ONE AFTER ANOTHER)
      ============================================================== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        
        {/* STEP 1: PROJECT OVERVIEW & DUAL-TIER LOOP */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              background: 'var(--color-primary)',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              {isBengali ? 'ধাপ ১' : 'STEP 1'}
            </span>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>
              {isBengali ? 'প্রকল্প বিবরণ ও দ্বৈত লুপ (Dual-Tier Engagement Loop)' : 'Project Overview & Dual-Tier Engagement Loop'}
            </h3>
          </div>

          <p style={{ margin: '0 0 14px', fontSize: '0.84rem', color: '#334155', lineHeight: 1.6 }}>
            {isBengali ? (
              <>
                <strong>নংরা (Nongra)</strong> হলো একটি ফুল-স্ট্যাক সিভিক-টেক ভেক্টর সার্ভিল্যান্স প্ল্যাটফর্ম, যা পরিবেশগত প্রতিকার ও জনঅংশগ্রহণের মাধ্যমে মশাবাহিত রোগ—বিশেষ করে <em>এডিস ইজিপ্টি</em> (ডেঙ্গু/চিকুনগুনিয়া)—প্রতিরোধ করতে তৈরি করা হয়েছে। সিস্টেমটি একটি দ্বৈত লুপের মাধ্যমে পরিচালিত হয়:
              </>
            ) : (
              <>
                <strong>নংরা (Nongra)</strong> is a full-stack civic-tech vector surveillance platform designed to curb mosquito-borne epidemics, specifically <em>Aedes aegypti</em> (Dengue/Chikungunya), through community-driven environmental remediation. The system operates via a dual-tier engagement loop:
              </>
            )}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f766e', fontWeight: 800, fontSize: '0.82rem', marginBottom: '4px' }}>
                <Target size={15} /> {isBengali ? '১. উন্মুক্ত নাগরিক টেলিমেট্রি' : '1. Frictionless Civic Telemetry'}
              </div>
              <p style={{ margin: 0, fontSize: '0.76rem', color: '#475569', lineHeight: 1.5 }}>
                {isBengali
                  ? 'এলাকার বাসিন্দা ও বিশ্ববিদ্যালয়ের শিক্ষার্থীরা কোনো ধরনের জটিল লগইন প্রক্রিয়া ছাড়াই সরাসরি জমে থাকা পানির ছবি ও জিপিএস পিনযুক্ত রিপোর্ট জমা দেন।'
                  : 'Local residents and university students submit geo-tagged visual evidence of stagnant water reservoirs without mandatory login barriers.'}
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: 800, fontSize: '0.82rem', marginBottom: '4px' }}>
                <Cpu size={15} /> {isBengali ? '২. স্কোয়াড ট্রায়াজ ও ভেক্টর নির্মূল' : '2. Squad Triage & Vector Neutralization'}
              </div>
              <p style={{ margin: 0, fontSize: '0.76rem', color: '#475569', lineHeight: 1.5 }}>
                {isBengali
                  ? 'নিবন্ধিত ভলান্টিয়ার স্কোয়াডগুলো রিয়েল-টাইম ডিসপ্যাচ অ্যালার্ট পায়, সাইটের দায়িত্ব গ্রহণ করে, রুট অপ্টিমাইজার দিয়ে দ্রুত পৌঁছে জৈব লার্ভিসাইড (Bti) স্প্রে করে এবং পরিচ্ছন্নতার ছবি আপলোড করে।'
                  : 'Authorized field volunteer squads receive real-time dispatch alerts, claim hazard sites, navigate via a built-in TSP route optimizer, and submit photographic proof of bio-larvicide (Bacillus thuringiensis israelensis - Bti) application.'}
              </p>
            </div>
          </div>

          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px 14px', borderRadius: '10px', fontSize: '0.78rem', color: '#065f46', lineHeight: 1.5 }}>
            <strong>{isBengali ? 'পরিবেশগত টেকসই উন্নয়ন লক্ষ্য:' : 'Environmental Sustainability Focus:'}</strong>{' '}
            {isBengali
              ? 'প্ল্যাটফর্মটি অনিয়ন্ত্রিত কঠিন বর্জ্য ও নালার জলাবদ্ধতার কারণে সৃষ্ট পরিবেশগত সংকট সমাধান করে। স্থানীয় আবহাওয়াভিত্তিক ডিম ফোটার সময়কাল এবং বিশ্ব স্বাস্থ্য সংস্থার ব্রেটো সূচক (BI) হিসেব করে নংরা ক্ষতিকর রাসায়নিক ফগিংয়ের পরিবর্তে নিরাপদ জৈব লার্ভিসাইডের মাধ্যমে মশার বংশবৃদ্ধি অঙ্কুরেই ধ্বংস করে।'
              : 'The platform addresses environmental unsustainability caused by uncontrolled solid waste accumulation and unmaintained storm drainage. By calculating localized micro-climatic incubation rates and WHO Breteau Index thresholds (BI), Nongra transitions vector control from reactive post-hospitalization chemical fogging to proactive biological mitigation, safeguarding community health while curbing urban sanitary degradation.'}
          </div>
        </div>

        {/* STEP 2: PROBLEM STATEMENT */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #fecaca',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              background: '#dc2626',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              {isBengali ? 'ধাপ ২' : 'STEP 2'}
            </span>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#991b1b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={17} color="#dc2626" /> {isBengali ? 'সমস্যা পর্যালোচনা (Problem Statement)' : 'Problem Statement'}
            </h3>
          </div>

          <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '14px', borderRadius: '10px', fontSize: '0.8rem', color: '#7f1d1d', lineHeight: 1.65 }}>
            {isBengali
              ? 'আশুলিয়া ও বিশ্ববিদ্যালয় ক্যাম্পাসের মতো ঘনবসতিপূর্ণ এলাকায় দ্রুত উপশহরীয় বৃদ্ধি, প্লাস্টিক বর্জ্যের অব্যবস্থাপনা এবং ড্রেনেজ ব্লক স্থায়ী জলাবদ্ধতা তৈরি করে। সনাতন মিউনিসিপ্যাল মশক নিধন ব্যবস্থা কেবল হাসপাতালে রোগী ভর্তির পরেই বিষাক্ত কেমিক্যাল ফগিং করে সাড়া দেয়। অথচ সাধারণ নাগরিকরা প্রতিদিন যে প্রজননস্থলগুলো দেখতে পান এবং দ্রুত সাড়াদানকারী স্কোয়াড—এই দুইয়ের মাঝে কোনো কার্যকরী সমন্বয় ছিল না।'
              : 'Rapid peri-urban growth, improper plastic waste disposal, and clogged drainage networks across high-density academic and residential zones (such as Ashulia and university campuses) create pervasive stagnant water reservoirs. Traditional municipal vector control is fundamentally retrospective—responding with toxic chemical fogging only after hospitalizations surge. A critical coordination gap exists between residents who spot micro-breeding sites daily and rapid response teams equipped to remediate them before larvae hatch into adult disease vectors.'}
          </div>
        </div>

        {/* STEP 3: CORE OBJECTIVES */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              background: '#0284c7',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              {isBengali ? 'ধাপ ৩' : 'STEP 3'}
            </span>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>
              {isBengali ? 'মূল লক্ষ্যসমূহ (The 4 Pillars)' : 'Objectives (The 4 Pillars)'}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f766e', fontWeight: 800, fontSize: '0.8rem', marginBottom: '3px' }}>
                <CheckCircle2 size={14} /> {isBengali ? '১. তৃণমূল পর্যায় থেকে ঝুঁকি ইনজেশন' : '1. Grassroots Hazard Ingestion'}
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
                {isBengali
                  ? 'নাগরিকদের জন্য মোবাইল-ফার্স্ট উন্মুক্ত ইন্টারফেস, যার মাধ্যমে যে কেউ অত্যন্ত নির্ভুল জিপিএস দিয়ে পানি জমার স্থান রিপোর্ট করতে পারেন।'
                  : 'Provide zero-friction, mobile-first reporting for citizens to flag stagnant puddles and illegal waste sumps with GPS precision.'}
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: 800, fontSize: '0.8rem', marginBottom: '3px' }}>
                <CheckCircle2 size={14} /> {isBengali ? '২. ফিল্ড স্কোয়াড ট্রায়াজ ও রুট প্ল্যানিং' : '2. Operational Squad Triage'}
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
                {isBengali
                  ? 'ভলান্টিয়ার স্কোয়াড ও পরিচ্ছন্নতাকর্মীদের জন্য রিয়েল-টাইম কিউ, রুট অপ্টিমাইজার এবং যাচাইকৃত রেজোলিউশন লগিং ব্যবস্থা।'
                  : 'Equip field volunteers and university sanitation clubs with a real-time dispatch hub featuring route optimization and verified resolution logging.'}
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#d97706', fontWeight: 800, fontSize: '0.8rem', marginBottom: '3px' }}>
                <CheckCircle2 size={14} /> {isBengali ? '৩. বৈজ্ঞানিক ঝুঁকি পরিমাপ ও পূর্বাভাস' : '3. Epidemiological Risk Quantification'}
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
                {isBengali
                  ? 'স্বয়ংক্রিয় ডব্লিউএইচও ব্রেটো ইনডেক্স (BI) গণনা এবং আবহাওয়ার পূর্বাভাস মডেলিং দিয়ে ডেঙ্গু প্রাদুর্ভাবের আগে সতর্কীকরণ।'
                  : 'Implement automated WHO Breteau Index (BI) calculations and climate-based larval incubation modeling to predict outbreak surges.'}
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#7c3aed', fontWeight: 800, fontSize: '0.8rem', marginBottom: '3px' }}>
                <CheckCircle2 size={14} /> {isBengali ? '৪. স্বচ্ছ মিউনিসিপ্যাল গভর্নেন্স' : '4. Transparent Municipal Governance'}
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
                {isBengali
                  ? 'অডিট ট্রেইলে ক্রিপ্টোগ্রাফিক হ্যাশ তৈরি করা যাতে কোনো ভুয়া পরিচ্ছন্নতা অভিযান না হয় এবং স্বচ্ছ জবাবদিহিতা থাকে।'
                  : 'Maintain an immutable audit ledger of all sanitary interventions to hold local authorities and community leaders accountable.'}
              </p>
            </div>
          </div>
        </div>

        {/* STEP 4: COMPETITION DISCIPLINES & STATUS */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              background: '#059669',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              {isBengali ? 'ধাপ ৪' : 'STEP 4'}
            </span>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>
              {isBengali ? 'প্রতিযোগিতার সংশ্লিষ্ট ক্ষেত্র ও বর্তমান স্ট্যাটাস' : 'Competition Disciplines & Project Status'}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
            {(isBengali ? [
              'জলবায়ু ও পরিবেশগত স্থায়িত্ব',
              'বর্জ্য ব্যবস্থাপনা ও সার্কুলার অর্থনীতি',
              'পানি ও পয়ঃনিষ্কাশন ব্যবস্থা',
              'টেকসই শহর, ভবন ও পরিবহন',
              'স্বাস্থ্য, শিক্ষা ও সার্বিক কল্যাণ',
              'কমিউনিটি উন্নয়ন, অন্তর্ভুক্তি ও সহনশীলতা'
            ] : [
              'Climate & Environmental Sustainability',
              'Waste Management & Circular Economy',
              'Water & Sanitation',
              'Sustainable Cities, Buildings & Transport',
              'Health, Education & Well-being',
              'Community Development, Inclusion & Resilience'
            ]).map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckSquare size={13} color="#059669" /> {item}
              </div>
            ))}
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>
                {isBengali ? 'বর্তমান ডেভেলপমেন্ট স্ট্যাটাস' : 'CURRENT DEVELOPMENT STATUS'}
              </span>
              <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#0f766e' }}>
                {isBengali 
                  ? '🟢 ওয়ার্কিং প্রোটোটাইপ (সক্রিয় জিআইএস গ্রিড, নোড/এসকিউলাইট ব্যাকএন্ড ও রোল গার্ড)' 
                  : '🟢 Working Prototype (Live Functional GIS Grid, Node/SQLite & Role RBAC)'}
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontWeight: 800 }}>
              {isBengali ? 'ডিআইইউ স্মার্ট ক্যাম্পাস ও আশুলিয়া' : 'DIU Smart Campus & Ashulia'}
            </span>
          </div>
        </div>

        {/* STEP 5: SUSTAINABILITY & SDG IMPACT */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              background: '#7c3aed',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              {isBengali ? 'ধাপ ৫' : 'STEP 5'}
            </span>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>
              {isBengali ? 'টেকসই প্রভাব ও জাতিসংঘের এসডিজি (UN SDGs)' : 'Expected Impact on Sustainability & UN SDGs'}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 800, fontSize: '0.82rem', marginBottom: '4px' }}>
                <CheckCircle2 size={14} /> {isBengali ? '১. এসডিজি ৩: সুস্বাস্থ্য ও কল্যাণ (টার্গেট ৩.৩)' : '1. SDG 3: Good Health and Well-Being (Target 3.3)'}
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#14532d', lineHeight: 1.5 }}>
                {isBengali
                  ? 'সরাসরি প্রজননস্থল ধ্বংসের মাধ্যমে মৌসুমি ডেঙ্গু বিস্তার হ্রাস করে হাসপাতালে ভর্তি এবং শিক্ষার্থীদের অসুস্থতাজনিত অনুপস্থিতি উল্লেখযোগ্য হারে কমায়।'
                  : 'Direct suppression of vector proliferation reduces seasonal Dengue incidence, lowering clinical admissions and student absentee rates.'}
              </p>
            </div>

            <div style={{ background: '#eff6ff', padding: '14px', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1e40af', fontWeight: 800, fontSize: '0.82rem', marginBottom: '4px' }}>
                <Building2 size={14} /> {isBengali ? '২. এসডিজি ১১: টেকসই শহর ও জনপদ (টার্গেট ১১.৬)' : '2. SDG 11: Sustainable Cities & Communities (Target 11.6)'}
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#1e3a8a', lineHeight: 1.5 }}>
                {isBengali
                  ? 'একবার ব্যবহারযোগ্য প্লাস্টিক পাত্র অপসারণ এবং স্থানীয় ড্রেনেজ ব্যবস্থা পরিষ্কারের মাধ্যমে আশুলিয়ার সার্বিক পয়ঃনিষ্কাশন ব্যবস্থার উন্নয়ন ঘটায়।'
                  : 'Systematic removal of discarded single-use plastic containers and unblocking of communal storm drains improves localized urban sanitation.'}
              </p>
            </div>

            <div style={{ background: '#faf5ff', padding: '14px', borderRadius: '10px', border: '1px solid #e9d5ff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b21a8', fontWeight: 800, fontSize: '0.82rem', marginBottom: '4px' }}>
                <Leaf size={14} /> {isBengali ? '৩. এসডিজি ১৩: জলবায়ু কার্যক্রম (Climate Action)' : '3. SDG 13: Climate Action'}
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#581c87', lineHeight: 1.5 }}>
                {isBengali
                  ? 'নির্বিচার ক্ষতিকর কীটনাশকের পরিবর্তে পরিবেশবান্ধব ব্যাকটেরিয়া লার্ভিসাইড (Bti) প্রয়োগ করা হয়, যা পরাগায়নকারী কীট ও জলজ প্রাণীর কোনো ক্ষতি করে না।'
                  : 'Employs targeted biological larvicides (Bti) rather than indiscriminate organophosphate spraying, preserving beneficial non-target aquatic insects and pollinators.'}
              </p>
            </div>

            <div style={{ background: '#fffbeb', padding: '14px', borderRadius: '10px', border: '1px solid #fde68a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#92400e', fontWeight: 800, fontSize: '0.82rem', marginBottom: '4px' }}>
                <Globe2 size={14} /> {isBengali ? '৪. এসডিজি ১৭: অংশীদারিত্ব (Partnerships for the Goals)' : '4. SDG 17: Partnerships for the Goals'}
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#78350f', lineHeight: 1.5 }}>
                {isBengali
                  ? 'বিশ্ববিদ্যালয়ের তরুণ স্বেচ্ছাসেবী, স্থানীয় বাসিন্দা ও স্বাস্থ্য সংস্থাকে একটি প্ল্যাটফর্মে যুক্ত করে সমন্বিত প্রতিরোধ গড়ে তোলে।'
                  : 'Connects campus youth volunteers, community residents, and local municipal health agencies onto a shared operational grid.'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Footnote Actions */}
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
          {isBengali 
            ? '💡 ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি ক্যাম্পাস ও আশুলিয়া ইউনিয়নের জন্য কাস্টমাইজড।' 
            : '💡 Tailored specifically for Daffodil International University Smart Campus & Ashulia.'}
        </span>

        <div style={{ display: 'flex', gap: '8px' }}>
          {onOpenReport && (
            <button
              type="button"
              onClick={onOpenReport}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'var(--color-primary)',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <MapPin size={13} /> {isBengali ? 'ঝুঁকি রিপোর্ট দিন' : 'Report Hazard'}
            </button>
          )}

          {onOpenQuiz && (
            <button
              type="button"
              onClick={onOpenQuiz}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 14px',
                borderRadius: '8px',
                background: '#ecfdf5',
                color: '#047857',
                border: '1px solid #a7f3d0',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <BookOpen size={13} /> {isBengali ? 'কুইজ ও জ্ঞানকোষ' : 'Dengue Quiz'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}