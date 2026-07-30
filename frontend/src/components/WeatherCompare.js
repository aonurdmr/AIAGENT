import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const CITIES = [
  { name: 'İstanbul', lat: 41.01, lng: 28.95, icon: '🕌' },
  { name: 'Ankara', lat: 39.93, lng: 32.86, icon: '🏛️' },
  { name: 'İzmir', lat: 38.42, lng: 27.14, icon: '🫒' },
  { name: 'Antalya', lat: 36.90, lng: 30.71, icon: '🏖️' },
  { name: 'Trabzon', lat: 41.00, lng: 39.72, icon: '🌿' },
  { name: 'Bursa', lat: 40.19, lng: 29.06, icon: '🏔️' },
];

const WMO = { 0:'Açık',1:'Az Bulutlu',2:'Parçalı',3:'Kapalı',51:'Çisenti',61:'Yağmur',71:'Kar',80:'Sağanak',95:'Fırtına' };
const WMO_ICON = { 0:'☀️',1:'🌤️',2:'⛅',3:'☁️',51:'🌫️',61:'🌧️',71:'❄️',80:'🌦️',95:'⛈️' };

function wmoLabel(code) { for (const k of Object.keys(WMO).map(Number).sort((a,b)=>b-a)) { if (code >= k) return WMO[k]; } return 'Bilinmiyor'; }
function wmoIcon(code) { for (const k of Object.keys(WMO_ICON).map(Number).sort((a,b)=>b-a)) { if (code >= k) return WMO_ICON[k]; } return '🌡️'; }

function fishScore(code, wind) {
  let s = code === 0 ? 90 : code <= 2 ? 80 : code === 3 ? 65 : code < 50 ? 55 : code < 80 ? 35 : 20;
  if (wind > 30) s = Math.max(10, s - 25);
  else if (wind > 20) s = Math.max(15, s - 10);
  return s;
}

function scoreColor(s) { return s >= 70 ? '#22c55e' : s >= 50 ? '#f59e0b' : '#ef4444'; }

export default function WeatherCompare() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('score');

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const results = {};
    await Promise.all(CITIES.map(async city => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation&wind_speed_unit=kmh&forecast_days=1`;
        const resp = await fetch(url);
        const json = await resp.json();
        const cur = json.current || {};
        const code = cur.weather_code ?? 0;
        const wind = cur.wind_speed_10m ?? 0;
        results[city.name] = {
          temp: Math.round(cur.temperature_2m ?? 0),
          humidity: Math.round(cur.relative_humidity_2m ?? 0),
          wind: Math.round(wind),
          code,
          precip: cur.precipitation ?? 0,
          score: fishScore(code, wind),
        };
      } catch {
        results[city.name] = null;
      }
    }));
    setData(results);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const sorted = [...CITIES].sort((a, b) => {
    const da = data[a.name], db = data[b.name];
    if (!da || !db) return 0;
    if (sortBy === 'score') return db.score - da.score;
    if (sortBy === 'temp') return db.temp - da.temp;
    if (sortBy === 'wind') return da.wind - db.wind;
    return 0;
  });

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌍 Şehir Hava Karşılaştırma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 şehir · anlık hava ve balıkçılık skoru</div>
      </div>

      {/* Sort */}
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {[['score', '🎣 Skor'], ['temp', '🌡️ Sıcaklık'], ['wind', '💨 Rüzgar']].map(([key, label]) => (
          <button key={key} onClick={() => setSortBy(key)} style={{
            background: sortBy === key ? '#3b82f6' : '#1f2937',
            color: sortBy === key ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: sortBy === key ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{label}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#6b7280' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌡️</div>
          <div>Hava verileri yükleniyor…</div>
        </div>
      ) : (
        <div style={{ padding: '0 16px' }}>
          {sorted.map((city, rank) => {
            const d = data[city.name];
            if (!d) return null;
            const color = scoreColor(d.score);
            return (
              <div key={city.name} style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${color}33` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#9ca3af', flexShrink: 0 }}>
                    #{rank + 1}
                  </div>
                  <div style={{ fontSize: 22 }}>{city.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{city.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{wmoIcon(d.code)} {wmoLabel(d.code)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color }}>{d.score}</div>
                    <div style={{ fontSize: 10, color, fontWeight: 600 }}>SKOR</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {[
                    { label: 'Sıcaklık', value: `${d.temp}°C`, icon: '🌡️' },
                    { label: 'Nem', value: `${d.humidity}%`, icon: '💧' },
                    { label: 'Rüzgar', value: `${d.wind}km/h`, icon: '💨' },
                    { label: 'Yağış', value: `${d.precip}mm`, icon: '🌧️' },
                  ].map(s => (
                    <div key={s.label} style={{ background: '#374151', borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
                      <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginTop: 1 }}>{s.value}</div>
                      <div style={{ fontSize: 9, color: '#6b7280' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <button onClick={fetchAll} style={{ width: '100%', background: '#1f2937', color: '#9ca3af', border: '1px solid #374151', borderRadius: 12, padding: 14, fontSize: 14, cursor: 'pointer', marginTop: 4 }}>
            🔄 Yenile
          </button>
        </div>
      )}
    </div>
  );
}
