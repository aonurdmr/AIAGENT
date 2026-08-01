import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'spring', name: 'Ilkbahar Cicekleri', icon: '🌸', accent: '#ec4899',
    items: [
      { t: 'Lale', d: 'Tulipa: bahar sembolü. Dogu Turkiye yaylalarinda yabani lale gorulur. Nesli tehlikede.' },
      { t: 'Gelincik', d: 'Papaver: kirmizi tarla cicegi. Tahil alanlari ve yol kenarı. Cok yaygin.' },
      { t: 'Siklamen', d: 'Cyclamen coum: orman altı. Pembe-mor, geri katlanmis yaprak. Dogu Akdeniz.' },
      { t: 'Mor cicekli adacay', d: 'Salvia: Anadolu adacayı. Mor dis bükey cicekler. Saglikli koku.' },
    ],
  },
  {
    id: 'summer', name: 'Yaz Cicekleri', icon: '🌻', accent: '#f59e0b',
    items: [
      { t: 'Ayçiçeği', d: 'Helianthus: tarla ve koy kenari yaygin. Gunes takip eder. Trakya ve Marmara.' },
      { t: 'Kekik cicegi', d: 'Thymus: kucuk beyaz-mor. Kaya ve step ortami. Yaz sonunda çicer.' },
      { t: 'Asphodel', d: 'Asphodelus: uzun dik sap, beyaz cicek. Akdeniz ve kiyi stepleri.' },
      { t: 'Degirmenci cicegi', d: 'Centaurea: mavi-mor. Uzun sapli, parlak. Tarlalar ve yol kenarları.' },
    ],
  },
];

export default function WildFlowerID() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080208', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌸 Yabani Çiçek Tanıma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İlkbahar · yaz · alan türleri</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#100810', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100810', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #180c18' : 'none' }}>
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
