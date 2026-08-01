import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'safety', name: 'Güvenlik', icon: '🦺', accent: '#f59e0b',
    items: [
      { t: 'Uc kural', d: '3 ışık kaynağı (ana, yedek, acil). Birine konum bil. Grup halinde giril.' },
      { t: 'Ekipman', d: 'Kask zorunlu: tavan alçalabilir. Diz ve dirsek koru. Lambalar batarya kontrol.' },
      { t: 'Hava testi', d: 'Derin magara: CO2 birikimi. Mum alev alçalirsa geri don. Derin inis uzman.' },
      { t: 'Kaya durumu', d: 'Islak magara kayali: turmak hatayla iner. Eller ve ayaklar test et onceden.' },
    ],
  },
  {
    id: 'nature', name: 'Doğa', icon: '🦇', accent: '#8b5cf6',
    items: [
      { t: 'Stalagmit', d: 'Yerden yukan: binlerce yil milyonlarca damla kalsiyum birikmesi.' },
      { t: 'Stalaktit', d: 'Tavandan asagi: aynı calisma prensibı, su yukan suruklenmesi ile.' },
      { t: 'Yarasalar', d: 'Kisa sessiz: yarasalar uyuyabilir. Isik tutma, yaklas&#305;ama, takintiyi bozma.' },
      { t: 'Magara balikları', d: 'Karanlik magara golu: kor balik turu bulunabilir. Dokunmadan gozlemle.' },
    ],
  },
];

export default function CaveExploring() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040208', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🕳️ Mağara Keşfi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Güvenlik · doğa · ekipman</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0c081a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c081a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #181026' : 'none' }}>
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
