import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'safety', name: 'Açık Deniz Güvenliği', icon: '⛑️', accent: '#f97316',
    items: [
      { t: 'Can yeleği', d: 'Onaylı PFD, her kişi için. Olumsuz hava — giyilmeli, yanında değil.' },
      { t: 'Epirb', d: 'Acil konum radyobalobu — MRCC Türkiye izler, otomatik sinyal.' },
      { t: 'Telsiz (VHF)', d: 'Kanal 16 her zaman açık. Sahil güvenlik ile haberleşme.' },
      { t: 'Hava tahmini', d: 'Denizcilik tahmin: Navtex ve Denizcilik Genel Müdürlüğü bülteni.' },
      { t: 'Can salı', d: 'Offshore: 12+ saat rotada can salı şart.' },
    ],
  },
  {
    id: 'fishing', name: 'Açık Deniz Balıkçılık', icon: '🎣', accent: '#22c55e',
    items: [
      { t: 'Derin jigging', d: '80-200m — yavaş jig veya deep drop rig. Harnıra, lahoz.' },
      { t: 'Trolling', d: 'Orkinos ve kılıç. Hız 5-8 knot. Büyük yapay yem.' },
      { t: 'Yüzey popperı', d: 'Yüzey sürüsü için. Lüfer ve sarıkuyruk yaz dönemi.' },
      { t: 'Gerçek balık yemi', d: 'Canlı uskumru veya yılan balığı — derin lahoz için en etkili.' },
    ],
  },
  {
    id: 'navigation', name: 'Deniz Navigasyon', icon: '🧭', accent: '#06b6d4',
    items: [
      { t: 'GPS plotter', d: 'Deniz haritası üstünde konum. Her zaman mevcut konum bilgisi.' },
      { t: 'Kağıt harita', d: 'Elektronik çöktüğünde yedek. Pusula ile kullanım bilgisi şart.' },
      { t: 'Seyir ışıkları', d: 'Gece seyrüseferde: kırmızı-sol, yeşil-sağ, beyaz-ön.' },
      { t: 'Demirli tekne', d: 'Dip tipi, koşullara uygun. Kıyıdan güvenli mesafe.' },
    ],
  },
];

export default function HighSeas() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c18', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛵ Açık Deniz Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Güvenlik · balıkçılık · navigasyon</div>
      </div>

      <div style={{ background: '#04101e', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f9730633' }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700 }}>⚠️ AÇIK DENİZ</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Deniz koşulları hızla değişebilir. Deneyimsiz kaptanla açık denize çıkma — hazırlık ve bilgi hayat kurtarır.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#04101e', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#04101e', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081624' : 'none' }}>
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
