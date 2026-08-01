import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 'shelter', name: 'Barınak', icon: '⛺', accent: '#06b6d4', totalWeight: '1.2-2.5 kg',
    items: [
      { item: 'Çadır (3 mevsim)', weight: '1.2-1.8 kg', note: 'Su geçirmez 3000mm+ hidrostatik yük' },
      { item: 'Uyku Tulumu', weight: '600g-1.2 kg', note: 'Tüy: hafif, soğuk. Sentetik: ıslak dayanıklı' },
      { item: 'Uyku Matı', weight: '200-600g', note: 'R-value 2-4: yaz-ilkbahar. 4+: kış' },
      { item: 'Tarp/Bivel', weight: '200-400g', note: 'Alternatif — çadırsız hafifletme' },
    ],
  },
  {
    id: 'clothing', name: 'Giysi Sistemi', icon: '🧥', accent: '#22c55e', totalWeight: '1-2 kg',
    items: [
      { item: 'Merino Yün İçlik', weight: '200-300g', note: 'Ter-koku yönetimi — 2-3 gün kullanılabilir' },
      { item: 'Fleece Orta Katman', weight: '300-500g', note: 'Isı yalıtımı — nemde çalışır' },
      { item: 'Shell Dış Katman', weight: '300-600g', note: 'Su + rüzgar geçirmez — Gore-Tex veya muadili' },
      { item: 'Yedek Çorap (x3)', weight: '150g', note: 'Nem ve yara önleme' },
    ],
  },
  {
    id: 'food', name: 'Su & Beslenme', icon: '💧', accent: '#f59e0b', totalWeight: '500g/gün',
    items: [
      { item: 'Su Filtresi', weight: '57g', note: 'Sawyer Squeeze — doğrudan kaynaktan iç' },
      { item: 'Liyofilize Yemek', weight: '100g/öğün', note: '500 cal · sadece sıcak su ekle' },
      { item: 'Akıllı Fener & Ocak', weight: '400g', note: 'BRS-3000T: 25g — inanılmaz hafif gaz ocak' },
      { item: 'Titanyum Kap', weight: '80-120g', note: 'Pişirme + kap yerine — hafif' },
    ],
  },
  {
    id: 'navigation', name: 'Navigasyon & Acil', icon: '🧭', accent: '#ef4444', totalWeight: '400g',
    items: [
      { item: 'GPS veya Akıllı Saat', weight: '50-150g', note: 'Offline harita şart — Garmin Fenix veya Instinct' },
      { item: 'Uydu Mesaj Cihazı', weight: '100-150g', note: 'Garmin inReach — acilde hayat kurtarır' },
      { item: 'İlk Yardım Kiti', weight: '150-200g', note: 'Sargı, yara bandı, ağrı kesici, sarmal bandaj' },
      { item: 'Baş Feneri', weight: '80g', note: 'Spare pil ile — gece şart' },
    ],
  },
];

export default function BackpackGear() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060808', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎒 Sırt Çantası Ekipmanı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Barınak · giysi · su & yemek · navigasyon — hafif yürüyüş</div>
      </div>

      <div style={{ background: '#0e1408', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>⚖️ HEDEF AĞIRLIK</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>3 günlük yürüyüş: 7-10 kg hedef. 10 kg üzeri vücut ağrısı + yavaşlama. Her gram sayılır.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {CATEGORIES.map(cat => {
          const open = sel === cat.id;
          return (
            <div key={cat.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : cat.id)} style={{
                background: '#0c1010', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${cat.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{cat.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{cat.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>Toplam: {cat.totalWeight}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c1010', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${cat.accent}33`, borderTop: 'none' }}>
                  {cat.items.map((it, i) => (
                    <div key={i} style={{ marginTop: 10, padding: '8px 10px', background: cat.accent + '10', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: cat.accent }}>{it.item}</div>
                        <div style={{ fontSize: 11, color: '#9ca3af' }}>{it.weight}</div>
                      </div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 1 }}>{it.note}</div>
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
