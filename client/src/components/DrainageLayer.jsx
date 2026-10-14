import React from 'react';
import { Polyline, Tooltip, CircleMarker } from 'react-leaflet';

export default function DrainageLayer({ visible = false, isBengali = false }) {
  if (!visible) return null;

  // Real-world modeled conduits around DIU Smart Campus & Ashulia
  const drainConduits = [
    {
      id: 'drain-main-culvert',
      nameEn: 'Primary Municipal Storm Culvert (Dattapara Trunk)',
      nameBn: 'প্রধান মিউনিসিপ্যাল কালভার্ট (দত্তপাড়া ট্রাঙ্ক ড্রেন)',
      statusEn: 'Partially Silted / Stagnant Flow',
      statusBn: 'আংশিক ভরাট / ধীর প্রবাহ',
      color: '#0284c7',
      weight: 4,
      dashArray: '2, 6',
      coords: [
        [23.8725, 90.3230], // Bus Terminal
        [23.8740, 90.3220],
        [23.8755, 90.3210],
        [23.8768, 90.3201]  // Lake Inflow
      ]
    },
    {
      id: 'drain-cafeteria-runoff',
      nameEn: 'Cafeteria & Dormitory Spillway Channel',
      nameBn: 'ক্যাফেটেরিয়া ও হল নির্গমন নালা',
      statusEn: 'High Larval Risk Biofilm',
      statusBn: 'উচ্চ লার্ভা ঝুঁকি ও বায়োফিল্ম',
      color: '#dc2626',
      weight: 3.5,
      dashArray: '4, 4',
      coords: [
        [23.8768, 90.3201],
        [23.8775, 90.3190],
        [23.8785, 90.3182]
      ]
    },
    {
      id: 'drain-academic-block',
      nameEn: 'Academic Quad Sub-Surface Conduit',
      nameBn: 'একাডেমিক ভবন ভূগর্ভস্থ ড্রেনেজ পাইপলাইন',
      statusEn: 'Clear / Bti Treated Flow',
      statusBn: 'পরিষ্কার / বিটিআই স্প্রে সম্পন্ন',
      color: '#059669',
      weight: 3,
      dashArray: null,
      coords: [
        [23.8795, 90.3225], // Gate 1
        [23.8785, 90.3212],
        [23.8768, 90.3201]
      ]
    },
    {
      id: 'drain-extension-site',
      nameEn: 'Under-Construction Excavation Sump Line',
      nameBn: 'নির্মাণ এলাকা অস্থায়ী নিষ্কাশন নালা',
      statusEn: 'Stagnant Rain Pool Catchment',
      statusBn: 'জলাবদ্ধ বৃষ্টির পানি নিষ্কাশন পয়েন্ট',
      color: '#ea580c',
      weight: 3.5,
      dashArray: '6, 6',
      coords: [
        [23.8780, 90.3150],
        [23.8770, 90.3168],
        [23.8768, 90.3201]
      ]
    }
  ];

  // Critical Culvert Junction Nodes
  const junctions = [
    { coords: [23.8725, 90.3230], labelEn: 'Terminal Junction #01', labelBn: 'টার্মিনাল জাংশন ০১' },
    { coords: [23.8768, 90.3201], labelEn: 'Central Lake Outfall #02', labelBn: 'লেক কেন্দ্রীয় নির্গমন মুখ ০২' },
    { coords: [23.8795, 90.3225], labelEn: 'Gate 1 Sump Pit #03', labelBn: 'গেট ১ স্যাম্প পিট ০৩' }
  ];

  return (
    <>
      {drainConduits.map((conduit) => (
        <Polyline
          key={conduit.id}
          positions={conduit.coords}
          pathOptions={{
            color: conduit.color,
            weight: conduit.weight,
            dashArray: conduit.dashArray,
            opacity: 0.85
          }}
        >
          <Tooltip direction="top" opacity={0.92}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800 }}>
              <div style={{ color: conduit.color }}>
                {isBengali ? conduit.nameBn : conduit.nameEn}
              </div>
              <div style={{ color: '#475569', fontSize: '0.66rem', fontWeight: 600 }}>
                {isBengali ? conduit.statusBn : conduit.statusEn}
              </div>
            </div>
          </Tooltip>
        </Polyline>
      ))}

      {/* Junction Nodes */}
      {junctions.map((node, i) => (
        <CircleMarker
          key={`junction-${i}`}
          center={node.coords}
          radius={5}
          pathOptions={{
            color: '#0f172a',
            fillColor: '#38bdf8',
            fillOpacity: 0.9,
            weight: 1.5
          }}
        >
          <Tooltip direction="bottom" opacity={0.88}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700 }}>
              {isBengali ? node.labelBn : node.labelEn}
            </span>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}