import React, { useState, useEffect } from 'react';
import { X, Play, CheckCircle2, Loader2, Sparkles, ShieldCheck, MapPin, Navigation, Droplets, FileCheck } from 'lucide-react';

export default function ShowcaseRunnerModal({ isOpen, onClose, onTriggerSimulate, isBengali = false }) {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    {
      title: isBengali ? '১. নাগরিক রিপোর্টিং ও এআই লার্ভা শনাক্তকরণ' : '1. Citizen Geo-Telemetry Ingestion',
      detail: isBengali ? 'উন্মুক্ত ছাদে বৃষ্টির পানির ছবি ও জিপিএস কোঅর্ডিনেট সংগৃহীত।' : 'Incoming report validated via edge neural scanner (92% stagnancy confidence).',
      icon: MapPin,
      color: '#dc2626'
    },
    {
      title: isBengali ? '২. ডিজিএইচএস ব্রুটো ইনডেক্স ও প্রাদুর্ভাব পূর্বাভাস' : '2. Breteau Matrix & Epidemiological Triage',
      detail: isBengali ? 'ব্রুটো ইনডেক্স (BI > 20) বিশ্লেষণে জরুরি ফগিং অগ্রাধিকার নির্ধারণ।' : 'BI threshold evaluated; climate engine calculates 6-day pupal hatch acceleration.',
      icon: Droplets,
      color: '#d97706'
    },
    {
      title: isBengali ? '৩. স্বয়ংক্রিয় ভলান্টিয়ার টাস্ক ও টিএসপি রুট ডেসপ্যাচ' : '3. Squad Dispatch & Heuristic TSP Routing',
      detail: isBengali ? 'নিকটতম ভলান্টিয়ার স্কোয়াড ‘A’ দায়িত্ব গ্রহণ করেছে এবং সংক্ষিপ্ত রুট জেনারেট হয়েছে।' : 'Nearest-Neighbor walk sequence dispatched to field captains with turn-by-turn nav.',
      icon: Navigation,
      color: '#0284c7'
    },
    {
      title: isBengali ? '৪. বিটিআই বায়ো-লার্ভিসাইড প্রয়োগ ও মজুত আপডেট' : '4. Biological Bti Treatment & Stock Burn',
      detail: isBengali ? '১.৫ কেজি বিটিআই লার্ভিসাইড স্প্রে প্রয়োগ ও স্টক লেজার সমন্বয়।' : 'Chemical ledger deducts 1.5 kg Bti powder; safety compliance verified.',
      icon: Sparkles,
      color: '#059669'
    },
    {
      title: isBengali ? '৫. অপরিবর্তনযোগ্য পৌরসভা অডিট ও স্বাস্থ্য ছাড়পত্র' : '5. Immutable Audit Log & Sanitary Gazette',
      detail: isBengali ? 'ডিজিটাল ট্রানজ্যাকশন আইডি ও সরকারি ছাড়পত্র সনদ স্বয়ংক্রিয়ভাবে সংরক্ষিত।' : 'SHA-256 state locked into SQLite WAL ledger; official clearance gazette issued.',
      icon: FileCheck,
      color: '#16a34a'
    }
  ];

  const handleStartDemo = () => {
    setIsRunning(true);
    setCurrentStep(1);
    if (onTriggerSimulate) onTriggerSimulate();

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length) {
          clearInterval(interval);
          setIsRunning(false);
          return steps.length;
        }
        return prev + 1;
      });
    }, 2400);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Play size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'লাইভ জুরি ডেমো ও অটোমেটেড শোকেস' : 'Automated Jury Pitch & Live Workflow Demo'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 700, textTransform: 'uppercase' }}>
                {isBengali ? '৬০ সেকেন্ডের এন্ড-টু-এন্ড সিমুলেশন' : '60-Second Full Lifecycle Simulation'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
            {isBengali
              ? 'বিচারক বা পরিদর্শকদের সামনে সম্পূর্ণ ভেক্টর কন্ট্রোল সাইকেলটি ধাপে ধাপে স্বয়ংক্রিয়ভাবে উপস্থাপন করুন।'
              : 'Executes an automated, real-time lifecycle sequence demonstrating civic reporting, predictive entomology, dispatch routing, and municipal audit verification.'}
          </p>

          {/* Stepper Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const stepNum = idx + 1;
              const isPassed = currentStep > stepNum;
              const isActive = currentStep === stepNum;

              return (
                <div
                  key={idx}
                  style={{
                    border: `1px solid ${isActive ? step.color : isPassed ? '#bbf7d0' : 'var(--border)'}`,
                    borderRadius: '10px',
                    padding: '12px 14px',
                    background: isActive ? `${step.color}08` : isPassed ? '#f0fdf4' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isPassed ? '#16a34a' : isActive ? step.color : '#f1f5f9',
                    color: isPassed || isActive ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isPassed ? <CheckCircle2 size={16} /> : isActive ? <Loader2 size={16} className="spin-anim" /> : <Icon size={16} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '0.84rem', color: '#1e293b' }}>{step.title}</strong>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: isPassed ? '#16a34a' : isActive ? step.color : '#94a3b8' }}>
                        {isPassed ? 'COMPLETED' : isActive ? 'PROCESSING...' : 'PENDING'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                      {step.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Runner Controls */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={handleStartDemo}
              disabled={isRunning}
              className="btn-primary"
              style={{
                flex: 1,
                background: isRunning ? '#94a3b8' : 'var(--color-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.84rem'
              }}
            >
              <Play size={16} />
              {isRunning
                ? (isBengali ? 'সিমুলেশন চলছে...' : 'Demo Running In Progress...')
                : (isBengali ? '৬০ সেকেন্ডের ডেমো শুরু করুন' : 'Run 60s Live Pitch Demo')}
            </button>

            {currentStep > 0 && !isRunning && (
              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isBengali ? 'রিসেট' : 'Reset'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}