import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  signs: {
    title: 'İzler',
    items: [
      { icon: '🦶', t: 'Ayak izi', d: 'Vizon izi: 5 parmak, 2.5-3 cm. Yarı palmiye. Çamurlu dere kıyısında net.' },
      { icon: '💩', t: 'Dışkı', d: 'Dışkı: uzun, bükümlü, balık ve kürk kalıntısı. Su kenarında bırakır.' },
      { icon: '🏊', t: 'Avlanma bölgesi', d: 'Küçük koy ve sığ derelerde avcılık. Su bitişik karalık tercih.' },
      { icon: '🕳️', t: 'Yuva', d: 'Dere yatağı kıyısında toprak altı yuva. Taş altı kovuk da kullanır.' },
    ],
  },
  behavior: {
    title: 'Davranış',
    items: [
      { icon: '🌙', t: 'Aktif zaman', d: 'Gece ve alacakaranlıkta aktif. Gündüz yuvada dinlenir.' },
      { icon: '🐟', t: 'Beslenme', d: 'Balık, kurbağa, küçük kemirgen. Su kenarı ekosisteminin predatörü.' },
      { icon: '❄️', t: 'Kış', d: 'Kışın da aktif, göç etmez. Donmayan su bulursa avlanmaya devam eder.' },
      { icon: '⚠️', t: 'Uyarı', d: 'Köşeye sıkışınca agresif olur. Misk kokusu salar. Uzaktan gözlemle.' },
    ],
  },
};

export default function MinkTracking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('signs');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040608', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦦 Vizon Takibi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İzler · davranış · habitat</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#4f46e5' : '#06080e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#06080e', borderRadius: 14, padding: 14, border: '1px solid #4f46e533' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #0c0e1a' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#818cf8' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
