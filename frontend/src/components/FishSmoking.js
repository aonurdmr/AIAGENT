import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'prep', name: 'Hazırlık', icon: '🔪', accent: '#f59e0b',
    items: [
      { t: 'Tuzlama', d: 'Kuru tuz: baligi tuzla kap, 4-12 saat buzdolabında. Nem cıkar, lezmet yogunlasır.' },
      { t: 'Islak salamura', d: 'Su + tuz + şeker + baharat: 12-24 saat. Limon, dereotu, sarimsak ekle.' },
      { t: 'Balik secimi', d: 'Yaglik baliklar iyi tütsülenir: somon, uskumru, palamut, yılan balığı.' },
      { t: 'Boyut', d: 'Filetolar: ince olursa cok kurur. 2-3 cm kalinlik ideal tutsulenme icin.' },
    ],
  },
  {
    id: 'smoke', name: 'Tütsüleme', icon: '💨', accent: '#f97316',
    items: [
      { t: 'Sicak tutsulenme', d: '65-80°C, 2-4 saat: pisirir ve dumanlar. Yumusak, cremsi doku.' },
      { t: 'Soguk tutsulenme', d: '18-25°C, 12-48 saat: pisirimez, sadece lezzetlendirir. Deneyimli icin.' },
      { t: 'Agac secimleri', d: 'Elmacı, kirazkı: tatli ve meyveli duman. Ceviz: derin, sert.' },
      { t: 'Kamp tutsusu', d: 'Basit cetvel kafes + kapak + odun: tencere buhar sistemi ile yapılır.' },
    ],
  },
];

export default function FishSmoking() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>💨 Balık Tütsüleme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hazırlık · tuzlama · tütsüleme yöntemleri</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#140a00', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#140a00', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1e1200' : 'none' }}>
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
