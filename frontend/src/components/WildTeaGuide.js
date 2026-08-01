import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  plants: {
    title: 'Bitkiler',
    items: [
      { icon: '🌿', t: 'Ihlamur', d: 'Tilia türleri: çiçek ve yaprak. Haziran-Temmuz hasatı. Sakinleştirici.' },
      { icon: '🌼', t: 'Papatya', d: 'Matricaria chamomilla: beyaz taç yaprak sarı merkez. Tarlalarda yaygın.' },
      { icon: '🫐', t: 'Kuşburnu', d: 'Rosa canina: sonbaharda kırmızı meyve. C vitamini kaynağı. Tohumları ayıkla.' },
      { icon: '🌱', t: 'Nane', d: 'Mentha spp.: nemli dere kenarları. Kokunla tanı, gözlemle doğrula.' },
    ],
  },
  brew: {
    title: 'Hazırlama',
    items: [
      { icon: '☀️', t: 'Kurutma', d: 'Gölgede, havadar yerde kurutu. Doğrudan güneş yağ uçurur. 1-2 hafta.' },
      { icon: '🫖', t: 'Demleme', d: 'Taze: 80°C su, 3-5 dk. Kuru: 90°C, 5-7 dk. Çay kaşığı başına 200ml.' },
      { icon: '⚠️', t: 'Uyarı', d: 'Bilinmeyen bitki içme. Zehirli sarı kantaron var, kırmızı çiçekliden emin ol.' },
      { icon: '🏔️', t: 'Mevsim', d: 'Bahar: taze yaprak. Yaz: çiçek. Sonbahar: meyve. Kış: kök ve kabuk.' },
    ],
  },
};

export default function WildTeaGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('plants');
  const data = TABS[tab];

  return (
    <div style={{ background: '#030804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍵 Yabani Çay Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Bitkiler · toplama · demleme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#15803d' : '#060e08', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#060e08', borderRadius: 14, padding: 14, border: '1px solid #15803d33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #091608' : 'none' }}>
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
