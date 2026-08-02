import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const CITIES = [
  { id: 'istanbul',  name: 'İstanbul',  region: 'Marmara' },
  { id: 'ankara',    name: 'Ankara',    region: 'İç Anadolu' },
  { id: 'izmir',     name: 'İzmir',     region: 'Ege' },
  { id: 'antalya',   name: 'Antalya',   region: 'Akdeniz' },
  { id: 'trabzon',   name: 'Trabzon',   region: 'Karadeniz' },
  { id: 'erzurum',   name: 'Erzurum',   region: 'Doğu Anadolu' },
];

const MONTHLY_AVG = {
  istanbul: {
    temp:  [6,  7, 10, 15, 20, 25, 28, 28, 24, 19, 13, 8],
    rain:  [90, 72, 68, 42, 28, 18, 18, 28, 44, 72, 100, 110],
    sun:   [3,  4,  5,  7,  9, 11, 12, 11, 9,  6,  4,  3],
    fish:  [55, 55, 60, 65, 72, 80, 85, 82, 78, 70, 60, 52],
  },
  ankara: {
    temp:  [0,  2,  7, 13, 18, 22, 26, 26, 21, 14,  7, 2],
    rain:  [38, 34, 35, 38, 48, 34, 14, 10, 18, 30, 36, 40],
    sun:   [3,  4,  5,  7,  9, 11, 12, 12, 10, 7,  4,  3],
    fish:  [40, 42, 50, 60, 72, 78, 80, 80, 72, 60, 48, 38],
  },
  izmir: {
    temp:  [9, 10, 13, 18, 23, 28, 32, 32, 27, 21, 15, 11],
    rain:  [130, 90, 70, 35, 15, 5, 2, 2, 16, 55, 105, 140],
    sun:   [4,  5,  6,  8, 10, 12, 13, 13, 11, 8,  5,  4],
    fish:  [60, 62, 68, 72, 80, 88, 92, 90, 82, 72, 64, 58],
  },
  antalya: {
    temp:  [10, 11, 14, 19, 24, 29, 33, 33, 28, 22, 16, 12],
    rain:  [230, 165, 90, 35, 12, 3, 1, 2, 12, 60, 145, 250],
    sun:   [5,  6,  7,  9, 11, 13, 13, 13, 11, 8,  6,  5],
    fish:  [65, 65, 70, 75, 82, 90, 92, 90, 83, 74, 66, 62],
  },
  trabzon: {
    temp:  [7,  7, 10, 14, 18, 22, 25, 26, 22, 17, 13, 9],
    rain:  [80, 65, 62, 58, 60, 56, 42, 52, 80, 100, 105, 95],
    sun:   [2,  3,  4,  5,  6,  7,  8,  8,  7,  5,  3,  2],
    fish:  [50, 52, 58, 65, 72, 78, 82, 80, 73, 65, 55, 48],
  },
  erzurum: {
    temp:  [-9, -8, -2, 8, 14, 18, 22, 22, 17, 10, 2, -5],
    rain:  [30, 28, 32, 42, 50, 38, 22, 18, 22, 32, 38, 32],
    sun:   [3,  4,  5,  6,  8,  10, 11, 11, 9,  7,  4,  3],
    fish:  [30, 32, 40, 58, 70, 80, 82, 80, 70, 58, 40, 28],
  },
};

const MONTHS_TR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

function TempChart({ data, color }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 320, H = 80, PAD = 20;
  const step = (W - PAD * 2) / 11;

  const pts = data.map((v, i) => {
    const x = PAD + i * step;
    const y = H - PAD - ((v - min) / range) * (H - PAD * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 80 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = PAD + i * step;
        const y = H - PAD - ((v - min) / range) * (H - PAD * 2);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill={color} />
            <text x={x} y={y - 6} textAnchor="middle" fontSize="8" fill="#9ca3af">{v}°</text>
          </g>
        );
      })}
    </svg>
  );
}

function RainChart({ data }) {
  const max = Math.max(...data);
  const W = 320, H = 80, PAD = 10;
  const barW = (W - PAD * 2) / 12 - 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 80 }}>
      {data.map((v, i) => {
        const bh = (v / max) * (H - PAD * 2);
        const x = PAD + i * ((W - PAD * 2) / 12) + 1;
        const y = H - PAD - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx="2" fill="#06b6d4" opacity="0.7" />
            {v > 50 && <text x={x + barW / 2} y={y - 3} textAnchor="middle" fontSize="7" fill="#06b6d4">{v}</text>}
          </g>
        );
      })}
    </svg>
  );
}

function FishScoreChart({ data }) {
  const max = 100;
  const W = 320, H = 60, PAD = 10;
  const barW = (W - PAD * 2) / 12 - 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 60 }}>
      {data.map((v, i) => {
        const bh = (v / max) * (H - PAD);
        const x = PAD + i * ((W - PAD * 2) / 12) + 1;
        const y = H - PAD - bh;
        const col = v >= 80 ? '#22c55e' : v >= 65 ? '#f59e0b' : '#ef4444';
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx="2" fill={col} opacity="0.85" />
          </g>
        );
      })}
    </svg>
  );
}

export default function WeatherTrends() {
  const navigate  = useNavigate();
  const [city, setCity] = useState('istanbul');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API}/hava`);
      if (resp.ok) setWeather(await resp.json());
    } catch (_) {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchWeather(); }, [fetchWeather]);

  const data = MONTHLY_AVG[city];
  const now  = new Date().getMonth(); // 0-indexed
  const bestMonth = data.fish.indexOf(Math.max(...data.fish));

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 80 }}>
      <div style={{ padding: '20px 16px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📈 Hava Durumu Trendleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Aylık ortalamalar ve balıkçılık skoru</div>
      </div>

      {weather && (
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e3a5f 0%, #1f2937 100%)',
            border: '1px solid #374151', borderRadius: 16, padding: 16,
          }}>
            <div style={{ fontSize: 13, color: '#7dd3fc', fontWeight: 600, marginBottom: 8 }}>CANLI HAVA</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#f9fafb' }}>{weather.temp ?? '--'}°C</div>
                <div style={{ fontSize: 13, color: '#9ca3af' }}>{weather.condition ?? ''}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#9ca3af' }}>💨 {weather.wind_speed ?? '--'} km/h</div>
                <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>💧 %{weather.humidity ?? '--'}</div>
                <div style={{ fontSize: 13, color: '#22c55e', marginTop: 4, fontWeight: 600 }}>Skor: {weather.activity_score ?? '--'}/100</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8, fontWeight: 600 }}>ŞEHİR SEÇ</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CITIES.map(c => (
            <button key={c.id} onClick={() => setCity(c.id)} style={{
              background: city === c.id ? '#3b82f6' : '#1f2937',
              color: city === c.id ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: city === c.id ? '#3b82f6' : '#374151',
              borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>
              {c.name}
              <span style={{ fontSize: 10, color: city === c.id ? '#bfdbfe' : '#6b7280', marginLeft: 4 }}>{c.region}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{
          background: '#064e3b', border: '1px solid #059669',
          borderRadius: 12, padding: '10px 14px', marginBottom: 16, fontSize: 13,
          color: '#6ee7b7',
        }}>
          🎣 <strong>{CITIES.find(c => c.id === city)?.name}</strong> için en iyi ay: <strong>{MONTHS_TR[bestMonth]}</strong>
          {' · '}Şu anki ay: <strong style={{ color: data.fish[now] >= 70 ? '#22c55e' : '#f59e0b' }}>{MONTHS_TR[now]} ({data.fish[now]}/100)</strong>
        </div>

        <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 12, border: '1px solid #374151' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>🌡️ Aylık Sıcaklık Ortalaması (°C)</div>
          </div>
          <TempChart data={data.temp} color="#f97316" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {MONTHS_TR.map((m, i) => (
              <div key={i} style={{ fontSize: 8, color: i === now ? '#f97316' : '#6b7280', fontWeight: i === now ? 700 : 400, textAlign: 'center', flex: 1 }}>{m}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 12, border: '1px solid #374151' }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🌧️ Aylık Yağış Ortalaması (mm)</div>
          <RainChart data={data.rain} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {MONTHS_TR.map((m, i) => (
              <div key={i} style={{ fontSize: 8, color: i === now ? '#06b6d4' : '#6b7280', fontWeight: i === now ? 700 : 400, textAlign: 'center', flex: 1 }}>{m}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 12, border: '1px solid #374151' }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>🎣 Aylık Balıkçılık Skoru</div>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
            <span style={{ color: '#22c55e' }}>■</span> Yüksek (≥80)
            <span style={{ color: '#f59e0b', marginLeft: 8 }}>■</span> Orta (65–79)
            <span style={{ color: '#ef4444', marginLeft: 8 }}>■</span> Düşük (&lt;65)
          </div>
          <FishScoreChart data={data.fish} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {MONTHS_TR.map((m, i) => (
              <div key={i} style={{ fontSize: 8, color: i === now ? '#22c55e' : '#6b7280', fontWeight: i === now ? 700 : 400, textAlign: 'center', flex: 1 }}>{m}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151' }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>☀️ Günlük Güneş Saati</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
            {data.sun.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ fontSize: 9, color: '#fbbf24' }}>{v}h</div>
                <div style={{
                  width: '100%', height: v * 4,
                  background: `hsl(${40 + v * 3}, 90%, 60%)`, borderRadius: 3, opacity: 0.85,
                }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {MONTHS_TR.map((m, i) => (
              <div key={i} style={{ fontSize: 8, color: i === now ? '#fbbf24' : '#6b7280', fontWeight: i === now ? 700 : 400, textAlign: 'center', flex: 1 }}>{m}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
