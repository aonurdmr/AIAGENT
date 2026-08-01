import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'shelter', name: 'Barınak', icon: '⛺', accent: '#60a5fa',
    items: [
      { t: 'Dört mevsim cadır', d: '4 mevsim cadır: kar yuku tasir, fırtına direnci yuksek. Geodezik yapı tercih.' },
      { t: 'Yer secimi', d: 'Kar yagisi bekliyorsa ruzgar altına al, agac alti kacin (kar yuku). Cevre koruma.' },
      { t: 'Uyku tulumu', d: '-15C veya daha soguga uygun. Tuy dolgu, nem yonetimi kritik. Mumlu bag.' },
      { t: 'Isi yalitim', d: 'Zemin soguk emer: R-5 ustu mat zorunlu. Sisman mat veya hava yatagı, ust uste.' },
    ],
  },
  {
    id: 'survival', name: 'Hayatta Kalma', icon: '🔥', accent: '#f97316',
    items: [
      { t: 'Isi yonetimi', d: 'Sogukta ter: olumcul. Katman sistemi: icten dısa nefes alan, yalıtan, koruyan.' },
      { t: 'Su teminati', d: 'Kar eritme: 1L kar = ~0.1L su. Yakıt tuketimi yuksek. Termos ile sicak tut.' },
      { t: 'Donma belirtileri', d: 'Titreme durdu mu: tehlike! Uyusma, renk degisimi: hemen sicaga git.' },
      { t: 'Kaza plani', d: 'Biri daima haberdar olsun. GPS konumunu paylasın. Acil bivak canta her zaman.' },
    ],
  },
];

export default function WinterCamping() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#02060e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>❄️ Kış Kampçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Barınak · ısı yönetimi · hayatta kalma</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#060e1a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#060e1a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0c1828' : 'none' }}>
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
