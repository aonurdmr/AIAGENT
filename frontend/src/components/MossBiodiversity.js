import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🌿', t: 'Kaya yosunu', d: 'Grimmia: kuru kayaliklarda. Kuraklığa cok dayanikli, siyah yesil.' },
      { icon: '💧', t: 'Su yosunu', d: 'Fontinalis: akan su ici. Oksijen uretici, balik yuvasi koruyucusu.' },
      { icon: '🌲', t: 'Orman yosunu', d: 'Polytrichum: orman zemini. Buyuk ve dik. Biyoindikatör nem olcer.' },
      { icon: '🏔️', t: 'Sphagnum', d: 'Turba yosunu: bataklık. Su tutucu; hacminin 20 kati su absorbe eder.' },
    ],
  },
  observe: {
    title: 'Ekoloji',
    items: [
      { icon: '🌡️', t: 'Nem gostergesi', d: 'Yogun yosun = yuksek nem ve golgeli alan. Dogal nemometre.' },
      { icon: '🌍', t: 'Karbon depo', d: 'Sphagnum: turba batakligi olarak karbon dep. iklim dengesinde kritik.' },
      { icon: '🦎', t: 'Habitat', d: 'Yosun alani: kucuk omurgasiz ve amfibi. Kurbaga, solucan, boceğin evi.' },
      { icon: '🔬', t: 'Mikroekosistem', d: 'Bir yosun yamaclasi: yuzlerce mikroorganizma barindiran ekosistem.' },
    ],
  },
};

export default function MossBiodiversity() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yosun Biyoçeşitliliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · ekoloji · habitat</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#166534' : '#04120a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04120a', borderRadius: 14, padding: 14, border: '1px solid #16653433' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081e14' : 'none' }}>
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
