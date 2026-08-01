import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'edible', name: 'Baharatlar', icon: '🌿', accent: '#22c55e',
    items: [
      { t: 'Yabani nane', d: 'Mentha: dere kenarı ve nemli alan. Taze cay, yemek ve deterjan ici.' },
      { t: 'Dereotu', d: 'Anethum graveolens: karisik tarla ve bahce. Balik ve zeytinyagli yemek.' },
      { t: 'Civanpercemi', d: 'Achillea: sarı-beyaz cicekler. Yara iyilestirici, anti-iltihap.' },
      { t: 'Kuzukulagi', d: 'Rumex: eksi tat. Yemege asit verir, ayran corbası ve borek icin.' },
    ],
  },
  {
    id: 'harvest', name: 'Toplama', icon: '🫙', accent: '#f59e0b',
    items: [
      { t: 'Ilkbahar toplama', d: 'Genc yaprak: en lezzetli ve besleyici. Kucuk, koyu yesil, taze.' },
      { t: 'Kucuk toplama', d: 'Populasyon bozma: tek noktadan az topla. Birakin uresin.' },
      { t: 'Kirli yol kenari', d: 'Araç egzoz ve atikli kenarlardan: bulaniki bitkiler. 10m uzak kal.' },
      { t: 'Saklama', d: 'Taze: nemli bezde buzdolabı. Kurutma: golge, hava akimi, 1-2 hafta.' },
    ],
  },
];

export default function WildHerbs() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Otlar & Baharatlar</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Baharatlar · toplama · saklama</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#06140a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#06140a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0c2014' : 'none' }}>
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
