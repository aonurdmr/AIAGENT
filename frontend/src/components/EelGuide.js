import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'habitat', name: 'Habitat & Davranış', icon: '🌊', accent: '#06b6d4',
    items: [
      { t: 'Yaşam alanı', d: 'Nehir dipleri, taşlı zeminler, bataklık kenarları — karanlık, sakin sular.' },
      { t: 'Gece aktifliği', d: 'Gece avcısı. Gün batımından 2-3 saat sonra en aktif dönem.' },
      { t: 'Kış davranışı', d: 'Soğukta dibe gömülür, yemez. Nisan-Ekim av sezonu.' },
      { t: 'Göç', d: 'Üreme için Sargasso Denizi\'ne gider — yüzlerce km yüzer.' },
    ],
  },
  {
    id: 'methods', name: 'Avlanma Yöntemleri', icon: '🎣', accent: '#f97316',
    items: [
      { t: 'Dip olta', d: 'Ağır kurşun, kısa misina. Akıntılı yerlerde sabahın erken saatleri.' },
      { t: 'Sepet tuzak', d: 'Plastik şişe veya fıçıya yem koy — geceye bırak, sabah al.' },
      { t: 'Taş altı yoklama', d: 'Sığ sularda ellerle taş altı araştırma — deneyim ister.' },
      { t: 'Kanca boyutu', d: 'Küçük kanca: 4-8 numara. Yılan balığı küçük ağzı sever.' },
    ],
  },
  {
    id: 'bait', name: 'Yem & Pişirme', icon: '🍳', accent: '#22c55e',
    items: [
      { t: 'En iyi yem', d: 'Solucan demeti, salyangoz, küçük balık parçası — kuvvetli koku.' },
      { t: 'Temizlik', d: 'Derisi yüzülür: tuz ve kül ile tutun, bıçakla çek.' },
      { t: 'Tütsüleme', d: 'Yılan balığı tütsüde en lezzetli — Orta Avrupa mutfağı.' },
      { t: 'Yasal sınır', d: 'Türkiye: stok azalıyor — yasal sınırları kontrol et, küçükleri bırak.' },
    ],
  },
];

export default function EelGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐍 Yılan Balığı Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Habitat · yöntemler · yem · pişirme</div>
      </div>

      <div style={{ background: '#04161c', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>🐍 YILAN BALIĞI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Anadolu nehirlerinde yaygın — gece avcısı, dipte yaşar. Tütsülenmesi en büyük lezzet.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#04161c', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#04161c', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081c24' : 'none' }}>
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
