import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  clean: {
    title: 'Temizleme',
    items: [
      { icon: '🔪', t: 'Temizleme', d: 'Balik tutunca hemen temizle: karin kesimi, ic organlar, kirec kasesi.' },
      { icon: '💧', t: 'Durulama', d: 'Soguk akan su ile yika: kan ve ic organ kalintisi kalmamali.' },
      { icon: '🧊', t: 'Soguk zincir', d: 'Temizleme sonrasi buzlu suya: et sertlesmesi ve tat muhafazasi.' },
      { icon: '🐟', t: 'Fileto', d: 'Omurga boyunca kesim: iki fileto cikar, deri istenirse birakabilir.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Izgara', d: 'Alevli kor: taze alabalik 4-5 dk her yuz. Limon + dereotu + tuz.' },
      { icon: '🏕️', t: 'Kamp folyo', d: 'Folyo + zeytinyagi + sarımsak: koru ustunde 10-12 dk. Nefis kamp yemegi.' },
      { icon: '🫙', t: 'Tava', d: 'Demir tava: tere yagi kizinca alabalik. Deri altta, cevir, 2 dk.' },
      { icon: '🌿', t: 'Ot dolmasi', d: 'Karin bosluğuna maydanoz, nane, limon: buharda veya folyoda pisir.' },
    ],
  },
};

export default function TroutCooking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('clean');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c08', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Alabalık Pişirme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Temizleme · pişirme · kamp tarifleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#16a34a' : '#04140c', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04140c', borderRadius: 14, padding: 14, border: '1px solid #16a34a33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081e14' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
