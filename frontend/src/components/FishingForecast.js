import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const DAYS = 7;

// Moon phase approximation (0-1, 0=new, 0.5=full)
function moonPhase(date) {
  const lc = 2551443;
  const d = new Date(date);
  const now = (d - new Date('2000-01-06')) / 1000;
  const phase = ((now % lc) / lc);
  return phase < 0 ? phase + 1 : phase;
}

function moonIcon(p) {
  if (p < 0.05 || p > 0.95) return '🌑';
  if (p < 0.25) return '🌒';
  if (p < 0.35) return '🌓';
  if (p < 0.45) return '🌔';
  if (p < 0.55) return '🌕';
  if (p < 0.65) return '🌖';
  if (p < 0.75) return '🌗';
  return '🌘';
}

function moonScore(p) {
  // New and full moon are best, quarters less so
  const dist = Math.min(Math.abs(p - 0), Math.abs(p - 0.5), Math.abs(p - 1));
  return Math.round(100 - dist * 120);
}

const WMO_FISH_SCORE = {
  0: 90, 1: 85, 2: 75, 3: 60, 51: 50, 61: 35, 71: 30, 80: 40, 95: 20,
};

function wmoScore(code) {
  const keys = Object.keys(WMO_FISH_SCORE).map(Number).sort((a, b) => b - a);
  for (const k of keys) { if (code >= k) return WMO_FISH_SCORE[k]; }
  return 50;
}

function wmoIcon(code) {
  if (code === 0) return '☀️';
  if (code <= 2) return '🌤️';
  if (code === 3) return '☁️';
  if (code < 60) return '🌫️';
  if (code < 70) return '🌧️';
  if (code < 80) return '❄️';
  if (code < 90) return '🌦️';
  return '⛈️';
}

function wmoLabel(code) {
  if (code === 0) return 'Açık';
  if (code <= 2) return 'Az Bulutlu';
  if (code === 3) return 'Kapalı';
  if (code < 60) return 'Sisli/Çisenti';
  if (code < 70) return 'Yağmur';
  if (code < 80) return 'Kar';
  if (code < 90) return 'Sağanak';
  return 'Fırtına';
}

function combinedScore(weatherCode, wind, moonPhaseVal, uvIdx) {
  let s = wmoScore(weatherCode) * 0.45 + moonScore(moonPhaseVal) * 0.30;
  const windPenalty = wind > 30 ? 20 : wind > 20 ? 10 : 0;
  s -= windPenalty;
  // Moderate UV slightly boosts (fish active in light); extreme UV lowers visibility
  if (uvIdx > 8) s -= 8;
  else if (uvIdx >= 4) s += 5;
  return Math.max(5, Math.min(100, Math.round(s)));
}

function scoreColor(s) { return s >= 70 ? '#22c55e' : s >= 50 ? '#f59e0b' : '#ef4444'; }
function scoreLabel(s) { return s >= 80 ? 'Mükemmel' : s >= 65 ? 'İyi' : s >= 50 ? 'Orta' : s >= 35 ? 'Zayıf' : 'Kötü'; }

function bestHour(score) {
  if (score >= 70) return 'Gün boyu (06:00–19:00)';
  if (score >= 55) return 'Sabah (06:00–10:00) ve akşam (17:00–20:00)';
  return 'Şafak (05:30–08:00) en iyi pencere';
}

const CITIES = [
  { name: 'İstanbul', lat: 41.01, lng: 28.95 },
  { name: 'İzmir', lat: 38.42, lng: 27.14 },
  { name: 'Antalya', lat: 36.90, lng: 30.71 },
  { name: 'Trabzon', lat: 41.00, lng: 39.72 },
];

export default function FishingForecast() {
  const navigate = useNavigate();
  const [city, setCity] = useState(CITIES[0]);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&daily=temperature_2m_max,temperature_2m_min,weathercode,wind_speed_10m_max,precipitation_sum,uv_index_max&forecast_days=${DAYS}&wind_speed_unit=kmh&timezone=auto`;
    fetch(url)
      .then(r => r.json())
      .then(json => {
        const d = json.daily || {};
        const rows = (d.time || []).map((date, i) => {
          const code = (d.weathercode || [])[i] ?? 0;
          const wind = Math.round((d.wind_speed_10m_max || [])[i] ?? 0);
          const uv = (d.uv_index_max || [])[i] ?? 4;
          const mp = moonPhase(date);
          const score = combinedScore(code, wind, mp, uv);
          return {
            date, code, wind, uv: Math.round(uv),
            maxT: Math.round((d.temperature_2m_max || [])[i] ?? 20),
            minT: Math.round((d.temperature_2m_min || [])[i] ?? 10),
            precip: ((d.precipitation_sum || [])[i] ?? 0).toFixed(1),
            moonPhaseVal: mp, score,
          };
        });
        setForecast(rows);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [city]);

  const best = useMemo(() => forecast ? [...forecast].sort((a, b) => b.score - a.score)[0] : null, [forecast]);

  const dayLabel = (iso, i) => {
    if (i === 0) return 'Bugün';
    if (i === 1) return 'Yarın';
    return new Date(iso).toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Balıkçılık Tahmin</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>7 günlük · hava + ay + UV kombinasyonu</div>
      </div>

      {/* City selector */}
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {CITIES.map(c => (
          <button key={c.name} onClick={() => setCity(c)} style={{
            background: city.name === c.name ? '#3b82f6' : '#1f2937',
            color: city.name === c.name ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: city.name === c.name ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{c.name}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#6b7280' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎣</div>
          <div>Tahmin yükleniyor…</div>
        </div>
      ) : forecast ? (
        <div style={{ padding: '0 16px' }}>
          {/* Best day highlight */}
          {best && (
            <div style={{ background: '#14532d', borderRadius: 14, padding: '14px 16px', marginBottom: 14, border: '1px solid #22c55e44' }}>
              <div style={{ fontSize: 11, color: '#86efac', fontWeight: 600, marginBottom: 4 }}>⭐ EN İYİ BALIKÇILIK GÜNÜ</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb' }}>
                {dayLabel(best.date, forecast.indexOf(best))} — {best.date}
              </div>
              <div style={{ fontSize: 13, color: '#86efac', marginTop: 4 }}>
                {wmoIcon(best.code)} {wmoLabel(best.code)} · Skor: {best.score}/100
              </div>
            </div>
          )}

          {forecast.map((row, i) => {
            const color = scoreColor(row.score);
            return (
              <div key={row.date} style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${color}33` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ minWidth: 60 }}>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{i === 0 ? 'Bugün' : i === 1 ? 'Yarın' : new Date(row.date).toLocaleDateString('tr-TR', { weekday: 'short' })}</div>
                    <div style={{ fontSize: 10, color: '#4b5563' }}>{row.date.slice(5)}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 20 }}>{wmoIcon(row.code)}</span>
                      <span style={{ fontSize: 13, color: '#9ca3af' }}>{wmoLabel(row.code)}</span>
                      <span style={{ fontSize: 18 }}>{moonIcon(row.moonPhaseVal)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#6b7280' }}>
                      <span>🌡️ {row.maxT}°/{row.minT}°</span>
                      <span>💨 {row.wind}km/h</span>
                      <span>🌧️ {row.precip}mm</span>
                      <span>☀️ UV{row.uv}</span>
                    </div>
                    <div style={{ marginTop: 6, fontSize: 11, color: color }}>🕐 {bestHour(row.score)}</div>
                  </div>
                  <div style={{ textAlign: 'center', minWidth: 54 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color }}>{row.score}</div>
                    <div style={{ fontSize: 10, color, fontWeight: 700 }}>{scoreLabel(row.score)}</div>
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ background: '#1f2937', borderRadius: 14, padding: '14px 16px', marginTop: 4, border: '1px solid #374151' }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>ℹ️ SKOR HESAPLAMA</div>
            <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.7 }}>
              Skor = Hava (%45) + Ay evresi (%30) + Rüzgar ve UV cezası. Yeni ay ve dolunay + sakin hava = en yüksek skor.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>Veri yüklenemedi.</div>
      )}
    </div>
  );
}
