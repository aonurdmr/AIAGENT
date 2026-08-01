import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🪨', t: 'Tas likeni', d: 'Xanthoria: turuncu, kayalarda. Hava kalitesi gostergesi; temiz yerde varsa.' },
      { icon: '🌿', t: 'Orman likeni', d: 'Lobaria pulmonaria: akciğer şekli, yesil-kahve. Yasli ve saglikli orman.' },
      { icon: '⬜', t: 'Icicle liken', d: 'Usnea: agactan sarkıt seklinde. Antibiyotik ozelligi, geleneksel kullanim.' },
      { icon: '🏔️', t: 'Kaya likeni', d: 'Rhizocarpon: siyah-yesil kaya kaplar. Jeolojik yas belirleme aracı.' },
    ],
  },
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🔬', t: 'Simbiyoz', d: 'Liken: mantar + yosun (veya siyanobalter). Iki organizma tek varlık.' },
      { icon: '🌡️', t: 'Biyoindikatör', d: 'SO2 hassas: liken yoksa hava kirli. Sehirlerde az orman likeni.' },
      { icon: '🌍', t: 'Azot baglama', d: 'Siyanobalterli liken: azot bağlar. Ilk yerlesen organizma. Toprak hazırlar.' },
      { icon: '🐦', t: 'Yaban hayati', d: 'Liken: kuslara yuva malzemesi. Sivrisinekler ve bocekler saklanır.' },
    ],
  },
};

export default function LichenGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040806', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪨 Liken Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · ekoloji · biyoindikatör</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#65a30d' : '#0c1008', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c1008', borderRadius: 14, padding: 14, border: '1px solid #65a30d33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #141e10' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#a3e635' }}>{item.t}</div>
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
