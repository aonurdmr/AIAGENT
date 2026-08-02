import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/Toast';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const PERIODS = [
  { id: 'last7',  label: 'Son 7 Gün' },
  { id: 'last30', label: 'Son 30 Gün' },
  { id: 'last90', label: 'Son 90 Gün' },
  { id: 'all',    label: 'Tüm Zamanlar' },
];

const ACTIVITIES = [
  { id: 'all',          icon: '🌍', label: 'Tümü' },
  { id: 'fishing',      icon: '🎣', label: 'Balıkçılık' },
  { id: 'hunting',      icon: '🏹', label: 'Avcılık' },
  { id: 'camping',      icon: '⛺', label: 'Kamp' },
  { id: 'birdwatching', icon: '🦅', label: 'Kuş Gözlemi' },
];

export default function TripReport() {
  const { user, token } = useAuth();
  const [period,   setPeriod]   = useState('last30');
  const [activity, setActivity] = useState('all');
  const [result,   setResult]   = useState(null);
  const [loading,  setLoading]  = useState(false);

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const generate = async () => {
    if (!user) { toast('Rapor oluşturmak için giriş yapın', 'info'); return; }
    setLoading(true);
    setResult(null);
    try {
      const { data } = await axios.post(`${API}/trip-report`, { period, activity }, { headers: authHeader });
      setResult(data);
      if (!data.report) toast(data.message || 'Aktivite bulunamadı', 'info');
    } catch { toast('Rapor oluşturulamadı', 'error'); }
    setLoading(false);
  };

  const shareToClipboard = () => {
    if (!result?.report) return;
    navigator.clipboard?.writeText(result.report).then(() => toast('Rapor kopyalandı ✓'));
  };

  const { stats } = result || {};

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #010d01 0%, #0a2e0a 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>📄 Seyahat Raporu</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>AI ile kişisel outdoor raporun</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Period selector */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 8 }}>
            DÖNEM
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
            {PERIODS.map(p => (
              <button key={p.id} onClick={() => setPeriod(p.id)} style={{
                padding: '8px 4px', borderRadius: 10, textAlign: 'center', cursor: 'pointer', fontSize: 11,
                background: period === p.id ? 'var(--a-glow)' : 'var(--s2)',
                border: period === p.id ? '1px solid var(--border-lg)' : '1px solid var(--border)',
                color: period === p.id ? 'var(--a-light)' : 'var(--t-mute)',
                fontWeight: 600, transition: 'all .2s',
              }}>{p.label}</button>
            ))}
          </div>
        </div>

        {/* Activity selector */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 8 }}>
            AKTİVİTE
          </div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
            {ACTIVITIES.map(a => (
              <button key={a.id} onClick={() => setActivity(a.id)} style={{
                padding: '6px 12px', borderRadius: 20, whiteSpace: 'nowrap', cursor: 'pointer',
                background: activity === a.id ? 'var(--a-glow)' : 'var(--s2)',
                border: activity === a.id ? '1px solid var(--border-lg)' : '1px solid var(--border)',
                color: activity === a.id ? 'var(--a-light)' : 'var(--t-mute)',
                fontSize: 12, fontWeight: 600, transition: 'all .2s',
              }}>{a.icon} {a.label}</button>
            ))}
          </div>
        </div>

        {/* Generate */}
        {!user ? (
          <div style={{
            background: 'rgba(34,197,94,.06)', border: '1px solid rgba(34,197,94,.15)',
            borderRadius: 12, padding: '14px', marginBottom: 14, textAlign: 'center',
            fontSize: 13, color: 'var(--t-mid)',
          }}>
            Rapor oluşturmak için <strong style={{ color: 'var(--a-light)' }}>giriş yapın</strong>
          </div>
        ) : (
          <button className="btn-primary" onClick={generate} disabled={loading} style={{ marginBottom: 14 }}>
            {loading ? '✍️ Rapor yazılıyor…' : '📄 Rapor Oluştur'}
          </button>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div className="spinner" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: 13, color: 'var(--t-mute)' }}>AI raporunuzu hazırlıyor…</div>
          </div>
        )}

        {result && !loading && (
          <div className="fade-in">

            {/* Stats summary */}
            {stats && stats.total > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 14 }}>
                {[
                  ['🏕️', stats.total,              'AKTİVİTE', '#22c55e'],
                  ['📍', stats.unique_locations,    'LOKASYON', '#38bdf8'],
                  ['🐟', stats.unique_species,      'TÜR',      '#fbbf24'],
                  ['🏆', stats.best_catch || '—',  'EN İYİ AV','#f97316'],
                ].map(([icon, val, label, color]) => (
                  <div key={label} style={{
                    background: 'var(--s2)', border: '1px solid var(--border)',
                    borderRadius: 14, padding: '12px', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                    <div style={{ fontWeight: 800, fontSize: 18, color, lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: 9, color: 'var(--t-mute)', marginTop: 3, letterSpacing: '.06em' }}>{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Top locations & species */}
            {stats?.top_locations?.length > 0 && (
              <div className="card" style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 8 }}>
                  📍 ZİYARET EDİLEN LOKASYONLAR
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {stats.top_locations.map((loc, i) => (
                    <span key={i} style={{
                      fontSize: 11, padding: '4px 10px', borderRadius: 20,
                      background: 'rgba(34,197,94,.12)', color: 'var(--a-light)',
                      border: '1px solid rgba(34,197,94,.2)',
                    }}>{loc}</span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Narrative */}
            {result.report && (
              <div className="card" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em' }}>
                    ✍️ AI RAPORU — {result.period?.toUpperCase()}
                  </div>
                  <button onClick={shareToClipboard} style={{
                    background: 'var(--s3)', border: '1px solid var(--border)',
                    borderRadius: 8, padding: '4px 10px', cursor: 'pointer',
                    fontSize: 11, color: 'var(--t-mute)',
                  }}>📋 Kopyala</button>
                </div>
                <div style={{
                  fontSize: 13, color: 'var(--t-mid)', lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                }}>
                  {result.report}
                </div>
              </div>
            )}

            {!result.report && (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--t-mute)', fontSize: 13 }}>
                {result.message || 'Bu dönemde aktivite bulunamadı.'}
              </div>
            )}

            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', marginBottom: 14 }}
              onClick={generate}>
              🔄 Yeniden Oluştur
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
