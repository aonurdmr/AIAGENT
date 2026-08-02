import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

// WMO weather code → icon
function wmoIcon(code) {
  if (code === 0)  return '☀️';
  if (code <= 2)   return '🌤️';
  if (code === 3)  return '☁️';
  if (code < 50)   return '🌫️';
  if (code < 60)   return '🌦️';
  if (code < 70)   return '🌧️';
  if (code < 80)   return '❄️';
  if (code < 85)   return '🌦️';
  return '⛈️';
}

function Gauge({ value, min, max, label, unit, color }) {
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const angle = -135 + pct * 270;
  const R = 44, cx = 50, cy = 55;
  const toXY = (deg) => {
    const r = (deg * Math.PI) / 180;
    return { x: cx + R * Math.cos(r), y: cy + R * Math.sin(r) };
  };
  const start = toXY(-135);
  const end   = toXY(angle);
  const large = pct * 270 > 180 ? 1 : 0;

  return (
    <div style={{ textAlign: 'center' }}>
      <svg viewBox="0 0 100 70" width="100%" style={{ maxWidth: 120 }}>
        {/* Track */}
        <path
          d={`M ${toXY(-135).x} ${toXY(-135).y} A ${R} ${R} 0 1 1 ${toXY(135).x} ${toXY(135).y}`}
          fill="none" stroke="#374151" strokeWidth="8" strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={`M ${start.x} ${start.y} A ${R} ${R} 0 ${large} 1 ${end.x} ${end.y}`}
          fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#f9fafb" fontSize="13" fontWeight="bold">
          {value}{unit}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#6b7280" fontSize="8">{label}</text>
      </svg>
    </div>
  );
}

function StatCard({ icon, label, value, unit, sub, color }) {
  return (
    <div style={{ background: '#1f2937', borderRadius: 14, padding: '14px 12px', border: '1px solid #374151' }}>
      <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}<span style={{ fontSize: 13, fontWeight: 400 }}>{unit}</span></div>
      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

const CITIES = [
  { name: 'İstanbul',  lat: 41.01, lng: 28.95 },
  { name: 'Ankara',    lat: 39.93, lng: 32.86 },
  { name: 'İzmir',     lat: 38.42, lng: 27.14 },
  { name: 'Antalya',   lat: 36.88, lng: 30.70 },
  { name: 'Trabzon',   lat: 41.00, lng: 39.72 },
  { name: 'Bursa',     lat: 40.19, lng: 29.07 },
];

// Estimate UV index from hour + season (no real API; rough heuristic)
function estimateUV(hour, month) {
  const peak = [1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2][month - 1] || 4;
  const sunFactor = Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI));
  return Math.round(peak * sunFactor * 10) / 10;
}

// Comfort index from temp + humidity
function comfortIndex(temp, hum) {
  const hi = temp - 0.55 * (1 - hum / 100) * (temp - 14.5);
  if (hi < 16) return { label: 'Soğuk', color: '#60a5fa' };
  if (hi < 24) return { label: 'Konforlu', color: '#34d399' };
  if (hi < 32) return { label: 'Sıcak', color: '#f59e0b' };
  return { label: 'Bunaltıcı', color: '#f87171' };
}

function windDir(speed) {
  if (speed < 2)  return { label: 'Sakin', icon: '🍃' };
  if (speed < 10) return { label: 'Hafif esinti', icon: '💨' };
  if (speed < 25) return { label: 'Orta rüzgar', icon: '🌬️' };
  if (speed < 40) return { label: 'Kuvvetli', icon: '⚠️' };
  return { label: 'Fırtına', icon: '🌪️' };
}

function activityLabel(score) {
  if (score >= 85) return { label: 'Mükemmel', color: '#34d399' };
  if (score >= 65) return { label: 'İyi', color: '#86efac' };
  if (score >= 45) return { label: 'Orta', color: '#f59e0b' };
  return { label: 'Düşük', color: '#f87171' };
}

export default function WeatherStation() {
  const navigate = useNavigate();
  const [cityIdx, setCityIdx] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const city = CITIES[cityIdx];

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API}/hava?lat=${city.lat}&lng=${city.lng}`);
      if (resp.ok) {
        const d = await resp.json();
        setData(d);
        setLastUpdate(new Date());
      }
    } catch (_) {}
    setLoading(false);
  }, [city]);

  useEffect(() => { load(); }, [load]);

  const now = new Date();
  const uv = data ? estimateUV(now.getHours(), now.getMonth() + 1) : 0;
  const comfort = data ? comfortIndex(data.temp, data.humidity) : null;
  const wind = data ? windDir(data.wind_speed) : null;
  const activity = data ? activityLabel(data.activity_score) : null;

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌡️ Hava İstasyonu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Canlı hava verileri ve aktivite skoru</div>
      </div>

      {/* City selector */}
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8 }}>
        {CITIES.map((c, i) => (
          <button key={c.name} onClick={() => setCityIdx(i)} style={{
            background: cityIdx === i ? '#3b82f6' : '#1f2937',
            color: cityIdx === i ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: cityIdx === i ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600,
            whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
          }}>{c.name}</button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
          <div style={{ fontSize: 32, marginBottom: 8, animation: 'spin 1s linear infinite' }}>🔄</div>
          <div>Hava verisi yükleniyor…</div>
        </div>
      )}

      {data && !loading && (
        <>
          {/* Main hero */}
          <div style={{ margin: '0 16px 14px', background: 'linear-gradient(135deg,#1e3a5f,#1e40af)', borderRadius: 18, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600 }}>{city.name} · ŞU AN</div>
                <div style={{ fontSize: 52, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>{data.temp}°</div>
                <div style={{ fontSize: 15, color: '#bfdbfe', marginTop: 4 }}>{data.condition}</div>
              </div>
              <div style={{ fontSize: 56 }}>{wmoIcon(data.code || 0)}</div>
            </div>

            <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#93c5fd' }}>Nem</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{data.humidity}%</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#93c5fd' }}>Rüzgar</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{data.wind_speed} km/h</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#93c5fd' }}>Basınç</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{data.pressure} hPa</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#93c5fd' }}>Aktivite</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: activity.color }}>{data.activity_score}</div>
              </div>
            </div>
          </div>

          {/* Gauges row */}
          <div style={{ margin: '0 16px 14px', background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>GÖSTERGELER</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <Gauge value={data.temp} min={-10} max={45} label="Sıcaklık" unit="°" color="#f59e0b" />
              <Gauge value={data.humidity} min={0} max={100} label="Nem" unit="%" color="#06b6d4" />
              <Gauge value={Math.min(data.wind_speed, 80)} min={0} max={80} label="Rüzgar" unit="" color="#a855f7" />
            </div>
          </div>

          {/* Detail cards */}
          <div style={{ margin: '0 16px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <StatCard icon="🌡️" label="Hissedilen" value={data.temp - 2} unit="°C" color="#f59e0b"
              sub={comfort.label} />
            <StatCard icon="💧" label="Nem" value={data.humidity} unit="%" color="#06b6d4"
              sub={data.humidity > 70 ? 'Yüksek nem' : data.humidity < 30 ? 'Kuru hava' : 'Normal'} />
            <StatCard icon="☀️" label="UV İndeksi" value={uv} unit="" color={uv < 3 ? '#34d399' : uv < 6 ? '#f59e0b' : '#f87171'}
              sub={uv < 3 ? 'Düşük' : uv < 6 ? 'Orta' : uv < 8 ? 'Yüksek' : 'Çok Yüksek'} />
            <StatCard icon={wind.icon} label="Rüzgar" value={data.wind_speed} unit=" km/h" color="#a855f7"
              sub={wind.label} />
          </div>

          {/* Activity score bar */}
          <div style={{ margin: '0 16px 14px', background: '#1f2937', borderRadius: 14, padding: '14px 16px', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>🎣 AKTİVİTE SKORU</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: activity.color }}>{activity.label}</div>
            </div>
            <div style={{ background: '#374151', borderRadius: 8, height: 10, overflow: 'hidden' }}>
              <div style={{
                width: `${data.activity_score}%`, height: '100%',
                background: `linear-gradient(90deg,${activity.color}88,${activity.color})`,
                borderRadius: 8, transition: 'width 0.8s ease',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: '#6b7280' }}>
              <span>0</span><span>50</span><span>100</span>
            </div>
          </div>

          {/* Pressure trend */}
          <div style={{ margin: '0 16px 14px', background: '#1f2937', borderRadius: 14, padding: '14px 16px', border: '1px solid #374151' }}>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>📊 BASINÇ</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#f9fafb' }}>{data.pressure} <span style={{ fontSize: 13, fontWeight: 400, color: '#6b7280' }}>hPa</span></div>
              <div style={{ fontSize: 12, color: data.pressure > 1013 ? '#34d399' : '#f87171', fontWeight: 600 }}>
                {data.pressure > 1013 ? '↑ Yüksek basınç — iyi hava' : data.pressure > 1000 ? '→ Normal' : '↓ Düşük basınç — kötü hava olabilir'}
              </div>
            </div>
          </div>

          {/* Last update */}
          <div style={{ textAlign: 'center', fontSize: 11, color: '#4b5563', marginBottom: 8 }}>
            Son güncelleme: {lastUpdate?.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            {' · '}
            <button onClick={load} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: 11, padding: 0 }}>Yenile</button>
          </div>
        </>
      )}
    </div>
  );
}
