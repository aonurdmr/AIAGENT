import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PLANTS = [
  {
    id: 'nilufar', name: 'Nilüfer (Su Zambağı)', scientific: 'Nymphaea alba', icon: '🪷', accent: '#ec4899',
    desc: 'Türkiye\'nin en güzel su bitkisi. Durgun ve yavaş akan sularda yüzen büyük beyaz çiçekler.',
    habitat: 'Göller, bataklıklar, durgun nehir kolları · 0.5-3 m derinlik',
    bloom: 'Haziran–Ağustos',
    fishValue: 'Levrek ve sazan nilüfer altında saklanır. Yaz öğle avında gölge alanlar birincil hedef.',
    ecology: 'Su kuşlarının yuvası, balıkların yumurtlama alanı. Koruma altında bazı bölgelerde.',
    status: '⚠️ Koparma yasak — fotoğraf çek bırak',
  },
  {
    id: 'kamis', name: 'Kamış / Saz', scientific: 'Phragmites australis', icon: '🌾', accent: '#22c55e',
    desc: 'Türkiye\'nin sulak alanlarında en yaygın bitki. Balık için kritik habitat ve yuvalama alanı.',
    habitat: 'Göl kıyısı, bataklık, nehir kenarı · su yüzeyine yakın',
    bloom: 'Temmuz–Eylül (püskül açar)',
    fishValue: 'Saz içinde levrek, yayın ve turna saklanır. Kamış kenarından atış yapılırsa avantajlı.',
    ecology: 'Balıkçıl, sakarmeke gibi su kuşlarının yuvası. Su filtreleme işlevi yüksek.',
    status: '✅ Yaygın — doğal habitat olarak koruma önerilir',
  },
  {
    id: 'su_mercimek', name: 'Su Mercimeği', scientific: 'Lemna minor', icon: '🟢', accent: '#84cc16',
    desc: 'Yüzen küçük yeşil levhacıklar. Durgun su yüzeyini kaplar. Balık aktivitesini gösteren gösterge tür.',
    habitat: 'Tamamen durgun su — gölet, küçük göl koyları, sulak alan',
    bloom: 'Çok nadir çiçek açar — vejetatif üreme',
    fishValue: 'Su mercimeği altında oksijen yüksek değil. Sazan ve yayın ara sıra yüzer ama ana yaşam alanı değil.',
    ecology: 'Suda fazla azot göstergesi. Ördek başlıca gıdası.',
    status: '✅ Yaygın — ama aşırı büyümesi ötrofikasyon işareti',
  },
  {
    id: 'su_asiti', name: 'Su Sümbülü', scientific: 'Eichhornia crassipes', icon: '🌸', accent: '#a78bfa',
    desc: 'İSTİLACI TÜR — Tropik Amerika\'dan geldi. Türkiye\'nin sulak alanlarında artıyor. Gölleri kapatır.',
    habitat: 'Durgun ve yavaş akan sular — giderek yayılıyor',
    bloom: 'Yaz boyunca mor çiçek açar',
    fishValue: 'Su sümbülü kalın örtüsü oksijenini azaltır, balık popülasyonunu olumsuz etkiler.',
    ecology: 'Tehlikeli istilacı — gördüğünde yerel orman idaresine bildir!',
    status: '🚨 İSTİLACI — bildir: 444 0 645 (Orman ve Su İşleri)',
  },
  {
    id: 'su_yosunu', name: 'Hornwort (Su Yosunu)', scientific: 'Ceratophyllum demersum', icon: '🌿', accent: '#10b981',
    desc: 'Suya tamamen dalmış yeşil çalılar. Balık üremesi ve yavru balık için kritik habitat.',
    habitat: 'Gölller, barajlar, nehir altı · 1-5 m derinlik',
    bloom: 'Küçük çiçekler — neredeyse görünmez',
    fishValue: 'Sazan, levrek ve yayın genç bireyleri yosun içinde barınır. Yosun alanları avcılık için önemli.',
    ecology: 'Oksijen üretir, suyu filtreler, küçük balık için beslenme-barınak.',
    status: '✅ Faydalı doğal tür — koruyun',
  },
];

const WETLAND_TIPS = [
  { icon: '📸', tip: 'Sulak alanlarda balık avlamadan önce habitat gözlemi yap — bitki yoğunluğu balık olasılığını gösterir' },
  { icon: '🌡️', tip: 'Su bitkisi yoğun alanlarda sabah erken oksijen düşüktür — balık yüzeye yakın olur' },
  { icon: '🎣', tip: 'Kamış kenarında yumuşak plastik yem yavaş düşürme — turna ve levrek favorisidir' },
  { icon: '🐦', tip: 'Su kuşlarının (karabatak, balıkçıl) aktif olduğu alan = balık var alan' },
  { icon: '🌿', tip: 'Nilüfer ve su yosunu alanında 2-3 m derinlik arayın — en büyük balıklar burada' },
];

export default function AquaticPlants() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a1a0f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪷 Su Bitkileri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 tür · balıkçılık habitatı & ekoloji</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {PLANTS.map(p => {
          const open = sel === p.id;
          return (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : p.id)} style={{
                background: '#1a2e1a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${p.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{p.scientific}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1a2e1a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${p.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{p.desc}</div>
                  {[['📍 Habitat', p.habitat], ['🌸 Çiçeklenme', p.bloom], ['🎣 Balıkçılık', p.fishValue], ['🌿 Ekoloji', p.ecology]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: p.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: p.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 12, color: p.accent, fontWeight: 600 }}>{p.status}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ background: '#1a2e1a', borderRadius: 14, padding: 14, border: '1px solid #22c55e22', marginTop: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🎣 Sulak Alan Balıkçılığı</div>
          {WETLAND_TIPS.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>{t.icon}</span>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{t.tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
