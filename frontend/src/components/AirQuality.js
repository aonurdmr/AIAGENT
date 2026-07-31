import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CITIES = [
  { name: 'İstanbul', lat: 41.01, lng: 28.95, icon: '🌉' },
  { name: 'Ankara',   lat: 39.93, lng: 32.85, icon: '🏛️' },
  { name: 'İzmir',    lat: 38.42, lng: 27.14, icon: '⛵' },
  { name: 'Antalya',  lat: 36.89, lng: 30.71, icon: '🏖️' },
  { name: 'Trabzon',  lat: 41.0,  lng: 39.72, icon: '🌿' },
  { name: 'Bursa',    lat: 40.18, lng: 29.06, icon: '🏔️' },
];

const AQI_LEVELS = [
  { max: 50,  label: 'İyi',          color: '#22c55e', desc: 'Hava kalitesi mükemmel, tüm aktiviteler için ideal.' },
  { max: 100, label: 'Orta',         color: '#84cc16', desc: 'Hassas bireyler etkilenebilir; genel aktiviteler sorunsuz.' },
  { max: 150, label: 'Hassas',       color: '#f59e0b', desc: 'Hassas gruplar için sağlık riski olabilir.' },
  { max: 200, label: 'Sağlıksız',    color: '#f97316', desc: 'Herkes etkilenebilir; açık hava aktivitelerini kısıtlayın.' },
  { max: 300, label: 'Çok Sağlıksız',color: '#ef4444', desc: 'Ciddi sağlık etkisi; dışarı çıkmaktan kaçının.' },
  { max: 500, label: 'Tehlikeli',    color: '#a855f7', desc: 'Acil sağlık uyarısı. Dışarı çıkmayın.' },
];

function aqiLevel(aqi) {
  return AQI_LEVELS.find(l => aqi <= l.max) || AQI_LEVELS[AQI_LEVELS.length - 1];
}

async function fetchAQ(city) {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.lat}&longitude=${city.lng}` +
    `&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone&timezone=auto`;
  const res = await fetch(url);
  const data = await res.json();
  const c = data.current || {};
  return {
    aqi:  c.us_aqi ?? null,
    pm25: c.pm2_5  ?? null,
    pm10: c.pm10   ?? null,
    co:   c.carbon_monoxide   ?? null,
    no2:  c.nitrogen_dioxide  ?? null,
    o3:   c.ozone ?? null,
  };
}

function AQCard({ city, data, onClick }) {
  if (!data) return (
    <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 28 }}>{city.icon}</span>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{city.name}</div>
        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Yükleniyor…</div>
      </div>
    </div>
  );

  const lvl = data.aqi !== null ? aqiLevel(data.aqi) : null;
  const color = lvl?.color || '#6b7280';

  return (
    <div onClick={() => onClick({ city, data })} style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 26 }}>{city.icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{city.name}</div>
            <div style={{ fontSize: 11, color }}>● {lvl?.label || '—'}</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', background: color + '22', borderRadius: 10, padding: '6px 12px', border: `1px solid ${color}44` }}>
          <div style={{ fontSize: 22, fontWeight: 900, color }}>{data.aqi ?? '—'}</div>
          <div style={{ fontSize: 9, color: '#6b7280' }}>AQI</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        {[
          { label: 'PM2.5', value: data.pm25, unit: 'µg/m³' },
          { label: 'PM10',  value: data.pm10,  unit: 'µg/m³' },
          { label: 'O₃',    value: data.o3,    unit: 'µg/m³' },
        ].map(s => (
          <div key={s.label} style={{ background: '#374151', borderRadius: 8, padding: '7px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: '#6b7280' }}>{s.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb' }}>{s.value !== null ? s.value.toFixed(1) : '—'}</div>
            <div style={{ fontSize: 9, color: '#6b7280' }}>{s.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AQDetail({ item, onClose }) {
  const { city, data } = item;
  const lvl = data.aqi !== null ? aqiLevel(data.aqi) : null;
  const color = lvl?.color || '#6b7280';

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000b', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 40 }}>{city.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{city.name}</div>
            <div style={{ fontSize: 14, color }}>AQI {data.aqi ?? '—'} · {lvl?.label}</div>
          </div>
        </div>

        <div style={{ background: color + '15', borderRadius: 12, padding: '12px 14px', border: `1px solid ${color}33`, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color, lineHeight: 1.6 }}>{lvl?.desc}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          {[
            { label: 'PM2.5 (İnce Partikül)', value: data.pm25, unit: 'µg/m³', icon: '💨' },
            { label: 'PM10 (Kaba Partikül)',  value: data.pm10,  unit: 'µg/m³', icon: '🌫️' },
            { label: 'Ozon (O₃)',             value: data.o3,    unit: 'µg/m³', icon: '☁️' },
            { label: 'Azot Dioksit (NO₂)',    value: data.no2,   unit: 'µg/m³', icon: '🏭' },
            { label: 'Karbon Monoksit (CO)',   value: data.co,    unit: 'µg/m³', icon: '🚗' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>
                {s.value !== null && s.value !== undefined ? s.value.toFixed(2) : '—'}
              </div>
              <div style={{ fontSize: 9, color: '#6b7280' }}>{s.unit}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1c1f26', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151' }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🎣 AÇIK HAVA AKTİVİTE TAVSİYESİ</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>
            {data.aqi === null ? 'Veri alınamadı.' :
             data.aqi <= 50  ? 'Mükemmel hava kalitesi! Balıkçılık, yürüyüş ve tüm açık hava aktiviteleri için ideal.' :
             data.aqi <= 100 ? 'Genel aktiviteler için uygun. Uzun süreli egzersizden kaçının.' :
             data.aqi <= 150 ? 'Hassas bireyler açık havada fazla zaman geçirmemelidir.' :
             'Hava kalitesi düşük. Açık hava aktivitelerini erteleyin veya sınırlayın.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AirQuality() {
  const navigate = useNavigate();
  const [aqData, setAqData] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Promise.all(
      CITIES.map(city =>
        fetchAQ(city)
          .then(d => ({ name: city.name, d }))
          .catch(() => ({ name: city.name, d: null }))
      )
    ).then(results => {
      const map = {};
      results.forEach(r => { map[r.name] = r.d; });
      setAqData(map);
    });
  }, []);

  const cleanest = Object.entries(aqData)
    .filter(([, d]) => d?.aqi !== null && d?.aqi !== undefined)
    .sort((a, b) => (a[1].aqi ?? 999) - (b[1].aqi ?? 999))[0];

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>💨 Hava Kalitesi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          Open-Meteo Air Quality API · PM2.5, PM10, Ozon ve açık hava aktivite skoru
        </div>
      </div>

      {cleanest && (
        <div style={{ margin: '0 16px 14px', background: '#052e16', borderRadius: 14, padding: '12px 16px', border: '1px solid #16a34a44' }}>
          <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 600, marginBottom: 2 }}>✨ EN TEMİZ HAVA</div>
          <div style={{ fontSize: 14, color: '#bbf7d0' }}>{cleanest[0]} · AQI {cleanest[1].aqi}</div>
        </div>
      )}

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CITIES.map(city => (
          <AQCard key={city.name} city={city} data={aqData[city.name] ?? null} onClick={setSelected} />
        ))}
      </div>

      <div style={{ margin: '16px 16px 0', background: '#1c1f26', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151' }}>
        <div style={{ fontSize: 10, color: '#6b7280' }}>📡 Veri: Open-Meteo Air Quality API · Gerçek zamanlı · Ücretsiz</div>
      </div>

      {selected && <AQDetail item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
