import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'zones', name: 'Göl Bölgeleri', icon: '🌊', accent: '#06b6d4',
    items: [
      { t: 'Kıyı (littoral)', d: 'Sığ, ışıklı, bitki yoğun. Sazan, levrek, yılan balığı.' },
      { t: 'Açık su (pelagik)', d: 'Orta su. Yüzücü balıklar. Rüzgara açık termal dönüşüm.' },
      { t: 'Dip (bentik)', d: 'Oksijensiz dip. Yılan balığı ve sazan kış dinlenmesi.' },
      { t: 'Ötrofikasyon', d: 'Alg patlaması — besin fazlası. Balıkçılığa zarar.' },
      { t: 'Termoklin', d: 'Yaz: sıcak-soğuk su katmanları arasında balık hareketsizleşir.' },
    ],
  },
  {
    id: 'species', name: 'Göl Balıkları', icon: '🐟', accent: '#22c55e',
    items: [
      { t: 'Sazan', d: 'Kıyı çamur dip. Yem: mısır, fıstık ezmesi, boile.' },
      { t: 'Turna', d: 'Bitki arasında pusu. Yapay yem minnow etkili.' },
      { t: 'Levrek (Tatlısu)', d: 'Grubik av. Spinner ve jig. Yaz akşamları zirve.' },
      { t: 'Yayın Balığı', d: 'Büyük, gece aktif, dip yem. Gürültü ve titreşim hisseder.' },
      { t: 'Çipura (Tatlısu)', d: 'Besin zinciri dengesi. Küçük örnekler bırakılmalı.' },
    ],
  },
  {
    id: 'seasons', name: 'Mevsimsel Davranış', icon: '📅', accent: '#f97316',
    items: [
      { t: 'İlkbahar', d: 'Yumurtlama — kıyıya yaklaşır. En aktif av dönemi.' },
      { t: 'Yaz', d: 'Termoklin oluşur. Sabah-akşam aktif, öğlen derine çekilir.' },
      { t: 'Sonbahar', d: 'Yemlenme zirvesi. Kış öncesi yağ deposu. İyi av.' },
      { t: 'Kış', d: 'Dibe inme. Buz altı balıkçılık. Yem hareketi yavaş olmalı.' },
    ],
  },
];

export default function LakeEcology() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Göl Ekolojisi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Göl bölgeleri · balık türleri · mevsimsel davranış</div>
      </div>

      <div style={{ background: '#030e14', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>🌊 GÖLLER</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye 200 000+ doğal ve yapay göl. Her göl ekosistemi kendine özgü — yerel bilgi şart.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#030e14', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#030e14', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #07141a' : 'none' }}>
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
