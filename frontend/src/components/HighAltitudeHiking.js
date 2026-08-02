import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  acclimatize: {
    title: 'Aklimatizasyon',
    items: [
      { icon: '🏔️', t: 'Yuksek irtifa', d: '2500m ustunde: oksijen azalır. Her 300m icin bir gun bekle.' },
      { icon: '💧', t: 'Sivi alimi', d: 'Yuksekte dehidrasyon hizlanır. Gunde 3-4L su. Sarimsak cay yardımcı.' },
      { icon: '🛌', t: 'Yukari cikasin', d: 'Gece daha alçakta uyu: "climb high, sleep low" prensibi. Uyku kritik.' },
      { icon: '⚠️', t: 'AMS', d: 'Akut dag hastaligi: bas agrisi, bulanti, uyku bozuklugu. Belirtide in.' },
    ],
  },
  gear: {
    title: 'Ekipman',
    items: [
      { icon: '🧥', t: 'Katman sistemi', d: 'Dusuk basinc soğutur: gece -10C dahi olabilir 3500m ustunde.' },
      { icon: '🥾', t: 'Ayakkabi', d: 'Dag botu: yuksek bilek destegi. Krampon uyumlu tercih et.' },
      { icon: '☀️', t: 'Gunes koruma', d: 'Yuksekte UV 40% fazla: SPF 50+ krem ve gozluk. Kar kor yapar.' },
      { icon: '🎒', t: 'Agirlik', d: 'Her 300m = 1kg hisseder gibi. Gerekmeyeni birak, hafif giy.' },
    ],
  },
};

export default function HighAltitudeHiking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('acclimatize');
  const data = TABS[tab];

  return (
    <div style={{ background: '#04060e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏔️ Yüksek İrtifa Yürüyüşü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Aklimatizasyon · ekipman · AMS</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#4338ca' : '#080c1c', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#080c1c', borderRadius: 14, padding: 14, border: '1px solid #4338ca33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #10182c' : 'none' }}>
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
