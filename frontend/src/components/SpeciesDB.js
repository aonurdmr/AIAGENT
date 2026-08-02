import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/Toast';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const CAT_TABS = [
  { id: 'all',    icon: '🌿', label: 'Tümü' },
  { id: 'fish',   icon: '🐟', label: 'Balık' },
  { id: 'animal', icon: '🦊', label: 'Hayvan' },
  { id: 'bird',   icon: '🦜', label: 'Kuş' },
  { id: 'plant',  icon: '🌺', label: 'Bitki' },
];

const DIFF_COLORS = { kolay: '#22c55e', orta: '#f59e0b', zor: '#ef4444' };
const CAT_COLORS  = { fish: '#3b82f6', animal: '#f59e0b', bird: '#a855f7', plant: '#22c55e' };

function SpeciesCard({ s, accent, onFav, favSet }) {
  const [open, setOpen] = useState(false);
  const diff = s.difficulty || 'orta';
  const faved = favSet.has(s.id);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        background: '#0d1f0d',
        border: `1px solid ${open ? accent + '44' : '#22c55e18'}`,
        borderRadius: 16,
        marginBottom: 10,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color .2s',
        boxShadow: open ? `0 4px 24px ${accent}12` : 'none',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: accent + '18', border: `1px solid ${accent}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26,
        }}>{s.emoji || '🌿'}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{s.name}</div>
          <div style={{ fontSize: 11, color: '#4a7a4a', fontStyle: 'italic' }}>{s.scientific}</div>
          <div style={{ marginTop: 4, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {s.best_season && (
              <span style={{
                fontSize: 10, padding: '1px 8px', borderRadius: 20,
                background: accent + '15', color: accent, fontWeight: 600,
              }}>{s.best_season}</span>
            )}
            <span style={{
              fontSize: 10, padding: '1px 8px', borderRadius: 20,
              background: DIFF_COLORS[diff] + '15',
              color: DIFF_COLORS[diff], fontWeight: 600,
            }}>{diff}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onFav(s); }} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: 18,
            color: faved ? '#fbbf24' : '#4a7a4a',
            transition: 'color .2s, transform .15s',
            transform: faved ? 'scale(1.15)' : 'scale(1)',
          }}>⭐</button>
          <span style={{ color: '#4a7a4a', fontSize: 16 }}>{open ? '▾' : '▸'}</span>
        </div>
      </div>

      {/* Expanded details */}
      {open && (
        <div style={{ padding: '0 14px 14px', borderTop: '1px solid #22c55e0e' }}>
          {s.description && (
            <p style={{ fontSize: 13, color: '#a8d4a8', lineHeight: 1.6, marginTop: 10 }}>{s.description}</p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            {[
              ['📍', 'Habitat', s.habitat],
              ['⚖️', 'Ağırlık', s.avg_weight],
              ['🏆', 'Rekor', s.record],
              ['📅', 'Sezon', s.best_season],
            ].filter(([, , v]) => v).map(([ic, label, val]) => (
              <div key={label} style={{
                background: '#122212', border: '1px solid #22c55e0e',
                borderRadius: 10, padding: '8px 10px',
              }}>
                <div style={{ fontSize: 10, color: '#4a7a4a', fontWeight: 600 }}>{ic} {label}</div>
                <div style={{ fontSize: 12, color: '#a8d4a8', marginTop: 2 }}>{val}</div>
              </div>
            ))}
          </div>

          {s.diet && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 10, color: '#4a7a4a', fontWeight: 600 }}>🍽️ Beslenme</div>
              <div style={{ fontSize: 12, color: '#a8d4a8', marginTop: 2 }}>{s.diet}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SpeciesDB() {
  const { user } = useAuth();
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat]         = useState('all');
  const [query, setQuery]     = useState('');
  const [favSet, setFavSet]   = useState(new Set());

  useEffect(() => {
    axios.get(`${API}/species`)
      .then(r => setSpecies(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
    if (user) {
      axios.get(`${API}/favorites`).then(r => {
        const ids = new Set(r.data.filter(f => f.item_type === 'species').map(f => f.item_id));
        setFavSet(ids);
      }).catch(() => {});
    }
  }, [user]);

  async function handleFav(s) {
    if (!user) { toast('Favorilere eklemek için giriş yapın', 'info'); return; }
    try {
      const { data } = await axios.post(`${API}/favorites`, {
        item_type: 'species', item_id: s.id, item_name: s.name,
      });
      setFavSet(prev => {
        const next = new Set(prev);
        if (data.favorited) { next.add(s.id); toast(`${s.name} favorilere eklendi ⭐`); }
        else { next.delete(s.id); toast(`${s.name} favorilerden çıkarıldı`, 'info'); }
        return next;
      });
    } catch { toast('Hata oluştu', 'error'); }
  }

  const filtered = species.filter(s => {
    if (cat !== 'all' && s.category !== cat) return false;
    if (query && !s.name.toLowerCase().includes(query.toLowerCase()) &&
        !s.scientific.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>📖 Tür Ansiklopedisi</h1>
        <p>Türkiye'nin balık, hayvan, kuş ve bitki türleri</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            fontSize: 16, pointerEvents: 'none',
          }}>🔍</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tür adı ara..."
            style={{
              width: '100%', padding: '10px 12px 10px 38px',
              background: '#0d1f0d', border: '1px solid #22c55e22',
              borderRadius: 12, color: '#f0faf0', fontSize: 13, outline: 'none',
            }}
          />
        </div>

        {/* Category tabs */}
        <div className="filter-tabs" style={{ marginBottom: 14 }}>
          {CAT_TABS.map(c => (
            <button
              key={c.id}
              className={`filter-tab ${cat === c.id ? 'active' : ''}`}
              onClick={() => setCat(c.id)}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#4a7a4a', padding: 40 }}>Yükleniyor...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#4a7a4a', padding: 40 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 14 }}>Sonuç bulunamadı</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 11, color: '#4a7a4a', marginBottom: 12 }}>
              {filtered.length} tür listeleniyor
            </div>
            {filtered.map(s => (
              <SpeciesCard
                key={s.id}
                s={s}
                accent={CAT_COLORS[s.category] || '#22c55e'}
                onFav={handleFav}
                favSet={favSet}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
