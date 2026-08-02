import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'species', name: 'Vatozlar & Turler', icon: '🐡', accent: '#06b6d4',
    items: [
      { t: 'Yildiz vatoz', d: 'Akdeniz ve Ege turk kiyilari. Kuyruğunda zehirli diken. Dikkat!' },
      { t: 'Dev vatoz', d: 'Buyuk, zararsız. Yuzeyden atlayarak gorulebilir. Dip yuzucusu.' },
      { t: 'Torpil baligi', d: 'Vatoz gibi gorumur. Elektrik sok verir 50+ volt. Elle tutma!' },
      { t: 'Dusuk ova vatoz', d: 'Kum ve cayir zemininde. Ustune basılırsa savunma dikeni batar.' },
    ],
  },
  {
    id: 'safety', name: 'Guvenlik & Kavram', icon: '⚠️', accent: '#f97316',
    items: [
      { t: 'Yuruyen kuralı', d: 'Sığ kıyıda kumlarda sur ayagi ile yururken vatoz kacar. Kaldirma yok.' },
      { t: 'Diken batmasi', d: 'Kuyruğun dikeni batar: sicak su (45°C) zeher etkisi azaltır. Acil servis.' },
      { t: 'Elektrik vurması', d: 'Torpil baliginden 50+ volt. Kalp ritimine etki. Guvende uzak dur.' },
      { t: 'Fotograflama', d: 'Uzak tut ve sadece goz dozu. Derin havuzda yuzenden gorsel yap.' },
    ],
  },
  {
    id: 'cook', name: 'Pisirme', icon: '🍳', accent: '#22c55e',
    items: [
      { t: 'Hangi tur yenir', d: 'Yildiz vatoz eti yenilebilir, lezzetli. Diger turler nadiren tuketime girer.' },
      { t: 'Hazırlama', d: 'Kuyruğu ve deri cikar. Kıkırdaklı gövde kaynayarak yumusur.' },
      { t: 'Haşlama', d: 'Tuzlu su + defne + biber. 20 dk yavaş kaynatma. Limonla servis.' },
      { t: 'Tereyağlı kavurma', d: 'Dilimlenmiş vatoz kanadı + tereyag + kapari + limon: klasik.' },
    ],
  },
];

export default function RayGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c12', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐡 Vatoz & Torpil Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · güvenlik · pişirme</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#04121c', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#04121c', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081c28' : 'none' }}>
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
