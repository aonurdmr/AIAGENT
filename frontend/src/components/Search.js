import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const TYPE_CONFIG = {
  spot:    { label: 'Nokta',   icon: '📍', color: '#3b82f6',  accent: '#60a5fa' },
  post:    { label: 'Paylaşım', icon: '📝', color: '#f59e0b', accent: '#fbbf24' },
  species: { label: 'Tür',     icon: '🐟', color: '#22c55e',  accent: '#86efac' },
};

const SUGGESTIONS = [
  'Sazan', 'Alabalık', 'Sapanca', 'Balıkçılık', 'Kamp',
  'Abant', 'Uludağ', 'Levrek', 'Keklik', 'Tilki',
];

function SpotResult({ item, onNav }) {
  return (
    <div className="card" style={{ marginBottom: 8, cursor: 'pointer' }} onClick={() => onNav('/harita')}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: '#3b82f615', border: '1px solid #3b82f625',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
        }}>📍</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{item.name}</div>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 2 }}>{item.description?.slice(0, 80)}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 5, flexWrap: 'wrap' }}>
            {item.species?.slice(0, 3).map(s => (
              <span key={s} style={{
                fontSize: 10, padding: '2px 7px', borderRadius: 20,
                background: '#22c55e15', color: '#86efac', border: '1px solid #22c55e20',
              }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>⭐ {item.rating}</div>
          <div style={{ fontSize: 10, color: 'var(--t-mute)', marginTop: 2 }}>{item.type}</div>
        </div>
      </div>
    </div>
  );
}

function PostResult({ item }) {
  return (
    <div className="card" style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: item.avatar_color || '#22c55e',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, color: '#fff', fontSize: 14,
        }}>{(item.username || 'U')[0].toUpperCase()}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{item.title}</div>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 2 }}>
            @{item.username}{item.location && ` · 📍 ${item.location}`}
          </div>
          <div style={{ fontSize: 12, color: 'var(--t-mid)', marginTop: 4, lineHeight: 1.5 }}>
            {item.content?.slice(0, 100)}{item.content?.length > 100 ? '…' : ''}
          </div>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 4 }}>❤️ {item.likes}</div>
        </div>
      </div>
    </div>
  );
}

function SpeciesResult({ item, onNav }) {
  return (
    <div className="card" style={{ marginBottom: 8, cursor: 'pointer' }} onClick={() => onNav('/turler')}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: '#22c55e15', border: '1px solid #22c55e25',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>{item.emoji || '🐟'}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{item.name}</div>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', fontStyle: 'italic' }}>{item.scientific}</div>
          <div style={{ fontSize: 11, color: 'var(--t-mid)', marginTop: 2 }}>{item.description?.slice(0, 70)}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{
            fontSize: 10, padding: '3px 8px', borderRadius: 20,
            background: '#22c55e18', color: '#86efac', border: '1px solid #22c55e25',
          }}>{item.category}</span>
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  const navigate = useNavigate();
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter,  setFilter]  = useState('all');
  const timerRef = useRef(null);

  const doSearch = useCallback(async (q, type = 'all') => {
    if (!q || q.trim().length < 2) { setResults(null); return; }
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/search`, { params: { q: q.trim(), type } });
      setResults(data);
    } catch { setResults({ results: [], query: q, total: 0 }); }
    setLoading(false);
  }, []);

  function onQueryChange(e) {
    const q = e.target.value;
    setQuery(q);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => doSearch(q, filter), 400);
  }

  function onFilterChange(type) {
    setFilter(type);
    if (query.trim().length >= 2) doSearch(query, type);
  }

  const spots   = results?.results?.filter(r => r._type === 'spot')   || [];
  const posts   = results?.results?.filter(r => r._type === 'post')   || [];
  const species = results?.results?.filter(r => r._type === 'species') || [];

  const total = (filter === 'all' ? results?.total : results?.results?.length) || 0;

  return (
    <div className="page fade-in">
      {/* Header */}
      <div style={{
        background: 'var(--s1)', padding: '52px 16px 16px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 16, pointerEvents: 'none',
          }}>🔍</span>
          <input
            className="ai-input"
            placeholder="Nokta, tür, paylaşım ara…"
            value={query}
            onChange={onQueryChange}
            autoFocus
            style={{ paddingLeft: 42, paddingRight: query ? 42 : 14 }}
          />
          {query && (
            <button onClick={() => { setQuery(''); setResults(null); }} style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: 'var(--t-mute)', cursor: 'pointer', fontSize: 18,
            }}>×</button>
          )}
        </div>

        {/* Type filter */}
        <div className="filter-tabs" style={{ overflowX: 'auto' }}>
          {[
            { id: 'all',     icon: '🌐', label: 'Tümü' },
            { id: 'spots',   icon: '📍', label: 'Noktalar' },
            { id: 'posts',   icon: '📝', label: 'Paylaşımlar' },
            { id: 'species', icon: '🐟', label: 'Türler' },
          ].map(f => (
            <button key={f.id} className={`filter-tab ${filter === f.id ? 'active' : ''}`}
              onClick={() => onFilterChange(f.id)}>
              {f.icon} {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Suggestions (no query) */}
        {!query && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
              POPÜLER ARAMALAR
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => { setQuery(s); doSearch(s, filter); }} style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12,
                  background: 'var(--s2)', border: '1px solid var(--border)',
                  color: 'var(--t-mid)', cursor: 'pointer',
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--t-mute)' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
            Aranıyor…
          </div>
        )}

        {/* Results */}
        {!loading && results && (
          <div>
            <div style={{ fontSize: 12, color: 'var(--t-mute)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--accent)' }}>{total}</strong> sonuç bulundu &ldquo;{results.query}&rdquo; için
            </div>

            {(filter === 'all' || filter === 'spots') && spots.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa', letterSpacing: '.08em', marginBottom: 8 }}>
                  📍 NOKTALAR ({spots.length})
                </div>
                {spots.map(item => <SpotResult key={item.id} item={item} onNav={navigate} />)}
              </div>
            )}

            {(filter === 'all' || filter === 'species') && species.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#86efac', letterSpacing: '.08em', marginBottom: 8 }}>
                  🐟 TÜRLER ({species.length})
                </div>
                {species.map(item => <SpeciesResult key={item.id} item={item} onNav={navigate} />)}
              </div>
            )}

            {(filter === 'all' || filter === 'posts') && posts.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#fbbf24', letterSpacing: '.08em', marginBottom: 8 }}>
                  📝 PAYLAŞIMLAR ({posts.length})
                </div>
                {posts.map(item => <PostResult key={item.id} item={item} />)}
              </div>
            )}

            {total === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--t-mute)' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <div>"{results.query}" için sonuç bulunamadı.</div>
                <div style={{ fontSize: 12, marginTop: 8 }}>Farklı kelimeler deneyin.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
