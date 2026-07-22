import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const TYPE_CONFIG = {
  fishing: { icon: '🎣', color: '#3b82f6', label: 'Balıkçılık' },
  hunting: { icon: '🏹', color: '#ef4444', label: 'Avcılık' },
  camping: { icon: '⛺', color: '#22c55e', label: 'Kamp' },
  combined:{ icon: '🌟', color: '#f59e0b', label: 'Kombine' },
};

const DIFF_COLORS = { kolay: '#22c55e', orta: '#f59e0b', zor: '#ef4444' };

// Simple Turkey map with SVG - approximate regions with dots for spots
// Map bounds: lat 36-42, lng 26-45 → map to SVG 0-400 × 0-200
function latLngToXY(lat, lng) {
  const x = ((lng - 26) / (45 - 26)) * 360 + 20;
  const y = ((42 - lat) / (42 - 36)) * 160 + 20;
  return { x, y };
}

export default function MapView() {
  const [spots, setSpots]       = useState([]);
  const [filter, setFilter]     = useState('all');
  const [selected, setSelected] = useState(null);
  const [weather, setWeather]   = useState(null);
  const [showAdd, setShowAdd]   = useState(false);
  const [newSpot, setNewSpot]   = useState({ name: '', description: '', type: 'fishing', lat: 39, lng: 35 });
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/spots`).then(r => setSpots(r.data)).catch(() => {}),
      axios.post(`${API}/weather`, { lat: 41, lng: 29, activity: filter === 'all' ? 'fishing' : filter })
        .then(r => setWeather(r.data)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? spots : spots.filter(s => s.type === filter);

  const addSpot = async () => {
    if (!newSpot.name) return;
    try {
      const { data } = await axios.post(`${API}/spots`, { ...newSpot, species: [] });
      setSpots(prev => [...prev, data]);
      setShowAdd(false);
      setNewSpot({ name: '', description: '', type: 'fishing', lat: 39, lng: 35 });
    } catch {}
  };

  const scoreColor = (s) => s >= 75 ? '#22c55e' : s >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>🗺️ Nokta Haritası</h1>
        <p>Türkiye genelinde balıkçılık, avcılık ve kamp noktaları</p>
      </div>

      <div style={{ padding: '12px 16px' }}>
        {/* Filter */}
        <div className="filter-tabs" style={{ marginBottom: 12 }}>
          {[['all', '🌍', 'Tümü'], ['fishing', '🎣', 'Balıkçılık'], ['hunting', '🏹', 'Avcılık'], ['camping', '⛺', 'Kamp']].map(([id, ic, lb]) => (
            <button key={id} className={`filter-tab ${filter === id ? 'active' : ''}`}
              onClick={() => setFilter(id)}>{ic} {lb}</button>
          ))}
        </div>

        {/* SVG Turkey Map */}
        <div className="card" style={{ padding: 12, marginBottom: 12 }}>
          <svg viewBox="0 0 400 200" style={{ width: '100%', borderRadius: 10, background: '#0f1f0f' }}>
            {/* Turkey outline (simplified) */}
            <path d="M 20,80 C 40,60 60,55 80,58 L 110,50 140,48 160,52 190,45 220,42 250,40 280,38 310,35 340,33 370,30 390,35 395,50 385,70 370,85 350,95 330,100 310,105 290,110 270,115 250,120 230,125 210,130 190,135 170,140 150,145 130,148 110,150 90,148 70,145 50,140 35,130 25,110 20,95 Z"
              fill="#1a3a1a" stroke="#22c55e33" strokeWidth="1" />

            {/* Sea labels */}
            <text x="60" y="170" fontSize="8" fill="#3b82f644">KARADENİZ</text>
            <text x="200" y="175" fontSize="8" fill="#3b82f644">AKDENİZ</text>

            {/* Spot markers */}
            {filtered.map(spot => {
              const { x, y } = latLngToXY(spot.lat, spot.lng);
              const cfg = TYPE_CONFIG[spot.type] || TYPE_CONFIG.fishing;
              const isSelected = selected?.id === spot.id;
              return (
                <g key={spot.id} onClick={() => setSelected(isSelected ? null : spot)} style={{ cursor: 'pointer' }}>
                  <circle cx={x} cy={y} r={isSelected ? 10 : 7}
                    fill={cfg.color + '33'} stroke={cfg.color}
                    strokeWidth={isSelected ? 2 : 1} />
                  <text x={x} y={y + 4} textAnchor="middle" fontSize="9">{cfg.icon}</text>
                </g>
              );
            })}

            {/* Legend */}
            {Object.entries(TYPE_CONFIG).slice(0, 3).map(([k, v], i) => (
              <g key={k}>
                <circle cx={20 + i * 55} cy={192} r={5} fill={v.color + '44'} stroke={v.color} strokeWidth={1} />
                <text x={29 + i * 55} y={196} fontSize="7" fill="#86efac88">{v.label}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Weather strip */}
        {weather && (
          <div className="card-dark" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 28 }}>
              {weather.conditions === 'Açık' ? '☀️' : weather.conditions === 'Parçalı bulutlu' ? '⛅' : '☁️'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 600 }}>{weather.temperature}°C · {weather.conditions}</div>
              <div style={{ fontSize: 11, color: '#4a6741' }}>💨 {weather.wind_speed} km/s · 🌙 {weather.moon_phase}</div>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              border: `2px solid ${scoreColor(weather.activity_score)}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontWeight: 800, fontSize: 14, color: scoreColor(weather.activity_score) }}>
                {weather.activity_score}
              </span>
              <span style={{ fontSize: 8, color: '#4a6741' }}>SKOR</span>
            </div>
          </div>
        )}

        {/* Selected spot detail */}
        {selected && (
          <div className="card fade-in" style={{ marginBottom: 12, borderColor: TYPE_CONFIG[selected.type]?.color + '44' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 2 }}>
                  {TYPE_CONFIG[selected.type]?.icon} {selected.name}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span className={`tag tag-${selected.type === 'fishing' ? 'blue' : selected.type === 'hunting' ? 'red' : 'green'}`}>
                    {TYPE_CONFIG[selected.type]?.label}
                  </span>
                  <span className="tag tag-amber">⭐ {selected.rating}</span>
                  <span className="tag tag-purple" style={{ color: DIFF_COLORS[selected.difficulty] }}>
                    {selected.difficulty}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{
                background: 'none', border: 'none', color: '#4a6741', fontSize: 18, cursor: 'pointer',
              }}>✕</button>
            </div>
            <p style={{ fontSize: 13, color: '#a0c4a0', lineHeight: 1.5, marginBottom: 10 }}>{selected.description}</p>
            {selected.species.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, color: '#4a6741', marginBottom: 4 }}>TÜR</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {selected.species.map(s => <span key={s} className="tag tag-blue">{s}</span>)}
                </div>
              </div>
            )}
            {selected.facilities.length > 0 && (
              <div>
                <div style={{ fontSize: 11, color: '#4a6741', marginBottom: 4 }}>OLANAKLAR</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {selected.facilities.map(f => <span key={f} className="tag tag-green">{f}</span>)}
                </div>
              </div>
            )}
            <div style={{ fontSize: 12, color: '#4a6741', marginTop: 8 }}>📅 Sezon: {selected.season}</div>
            {selected.regulations && (
              <div style={{ fontSize: 12, color: '#fcd34d', marginTop: 6, background: '#f59e0b11', padding: '6px 10px', borderRadius: 8 }}>
                ⚖️ {selected.regulations}
              </div>
            )}
          </div>
        )}

        {/* Spot list */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>
            {filter === 'all' ? 'Tüm Noktalar' : TYPE_CONFIG[filter]?.label} ({filtered.length})
          </h3>
          <button className="btn-ghost" style={{ fontSize: 11, padding: '4px 10px' }}
            onClick={() => setShowAdd(true)}>+ Nokta Ekle</button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div className="spinner" />
          </div>
        ) : (
          filtered.map(spot => {
            const cfg = TYPE_CONFIG[spot.type] || TYPE_CONFIG.fishing;
            return (
              <div key={spot.id} className="post-card" style={{ marginBottom: 8, padding: 14, cursor: 'pointer' }}
                onClick={() => setSelected(spot)}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: cfg.color + '22', border: `1px solid ${cfg.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
                  }}>{cfg.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#e2e8f0', marginBottom: 2 }}>{spot.name}</div>
                    <div style={{ fontSize: 11, color: '#4a6741' }}>
                      ⭐ {spot.rating} · {spot.review_count} değerlendirme · {spot.difficulty}
                    </div>
                    {spot.species.length > 0 && (
                      <div style={{ fontSize: 11, color: '#86efac', marginTop: 2 }}>
                        {spot.species.slice(0, 3).join(' · ')}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 16, color: '#4a6741' }}>›</span>
                </div>
              </div>
            );
          })
        )}

        {/* Add spot modal */}
        {showAdd && (
          <div style={{
            position: 'fixed', inset: 0, background: '#000a', zIndex: 200,
            display: 'flex', alignItems: 'flex-end',
          }} onClick={() => setShowAdd(false)}>
            <div style={{
              background: '#122212', borderRadius: '20px 20px 0 0',
              padding: 20, width: '100%', maxWidth: 430, margin: '0 auto',
            }} onClick={e => e.stopPropagation()}>
              <h3 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>📍 Yeni Nokta Ekle</h3>
              {[
                ['İsim *', 'name', 'text', 'Nokta adı'],
                ['Açıklama', 'description', 'text', 'Kısa açıklama'],
                ['Enlem', 'lat', 'number', '39.0'],
                ['Boylam', 'lng', 'number', '35.0'],
              ].map(([lb, key, tp, ph]) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 12, color: '#4a6741', display: 'block', marginBottom: 4 }}>{lb}</label>
                  <input type={tp} placeholder={ph} className="input-field"
                    value={newSpot[key]} onChange={e => setNewSpot(p => ({ ...p, [key]: tp === 'number' ? parseFloat(e.target.value) || 0 : e.target.value }))} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: '#4a6741', display: 'block', marginBottom: 4 }}>Tür</label>
                <select className="input-field" value={newSpot.type}
                  onChange={e => setNewSpot(p => ({ ...p, type: e.target.value }))}>
                  <option value="fishing">🎣 Balıkçılık</option>
                  <option value="hunting">🏹 Avcılık</option>
                  <option value="camping">⛺ Kamp</option>
                  <option value="combined">🌟 Kombine</option>
                </select>
              </div>
              <button className="btn-primary" onClick={addSpot}>✓ Nokta Ekle</button>
              <button className="btn-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}
                onClick={() => setShowAdd(false)}>İptal</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
