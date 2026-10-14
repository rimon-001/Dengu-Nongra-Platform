import React, { useState, useEffect } from 'react';
import { 
  X, Play, Pause, RotateCcw, CheckCircle2, AlertTriangle, 
  MapPin, ShieldCheck, Cpu, PlaneTakeoff, Award, ArrowRight, Sparkles 
} from 'lucide-react';

const SHOWCASE_STEPS = [
  {
    step: 1,
    titleEn: 'Step 1: Rapid Citizen Telemetry Ingestion',
    titleBn: 'ধাপ ১: তাৎক্ষণিক নাগরিক রিপোর্ট ও জিও-ট্যাগিং',
    descEn: 'A resident spots a stagnant rainwater puddle behind the cafeteria with mosquito larvae and uploads a photo in under 15 seconds.',
    descBn: 'ক্যাফেটেরিয়ার পেছনে জমে থাকা বৃষ্টির পানি ও লার্ভা দেখে একজন নাগরিক ছবি সহ ১৫ সেকেন্ডে রিপোর্ট জমা দেন।',
    icon: MapPin,
    color: '#dc2626',
    bg: '#fef2f2',
    actionTextEn: 'Simulating Ingestion Telemetry...',
    actionTextBn: 'সিমুলেশন রিপোর্ট ইনজেস্ট হচ্ছে...'
  },
  {
    step: 2,
    titleEn: 'Step 2: AI Computer Vision & Breteau Evaluation',
    titleBn: 'ধাপ ২: এআই ভিশন বিশ্লেষণ ও ব্রেটো ইনডেক্স রূপান্তর',
    descEn: 'Edge CV scans the uploaded container, flags positive pupae risk at 94% confidence, and calculates the ward Breteau Index (BI > 35).',
    descBn: 'এআই ভিশন ছবি বিশ্লেষণ করে ৯৪% নির্ভুলতায় লার্ভা শনাক্ত করে এবং ব্রেটো ইনডেক্স (BI > ৩৫) হিসেব করে সতর্কতা জারি করে।',
    icon: Cpu,
    color: '#8b5cf6',
    bg: '#f5f3ff',
    actionTextEn: 'Analyzing Neural Biofilm...',
    actionTextBn: 'এআই ভিশন স্ক্যান সম্পন্ন...'
  },
  {
    step: 3,
    titleEn: 'Step 3: Automated Volunteer Squad Dispatch',
    titleBn: 'ধাপ ৩: ভলান্টিয়ার স্কোয়াড মোবিলাইজেশন ও এসএলএ লক',
    descEn: 'The incident locks into the 48-hour municipal SLA countdown. Volunteer Squad Alpha claims the emergency dispatch.',
    descBn: '৪৮ ঘণ্টার এসএলএ সময়সীমা শুরু হয় এবং ফিল্ড স্কোয়াড আলফা কাজের দায়িত্ব গ্রহণ করে সাইটে পৌঁছায়।',
    icon: ShieldCheck,
    color: '#d97706',
    bg: '#fffbeb',
    actionTextEn: 'Locking Dispatch to Squad...',
    actionTextBn: 'স্কোয়াড ডিসপ্যাচ নিশ্চিত হচ্ছে...'
  },
  {
    step: 4,
    titleEn: 'Step 4: Biological Bti Larviciding & Proof Sign-Off',
    titleBn: 'ধাপ ৪: পরিবেশবান্ধব বিটিআই প্রয়োগ ও পরিচ্ছন্নতা প্রমাণ',
    descEn: 'Squad sprays Bacillus thuringiensis israelensis (Bti), drains stagnant water, and uploads mandatory "After" photographic proof.',
    descBn: 'স্কোয়াড নিরাপদ বিটিআই লার্ভিসাইড স্প্রে করে পানি নিষ্কাশন করে এবং সমাধানের প্রমাণ ছবি আপলোড করে।',
    icon: PlaneTakeoff,
    color: '#059669',
    bg: '#f0fdf4',
    actionTextEn: 'Verifying Cleaned State...',
    actionTextBn: 'পরিচ্ছন্নতা যাচাই হচ্ছে...'
  },
  {
    step: 5,
    titleEn: 'Step 5: Civic Rewards & Cryptographic Audit',
    titleBn: 'ধাপ ৫: নাগরিক পয়েন্ট অর্জন ও অডিট ট্রেইল সংরক্ষণ',
    descEn: 'Citizen and squad receive +50 civic points advancing to Gold Badge tier. Incident state is hashed via SHA-256 for compliance.',
    descBn: 'নাগরিক ও স্কোয়াডকে +৫০ পয়েন্ট দিয়ে গোল্ড ব্যাজে উন্নীত করা হয় এবং SHA-256 হ্যাশ দ্বারা অডিট লগে রেকর্ড সংরক্ষিত হয়।',
    icon: Award,
    color: '#0284c7',
    bg: '#f0f9ff',
    actionTextEn: 'Crediting Points & Ledger...',
    actionTextBn: 'পয়েন্ট ও সার্টিফিকেট প্রদান সম্পন্ন...'
  }
];

export default function ShowcaseRunnerModal({
  isOpen,
  onClose,
  onTriggerSimulate,
  isBengali = false
}) {
  if (!isOpen) return null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const activeStep = SHOWCASE_STEPS[currentStepIndex];
  const StepIcon = activeStep.icon;

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < SHOWCASE_STEPS.length - 1) {
            return prev + 1;
          } else {
            setIsRunning(false);
            return prev;
          }
        });
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsRunning(true);
    if (onTriggerSimulate) {
      onTriggerSimulate();
    }
  };

  const handleNext = () => {
    if (currentStepIndex < SHOWCASE_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        style={{ maxWidth: '640px', maxHeight: '92vh', overflowY: 'auto' }}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={22} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                  {isBengali ? '৬০ সেকেন্ডের লাইভ জুরি পিচ ডেমো' : '60s Live Pitch Demo Runner'}
                </h2>
                <span style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 800, textTransform: 'uppercase' }}>
                  {isBengali ? 'সম্পূর্ণ ভেক্টর সার্ভিল্যান্স সাইকেলের অটোমেটেড ওয়াকথ্রু' : 'Automated End-to-End Surveillance Cycle'}
                </span>
              </div>
            </div>

            {/* Play / Pause / Restart Controls */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setIsRunning(!isRunning)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  background: isRunning ? '#fef3c7' : '#f1f5f9',
                  color: isRunning ? '#b45309' : '#334155',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {isRunning ? <Pause size={12} /> : <Play size={12} />}
                {isRunning ? (isBengali ? 'পজ' : 'Pause') : (isBengali ? 'চালান' : 'Resume')}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  background: '#ffffff',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={12} /> {isBengali ? 'রিস্টার্ট' : 'Restart'}
              </button>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '18px' }}>
            {SHOWCASE_STEPS.map((s, idx) => (
              <div
                key={s.step}
                onClick={() => { setCurrentStepIndex(idx); setIsRunning(false); }}
                style={{
                  flex: 1,
                  height: '6px',
                  borderRadius: '3px',
                  background: idx <= currentStepIndex ? s.color : '#e2e8f0',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
              />
            ))}
          </div>

          {/* Active Step Presentation Card */}
          <div style={{
            background: activeStep.bg,
            border: `2px solid ${activeStep.color}40`,
            borderRadius: '16px',
            padding: '22px',
            marginBottom: '18px',
            boxShadow: `0 8px 24px ${activeStep.color}15`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: activeStep.color,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${activeStep.color}40`
              }}>
                <StepIcon size={24} />
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: activeStep.color }}>
                  Stage {activeStep.step} of 5
                </span>
                <h3 style={{ margin: '2px 0 0', fontSize: '1.15rem', fontWeight: 900, color: '#0f172a' }}>
                  {isBengali ? activeStep.titleBn : activeStep.titleEn}
                </h3>
              </div>
            </div>

            <p style={{ margin: '0 0 16px', fontSize: '0.86rem', color: '#334155', lineHeight: 1.55 }}>
              {isBengali ? activeStep.descBn : activeStep.descEn}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#ffffff',
              border: `1px solid ${activeStep.color}30`,
              fontSize: '0.76rem',
              color: activeStep.color,
              fontWeight: 800
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} />
                {isBengali ? activeStep.actionTextBn : activeStep.actionTextEn}
              </span>
              <span>{Math.round(((currentStepIndex + 1) / SHOWCASE_STEPS.length) * 100)}% Complete</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentStepIndex === 0 ? 0.5 : 1
              }}
            >
              Previous
            </button>

            {currentStepIndex < SHOWCASE_STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary"
                style={{ width: 'auto', padding: '8px 20px', fontSize: '0.78rem' }}
              >
                Next Stage <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="btn-primary"
                style={{ width: 'auto', padding: '8px 20px', fontSize: '0.78rem', background: '#059669' }}
              >
                Close Presentation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}