import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const BADGES = [
  { icon: '🎣', name: 'İlk Balık', desc: 'İlk aktiviteni kaydettin', earned: true },
  { icon: '⭐', name: '5 Yıldız', desc: '5 nokta değerlendirdin', earned: true },
  { icon: '🌟', name: 'Keşifçi', desc: '10 farklı nokta ziyaret et', earned: false },
  { icon: '📸', name: 'Fotoğrafçı', desc: '20 tür tanımladın', earned: false },
  { icon: '👥', name: 'Topluluk', desc: '50 beğeni al', earned: false },
  { icon: '🏆', name: 'Usta', desc: '100 aktivite kaydet', earned: false },
];

const SPECIES_LIST = [
  { name: 'Sazan', emoji: '🐟', count: 14 },
  { name: 'Alabalık', emoji: '🐠', count: 7 },
  { name: 'Levrek', emoji: '🐟', count: 5 },
  { name: 'Keklik', emoji: '🦜', count: 3 },
];

export default function Profile() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [name, setName] = useState('Outdoor Sever');
  const [editName, setEditName] = useState(false);
  const [tab, setTab] = useState('stats');

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/activities`).then(r => setActivities(r.data)),
      axios.get(`${API}/stats`).then(r => setStats(r.data)),
    ]).catch(() => {});
  }, []);

  const actCount = activities.length;
  const fishCount = activities.filter(a => a.type === 'fishing').length;
  const huntCount = activities.filter(a => a.type === 'hunting').length;
  const campCount = activities.filter(a => a.type === 'camping').length;

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

        {editName ? (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
            <input className="input-field" value={name} onChange={e => setName(e.target.value)}
              style={{ maxWidth: 200, textAlign: 'center' }} />
            <button className="btn-primary" style={{ width: 'auto', padding: '8px 14px' }}
              onClick={() => setEditName(false)}>✓</button>
          </div>
        ) : (
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{name}</h2>
            <button onClick={() => setEditName(true)} style={{
              background: 'none', border: 'none', color: '#4a6741', fontSize: 12, cursor: 'pointer',
            }}>✏️ Düzenle</button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <span className="tag tag-green">🎣 Balıkçı</span>
          <span className="tag tag-amber">⛺ Kampçı</span>
          <span className="tag tag-blue">🔍 Keşifçi</span>
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
          {[['stats', '📊', 'İstatistik'], ['badges', '🏆', 'Rozetler'], ['species', '🐟', 'Türlerim']].map(([id, ic, lb]) => (
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
                { icon: '🔍', label: 'AI Tür Tanımlama', path: '/tani' },
                { icon: '💬', label: 'AI Asistan', path: '/ai-asistan' },
                { icon: '📋', label: 'Aktivite Günlüğü', path: '/aktivite' },
                { icon: '👥', label: 'Topluluk', path: '/topluluk' },
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
              {BADGES.map(badge => (
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
              {SPECIES_LIST.map(s => (
                <div key={s.name} className="post-card" style={{ padding: 12, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{s.emoji}</span>
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
      </div>
    </div>
  );
}
