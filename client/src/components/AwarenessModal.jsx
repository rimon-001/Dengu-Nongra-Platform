import React, { useState } from 'react';
import { X, BookOpen, Clock, Droplets, ShieldCheck, AlertTriangle, Fish, Sun, Moon } from 'lucide-react';

export default function AwarenessModal({ isOpen, onClose, isBengali = false }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('3day');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} color="#64748b" />
        </button>

        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'ডেঙ্গু প্রতিরোধ ও জনসচেতনতা হাব' : 'Dengue Prevention & Community Guide'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>
                {isBengali ? 'ক্যাম্পাস ও পারিবারিক সুরক্ষা নির্দেশিকা' : 'DGHS / WHO Community Source Reduction Protocol'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
            {isBengali
              ? 'এডিস মশার বিস্তার রোধে সহজ কিন্তু কার্যকর পারিবারিক ও প্রাতিষ্ঠানিক নির্দেশিকা অনুসরণ করুন।'
              : 'Evidence-based vector elimination guidelines for university dorms, faculty housing, and urban neighborhoods.'}
          </p>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('3day')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === '3day' ? 'var(--color-primary)' : '#f1f5f9',
                color: activeTab === '3day' ? '#fff' : 'var(--text-main)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isBengali ? '৩ দিনের নিয়ম' : '3-Day Water Rule'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('biting')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'biting' ? 'var(--color-primary)' : '#f1f5f9',
                color: activeTab === 'biting' ? '#fff' : 'var(--text-main)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isBengali ? 'কামড়ানোর পিক সময়' : 'Biting Hours'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('biocontrol')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'biocontrol' ? 'var(--color-primary)' : '#f1f5f9',
                color: activeTab === 'biocontrol' ? '#fff' : 'var(--text-main)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isBengali ? 'জৈবিক নিয়ন্ত্রণ' : 'Biocontrol & Fish'}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === '3day' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <strong style={{ fontSize: '0.88rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Droplets size={16} color="#0284c7" />
                  {isBengali ? 'প্রতি ৩ দিনে জমে থাকা পানি ফেলুন' : 'Empty Stagnant Water Every 3 Days'}
                </strong>
                <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                  {isBengali
                    ? 'এডিস মশার ডিম থেকে পূর্ণাঙ্গ মশায় রূপ নিতে ৭ থেকে ১০ দিন সময় লাগে। প্রতি ৩ দিনে ফুলদানি, এয়ারকুলার ও ড্রামের পানি উল্টে দিলে লার্ভা পূর্ণাঙ্গ মশা হতে পারে না।'
                    : 'Aedes larvae require 7 to 10 days to pupate into adult vectors. Evacuating air conditioner trays, flower pots, and plastic drums every 3 days permanently breaks the breeding cycle.'}
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <strong style={{ fontSize: '0.88rem', color: '#1e293b' }}>
                  {isBengali ? 'পাত্রের ভেতরের দেয়াল ঘষে পরিষ্কার করুন' : 'Scrub Inner Walls of Containers'}
                </strong>
                <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                  {isBengali
                    ? 'শুধু পানি ফেলে দেওয়া যথেষ্ট নয়; এডিসের ডিম পাত্রের ভেতরের শুকনো দেয়ালে মাসের পর মাস বেঁচে থাকতে পারে। ব্রাশ দিয়ে পাত্রের ভেতরের অংশ ঘষে ধুতে হবে।'
                    : 'Simply pouring water is insufficient; Aedes aegypti eggs can survive desiccation on container walls for up to 6 months. Scrub container edges firmly with a brush.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'biting' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#fffbeb', padding: '14px', borderRadius: '10px', border: '1px solid #fef3c7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: 800, fontSize: '0.88rem' }}>
                  <Sun size={18} />
                  {isBengali ? 'ভোর ও সূর্যাস্তের পূর্বমুহূর্ত (Peak Biting Hours)' : 'Dawn & Late Afternoon Peaks'}
                </div>
                <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#451a03', lineHeight: 1.5 }}>
                  {isBengali
                    ? 'এডিস মশা সাধারণত সকালের দিকে (সূর্যোদয়ের ২ ঘণ্টা পর) এবং বিকেলে (সূর্যাস্তের আগে) সবচেয়ে বেশি সক্রিয় থাকে। এই সময়ে ক্লাসরুম ও মাঠে ফুলহাতা পোশাক পরিধান করুন।'
                    : 'Aedes mosquitoes feed aggressively two hours after sunrise and several hours before sunset. Wear long-sleeved clothing during campus walks and sports sessions.'}
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', fontWeight: 700, fontSize: '0.88rem' }}>
                  <Clock size={16} color="var(--color-primary)" />
                  {isBengali ? 'ইনডোর ও ছায়াযুক্ত এলাকা' : 'Indoor Artificial Lighting Biting'}
                </div>
                <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                  {isBengali
                    ? 'উজ্জ্বল লাইট থাকা অফিস বা হোস্টেল রুমে এডিস মশা রাতেও কামড়াতে পারে। মশারি ও নেট ব্যবহার নিশ্চিত করুন।'
                    : 'Under artificial lighting in well-lit study rooms or university hostels, biting can continue into evening hours. Use aerosol repellents and window mesh.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'biocontrol' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#ecfdf5', padding: '14px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 800, fontSize: '0.88rem' }}>
                  <Fish size={18} />
                  {isBengali ? 'গাপ্পি মাছের ব্যবহার (Biocontrol)' : 'Larvivorous Fish in Campus Ponds & Reservoirs'}
                </div>
                <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#14532d', lineHeight: 1.5 }}>
                  {isBengali
                    ? 'ক্যাম্পাস লেক, বড় ড্রেন ও স্থায়ী জলাশয়ে গাপ্পি বা তেলাপিয়া মাছ ছাড়লে তারা প্রতিদিন শত শত মশার লার্ভা খেয়ে বংশবৃদ্ধি রোধ করে।'
                    : 'Releasing Guppy (Poecilia reticulata) fish in ornamental campus lakes and drainage collection ponds consumes thousands of larvae per day without chemical toxicity.'}
                </p>
              </div>
            </div>
          )}

          <div style={{ marginTop: '16px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.74rem', color: '#64748b' }}>
            <strong>WHO Vector Prevention Bulletin:</strong> Source reduction through citizen participation is 4x more cost-effective than post-outbreak chemical fogging.
          </div>
        </div>
      </div>
    </div>
  );
}