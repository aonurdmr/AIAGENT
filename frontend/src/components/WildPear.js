import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🍐', t: 'Yabani Armut', d: 'Pyrus elaeagrifolia ve P. communis; Anadolu kuru ormanlarinda kucuk meyveli.' },
      { icon: '📅', t: 'Hasat Zamani', d: 'Eylul-Ekim arasi; ilk don sonrasi meyveler tatlanir ve yumusameye baslar.' },
      { icon: '🌳', t: 'Agac Tanima', d: 'Dikenli dallar, ufak beyaz cicekler ilkbaharda; meyve dikenden biyuk degil.' },
      { icon: '🧺', t: 'Toplama', d: 'Olgun dusmus meyveler yerden toplanir; agac sallamak zarar verir.' },
      { icon: '🌿', t: 'Ekosistem Degeri', d: 'Cok sayida kus ve memeli icin onemli besin kaynagi; orman canliliginin parcasi.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍯', t: 'Recel', d: 'Yabani armut tatlisi hafif asidik tat verir; tarcin ve karanfil ile zenginlestirin.' },
      { icon: '🍶', t: 'Sirke', d: 'Ezip fermente ederek elde edilen yabani armut sirkesi geleneksel bir urun.' },
      { icon: '🍷', t: 'Meyve Suyu', d: 'Ezilip suzulen ham meyve suyu kaynatilarak koyulastirma; tatli olarak kullanilir.' },
      { icon: '🥧', t: 'Pasta', d: 'Kurutulmus yabani armut dilimi turta ve pastaya yerli tat katar.' },
      { icon: '🌡️', t: 'Geleneksel Tip', d: 'Meyve suyu balgam sogukluguna karsi geleneksel halk ilacinda yer alir.' },
    ],
  },
};

export default function WildPear() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#854d0e';
  const bg = '#080400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef9c3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍐 Yabani Armut</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#160a00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fbbf24',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#120800', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fde68a', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
