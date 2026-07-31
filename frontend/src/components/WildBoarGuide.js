import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const REGIONS = [
  { id: 'aegean', name: 'Ege Bölgesi', icon: '🌿', accent: '#22c55e', density: 'Yüksek', habitat: 'Meşe ormanı, zeytinlik', season: 'Ekim–Şubat', tip: 'Aydın ve Muğla çevresindeki meşelikler en yoğun alan.' },
  { id: 'marmara', name: 'Marmara Bölgesi', icon: '🌲', accent: '#3b82f6', density: 'Yüksek', habitat: 'Karma orman, çalılık', season: 'Kasım–Ocak', tip: 'Trakya\'da tahıl tarlası kenarları tercih eder.' },
  { id: 'blacksea', name: 'Karadeniz Bölgesi', icon: '🌳', accent: '#10b981', density: 'Çok Yüksek', habitat: 'Sık yapraklı orman, fındıklık', season: 'Eylül–Mart', tip: 'Giresun–Trabzon fındıklıkları yüksek yoğunluk.' },
  { id: 'central', name: 'İç Anadolu', icon: '🏞️', accent: '#f59e0b', density: 'Orta', habitat: 'Bozkır kenarı, dere yatağı', season: 'Kasım–Şubat', tip: 'Dere boylarında bataklık alanlara yakın gezer.' },
  { id: 'southeast', name: 'Güneydoğu Anadolu', icon: '🌄', accent: '#ef4444', density: 'Düşük', habitat: 'Meşe baltalığı, dağ eteği', season: 'Aralık–Ocak', tip: 'Güneş batımı sonrası hareket eder.' },
];

const TACTICS = [
  {
    id: 'stand', name: 'Pusu (Stand Hunting)', icon: '🪑',
    desc: 'Manda ya da bekle kürsüsünden domuzu bekleme. Türkiye\'de en yaygın yöntem.',
    timing: 'Gün batımı 2 saat öncesi – gün doğumu',
    setup: ['Rüzgar yönüne karşı konumlan', 'En yakın yem alanı veya su kaynağına bak', 'Minimum hareket ve sessizlik'],
    distance: '30–100m',
  },
  {
    id: 'drive', name: 'Kollektif Av (Drive)', icon: '🦮',
    desc: 'Bir grup avcı, köpeklerle domuzu diğer avcıların beklediği alana sürer.',
    timing: 'Gündüz (07:00–16:00)',
    setup: ['Min 6–8 kişi önerilir', 'Haberleşme için telsiz şart', 'Nişancı pozisyonları önceden belirlenmeli'],
    distance: '20–60m (hareket halinde)',
  },
  {
    id: 'stalk', name: 'Takip (Stalk)', icon: '🥷',
    desc: 'Sessizce domuzun peşinden gitme. Tecrübe gerektiren gelişmiş yöntem.',
    timing: 'Sabah erken veya akşam üstü',
    setup: ['Rüzgar kontrolü her adımda şart', 'Yavaş, sessiz adımlar', 'Donma-adım tekniği'],
    distance: '30–80m',
  },
  {
    id: 'bait', name: 'Yem Alanı', icon: '🌽',
    desc: 'Belirlenen alana mısır, pancar veya meşe palamudu bırakma. Etkili ama sabır gerektirir.',
    timing: 'Kurulum: 2–4 hafta öncesi. Av: gün batımı',
    setup: ['Yem alanını düzenli doldurun', 'En az 2 hafta alıştırma süresi', 'Kamera tuzağı kurarak hareketleri izleyin'],
    distance: '30–60m',
  },
];

const SAFETY = [
  'Yaralı yaban domuzu son derece tehlikelidir — yaklaşmayın',
  'Çift ateş kuralı: ilk atıştan sonra sonucu doğrulayın',
  'Sivil alanlara, yolara ve köylere doğru ateş açmayın',
  'İzleme köpeği yanınızda olmadan yaralıyı takip etmeyin',
  'Av silahı her zaman emniyette taşıyın',
  'Gece avında yansıtıcı yelek zorunlu (grup avlarında)',
  'Geçerli av ruhsatı ve vurma izni şart',
];

const CALIBERS = [
  { cal: '7x64mm', use: 'Standart', note: 'Türkiye\'de en yaygın kalibr' },
  { cal: '8x57mm', use: 'Güçlü', note: 'Ağır hayvanlar için uygun' },
  { cal: '.308 Win', use: 'Çok yönlü', note: 'Genel av — orta mesafe' },
  { cal: '9.3x62mm', use: 'Ağır', note: 'Büyük erkek domuzlar için' },
  { cal: '12 Gauge', use: 'Saçma/Slug', note: 'Yakın mesafe, kollektif av' },
];

export default function WildBoarGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('regions');
  const [sel, setSel] = useState(null);

  const DENS_COLOR = { 'Çok Yüksek': '#ef4444', 'Yüksek': '#f97316', 'Orta': '#f59e0b', 'Düşük': '#22c55e' };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐗 Yaban Domuzu Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Bölge yoğunluğu, taktikler & güvenlik</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['regions', '🗺️ Bölgeler'], ['tactics', '🎯 Taktikler'], ['safety', '⚠️ Güvenlik']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#f97316' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#f97316' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'regions' && REGIONS.map(r => {
          const open = sel === r.id;
          const dc = DENS_COLOR[r.density];
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 26 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>{r.habitat}</div>
                    </div>
                  </div>
                  <span style={{ background: dc + '22', color: dc, border: `1px solid ${dc}44`, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>{r.density}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}><span style={{ fontWeight: 600, color: '#6b7280' }}>📅 Sezon:</span> <span style={{ color: '#d1d5db' }}>{r.season}</span></div>
                    <div style={{ background: r.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: r.accent, fontWeight: 600, marginBottom: 3 }}>💡 BÖLGE İPUCU</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{r.tip}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'tactics' && TACTICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: '1px solid #374151', cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>Mesafe: {t.distance} · {t.timing.slice(0, 30)}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: '1px solid #374151', borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{t.desc}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#6b7280' }}>⏰ Zamanlama:</span> <span style={{ color: '#d1d5db' }}>{t.timing}</span></div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>✅ HAZIRLIK</div>
                    {t.setup.map((s, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4, display: 'flex', gap: 8 }}>
                        <span style={{ color: '#f97316', fontWeight: 700 }}>{i + 1}.</span> {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'safety' && (
          <div>
            <div style={{ background: '#ef444415', borderRadius: 14, padding: 14, border: '1px solid #ef444433', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 8 }}>⚠️ ZORUNLU GÜVENLİK KURALLARI</div>
              {SAFETY.map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 6, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>!</span> {s}
                </div>
              ))}
            </div>

            <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginBottom: 10 }}>🔫 ÖNERILEN KALİBRELER</div>
              {CALIBERS.map(c => (
                <div key={c.cal} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'center' }}>
                  <span style={{ background: '#374151', borderRadius: 8, padding: '3px 10px', fontSize: 12, fontWeight: 700, color: '#f9fafb', flexShrink: 0 }}>{c.cal}</span>
                  <div>
                    <div style={{ fontSize: 12, color: '#d1d5db', fontWeight: 600 }}>{c.use}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{c.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
