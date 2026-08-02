import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const COND_ICON = { 'Açık': '☀️', 'Parçalı bulutlu': '⛅', 'Bulutlu': '☁️', 'Hafif yağmur': '🌦️' };
const MOON_ICON = {
  'Yeni Ay': '🌑', 'İlk Dördün': '🌓', 'Dolunay': '🌕', 'Son Dördün': '🌗',
};

const ACTIVITIES = [
  { id: 'fishing', icon: '🎣', label: 'Balıkçılık' },
  { id: 'hunting', icon: '🏹', label: 'Avcılık' },
  { id: 'camping', icon: '⛺', label: 'Kamp' },
];

const LOCATIONS = [
  { label: 'İstanbul',  lat: 41.0, lng: 29.0 },
  { label: 'Ankara',    lat: 39.9, lng: 32.9 },
  { label: 'Sapanca',   lat: 40.7, lng: 30.3 },
  { label: 'Abant',     lat: 40.6, lng: 31.3 },
  { label: 'Keban',     lat: 38.8, lng: 38.7 },
  { label: 'Mogan',     lat: 39.8, lng: 32.8 },
];

function ScoreArc({ score }) {
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#fbbf24' : '#f87171';
  const label = score >= 75 ? 'Mükemmel' : score >= 50 ? 'Orta' : 'Kötü';
  const pct = score / 100;
  const r = 42;
  const cx = 54;
  const cy = 54;
  const arc = 2 * Math.PI * r * 0.75;
  const offset = arc * (1 - pct);
  return (
    <div style={{ textAlign: 'center', marginBottom: 20 }}>
      <svg width={108} height={108} style={{ transform: 'rotate(-135deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--s3)" strokeWidth={10}
          strokeDasharray={`${arc} ${2 * Math.PI * r}`} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={`${arc} ${2 * Math.PI * r}`}
          strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div style={{ marginTop: -70, fontSize: 26, fontWeight: 800, color }}>
        {score}
      </div>
      <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 2 }}>{label}</div>
      <div style={{ fontSize: 10, color: 'var(--t-mute)' }}>/ 100 puan</div>
    </div>
  );
}

function StatPill({ icon, value, label, color = 'var(--a-light)' }) {
  return (
    <div style={{
      background: 'var(--s2)', border: '1px solid var(--border)',
      borderRadius: 14, padding: '12px 14px', textAlign: 'center',
    }}>
      <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontWeight: 800, fontSize: 18, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--t-mute)', marginTop: 3, letterSpacing: '.04em' }}>{label}</div>
    </div>
  );
}

export default function WeatherDetail() {
  const [activity, setActivity] = useState('fishing');
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [weather, setWeather]   = useState(null);
  const [loading, setLoading]   = useState(false);

  const fetchWeather = useCallback(async (act, loc) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/weather`, {
        lat: loc.lat, lng: loc.lng, activity: act,
      });
      setWeather(data);
    } catch { }
    setLoading(false);
  }, []);

  useEffect(() => { fetchWeather(activity, location); }, [activity, location, fetchWeather]);

  return (
    <div className="page fade-in">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #010d01 0%, #0a2e0a 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🌡️ Hava Durumu</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Aktivite bazlı hava skoru</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Activity selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
          {ACTIVITIES.map(a => (
            <button key={a.id} onClick={() => setActivity(a.id)} style={{
              padding: '12px 8px', borderRadius: 14, textAlign: 'center', cursor: 'pointer',
              background: activity === a.id ? 'var(--a-glow)' : 'var(--s2)',
              border: activity === a.id ? '1px solid var(--border-lg)' : '1px solid var(--border)',
              transition: 'all .2s',
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{a.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: activity === a.id ? 'var(--a-light)' : 'var(--t-mute)' }}>
                {a.label}
              </div>
            </button>
          ))}
        </div>

        {/* Location selector */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 8, fontWeight: 700, letterSpacing: '.08em' }}>
            KONUM SEÇ
          </div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
            {LOCATIONS.map(loc => (
              <button key={loc.label} onClick={() => setLocation(loc)} style={{
                padding: '6px 14px', borderRadius: 20, whiteSpace: 'nowrap', cursor: 'pointer',
                background: location.label === loc.label ? 'var(--a-glow)' : 'var(--s2)',
                border: location.label === loc.label ? '1px solid var(--border-lg)' : '1px solid var(--border)',
                color: location.label === loc.label ? 'var(--a-light)' : 'var(--t-mute)',
                fontSize: 12, fontWeight: 600, transition: 'all .2s',
              }}>{loc.label}</button>
            ))}
          </div>
        </div>

        {/* Main weather card */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
            <div className="spinner" />
          </div>
        ) : weather && (
          <div className="fade-in">
            {/* Current conditions */}
            <div className="card" style={{ marginBottom: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 52, marginBottom: 8 }}>
                {COND_ICON[weather.conditions] || '🌡️'}
              </div>
              <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-.04em', color: '#fff', lineHeight: 1 }}>
                {weather.temperature}°C
              </div>
              <div style={{ fontSize: 14, color: 'var(--a-light)', marginTop: 6 }}>
                {weather.conditions}
              </div>
              <div style={{ fontSize: 12, color: 'var(--t-mute)', marginTop: 4 }}>
                📍 {location.label}
              </div>
            </div>

            {/* Score arc */}
            <div className="card" style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 12, textAlign: 'center' }}>
                {ACTIVITIES.find(a => a.id === activity)?.icon} {ACTIVITIES.find(a => a.id === activity)?.label} SKORU
              </div>
              <ScoreArc score={weather.activity_score} />
              {weather.best_time && (
                <div style={{
                  background: 'var(--s3)', borderRadius: 10, padding: '8px 12px',
                  fontSize: 12, color: 'var(--t-mid)', textAlign: 'center',
                  border: '1px solid var(--border)',
                }}>
                  ⏰ En iyi saat: <strong style={{ color: 'var(--a-light)' }}>{weather.best_time}</strong>
                </div>
              )}
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 14 }}>
              <StatPill icon="💨" value={`${weather.wind_speed} km/s`} label="RÜZGAR" color="#93c5fd" />
              <StatPill icon="💧" value={`%${weather.humidity}`} label="NEM" color="#67e8f9" />
              <StatPill icon="🌡️" value={`${weather.feels_like}°C`} label="HİSSEDİLEN" color="#fca5a5" />
              <StatPill icon="📊" value={`${weather.pressure} hPa`} label="BASINÇ" color="#c4b5fd" />
            </div>

            {/* Moon phase */}
            <div className="card" style={{ marginBottom: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ fontSize: 42, flexShrink: 0 }}>
                {MOON_ICON[weather.moon_phase] || '🌙'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{weather.moon_phase}</div>
                <div style={{ fontSize: 12, color: 'var(--t-mute)', marginTop: 2 }}>
                  Ay fazı balıkçılık için {weather.moon_phase === 'Dolunay' ? 'çok iyi 🌟' : 'uygun'}
                </div>
              </div>
            </div>

            {/* Warning */}
            {weather.warning && (
              <div style={{
                background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.2)',
                borderRadius: 12, padding: '12px 14px', marginBottom: 14,
                display: 'flex', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
                <div style={{ fontSize: 13, color: '#fde68a', lineHeight: 1.5 }}>{weather.warning}</div>
              </div>
            )}

            {/* AI Tips */}
            {weather.tips?.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
                  💡 AI ÖNERİLERİ
                </div>
                {weather.tips.map((tip, i) => (
                  <div key={i} style={{
                    background: 'var(--s2)', border: '1px solid var(--border)',
                    borderRadius: 12, padding: '10px 14px', marginBottom: 8,
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{['🎯', '📍', '⚡'][i] || '💡'}</span>
                    <span style={{ fontSize: 13, color: 'var(--t-mid)', lineHeight: 1.5 }}>{tip}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Refresh */}
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', marginBottom: 14 }}
              onClick={() => fetchWeather(activity, location)}>
              🔄 Güncelle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
