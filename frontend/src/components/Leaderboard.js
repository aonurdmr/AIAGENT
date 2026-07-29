import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const RANK_STYLES = [
  { bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', shadow: 'rgba(251,191,36,.3)', icon: '🥇' },
  { bg: 'linear-gradient(135deg, #9ca3af, #6b7280)', shadow: 'rgba(156,163,175,.3)', icon: '🥈' },
  { bg: 'linear-gradient(135deg, #cd7c3c, #b45309)', shadow: 'rgba(180,83,9,.3)',    icon: '🥉' },
];

function RankBadge({ rank }) {
  if (rank <= 3) {
    const s = RANK_STYLES[rank - 1];
    return (
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: s.bg, boxShadow: `0 4px 12px ${s.shadow}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
      }}>{s.icon}</div>
    );
  }
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: 'var(--s3)', border: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: 14, color: 'var(--t-mute)',
    }}>{rank}</div>
  );
}

function PointBar({ points, max }) {
  const pct = max > 0 ? Math.round((points / max) * 100) : 0;
  return (
    <div style={{ height: 4, background: 'var(--s3)', borderRadius: 2, overflow: 'hidden', marginTop: 4 }}>
      <div style={{
        height: '100%', width: `${pct}%`, borderRadius: 2,
        background: 'linear-gradient(90deg, #22c55e, #16a34a)',
        transition: 'width 1s ease',
      }} />
    </div>
  );
}

export default function Leaderboard() {
  const { user } = useAuth();
  const [board, setBoard]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/leaderboard`).then(r => {
      setBoard(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const maxPoints = board[0]?.points || 1;
  const myEntry   = user ? board.find(e => e.user_id === user.id) : null;

  return (
    <div className="page fade-in">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1a1100 0%, #0d1f0d 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🏆 Liderboard</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Topluluk sıralaması</p>

        {/* Scoring guide */}
        <div style={{
          marginTop: 14, background: 'var(--s2)', borderRadius: 12,
          padding: '10px 14px', border: '1px solid var(--border)',
          display: 'flex', gap: 16,
        }}>
          <div style={{ fontSize: 12, color: 'var(--t-mid)' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>10 puan</span> / aktivite
          </div>
          <div style={{ fontSize: 12, color: 'var(--t-mid)' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>5 puan</span> / paylaşım
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* My rank */}
        {myEntry && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,.12), rgba(22,163,74,.06))',
            border: '1px solid var(--border-lg)',
            borderRadius: 16, padding: '14px 16px', marginBottom: 14,
          }}>
            <div style={{ fontSize: 11, color: 'var(--a-light)', fontWeight: 700, marginBottom: 8, letterSpacing: '.08em' }}>
              SENİN SIRAN
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <RankBadge rank={myEntry.rank} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>@{myEntry.username}</div>
                <div style={{ fontSize: 12, color: 'var(--t-mute)' }}>
                  {myEntry.activity_count} aktivite · {myEntry.post_count} paylaşım
                </div>
                <PointBar points={myEntry.points} max={maxPoints} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                  {myEntry.points}
                </div>
                <div style={{ fontSize: 10, color: 'var(--t-mute)' }}>puan</div>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 podium */}
        {board.length >= 3 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'flex-end' }}>
            {/* 2nd */}
            <div style={{
              flex: 1, background: 'var(--s2)', borderRadius: 14, padding: '16px 10px',
              border: '1px solid var(--border)', textAlign: 'center',
              paddingTop: 24,
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🥈</div>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', margin: '0 auto 8px',
                background: board[1].avatar_color + '33', border: `2px solid ${board[1].avatar_color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, color: board[1].avatar_color, fontSize: 16,
              }}>{board[1].username[0].toUpperCase()}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>@{board[1].username}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#9ca3af', marginTop: 4 }}>{board[1].points}</div>
            </div>
            {/* 1st */}
            <div style={{
              flex: 1, background: 'linear-gradient(135deg, rgba(251,191,36,.1), rgba(245,158,11,.06))',
              borderRadius: 14, padding: '16px 10px',
              border: '1px solid rgba(251,191,36,.25)', textAlign: 'center',
            }}>
              <div style={{ fontSize: 34, marginBottom: 6 }}>🥇</div>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', margin: '0 auto 8px',
                background: board[0].avatar_color + '33', border: `2px solid ${board[0].avatar_color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, color: board[0].avatar_color, fontSize: 20,
              }}>{board[0].username[0].toUpperCase()}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>@{board[0].username}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fbbf24', marginTop: 4 }}>{board[0].points}</div>
            </div>
            {/* 3rd */}
            <div style={{
              flex: 1, background: 'var(--s2)', borderRadius: 14, padding: '16px 10px',
              border: '1px solid var(--border)', textAlign: 'center',
              paddingTop: 30,
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>🥉</div>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', margin: '0 auto 8px',
                background: board[2].avatar_color + '33', border: `2px solid ${board[2].avatar_color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, color: board[2].avatar_color, fontSize: 14,
              }}>{board[2].username[0].toUpperCase()}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>@{board[2].username}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#cd7c3c', marginTop: 4 }}>{board[2].points}</div>
            </div>
          </div>
        )}

        {/* Full list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--t-mute)' }}>Yükleniyor…</div>
        ) : board.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--t-mute)' }}>
            Henüz sıralama yok. Aktivite ekleyerek puan kazan!
          </div>
        ) : (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
              TÜM SIRALAMA
            </div>
            {board.slice(3).map(entry => (
              <div key={entry.user_id} className="card" style={{
                marginBottom: 8,
                borderColor: entry.user_id === user?.id ? 'var(--border-lg)' : undefined,
                background: entry.user_id === user?.id ? 'rgba(34,197,94,.04)' : undefined,
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <RankBadge rank={entry.rank} />
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: entry.avatar_color + '22',
                    border: `1px solid ${entry.avatar_color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: entry.avatar_color, fontSize: 16,
                  }}>{entry.username[0].toUpperCase()}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>
                      @{entry.username}
                      {entry.user_id === user?.id && (
                        <span style={{ fontSize: 10, color: 'var(--accent)', marginLeft: 6 }}>Sen</span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--t-mute)' }}>
                      {entry.activity_count} aktivite · {entry.post_count} paylaşım
                    </div>
                    <PointBar points={entry.points} max={maxPoints} />
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>{entry.points}</div>
                    <div style={{ fontSize: 10, color: 'var(--t-mute)' }}>puan</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
