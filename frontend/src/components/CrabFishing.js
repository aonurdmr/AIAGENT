import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'methods', name: 'Avlanma Yontemleri', icon: '🦀', accent: '#f97316',
    items: [
      { t: 'Sepet tuzagi', d: 'Kafes sepet: yem ici koy, geceye birak. Istiridye veya balik basi.' },
      { t: 'El ile toplama', d: 'Dusuk gelgit: kayalarda gogus gore toplama. Kalın eldiven şart.' },
      { t: 'Tutam teli', d: 'Tele yem bag, suya birak. Yengec gelince yavasce yukari cek.' },
      { t: 'Dal kancasi', d: 'Uzun dal + kanca. Sazlik ve dikey kayalarda uzaktan yakalama.' },
    ],
  },
  {
    id: 'species', name: 'Yengec Turleri', icon: '🌊', accent: '#06b6d4',
    items: [
      { t: 'Mavi yengec', d: 'Marmara ve Karadeniz. Lezzetli, buyuk. Yaz aylarinda bol.' },
      { t: 'Granser yengec', d: 'Geniş kabuğu. Kayalik kiyilarda. Kabuğu kalın — sert capul.' },
      { t: 'Spinosus', d: 'Uzun dikenleri kabukta. Orta Akdeniz. Derinde bulunur.' },
      { t: 'Koca yengec', d: 'Kahverengi, buyuk. Derin su ve kayalik zemin. Hasara dayanikli.' },
    ],
  },
  {
    id: 'cook', name: 'Haslama & Pisirme', icon: '🍳', accent: '#22c55e',
    items: [
      { t: 'Haslama', d: 'Kayar suda tuz + defne + karabiber. Canliya 15-20 dk hasla.' },
      { t: 'Izgara', d: 'Kavkiyi ac, icini temizle, kizgın izgaraya koy 5-8 dk.' },
      { t: 'Tereyagli', d: 'Eriyen tereyag + sarimsak + maydanoz. Klasik Ege tarifesi.' },
      { t: 'Taze tuzlanmis', d: 'Cig mavi yengec: tuz ve limon. Dogu Karadeniz gelenegi.' },
    ],
  },
];

export default function CrabFishing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦀 Yengec Avcilik</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yontemler · turler · haslama ve pisirme</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#04121a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#04121a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081c2a' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>{item.t}</div>
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
