import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Kefal avı', d: 'Çok zor av: ihtiyatlı balık. Kıl olta, çok küçük iğne, minimal mayt.' },
      { icon: '🍞', t: 'Yem', d: 'Ekmek hamuru, karpuz kabuğu, yeşil yosun: kefal ot yiyici. Balık yemi işe yaramaz.' },
      { icon: '🌊', t: 'Teknik', d: 'Çok yavaş çek, ani hareket kaçırır. Yüzey sürükleme: sabırlı bekle.' },
      { icon: '📍', t: 'Nokta', d: 'Liman ağzı, kanal, deniz girişli bataklık. Sürü halinde beslenirken bul.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Izgara', d: 'Bütün kefal: zeytinyağı, limon, sarımsak, dereotu. Yüksek ateş 15 dk.' },
      { icon: '🧂', t: 'Tuzlama', d: 'Lakerda: balık sırtı büyükse tuzla 3-4 hafta. Yağlı kefal uygun.' },
      { icon: '🥗', t: 'Marine', d: 'Limon suyu + zeytinyağı 30 dk: sebze üzerine. Hafif ve lezzetli.' },
      { icon: '🐟', t: 'Havyar', d: 'Kefal yumurtası: "botargo" olarak kür et. Lüks ürün, kuru tuzla 3 hafta.' },
    ],
  },
};

export default function MulletFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Kefal Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · yem · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#1d4ed8' : '#040e20', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#040e20', borderRadius: 14, padding: 14, border: '1px solid #1d4ed833' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #061428' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#93c5fd' }}>{item.t}</div>
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
