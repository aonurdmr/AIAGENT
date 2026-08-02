import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'prep', name: 'Hazırlık', icon: '🔪', accent: '#f97316',
    items: [
      { t: 'Malzeme oncesi', d: 'Kamp oncesi malzemeleri porsiyon boyu kes, vakumla veya ziplock koy.' },
      { t: 'Tuz-Baharat', d: 'Onceden karistirilmis baharat karisimi: tasima kolayligi, doğru oran.' },
      { t: 'Tahta veya levha', d: 'Portatif kesme tahtasi: katlanir cesidi tercih. Hijyen kritik.' },
      { t: 'Pisirim kaplari', d: 'Tek kap yemek: bir tencere / tavada hem pisir hem sun. Az bulasik.' },
    ],
  },
  {
    id: 'recipes', name: 'Tarifler', icon: '🍳', accent: '#22c55e',
    items: [
      { t: 'Kamp gulasch', d: 'Kor ustunde: sogan + domates + et + patates + baharat. 45 dk.' },
      { t: 'Folyo patates', d: 'Tereyagi + sarimsak + patates: kore gom 40 dk. Kolay, doyurucu.' },
      { t: 'Kamp kahvaltisi', d: 'Yumurta + sucuk + domates: tek tavalık kahvalti. 15 dk erken kalk.' },
      { t: 'Marshmallow', d: 'Camur utan: ate&#351;e soguk akis ustunde, disarı donmeye almak gerekir.' },
    ],
  },
];

export default function CampfireFood() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔥 Kamp Ateşi Yemekleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hazırlık · tarifler · kolay kamp yemeği</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#100a00', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100a00', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1a1200' : 'none' }}>
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
