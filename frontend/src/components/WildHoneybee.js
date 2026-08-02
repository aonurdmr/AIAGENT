import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🐝', t: 'Yabani Bal Arısı', d: 'Apis mellifera; kaçık koloniler kaya kovukları ve eski ağaç oyuklarında.' },
      { icon: '🌲', t: 'Yuva Yerleri', d: 'Yaşlı ağaç kovukları, kaya yansıları ve çatı boşlukları favori kolon bölgeler.' },
      { icon: '🌸', t: 'Nektar Kaynakları', d: 'Kaçkul, ıhlamur, kestane ve kekik; bölgesel nektar bitkiler bal çeşitliliği.' },
      { icon: '🔊', t: 'Vızıltı Takibi', d: 'Yüksek vızıltı sesi kolon yönünü belirler; sabah erken uçuş trafiği izlenir.' },
      { icon: '📍', t: 'Yuva Belirleme', d: 'Sonbahar bitki ölümünde kova arayan kovuklar daha kolay ayırt edilir.' },
    ],
  },
  honey: {
    title: 'Bal',
    items: [
      { icon: '🍯', t: 'Yabani Bal', d: 'Bölgesel flora yansıtan çok çiçekli bal; kültür balından daha zengin bileşen.' },
      { icon: '🌿', t: 'Kaçkul Balı', d: 'Karadeniz dağlarının zehirli "deli bal"; grayanotoksin içerir; dikkat edin.' },
      { icon: '⛰️', t: 'Kestane Balı', d: 'Karadeniz bölgesi kestane balı koyu ve acımsı; en ararılan geleneksel çeşit.' },
      { icon: '💜', t: 'Kekik Balı', d: 'Ege kekik alanlarından elde edilen açık amber renkli yoğun aromatik bal.' },
      { icon: '🧴', t: 'Tıbbi Kullanım', d: 'Antifungal ve antibakteryel özellik; yara bakımı ve boğaz ağrısı için.' },
    ],
  },
};

export default function WildHoneybee() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('observe');
  const data = TABS[tab];
  const accent = '#d97706';
  const bg = '#0a0600';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fefce8', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐝 Yabani Arı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#161000', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#120e00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
