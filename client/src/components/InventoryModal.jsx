import React, { useState } from 'react';
import { X, PackageCheck, AlertCircle, Plus, Minus, Droplets, Flame, ShieldAlert, Sparkles } from 'lucide-react';

export default function InventoryModal({ isOpen, onClose, reports = [], isBengali = false }) {
  if (!isOpen) return null;

  const activeReportsCount = reports.filter(r => r.status === 'reported').length;

  // Local inventory reserves for Ashulia Sector Depot
  const [supplies, setSupplies] = useState([
    {
      id: 'bti-powder',
      name: isBengali ? 'বিটিআই (Bti) ব্যাকটেরিয়াল লার্ভিসাইড পাউডার' : 'Bti Biological Powder (Bacillus thuringiensis)',
      type: 'Biological',
      stock: 48,
      unit: 'kg',
      requiredPerSite: 1.5,
      icon: Droplets,
      color: '#059669',
      bgColor: '#ecfdf5',
      safetyNote: isBengali ? 'পরিবেশবান্ধব ও অ-বিষাক্ত' : 'Non-toxic to fish & fauna'
    },
    {
      id: 'temephos-granules',
      name: isBengali ? 'টেমিফোস ১% দানা কীটনাশক (Temephos)' : 'Temephos 1% SG Larvicide Granules',
      type: 'Chemical',
      stock: 35,
      unit: 'kg',
      requiredPerSite: 2.0,
      icon: ShieldAlert,
      color: '#dc2626',
      bgColor: '#fef2f2',
      safetyNote: isBengali ? 'শুধুমাত্র আবদ্ধ নর্দমার জন্য' : 'Restricted to unpotable drains'
    },
    {
      id: 'fogger-fuel',
      name: isBengali ? 'থার্মাল ফগিং এরোসল তেল (Malathion mix)' : 'Thermal Fogging Mix (Diesel + Deltamethrin)',
      type: 'Adulticide',
      stock: 65,
      unit: 'Liters',
      requiredPerSite: 3.5,
      icon: Flame,
      color: '#d97706',
      bgColor: '#fffbeb',
      safetyNote: isBengali ? 'সন্ধ্যার স্প্রে কার্যক্রমের জন্য' : 'Evening adult mosquito knock-down'
    },
    {
      id: 'ppe-gloves',
      name: isBengali ? 'ফিল্ড ভলান্টিয়ার ওয়াটারপ্রুফ গ্লাভস ও কিট' : 'Field Squad Safety Gloves & Boots',
      type: 'Equipment',
      stock: 22,
      unit: 'Sets',
      requiredPerSite: 1.0,
      icon: PackageCheck,
      color: '#2563eb',
      bgColor: '#eff6ff',
      safetyNote: isBengali ? 'স্বেচ্ছাসেবক সুরক্ষা' : 'Field volunteer gear'
    }
  ]);

  const updateStock = (id, delta) => {
    setSupplies(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, stock: Math.max(0, item.stock + delta) };
      }
      return item;
    }));
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
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PackageCheck size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {isBengali ? 'লার্ভিসাইড ও কীটনাশক ইনভেন্টরি' : 'Larvicide & Chemical Stock Ledger'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>
                {isBengali ? 'আশুলিয়া ও ক্যাম্পাস স্টোরেজ ডিপো' : 'Ashulia / DIU Field Response Depot'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>
            {isBengali
              ? 'বর্তমানে চিহ্নিত হটস্পটগুলোর চিকিৎসায় পর্যাপ্ত বিটিআই লার্ভিসাইড ও ফগিং স্প্রে মজুত রয়েছে কিনা তা লাইভ পর্যবেক্ষণ করুন।'
              : 'Real-time supply forecasting calculating material burn rates for biological Bti, chemical larvicides, and adult fogging fuel.'}
          </p>

          {/* Forecasted Material Burn for Active Sites */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '14px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {isBengali ? 'প্রয়োজনীয় মজুত পূর্বাভাস' : 'Demand Forecast for Active Hotspots'}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                {activeReportsCount} {isBengali ? 'টি সক্রিয় স্থানের জন্য আনুমানিক' : 'unresolved breeding sites need approx.'} <strong>{(activeReportsCount * 1.5).toFixed(1)} kg Bti</strong>
              </div>
            </div>

            <span style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '20px',
              background: '#dcfce7',
              color: '#15803d'
            }}>
              ✓ {isBengali ? 'পর্যাপ্ত মজুত রয়েছে' : 'Reserves Sufficient'}
            </span>
          </div>

          {/* Supplies List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {supplies.map(item => {
              const Icon = item.icon;
              const isLow = item.stock <= 15;

              return (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: item.bgColor,
                      color: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={18} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.86rem' }}>{item.name}</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#475569' }}>
                          {item.type}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                        {item.safetyNote} • ~{item.requiredPerSite} {item.unit} {isBengali ? 'প্রতি স্পটে' : '/ site'}
                      </div>
                    </div>
                  </div>

                  {/* Stock Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ textAlign: 'right', marginRight: '4px' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isLow ? '#dc2626' : 'var(--text-main)' }}>
                        {item.stock} <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{item.unit}</span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: isLow ? '#dc2626' : '#16a34a', fontWeight: 700 }}>
                        {isLow ? (isBengali ? 'স্বল্প মজুত' : 'Low Stock') : (isBengali ? 'মজুত প্রস্তুত' : 'Ready')}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        type="button"
                        onClick={() => updateStock(item.id, -1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          background: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#475569'
                        }}
                      >
                        <Minus size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() => updateStock(item.id, 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          background: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#475569'
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '10px',
            padding: '12px 14px',
            fontSize: '0.75rem',
            color: '#065f46',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={16} flexShrink={0} />
            <span>
              {isBengali
                ? 'ডিজিএইচএস (DGHS) এর অনুমোদিত বিশ্ব স্বাস্থ্য সংস্থা (WHO) ভেক্টর কন্ট্রোল স্ট্যান্ডার্ড অনুসরণ করে সরবরাহ তালিকা সংরক্ষণ করা হয়।'
                : 'Formulations strictly adhere to WHO Pesticide Evaluation Scheme (WHOPES) standards for campus and residential vector control.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}