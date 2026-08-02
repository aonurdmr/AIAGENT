import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  track: {
    title: 'Iz Takibi',
    items: [
      { icon: '🦌', t: 'Arik Geyik Izi', d: 'Kalp seklinde, 5-7 cm uzunlugunda, yuvarlak uc. Arka ayak izi one binebilir.' },
      { icon: '🌿', t: 'Otlama Izleri', d: 'Duzensiz kesik yaprak ve dal ucları; geyik alt dise sahip degil ustunkul ısırır.' },
      { icon: '🌳', t: 'Kabuk Kirma', d: 'Erkek geyikler Eylul-Ekim boynuz surtme iz birakmak icin agac kabugunu soyar.' },
      { icon: '💩', t: 'Pislik Analizi', d: 'Mevsime gore degisen kulit: yazin yeşil pislik, kışın kurt peleti benzeri sert.' },
      { icon: '🏃', t: 'Yuruyus Deseni', d: 'Adim arasi 50-70 cm; kaçarken 10+ metre uzunlukta atlayis yapar.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '🌅', t: 'Aktivite Zamani', d: 'Sabah ve aksam alacakaranligi; baska zamanlarda sik ormanda gizlenir.' },
      { icon: '📍', t: 'Lokasyon', d: 'Orman acikliklari, cayir kenari ve su kaynaklari yakini favori ziyaret noktasi.' },
      { icon: '🔭', t: 'Ekipman', d: '8-10x42 durbun ve sessiz giysilerle en az 50-100 metre mesafede kalmak kritik.' },
      { icon: '🌬️', t: 'Koku Kontrol', d: 'Her zaman ruzgara karsi konumlanin; geyik koku alarak hizla sapar.' },
      { icon: '📸', t: 'Fotograf', d: 'Uzun mesafeli lens, tripod ve sabır en iyi kare icin en onemli unsurlardir.' },
    ],
  },
};

export default function DeerTracking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('track');
  const data = TABS[tab];
  const accent = '#5c4f00';
  const bg = '#060400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef9c3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦌 Geyik İz Takibi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#140e00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#a16207',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#100c00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fbbf24', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
