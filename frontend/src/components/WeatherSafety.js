import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HAZARDS = [
  {
    id: 'lightning', name: 'Yıldırım', icon: '⚡', accent: '#fbbf24', risk: 'Hayati',
    desc: 'Yıldırım, açık arazide en büyük hava tehlikesi. Türkiye\'de yılda 30-50 yıldırım kaynaklı ölüm.',
    warning: ['Gökyüzünde kara bulut ve dolu uyarısı', 'Tüy veya saç dikilmesi', 'Metalik koku (ozon)', 'Yakın gürültü patlaması'],
    action: ['Anında yüksekten in — zirve ve sırt üzeri tehlikeli', 'Ağaç altına sığınma', 'Açık arazide çömel, topuk birleştir, karnını götürme', 'Su kenarından uzaklaş', 'Taş mağara içine gir (metalik değilse)'],
    rule: '30/30 kuralı: gök gürültüsü 30 sn içinde geliyorsa hemen iç mekana geç, son çakımdan 30 dk geç.',
  },
  {
    id: 'hypothermia', name: 'Hipotermi (Soğuk Çarpması)', icon: '🥶', accent: '#3b82f6', risk: 'Hayati',
    desc: 'Vücut ısısı 35°C altına düşünce. Rüzgarlı, ıslak havalarda hızlı ilerler. Erken uyarıyı kaçırma.',
    warning: ['Kontrolsüz titreme (erken evre)', 'Kırık konuşma ve uyuşukluk', 'Parmaklar ve kulak soğuması', 'Titreme durması (tehlikeli geç evre — ısı üretimi bitiyor)'],
    action: ['Islak giysilerden çıkar', 'Kuru ve rüzgarsız alana geç', 'Uyku tulumuyla sarmala', 'Sıcak (yakıcı değil) içecek ver', 'İspirto verme — damarları genişletir ısı kaybını artırır'],
    rule: 'Hipotermi yavaş gelir. "Titriyor ve düşünemiyor" ise hipotermik. "Titremiyorsa" kritik.',
  },
  {
    id: 'heat', name: 'Sıcak Çarpması (Isı Bitkinliği)', icon: '🌡️', accent: '#ef4444', risk: 'Yüksek',
    desc: 'Uzun süre güneş ve sıcakta yoğun aktivite sonrası. Vücut soğutma mekanizması çalışmayı durdurur.',
    warning: ['Şiddetli terleme ve halsizlik (ısı bitkinliği)', 'Terleme durması + sıcak kırmızı deri (sıcak çarpması)', 'Baş dönmesi, mide bulantısı', 'Bilinç değişikliği (ağır evre)'],
    action: ['Gölge ve serin alana geç', 'Kıyafetleri gevşet', 'Boyun, koltuk altı, kasığa soğuk bez uygula', 'Bol su içir (dikkatli — hızlı su içme mide bulantısı yapar)', '112 ara — bilinç değişikliği varsa acil'],
    rule: 'Terleme durmadan önce önlem al. Sıcak çarpması = her 30 dakikada bir mola + 500 ml su.',
  },
  {
    id: 'flash_flood', name: 'Sel ve Ani Taşkın', icon: '🌊', accent: '#06b6d4', risk: 'Hayati',
    desc: 'Türkiye\'nin en ölümcül hava olayı. Kanyonlar, kuru dereler ve dağ vadilerinde aniden gelir.',
    warning: ['Uzakta bile gök gürültüsü ve yağmur', 'Nehir veya dere sesinin aniden artması', 'Çamurlu su rengi (yukarıdan yağmur geliyor)', 'Çöp, ağaç dalı sürüklenmesi'],
    action: ['Hemen yukarıya çık — nehir yatağından 10 m+ yüksek olmayan yere gitme', 'Araçla sel suyundan geçme (30 cm su aracı taşır)', 'Kamp kur ya da geceyi tamamla — hızlı hareket etme', 'Ağaca tırmanma — ağaç salınımı düşürür'],
    rule: 'Türkiye\'de yılda 20-40 sel kaynaklı ölüm. Kuru dere yatağına kamp kurma.',
  },
  {
    id: 'wind', name: 'Şiddetli Rüzgar', icon: '💨', accent: '#a78bfa', risk: 'Orta-Yüksek',
    desc: 'Dağlık arazide rüzgar hızı ovaya göre 3-4 kat yüksek olabilir. Hipotermiyi hızlandırır.',
    warning: ['Ağaçların şiddetli sallanması', 'Yürüme güçlüğü', 'Hava tahmini "fırtına uyarısı"'],
    action: ['Zirve ve açık sırttan çekil', 'Rüzgar kıran bir alçak koya geç', 'Çadır kuruyorsan çift çivi at', 'Tahta veya uzun metal taşıma'],
    rule: 'Beaufort 8+ (75 km/s): Yürüyüşü durdur. Beaufort 10+: Yatay yağmur, tehlikeli.',
  },
];

const FORECAST_TIPS = [
  { icon: '📱', tip: 'Meteoblue ve WindyApp dağlık arazi için saatlik tahmin sunar — şehir tahmininden çok daha doğru' },
  { icon: '🌦️', tip: 'Sabah gök gürültüsü = öğleden sonra fırtına riski yüksek. Güneş açıkken zirveye çık.' },
  { icon: '📡', tip: 'Offline harita uygulaması + yerel hava tahmini indirmesi şehir dışına çıkmadan önce şart' },
  { icon: '☁️', tip: 'Kümülonimbus bulutu (çekiç başlı, yüksek) = hemen fırtına — altında durma' },
  { icon: '🌡️', tip: 'Her 1000 m yükseklik için sıcaklık ~6.5°C düşer. 2000 m = ovadan 13°C soğuk' },
];

export default function WeatherSafety() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌩️ Hava Tehlikeleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yıldırım · hipotermi · sel · rüzgar & sıcak çarpması</div>
      </div>

      <div style={{ margin: '0 16px 12px', background: '#ef444415', borderRadius: 12, padding: '12px 14px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 700, marginBottom: 3 }}>⚠️ Önemli</div>
        <div style={{ fontSize: 12, color: '#d1d5db' }}>Hava tehlikeleri başlamadan önce uzaklaş. "Bekle ve gör" yaklaşımı dağda hayatına mal olabilir.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {HAZARDS.map(h => {
          const open = sel === h.id;
          return (
            <div key={h.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : h.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${h.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{h.icon}</span>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{h.name}</div>
                  </div>
                  <span style={{ background: h.accent + '22', color: h.accent, border: `1px solid ${h.accent}44`, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>{h.risk}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${h.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{h.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 600, marginBottom: 4 }}>⚠️ UYARI İŞARETLERİ</div>
                    {h.warning.map((w, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}><span style={{ color: '#f59e0b' }}>•</span> {w}</div>)}
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, marginBottom: 4 }}>✅ NE YAPILMALI</div>
                    {h.action.map((a, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 8 }}>
                        <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {a}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: h.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: h.accent, fontWeight: 600, marginBottom: 3 }}>📌 KURAL</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6, fontStyle: 'italic' }}>{h.rule}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginTop: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginBottom: 10 }}>📡 Tahmin Tüyoları</div>
          {FORECAST_TIPS.map((t, i) => (
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
