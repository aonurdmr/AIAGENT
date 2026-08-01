import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'habitat', name: 'Yayın Balığı Habitatı', icon: '🌊', accent: '#06b6d4',
    items: [
      { t: 'Derin havuz', d: 'Büyük yayın: derin, sakin havuz. Nehir dibinde bekleme.' },
      { t: 'Batık yapı', d: 'Batık ağaç, köprü altı, beton — saklanma noktası.' },
      { t: 'Sıcaklık', d: '18-26°C optimal. Soğuk su yavaşlatır, çok sıcak derine gider.' },
      { t: 'Gece aktivitesi', d: 'Gece daha aktif av — karanlıkta kıyıya yaklaşır.' },
    ],
  },
  {
    id: 'baits', name: 'En Etkili Yemler', icon: '🪝', accent: '#f97316',
    items: [
      { t: 'Canlı balık', d: 'Kalkan veya siraz balık. Büyük kanca, büyük yem — büyük balık.' },
      { t: 'Sakatat', d: 'Kırmızı et ve sakatat — güçlü koku. Gece avında zirve.' },
      { t: 'Mısır ve makarna', d: 'Küçük-orta yayın için. Tatlısu kökenli yem.' },
      { t: 'Wels worm', d: 'Uzun solucan demet. Gece ve alacakaranlıkta.' },
    ],
  },
  {
    id: 'tackle', name: 'Donanım', icon: '🎣', accent: '#a78bfa',
    items: [
      { t: 'Olta', d: 'Çok güçlü: 80-150lb test misina. Büyük yayın sürükler.' },
      { t: 'Makara', d: 'Big pit veya bait runner. Fren sistemi kritik.' },
      { t: 'Kanca', d: 'Büyük, güçlü kanca: 3/0-8/0. Barbsiz mümkünse.' },
      { t: 'Kurşun', d: 'Ağır: 3-6oz. Akıntılı nehirde daha ağır gerekebilir.' },
    ],
  },
];

export default function CatfishGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#04090e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐠 Yayın Balığı Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Habitat · yemler · donanım</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#08121a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#08121a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0c1820' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{item.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
