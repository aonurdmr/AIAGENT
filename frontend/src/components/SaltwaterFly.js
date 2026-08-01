import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'gear', name: 'Ekipman', icon: '🎣', accent: '#06b6d4',
    items: [
      { t: 'Olta', d: '8-10 numara sınıfı. Tuzlu su için paslanmaz rulmanlı makara.' },
      { t: 'Misina', d: 'Sinking veya floating tip tuzlu su için. WF (weight forward) yükü.' },
      { t: 'Lider', d: 'Florokarbon 20-40lb. Tuzlu su balıkları daha büyük, daha güçlü.' },
      { t: 'Sinek modelleri', d: 'Clouser minnow, Deceiver, Crab pattern: levrek ve çipura için.' },
      { t: 'Giysi', d: 'UV koruyucu gömlek. Polarize gözlük: sığ suda balık görünmesi için.' },
    ],
  },
  {
    id: 'targets', name: 'Hedef Türler', icon: '🐟', accent: '#22c55e',
    items: [
      { t: 'Levrek (Lüfer)', d: 'Koy ve lagün. Sabah erken. Chlooser minnow yüzeye çek.' },
      { t: 'Çipura', d: 'Sığ su kum dip. Yengeç taklit. Alçak gelgit — tarama alanı.' },
      { t: 'İzmarit', d: 'Molo ve iskele. Küçük tüysüz nymph. Çok güzel savaş.' },
      { t: 'Kefal', d: 'Yüzeyde beslenen. Kıl gibi ince lider. Algae sinek taklit.' },
    ],
  },
  {
    id: 'technique', name: 'Teknik', icon: '🌊', accent: '#f97316',
    items: [
      { t: 'Gelgit atış', d: 'Sığ su: yükselen tide, balık içeriye döner. Zamanla at.' },
      { t: 'Strip tekniği', d: 'Sık kısa çekiş canlı yaralı balık taklit eder.' },
      { t: 'Rüzgar atışı', d: 'Tuzlu su: güçlü rüzgar — haul ile güç kazanmak şart.' },
      { t: 'Sight fishing', d: 'Polarize gözlükle sığ suda balık gör, dön, at.' },
    ],
  },
];

export default function SaltwaterFly() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Tuzlu Su Sinek Casting</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekipman · hedef türler · teknikler</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#040e18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#040e18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081420' : 'none' }}>
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
