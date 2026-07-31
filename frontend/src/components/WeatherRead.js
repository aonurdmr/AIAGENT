import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CLOUDS = [
  { id: 'cumulus', name: 'Kümülüs', icon: '⛅', height: 'Alçak-orta · 500-2000m', meaning: 'Güzel hava işareti — yatay gelişim', fishing: 'Mükemmel — balık aktif', hunting: 'İdeal av koşulları', warning: false },
  { id: 'cumulonimbus', name: 'Kümülonimbus', icon: '⛈️', height: 'Tüm katmanlar · 0-12km', meaning: 'Fırtına bulutu — şimşek, dolu, ani yağış', fishing: 'Dur — tehlike', hunting: 'Dur — ani fırtına', warning: true },
  { id: 'stratus', name: 'Stratus', icon: '🌫️', height: 'Çok alçak · 0-500m', meaning: 'Gri örtü — sisle beraber düşük görüş', fishing: 'Orta — sabah erken etkili', hunting: 'Görüş düşük', warning: false },
  { id: 'cirrus', name: 'Sirrus', icon: '🌤️', height: 'Yüksek · 6000m+', meaning: 'İnce lifli beyaz — hava değişim habercisi', fishing: '24-48 saat içinde baskı değişimi', hunting: 'Değişen koşullar yakın', warning: false },
  { id: 'altocumulus', name: 'Altokümülüs', icon: '☁️', height: 'Orta · 2000-6000m', meaning: 'Koyun bulutu — genellikle yağmur 12-24s', fishing: 'Yağmur öncesi beslenme patlaması', hunting: 'Hareket artar', warning: false },
];

const PRESSURE_SIGNS = [
  { icon: '📈', sign: 'Basınç artışı', meaning: 'Hava açılıyor — balıkçılık ve av için hazırlan', activity: 'Harika' },
  { icon: '📉', sign: 'Basınç düşüşü', meaning: 'Kötü hava geliyor — balık derine çekilir', activity: 'Orta-kötü' },
  { icon: '📊', sign: 'Stabil basınç', meaning: 'Hava sabit — tahmin kolaylaşır', activity: 'Orta-iyi' },
  { icon: '⚡', sign: 'Hızlı basınç düşüşü', meaning: 'Acil uyarı — fırtına yakın, sahayı terk et', activity: 'Tehlike' },
];

const FORECASTS = [
  { time: 'Gündoğumu kırmızı', meaning: 'Sabah kırmızı gökyüzü — gün içi yağmur uyarısı', action: 'Erken çık, öğleden önce plan' },
  { time: 'Günbatımı kırmızı', meaning: 'Akşam kırmızı — yarın güzel hava', action: 'Sabah için hazırlık yap' },
  { time: 'Çiy bolluğu', meaning: 'Açık hava — yoğun çiy radyatif soğuma gösterir', action: 'Güzel sabah planlayabilirsin' },
  { time: 'Karıncalar telaşlı', meaning: 'Yağmur yakın — böcekler basınç düşüşünü hisseder', action: '2-4 saat içinde sığınak bul' },
  { time: 'Duman yere iner', meaning: 'Nem yüksek, basınç düşük — yağmur geliyor', action: 'Terk et veya çadır hazırla' },
  { time: 'Balıklar atlıyor', meaning: 'Atmosfer böcekleri indirdi — beslenme yüksek', action: 'Yüzey yemle hemen avlan' },
];

export default function WeatherRead() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('clouds');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#06080f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌤️ Hava Durumu Okuma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Bulut tipleri · basınç işaretleri · doğa tahmin</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['clouds','Bulutlar'],['pressure','Basınç'],['folk','Halk Tahmini']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#38bdf8' : '#0c1020', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 12
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'clouds' && CLOUDS.map(c => {
          const open = sel === c.id;
          const color = c.warning ? '#ef4444' : '#38bdf8';
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#0c1020', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '12px 14px', border: `1px solid ${color}33`, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 26 }}>{c.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{c.height}</div>
                </div>
                {c.warning && <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, background: '#ef444422', padding: '2px 8px', borderRadius: 20 }}>⚠️ TEHLİKE</div>}
              </div>
              {open && (
                <div style={{ background: '#0c1020', borderRadius: '0 0 12px 12px', padding: '0 14px 12px', border: `1px solid ${color}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 8, marginBottom: 6 }}>{c.meaning}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, background: '#051535', borderRadius: 8, padding: '6px 10px' }}>
                      <div style={{ fontSize: 10, color: '#06b6d4', fontWeight: 700, marginBottom: 2 }}>🎣 BALIK</div>
                      <div style={{ fontSize: 11, color: '#d1d5db' }}>{c.fishing}</div>
                    </div>
                    <div style={{ flex: 1, background: '#1a1505', borderRadius: 8, padding: '6px 10px' }}>
                      <div style={{ fontSize: 10, color: '#f97316', fontWeight: 700, marginBottom: 2 }}>🏹 AV</div>
                      <div style={{ fontSize: 11, color: '#d1d5db' }}>{c.hunting}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'pressure' && (
          <div style={{ background: '#0c1020', borderRadius: 14, padding: 14, border: '1px solid #38bdf822' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', marginBottom: 10 }}>🌡️ Atmosfer Basıncı & Aktivite</div>
            {PRESSURE_SIGNS.map((p, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < PRESSURE_SIGNS.length-1 ? '1px solid #111828' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 24 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{p.sign}</div>
                      <div style={{ fontSize: 11, color: p.activity === 'Tehlike' ? '#ef4444' : p.activity === 'Harika' ? '#22c55e' : '#fbbf24', fontWeight: 700 }}>{p.activity}</div>
                    </div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{p.meaning}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'folk' && (
          <div style={{ background: '#0c1020', borderRadius: 14, padding: 14, border: '1px solid #38bdf822' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', marginBottom: 10 }}>🌿 Halk Bilgesi Hava Tahminleri</div>
            {FORECASTS.map((f, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < FORECASTS.length-1 ? '1px solid #111828' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#7dd3fc', marginBottom: 2 }}>"{f.time}"</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{f.meaning}</div>
                <div style={{ fontSize: 11, color: '#22c55e' }}>→ {f.action}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
