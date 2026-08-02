import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FIRE_TYPES = [
  {
    id: 'hunter', name: 'Avcı Ateşi', icon: '🔥', accent: '#f97316',
    heat: 5, cook: 4, wind: 2, build: 'Kolay',
    desc: 'İki paralel kütük arasında yakılan uzun ateş. Sürekli ısı üretir, yemek pişirmek için mükemmel.',
    steps: [
      '40-60cm uzunluğunda 2 kalın kütüğü paralel yerleştirin.',
      'Aralarına kuru ot, kabuk ve küçük çalı parçaları koyun.',
      'Ateşi kütüklerin arasına yakın yerden başlatın.',
      'Yanmaya başlayınca üzerine kütük ekleyin.',
      'Tence veya ızgara doğrudan kütüklerin üzerine oturur.',
    ],
    pros: ['Uzun süreli yanar', 'Yemek için ideal', 'Hava koşullarına dayanıklı'],
    cons: ['Çok odun gerektirir', 'Şehre taşınamaz', 'Gece söndürmek uzun sürer'],
  },
  {
    id: 'tepee', name: 'Teepee Ateşi', icon: '🏕️', accent: '#f59e0b',
    heat: 3, cook: 3, wind: 1, build: 'Kolay',
    desc: 'Çadır şeklinde çubuklar üst üste konur. Hızlı tutuşur, harika aydınlatma sağlar.',
    steps: [
      'Bir tutam kuru ot ve kabuk ile ateş çekirdeği oluşturun.',
      'İnce çubukları çevresine eğik yaslanacak şekilde dirin.',
      'Dışını daha kalın dallarla kapatın.',
      'Çekirdeği alttan veya yanından tutuşturun.',
      'Odun eklerken teepee formunu bozmayın.',
    ],
    pros: ['Hızlı tutuşur', 'Çok iyi ışık verir', 'Az malzeme'],
    cons: ['Çabuk tükenir', 'Rüzgara duyarlı', 'Yemek için zor'],
  },
  {
    id: 'log_cabin', name: 'Log Cabin Ateşi', icon: '🪵', accent: '#84cc16',
    heat: 5, cook: 5, wind: 4, build: 'Orta',
    desc: 'Kütükler kare biçiminde üst üste istiflanır. Çok sağlam ve uzun süre yanan ateş tipi.',
    steps: [
      'İki kütüğü paralel yerleştirin (NS yönü).',
      'İki kütüğü dik açıyla üzerine koyun (EW yönü).',
      '3-4 kat yüksekliğinde kare oluşturun.',
      'Ortasına çubuk ve çalı doldurarak başlatın.',
      'Dışa doğru kütükler ekleyerek büyütün.',
    ],
    pros: ['Çok uzun yanar', 'Yüksek ısı', 'Rüzgara dayanıklı', 'Pişirme için en iyi'],
    cons: ['Çok odun gerektirir', 'Yazmak zaman alır', 'Taşıması zor'],
  },
  {
    id: 'star', name: 'Yıldız Ateşi', icon: '⭐', accent: '#a855f7',
    heat: 3, cook: 3, wind: 3, build: 'Çok Kolay',
    desc: 'Uzun dallar merkeze doğru yıldız gibi yerleştirilir. Odun taşıması en az olan yöntem.',
    steps: [
      '5-6 adet uzun dal veya kütük toplayın.',
      'Uçlarını merkeze getirerek yıldız deseni oluşturun.',
      'Ortasına tutuşturma malzemesi koyun.',
      'Ateş yaktıktan sonra dalları içeri itin.',
      'Söndürmek için sadece dışarı çekin.',
    ],
    pros: ['Minimum odun hareketi', 'Kolay kontrol', 'Az malzeme', 'Hızlı söndürülür'],
    cons: ['Orta ısı', 'Büyük kütük gerekmez', 'Pişirme için zor'],
  },
];

const FIRE_RULES = [
  { icon: '💧', rule: 'Ateş söndürülünce üzerine en az 10 litre su dökün. Duman çıkmayana kadar devam edin.' },
  { icon: '🌬️', rule: 'Rüzgar 30 km/h\'i geçtiğinde veya kuvvetli esintide kamp ateşi yakmayın.' },
  { icon: '🌿', rule: 'Yanabilecek otların en az 2 metre uzağında ateş yakın; yerden toprak veya taş zemin seçin.' },
  { icon: '⛔', rule: 'Milli parklar ve koruma alanlarında ateş yakmak yasaktır; sabit mangal veya buharlı ocak kullanın.' },
  { icon: '🧯', rule: 'Yakınızda her zaman kova veya yangın tüpü bulundurun.' },
  { icon: '👀', rule: 'Ateşi asla gözetimsiz bırakmayın. Gece yatmadan önce mutlaka söndürün.' },
  { icon: '📱', rule: 'Büyük yangın durumunda 177 (Orman Yangın İhbar) numarasını arayın.' },
];

const RISK_LEVELS = [
  { label: 'Çok Düşük', color: '#22c55e', bg: '#052e16', desc: 'Ateş yakmak güvenli; normal önlemleri alın.' },
  { label: 'Düşük', color: '#84cc16', bg: '#132000', desc: 'Küçük ateş güvenli; rüzgarı takip edin.' },
  { label: 'Orta', color: '#f59e0b', bg: '#2d1b00', desc: 'Dikkatli olun; kıvılcımları kontrol edin.' },
  { label: 'Yüksek', color: '#f97316', bg: '#3d1000', desc: 'Ateşi küçük tutun; yangın tüpünü hazır bulundurun.' },
  { label: 'Aşırı', color: '#ef4444', bg: '#450a0a', desc: 'Ateş YAKMAYIN. Kuruluk + rüzgar tehlikeli.' },
];

function getFireRisk(humidity, windKmh, temp) {
  let score = 0;
  if (humidity < 20) score += 3;
  else if (humidity < 35) score += 2;
  else if (humidity < 50) score += 1;
  if (windKmh > 40) score += 3;
  else if (windKmh > 25) score += 2;
  else if (windKmh > 15) score += 1;
  if (temp > 35) score += 2;
  else if (temp > 28) score += 1;
  return Math.min(4, score);
}

function Stars({ val, max = 5, color }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: i < val ? color : '#374151' }} />
      ))}
    </div>
  );
}

export default function FireGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');
  const [sel, setSel] = useState(null);
  const [hum, setHum] = useState(40);
  const [wind, setWind] = useState(15);
  const [temp, setTemp] = useState(25);

  const riskIdx = getFireRisk(hum, wind, temp);
  const risk = RISK_LEVELS[riskIdx];

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔥 Ateş Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 ateş tipi, güvenlik kuralları ve yangın risk hesabı</div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['types', '🔥 Ateş Tipleri'], ['safety', '🛡️ Güvenlik'], ['risk', '📊 Risk Hesabı']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#f97316' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#f97316' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'types' && (
          <div>
            {FIRE_TYPES.map((ft, i) => (
              <div key={ft.id}>
                <div onClick={() => setSel(sel === i ? null : i)}
                  style={{ background: '#1f2937', borderRadius: sel === i ? '12px 12px 0 0' : 12, padding: '14px 16px', marginBottom: sel === i ? 0 : 8, border: `1px solid ${ft.accent}33`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 26 }}>{ft.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{ft.name}</div>
                        <div style={{ fontSize: 10, color: '#6b7280' }}>Kurulum: {ft.build}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 9, color: '#6b7280', marginBottom: 3 }}>Isı</div>
                      <Stars val={ft.heat} color={ft.accent} />
                    </div>
                  </div>
                </div>
                {sel === i && (
                  <div style={{ background: '#1f2937', padding: '0 16px 14px', marginBottom: 8, borderRadius: '0 0 12px 12px', border: `1px solid ${ft.accent}33`, borderTop: 'none' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12, marginTop: 4 }}>
                      {[['🔥 Isı', ft.heat], ['🍳 Pişirme', ft.cook], ['💨 Rüzgar', ft.wind]].map(([lbl, val]) => (
                        <div key={lbl} style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 9, color: '#6b7280', marginBottom: 4 }}>{lbl}</div>
                          <Stars val={val} color={ft.accent} />
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginBottom: 10 }}>{ft.desc}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>📋 ADIMLAR</div>
                    {ft.steps.map((s, si) => (
                      <div key={si} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: ft.accent, fontWeight: 700, flexShrink: 0 }}>{si + 1}.</span>
                        <span style={{ fontSize: 12, color: '#d1d5db' }}>{s}</span>
                      </div>
                    ))}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
                      <div style={{ background: '#052e16', borderRadius: 10, padding: 10 }}>
                        <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, marginBottom: 4 }}>✅ Artılar</div>
                        {ft.pros.map((p, pi) => <div key={pi} style={{ fontSize: 11, color: '#d1d5db', marginBottom: 2 }}>• {p}</div>)}
                      </div>
                      <div style={{ background: '#450a0a', borderRadius: 10, padding: 10 }}>
                        <div style={{ fontSize: 10, color: '#fca5a5', fontWeight: 600, marginBottom: 4 }}>❌ Eksiler</div>
                        {ft.cons.map((c, ci) => <div key={ci} style={{ fontSize: 11, color: '#fca5a5', marginBottom: 2 }}>• {c}</div>)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'safety' && (
          <div>
            {FIRE_RULES.map((r, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{r.icon}</span>
                <span style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{r.rule}</span>
              </div>
            ))}
            <div style={{ background: '#450a0a', borderRadius: 12, padding: 14, border: '1px solid #ef444433', marginTop: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fca5a5', marginBottom: 6 }}>🚒 ACİL DURUM</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#ef4444', marginBottom: 4 }}>177</div>
              <div style={{ fontSize: 11, color: '#fca5a5' }}>Orman Yangın İhbar Hattı (7/24 ücretsiz)</div>
            </div>
          </div>
        )}

        {tab === 'risk' && (
          <div>
            <div style={{ background: risk.bg, borderRadius: 14, padding: 16, border: `1px solid ${risk.color}55`, marginBottom: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: risk.color, fontWeight: 600, marginBottom: 4 }}>YANGIN RİSK SEVİYESİ</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: risk.color }}>{risk.label}</div>
              <div style={{ fontSize: 13, color: '#d1d5db', marginTop: 6 }}>{risk.desc}</div>
            </div>

            {[
              { label: '💧 Nem (%)', val: hum, set: setHum, min: 5, max: 95 },
              { label: '💨 Rüzgar (km/h)', val: wind, set: setWind, min: 0, max: 80 },
              { label: '🌡️ Sıcaklık (°C)', val: temp, set: setTemp, min: 0, max: 45 },
            ].map((s, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#d1d5db' }}>{s.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{s.val}</span>
                </div>
                <input type="range" min={s.min} max={s.max} value={s.val}
                  onChange={e => s.set(Number(e.target.value))}
                  style={{ width: '100%', accentColor: risk.color }} />
              </div>
            ))}

            <div style={{ background: '#1f2937', borderRadius: 12, padding: 12, border: '1px solid #374151' }}>
              <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, marginBottom: 8 }}>YANGIN RİSK SEVİYELERİ</div>
              {RISK_LEVELS.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: r.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: riskIdx === i ? r.color : '#6b7280', fontWeight: riskIdx === i ? 700 : 400 }}>{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
