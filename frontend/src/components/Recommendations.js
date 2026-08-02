import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const ACTIVITIES = [
  { id: 'fishing', icon: '🎣', label: 'Balıkçılık', color: '#3b82f6' },
  { id: 'hunting', icon: '🏹', label: 'Avcılık',   color: '#ef4444' },
  { id: 'camping', icon: '⛺', label: 'Kamp',       color: '#22c55e' },
];

const LOCATIONS = [
  { label: 'İstanbul',  lat: 41.0, lng: 29.0 },
  { label: 'Ankara',    lat: 39.9, lng: 32.9 },
  { label: 'Sapanca',   lat: 40.7, lng: 30.3 },
  { label: 'Abant',     lat: 40.6, lng: 31.3 },
  { label: 'Keban',     lat: 38.8, lng: 38.7 },
  { label: 'İzmir',     lat: 38.4, lng: 27.1 },
];

const SCORE_COLOR = s => s >= 75 ? '#22c55e' : s >= 50 ? '#fbbf24' : '#f87171';

function ScoreBar({ score, color }) {
  return (
    <div style={{ height: 6, background: 'var(--s3)', borderRadius: 3, marginTop: 6 }}>
      <div style={{
        height: '100%', borderRadius: 3,
        width: `${score}%`, background: color,
        transition: 'width 1s ease',
      }} />
    </div>
  );
}

export default function Recommendations() {
  const navigate = useNavigate();
  const [activity, setActivity] = useState('fishing');
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/recommendations`, {
        params: { activity, lat: location.lat, lng: location.lng },
      });
      setResult(data);
    } catch { }
    setLoading(false);
  }, [activity, location]);

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #010d01 0%, #0a2e0a 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🤖 AI Öneri</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Bugün için en iyi noktaları keşfet</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Activity selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
          {ACTIVITIES.map(a => (
            <button key={a.id} onClick={() => setActivity(a.id)} style={{
              padding: '14px 8px', borderRadius: 14, textAlign: 'center', cursor: 'pointer',
              background: activity === a.id ? 'var(--a-glow)' : 'var(--s2)',
              border: activity === a.id ? '1px solid var(--border-lg)' : '1px solid var(--border)',
              transition: 'all .2s',
            }}>
              <div style={{ fontSize: 26, marginBottom: 4 }}>{a.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: activity === a.id ? 'var(--a-light)' : 'var(--t-mute)' }}>
                {a.label}
              </div>
            </button>
          ))}
        </div>

        {/* Location selector */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 8 }}>
            BULUNDUĞUN BÖLGE
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

        {/* Generate button */}
        <button className="btn-primary" onClick={fetch} disabled={loading} style={{ marginBottom: 14 }}>
          {loading ? '🤖 Analiz ediliyor…' : '🔍 En İyi Noktaları Bul'}
        </button>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div className="spinner" />
          </div>
        )}

        {result && !loading && (
          <div className="fade-in">

            {/* AI reasoning */}
            {result.ai_reason && (
              <div style={{
                background: 'rgba(34,197,94,.06)', border: '1px solid rgba(34,197,94,.15)',
                borderRadius: 14, padding: '12px 14px', marginBottom: 14,
                display: 'flex', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>🤖</span>
                <div style={{ fontSize: 13, color: 'var(--t-mid)', lineHeight: 1.5 }}>
                  {result.ai_reason}
                </div>
              </div>
            )}

            {/* Spot list */}
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
              🏆 BUGÜNKÜ EN İYİ NOKTALAR
            </div>
            {(result.spots || []).map((spot, i) => {
              const scoreColor = SCORE_COLOR(spot.final_score);
              const act = ACTIVITIES.find(a => a.id === spot.type) || ACTIVITIES[0];
              return (
                <div key={spot.id || i} style={{
                  background: i === 0 ? 'rgba(34,197,94,.06)' : 'var(--s2)',
                  border: `1px solid ${i === 0 ? 'rgba(34,197,94,.2)' : 'var(--border)'}`,
                  borderRadius: 14, padding: 14, marginBottom: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: 'var(--s3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 800, color: scoreColor,
                    }}>#{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>
                          {act.icon} {spot.name}
                        </div>
                        <div style={{
                          fontSize: 16, fontWeight: 800, color: scoreColor,
                          lineHeight: 1, flexShrink: 0, marginLeft: 8,
                        }}>{spot.final_score}</div>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 4 }}>
                        📍 {spot.region} · 🚗 ~{spot.distance_km}km
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 4 }}>
                        🌡️ {spot.temperature}°C · 💨 {spot.wind_speed}km/s · 🌙 {spot.moon}
                      </div>
                      {spot.species?.length > 0 && (
                        <div style={{ fontSize: 11, color: 'var(--a-light)' }}>
                          🐟 {spot.species.slice(0, 3).join(' · ')}
                        </div>
                      )}
                      <ScoreBar score={spot.final_score} color={scoreColor} />
                    </div>
                  </div>
                </div>
              );
            })}

            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', marginBottom: 14 }}
              onClick={() => navigate('/harita')}>
              🗺️ Haritada Göster →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
