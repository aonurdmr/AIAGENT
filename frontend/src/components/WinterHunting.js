import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STRATEGIES = [
  {
    id: 'snow', name: 'Kar Üstü Av', icon: '❄️', accent: '#60a5fa',
    desc: 'Taze karda iz takip ve pusu',
    steps: [
      'Sabah ilk ışık: taze gece izi — izleri say ve yön belirle',
      'Sıcaklık: geyik gece soğukta beslenmeyi artırır',
      'Kar üstü: taze iz parlak ve köşeli — birkaç saat içinde',
      'Eski iz: kenar yumuşamış, içi kar dolu — gün öncesi',
      'Hayvan sıcak gün ışığına çıkar — güneyli yamaç tara',
      'Soğuk ön: fırtına öncesi 24-48 saat aktivite çok yüksek',
    ],
    tip: 'Fırtına sonrası ilk güneşli sabah en yoğun hareket — bekle.',
  },
  {
    id: 'cold', name: 'Soğuk Hava Stratejisi', icon: '🌡️', accent: '#a78bfa',
    desc: 'Yoğun soğukta hayvan davranışı',
    steps: [
      'Minus 10 altında: hayvanlar yem için risk alır',
      'Besin kaynağı: tarla artığı, mısır, emer tarlası',
      'Hareket saatleri daralır: sadece şafak ve gün batımı',
      'Soğukta hayvan yorulur — daha az kaçar, daha kolay yanaş',
      'Bataklık ve ırmak donmaz — hayvanlar oraya gelir',
      'Güney yamaç, güneş alan çukur: ısınan yer hayvan çeker',
    ],
    tip: 'Soğuk cephede son 48 saatteki tarla ve ormanlık kenar altın.',
  },
  {
    id: 'gear', name: 'Kış Ekipmanı', icon: '🎽', accent: '#22c55e',
    desc: 'Soğukta güvenli av ekipmanı',
    steps: [
      'Katmanlama: ıslak baz, yalıtımlı orta, rüzgar geçirmez dış',
      'Eldiven: ince eldiven iç, kaşmir dış — tetikler için çıkarılabilir',
      'Çizme: su geçirmez, -30 izolasyon — uzun bekleme',
      'El ve ayak ısıtıcısı: kimyasal veya elektrikli',
      'Silah: soğukta mekanizma yavaşlar — yağı az kullan',
      'Misina: soğukta kırılgan — 15 derecenin altında güçlendirme',
    ],
    tip: 'Hipotermi uyarı: titreme durduğunda tehlikeli aşama — barınağa git.',
  },
  {
    id: 'blind', name: 'Kış Pusundan Bekleme', icon: '🏠', accent: '#f97316',
    desc: 'Uzun soğuk bekleyişlerde sıcak tutunma',
    steps: [
      'Pusu ısıtıcı (propan): hava sirkülasyonu zorunlu, CO riski',
      'Oturma minderi: yalıtımlı, köpük veya koyun derisi',
      'Tütsüsüz ısıtıcı: kimyasal reaksiyon — koku çok az',
      'Sıvı alımı: soğukta terleme fark edilmez — su iç',
      'Yüksek kalorili: fındık, çikolata, enerji barı',
      'Bekleme süresi: 4 saat üstü soğuk pusu için zorlayıcı',
    ],
    tip: 'Soğukta 2 avcı birlikte gidilirse güvenlik ve moral çok daha iyi.',
  },
];

export default function WinterHunting() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#04090f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>❄️ Kış Avı Stratejileri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kar üstü iz · soğuk strateji · kış ekipmanı · bekleme</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {STRATEGIES.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#080f18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080f18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 STRATEJİ</div>
                  {s.steps.map((st, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {st}</div>)}
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {s.tip}</div>
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
