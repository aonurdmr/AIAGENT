import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PATTERNS = [
  {
    id: 'high', name: 'Yüksek Basınç Sistemi', icon: '☀️', accent: '#22c55e', symbol: 'H',
    fishing: 'İyi',
    desc: 'Sakin, berrak hava. Balıklar aktif ama savunmaya geçer. Altın saat önemlidir.',
    indicators: ['Barometrik basınç: 1015+ hPa', 'Rüzgar: hafif ve düzenli', 'Hava: açık, sıcaklık stabil', 'Balık: aktif ama dikkatli'],
    tips: 'Sabah erken (05-08) ve akşam (17-20) saatleri en verimli. Öğle saatlerinde balık derine çekilir.',
    duration: '3–7 gün sürer',
  },
  {
    id: 'low', name: 'Alçak Basınç Sistemi', icon: '🌧️', accent: '#f97316', symbol: 'L',
    fishing: 'Karma',
    desc: 'Yağmur öncesi birkaç saat mükemmel av olabilir. Fırtına sırasında tehlikeli.',
    indicators: ['Barometrik basınç: < 1010 hPa', 'Rüzgar: güçlü ve değişken', 'Hava: bulutlu, yağmur olası', 'Balık: hareketle önce artar, sonra durur'],
    tips: 'Basınç düşerken (alçak gelirken) balık yoğun beslenmeye girer. Bu pencere 2–6 saat sürebilir.',
    duration: '1–3 gün, geçici',
  },
  {
    id: 'frontal', name: 'Soğuk Cephe Geçişi', icon: '❄️', accent: '#3b82f6', symbol: '↓T',
    fishing: 'Zor',
    desc: 'Cephe öncesi 12–24 saat iyi, geçiş sırasında ve hemen sonrası çok kötü.',
    indicators: ['Basınç: hızlı değişim', 'Sıcaklık: belirgin düşüş', 'Rüzgar: yön değişimi (genellikle güney→kuzey)', 'Balık: cephe geçince durur'],
    tips: 'Soğuk cephe 48 saat geçince balık yeni sıcaklığa alışır. Sabır gerektirir.',
    duration: '1–2 günlük geçiş',
  },
  {
    id: 'stable', name: 'Kararlı Hava', icon: '🌤️', accent: '#f59e0b', symbol: '=',
    fishing: 'En İyi',
    desc: 'Hava 2–3 gündür değişmiyorsa balık rutine girmiştir. Tahmin en kolay.',
    indicators: ['Basınç: sabit (±5 hPa)', 'Rüzgar: düzenli, tutarlı yön', 'Hava: tutarlı bulutluluk', 'Balık: rutin beslenme döngüsü'],
    tips: 'En az 48 saat aynı hava → tutarlı av. Balık aynı yerde, aynı saatte beslenir.',
    duration: 'Değişkene kadar',
  },
  {
    id: 'rising', name: 'Basınç Yükseliyor', icon: '📈', accent: '#06b6d4', symbol: '↑P',
    fishing: 'İyi-Çok İyi',
    desc: 'Fırtınadan sonra basınç yükselirken balık tekrar aktif olmaya başlar.',
    indicators: ['Basınç: artıyor (saatte +1–3 hPa)', 'Hava: açılıyor', 'Rüzgar: yatışıyor', 'Balık: beslenme başlar'],
    tips: 'Fırtına sonrası ilk 6–12 saat özellikle verimli. Balık açtır.',
    duration: '12–36 saat',
  },
  {
    id: 'falling', name: 'Basınç Düşüyor', icon: '📉', accent: '#ef4444', symbol: '↓P',
    fishing: 'Karma→Kötü',
    desc: 'Düşüş hızına bağlı. Yavaş düşüş iyi, hızlı düşüş balığı sersemletiyor.',
    indicators: ['Basınç: düşüyor', 'Hava: kötüleşiyor', 'Sıcaklık: düşüyor veya yükseliyor', 'Balık: önce aktif, sonra azalır'],
    tips: 'Yavaş düşüş (1 hPa/saat): 6 saat önce yoğun beslenir. Hızlı düşüş: acele edin, 2 saat sonra durur.',
    duration: 'Değişken',
  },
];

const BAROMETER_TIPS = [
  { range: '> 1020 hPa', condition: 'Güçlü yüksek basınç', fishing: 'Rutin av — sabah/akşam', color: '#22c55e' },
  { range: '1015–1020 hPa', condition: 'Normal yüksek basınç', fishing: 'İyi av koşulları', color: '#84cc16' },
  { range: '1010–1015 hPa', condition: 'Normal', fishing: 'Ortalama av', color: '#f59e0b' },
  { range: '1000–1010 hPa', condition: 'Hafif alçak basınç', fishing: 'İzleyin — değişim geliyordur', color: '#f97316' },
  { range: '< 1000 hPa', condition: 'Güçlü alçak basınç', fishing: 'Av planlamayın', color: '#ef4444' },
];

const FISH_COLOR = { 'İyi': '#22c55e', 'Karma': '#f59e0b', 'Zor': '#ef4444', 'En İyi': '#06b6d4', 'İyi-Çok İyi': '#84cc16', 'Karma→Kötü': '#f97316' };

export default function WeatherPatterns() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('patterns');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📊 Hava Desenleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Basınç sistemleri & balıkçılık aktivite etkisi</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['patterns', '🌤️ Desenler'], ['barometer', '🧭 Barometre']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#38bdf8' : '#1f2937', color: tab === id ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#38bdf8' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'patterns' && PATTERNS.map(p => {
          const open = sel === p.id;
          const fc = FISH_COLOR[p.fishing] || '#6b7280';
          return (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : p.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${p.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 26 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>{p.duration}</div>
                    </div>
                  </div>
                  <span style={{ background: fc + '22', color: fc, border: `1px solid ${fc}44`, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>🎣 {p.fishing}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${p.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{p.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>📊 GÖSTERGELER</div>
                    {p.indicators.map((ind, i) => (
                      <div key={i} style={{ fontSize: 11, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 6 }}>
                        <span style={{ color: p.accent }}>•</span> {ind}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: p.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: p.accent, fontWeight: 600, marginBottom: 3 }}>💡 BALIKÇı İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{p.tips}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'barometer' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>
                Atmosfer basıncı (hPa), balık aktivitesini doğrudan etkiler. Balıkların hava kesesi basınç değişimlerine karşı hassastır.
              </div>
            </div>
            {BAROMETER_TIPS.map((bt, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: `1px solid ${bt.color}33` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ background: bt.color + '22', color: bt.color, borderRadius: 8, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{bt.range}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#f9fafb', marginBottom: 2 }}>{bt.condition}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>🎣 {bt.fishing}</div>
              </div>
            ))}
            <div style={{ background: '#38bdf815', borderRadius: 12, padding: '12px 14px', border: '1px solid #38bdf833', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#38bdf8', fontWeight: 600, marginBottom: 4 }}>📱 NASIL KULLANILIR?</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>
                Telefon uygulamaları (Weather Underground, Windy) saatlik basınç grafiği gösterir. Hava uygulamanızda "barometric pressure" veya "basınç" arayın.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
