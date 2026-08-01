import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'species', name: 'Orman Kuslari', icon: '🐦', accent: '#22c55e',
    items: [
      { t: 'Agackakan', d: 'Tuk tuk tuk ses: gaga ile gövde vurma. 5 tur Turk ormanlarinda gorulebilir.' },
      { t: 'Baykus', d: 'Sessiz gibi gorunen orman: baykus sesini cagirca. Ormanda gece avci.' },
      { t: 'Sacayin (Jay)', d: 'Mavi kanatli, gurultulu. Tehlike aninda diger orman kusunu uyarır.' },
      { t: 'Iskete', d: 'Kucuk, akrobatik. Dal uclarında asili beslenir. Boyunbagi sarı-siyah.' },
    ],
  },
  {
    id: 'observe', name: 'Gozlem Teknigi', icon: '🔍', accent: '#a78bfa',
    items: [
      { t: 'Orman katmanlari', d: 'Zemin kuslari, alt catali, dort katman. Her katmanda farkli tur.' },
      { t: 'Sese odaklan', d: 'Gorsel degil, ses: kus gorebilmeden duyulur. Ses tanıma uygulaması.' },
      { t: 'Erken kalk', d: 'Sabah kus korisu: gunes dogusundan sonraki 2 saat en zengin.' },
      { t: 'Sessizlik', d: 'Ayak sesi kus kacar. Yavaş, hesapli hareket. Mola pozisyonunda bekle.' },
    ],
  },
];

export default function WoodlandBirds() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐦 Orman Kuşları Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · katmanlar · gözlem tekniği</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#081208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#081208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #102010' : 'none' }}>
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
