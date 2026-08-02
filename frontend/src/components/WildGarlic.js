import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '🌿', t: 'Yabani Sarımsak', d: 'Allium ursinum (ayı sarımsağı) ve A. vineale; ormanlık nemli alanlar.' },
      { icon: '🌸', t: 'Bahar Haberci', d: 'Mart-Mayıs çiçeklenme dönemi; beyaz yıldız çiçekler karakteristik.' },
      { icon: '👃', t: 'Koku Testi', d: 'Yaprakları ovalayınca yoğun sarımsak kokusu; asıl tanımlama yöntemi.' },
      { icon: '⚠️', t: 'Karıştırma Tehlikesi', d: 'Yabani ot ile karıştırılabilir; koku testi olmadan kesinlikle yemeyin.' },
      { icon: '🌲', t: 'Lokasyon', d: 'Kayın ve meşe ormanları; dere kenarları ve gölgeli yamaçlarda toplu büyür.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🧄', t: 'Taze Kullanım', d: 'Pesto, salata ve çorbaya; sarımsaktan daha hafif ve aromatik tat.' },
      { icon: '🫙', t: 'Yağda Saklama', d: 'Zeytinyağında marine edilmiş yabani sarımsak yıl boyu kullanım sağlar.' },
      { icon: '🍞', t: 'Sarımsaklı Ekmek', d: 'Tereyağıyla karıştırılarak baget ekmek üzerine sürülür; eşsiz aroma.' },
      { icon: '🧈', t: 'Yabani Sarımsak Yağı', d: 'Yaprakları tereyağıyla blenderdan geçirip soğutun; sebze ve et için.' },
      { icon: '💊', t: 'Tıbbi Fayda', d: 'Allicin bileşeni kan basıncını düşürür; geleneksel bitkisel ilaçta kullanılır.' },
    ],
  },
};

export default function WildGarlic() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#65a30d';
  const bg = '#020800';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ecfccb', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Sarımsak</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#0a1400', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#a3e635',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#081000', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#bef264', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
