import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'plan', name: 'Planlama', icon: '📋', accent: '#f59e0b',
    items: [
      { t: 'Kalori hesabi', d: 'Yuksek aktivitede gunluk 3000+ kalori gerekebilir. Agir yemek almak tercih edilmez.' },
      { t: 'Depolama', d: 'Ayı bölgelerinde yiyecek ağaca asmak ya da çelik kap. Koku sızdırmayan çanta.' },
      { t: 'Hafif tutmak', d: 'Dondurulup kurutulmus yemekler: liyofilize. Hafif ve uzun raf omru.' },
      { t: 'Su ihtiyaci', d: 'Bazı hazir yemekler su ister. Su kaynagi veya filtre planla.' },
    ],
  },
  {
    id: 'recipes', name: 'Kolay Tarifler', icon: '🍳', accent: '#22c55e',
    items: [
      { t: 'Kahvaltı', d: 'Yulaf ezmesi + kuru meyve + fındık. Sadece sicak su yeter. 3 dk.' },
      { t: 'Oglen', d: 'Tam bugday kraker + konserve ton balik + zeytinyagi. Soguyor istemez.' },
      { t: 'Aksam', d: 'Anlık makarna + salca + parmesan. Bir tencere, 10 dakika.' },
      { t: 'Atistirmalik', d: 'Kuru meyve + bitter cikolata + fistik karısımı. Enerji ve yag dengesi.' },
    ],
  },
];

export default function CampingFood() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060a02', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍳 Kamp Yemek Planlaması</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Planlama · depolama · kolay tarifler</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0c1002', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c1002', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #121a04' : 'none' }}>
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
