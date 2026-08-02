import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  hunting: {
    title: 'Avlanma',
    items: [
      { icon: '🐦', t: 'Keklik', d: 'Alectoris chukar; Orta Dogu nun endemik kekligi; kayalik daglarda yaygin.' },
      { icon: '🏔️', t: 'Habitat', d: 'Kireçtasi kayalıkları, taş yamaçlar ve seyrek fundalıklar; denizden 500-2500m.' },
      { icon: '🐕', t: 'Av Kopeği', d: 'Setter ve pointer ırk; koklamayla kekligi sapar ve hareketsiz durur (point).' },
      { icon: '📅', t: 'Sezon', d: 'Eylul-Ocak av sezonu; yavru keklik boyutu yeterliyse Eylul basinda acilir.' },
      { icon: '🎯', t: 'Silah', d: '12\'lik av tupegi; kolay gecen boşlukta sacma yayilimi dusuk No.6 sacma ideal.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Mangal', d: 'Bütün keklik üzüm yapraklarına sarılıp mangalda; Ege ve Orta Anadolu usulü.' },
      { icon: '🍷', t: 'Kırmızı Şaraplı', d: 'Taze kekiği ile yavaş pişirme; kekliğin kuru etine nem katar.' },
      { icon: '🧅', t: 'Güveç', d: 'Soğan, domates ve biber ile fırın güveci; Doğu Anadolu mutfağı geleneği.' },
      { icon: '🫙', t: 'Marine', d: 'Limon, zeytinyağı ve baharat marine 8 saat; pişirme öncesi et gevşer.' },
      { icon: '🌿', t: 'Dolma', d: 'Keklik dolması; pirinç, ceviz ve kuş üzümü ile doldurulup pişirilen özel tarif.' },
    ],
  },
};

export default function ChukarHunting() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('hunting');
  const data = TABS[tab];
  const accent = '#92400e';
  const bg = '#0a0400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐦 Keklik Avı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#180a00', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#140800', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fcd34d', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
