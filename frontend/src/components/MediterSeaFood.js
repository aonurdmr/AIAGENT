import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'seafood', name: 'Deniz Ürünleri', icon: '🦞', accent: '#0e7490',
    items: [
      { t: 'İstakoz', d: 'Palinurus elephas: Türkiye güneyi. Zıpkın veya tuzak. Sadece yeterli büyüklükte.' },
      { t: 'Langustine', d: 'Norveç istakozuğu: Ege derinleri. Tekne ile çekilen trol. Küçük boylu.' },
      { t: 'Deniz tarağı', d: 'Pecten jacobaeus: 20-60m derinlik. Dalış ile el ile toplama en iyi.' },
      { t: 'Deniz salyangozu', d: 'Hexaplex trunculus: kaya altı, sığ. Tuzak veya daldır-çek. Yaygın.' },
    ],
  },
  {
    id: 'cook', name: 'Pişirme', icon: '🍽️', accent: '#0284c7',
    items: [
      { t: 'İstakoz ızgara', d: 'Ortadan ikilere böl: sarımsak + zeytinyağı + limon. 8 dk yüksek ateş.' },
      { t: 'Deniz tarağı', d: 'Kabukta fırın: tereyağ, sarımsak, maydanoz. 200°C 10 dk.' },
      { t: 'Salyangoz', d: 'Uzun haşlama: baharatla 45 dk. Veya zeytinyağında sote ile. Taze ot.' },
      { t: 'Tazelik', d: 'Canlı veya çok taze: deniz ürünleri 4 saatten fazla bozulur. Buz zorunlu.' },
    ],
  },
];

export default function MediterSeaFood() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#010810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦞 Akdeniz Deniz Ürünleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ürünler · av · pişirme</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#021828', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#021828', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #032438' : 'none' }}>
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
