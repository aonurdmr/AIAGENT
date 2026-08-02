import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'assess', name: 'Değerlendirme', icon: '🌊', accent: '#06b6d4',
    items: [
      { t: 'Su hizi', d: 'Akıntı yuzey hizi gozlemi: dal at, hiz ol. 1m/s ustunde tehlikeli.' },
      { t: 'Derinlik', d: 'Sopa ile derin yeri test et. Diz ustunde: zorlasinyor. Bel: gec.' },
      { t: 'Zemin', d: 'Kayalık zemin: kayar. Kum: batar. Cakil: ideal. Yosun: ok kayar.' },
      { t: 'Cikis noktasi', d: 'Karsı kıyida cikis planla onceden. Asagıdan gelirsen tutunacak var mi?' },
    ],
  },
  {
    id: 'cross', name: 'Geçiş Tekniği', icon: '🥾', accent: '#22c55e',
    items: [
      { t: 'Aciyla gecis', d: 'Akintiya 45° acı ile gec: dirence karsı degil, diagonal yuzleyerek.' },
      { t: 'Grup halkasi', d: 'Grup halinde: kol kola, en guclu kisi akinti tarafi. Birlikte ilerle.' },
      { t: 'Sopa yardimi', d: 'Uzun sopa akintı tarafında 3. dayanak noktasi saglar. Her adim test.' },
      { t: 'Canta tokası', d: 'Gecer iken canta tokasını ac. Duserse canta seni batirmasin.' },
    ],
  },
];

export default function RiverCrossing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Nehir Geçişi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Değerlendirme · teknik · güvenlik</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#041820', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041820', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #08242e' : 'none' }}>
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
