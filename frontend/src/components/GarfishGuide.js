import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'habitat', name: 'Habitat & Davranis', icon: '🐟', accent: '#22c55e',
    items: [
      { t: 'Bulundugu yerler', d: 'Zargana yuzey balikcidir. Sahil sericisi, kayalik burnu, golfler tercih eder.' },
      { t: 'Mevsim', d: 'Yaz: denize yakin yuzey. Kis: biraz derine iner. En aktif sabah ve aksam.' },
      { t: 'Beslenmesi', d: 'Kucuk baliklar ve karides. Uzun gagas ile ustten vurur, yandan degil.' },
      { t: 'Sur hareketi', d: 'Orgusu halinde yuzey hareketleri gorunce hizlica harekete gec.' },
    ],
  },
  {
    id: 'method', name: 'Avlanma Yontemleri', icon: '🎣', accent: '#06b6d4',
    items: [
      { t: 'Hafif olta', d: 'Ince misina PE 0.6-1.0. Uzak atim icin hafif jig veya kucuk mepps.' },
      { t: 'Uzatma yemi', d: '3-4 cm kucuk balik yem. Yuzey ya da yarı su derinligine ayarla.' },
      { t: 'Alabalik mepps', d: 'Kucuk spinner: parlak gumus veya sari. Cevikce cek, duraklatma yok.' },
      { t: 'Sabah erken', d: 'Zargana ilk ısikta yuzey yemine gelir. En aktif saat 06:00-08:00.' },
    ],
  },
  {
    id: 'cook', name: 'Temizlik & Pisirme', icon: '🍳', accent: '#f59e0b',
    items: [
      { t: 'Yeşil kemik', d: 'Zargana kemikleri pisince yesil renk alir. Normal, zararsiz.' },
      { t: 'Filetolama', d: 'Uzun ve ince govdesi kolay filetolanir. Kılci az, et lezzetli.' },
      { t: 'Kizartma', d: 'Un veya misir uni kaplama, sivi yag 180°C. 2-3 dk. Altın rengi.' },
      { t: 'Izgara', d: 'Butun zargana: zeytinyagi + limon + sarımsak. Her yuz 3 dk izgar.' },
    ],
  },
];

export default function GarfishGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c08', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Zargana Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Habitat · yontemler · pisirme</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#041408', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041408', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #082010' : 'none' }}>
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
