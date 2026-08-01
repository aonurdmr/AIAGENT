import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🐦', t: 'Yalıcapkını', d: 'Alcedo atthis: Turkiyenin en guzeli. Nehir kenari kayalic. Mavi-turuncu.' },
      { icon: '⚪', t: 'Dere kırlangici', d: 'Riparia riparia: toprak yarlara yuva kazar. Kume halinde urer.' },
      { icon: '🟤', t: 'Su kırlangicı', d: 'Cinclus: su altına dalar, taş altı arar. Nehirin gorustusu.' },
      { icon: '⚫', t: 'Siyah leylegi', d: 'Ciconia nigra: ıssız nehir ve ormanda urer. Cok nadir gorulur.' },
    ],
  },
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🌊', t: 'Nehir kenari', d: 'Dal veya kaya uzerine inerler. Akıs hızı dusuk nehirler tercih.' },
      { icon: '🌅', t: 'Erken sabah', d: 'Nehir kuslari sabah ilk ısıkta oluklarda en aktif.' },
      { icon: '🔭', t: 'Durbun', d: 'Nehir boyunca tarama: 8x42 durbun. Golgeli alanlara dikkat et.' },
      { icon: '📷', t: 'Fotograflama', d: 'Yalıcapkını: dal ustunde bekle. Sabah alacak-ısıgında renkler parlak.' },
    ],
  },
};

export default function RiverBirds() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c0a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐦 Nehir Kuşları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · habitat · gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#041210', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041210', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081e18' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#22d3ee' }}>{item.t}</div>
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
