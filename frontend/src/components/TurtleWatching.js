import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🐢', t: 'Caretta caretta', d: 'Deniz kaplumbagasi: Akdeniz sahilleri. Dalyan, Belek yuvalar. Korunuyor.' },
      { icon: '🟢', t: 'Chelonia mydas', d: 'Yesil kaplumbaga: daha nadir. Deniz cimeni ile beslenir. Korunuyor.' },
      { icon: '🟤', t: 'Tatlı su kaplumbagası', d: 'Mauremys rivulata: nehir ve gol. Tas ustunde gunes banyo yapar.' },
      { icon: '⚫', t: 'Kaya kaplumbagası', d: 'Testudo graeca: dag etegi ve zeytinlik. Ot yiyici, uzun omurlu.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '🌙', t: 'Yuvalama', d: 'Caretta: Haziran-Agustos geceleri sahile cikar. 30cm delik, 100+ yumurta.' },
      { icon: '🌅', t: 'Sabah gozlem', d: 'Deniz kaplumbagasi: sabah erken yuzey soluma. Tekne ile yaklasma.' },
      { icon: '🏖️', t: 'Sahil kurallari', d: 'Yuvalama sahasina gece girmek yasak. Isik ve gurultu: yonlerini saptirır.' },
      { icon: '🤿', t: 'Dalarak gozlem', d: 'Sualt gozlem: 3-5m uzak mesafeden. Dokunmak yasak ve zararli.' },
    ],
  },
};

export default function TurtleWatching() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020e06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐢 Kaplumbağa Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · yuvalama · gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#15803d' : '#041810', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041810', borderRadius: 14, padding: 14, border: '1px solid #15803d33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #082418' : 'none' }}>
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
