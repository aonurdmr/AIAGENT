import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'prevent', name: 'Önleme', icon: '🐻', accent: '#f59e0b',
    items: [
      { t: 'Kamp hijyeni', d: 'Yiyecek kokunun yayilmasini engelle: tupperware + ayi canta. Cadirdan uzakta.' },
      { t: 'Yemek cocugu', d: 'Asili yiyecek: agaca 4m yuksek, 2m uzak. Ayi eri#351;emez.' },
      { t: 'Sprey tasi', d: 'Bear spray: 7-9 metre menzil, ruzgar yonu kritik. Kolayca ulas&#305;labilir yer.' },
      { t: 'Ses yap', d: 'Ormanda yururken ses cikar: zil veya sesli konusma. Ayiyi korkutmak.' },
    ],
  },
  {
    id: 'encounter', name: 'Karsilasma', icon: '⚠️', accent: '#dc2626',
    items: [
      { t: 'Sakince uzaklas', d: 'Ani hareket etme. Arkani donme. Yavasce geriye git, buyuk gozuk.' },
      { t: 'Boz ayi saldirisi', d: 'Grizly saldirinca yere yat, hareketsiz kal. Olum taklidi etkili.' },
      { t: 'Kara ayi saldirisi', d: 'Black bear saldirinca mukavemet et. Gozune, burnuna vur. Kacma.' },
      { t: 'Ayi spray', d: 'Saldiri aninda sprey: yuzune, 3-5 sn boylu puf. Sert durup vururken.' },
    ],
  },
];

export default function BearSafety() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐻 Ayı Güvenliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Önleme · karşılaşma · spray kullanımı</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#120a00', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#120a00', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1e1400' : 'none' }}>
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
