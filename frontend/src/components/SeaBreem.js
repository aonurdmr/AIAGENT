import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🐠', t: 'Çipura avı', d: 'Dipte beslenici: dip oltası en etkili. Octopus parçası, midye, karides.' },
      { icon: '🌊', t: 'Nokta', d: 'Kayalık dip, deniz çayırı sınırı: çipura burada bekler. 5-15m derinlik.' },
      { icon: '🎣', t: 'Sinek', d: 'Fly fishing: sığ kayalık. Küçük shrimp taklidi sinek. Sabah erken etkili.' },
      { icon: '🌙', t: 'Gece', d: 'Büyük çipura geceleri avlanır. Dip jigging: gece daha derin sular.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🧂', t: 'Kaba tuzda', d: 'Bütün çipura kaba tuz içine göm. 200°C 25 dk. En saf çipura tadı.' },
      { icon: '🔥', t: 'Izgara', d: 'Derin çizikler: eti çabuk pişer. Zeytinyağı ve limon. 6-8 dk.' },
      { icon: '🫕', t: 'Fırın', d: 'Domates, kapari, zeytinyağı: İtalyan tarzı. 180°C 20 dk. Mükemmel.' },
      { icon: '🍋', t: 'Çiğ', d: 'Taze çipura sashimi: limon, zeytinyağı, kapari. Çok taze olmalı.' },
    ],
  },
};

export default function SeaBreem() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#01060e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐠 Çipura Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · nokta · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0c4a6e' : '#030c1a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#030c1a', borderRadius: 14, padding: 14, border: '1px solid #0c4a6e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #051224' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#7dd3fc' }}>{item.t}</div>
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
