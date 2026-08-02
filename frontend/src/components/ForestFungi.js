import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'edible', name: 'Yenilebilir', icon: '🍄', accent: '#d97706',
    items: [
      { t: 'Porcini (Cep)', d: 'Boletus edulis: kahve şapka, beyaz et. Sonbahar ormanlarında. Kesin teşhis gerekir.' },
      { t: 'Chanterelle', d: 'Cantharellus cibarius: sarı, huni şekli. Yapraksız ormanda. Tatlı koku.' },
      { t: 'Sığır dili', d: 'Fistulina hepatica: meşe gövdesi, kırmızı et, katmanlı. Pişirmeden kesilir.' },
      { t: 'Kestane mantarı', d: 'Lactarius deliciosus: turuncu lateks. Çam ormanında. Acı tadı hafif pişirir.' },
    ],
  },
  {
    id: 'toxic', name: 'Zehirli', icon: '☠️', accent: '#dc2626',
    items: [
      { t: 'Ölüm şapkası', d: 'Amanita phalloides: yeşil şapka, halka ve kılıf. Öldürücü. Kesinlikle yeme.' },
      { t: 'Sinir mantarı', d: 'Amanita muscaria: kırmızı beyaz benekli. Halüsinojenik. Yeme.' },
      { t: 'Cortinarius', d: 'Web-örgü mantarları: böbrek yetmezliği. Teşhis güç, uzman gerekar.' },
      { t: 'Kural', d: 'Şüphe varsa toplama. Rehber olmadan denemek ölümcül. Fotoğrafla doğrulat.' },
    ],
  },
];

export default function ForestFungi() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍄 Orman Mantarları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yenilebilir · zehirli · teşhis</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#100800', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100800', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1a1000' : 'none' }}>
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
