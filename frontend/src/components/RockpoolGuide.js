import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'life', name: 'Kayalik Havuz Canlilari', icon: '🌊', accent: '#06b6d4',
    items: [
      { t: 'Deniz yildizi', d: 'Kaya oyuklari ve alt yuzey. Beslenme: midye ve istiridye. Renkli ama yavaş.' },
      { t: 'Ahtapot', d: 'Kuçuk bireyleri kayalik catlak ve deliklerde. Renk degisimi izlemek icin ideal.' },
      { t: 'Kaya baliklari', d: 'Blenny, goby: sıg ve durgun suda. Kayalarda renk uyumlu bekleme.' },
      { t: 'Karides ve yengeç', d: 'Kaya atik ve yosun altında. El eline ustunde aramak yerine yavaşça tarp kaldır.' },
    ],
  },
  {
    id: 'observe', name: 'Gozlem Teknikleri', icon: '🔍', accent: '#a78bfa',
    items: [
      { t: 'Sabah erken', d: 'Dusuk gelgit subahları: en zengin havuzlar aciga cikar.' },
      { t: 'Yavaş hareket', d: 'Kayalıkta ani hareket her canlıyı kaçırır. Sürünmek gibi yavaş yürü.' },
      { t: 'Polarize gozluk', d: 'Su yansımasını keser. Derinlerdeki canlıları net gorutur.' },
      { t: 'Dondurmadan bak', d: 'Canlıları kaldırırsan geri koy. Kayaları devirmek habitat bozar.' },
    ],
  },
];

export default function RockpoolGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Kayalık Havuz Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Canlılar · gözlem teknikleri · etik</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#041018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
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
