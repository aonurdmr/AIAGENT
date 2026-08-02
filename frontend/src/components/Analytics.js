import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const TYPE_META = {
  fishing:      { label: 'Balıkçılık', icon: '🎣', color: '#3b82f6' },
  hunting:      { label: 'Avcılık',    icon: '🏹', color: '#ef4444' },
  camping:      { label: 'Kamp',       icon: '⛺', color: '#22c55e' },
  birdwatching: { label: 'Kuş Gözlemi',icon: '🦅', color: '#f59e0b' },
  other:        { label: 'Diğer',      icon: '📋', color: '#8b5cf6' },
};

const MONTH_LABELS = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];

function monthLabel(ym) {
  const [, m] = ym.split('-');
  return MONTH_LABELS[parseInt(m, 10) - 1] || ym;
}

function BarChart({ data }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.count), 1);
  const barW = Math.floor(240 / data.length) - 6;
  return (
    <svg width="100%" viewBox={`0 0 260 90`} style={{ overflow: 'visible' }}>
      {data.map((d, i) => {
        const h = Math.max((d.count / max) * 64, d.count > 0 ? 4 : 2);
        const x = i * (260 / data.length) + 6;
        const y = 70 - h;
        return (
          <g key={d.month}>
            <rect x={x} y={y} width={barW} height={h} rx={4}
              fill={d.count > 0 ? '#22c55e' : 'var(--s3)'}
              style={{ transition: 'height .6s ease, y .6s ease' }} />
            {d.count > 0 && (
              <text x={x + barW / 2} y={y - 3} textAnchor="middle"
                fill="#86efac" fontSize={8} fontWeight={700}>{d.count}</text>
            )}
            <text x={x + barW / 2} y={83} textAnchor="middle"
              fill="var(--t-mute)" fontSize={8}>{monthLabel(d.month)}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart({ slices, total }) {
  if (!total) return (
    <div style={{ textAlign: 'center', color: 'var(--t-mute)', fontSize: 12, padding: 20 }}>
      Henüz aktivite yok
    </div>
  );
  const r = 38;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <svg width={100} height={100} style={{ flexShrink: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--s3)" strokeWidth={14} />
        {slices.map((s, i) => {
          const dash = (s.pct / 100) * circumference;
          const el = (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={s.color} strokeWidth={14}
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset={-offset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px', transition: 'stroke-dasharray .8s ease' }} />
          );
          offset += dash;
          return el;
        })}
        <text x={cx} y={cy + 4} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={800}>
          {total}
        </text>
      </svg>
      <div style={{ flex: 1 }}>
        {slices.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
            <div style={{ fontSize: 11, color: 'var(--t-mid)', flex: 1 }}>{s.label}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBox({ icon, value, label, color = '#22c55e' }) {
  return (
    <div style={{
      background: 'var(--s2)', border: '1px solid var(--border)',
      borderRadius: 14, padding: '14px 10px', textAlign: 'center',
    }}>
      <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontWeight: 800, fontSize: 22, color, lineHeight: 1 }}>{value ?? '—'}</div>
      <div style={{ fontSize: 10, color: 'var(--t-mute)', marginTop: 4, letterSpacing: '.04em' }}>{label}</div>
    </div>
  );
}

export default function Analytics() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/analytics`)
      .then(r => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const slices = data
    ? Object.entries(data.type_counts || {}).map(([k, v]) => ({
        label: TYPE_META[k]?.label || k,
        color: TYPE_META[k]?.color || '#8b5cf6',
        count: v,
        pct: data.total_activities ? (v / data.total_activities) * 100 : 0,
      }))
    : [];

  const { records } = data || {};

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>📊 Analizler</h1>
        <p>{user ? 'Kişisel aktivite istatistiklerin' : 'Platform istatistikleri'}</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <div className="spinner" />
        </div>
      ) : data ? (
        <div style={{ padding: '12px 16px' }}>

          {/* Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 14 }}>
            <StatBox icon="🏕️" value={data.total_activities} label="TOPLAM AKTİVİTE" color="#22c55e" />
            <StatBox icon="📝" value={data.total_posts} label="TOPLAM PAYLAŞIM" color="#a78bfa" />
          </div>

          {/* Monthly bar chart */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 12 }}>
              📅 AYLIK AKTİVİTE (SON 6 AY)
            </div>
            <BarChart data={data.monthly} />
          </div>

          {/* Type donut */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 12 }}>
              🎯 AKTİVİTE DAĞILIMI
            </div>
            <DonutChart slices={slices} total={data.total_activities} />
          </div>

          {/* Personal records (fishing) */}
          {records && (records.best_weight || records.best_length) && (
            <div className="card" style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 12 }}>
                🏆 KİŞİSEL REKORLAR
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
                {records.best_weight && (
                  <StatBox icon="⚖️" value={`${records.best_weight} kg`} label="EN AĞIR BALIK" color="#fbbf24" />
                )}
                {records.best_length && (
                  <StatBox icon="📏" value={`${records.best_length} cm`} label="EN UZUN BALIK" color="#38bdf8" />
                )}
              </div>
              {records.best_species && (
                <div style={{ marginTop: 8, textAlign: 'center', fontSize: 12, color: 'var(--t-mute)' }}>
                  En iyi tür: <strong style={{ color: 'var(--a-light)' }}>{records.best_species}</strong>
                </div>
              )}
            </div>
          )}

          {/* Top locations */}
          {data.top_locations?.length > 0 && (
            <div className="card" style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 12 }}>
                📍 EN SIK LOKASYONLAR
              </div>
              {data.top_locations.map((loc, i) => {
                const pct = data.total_activities ? (loc.count / data.total_activities) * 100 : 0;
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: 'var(--t-mid)' }}>{loc.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--a-light)' }}>{loc.count}x</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--s3)', borderRadius: 2 }}>
                      <div style={{
                        height: '100%', borderRadius: 2,
                        background: 'var(--a-base)',
                        width: `${pct}%`,
                        transition: 'width .8s ease',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Top species */}
          {data.top_species?.length > 0 && (
            <div className="card" style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 12 }}>
                🐟 EN SIK TÜRLER
              </div>
              {data.top_species.map((sp, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0', borderBottom: i < data.top_species.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 8,
                      background: 'var(--s3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800, color: 'var(--a-light)',
                    }}>{i + 1}</div>
                    <span style={{ fontSize: 13, color: '#fff' }}>{sp.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-mute)' }}>{sp.count} kez</span>
                </div>
              ))}
            </div>
          )}

          {!user && (
            <div style={{
              background: 'rgba(34,197,94,.06)', border: '1px solid rgba(34,197,94,.15)',
              borderRadius: 12, padding: '12px 14px', marginBottom: 14,
              fontSize: 12, color: 'var(--t-mid)', textAlign: 'center',
            }}>
              Kişisel istatistiklerinizi görmek için <strong style={{ color: 'var(--a-light)' }}>giriş yapın</strong>
            </div>
          )}

        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--t-mute)' }}>
          Veriler yüklenemedi
        </div>
      )}
    </div>
  );
}
