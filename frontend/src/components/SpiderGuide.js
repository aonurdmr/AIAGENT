import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'identify', name: 'Tanımlama', icon: '🕷️', accent: '#7c3aed',
    items: [
      { t: 'Kara dul', d: 'Latrodectus tredecimguttatus: kırmızı benekli siyah. Zehirli. Kuru otluk alanlar.' },
      { t: 'Kahverengi hücum', d: 'Loxosceles: küçük, tenha köşe. Isırığı deri nekrozu yapar. Dikkat.' },
      { t: 'Zararsız türler', d: 'Bahçe örümceği (Argiope): büyük, çarpı ağ deseni. Tamamen zararsız.' },
      { t: 'Teşhis kuralı', d: 'Tanımadıkça elleme. Fotoğraf çek, uzaktan gözle. Zehirli az türdür.' },
    ],
  },
  {
    id: 'ecology', name: 'Ekoloji', icon: '🕸️', accent: '#a78bfa',
    items: [
      { t: 'Ağ tipleri', d: 'Tekerlek ağ: Argiope. Huni ağ: zemin. Karmaşık: Latrodectus. Tip ile tanı.' },
      { t: 'Avlanma', d: 'Titreşim algılar: ağa değen böcek. Zehir enjekte, sindirim dışarıda.' },
      { t: 'Biyolojik mücadele', d: 'Doğanın böcek kontrolü. Bahçede örümcek: sağlıklı ekosistem işareti.' },
      { t: 'Mevsim', d: 'Yaz sonu - sonbahar: ağlar dolu, görünür. Soğukta yavaşlar ya da yumurta bırakır.' },
    ],
  },
];

export default function SpiderGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040208', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🕷️ Örümcek Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tanımlama · ekoloji · güvenlik</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#080410', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080410', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #10081a' : 'none' }}>
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
