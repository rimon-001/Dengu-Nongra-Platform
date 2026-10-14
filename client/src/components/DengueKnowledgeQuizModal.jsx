import React, { useState } from 'react';
import { 
  X, BookOpen, Award, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, Lock, ArrowRight, RotateCcw, ShieldCheck, HeartPulse, 
  Activity, Calendar, Droplets, Info 
} from 'lucide-react';

const DENGUE_QUIZ_QUESTIONS = [
  {
    id: 1,
    questionEn: 'Which species of mosquito is the primary vector responsible for transmitting Dengue virus in Bangladesh?',
    questionBn: 'বাংলাদেশে ডেঙ্গু ভাইরাসের প্রধান বাহক মশার প্রজাতি কোনটি?',
    optionsEn: ['Anopheles stephensi', 'Aedes aegypti', 'Culex quinquefasciatus', 'Mansonia annulifera'],
    optionsBn: ['অ্যানোফিলিস স্টিফেনসি', 'এডিস ইজিপ্টি (Aedes aegypti)', 'কিউলেক্স কুইনকিফ্যাসিয়াটাস', 'ম্যানসোনিয়া অ্যানুলিফেরা'],
    correctIndex: 1,
    explanationEn: 'Aedes aegypti (and to a lesser degree Aedes albopictus) is the primary daytime-biting mosquito vector transmitting the dengue flavivirus.',
    explanationBn: 'এডিস ইজিপ্টি (Aedes aegypti) মূলত দিনের বেলায় কামড়ানো মশা যা ডেঙ্গু ফ্ল্যাভিভাইরাস ছড়ানোর প্রধান বাহক।'
  },
  {
    id: 2,
    questionEn: 'Which medication is strictly contraindicated during suspected Dengue onset due to severe internal hemorrhage risk?',
    questionBn: 'ডেঙ্গু সন্দেহ হলে অভ্যন্তরীণ রক্তক্ষরণের ঝুঁকির কারণে কোন জাতীয় ওষুধ খাওয়া সম্পূর্ণ নিষেধ?',
    optionsEn: ['Paracetamol', 'Oral Rehydration Solution (ORS)', 'Aspirin and Ibuprofen (NSAIDs)', 'Vitamin C'],
    optionsBn: ['প্যারাসিটামল', 'খাওয়ার স্যালাইন (ORS)', 'অ্যাসপিরিন ও আইবুপ্রোফেন (NSAIDs)', 'ভিটামিন সি'],
    correctIndex: 2,
    explanationEn: 'NSAIDs like Aspirin, Ibuprofen, and Naproxen disrupt blood platelet aggregation and sharply increase gastrointestinal bleeding risks in Dengue patients.',
    explanationBn: 'অ্যাসপিরিন ও আইবুপ্রোফেনের মতো ব্যথানাশক রক্তের প্লেটলেটের কাজ ব্যাহত করে মারাত্মক অভ্যন্তরীণ রক্তক্ষরণের ঝুঁকি বহুগুণ বাড়িয়ে দেয়।'
  },
  {
    id: 3,
    questionEn: 'What does a WHO Breteau Index (BI) exceeding 20 signify in municipal vector surveillance?',
    questionBn: 'পৌর কীটতাত্ত্বিক জরিপে ব্রেটো ইনডেক্স (BI) ২০ অতিক্রম করলে তা কী নির্দেশ করে?',
    optionsEn: ['Negligible transmission potential', 'High epidemic transmission risk', 'Mosquitoes are strictly sterile', 'Water is safe for consumption'],
    optionsBn: ['সংক্রমণের সম্ভাবনা নেই', 'উচ্চমাত্রার ডেঙ্গু মহামারী বা সংক্রমণ ঝুঁকি', 'মশাদের প্রজনন ক্ষমতা নষ্ট', 'পানি সম্পূর্ণ নিরাপদ'],
    correctIndex: 1,
    explanationEn: 'A Breteau Index (positive containers per 100 premises) greater than 20 is the official WHO & DGHS threshold for explosive outbreak risk requiring urgent larviciding.',
    explanationBn: 'প্রতি ১০০টি বাড়িতে ২০টির বেশি লার্ভাযুক্ত পাত্র পাওয়া গেলে (BI > 20) বিশ্ব স্বাস্থ্য সংস্থা ও ডিজিএইচএস-এর নিয়মানুযায়ী তা জরুরি প্রাদুর্ভাব এলাকা হিসেবে চিহ্নিত হয়।'
  },
  {
    id: 4,
    questionEn: 'In what year was the first officially recorded major Dengue epidemic documented in Bangladesh?',
    questionBn: 'বাংলাদেশে প্রথম আনুষ্ঠানিকভাবে বড় আকারের ডেঙ্গু মহামারী কোন সালে নথিভুক্ত হয়েছিল?',
    optionsEn: ['1971', '1985', '2000', '2019'],
    optionsBn: ['১৯৭১', '১৯৮৫', '২০০০', '২০১৯'],
    correctIndex: 2,
    explanationEn: 'The first recognized nationwide dengue epidemic occurred in the year 2000, registering over 5,500 clinical cases, with subsequent massive spikes in 2019 and 2023.',
    explanationBn: 'বাংলাদেশে আনুষ্ঠানিকভাবে প্রথম বড় পরিসরের ডেঙ্গু প্রাদুর্ভাব ঘটে ২০০০ সালে, যাতে প্রায় ৫,৫০০ জন আক্রান্ত হন। পরবর্তীতে ২০১৯ এবং ২০২৩ সালে রেকর্ড সংক্রমণ দেখা যায়।'
  },
  {
    id: 5,
    questionEn: 'How frequently must domestic water reservoirs and cooling trays be emptied to permanently break the Aedes pupation cycle?',
    questionBn: 'এডিস মশার ডিম থেকে পিউপা হওয়ার জীবনচক্র ধ্বংস করতে কমপক্ষে কতদিন পর পর জমে থাকা পানি ফেলে দেওয়া উচিত?',
    optionsEn: ['Every 3 days', 'Every 14 days', 'Once a month', 'Every 21 days'],
    optionsBn: ['প্রতি ৩ দিন পর পর', 'প্রতি ১৪ দিন পর পর', 'মাসে একবার', 'প্রতি ২১ দিন পর পর'],
    correctIndex: 0,
    explanationEn: 'Under tropical heat (28-32°C), Aedes larvae can complete development in 7 to 9 days. Evacuating water every 3 days prevents larvae from ever maturing into biting adults.',
    explanationBn: 'উচ্চ তাপমাত্রায় এডিস লার্ভা পূর্ণাঙ্গ মশা হতে ৭-৯ দিন সময় নেয়। তাই প্রতি ৩ দিনে পানি ফেলে দিলে মশার বংশবৃদ্ধি সম্পূর্ণ বন্ধ হয়।'
  }
];

export default function DengueKnowledgeQuizModal({ 
  isOpen, 
  onClose, 
  user, 
  onRewardEarned, 
  onOpenAuth, 
  isBengali = false 
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('knowledge'); // 'knowledge' | 'quiz'
  const [knowledgeSection, setKnowledgeSection] = useState('overview'); // 'overview' | 'treatment' | 'history' | 'prevention'

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [pointsClaimed, setPointsClaimed] = useState(false);

  const isGuest = !user || !user.email;
  const currentQ = DENGUE_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) return; // already answered
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: index }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < DENGUE_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    DENGUE_QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const rewardPointsEarned = score * 20; // 20 pts per correct answer

  const handleClaimPoints = () => {
    if (isGuest) {
      onOpenAuth();
      return;
    }
    if (pointsClaimed) return;
    onRewardEarned(rewardPointsEarned);
    setPointsClaimed(true);
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setQuizFinished(false);
    setPointsClaimed(false);
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

        <div style={{ padding: '24px 22px' }}>
          {/* Main Modal Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={22} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                  {isBengali ? 'ডেঙ্গু জ্ঞানকোষ ও পুরস্কার কুইজ' : 'Dengue Knowledge Hub & Prize Quiz'}
                </h2>
                <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {isBengali ? 'তথ্য জানুন • কুইজ খেলুন • প্রোফাইল ব্যাজ জিতুন' : 'Learn Facts • Take Quiz • Earn Civic Badges'}
                </span>
              </div>
            </div>

            {/* Top Switcher (Knowledge vs Quiz) */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '10px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('knowledge')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'knowledge' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'knowledge' ? '#ffffff' : '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <BookOpen size={13} style={{ display: 'inline', marginRight: '4px' }} />
                {isBengali ? 'জ্ঞানকোষ' : 'Knowledge Hub'}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'quiz' ? '#dc2626' : 'transparent',
                  color: activeTab === 'quiz' ? '#ffffff' : '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <Award size={13} style={{ display: 'inline', marginRight: '4px' }} />
                {isBengali ? 'পুরস্কার কুইজ' : 'Prize Quiz'}
              </button>
            </div>
          </div>

          {/* ==============================================================
              TAB 1: COMPREHENSIVE DENGUE KNOWLEDGE HUB
          ============================================================== */}
          {activeTab === 'knowledge' && (
            <div>
              {/* Secondary Navigation Pills */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
                {[
                  { id: 'overview', en: 'Causes & Vectors', bn: 'কারণ ও বাহক' },
                  { id: 'treatment', en: 'Treatment & Warning Signs', bn: 'চিকিৎসা ও লক্ষণ' },
                  { id: 'history', en: 'Bangladesh Stats & History', bn: 'পরিসংখ্যান ও ইতিহাস' },
                  { id: 'prevention', en: '3-Day Prevention Rule', bn: 'প্রতিরোধ ব্যবস্থা' }
                ].map(sec => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setKnowledgeSection(sec.id)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '16px',
                      border: `1px solid ${knowledgeSection === sec.id ? 'var(--color-primary)' : 'var(--border)'}`,
                      background: knowledgeSection === sec.id ? '#ecfdf5' : '#ffffff',
                      color: knowledgeSection === sec.id ? '#065f46' : '#475569',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                  >
                    {isBengali ? sec.bn : sec.en}
                  </button>
                ))}
              </div>

              {/* Section 1: Causes & Vector Biology */}
              {knowledgeSection === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontWeight: 800, fontSize: '0.88rem', marginBottom: '6px' }}>
                      <AlertTriangle size={16} />
                      {isBengali ? 'ডেঙ্গু ভাইরাসের উৎপত্তি ও ভেক্টর বাহক' : 'Dengue Virus (DENV) & Vector Transmission'}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#334155', lineHeight: 1.55 }}>
                      {isBengali
                        ? 'ডেঙ্গু একটি ভাইরাসঘটিত সংক্রমণ যা ফ্ল্যাভিভাইরাস (Flaviviridae) পরিবারের চারটি স্বতন্ত্র সেরোটাইপ (DENV-1, DENV-2, DENV-3, DENV-4) দ্বারা ঘটে। এটি মূলত সংক্রামিত স্ত্রী এডিস ইজিপ্টি (Aedes aegypti) মশার কামড়ের মাধ্যমে মানবদেহে ছড়ায়। এডিস মশা সাধারণত পরিষ্কার, জমে থাকা কৃত্রিম পাত্রের পানিতে বংশবৃদ্ধি করে।'
                        : 'Dengue is caused by the Dengue virus (DENV, 4 distinct serotypes: DENV-1 to 4) transmitted primarily by female Aedes aegypti and Aedes albopictus mosquitoes. These daytime vectors prefer clean, artificial standing water reservoirs inside and adjacent to human habitations.'}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '12px' }}>
                      <strong style={{ fontSize: '0.78rem', color: '#1e40af', display: 'block', marginBottom: '4px' }}>
                        {isBengali ? 'কামড়ানোর পিক সময়' : 'Peak Biting Times'}
                      </strong>
                      <p style={{ margin: 0, fontSize: '0.74rem', color: '#334155' }}>
                        {isBengali ? 'সূর্যোদয়ের ২ ঘণ্টা পর এবং সূর্যাস্তের পূর্বমুহূর্তে সবচেয়ে বেশি সক্রিয়।' : 'Most active 2 hours after sunrise and several hours before sunset.'}
                      </p>
                    </div>

                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px' }}>
                      <strong style={{ fontSize: '0.78rem', color: '#991b1b', display: 'block', marginBottom: '4px' }}>
                        {isBengali ? 'ইনকিউবেশন পিরিয়ড' : 'Incubation Period'}
                      </strong>
                      <p style={{ margin: 0, fontSize: '0.74rem', color: '#334155' }}>
                        {isBengali ? 'মশা কামড়ানোর ৪ থেকে ১০ দিনের মধ্যে উপসর্গ প্রকাশ পায়।' : 'Symptoms develop 4–10 days after a bite from an infected mosquito.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2: Clinical Care & Warning Signs */}
              {knowledgeSection === 'treatment' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b91c1c', fontWeight: 800, fontSize: '0.88rem', marginBottom: '6px' }}>
                      <HeartPulse size={16} />
                      {isBengali ? 'জরুরি বিপদচিহ্ন (Danger Warning Signs)' : 'Critical Clinical Warning Signs'}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.78rem', color: '#7f1d1d', lineHeight: 1.6 }}>
                      <li>{isBengali ? 'তীব্র পেটব্যথা ও অবিরাম বমি' : 'Severe abdominal pain and persistent vomiting'}</li>
                      <li>{isBengali ? 'দাঁতের মাড়ি বা নাক থেকে রক্তক্ষরণ' : 'Mucosal bleeding (gums, nose) or blood in urine/stool'}</li>
                      <li>{isBengali ? 'চরম ক্লান্তি, অস্থিরতা বা রক্তচাপ হ্রাস' : 'Extreme lethargy, restlessness, cold clammy extremities (Shock)'}</li>
                      <li>{isBengali ? 'রক্তে প্লেটলেট দ্রুত হ্রাস ও হেমাটোক্রিট বৃদ্ধি' : 'Rapid platelet drop with hematocrit surge (plasma leakage)'}</li>
                    </ul>
                  </div>

                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '14px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#166534', display: 'block', marginBottom: '4px' }}>
                      {isBengali ? 'চিকিৎসা প্রটোকল ও নিষিদ্ধ ওষুধ' : 'Standard Medical Protocol & Contraindications'}
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#334155', lineHeight: 1.5 }}>
                      {isBengali
                        ? 'ডেঙ্গু নিরাময়ে কোনো নির্দিষ্ট অ্যান্টিভাইরাল ওষুধ নেই। মূল চিকিৎসা হলো প্রচুর তরল গ্রহণ (স্যালাইন, ডাবের পানি) এবং পর্যাপ্ত বিশ্রাম। জ্বরের জন্য কেবলমাত্র প্যারাসিটামল সেব্য। অ্যাসপিরিন, আইবুপ্রোফেন (NSAIDs) খাওয়া সম্পূর্ণ নিষিদ্ধ।'
                        : 'There is no specific antiviral treatment for dengue. Primary therapy is oral rehydration (ORS, coconut water, fluids) and paracetamol for pyrexia. NSAIDs (Aspirin/Ibuprofen) are strictly contraindicated due to internal bleeding hazards.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Section 3: History & Bangladesh Outbreak Statistics */}
              {knowledgeSection === 'history' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0369a1', fontWeight: 800, fontSize: '0.88rem', marginBottom: '6px' }}>
                      <Calendar size={16} />
                      {isBengali ? 'বাংলাদেশে ডেঙ্গুর ইতিহাস ও পরিসংখ্যান' : 'Epidemiological History in Bangladesh'}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#334155', lineHeight: 1.55 }}>
                      {isBengali
                        ? 'বাংলাদেশে ১৯৬৪ সালে প্রথম "ঢাকা ফিভার" নামে ডেঙ্গু সদৃশ রোগের উল্লেখ পাওয়া গেলেও ২০০০ সালে প্রথম দেশব্যাপী বড় মহামারী দেখা দেয় (৫,৫০০+ কেস)। এরপর ২০২৩ সালে বাংলাদেশ ইতিহাসের ভয়াবহতম ডেঙ্গু সংকটের মুখোমুখি হয়, যেখানে ৩,২১,০০০-এর বেশি মানুষ আক্রান্ত এবং ১,৭০৫ জনের মৃত্যু ঘটে। পোস্ট-মনসুন অক্টোবরে সাধারণত লার্ভার ঘনত্ব সর্বোচ্চ থাকে।'
                        : 'Documented since 1964 as "Dacca Fever", Bangladesh faced its first recognized national epidemic in 2000 (5,551 cases, 93 deaths). In 2023, the nation suffered its deadliest wave with 321,179 hospitalizations and 1,705 fatalities. Vector density historically peaks during post-monsoon September–November.'}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
                    <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#dc2626' }}>321k+</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>2023 National Inpatients</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#059669' }}>BI &gt; 20</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Outbreak Threshold</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#2563eb' }}>4 Types</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>DENV 1 to 4 Serotypes</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 4: 3-Day Rule & Prevention */}
              {knowledgeSection === 'prevention' && (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#065f46', fontWeight: 900, fontSize: '0.9rem', marginBottom: '8px' }}>
                    <ShieldCheck size={18} />
                    {isBengali ? '৩ দিনের নিয়ম: লার্ভা নির্মূল কৌশল' : 'The 3-Day Source Reduction Directive'}
                  </div>
                  <p style={{ margin: '0 0 10px', fontSize: '0.78rem', color: '#064e3b', lineHeight: 1.55 }}>
                    {isBengali
                      ? 'এডিস মশার ডিম থেকে পূর্ণাঙ্গ মশায় রূপ নিতে ৭ থেকে ৯ দিন লাগে। প্রতি ৩ দিনে একবার বাসা-বাড়ি, ছাদ, বারান্দার টব ও এসির পানি ফেলে দিলে ডিম ফুটলেও মশা উড়তে পারে না।'
                      : 'Because Aedes aegypti requires 7 to 9 days to pupate in warm water, emptying containers every 3 days permanently interrupts their life cycle before adult emergence.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('quiz')}
                    className="btn-primary"
                    style={{ width: '100%', padding: '10px', fontSize: '0.82rem', background: '#059669' }}
                  >
                    <Sparkles size={14} />
                    {isBengali ? 'কুইজ দিয়ে জ্ঞান যাচাই করুন ও পয়েন্ট অর্জন করুন' : 'Test Your Knowledge & Claim Civic Points'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ==============================================================
              TAB 2: PRIZE-BASED KNOWLEDGE QUIZ
          ============================================================== */}
          {activeTab === 'quiz' && (
            <div>
              {/* Guest Warning Banner */}
              {isGuest && (
                <div style={{
                  background: '#fffbeb',
                  border: '1px solid #fef3c7',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', color: '#92400e' }}>
                    <Lock size={15} flexShrink={0} />
                    <span>
                      {isBengali 
                        ? 'আপনি গেস্ট মোডে আছেন। কুইজের পয়েন্ট প্রোফাইলে যোগ করতে লগইন করুন।' 
                        : 'Guest mode: Sign in to deposit quiz reward points onto your profile badge.'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: '#d97706',
                      color: '#fff',
                      border: 'none',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isBengali ? 'লগইন' : 'Sign In'}
                  </button>
                </div>
              )}

              {!quizFinished ? (
                <div>
                  {/* Progress Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>
                    <span>
                      {isBengali ? `প্রশ্ন ${currentQuestionIndex + 1} / ${DENGUE_QUIZ_QUESTIONS.length}` : `Question ${currentQuestionIndex + 1} of ${DENGUE_QUIZ_QUESTIONS.length}`}
                    </span>
                    <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Award size={13} /> +20 pts / question
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div style={{ width: '100%', height: '5px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
                    <div style={{ width: `${((currentQuestionIndex + 1) / DENGUE_QUIZ_QUESTIONS.length) * 100}%`, height: '100%', background: 'var(--color-primary)', transition: 'width 0.3s ease' }} />
                  </div>

                  {/* Question Prompt */}
                  <h3 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 800, color: '#1e293b', lineHeight: 1.4 }}>
                    {isBengali ? currentQ.questionBn : currentQ.questionEn}
                  </h3>

                  {/* Options List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {(isBengali ? currentQ.optionsBn : currentQ.optionsEn).map((opt, idx) => {
                      const isChosen = selectedAnswers[currentQuestionIndex] === idx;
                      const hasAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
                      const isCorrect = idx === currentQ.correctIndex;

                      let btnBg = '#ffffff';
                      let btnBorder = 'var(--border)';
                      let btnColor = '#1e293b';

                      if (hasAnswered) {
                        if (isCorrect) {
                          btnBg = '#dcfce7';
                          btnBorder = '#86efac';
                          btnColor = '#166534';
                        } else if (isChosen) {
                          btnBg = '#fee2e2';
                          btnBorder = '#fca5a5';
                          btnColor = '#991b1b';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={hasAnswered}
                          onClick={() => handleSelectOption(idx)}
                          style={{
                            textAlign: 'left',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: `1.5px solid ${btnBorder}`,
                            background: btnBg,
                            color: btnColor,
                            fontSize: '0.82rem',
                            fontWeight: isChosen || (hasAnswered && isCorrect) ? 800 : 600,
                            cursor: hasAnswered ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span>{opt}</span>
                          {hasAnswered && isCorrect && <CheckCircle2 size={16} color="#16a34a" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation card after picking */}
                  {showExplanation && (
                    <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', marginBottom: '16px', fontSize: '0.78rem' }}>
                      <strong style={{ color: '#0f172a', display: 'block', marginBottom: '3px' }}>
                        {selectedAnswers[currentQuestionIndex] === currentQ.correctIndex 
                          ? (isBengali ? '✓ সঠিক উত্তর!' : '✓ Correct Answer!') 
                          : (isBengali ? '✕ ভুল উত্তর' : '✕ Incorrect')}
                      </strong>
                      <p style={{ margin: 0, color: '#475569', lineHeight: 1.45 }}>
                        {isBengali ? currentQ.explanationBn : currentQ.explanationEn}
                      </p>
                    </div>
                  )}

                  {/* Next Question Control */}
                  {selectedAnswers[currentQuestionIndex] !== undefined && (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="btn-primary"
                      style={{ width: '100%', padding: '11px', fontSize: '0.85rem' }}
                    >
                      {currentQuestionIndex < DENGUE_QUIZ_QUESTIONS.length - 1 
                        ? (isBengali ? 'পরবর্তী প্রশ্ন' : 'Next Question') 
                        : (isBengali ? 'ফলাফল দেখুন' : 'Complete Quiz')}
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              ) : (
                /* Quiz Finished Result Screen */
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#f0fdf4',
                    border: '2px solid #86efac',
                    color: '#16a34a',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    <Award size={36} />
                  </div>

                  <h3 style={{ margin: '0 0 6px', fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                    {isBengali ? 'কুইজ সম্পন্ন হয়েছে!' : 'Quiz Assessment Complete!'}
                  </h3>

                  <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: '#64748b' }}>
                    {isBengali 
                      ? `আপনি ৫ টির মধ্যে ${score} টি সঠিক উত্তর দিয়েছেন।` 
                      : `You answered ${score} out of ${DENGUE_QUIZ_QUESTIONS.length} questions correctly.`}
                  </p>

                  {/* Reward Box */}
                  <div style={{
                    background: '#f8fafc',
                    border: '1.5px dashed #059669',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '20px',
                    maxWidth: '320px',
                    margin: '0 auto 20px'
                  }}>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>
                      {isBengali ? 'অর্জিত নাগরিক পয়েন্ট' : 'Civic Reward Points Earned'}
                    </div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#059669', lineHeight: 1.1, margin: '4px 0' }}>
                      +{rewardPointsEarned}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 700 }}>
                      {pointsClaimed 
                        ? (isBengali ? '✓ প্রোফাইলে সফলভাবে যোগ করা হয়েছে!' : '✓ Credited to profile ledger!') 
                        : (isBengali ? 'প্রোফাইলে ব্যাজ আপগ্রেড করতে ক্লেইম করুন' : 'Claim to rank up your profile badge')}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    {!pointsClaimed && rewardPointsEarned > 0 && (
                      <button
                        type="button"
                        onClick={handleClaimPoints}
                        className="btn-primary"
                        style={{ padding: '10px 22px', fontSize: '0.84rem' }}
                      >
                        <Sparkles size={15} />
                        {isGuest 
                          ? (isBengali ? 'লগইন করে পয়েন্ট ক্লেইম করুন' : 'Sign In to Claim Points') 
                          : (isBengali ? 'পয়েন্ট সংগ্রহ করুন (+পয়েন্টস)' : 'Claim Reward Points')}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleRestartQuiz}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        background: '#ffffff',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RotateCcw size={14} /> {isBengali ? 'আবার খেলুন' : 'Retake Quiz'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}