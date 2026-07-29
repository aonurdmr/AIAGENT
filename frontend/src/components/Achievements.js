import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

function ProgressRing({ pct, color, size = 52 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct, 1));
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--s3)" strokeWidth={6} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={`${circ} ${circ}`} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset .8s ease' }} />
    </svg>
  );
}

export default function Achievements() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/achievements`)
      .then(r => setItems(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const earned = items.filter(a => a.earned);
  const locked = items.filter(a => !a.earned);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>🏅 Başarılar</h1>
        <p>
          {user
            ? `${earned.length} / ${items.length} başarı kazanıldı`
            : 'Başarıları kazanmak için giriş yap'}
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <div className="spinner" />
        </div>
      ) : (
        <div style={{ padding: '12px 16px' }}>

          {/* Progress banner */}
          {user && items.length > 0 && (
            <div className="card" style={{ marginBottom: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                🏆 İlerleme Durumu
              </div>
              <div style={{ height: 8, background: 'var(--s3)', borderRadius: 4, marginBottom: 6 }}>
                <div style={{
                  height: '100%', borderRadius: 4, background: '#22c55e',
                  width: `${(earned.length / items.length) * 100}%`,
                  transition: 'width 1s ease',
                  boxShadow: '0 0 8px rgba(34,197,94,.4)',
                }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--t-mute)' }}>
                {earned.length} kazanıldı · {locked.length} kilitli
              </div>
            </div>
          )}

          {/* Earned */}
          {earned.length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
                ✅ KAZANILDI ({earned.length})
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 14 }}>
                {earned.map(a => (
                  <div key={a.id} style={{
                    background: 'var(--s2)',
                    border: `1px solid ${a.color}30`,
                    borderRadius: 14, padding: '14px 12px', textAlign: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(ellipse at 50% 0%, ${a.color}12, transparent 70%)`,
                    }} />
                    <div style={{ fontSize: 32, marginBottom: 8, position: 'relative' }}>{a.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 3, position: 'relative' }}>
                      {a.title}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--t-mute)', position: 'relative', lineHeight: 1.4 }}>
                      {a.desc}
                    </div>
                    <div style={{
                      marginTop: 8, fontSize: 10, fontWeight: 700, color: a.color,
                      background: a.color + '15', borderRadius: 20, padding: '2px 8px',
                      display: 'inline-block', position: 'relative',
                    }}>KAZANILDI</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Locked with progress */}
          {locked.length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
                🔒 KİLİTLİ ({locked.length})
              </div>
              {locked.map(a => {
                const pct = a.target ? a.progress / a.target : 0;
                return (
                  <div key={a.id} style={{
                    background: 'var(--s2)', border: '1px solid var(--border)',
                    borderRadius: 14, padding: '12px 14px', marginBottom: 8,
                    display: 'flex', gap: 12, alignItems: 'center', opacity: .75,
                  }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <ProgressRing pct={pct} color={a.color} size={52} />
                      <div style={{
                        position: 'absolute', inset: 0, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: 20,
                        filter: 'grayscale(1)',
                      }}>{a.icon}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t-mid)', marginBottom: 2 }}>
                        {a.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 5, lineHeight: 1.4 }}>
                        {a.desc}
                      </div>
                      <div style={{ height: 3, background: 'var(--s3)', borderRadius: 2 }}>
                        <div style={{
                          height: '100%', background: a.color, borderRadius: 2,
                          width: `${pct * 100}%`, transition: 'width .8s ease',
                        }} />
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--t-mute)', marginTop: 3 }}>
                        {a.progress} / {a.target}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {!user && (
            <div style={{
              background: 'rgba(34,197,94,.06)', border: '1px solid rgba(34,197,94,.15)',
              borderRadius: 12, padding: '12px 14px', marginTop: 8,
              fontSize: 12, color: 'var(--t-mid)', textAlign: 'center',
            }}>
              Kişisel ilerleme takibi için <strong style={{ color: 'var(--a-light)' }}>giriş yapın</strong>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
