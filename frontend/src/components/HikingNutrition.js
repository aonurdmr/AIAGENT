import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'calorie', name: 'Kalori İhtiyacı', icon: '🔥', accent: '#f97316',
    desc: 'Yürüyüşte enerji hesaplama',
    content: [
      { t: 'Düz yol', d: 'Saat başı 200-300 kcal (70 kg kişi için)' },
      { t: 'Dağ tırmanışı', d: '400-600 kcal/saat — ağırlıklı çanta ile daha fazla' },
      { t: 'Soğuk hava eklentisi', d: 'Sıfır altı için %15-20 ekstra kalori gerekli' },
      { t: 'Günlük ihtiyaç', d: '8 saatlik dağ yürüyüşü: 3500-5000 kcal' },
      { t: 'Açlık sinyali', d: 'Yürürken acıktığını hissettiğinde geç kaldın — önceden ye' },
    ],
  },
  {
    id: 'foods', name: 'Yürüyüş Yiyecekleri', icon: '🥜', accent: '#f59e0b',
    desc: 'Hafif, kaloriden zengin, pratik beslenme',
    content: [
      { t: 'Fındık ve bademler', d: '600 kcal/100g — taşımaya en uygun. Yağ + protein + kalori.' },
      { t: 'Kuru meyve', d: '250-300 kcal/100g — şeker ani enerji, kuru elma/kayısı' },
      { t: 'Enerji barı', d: 'Cliff, RX Bar, protein barlar — pratik, 250-400 kcal/adet' },
      { t: 'Peynir', d: 'Yüksek yağ-protein — sert peynir 2-3 gün dayanır' },
      { t: 'Fındık ezmesi paket', d: 'Tek porsiyon paket — bisküvide sürülür, hafif ve kalorili' },
      { t: 'Çikolata', d: 'Yüksek yağ + şeker — ani enerji, moral booster' },
      { t: 'Dondu kurutma yemekleri', d: 'Hafif, uzun ömür — kaynar su ekle, 5 dak hazır' },
    ],
  },
  {
    id: 'water', name: 'Su ve Hidrasyon', icon: '💧', accent: '#06b6d4',
    desc: 'Dağda yeterli su alımı',
    content: [
      { t: 'Temel ihtiyaç', d: '500ml/saat düz yolda · 750ml/saat dağda' },
      { t: 'Sıcak hava eklentisi', d: '30 derece üstü: 1 litre/saat' },
      { t: 'Susuzluk belirtisi', d: 'Koyu sarı idrar · baş ağrısı · kas krampı' },
      { t: 'Aşırı su tehlikesi', d: 'Hiponatremi: çok su, az tuz — baş dönmesi ve komaya gider' },
      { t: 'Elektrolit', d: 'Uzun yürüyüşte tuz tablet veya sporcu içeceği — sadece su yetmez' },
    ],
  },
  {
    id: 'timing', name: 'Öğün Zamanlaması', icon: '⏰', accent: '#22c55e',
    desc: 'Ne zaman, nasıl beslenmeli',
    content: [
      { t: 'Başlamadan 2 saat önce', d: 'Ana öğün — karbonhidrat + protein. Hemen başlamadan yeme.' },
      { t: 'Her 45-60 dakika', d: 'Küçük ara öğün — 100-200 kcal, enerji düşmesin' },
      { t: 'Uzun mola', d: 'Tam otur, yemek ye — mideye kan gider, yürümeye zorlama' },
      { t: 'Zirvede öğün', d: 'Kalori yoğun, sıcak — termos çorba veya hazır yemek' },
      { t: 'Akşam kamp yemeği', d: 'Karbonhidrat ağırlıklı — gece kas onarımı için protein de ekle' },
    ],
  },
];

export default function HikingNutrition() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🥾 Yürüyüşte Beslenme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kalori · yiyecek seçimi · hidrasyon · zamanlama</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#161006', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#161006', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.content.map((c, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #201808' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>{c.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{c.d}</div>
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
