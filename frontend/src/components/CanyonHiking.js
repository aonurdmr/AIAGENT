import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'safety', name: 'Güvenlik', icon: '🚨', accent: '#f97316',
    items: [
      { t: 'Flash flood', d: 'En buyuk tehlike: uzaktaki yagmur aniden sel getirir. Hava takibi zorunlu.' },
      { t: 'Sicaklık', d: 'Kanyon isi tutar. Yeterli su: saatte yarım litre minimum. Tuz tabletleri.' },
      { t: 'Dar gecitler', d: 'Dar gecitlerde sıkışma riski: kıyafet ve ağırlık bilincini koru.' },
      { t: 'Iletisim', d: 'GSM kanyonda cekmiyor. Uydu mesajlaşıcı veya whistle ve rota planı birak.' },
    ],
  },
  {
    id: 'gear', name: 'Ekipman', icon: '🎒', accent: '#f59e0b',
    items: [
      { t: 'Neopren', d: 'Su gecitleri icin neopren shorty veya waders. Soguk su + soguk kanal.' },
      { t: 'Harness', d: 'Kısa rapel veya inis varsa harness. Belay aygıtı ve iple.' },
      { t: 'Neoprene bot', d: 'Kaygan kaya ve su kombinasyonu: felt tabanlı neopren bot.' },
      { t: 'Waterproof cant', d: 'Kamera ve telefon su gecirmez bölme ya da dry bag icinde.' },
    ],
  },
];

export default function CanyonHiking() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏔️ Kanyon Yürüyüşü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Güvenlik · sel riski · ekipman</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#120800', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#120800', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1c1000' : 'none' }}>
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
