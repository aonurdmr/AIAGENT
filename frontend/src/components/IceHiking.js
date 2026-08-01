import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'gear', name: 'Ekipman', icon: '🥾', accent: '#60a5fa',
    items: [
      { t: 'Krampon', d: 'Buzlu yol icin: en az 6 dis. Kar sıkıştırınca tutunma saglar.' },
      { t: 'Buz kazması', d: 'Yokuş buzlu yerde: buzga saplama ve frenleme. Temel guvenlik aleti.' },
      { t: 'Kiyafet', d: 'Katman sistemi: termal ic, polar orta, su gecirmez dis. Pamuk yok.' },
      { t: 'Gunes gozlugu', d: 'Kar koru: %99+ UV filtreli. Kar kornee yanigı cok aci.' },
    ],
  },
  {
    id: 'safety', name: 'Guvenlik', icon: '⚠️', accent: '#f59e0b',
    items: [
      { t: 'Buz test', d: 'Buz kalinligi: 10cm 1 kisi, 15cm kucuk grup. Kiskacla test et.' },
      { t: 'Catlak ses', d: 'Catlama veya sisi sesi: hemen geri don. Yuk dag.' },
      { t: 'Buz altı', d: 'Buz kirsa: yanlamasina uzanarak cik. Panikleme, sakinlikle hareket et.' },
      { t: 'Haber ver', d: 'Buz uruyusunu biri bilsin. Acil iletisim numarasi ve donu.' },
    ],
  },
];

export default function IceHiking() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧊 Buz Yürüyüşü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekipman · güvenlik · buz testi</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#06101a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#06101a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0c1c28' : 'none' }}>
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
