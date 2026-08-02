import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🌿', t: 'Karaagac egreltiotu', d: 'Dryopteris: orman ici, golge. Yuvarlak yaprak dipleri ile taninir.' },
      { icon: '🟢', t: 'Tatlı egrelti', d: 'Polypodium: kayalık kıyılar, duvar uzerinde. Kış yeşil kalır.' },
      { icon: '🌱', t: 'Kartal egrelti', d: 'Pteridium: hızlı yayilan, cok geniş geniş yüzey. Zehirli, yenilmez.' },
      { icon: '🌾', t: 'Su egrelti', d: 'Azolla: su yüzeyinde yüzen kucuk fern. Azot bağlayan alg ile simbiyoz.' },
    ],
  },
  observe: {
    title: 'Gözlem & Ekoloji',
    items: [
      { icon: '🌲', t: 'Habitat', d: 'Golgeli, nemli orman dipleri. Olcek: golge miktarı artinca fern artar.' },
      { icon: '🌀', t: 'Sporlar', d: 'Yaprak altında sori: sarı-kahve nokta dizileri. Tohum degil: spor.' },
      { icon: '🦎', t: 'Yaban hayatı', d: 'Egrelti alani gizlenme yeri: yilan, kertenkele, kucuk memeli.' },
      { icon: '💧', t: 'Nem gostergesi', d: 'Egrelti yogunlugu nem indikatorü. Yuksek fern = yuksek nem.' },
    ],
  },
};

export default function FernGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Eğreltiotu Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · habitat · ekoloji</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#081008', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#081008', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #102010' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{item.t}</div>
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
