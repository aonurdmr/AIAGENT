import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  signs: {
    title: 'Izler',
    items: [
      { icon: '🐾', t: 'Ayak izi', d: 'Kurt izi: 10-12cm, 4 parmak, oval. Kopekkten buyuk ve oval.' },
      { icon: '💩', t: 'Kaka', d: 'Kurt disi: tuy, kemik parcalari. Yol ortasinde birakir, bölge isaretleme.' },
      { icon: '🔊', t: 'Uluma', d: 'Kurt ulumasi: 6km mesafede duyulur. Gece alacakaranlık ve seherde.' },
      { icon: '🌀', t: 'Yuva', d: 'Yavrulama yuvasi: kayalik, dere yanı, sakli alan. Ureyen suruden uzak kal.' },
    ],
  },
  behavior: {
    title: 'Davranis',
    items: [
      { icon: '🐺', t: 'Suru yapisi', d: 'Alpha cift liderlik eder. Suru 5-10 birey. Birlikte avlanir.' },
      { icon: '🦌', t: 'Av taktigi', d: 'Kurt surununu kovalayarak zayifini secer. Dogrusal kovalamasede pes etmez.' },
      { icon: '🌍', t: 'Bölge', d: 'Kurt surusi 100-400 km kare bolge kullanir. Koku ve izle isaretler.' },
      { icon: '🤝', t: 'Karsilasmak', d: 'Kurt nadiren insana saldırır. Govde dik dur, goz temas kur, geri cekil.' },
    ],
  },
};

export default function WolfTracking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('signs');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040606', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐺 Kurt Takibi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İzler · davranış · güvenlik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#6b7280' : '#0c1010', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c1010', borderRadius: 14, padding: 14, border: '1px solid #6b728033' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #141c1c' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af' }}>{item.t}</div>
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
