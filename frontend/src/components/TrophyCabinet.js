import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const MEDAL = ['🥇', '🥈', '🥉'];

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function TrophyCard({ trophy, rank }) {
  const medal = MEDAL[rank] || '🎣';
  const isTop = rank < 3;
  return (
    <div style={{
      background: isTop ? `rgba(${rank === 0 ? '251,191,36' : rank === 1 ? '148,163,184' : '251,146,60'},.06)` : 'var(--s2)',
      border: `1px solid ${isTop ? `rgba(${rank === 0 ? '251,191,36' : rank === 1 ? '148,163,184' : '251,146,60'},.25)` : 'var(--border)'}`,
      borderRadius: 16, padding: '14px', marginBottom: 8, position: 'relative',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ flexShrink: 0, textAlign: 'center' }}>
          <div style={{ fontSize: isTop ? 32 : 24, lineHeight: 1 }}>{medal}</div>
          <div style={{ fontSize: 9, color: 'var(--t-mute)', marginTop: 2 }}>#{rank + 1}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: '#fff', marginBottom: 4 }}>
            {trophy.species}
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {trophy.best_weight > 0 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fbbf24' }}>{trophy.best_weight}<span style={{ fontSize: 11 }}>kg</span></div>
                <div style={{ fontSize: 9, color: 'var(--t-mute)' }}>En Ağır</div>
              </div>
            )}
            {trophy.best_length > 0 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#38bdf8' }}>{trophy.best_length}<span style={{ fontSize: 11 }}>cm</span></div>
                <div style={{ fontSize: 9, color: 'var(--t-mute)' }}>En Uzun</div>
              </div>
            )}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#22c55e' }}>{trophy.count}</div>
              <div style={{ fontSize: 9, color: 'var(--t-mute)' }}>Kez</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 6 }}>
            {trophy.location && `📍 ${trophy.location}`}
            {trophy.location && trophy.date && ' · '}
            {trophy.date && formatDate(trophy.date)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrophyCabinet() {
  const { user, token } = useAuth();
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const load = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    try {
      const { data: d } = await axios.get(`${API}/trophies`, { headers: authHeader });
      setData(d);
    } catch { }
    setLoading(false);
  }, [user, token]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #1a0f00 0%, #2a1800 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🏆 Kupa Dolabı</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Kişisel balıkçılık rekortları</p>
      </div>

      {!user ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--t-mute)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
          <div>Kupalarını görmek için giriş yapın</div>
        </div>
      ) : loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <div className="spinner" />
        </div>
      ) : (
        <div style={{ padding: '14px 16px 0' }}>

          {/* Summary row */}
          {data && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
              {[
                ['🎣', data.total_catches, 'TOPLAM AV', '#22c55e'],
                ['🐟', data.unique_species, 'TÜR', '#fbbf24'],
                ['⚖️', `${data.total_weight}kg`, 'TOPLAM', '#f97316'],
              ].map(([icon, val, label, color]) => (
                <div key={label} style={{
                  background: 'var(--s2)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '12px 8px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 18, color, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 9, color: 'var(--t-mute)', marginTop: 3, letterSpacing: '.05em' }}>{label}</div>
                </div>
              ))}
            </div>
          )}

          {data?.trophies?.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--t-mute)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎣</div>
              <div style={{ fontSize: 14, marginBottom: 4 }}>Henüz kupa yok</div>
              <div style={{ fontSize: 12 }}>Balıkçılık aktivitesi kaydet, rekortların burada görünsün</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
                🐟 TÜR REKORTLARI ({data?.trophies?.length})
              </div>
              {data?.trophies?.map((t, i) => (
                <TrophyCard key={t.species} trophy={t} rank={i} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
