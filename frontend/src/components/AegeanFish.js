import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🐟', t: 'Çupra', d: 'Sparus aurata; Ege\'nin en lezzetli ve en değerli balığı; kültür ve doğal.' },
      { icon: '🐠', t: 'Lahoz', d: 'Epinephelus; kayalik tabanlarda saklanan büyük yırtıcı; değerli av.' },
      { icon: '🐡', t: 'İsparoz', d: 'Diplodus sargus; kayalık kıyılarda yaygın, lezzetli ve kolay avlanır.' },
      { icon: '🦑', t: 'Kalamar', d: 'Loligo vulgaris; kıyı sularda yoğun; gece yem-ışık taktikle avlanır.' },
      { icon: '🦐', t: 'Karides', d: 'Parapenaeus longirostris; derin sularda trawl ile; Ege mutfağının vazgeçilmezi.' },
    ],
  },
  fishing: {
    title: 'Avcılık',
    items: [
      { icon: '🎣', t: 'Kayalık Avı', d: 'Uzun olta ile kayalık burunlarda; çupra ve isparoz için rapa yemi ideal.' },
      { icon: '🚤', t: 'Trolling', d: 'Hız teknesiyle yüzey balıkları; lüfer ve çeşitli yapay yemlerle Ege açığında.' },
      { icon: '🌙', t: 'Gece Avı', d: 'Kalamar avı için gece kuvvetli ışıkla attrakt yöntemi; Ege\'de çok yaygın.' },
      { icon: '🌊', t: 'Batık Noktaları', d: 'Batık veya yapay resif noktaları büyük balıkları toplar; öğrenmesi zaman alır.' },
      { icon: '📏', t: 'Kota Kuralları', d: 'Çupra için minimum 18 cm, levrek 25 cm; kotalar yıllık güncellenir.' },
    ],
  },
};

export default function AegeanFish() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];
  const accent = '#0369a1';
  const bg = '#000814';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌊 Ege Balıkları</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001428', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#38bdf8',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001828', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#7dd3fc', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
