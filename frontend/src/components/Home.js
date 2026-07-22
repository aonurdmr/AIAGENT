import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const QUICK_ACTIONS = [
  { icon: '🔍', label: 'AI Tanımla', desc: 'Tür tanımlama', path: '/tani', color: '#22c55e' },
  { icon: '🗺️', label: 'Harita',     desc: 'Nokta bul',     path: '/harita', color: '#3b82f6' },
  { icon: '💬', label: 'AI Asistan', desc: 'Soru sor',       path: '/ai-asistan', color: '#8b5cf6' },
  { icon: '📋', label: 'Aktivite',   desc: 'Kayıt tut',      path: '/aktivite', color: '#f59e0b' },
];

const WEATHER_ICONS = { 'Açık': '☀️', 'Parçalı bulutlu': '⛅', 'Bulutlu': '☁️', 'Hafif yağmur': '🌦️' };

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total_spots: 0, total_activities: 0, total_posts: 0, active_users: 0, species_identified: 0 });
  const [weather, setWeather] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/stats`).then(r => setStats(r.data)).catch(() => {}),
      axios.post(`${API}/weather`, { lat: 41.0, lng: 29.0, activity: 'fishing' }).then(r => setWeather(r.data)).catch(() => {}),
      axios.get(`${API}/posts?limit=3`).then(r => setPosts(r.data)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const scoreColor = (s) => s >= 75 ? '#22c55e' : s >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="page fade-in">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #0a2e0a 0%, #0f1f0f 50%, #122212 100%)',
        padding: '52px 20px 24px',
        borderBottom: '1px solid #22c55e22',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, #22c55e15, transparent 70%)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, boxShadow: '0 4px 16px #22c55e44',
          }}>🎣</div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>DoğaAI</h1>
            <p style={{ color: '#86efac', fontSize: 13 }}>Akıllı Outdoor Platformu</p>
          </div>
        </div>

        <p style={{ color: '#a0c4a0', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
          Balıkçılık, avcılık ve kamp için yapay zeka destekli rehberiniz.
        </p>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {QUICK_ACTIONS.map(a => (
            <button key={a.path} onClick={() => navigate(a.path)} style={{
              background: '#1a2e1a', border: `1px solid ${a.color}33`,
              borderRadius: 14, padding: '14px 12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s',
            }}>
              <span style={{
                fontSize: 22, width: 40, height: 40, borderRadius: 10,
                background: `${a.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{a.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#e2e8f0' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: '#4a6741' }}>{a.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>

        {/* Stats */}
        <div style={{ marginBottom: 16 }}>
          <div className="stat-grid">
            <div className="stat-card"><div className="num">{stats.total_spots}</div><div className="label">Nokta</div></div>
            <div className="stat-card"><div className="num">{(stats.species_identified / 1000).toFixed(1)}K</div><div className="label">Tür Tanındı</div></div>
            <div className="stat-card"><div className="num">{(stats.active_users / 1000).toFixed(1)}K</div><div className="label">Kullanıcı</div></div>
          </div>
        </div>

        {/* Weather Card */}
        {weather && (
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: '#4a6741', marginBottom: 2 }}>🌤️ BUGÜN HAVA</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>
                  {WEATHER_ICONS[weather.conditions] || '🌡️'} {weather.temperature}°C
                </div>
                <div style={{ fontSize: 12, color: '#86efac', marginTop: 2 }}>
                  {weather.conditions} · 💨 {weather.wind_speed} km/s · 🌊 %{weather.humidity}
                </div>
              </div>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                border: `3px solid ${scoreColor(weather.activity_score)}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: scoreColor(weather.activity_score) }}>
                  {weather.activity_score}
                </span>
                <span style={{ fontSize: 9, color: '#4a6741' }}>SKOR</span>
              </div>
            </div>
            {weather.tips.length > 0 && (
              <div style={{ fontSize: 12, color: '#86efac', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>💡</span> {weather.tips[0]}
              </div>
            )}
            <button className="btn-ghost" style={{ marginTop: 10, width: '100%', fontSize: 12 }}
              onClick={() => navigate('/harita')}>
              Hava + Nokta Haritası Gör →
            </button>
          </div>
        )}

        {/* Activity categories */}
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Kategori Seç</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { icon: '🎣', label: 'Balıkçılık', q: 'fishing' },
              { icon: '🏹', label: 'Avcılık', q: 'hunting' },
              { icon: '⛺', label: 'Kamp', q: 'camping' },
              { icon: '🦋', label: 'Doğa', q: 'wildlife' },
            ].map(c => (
              <button key={c.q} onClick={() => navigate(`/harita?type=${c.q}`)} style={{
                background: '#1a2e1a', border: '1px solid #22c55e22', borderRadius: 12,
                padding: '12px 6px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: 22 }}>{c.icon}</div>
                <div style={{ fontSize: 10, color: '#86efac', marginTop: 4, fontWeight: 600 }}>{c.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent community posts */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>Topluluktan</h3>
            <button className="btn-ghost" style={{ fontSize: 11, padding: '4px 10px' }}
              onClick={() => navigate('/topluluk')}>Tümü →</button>
          </div>
          {posts.slice(0, 2).map(post => (
            <div key={post.id} className="post-card" style={{ marginBottom: 8, padding: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div className="post-avatar" style={{ background: post.avatar_color }}>
                  {post.username[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 2 }}>{post.title}</div>
                  <div style={{ fontSize: 12, color: '#4a6741', marginBottom: 4 }}>@{post.username} · {post.location}</div>
                  <div style={{ fontSize: 12, color: '#a0c4a0', lineHeight: 1.5 }}>
                    {post.content.length > 80 ? post.content.slice(0, 80) + '…' : post.content}
                  </div>
                  <div style={{ fontSize: 11, color: '#4a6741', marginTop: 6 }}>❤️ {post.likes} beğeni</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Assistant promo */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a3a, #12122a)',
          border: '1px solid #8b5cf633', borderRadius: 16, padding: 16, marginBottom: 16,
        }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🤖</div>
          <div style={{ fontWeight: 700, color: '#c4b5fd', fontSize: 14, marginBottom: 4 }}>DoğaAI Asistanı</div>
          <div style={{ fontSize: 12, color: '#a0a0c0', marginBottom: 12, lineHeight: 1.5 }}>
            Balık türleri, av mevsimleri, kamp yerleri, ekipman tavsiyeleri ve daha fazlası için sorun.
          </div>
          <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}
            onClick={() => navigate('/ai-asistan')}>
            AI ile Konuş →
          </button>
        </div>

      </div>
    </div>
  );
}
