import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Open-Meteo daily forecast — free, no auth, CORS-enabled
const OPEN_METEO = 'https://api.open-meteo.com/v1/forecast';

const WMO = {
  0: { label: 'Açık', icon: '☀️' },
  1: { label: 'Az Bulutlu', icon: '🌤️' },
  2: { label: 'Parçalı Bulutlu', icon: '⛅' },
  3: { label: 'Bulutlu', icon: '☁️' },
  45: { label: 'Sisli', icon: '🌫️' },
  51: { label: 'Hafif Çisenti', icon: '🌦️' },
  61: { label: 'Hafif Yağmur', icon: '🌧️' },
  63: { label: 'Yağmurlu', icon: '🌧️' },
  65: { label: 'Kuvvetli Yağmur', icon: '⛈️' },
  71: { label: 'Hafif Kar', icon: '🌨️' },
  73: { label: 'Karlı', icon: '❄️' },
  80: { label: 'Sağanak', icon: '🌦️' },
  95: { label: 'Fırtına', icon: '⛈️' },
};

function wmo(code) {
  return WMO[code] || WMO[Math.floor(code / 10) * 10] || { label: 'Bilinmiyor', icon: '🌡️' };
}

const DAYS_TR = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
const MONTHS_TR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

function dayLabel(iso, i) {
  if (i === 0) return 'Bugün';
  if (i === 1) return 'Yarın';
  const d = new Date(iso);
  return `${DAYS_TR[d.getDay()]} ${d.getDate()} ${MONTHS_TR[d.getMonth()]}`;
}

// fishing score from weather code + wind
function fishScore(code, wind) {
  let s = code === 0 ? 95 : code <= 2 ? 85 : code === 3 ? 70 : code < 50 ? 60 : code < 70 ? 45 : code < 80 ? 35 : 25;
  if (wind > 30) s = Math.max(10, s - 25);
  else if (wind > 20) s = Math.max(15, s - 10);
  return s;
}

function scoreColor(s) {
  return s >= 80 ? '#34d399' : s >= 60 ? '#86efac' : s >= 40 ? '#f59e0b' : '#f87171';
}

const CITIES = [
  { name: 'İstanbul',  lat: 41.01, lng: 28.95 },
  { name: 'Ankara',    lat: 39.93, lng: 32.86 },
  { name: 'İzmir',     lat: 38.42, lng: 27.14 },
  { name: 'Antalya',   lat: 36.88, lng: 30.70 },
  { name: 'Trabzon',   lat: 41.00, lng: 39.72 },
  { name: 'Erzurum',   lat: 39.90, lng: 41.27 },
];

// Temp range SVG bar
function TempBar({ min, max, absMin, absMax }) {
  const range = absMax - absMin || 1;
  const left  = ((min - absMin) / range) * 100;
  const width = ((max - min) / range) * 100;
  return (
    <div style={{ flex: 1, background: '#374151', borderRadius: 4, height: 6, position: 'relative', margin: '0 8px' }}>
      <div style={{ position: 'absolute', left: `${left}%`, width: `${width}%`, height: '100%', background: 'linear-gradient(90deg,#3b82f6,#f59e0b)', borderRadius: 4 }} />
    </div>
  );
}

function DayRow({ d, absMin, absMax, selected, onClick }) {
  const w   = wmo(d.code);
  const s   = fishScore(d.code, d.wind);
  return (
    <div onClick={onClick} style={{
      background: selected ? '#1e3a5f' : '#1f2937',
      borderRadius: 12, padding: '12px 14px', marginBottom: 8,
      border: `1px solid ${selected ? '#3b82f6' : '#374151'}`, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 22, width: 32, textAlign: 'center' }}>{w.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb' }}>{d.label}</div>
          <div style={{ fontSize: 11, color: '#6b7280' }}>{w.label}</div>
        </div>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>{d.windLabel}</div>
        <TempBar min={d.min} max={d.max} absMin={absMin} absMax={absMax} />
        <div style={{ fontSize: 12, color: '#60a5fa' }}>{d.min}°</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb' }}>{d.max}°</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: scoreColor(s), minWidth: 24, textAlign: 'right' }}>{s}</div>
      </div>

      {selected && (
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { label: 'Yağış', value: `${d.precip} mm`, icon: '💧' },
            { label: 'Rüzgar', value: `${d.wind} km/h`, icon: '💨' },
            { label: 'UV', value: d.uv, icon: '☀️' },
            { label: 'Balıkçılık', value: `${s}/100`, icon: '🎣' },
          ].map(item => (
            <div key={item.label} style={{ background: '#374151', borderRadius: 8, padding: '8px 4px', textAlign: 'center' }}>
              <div style={{ fontSize: 14 }}>{item.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{item.value}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{item.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WeatherForecast() {
  const navigate = useNavigate();
  const [cityIdx, setCityIdx] = useState(0);
  const [days, setDays]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);

  const city = CITIES[cityIdx];

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${OPEN_METEO}?latitude=${city.lat}&longitude=${city.lng}`
        + `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weathercode,uv_index_max`
        + `&forecast_days=7&wind_speed_unit=kmh&timezone=Europe%2FIstanbul`;
      const resp = await fetch(url);
      if (resp.ok) {
        const data = await resp.json();
        const { daily } = data;
        const parsed = daily.time.map((t, i) => ({
          date:      t,
          label:     dayLabel(t, i),
          max:       Math.round(daily.temperature_2m_max[i]),
          min:       Math.round(daily.temperature_2m_min[i]),
          precip:    Math.round(daily.precipitation_sum[i] * 10) / 10,
          wind:      Math.round(daily.wind_speed_10m_max[i]),
          windLabel: daily.wind_speed_10m_max[i] > 30 ? '💨 Kuvvetli' : daily.wind_speed_10m_max[i] > 15 ? '🌬️ Orta' : '🍃 Sakin',
          code:      daily.weathercode[i],
          uv:        Math.round(daily.uv_index_max[i] * 10) / 10,
        }));
        setDays(parsed);
      }
    } catch (_) {}
    setLoading(false);
  }, [city]);

  useEffect(() => { load(); }, [load]);

  const absMin = days.length ? Math.min(...days.map(d => d.min)) : 0;
  const absMax = days.length ? Math.max(...days.map(d => d.max)) : 30;

  // Weekly fishing score
  const weekScore = days.length
    ? Math.round(days.reduce((s, d) => s + fishScore(d.code, d.wind), 0) / days.length)
    : 0;

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📅 7 Günlük Tahmin</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Open-Meteo · Ücretsiz hava tahmini</div>
      </div>

      {/* City selector */}
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {CITIES.map((c, i) => (
          <button key={c.name} onClick={() => { setCityIdx(i); setSelected(0); }} style={{
            background: cityIdx === i ? '#3b82f6' : '#1f2937', color: cityIdx === i ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: cityIdx === i ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
          }}>{c.name}</button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#6b7280' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📡</div>
          <div>Hava tahmini yükleniyor…</div>
        </div>
      )}

      {days.length > 0 && !loading && (
        <>
          {/* Weekly fishing summary */}
          <div style={{ margin: '0 16px 14px', background: 'linear-gradient(135deg,#1e3a5f,#1e40af)', borderRadius: 16, padding: '14px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600 }}>HAFTALIK BALIKÇILIK SKORU</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: scoreColor(weekScore), marginTop: 4 }}>{weekScore}<span style={{ fontSize: 16, color: '#93c5fd' }}>/100</span></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: '#93c5fd' }}>Sıcaklık aralığı</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{absMin}° – {absMax}°C</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ padding: '0 16px 8px', display: 'flex', justifyContent: 'flex-end', gap: 12, fontSize: 10, color: '#6b7280' }}>
            <span>Min °C</span><span>—</span><span>Max °C</span><span>|</span><span style={{ color: '#34d399' }}>🎣 skor</span>
          </div>

          {/* Day rows */}
          <div style={{ padding: '0 16px' }}>
            {days.map((d, i) => (
              <DayRow key={d.date} d={d} absMin={absMin} absMax={absMax}
                selected={selected === i} onClick={() => setSelected(selected === i ? -1 : i)} />
            ))}
          </div>

          {/* Info */}
          <div style={{ margin: '14px 16px 0', background: '#1f2937', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151' }}>
            <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.6 }}>
              🌐 Kaynak: Open-Meteo (ücretsiz, gerçek zamanlı) · Skor: hava kodu + rüzgar hızından hesaplanır.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
