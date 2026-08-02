import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🌰', t: 'Yabani Ceviz', d: 'Juglans regia yabani formu; Anadolu dag ormanlarinin karakteristik agaci.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Eylul-Ekim yesil kabuk sararip catlayinca; meyvelerin dustugunü bekle.' },
      { icon: '🌳', t: 'Tanima', d: 'Buyuk kanat bicimli bileşik yaprak; 10-30 m yukseklikte; derin vadiler.' },
      { icon: '🖐️', t: 'Toplama', d: 'Eldiven zorunlu; yesil kabuk elleri boyar; sicak suda yikanmaz, krem kullan.' },
      { icon: '🌍', t: 'Lokasyon', d: 'Karadeniz dag etekleri, Duzce, Bolu, Kastamonu; yabani nufus geniş.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍰', t: 'Cevizli Tatlı', d: 'Baklava, kadayıf ve helva; Türk tatlı geleneğinin birincil ceviz kaynağı.' },
      { icon: '🫙', t: 'Yabani Ceviz Reçeli', d: 'Yeşil ham ceviz reçeli; çok çalışma gerektiren özel bir Türk lüksü.' },
      { icon: '🫒', t: 'Ceviz Yağı', d: 'Soğuk sıkım ceviz yağı; omega-3 bakımından zengin; salata için ideal.' },
      { icon: '🧴', t: 'Boyar Madde', d: 'Yeşil kabuk taneninden elde edilen naturel kahverengi boya; çevre dostu.' },
      { icon: '🌿', t: 'Yaprak', d: 'Ceviz yaprağı mantar ve cilt enfeksiyonu tedavisinde geleneksel kullanım.' },
    ],
  },
};

export default function WildWalnut() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#78350f';
  const bg = '#080400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌰 Yabani Ceviz</span>
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
              <div style={{ fontSize: 13, color: '#fcd34d', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
