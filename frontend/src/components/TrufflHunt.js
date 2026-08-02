import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'find', name: 'Bulma', icon: '🍄', accent: '#d97706',
    items: [
      { t: 'Türkiye trüfü', d: 'Terfezia ve Tirmania: Trakya ve İç Anadolu kumullarında. Mart-Nisan.' },
      { t: 'Karatrüf', d: 'Tuber melanosporum: meşe kökü ortaklığı. Yüksek değer. Nadir, bilinen lokasyon.' },
      { t: 'Koku takibi', d: 'Domuz veya köpekle bulunur. Eğitimli köpek vazgeçilmez. Kum kabaran yer.' },
      { t: 'Mevsim', d: 'Kış-ilkbahar: soğuk ama donmayan toprak. Yağış sonrası 2-3 hafta içinde.' },
    ],
  },
  {
    id: 'cook', name: 'Kullanım', icon: '🍳', accent: '#a16207',
    items: [
      { t: 'Saklama', d: 'Taze trüf: 5 günden fazla değil. Pirinç içine sar: enerji çeker. Buzluk 3 ay.' },
      { t: 'Yumurta', d: 'Trüf + yumurta: birlikte 24 saat bırak, koku geçer. Sade scrambled egg.' },
      { t: 'Yağ', d: 'Zeytinyağına rendele: 2 hafta beklet. Makarna ve risotto için.' },
      { t: 'Rendeleme', d: 'Daima çiğ rendele servis üzerine. Isı aromasını uçurur.' },
    ],
  },
];

export default function TrufflHunt() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍄 Trüf Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Bulma · mevsim · kullanım</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0e0c00', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0e0c00', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1a1a00' : 'none' }}>
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
