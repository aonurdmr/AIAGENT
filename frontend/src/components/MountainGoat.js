import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '🔭', t: 'Habitat', d: 'Kayalik daglar, talik kucuk yarlar ve dik tepeler. Yuksek irtifada.' },
      { icon: '🌅', t: 'En iyi saat', d: 'Sabah erken ve aksam: otlamak icin daha alcaga iner. Durbun sart.' },
      { icon: '🧊', t: 'Kis davranisi', d: 'Kar donmesi: kaya cikartiları ararlar. Grupta gorulurler, kuzular ananin yanında.' },
      { icon: '🎒', t: 'Yaklasma', d: 'Ruzgar alti kalan yonunden yaklas. Koku anlar ve kacar. Sessiz yuru.' },
    ],
  },
  species: {
    title: 'Turler & Ozellikleri',
    items: [
      { icon: '🐐', t: 'Yaban kecisi', d: 'Capra aegagrus: Turkiye ve Anadolunun dogal yaban kecisi. Uzun boynuzlu.' },
      { icon: '🟤', t: 'Boynuz', d: 'Erkekler daha uzun ve kalın. Boynuz halka sayisi yas gosterir.' },
      { icon: '👃', t: 'Koku', d: 'Erkek yaban kecisi keskin kokuludur, ozellikle ciftlesme mevsiminde.' },
      { icon: '🏔️', t: 'Dogal park', d: 'Munzur, Kackar, Toroslar: keciler yasayan koruma alanlari.' },
    ],
  },
};

export default function MountainGoat() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('observe');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080604', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐐 Yaban Keçisi Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Habitat · gözlem · türler</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a78bfa' : '#100e08', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100e08', borderRadius: 14, padding: 14, border: '1px solid #a78bfa33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1c1a10' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#c4b5fd' }}>{item.t}</div>
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
