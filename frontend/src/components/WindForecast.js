import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LOCATIONS = [
  { name: 'İstanbul', lat: 41.0082, lng: 28.9784, type: 'coastal' },
  { name: 'İzmir', lat: 38.4192, lng: 27.1287, type: 'coastal' },
  { name: 'Antalya', lat: 36.8969, lng: 30.7133, type: 'coastal' },
  { name: 'Bolu Dağı', lat: 40.7117, lng: 31.6328, type: 'mountain' },
  { name: 'Abant', lat: 40.6097, lng: 31.2831, type: 'lake' },
  { name: 'Sapanca', lat: 40.7119, lng: 30.2548, type: 'lake' },
];

const DIR_LABELS = ['K', 'KKD', 'KD', 'DKD', 'D', 'DGD', 'GD', 'GGD', 'G', 'GGB', 'GB', 'BGB', 'B', 'KBB', 'KB', 'KKB'];

function degToDir(deg) {
  const idx = Math.round(deg / 22.5) % 16;
  return DIR_LABELS[idx];
}

function windScore(kmh, type) {
  if (type === 'coastal') {
    if (kmh < 10) return { fishing: 90, boating: 95 };
    if (kmh < 20) return { fishing: 80, boating: 85 };
    if (kmh < 30) return { fishing: 65, boating: 60 };
    if (kmh < 40) return { fishing: 40, boating: 30 };
    return { fishing: 10, boating: 5 };
  }
  // lake / mountain
  if (kmh < 10) return { fishing: 85, boating: 90 };
  if (kmh < 20) return { fishing: 75, boating: 75 };
  if (kmh < 30) return { fishing: 50, boating: 40 };
  return { fishing: 20, boating: 10 };
}

function beaufort(kmh) {
  if (kmh < 1) return { b: 0, label: 'Durgun' };
  if (kmh < 6) return { b: 1, label: 'Sessiz' };
  if (kmh < 12) return { b: 2, label: 'Hafif Esinti' };
  if (kmh < 20) return { b: 3, label: 'Hafif Rüzgar' };
  if (kmh < 29) return { b: 4, label: 'Orta Rüzgar' };
  if (kmh < 39) return { b: 5, label: 'Tatlı Sert' };
  if (kmh < 50) return { b: 6, label: 'Sert Rüzgar' };
  if (kmh < 62) return { b: 7, label: 'Kuvvetli' };
  return { b: 8, label: 'Fırtına' };
}

function beaufortColor(b) {
  if (b <= 2) return '#22c55e';
  if (b <= 4) return '#84cc16';
  if (b <= 5) return '#f59e0b';
  if (b <= 6) return '#f97316';
  return '#ef4444';
}

async function fetchWind(lat, lng) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=windspeed_10m,winddirection_10m,windgusts_10m,apparent_temperature&forecast_days=3&timezone=Europe%2FIstanbul&windspeed_unit=kmh`;
  const r = await fetch(url);
  return (await r.json()).hourly;
}

function WindArrow({ deg, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: `rotate(${deg}deg)`, display: 'inline-block' }}>
      <polygon points="12,2 16,18 12,14 8,18" fill="#60a5fa" />
    </svg>
  );
}

export default function WindForecast() {
  const navigate = useNavigate();
  const [locIdx, setLocIdx] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [dayOffset, setDayOffset] = useState(0);

  const loc = LOCATIONS[locIdx];

  useEffect(() => {
    setLoading(true);
    setErr('');
    fetchWind(loc.lat, loc.lng)
      .then(setData)
      .catch(() => setErr('Veri alınamadı'))
      .finally(() => setLoading(false));
  }, [locIdx]);

  // Filter to chosen day
  const dayHours = [];
  if (data) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDay = new Date(today.getTime() + dayOffset * 86400000);
    data.time.forEach((t, i) => {
      const d = new Date(t);
      d.setHours(0, 0, 0, 0);
      if (d.getTime() === targetDay.getTime()) {
        dayHours.push({
          time: new Date(t),
          wind: data.windspeed_10m[i],
          dir: data.winddirection_10m[i],
          gust: data.windgusts_10m[i],
          temp: data.apparent_temperature[i],
        });
      }
    });
  }

  const avgWind = dayHours.length > 0 ? dayHours.reduce((s, h) => s + h.wind, 0) / dayHours.length : 0;
  const maxGust = dayHours.length > 0 ? Math.max(...dayHours.map(h => h.gust)) : 0;
  const bf = beaufort(avgWind);
  const scores = windScore(avgWind, loc.type);

  const dayLabels = ['Bugün', 'Yarın', 'Öbür Gün'];

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>💨 Rüzgar Tahmini</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>3 günlük rüzgar & aktivite skoru</div>
      </div>

      {/* Location selector */}
      <div style={{ padding: '0 16px 10px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {LOCATIONS.map((l, i) => (
          <button key={i} onClick={() => setLocIdx(i)} style={{
            background: locIdx === i ? '#3b82f6' : '#1f2937', color: locIdx === i ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: locIdx === i ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{l.type === 'coastal' ? '🌊' : l.type === 'mountain' ? '⛰️' : '💧'} {l.name}</button>
        ))}
      </div>

      {/* Day tabs */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {dayLabels.map((lbl, i) => (
          <button key={i} onClick={() => setDayOffset(i)} style={{
            flex: 1, background: dayOffset === i ? '#3b82f6' : '#1f2937', color: dayOffset === i ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: dayOffset === i ? '#3b82f6' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      {loading && <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>⏳ Yükleniyor...</div>}
      {err && <div style={{ margin: '0 16px', background: '#450a0a', borderRadius: 12, padding: 14, color: '#fca5a5', textAlign: 'center' }}>{err}</div>}

      {data && dayHours.length > 0 && (
        <div style={{ padding: '0 16px' }}>
          {/* Summary card */}
          <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, border: `1px solid ${beaufortColor(bf.b)}44`, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>GÜNLÜK ORTALAMA — {loc.name.toUpperCase()}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#f9fafb', marginTop: 4 }}>
                  {avgWind.toFixed(0)} km/h
                </div>
                <div style={{ fontSize: 13, color: beaufortColor(bf.b), marginTop: 2 }}>
                  Beaufort {bf.b} — {bf.label}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <WindArrow deg={dayHours[Math.floor(dayHours.length / 2)]?.dir || 0} size={40} />
                <div style={{ fontSize: 11, color: '#60a5fa', marginTop: 4 }}>
                  {degToDir(dayHours[Math.floor(dayHours.length / 2)]?.dir || 0)}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                { label: '💨 Maks Rüzgar', val: `${Math.max(...dayHours.map(h => h.wind)).toFixed(0)} km/h` },
                { label: '💥 Maks Esinti', val: `${maxGust.toFixed(0)} km/h` },
                { label: '🌡️ His Sıcaklık', val: `${(dayHours.reduce((s, h) => s + h.temp, 0) / dayHours.length).toFixed(0)}°C` },
              ].map((s, i) => (
                <div key={i} style={{ background: '#374151', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: '#6b7280' }}>{s.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity scores */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            {[
              { label: '🎣 Balıkçılık', score: scores.fishing, icon: '🎣' },
              { label: '⛵ Tekne', score: scores.boating, icon: '⛵' },
            ].map((a, i) => {
              const col = a.score >= 70 ? '#22c55e' : a.score >= 40 ? '#f59e0b' : '#ef4444';
              return (
                <div key={i} style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: `1px solid ${col}33`, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>{a.label}</div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: col }}>{a.score}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>/ 100</div>
                  <div style={{ fontSize: 11, color: col, marginTop: 4 }}>
                    {a.score >= 70 ? 'Uygun' : a.score >= 40 ? 'Dikkatli' : 'Önerilmez'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hourly wind chart */}
          <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>💨 SAATLIK RÜZGAR</div>
            {dayHours.map((h, i) => {
              const bf2 = beaufort(h.wind);
              const col = beaufortColor(bf2.b);
              const pct = Math.min(100, (h.wind / 80) * 100);
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 34, fontSize: 10, color: '#6b7280', flexShrink: 0 }}>
                    {h.time.getHours().toString().padStart(2, '0')}:00
                  </div>
                  <WindArrow deg={h.dir} size={14} />
                  <div style={{ flex: 1, background: '#374151', borderRadius: 4, height: 6 }}>
                    <div style={{ width: `${pct}%`, height: 6, borderRadius: 4, background: col }} />
                  </div>
                  <div style={{ width: 58, fontSize: 10, color: col, fontWeight: 700, textAlign: 'right', flexShrink: 0 }}>
                    {h.wind.toFixed(0)} km/h
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
