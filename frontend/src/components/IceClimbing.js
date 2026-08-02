import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'gear', name: 'Ekipman', icon: '🧊', accent: '#38bdf8',
    items: [
      { t: 'Buz kazması', d: 'Teknik kazmalar: kıvrık sap, modüler kafa. Tırmanışa özel, yürüyüş değil.' },
      { t: 'Krampon', d: '12 çivilü teknik krampon: ön iki çivi öne dönük (front-point). Buz için şart.' },
      { t: 'Kask ve buz çivileri', d: 'Ice screw: 17-22cm çelik çivi. Rotasyonlu kafa: tek elle takma. 2-4 gerekir.' },
      { t: 'Katman sistemi', d: 'Aktif kamp içi: ter alan baz. Softshell: rüzgar geçirmez. Hardshell: dış.' },
    ],
  },
  {
    id: 'technique', name: 'Teknik', icon: '⛏️', accent: '#60a5fa',
    items: [
      { t: 'Front-point tekniği', d: 'İki ön çivi buz içine: baldır kası çalışır. Ayak topuğu aşağı bak.' },
      { t: 'Kazma vuruşu', d: 'Bilek hareketi değil, dirsek: güç daha az. Buz sesi içi boş mu kontrol et.' },
      { t: 'Üçlü temas', d: 'Her zaman iki ayak + bir kazma ya da iki kazma + bir ayak sabit olsun.' },
      { t: 'Buz değerlendirme', d: 'Gürültülü koyu buz: güçlü. Beyaz hava kabarcıklı: zayıf. Vur ve dinle.' },
    ],
  },
];

export default function IceClimbing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#010810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧊 Buz Tırmanışı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekipman · teknik · güvenlik</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#021020', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#021020', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #031830' : 'none' }}>
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
