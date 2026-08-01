import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'prep', name: 'Hazırlık', icon: '🔪', accent: '#f59e0b',
    items: [
      { t: 'Hemen sogutma', d: 'Avladindan sonra ic organlar cikar, serinlet. Sicaklik: bozulmayı onler.' },
      { t: 'Yolma ve deri', d: 'Yaban domuzu: kil kalin ve guclu. Sicak su + kulplu bicak. Deri kaldir.' },
      { t: 'Olgunlastirma', d: 'Sogutucu 3-5 gun: tur kas yumusak, lezzet yogunlasır, olum sertligi gecer.' },
      { t: 'Marinasyon', d: 'Kirmizi sarap + soğan + sarımsak + defne: 24-48 saat. Koku gider, tat verir.' },
    ],
  },
  {
    id: 'cook', name: 'Pişirme', icon: '🍖', accent: '#dc2626',
    items: [
      { t: 'Yavaş pisirme', d: 'Domuz eti: yuksek kollajen. 150°C 4-6 saat: et kemikten duser, nefis.' },
      { t: 'Rosto', d: 'Firin torbası: domuz but + sogan + havuc + domates + et suyu. 3 saat.' },
      { t: 'Kamp gulasch', d: 'Kubusu + patates + domates: tencere. Uzun surer ama kamp yemegi.' },
      { t: 'Sosis yapımı', d: 'Domuz kiyma + sarımsak + kekik: dogal bagirsaga dol, koru astir.' },
    ],
  },
];

export default function WildBoarCooking() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060200', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐗 Yaban Domuzu Pişirme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hazırlık · marinasyon · pişirme</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#100400', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100400', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1c0a00' : 'none' }}>
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
