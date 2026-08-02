import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'clean', name: 'Temizleme', icon: '🔪', accent: '#f59e0b',
    items: [
      { t: 'Yolma', d: 'Tuy yolma: soguk su ile ıslat, kolaylaşır. Kus tepesinden baslayarak cek.' },
      { t: 'Ic bosaltma', d: 'Kursagı dikkatle cek, yirtma. Ic organlari cıkar. Ciger ve ic yag kullan.' },
      { t: 'Yikama', d: 'Soguk su ile iyice yıka. Kirmizi kalıntı kalmamali.' },
      { t: 'Yas etme', d: 'Sulun eti sert. Buzdolabında 24-48 saat bekleterek yumusatilır.' },
    ],
  },
  {
    id: 'cook', name: 'Pisirme', icon: '🍳', accent: '#f97316',
    items: [
      { t: 'Yavaş pisirme', d: 'En iyi yontem: 160°C firin, 2-2.5 saat. Foil ile sararak kurumasın.' },
      { t: 'Guveç', d: 'Sogan, havuc, patates ve sos ile guveç. 90 dk sonra eti yumusaklasir.' },
      { t: 'Izgara', d: 'Marinasyon zorunlu. Zeytinyagi + biberiye + sarimsak. Yuksek ısıda kisa sure.' },
      { t: 'Sarı seker', d: 'Av etine ozgu: soğan ve seker karamelizasyonu ile tat katmana ulas.' },
    ],
  },
];

export default function PheasantCook() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦚 Sülün Pişirme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Temizleme · yumuşatma · pişirme yöntemleri</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#161000', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#161000', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #201800' : 'none' }}>
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
