import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const SCORE_COLOR = s => s >= 80 ? '#22c55e' : s >= 60 ? '#fbbf24' : s >= 40 ? '#f97316' : '#ef4444';

const TR_MONTHS = {
  January:'Ocak', February:'Şubat', March:'Mart', April:'Nisan', May:'Mayıs', June:'Haziran',
  July:'Temmuz', August:'Ağustos', September:'Eylül', October:'Ekim', November:'Kasım', December:'Aralık',
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    return `${parts[0]} ${TR_MONTHS[parts[1]] || parts[1]} ${parts[2]}`;
  }
  return dateStr;
}

function GaugeSVG({ score, color, size = 80 }) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const half = circ / 2;
  const fill = (score / 100) * half;
  return (
    <svg width={size} height={size / 2 + 14} style={{ overflow: 'visible' }}>
      <path d={`M ${8} ${size/2} A ${r} ${r} 0 0 1 ${size-8} ${size/2}`}
        fill="none" stroke="var(--s3)" strokeWidth={8} strokeLinecap="round" />
      <path d={`M ${8} ${size/2} A ${r} ${r} 0 0 1 ${size-8} ${size/2}`}
        fill="none" stroke={color} strokeWidth={8} strokeLinecap="round"
        strokeDasharray={`${fill} ${half}`} />
      <text x={size/2} y={size/2 + 2} textAnchor="middle" fill={color} fontSize={18} fontWeight={800}>{score}</text>
      <text x={size/2} y={size/2 + 14} textAnchor="middle" fill="var(--t-mute)" fontSize={9}>/100</text>
    </svg>
  );
}

function StatPill({ icon, value, label, color }) {
  return (
    <div style={{
      background: 'var(--s2)', border: '1px solid var(--border)',
      borderRadius: 14, padding: '10px 12px', textAlign: 'center', flex: 1,
    }}>
      <div style={{ fontSize: 20, marginBottom: 2 }}>{icon}</div>
      <div style={{ fontWeight: 800, fontSize: 15, color: color || '#fff', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 9, color: 'var(--t-mute)', marginTop: 2, letterSpacing: '.05em' }}>{label}</div>
    </div>
  );
}

export default function DailyBriefing() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    try {
      const { data: d } = await axios.get(`${API}/daily-briefing`);
      setData(d);
    } catch {}
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <div className="page fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" style={{ margin: '0 auto 16px' }} />
        <div style={{ color: 'var(--t-mute)', fontSize: 13 }}>Günlük brifing hazırlanıyor...</div>
      </div>
    </div>
  );

  if (!data) return null;

  const mainColor = SCORE_COLOR(data.overall_score);

  return (
    <div className="page fade-in">
      {/* Hero */}
      <div style={{
        background: `linear-gradient(160deg, ${mainColor}15 0%, #000 60%)`,
        padding: '52px 20px 24px',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.1em', marginBottom: 8 }}>
          📅 {formatDate(data.date).toUpperCase()}
        </div>
        <GaugeSVG score={data.overall_score} color={mainColor} size={120} />
        <div style={{ fontWeight: 800, fontSize: 28, color: mainColor, marginTop: 6 }}>{data.score_label}</div>
        <div style={{ fontSize: 14, color: 'var(--t-mute)', marginTop: 2 }}>Bugünkü Balıkçılık Koşulları</div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <StatPill icon={data.moon.icon} value={data.moon.name.split(' ')[0]} label="AY FAZI" color="#fbbf24" />
          <StatPill icon="🌡️" value={`${data.weather.temp}°C`} label="SICAKLIK" color="#38bdf8" />
          <StatPill icon={data.season.icon} value={data.season.name} label="SEZON" color="#22c55e" />
        </div>

        {/* Scores */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <div style={{ flex: 1, background: 'var(--s2)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, color: 'var(--t-mute)', fontWeight: 700, marginBottom: 4 }}>HAVA SKORU</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ height: 6, flex: 1, background: 'var(--s3)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width:`${data.weather.score}%`, height:'100%', background: SCORE_COLOR(data.weather.score) }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: SCORE_COLOR(data.weather.score) }}>{data.weather.score}</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--t-mute)', marginTop: 3 }}>💨 {data.weather.wind}km/h · {data.weather.condition}</div>
          </div>
          <div style={{ flex: 1, background: 'var(--s2)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, color: 'var(--t-mute)', fontWeight: 700, marginBottom: 4 }}>AY SKORU</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ height: 6, flex: 1, background: 'var(--s3)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width:`${data.moon.score*10}%`, height:'100%', background: '#fbbf24' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#fbbf24' }}>{data.moon.score}/10</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--t-mute)', marginTop: 3 }}>📅 Ay yaşı: {data.moon.age} gün</div>
          </div>
        </div>

        {/* Best time */}
        <div style={{
          background: '#38bdf810', border: '1px solid #38bdf830',
          borderRadius: 12, padding: '10px 14px', marginBottom: 14,
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <span style={{ fontSize: 24 }}>⏰</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', marginBottom: 2 }}>EN İYİ ZAMAN PENCERESİ</div>
            <div style={{ fontSize: 12, color: 'var(--t-mid)' }}>{data.best_time}</div>
          </div>
        </div>

        {/* AI Briefing */}
        <div style={{
          background: mainColor + '08', border: `1px solid ${mainColor}30`,
          borderRadius: 16, padding: 16, marginBottom: 14,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: mainColor, letterSpacing: '.08em', marginBottom: 8 }}>
            🤖 AI BRIFING
          </div>
          <div style={{ fontSize: 13, color: 'var(--t-mid)', lineHeight: 1.7 }}>
            {data.ai_briefing}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          {[
            ['🌡️ Hava Detay', '/hava'],
            ['🌕 Ay Takvimi', '/ay'],
            ['🤖 AI Öneri', '/oneri'],
            ['📋 Aktivite Kaydı', '/aktivite'],
          ].map(([label, path]) => (
            <a key={path} href={path} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '10px', borderRadius: 12, textDecoration: 'none',
              background: 'var(--s2)', border: '1px solid var(--border)',
              fontSize: 11, fontWeight: 600, color: 'var(--t-mute)',
              transition: 'all .2s',
            }}>{label}</a>
          ))}
        </div>

        {/* Refresh */}
        <button
          className="btn-ghost"
          onClick={() => load(true)}
          disabled={refreshing}
          style={{ width: '100%', justifyContent: 'center', marginBottom: 20 }}
        >
          {refreshing ? '⏳ Yenileniyor...' : '🔄 Brifigi Yenile'}
        </button>

      </div>
    </div>
  );
}
