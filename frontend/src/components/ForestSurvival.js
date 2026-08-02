import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  skills: {
    title: 'Beceriler',
    items: [
      { icon: '🔥', t: 'Ates Yakmak', d: 'Cakmak, flint ve tahta suturme yontemlerini bilmek hayat kurtarabilir.' },
      { icon: '💧', t: 'Su Bulmak', d: 'Dere, kaynak ve yagmur suyu her zaman kaynatilmali veya aritilmali.' },
      { icon: '🧭', t: 'Yon Tayin', d: 'Gunes ile guney tespiti, gece kutup yildizi; GPS batarya yitirirse temel bilgi.' },
      { icon: '🏠', t: 'Barrink', d: 'Dusuk egilim, uzun dal ve dal ustu su gecirmez yaprak kaplama ile is barınak.' },
      { icon: '🌿', t: 'Yiyecek Bulmak', d: 'Yenilebilir yabani bitkiler, protein icin bocek ve midye her ortamda bulunabilir.' },
    ],
  },
  emergency: {
    title: 'Acil Durum',
    items: [
      { icon: '🚨', t: 'Isaret Vermek', d: 'Ayna veya metalik malzeme ile gunes yansitmak, duman ile SOS isareti.' },
      { icon: '🤕', t: 'Ilk Yardim', d: 'Kanama durdurmak, kirik sabitlemek ve hipotermiden korumak temel beceriler.' },
      { icon: '📱', t: 'Iletisim', d: 'Sat telefon, PLB veya EPIRB; standart GSM sinyal zayif yerlerde calisamaz.' },
      { icon: '🗺️', t: 'Yolunuzu Bulmak', d: 'Su olculerini asagi takip edin; nehir akinti hep yasli alanlarla denize cikar.' },
      { icon: '⏰', t: 'Sabir', d: 'Arama kurtarma ekipleri 72 saat icinde harekete gecer; yerinde kalmak arama.' },
    ],
  },
};

export default function ForestSurvival() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('skills');
  const data = TABS[tab];
  const accent = '#166534';
  const bg = '#000e02';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dcfce7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌲 Orman Hayatta Kalma</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001c08', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#4ade80',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#002010', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#86efac', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
