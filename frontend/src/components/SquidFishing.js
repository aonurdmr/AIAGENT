import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'method', name: 'Egi Jig Teknigi', icon: '🦑', accent: '#a78bfa',
    items: [
      { t: 'Egi nedir', d: 'Kalamar olta yemi. Renk degistiren plastik yem + alt katarcali kanca.' },
      { t: 'Atim ve cekis', d: 'At, dibe birak. 3-4 hizli cekis sonra dur, biraz daha kaydır. Ritim şart.' },
      { t: 'Gece avantaji', d: 'Kalamar isiga gelir. Sahil lambalari veya tekne icin guc kaynagi + beyaz ampul.' },
      { t: 'Mevsim', d: 'Sonbahar-kis: kalamar sahile yakin. Yaz: derinlerde, deniz avantajli.' },
    ],
  },
  {
    id: 'tackle', name: 'Ekipman', icon: '🎣', accent: '#06b6d4',
    items: [
      { t: 'Kamis', d: 'Hafif, esnek uç 2.4-3m. Egi jig kamisi spesifik. PE 0.5-1.5 misina.' },
      { t: 'Egi boyutu', d: '2.5-3.5 numara sahil icin. Derin su: daha agir, uzak atim. Renk: pembe, esmer.' },
      { t: 'Leader misina', d: 'Florokarbon lider 8-12lb. Kalamar keskin gagasi misina keser.' },
      { t: 'Makara', d: 'Hafif spinning 2500-3000 numara. Iyi fren sistemi, hassas dokunuş.' },
    ],
  },
  {
    id: 'cook', name: 'Temizlik & Pisirme', icon: '🍳', accent: '#22c55e',
    items: [
      { t: 'Murekkepi bosalt', d: 'Bas ayir, ic organlar cek. Murekkep kesesi siyah — saglamsa guvde koru.' },
      { t: 'Kalamari soy', d: 'Dis deri tutup cek — soyulur. Kanatlar da yenilebilir.' },
      { t: 'Kizartma', d: 'Halkalar unla kapla, 180°C yag. 2 dk — fazla pisirme lastiklestirir.' },
      { t: 'Izgara', d: 'Butun kalamar: zeytinyagi + limon. Izgarada 3-4 dk her yuz.' },
    ],
  },
];

export default function SquidFishing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#08020e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦑 Kalamar Avcilik</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Egi jig teknigi · ekipman · pisirme</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0e0818', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0e0818', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #16102a' : 'none' }}>
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
