import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const COND_ICON = { 'Açık': '☀️', 'Parçalı bulutlu': '⛅', 'Bulutlu': '☁️', 'Hafif yağmur': '🌦️' };
const SCORE_COLOR = s => s >= 75 ? '#34d399' : s >= 50 ? '#fbbf24' : '#f87171';

const ACTIONS = [
  { icon: '🔍', label: 'AI Tanımla', sub: 'Fotoğrafla tür bul', path: '/tani',       accent: '#22c55e' },
  { icon: '🤖', label: 'AI Ajanlar', sub: '11 uzman ajan',       path: '/ajanlar',    accent: '#c084fc' },
  { icon: '🗺️', label: 'Planlama',   sub: 'Seyahat planla',      path: '/planlama',   accent: '#06b6d4' },
  { icon: '📋', label: 'Aktivite',   sub: 'Kayıt tut',           path: '/aktivite',   accent: '#fbbf24' },
];

const TOOLS = [
  { icon: '📖', label: 'Tür Ansiklopedisi', sub: '12+ tür detayı',      path: '/turler',    accent: '#22c55e' },
  { icon: '🧠', label: 'NLP Araçları',      sub: 'Metin analizi',        path: '/nlp',       accent: '#f59e0b' },
  { icon: '🎨', label: 'Görsel Oluştur',    sub: 'AI ile doğa görseli',  path: '/gorsel',    accent: '#ec4899' },
  { icon: '🎒', label: 'Ekipman Takibi',    sub: 'Gear yönetimi',        path: '/ekipman',   accent: '#06b6d4' },
  { icon: '🏆', label: 'Liderboard',        sub: 'Topluluk sıralaması',  path: '/liderboard',accent: '#fbbf24' },
  { icon: '🔍', label: 'Global Arama',      sub: 'Tüm içerikte ara',     path: '/arama',     accent: '#a855f7' },
  { icon: '🌡️', label: 'Hava Durumu',       sub: 'Aktivite bazlı skor',  path: '/hava',      accent: '#38bdf8' },
  { icon: '📊', label: 'Analizler',         sub: 'Kişisel istatistikler', path: '/analiz',    accent: '#34d399' },
  { icon: '🏅', label: 'Başarılar',         sub: '12 başarı rozeti',       path: '/basarilar', accent: '#fbbf24' },
  { icon: '📅', label: 'Sezon Takvimi',     sub: 'Av ve balık sezonu',     path: '/takvim',    accent: '#f97316' },
  { icon: '📓', label: 'Hızlı Notlar',      sub: 'Saha gözlem notları',    path: '/notlar',    accent: '#a78bfa' },
  { icon: '⚙️', label: 'Ayarlar',           sub: 'Tercihler ve hesap',     path: '/ayarlar',   accent: '#94a3b8' },
  { icon: '🤖', label: 'AI Öneri',          sub: 'Bugün nereye gideyim?',  path: '/oneri',     accent: '#22c55e' },
  { icon: '✅', label: 'Kontrol Listesi',   sub: 'Seyahat hazırlığı',      path: '/kontrol',   accent: '#34d399' },
  { icon: '📄', label: 'Seyahat Raporu',   sub: 'AI ile trip özeti',       path: '/rapor',     accent: '#c084fc' },
  { icon: '🏆', label: 'Kupa Dolabı',      sub: 'Kişisel balık rekortları', path: '/kupalar',   accent: '#fbbf24' },
  { icon: '⚖️', label: 'Kilo Hesabı',     sub: 'Boy → ağırlık tahmini',    path: '/hesap',     accent: '#38bdf8' },
  { icon: '🪱', label: 'Yem Rehberi',     sub: 'Tür bazlı yem önerileri',  path: '/yem',       accent: '#84cc16' },
  { icon: '🌕', label: 'Ay Takvimi',      sub: 'Balıkçılık aktivite skoru', path: '/ay',        accent: '#fbbf24' },
  { icon: '🪢', label: 'Düğüm Rehberi',  sub: '9 temel balıkçı düğümü',   path: '/dugum',     accent: '#f97316' },
  { icon: '🍳', label: 'Balık Tarifleri', sub: 'Avını en güzel pişir',      path: '/tarifler',  accent: '#ef4444' },
  { icon: '⚔️', label: 'Tür Karşılaştır', sub: '8 türü yan yana karşılaştır', path: '/karsilastir', accent: '#a855f7' },
  { icon: '⚖️', label: 'Mevzuat',         sub: 'Boy limitleri ve yasal kurallar', path: '/kanun',    accent: '#94a3b8' },
  { icon: '🎣', label: 'Ekipman Seçici',  sub: 'Türe göre optimal setup',         path: '/setup',    accent: '#22c55e' },
  { icon: '📰', label: 'Günlük Brifing', sub: 'AI sabah balıkçılık raporu',       path: '/brifing',  accent: '#38bdf8' },
  { icon: '🏹', label: 'Av Takvimi',    sub: '8 av türü sezon ve kuralları',     path: '/av-takvim', accent: '#84cc16' },
  { icon: '⛺', label: 'Kamp Rehberi', sub: '10 kamp yeri + ekipman listesi',   path: '/kamp',      accent: '#22c55e' },
  { icon: '🥾', label: 'Doğa Yolları', sub: '10 yürüyüş rotası, filtreli',     path: '/rotalar',   accent: '#84cc16' },
  { icon: '🦅', label: 'Kuş Gözlemi', sub: '12 tür, 6 gözlem noktası',       path: '/kuslar',    accent: '#38bdf8' },
  { icon: '🌿', label: 'Bitki Rehberi', sub: 'Yenilebilir & zehirli bitkiler', path: '/bitkiler',  accent: '#22c55e' },
];

const CATS = [
  { icon: '🎣', label: 'Balık',  q: 'fishing' },
  { icon: '🏹', label: 'Av',     q: 'hunting' },
  { icon: '⛺', label: 'Kamp',   q: 'camping' },
  { icon: '🦋', label: 'Doğa',   q: 'wildlife' },
];

function WeatherScore({ score }) {
  const color = SCORE_COLOR(score);
  return (
    <div style={{
      width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
      border: `3px solid ${color}`,
      background: color + '12',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 0 16px ${color}33`,
    }}>
      <span style={{ fontWeight: 800, fontSize: 20, color, lineHeight: 1 }}>{score}</span>
      <span style={{ fontSize: 9, color: 'var(--t-mute)', letterSpacing: '.04em' }}>SKOR</span>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [stats,   setStats]   = useState(null);
  const [weather, setWeather] = useState(null);
  const [posts,   setPosts]   = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/stats`).then(r => setStats(r.data)).catch(() => {}),
      axios.post(`${API}/weather`, { lat: 41.0, lng: 29.0, activity: 'fishing' }).then(r => setWeather(r.data)).catch(() => {}),
      axios.get(`${API}/posts?limit=3`).then(r => setPosts(r.data)).catch(() => {}),
    ]);
  }, []);

  return (
    <div className="page fade-in">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(160deg, #051205 0%, #0a1a0a 55%, #0d1f0d 100%)',
        padding: '54px 20px 22px',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-mesh" />

        {/* App identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, position: 'relative' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 15,
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 60%, #15803d 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26,
            boxShadow: '0 4px 20px rgba(34,197,94,.4), 0 1px 0 rgba(255,255,255,.15) inset',
          }}>🎣</div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1 }}>
              DoğaAI
            </h1>
            <div style={{ fontSize: 12, color: 'var(--a-light)', opacity: .7, marginTop: 2 }}>
              Akıllı Outdoor Platformu
            </div>
          </div>
          {/* Live indicator */}
          <div style={{
            marginLeft: 'auto',
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.2)',
            borderRadius: 20, padding: '4px 10px',
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
              boxShadow: '0 0 6px #22c55e',
              animation: 'fadeIn 1s ease infinite alternate',
            }} />
            <span style={{ fontSize: 10, color: '#86efac', fontWeight: 600 }}>CANLI</span>
          </div>
        </div>

        {/* Quick action grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, position: 'relative' }}>
          {ACTIONS.map(a => (
            <button key={a.path} onClick={() => navigate(a.path)} style={{
              background: 'rgba(18,34,18,.7)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${a.accent}22`,
              borderRadius: 16, padding: '14px 12px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              transition: 'all .2s',
              textAlign: 'left',
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: a.accent + '18',
                border: `1px solid ${a.accent}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>{a.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-.01em' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 1 }}>{a.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* ── Stats ──────────────────────────────────────── */}
        {stats && (
          <div className="stat-grid" style={{ marginBottom: 14 }}>
            <div className="stat-card">
              <div className="num">{stats.total_spots}</div>
              <div className="label">Nokta</div>
            </div>
            <div className="stat-card">
              <div className="num">{(stats.species_identified / 1000).toFixed(1)}K</div>
              <div className="label">Tür Tanındı</div>
            </div>
            <div className="stat-card">
              <div className="num">{(stats.active_users / 1000).toFixed(1)}K</div>
              <div className="label">Kullanıcı</div>
            </div>
          </div>
        )}

        {/* ── Weather ────────────────────────────────────── */}
        {weather && (
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 3 }}>
                  ⛅ BUGÜN HAVA
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1 }}>
                  {COND_ICON[weather.conditions] || '🌡️'} {weather.temperature}°C
                </div>
                <div style={{ fontSize: 12, color: 'var(--a-light)', marginTop: 4 }}>
                  {weather.conditions} · 💨 {weather.wind_speed} km/s · 🌙 {weather.moon_phase}
                </div>
              </div>
              <WeatherScore score={weather.activity_score} />
            </div>
            {weather.tips?.[0] && (
              <div style={{
                background: 'var(--s1)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '8px 12px',
                fontSize: 12, color: 'var(--t-mid)', display: 'flex', gap: 6, alignItems: 'flex-start',
              }}>
                <span>💡</span><span style={{ lineHeight: 1.5 }}>{weather.tips[0]}</span>
              </div>
            )}
            {weather.warning && (
              <div style={{
                background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.2)',
                borderRadius: 10, padding: '6px 10px', marginTop: 6,
                fontSize: 12, color: '#fde68a', display: 'flex', gap: 6,
              }}>
                <span>⚠️</span>{weather.warning}
              </div>
            )}
            <button className="btn-ghost" style={{ marginTop: 10, width: '100%', justifyContent: 'center', fontSize: 12 }}
              onClick={() => navigate('/harita')}>
              Harita ve Noktaları Gör →
            </button>
          </div>
        )}

        {/* ── Phase 4 Tools ──────────────────────────────── */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
            AI ARAÇLARI
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TOOLS.map(t => (
              <button key={t.path} onClick={() => navigate(t.path)} style={{
                background: 'var(--s2)', border: `1px solid ${t.accent}18`,
                borderRadius: 14, padding: '12px 14px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                textAlign: 'left', transition: 'all .2s',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: t.accent + '18', border: `1px solid ${t.accent}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 1 }}>{t.sub}</div>
                </div>
                <span style={{ color: t.accent, fontSize: 16, opacity: .6 }}>→</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Category grid ──────────────────────────────── */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
            KATEGORİ SEÇ
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {CATS.map(c => (
              <button key={c.q} onClick={() => navigate(`/harita?type=${c.q}`)} style={{
                background: 'var(--s2)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '14px 6px',
                cursor: 'pointer', textAlign: 'center', transition: 'all .2s',
              }}>
                <div style={{ fontSize: 24, lineHeight: 1 }}>{c.icon}</div>
                <div style={{ fontSize: 10, color: 'var(--a-light)', marginTop: 5, fontWeight: 700, letterSpacing: '.04em' }}>
                  {c.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Community preview ──────────────────────────── */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em' }}>
              TOPLULUKTAN
            </div>
            <button className="btn-ghost" style={{ fontSize: 11, padding: '3px 10px' }}
              onClick={() => navigate('/topluluk')}>Tümü →</button>
          </div>
          {posts.slice(0, 2).map(post => (
            <div key={post.id} className="post-card" style={{ marginBottom: 8, padding: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div className="post-avatar" style={{ background: post.avatar_color }}>
                  {post.username[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 4 }}>
                    @{post.username}{post.location && ` · 📍 ${post.location}`}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--t-mid)', lineHeight: 1.5 }}>
                    {post.content.length > 90 ? post.content.slice(0, 90) + '…' : post.content}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 6 }}>❤️ {post.likes}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── AI Asistan promo ────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(15,12,40,.9), rgba(20,10,35,.9))',
          border: '1px solid rgba(192,132,252,.2)',
          borderRadius: 18, padding: 18, marginBottom: 14,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -20, right: -20,
            width: 100, height: 100, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,132,252,.12), transparent 70%)',
          }} />
          <div style={{ fontSize: 24, marginBottom: 8, position: 'relative' }}>🤖</div>
          <div style={{ fontWeight: 800, fontSize: 15, color: '#e9d5ff', marginBottom: 5, position: 'relative' }}>
            DoğaAI Asistanı
          </div>
          <div style={{ fontSize: 12, color: 'rgba(192,132,252,.7)', lineHeight: 1.6, marginBottom: 14, position: 'relative' }}>
            Balık türleri, av mevsimleri, kamp yerleri ve ekipman tavsiyeleri için GPT-4o destekli asistanınız.
          </div>
          <button
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', position: 'relative' }}
            onClick={() => navigate('/ai-asistan')}
          >
            AI ile Konuş →
          </button>
        </div>

      </div>
    </div>
  );
}
