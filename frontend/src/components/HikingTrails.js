import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TRAIL_TYPES = [
  {
    id: 'day', name: 'Günübirlik Yürüyüş', icon: '🥾', accent: '#22c55e',
    duration: '3-8 saat',
    prep: [
      '2-3L su — dağda su yok sayarak çık',
      'Yüksek kalori: fındık, çikolata, kurutulmuş meyve',
      'İlk yardım kiti — kompresif sargı, yara bandı, ağrı kesici',
      'Yedek katman — dağ havası değişken',
      'Harita + pusula — telefon şarjı bitmez',
    ],
    danger: 'Ani hava değişimi · gece kalma riski · kısık mola',
    tip: '3-4 km/saat düz yürüyüş hızı. 300m yükseklik = 1 saat fazla süre.',
  },
  {
    id: 'multi', name: 'Çok Günlü Yürüyüş', icon: '⛺', accent: '#f59e0b',
    duration: '2-7 gün',
    prep: [
      'Çadır + uyku tulumu (mevsime uygun) · sırt çantası 20-30kg',
      'Liyofilize yemek veya kuru gıda — 500-700 cal/öğün',
      'Su arıtma filtresi — kaynaktan doğrudan içme',
      'GPS + offline harita — bakımı Türkiye için iGO veya Gaia GPS',
      'Uydu iletişim cihazı — Garmin inReach veya PLB',
    ],
    danger: 'Yorgunluk hataları · gıda ve su hesabı · hava penceresi takibi',
    tip: 'Kural: Sırt çantası vücut ağırlığının %20 fazlasını geçmemeli.',
  },
  {
    id: 'navigation', name: 'Navigasyon', icon: '🧭', accent: '#3b82f6',
    duration: 'Sürekli beceri',
    prep: [
      'İzohips okuma: yoğun çizgi = dik yamaç, seyrek = düz',
      'Kuzey bulma: güneş 12:00 — güneyden gölge düşer',
      'Topoğrafik haritada yüksek nokta: izohips halkaları',
      'GPS waypoint: başlangıç noktasını kaydet',
      'Yedek batarya — GPS soğukta pil tüketir',
    ],
    danger: 'Sisli havada yön kaybı · harita-arazi uyuşmazlığı',
    tip: 'Her 2 saatte bir konum belirle — kaybolmadan önce kontrol et.',
  },
  {
    id: 'emergency', name: 'Kaybolunca', icon: '🆘', accent: '#ef4444',
    duration: 'Acil protokol',
    prep: [
      'Dur ve panik yapma — enerjini koru',
      'Son bilinen noktan? Geri dön',
      'Su kaynaklarına in — vadiler yola çıkar',
      'Kurtarma işareti: büyük taşlarla SOS yaz, duman yak',
      '112 aramasında GPS konumunu paylaş',
    ],
    danger: 'Hipotermi · susuzluk · yanlış yönde ilerleme',
    tip: 'Kaybolunca: Dur, Düşün, Gözlem, Plan (STOP kuralı).',
  },
];

export default function HikingTrails() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040c06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🥾 Doğa Yürüyüşü Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Günübirlik · çok günlü · navigasyon · acil protokol</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TRAIL_TYPES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#080e08', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.duration}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080e08', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 HAZIRLIK</div>
                  {t.prep.map((p, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {p}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#ef4444', fontWeight: 600 }}>⚠️ Risk: </span><span style={{ color: '#d1d5db' }}>{t.danger}</span></div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
