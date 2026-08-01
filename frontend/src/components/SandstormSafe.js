import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'signs', name: 'Kum Firtinasi Isaretleri', icon: '🌪️', accent: '#f59e0b',
    items: [
      { t: 'Ani bulutlanma', d: 'Ufukta koyu kahverengi/sari kume. Hizla yaklasan toz duvarı.' },
      { t: 'Ruzgar degisimi', d: 'Sakin havada ani guclu esiş. Koku: toprak ve ozon karışımı.' },
      { t: 'Hayvan davranisi', d: 'Kus ve bocekler ani susuş. Hayvanlar ini ve barınak arar.' },
      { t: 'Elektrik', d: 'Statik elektrik hissi ve kil diplerinde toz girdabı: firtina yaklasıyor.' },
    ],
  },
  {
    id: 'shelter', name: 'Korunma & Barinma', icon: '⛺', accent: '#f97316',
    items: [
      { t: 'Aracta kal', d: 'En iyi korunma: aracin icinde kal. Cam ve havalandirmayı kapat.' },
      { t: 'Tarp kullan', d: 'Tarp ile alt ruzgar yonu gerisine yat. Agzi kapali canta siper.' },
      { t: 'Govdeyi kor', d: 'Her yeri ort: goz, agiz, burun. Deri maruz kalmamali.' },
      { t: 'Alcak durun', d: 'Ayakta durmak tehlikeli. Cukur ya da arazi kabartisi arkasina cek.' },
    ],
  },
  {
    id: 'gear', name: 'Ekipman', icon: '🎒', accent: '#06b6d4',
    items: [
      { t: 'Goggle ve maske', d: 'Sızdırmaz goggle + FFP2 maske. Kum akcigerler icin ciddi risk.' },
      { t: 'Kiyafet', d: 'Uzun kollu, hafif, siki dokumali kumas. Yuz ortusu veya bufb.' },
      { t: 'Su & ilas', d: 'Kapalı kapla su. Kuru goz damlasi. Iltihap ve alerji ilaci.' },
      { t: 'GPS ve pusala', d: 'Toz gorustunu sifirlar. GPS bitti hazir ol. Pusala mecburi.' },
    ],
  },
];

export default function SandstormSafe() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0e0800', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌪️ Kum Firtinasi Guvenlik</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Isaretler · korunma · ekipman</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#1a1000', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1a1000', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #2a1c00' : 'none' }}>
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
