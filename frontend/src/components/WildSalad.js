import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'spring', name: 'Ilkbahar Bitkileri', icon: '🌱', accent: '#22c55e',
    items: [
      { t: 'Semizotu', d: 'Portulaca oleracea: kalın yapraklı, Omega-3 zengin. Tarlada ve bahcede.' },
      { t: 'Hardal yapragı', d: 'Brassica: keskin, acımsı. Haşla acısı gider. Zeytinyagı ile.' },
      { t: 'Ebegumeci', d: 'Malva: narin yaprak, mucilaj iceriği. Haşlama veya salata.' },
      { t: 'Kazayagı', d: 'Chenopodium: ıspanak tadı, bölük yaprak. Pilav icine ekle.' },
    ],
  },
  {
    id: 'rules', name: 'Toplama Kurallari', icon: '⚠️', accent: '#f59e0b',
    items: [
      { t: 'Kesin tanıma', d: 'Yuzde 100 emin olmadan alma. Bir kez şüphe duydun mu: birak.' },
      { t: 'Kirlilik kontrolu', d: 'Yol kenari, tarım alani veya fabrika yakinı: toprak ve hava kirliligi.' },
      { t: 'Genç yaprak', d: 'Yas yaprak: daha lezzetli ve az tanen. Sert yaslı yaprak acı olabilir.' },
      { t: 'Miktari sinirla', d: 'Dogadan fazla alma: bir avuc kisisel tuketim icin yeter.' },
    ],
  },
];

export default function WildSalad() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🥗 Yabani Salata Bitkileri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Bitkiler · toplama · güvenlik</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#081208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#081208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #102010' : 'none' }}>
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
