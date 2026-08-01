import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'edible', name: 'Yenilebilir', icon: '🫐', accent: '#7c3aed',
    items: [
      { t: 'Yabanmersini', d: 'Vaccinium: dağ ve orman; kucuk, lacivert. Antioksidan ve lezzetli.' },
      { t: 'Ahududu', d: 'Rubus idaeus: orman kenari ve tahrip alani. Kirmızı, meyveli.' },
      { t: 'Dut', d: 'Morus: koyu mor-siyah meyve. Haziran-Temmuz. Yol kenari ve bahce.' },
      { t: 'Alıç', d: 'Crataegus: kis kirmizi meyvesi. Cay ve receli yapilir. Kalp destegi.' },
    ],
  },
  {
    id: 'toxic', name: 'Zehirli', icon: '☠️', accent: '#dc2626',
    items: [
      { t: 'Muhabbet kusu', d: 'Solanum nigrum: siyah kucuk meyve. Cig zehirli, pisince hafif toksik.' },
      { t: 'Patlican çilek', d: 'Solanum dulcamara: kirmizi yuvarlak, kum saati sekli. Zehirli.' },
      { t: 'Misket limonu', d: 'Daphne: pembe-kirmizi, parcalar halinde. Cok toksik, yutma yok.' },
      { t: 'Altin kural', d: 'Parlak kirmizi meyve: dikkatli ol. Emin degilsen yeme. Kitap ve uzman.' },
    ],
  },
];

export default function WildBerries() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040208', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🫐 Yabani Meyveler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yenilebilir · zehirli · tanıma</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0c0618', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c0618', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #180e28' : 'none' }}>
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
