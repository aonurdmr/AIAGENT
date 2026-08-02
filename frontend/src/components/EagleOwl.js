import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  habitat: {
    title: 'Habitat',
    items: [
      { icon: '🌲', t: 'Kaya Yuvaları', d: 'Büyük baykuşlar yüksek kayalık kenarlarda ve uçurumlarda yuva yapar.' },
      { icon: '🦅', t: 'Ormanlık Alan', d: 'Sık çam ve meşe ormanlarını av alanı olarak kullanır.' },
      { icon: '🌙', t: 'Gece Aktivitesi', d: 'Alacakaranlıktan şafağa kadar aktiftir, tam karanlıkta da avlanır.' },
      { icon: '🏔️', t: 'Yüksek İrtiha', d: 'Deniz seviyesinden 2000 metreye kadar olan bölgelerde yaşayabilir.' },
      { icon: '🐾', t: 'Bölge Savunması', d: '10-80 km² büyüklüğünde bölgeyi yıl boyunca savunur.' },
    ],
  },
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🔭', t: 'Teleskop Kullanımı', d: 'En az 8x42 dürbün ve gece gözlemi için termal kamera önerilir.' },
      { icon: '🎵', t: 'Ses Tespiti', d: 'Derin "hu-hu-hu" sesi yaklaşık 3-5 km uzaktan duyulabilir.' },
      { icon: '📍', t: 'Aktif Yuva Bölgesi', d: 'Şubat-Mayıs arasında yuva çevresinde sessizce gözlem yapılabilir.' },
      { icon: '🌅', t: 'En İyi Zaman', d: 'Alacakaranlık saatleri hem akşam hem sabah gözlem için idealdir.' },
      { icon: '📸', t: 'Fotoğraflama', d: 'Yüksek ISO ve uzun odak mesafeli lens ile başarılı kareler elde edilir.' },
    ],
  },
};

export default function EagleOwl() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('habitat');
  const data = TABS[tab];
  const accent = '#b45309';
  const bg = '#0a0600';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦉 Puhu Baykuşu</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c1000', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#140c00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
