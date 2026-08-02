import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'plants', name: 'Bitkiler', icon: '🌿', accent: '#22c55e',
    items: [
      { t: 'Kekik', d: 'Thymus: kayalik ve yaric zemin. Antimikrobiyal, yemek ici, cay olarak.' },
      { t: 'Adacayi', d: 'Salvia officinalis: guney yamaclarda. Balgam soke, bogaz agrisi, koku.' },
      { t: 'Papatya', d: 'Matricaria: mera ve tarla kenarlari. Sakinlestirici, anti-iltihap cay.' },
      { t: 'Kus otu', d: 'Hypericum perforatum: sari cicek, yabani. Ruh hali destekleyici.' },
    ],
  },
  {
    id: 'use', name: 'Kullanim', icon: '🫖', accent: '#f59e0b',
    items: [
      { t: 'Cay yapimi', d: 'Taze bitki: 1 cay kasigi yaprak + 200ml kaynamis su, 5 dk demleme.' },
      { t: 'Toplamak', d: 'Cicek acilinca en guclu etki. Sabah topla: ciy gecince, gunes gelmeden.' },
      { t: 'Kurulama', d: 'Golge ve havadar yer: 1 hafta. Dogrudan gunes etkin maddeyi bozar.' },
      { t: 'Uyari', d: 'Emin olmadigin bitkiyi kullanma. Bazi tibbi bitkiler baska turlerle karisir.' },
    ],
  },
];

export default function MountainHerbalism() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Dağ Bitkileri Kullanımı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Bitkiler · toplama · kullanım</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#06140a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#06140a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0c2014' : 'none' }}>
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
