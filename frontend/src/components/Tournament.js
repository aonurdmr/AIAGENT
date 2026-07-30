import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'fishing_tournament';

const SAMPLE_PARTICIPANTS = [
  { id: 'p1', name: 'Ahmet Y.', avatar: '🎣', catches: [{ species: 'Lüfer', weight: 1.2 }, { species: 'Palamut', weight: 0.8 }] },
  { id: 'p2', name: 'Mehmet K.', avatar: '⛵', catches: [{ species: 'Levrek', weight: 2.1 }] },
  { id: 'p3', name: 'Fatma A.', avatar: '🌊', catches: [{ species: 'Lüfer', weight: 0.9 }, { species: 'İstavrit', weight: 0.3 }] },
];

function totalWeight(catches) {
  return Math.round(catches.reduce((s, c) => s + c.weight, 0) * 100) / 100;
}

function useTimer(running) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);
  return elapsed;
}

function fmtTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

const SPECIES_LIST = ['Lüfer', 'Palamut', 'Levrek', 'Çipura', 'Kefal', 'İstavrit', 'Torik', 'Barbun', 'Orfoz', 'Kalkan'];

export default function Tournament() {
  const navigate = useNavigate();
  const [data, setData] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? JSON.parse(s) : {
        name: 'Boğaz Balıkçılık Turnuvası',
        started: false,
        startedAt: null,
        participants: SAMPLE_PARTICIPANTS,
        myName: 'Ben',
        myCatches: [],
      };
    } catch { return { name: 'Yeni Turnuva', started: false, startedAt: null, participants: SAMPLE_PARTICIPANTS, myName: 'Ben', myCatches: [] }; }
  });

  const [species, setSpecies] = useState('Lüfer');
  const [weight, setWeight]   = useState('');
  const [tab, setTab]         = useState('board'); // board | add | history

  const elapsed = useTimer(data.started);

  const save = useCallback((updated) => {
    setData(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const startTournament = () => save({ ...data, started: true, startedAt: Date.now() });
  const stopTournament  = () => save({ ...data, started: false });
  const resetTournament = () => {
    const fresh = { ...data, started: false, startedAt: null, myCatches: [], participants: SAMPLE_PARTICIPANTS };
    save(fresh);
  };

  const addCatch = () => {
    const w = parseFloat(weight);
    if (!w || w <= 0) return;
    const entry = { species, weight: w, time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) };
    save({ ...data, myCatches: [entry, ...data.myCatches] });
    setWeight('');
  };

  // Build leaderboard: me + sample participants
  const me = { id: 'me', name: data.myName, avatar: '⭐', catches: data.myCatches };
  const board = [me, ...data.participants]
    .map(p => ({ ...p, total: totalWeight(p.catches), count: p.catches.length }))
    .sort((a, b) => b.total - a.total);

  const myRank = board.findIndex(p => p.id === 'me') + 1;
  const myTotal = totalWeight(data.myCatches);

  const TABS = [
    { key: 'board', label: '🏆 Sıralama' },
    { key: 'add',   label: '➕ Av Ekle' },
    { key: 'history', label: '📋 Geçmiş' },
  ];

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏆 Turnuva</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>{data.name}</div>
      </div>

      {/* Timer / status */}
      <div style={{ margin: '0 16px 14px', background: data.started ? 'linear-gradient(135deg,#14532d,#166534)' : '#1f2937', borderRadius: 16, padding: '16px 20px', border: `1px solid ${data.started ? '#22c55e44' : '#374151'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: data.started ? '#86efac' : '#6b7280', fontWeight: 600 }}>{data.started ? '● CANLI' : '⏸ BEKLEMEDE'}</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#f9fafb', fontVariantNumeric: 'tabular-nums', letterSpacing: 1 }}>
              {fmtTime(elapsed)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>Sıralama</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#f59e0b' }}>#{myRank}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {!data.started ? (
            <button onClick={startTournament} style={{ flex: 1, background: '#22c55e', color: '#fff', border: 'none', borderRadius: 10, padding: '10px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>▶ Başlat</button>
          ) : (
            <button onClick={stopTournament} style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 10, padding: '10px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>⏹ Durdur</button>
          )}
          <button onClick={resetTournament} style={{ background: '#374151', color: '#9ca3af', border: 'none', borderRadius: 10, padding: '10px 16px', fontSize: 13, cursor: 'pointer' }}>🔄 Sıfırla</button>
        </div>
      </div>

      {/* My stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 16px 14px' }}>
        {[
          { label: 'Toplam', value: `${myTotal} kg`, color: '#22c55e' },
          { label: 'Av Sayısı', value: data.myCatches.length, color: '#3b82f6' },
          { label: 'Sıralama', value: `#${myRank}`, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: '1px solid #374151' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, margin: '0 16px 14px', background: '#1f2937', borderRadius: 12, padding: 4, border: '1px solid #374151' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, background: tab === t.key ? '#374151' : 'transparent', color: tab === t.key ? '#f9fafb' : '#6b7280',
            border: 'none', borderRadius: 8, padding: '8px 4px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Leaderboard */}
      {tab === 'board' && (
        <div style={{ padding: '0 16px' }}>
          {board.map((p, rank) => (
            <div key={p.id} style={{
              background: p.id === 'me' ? '#1e3a5f' : '#1f2937',
              borderRadius: 14, padding: '12px 14px', marginBottom: 10,
              border: `1px solid ${p.id === 'me' ? '#3b82f6' : '#374151'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: rank === 0 ? '#f59e0b' : rank === 1 ? '#9ca3af' : rank === 2 ? '#b45309' : '#4b5563', minWidth: 28 }}>
                  {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `#${rank + 1}`}
                </div>
                <div style={{ fontSize: 22 }}>{p.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: p.id === 'me' ? '#93c5fd' : '#f9fafb' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{p.count} av</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#f9fafb' }}>{p.total} <span style={{ fontSize: 12, color: '#6b7280' }}>kg</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add catch */}
      {tab === 'add' && (
        <div style={{ padding: '0 16px' }}>
          <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151' }}>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 12 }}>Yeni av kaydet</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>TÜR</div>
              <select value={species} onChange={e => setSpecies(e.target.value)}
                style={{ width: '100%', background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 10, padding: '12px 14px', fontSize: 14 }}>
                {SPECIES_LIST.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>AĞIRLIK (kg)</div>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
                placeholder="0.0" step="0.1" min="0"
                style={{ width: '100%', boxSizing: 'border-box', background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 10, padding: '12px 14px', fontSize: 18, fontWeight: 700 }}
              />
            </div>
            <button onClick={addCatch} disabled={!weight || parseFloat(weight) <= 0} style={{
              width: '100%', background: weight && parseFloat(weight) > 0 ? '#22c55e' : '#374151',
              color: weight && parseFloat(weight) > 0 ? '#fff' : '#6b7280',
              border: 'none', borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>🎣 Av Ekle</button>
          </div>
        </div>
      )}

      {/* My catch history */}
      {tab === 'history' && (
        <div style={{ padding: '0 16px' }}>
          {data.myCatches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🎣</div>
              <div>Henüz av kaydedilmedi</div>
            </div>
          ) : (
            data.myCatches.map((c, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{c.species}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{c.time}</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#22c55e' }}>{c.weight} kg</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
