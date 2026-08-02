import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'gear', name: 'Ekipman', icon: '🤿', accent: '#0ea5e9',
    items: [
      { t: 'Üçlü yedek', d: 'Mağara dalışı: her şey üçlü. 3 fener, 3 gaz kaynağı. Yedeksiz girme.' },
      { t: 'Kılavuz ipi', d: 'Reel ve ip: çıkış yolu. İpten asla ayrılma. Görüş sıfıra düşebilir.' },
      { t: 'Gaz planı', d: 'Kural: 1/3 giriş, 1/3 çıkış, 1/3 acil. Mağarada yüzey yok.' },
      { t: 'Drysuit', d: 'Türkiye yeraltı suları: yıl boyu 12-14°C. Wetsuit 5mm yetmez.' },
    ],
  },
  {
    id: 'sites', name: 'Noktalar', icon: '🏊', accent: '#38bdf8',
    items: [
      { t: 'Düden mağaraları', d: 'Antalya: Düden kaynağı dalışı. Özel izin ve sertifika gerekli.' },
      { t: 'Altınbeşik', d: 'Alanya: tekne ile giriş, iç gölcük. Yüzücü düzeyi giriş bölümü mevcut.' },
      { t: 'Burdur Gölü', d: 'Termal bölgeler. Tuzlu-tatlı su geçişi: halocline etkisi.' },
      { t: 'Kaynak noktaları', d: 'Ege kıyısı: sualtı kaynaklar. Akıntı güçlü, teknik seviye zorunlu.' },
    ],
  },
];

export default function CaveDiving() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#010810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏊 Mağara Dalışı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekipman · güvenlik · noktalar</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#021828', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#021828', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #032038' : 'none' }}>
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
