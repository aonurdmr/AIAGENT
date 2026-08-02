import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'gear', name: 'Ekipman', icon: '🏹', accent: '#f59e0b',
    items: [
      { t: 'Yay tipi', d: 'Compound: guclu ve hassas. Recurve: geleneksel, spor. Longbow: saflık.' },
      { t: 'Ok secimi', d: 'Karbon ok: hafif ve hizlı. Kambur ok: dayanikli. Agirlik ve uzunluk boya gore.' },
      { t: 'Uc tipi', d: 'Genis uc (broadhead) av icin. Sabit veya mekanik ackilan kanat tercihi.' },
      { t: 'Mesafe olcumleme', d: 'Rangefinder zorunlu. Goz kestirmek ok mesafesini yaniltır.' },
    ],
  },
  {
    id: 'technique', name: 'Teknik & Taktik', icon: '🎯', accent: '#f97316',
    items: [
      { t: 'Germe durusu', d: 'Her seferinde aynı duruş. Omuz ve dirsek gerisi hattan cekme.' },
      { t: 'Nisan', d: 'Hayvanın en buyuk hedef noktası: arkasında kurek kemigi icin nisan al.' },
      { t: 'Mesafe avantajı', d: 'Yay avı: max 40 metre. Uzaktan atis hayvana zarar verir, kesmez.' },
      { t: 'Gizlilik', d: 'Ses avantajı: yay tüfekten sessiz. Fakat koku yönetimi yine de şart.' },
    ],
  },
];

export default function BowHunting() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏹 Yay Avcılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yay türleri · teknik · taktikler</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#100e00', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100e00', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1c1a00' : 'none' }}>
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
