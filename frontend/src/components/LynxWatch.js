import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🐱', t: 'Vaşak', d: 'Lynx lynx; Anadolu ormanlarinda yaşayan nadir yabani kedi; 18-30 kg.' },
      { icon: '🌲', t: 'Habitat', d: 'Kuzey Anadolu ve Dogu dag ormanlarinda seyrek nufus; gizli yasam.' },
      { icon: '🐾', t: 'Iz Ozellikleri', d: '7-9 cm genisliginde yuvarlak pati izi; tirnak izleri gorunmez.' },
      { icon: '📅', t: 'Aktif Donem', d: 'Sabahin erken saatleri ve aksam uzeri en aktif; kizisma Subat-Mart.' },
      { icon: '📡', t: 'Arastirma', d: 'Dogal Hayati Koruma Dernegi vasak izleme projeleri kamera tuzakla calisiyor.' },
    ],
  },
  conservation: {
    title: 'Koruma',
    items: [
      { icon: '⚠️', t: 'Tehdit Durumu', d: 'IUCN Endişe Verici; Türkiye nüfusu kesin sayım edilememiş ama düşük.' },
      { icon: '🚫', t: 'Yasak Avlanma', d: 'Vaşak ulusal mevzuatta kesin korunan tür; avcılık hapis cezasına tabidir.' },
      { icon: '🌳', t: 'Habitat Koruma', d: 'Kaçak kesim ve parçalanma en büyük tehdit; milli park alanı kritik önemde.' },
      { icon: '📸', t: 'Kamera Tuzak', d: 'Orman yollarına kurulan hareket sensörlü kameralar varlık teyidinde kullanılır.' },
      { icon: '🤝', t: 'Köy İşbirliği', d: 'Çevre köylerde bilinçlendirme; çobanların korumasız koyunları risk oluşturur.' },
    ],
  },
};

export default function LynxWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('observe');
  const data = TABS[tab];
  const accent = '#b45309';
  const bg = '#080600';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐱 Vaşak Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#160e00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#f59e0b',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#120c00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
