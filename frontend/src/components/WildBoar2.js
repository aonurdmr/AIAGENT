import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  track: {
    title: 'Izleme',
    items: [
      { icon: '🐗', t: 'Disti Izleri', d: 'Kaban disti izi; 6-8 cm uzunlukta, koy tirmak izleri belirgin sekilde gorunur.' },
      { icon: '🌿', t: 'Banyo Yerleri', d: 'Cubuk, cayir ve gol kenarlarinda cobuk alanlari en onemli iz gostergesidir.' },
      { icon: '🌰', t: 'Besleme Alanlari', d: 'Kozalak, mese palami ve kurbaga toplanan alanlar besleme evidir.' },
      { icon: '🏃', t: 'Hareket Saatleri', d: 'Alcakaranlıktan sabaha kadar aktif; gunduz sazlikta veya ormanda gizlenir.' },
      { icon: '💩', t: 'Disci Tespiti', d: 'Kaba turler icerikli, yogun koku yayan diska; taze olursa 12 saat icinde.' },
    ],
  },
  safety: {
    title: 'Guvenlik',
    items: [
      { icon: '⚠️', t: 'Yaklasmak', d: 'Kaban yavrularini korurken son derece saldirgan olabilir; uzak durulmali.' },
      { icon: '🌬️', t: 'Koku Yonu', d: 'Kaban kokuyu iyi alir; her zaman ruzgara karsı konumlanin.' },
      { icon: '🌳', t: 'Kacis Plani', d: 'Bir ağac veya yuksek kaya platformunu acil cikis olarak belirleyin.' },
      { icon: '🔊', t: 'Ses Cikarma', d: 'Ani karsilastirmada yuksek sesle bagirin ve buyuk gorunun; kacmak tetikler.' },
      { icon: '📱', t: 'Konum Paylasimi', d: 'Yalnız avcilarda GPS konumu ailenizle canli paylasin.' },
    ],
  },
};

export default function WildBoar2() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('track');
  const data = TABS[tab];
  const accent = '#78350f';
  const bg = '#0c0400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐗 Yaban Domuzu İzleme</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1e0800', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#d97706',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180600', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
