import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPOTS = [
  {
    id: 'kapadokya', name: 'Kapadokya Vadisi', region: 'Nevşehir', icon: '🎈', accent: '#f97316',
    subject: ['Balonlar', 'Kayalık manzara', 'Yaban atlar'],
    bestTime: 'Gün doğumu (06:30–08:00) · Balonlar kalkış saati',
    season: 'Ekim–Nisan (balonlar için uygun hava)',
    gear: 'Geniş açı (16-24mm) + tele (70-200mm balonlar için)',
    access: 'Göreme · Çavuşin · Uçhisar — araçla kolay',
    tip: 'Balon fotoğrafı için sabah öncesi konumlanma şart. Üçgenim Tepesi en iyi açı.',
    wildlife: 'Yaban at ve eşek sürüleri — Devrent Vadisi',
  },
  {
    id: 'bozdag', name: 'Bozdağlar', region: 'Kayseri–Sivas', icon: '🦅', accent: '#ef4444',
    subject: ['Kartal', 'Akbaba', 'Step kuşları'],
    bestTime: 'Gün ortası 10:00–14:00 (termal hava yükselen kartal)',
    season: 'Mart–Kasım',
    gear: 'Tele (400-600mm şart) · tripod · bean bag',
    access: 'Toprak yol gerektirebilir — 4x4 önerilir',
    tip: 'Kartal kanat sarar yukarı thermal çıkarken çekim. Yavaş çevir, hızlı çek.',
    wildlife: 'Altın kartal, boz akbaba, balaban',
  },
  {
    id: 'sultansazligi', name: 'Sultan Sazlığı', region: 'Kayseri', icon: '🦩', accent: '#ec4899',
    subject: ['Flamingo', 'Turna', 'Su kuşları'],
    bestTime: 'Şafak — Nisan–Eylül',
    season: 'Nisan–Eylül (flamingo)',
    gear: '500-600mm tele · düşük çekimde beden yatırma · kamuflaj',
    access: 'Yol asfalt, gözlem kulüsü mevcut',
    tip: 'Flamingolar gün doğumunda kanad açmaya başlar. Pembe havada altın saat mükemmel.',
    wildlife: 'Flamingo (50.000+), turna, yaban kazı, karabataklar',
  },
  {
    id: 'kackar', name: 'Kaçkar Dağları', region: 'Rize–Artvin', icon: '🏔️', accent: '#3b82f6',
    subject: ['Dağ manzarası', 'Yaylalar', 'Yabanıl çiçekler'],
    bestTime: 'Gün batımı ve şafak + yaz ortası',
    season: 'Temmuz–Eylül (alpin çayır)',
    gear: 'Geniş açı (16-24mm) + ND filtre şelale için',
    access: 'Çaylıklar ve trekking parkuru — ağır yürüyüş',
    tip: 'Kaçkar\'da hava hızla değişir. Çift kart + batarya + yedek kıyafet şart.',
    wildlife: 'Yıldız kartalı, dağ keçisi, endemik bitki türleri',
  },
  {
    id: 'gediz_deltasi', name: 'Gediz Deltası', region: 'İzmir', icon: '🦢', accent: '#22c55e',
    subject: ['Büyük martı', 'Kaşıkçı', 'Flamingo', 'Su yılanı'],
    bestTime: 'Şafak · Kış ayları en zengin kuş çeşitliliği',
    season: 'Kasım–Şubat (kış kuşları)',
    gear: 'Tele (400mm+) · polarize filtre',
    access: 'İzmir yakını — araçla kolay, bazı bölgeler izin gerekli',
    tip: 'Körfez içi yansıma fırsatı çok iyi. Kaşıkçı büyük gruplar halinde yer değiştirir.',
    wildlife: 'Kaşıkçı, flamingo, büyük martı, pelikan',
  },
  {
    id: 'artvin', name: 'Artvin Ormanları', region: 'Artvin', icon: '🌲', accent: '#10b981',
    subject: ['Sonbahar renkleri', 'Nehir', 'Dağ mahalle'],
    bestTime: 'Sonbahar (Ekim–Kasım) gün içi',
    season: 'Ekim–Kasım en dramatik renk',
    gear: 'Orta uzunluk (24-70mm) · polarize filtre (renkleri doygunlaştırır)',
    access: 'Karayolu iyi · bazı köyler vidalik yolu',
    tip: 'Sarp Vadisi sabah siste muhteşem. Çoruh Nehri yansımaları gün batımında iyi.',
    wildlife: 'Boz ayı, vaşak (nadiren), kartal türleri',
  },
];

const TIPS_GENERAL = [
  { icon: '⏰', tip: 'Altın Saat (gün doğumu/batımı ±30 dk) her sahnede ışığı dramatik kılar' },
  { icon: '🌫️', tip: 'Sis ve bulut yaban hayatı için mucizevi arka plan — sakin bekle' },
  { icon: '🤫', tip: 'Yaban hayatı fotoğrafçılığında ses disiplini kuralın #1\'i — fısıltı bile hayvanı kaçırabilir' },
  { icon: '🟢', tip: 'Kamuflaj kıyafet kamerayı tanımayan hayvana daha yakın konumlanmana izin verir' },
  { icon: '🔋', tip: 'Soğuk havada batarya hızla biter — yedek batarya iç cebe koy' },
  { icon: '📐', tip: 'Düşük açı (kamera yere yakın) yaban hayatı fotoğrafını dramatik kılar' },
];

export default function PhotoSpots() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📸 Doğa Fotoğraf Noktaları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 konum · yaban hayatı & manzara fotoğrafçılığı</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SPOTS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>📍 {s.region}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                      {s.subject.map(sub => <span key={sub} style={{ background: s.accent + '22', color: s.accent, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{sub}</span>)}
                    </div>
                    {[['⏰ En İyi Saat', s.bestTime], ['📅 Sezon', s.season], ['📷 Ekipman', s.gear], ['🚗 Erişim', s.access], ['🦅 Yaban Hayatı', s.wildlife]].map(([l, v]) => (
                      <div key={l} style={{ fontSize: 12, marginBottom: 4 }}>
                        <span style={{ color: s.accent, fontWeight: 600 }}>{l}: </span>
                        <span style={{ color: '#d1d5db' }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                      <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginBottom: 3 }}>💡 PRO İPUCU</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{s.tip}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginTop: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginBottom: 10 }}>📐 Genel Teknikler</div>
          {TIPS_GENERAL.map((t, i) => (
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
