import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const FAV_ICONS = { spot: '📍', post: '📝', species: '🐟' };

const BADGES_DEF = [
  { icon: '🎣', name: 'İlk Adım', desc: '1+ aktivite kaydet',     threshold: 1,  type: 'total' },
  { icon: '🌿', name: 'Doğa Sever', desc: '5+ aktivite kaydet',   threshold: 5,  type: 'total' },
  { icon: '🌟', name: 'Keşifçi',  desc: '10+ aktivite kaydet',    threshold: 10, type: 'total' },
  { icon: '🏆', name: 'Usta',     desc: '25+ aktivite kaydet',    threshold: 25, type: 'total' },
  { icon: '🎣', name: 'Balıkçı',  desc: '5+ balık aktivitesi',    threshold: 5,  type: 'fishing' },
  { icon: '⛺', name: 'Kampçı',   desc: '3+ kamp aktivitesi',     threshold: 3,  type: 'camping' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userStats, setUserStats] = useState(null);
  const [stats, setStats]         = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [tab, setTab]             = useState('stats');

  useEffect(() => {
    axios.get(`${API}/stats`).then(r => setStats(r.data)).catch(() => {});
    if (user?.id) {
      axios.get(`${API}/users/${user.id}/stats`).then(r => setUserStats(r.data)).catch(() => {});
      axios.get(`${API}/favorites`).then(r => setFavorites(r.data)).catch(() => {});
    }
  }, [user]);

  async function removeFavorite(fav) {
    try {
      await axios.post(`${API}/favorites`, {
        item_type: fav.item_type, item_id: fav.item_id, item_name: fav.item_name,
      });
      setFavorites(prev => prev.filter(f => f.id !== fav.id));
    } catch { }
  }

  const actCount  = userStats?.total_activities || 0;
  const fishCount = userStats?.type_counts?.fishing || 0;
  const huntCount = userStats?.type_counts?.hunting || 0;
  const campCount = userStats?.type_counts?.camping || 0;
  const speciesList = userStats?.top_species || [];

  const badges = BADGES_DEF.map(b => ({
    ...b,
    earned: b.type === 'total' ? actCount >= b.threshold
          : b.type === 'fishing' ? fishCount >= b.threshold
          : b.type === 'camping' ? campCount >= b.threshold
          : false,
  }));

  return (
    <div className="page fade-in">
      {/* Profile Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #0a2e0a 0%, #0f1f0f 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid #22c55e22',
        textAlign: 'center',
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, boxShadow: '0 4px 24px #22c55e44',
        }}>🏕️</div>

        <div style={{ marginBottom: 8 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{user?.full_name || user?.username || 'Outdoor Sever'}</h2>
          {user?.username && <div style={{ fontSize: 13, color: '#4a7a4a' }}>@{user.username}</div>}
          {user && (
            <button onClick={logout} style={{
              background: 'none', border: 'none', color: '#4a6741', fontSize: 12, cursor: 'pointer', marginTop: 4,
            }}>⬡ Çıkış Yap</button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {fishCount > 0 && <span className="tag tag-green">🎣 Balıkçı</span>}
          {campCount > 0 && <span className="tag tag-amber">⛺ Kampçı</span>}
          {actCount > 0 && <span className="tag tag-blue">🔍 Keşifçi</span>}
          {!user && <span className="tag tag-purple">👤 Misafir</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {[
            ['🎣', fishCount, 'Balık'],
            ['🏹', huntCount, 'Av'],
            ['⛺', campCount, 'Kamp'],
            ['📊', actCount, 'Toplam'],
          ].map(([ic, n, lb]) => (
            <div key={lb} style={{ background: '#1a2e1a', borderRadius: 10, padding: '10px 4px', border: '1px solid #22c55e22' }}>
              <div style={{ fontSize: 18 }}>{ic}</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#22c55e' }}>{n}</div>
              <div style={{ fontSize: 10, color: '#4a6741' }}>{lb}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>
        {/* Tab selector */}
        <div className="filter-tabs" style={{ marginBottom: 14 }}>
          {[
            ['stats',     '📊', 'İstatistik'],
            ['badges',    '🏆', 'Rozetler'],
            ['species',   '🐟', 'Türlerim'],
            ['favorites', '⭐', 'Favoriler'],
          ].map(([id, ic, lb]) => (
            <button key={id} className={`filter-tab ${tab === id ? 'active' : ''}`}
              onClick={() => setTab(id)}>{ic} {lb}</button>
          ))}
        </div>

        {tab === 'stats' && (
          <div className="fade-in">
            {stats && (
              <div className="card" style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginBottom: 10 }}>📊 Platform İstatistikleri</div>
                {[
                  ['🗺️ Toplam Nokta', stats.total_spots],
                  ['🐟 Tür Tanımlama', stats.species_identified],
                  ['👥 Aktif Kullanıcı', stats.active_users],
                  ['📝 Topluluk Paylaşımı', stats.total_posts],
                ].map(([lb, val]) => (
                  <div key={lb} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #22c55e11' }}>
                    <span style={{ fontSize: 13, color: '#a0c4a0' }}>{lb}</span>
                    <span style={{ fontWeight: 700, color: '#22c55e', fontSize: 14 }}>{val?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="card" style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginBottom: 10 }}>🌙 Hızlı Erişim</div>
              {[
                { icon: '🤖', label: 'AI Ajan Merkezi',    path: '/ajanlar' },
                { icon: '🗺️', label: 'Seyahat Planlamacı', path: '/planlama' },
                { icon: '🔍', label: 'AI Tür Tanımlama',   path: '/tani' },
                { icon: '📋', label: 'Aktivite Günlüğü',   path: '/aktivite' },
                { icon: '👥', label: 'Topluluk',            path: '/topluluk' },
              ].map(item => (
                <button key={item.path} onClick={() => navigate(item.path)} style={{
                  width: '100%', background: '#0f1f0f', border: '1px solid #22c55e11',
                  borderRadius: 10, padding: '10px 14px', color: '#e2e8f0', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, fontSize: 13, fontWeight: 500,
                }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span> {item.label}
                  <span style={{ marginLeft: 'auto', color: '#4a6741' }}>›</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'badges' && (
          <div className="fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {badges.map(badge => (
                <div key={badge.name} className="card" style={{
                  opacity: badge.earned ? 1 : 0.4,
                  borderColor: badge.earned ? '#22c55e44' : '#22c55e11',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{badge.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: badge.earned ? '#fff' : '#4a6741' }}>{badge.name}</div>
                  <div style={{ fontSize: 11, color: '#4a6741', marginTop: 4 }}>{badge.desc}</div>
                  {badge.earned && <div className="tag tag-green" style={{ marginTop: 8, justifyContent: 'center' }}>✓ Kazanıldı</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'species' && (
          <div className="fade-in">
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: '#4a6741', marginBottom: 8 }}>
                Yakaladığın/gördüğün türler:
              </div>
              {speciesList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#4a6741', fontSize: 13 }}>
                  Henüz tür kaydı yok. Aktivite ekleyerek başlayın!
                </div>
              ) : speciesList.map(s => (
                <div key={s.name} className="post-card" style={{ padding: 12, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>🐟</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: '#e2e8f0' }}>{s.name}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: '#22c55e', fontSize: 18 }}>{s.count}×</div>
                  </div>
                </div>
              ))}
              <button className="btn-ghost" style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}
                onClick={() => navigate('/aktivite')}>+ Yeni Aktivite Ekle</button>
            </div>
          </div>
        )}

        {tab === 'favorites' && (
          <div className="fade-in">
            {!user ? (
              <div style={{ textAlign: 'center', padding: 20, color: '#4a6741' }}>
                Favorileri görmek için giriş yapın.
              </div>
            ) : favorites.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#4a6741', fontSize: 13 }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>⭐</div>
                Henüz favori eklenmedi.
                <br />
                Noktaları ve paylaşımları favorileyebilirsin.
              </div>
            ) : favorites.map(fav => (
              <div key={fav.id} className="card" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: 'var(--s3)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}>{FAV_ICONS[fav.item_type] || '⭐'}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{fav.item_name || 'Öğe'}</div>
                  <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 2, textTransform: 'capitalize' }}>
                    {fav.item_type === 'spot' ? 'Nokta' : fav.item_type === 'post' ? 'Paylaşım' : 'Tür'}
                  </div>
                </div>
                <button onClick={() => removeFavorite(fav)} style={{
                  background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', fontSize: 18,
                  flexShrink: 0,
                }}>⭐</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
