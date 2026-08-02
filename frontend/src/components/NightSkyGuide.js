import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  constellations: {
    title: 'Takımyıldız',
    items: [
      { icon: '⭐', t: 'Orion', d: 'Kış gökyüzü: 3 yıldız kuşak. Güneydoğuda parlak Sirius\'u bul.' },
      { icon: '🐻', t: 'Büyük Ayı', d: 'Kuzey işareti: 7 yıldız kepçe. Kuzey Yıldızı\'na iki yıldız uzatarak ulaş.' },
      { icon: '🦂', t: 'Akrep', d: 'Yaz güneyi: kızıl Antares merkez. Orion ile karşı kutuplarda.' },
      { icon: '🌌', t: 'Samanyolu', d: 'Temmuz-Eylül: en parlak. Işık kirliliğinden uzak, aylı olmayan gece.' },
    ],
  },
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🌑', t: 'Yeni ay', d: 'En karanlık gece: yeni ay döneminde. Ay takvimini takip et.' },
      { icon: '👁️', t: 'Karanlık uyumu', d: '20-30 dk karanlıkta bekle. Gözler açılır, çok daha fazla göreceksin.' },
      { icon: '🔭', t: 'Çıplak göz', d: 'Dürbün yeterli: M42 nebula, Pleiades küme. Teleskop gerekmez.' },
      { icon: '📍', t: 'Türkiye noktaları', d: 'Konya ovası, Nemrut, Kapadokya: en az ışık kirliliği.' },
    ],
  },
};

export default function NightSkyGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('constellations');
  const data = TABS[tab];

  return (
    <div style={{ background: '#010208', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌌 Gece Gökyüzü Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Takımyıldız · gözlem · konum</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#1e1b4b' : '#020410', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#020410', borderRadius: 14, padding: 14, border: '1px solid #1e1b4b55' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #08081e' : 'none' }}>
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
