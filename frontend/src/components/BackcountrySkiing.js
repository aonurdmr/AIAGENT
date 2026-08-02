import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'gear', name: 'Ekipman', icon: '⛷️', accent: '#60a5fa',
    items: [
      { t: 'Kayak secimi', d: 'Genis paten, rocker profil. Karda batmaz, agir karda manuvra. 90-110mm.' },
      { t: 'Bota baginlar', d: 'AT veya Freeride bagi. Hem yukari cikis (serbest topuk) hem inis modu.' },
      { t: 'Tırmanma deri', d: 'Mohair veya naylon deri. Kayak altına yapıştır, kayma engeller.' },
      { t: 'Lawina guvenlik', d: 'Lawina transiver + kazma + ayaklık. Her grup uyesi tasiyor olmali.' },
    ],
  },
  {
    id: 'ascent', name: 'Tirmanis & Yurus', icon: '⬆️', accent: '#a78bfa',
    items: [
      { t: 'Zig-zag hat', d: 'Dik yamacta dogrusal degil: sag-sol serpantin. Enerji koruması.' },
      { t: 'Tempo koruma', d: 'Solunum kontrol: nefes aciliyor ise dusakla. Asla yetisme yarisi yok.' },
      { t: 'Sirt cantasi', d: '20-30 lt. Lawina guvenlik, yedek tabaka, su, atistirmalik. Hafif tut.' },
      { t: 'Kalkma noktası', d: 'Platoya veya sırtı gec. Uzun yamaclarda ara mola ver.' },
    ],
  },
  {
    id: 'safety', name: 'Guvenlik', icon: '🚨', accent: '#f97316',
    items: [
      { t: 'Lawina riski', d: '30-45 derece yamac en tehlikeli. Soguk havada + yeni kar = yuksek risk.' },
      { t: 'Grup kurali', d: 'Teker teker inin. Diger grup emniyete ulasana kadar dur.' },
      { t: 'Hava kontrolu', d: 'Baslangicta hava tahminini oku. Firtina yaklasırsa erken don.' },
      { t: 'Iletisim', d: 'Uydu mesajlasici veya PLB cihazı. GSM sinyal olmayabilir.' },
    ],
  },
];

export default function BackcountrySkiing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛷️ Arazi Kayakçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekipman · tırmanış · lawina güvenliği</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0c1020', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c1020', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #10142a' : 'none' }}>
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
