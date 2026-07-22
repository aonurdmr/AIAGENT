import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

// Fix leaflet default icon issue with CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const TYPE_CFG = {
  fishing:  { emoji: '🎣', color: '#60a5fa', label: 'Balıkçılık', glow: '#60a5fa' },
  hunting:  { emoji: '🏹', color: '#f87171', label: 'Avcılık',   glow: '#f87171' },
  camping:  { emoji: '⛺', color: '#34d399', label: 'Kamp',       glow: '#34d399' },
  combined: { emoji: '🌟', color: '#fbbf24', label: 'Kombine',   glow: '#fbbf24' },
};
const DIFF_COLOR = { kolay: '#34d399', orta: '#fbbf24', zor: '#f87171' };

// Custom DivIcon factory
function makeIcon(type, selected = false) {
  const cfg = TYPE_CFG[type] || TYPE_CFG.fishing;
  const size = selected ? 46 : 36;
  return L.divIcon({
    className: '',
    iconSize:  [size, size],
    iconAnchor:[size / 2, size / 2],
    html: `
      <div style="
        width:${size}px;height:${size}px;border-radius:50%;
        background:${cfg.color}22;
        border:2px solid ${cfg.color};
        display:flex;align-items:center;justify-content:center;
        font-size:${selected ? 20 : 16}px;
        box-shadow:0 0 ${selected ? 16 : 8}px ${cfg.glow}66;
        transition:all .2s;
      ">${cfg.emoji}</div>`,
  });
}

function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => { map.setView([lat, lng], map.getZoom()); }, [lat, lng, map]);
  return null;
}

function ScoreRing({ score }) {
  const color = score >= 75 ? '#34d399' : score >= 50 ? '#fbbf24' : '#f87171';
  return (
    <div style={{
      width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
      border: `3px solid ${color}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: color + '11',
    }}>
      <span style={{ fontWeight: 800, fontSize: 16, color, lineHeight: 1 }}>{score}</span>
      <span style={{ fontSize: 8, color: '#4a7a4a' }}>SKOR</span>
    </div>
  );
}

export default function MapView() {
  const [spots, setSpots]       = useState([]);
  const [filter, setFilter]     = useState('all');
  const [selected, setSelected] = useState(null);
  const [weather, setWeather]   = useState(null);
  const [showAdd, setShowAdd]   = useState(false);
  const [loading, setLoading]   = useState(true);
  const [mapCenter, setMapCenter] = useState([39.0, 35.0]);
  const [newSpot, setNewSpot] = useState({
    name: '', description: '', type: 'fishing', lat: 39, lng: 35,
    species: '', facilities: '', difficulty: 'orta', season: 'Tüm yıl',
  });

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/spots`).then(r => setSpots(r.data)).catch(() => {}),
      axios.post(`${API}/weather`, { lat: 41, lng: 29, activity: 'fishing' })
        .then(r => setWeather(r.data)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? spots : spots.filter(s => s.type === filter);

  const addSpot = async () => {
    if (!newSpot.name) return;
    try {
      const payload = {
        ...newSpot,
        lat: parseFloat(newSpot.lat) || 39,
        lng: parseFloat(newSpot.lng) || 35,
        species:    newSpot.species.split(',').map(s => s.trim()).filter(Boolean),
        facilities: newSpot.facilities.split(',').map(s => s.trim()).filter(Boolean),
      };
      const { data } = await axios.post(`${API}/spots`, payload);
      setSpots(prev => [...prev, data]);
      setShowAdd(false);
      setMapCenter([data.lat, data.lng]);
    } catch {}
  };

  const handleMarkerClick = (spot) => {
    setSelected(prev => prev?.id === spot.id ? null : spot);
    setMapCenter([spot.lat, spot.lng]);
  };

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <h1>🗺️ Nokta Haritası</h1>
        <p>Türkiye genelinde {spots.length} outdoor nokta</p>
      </div>

      <div style={{ padding: '12px 16px' }}>
        {/* Filter tabs */}
        <div className="filter-tabs" style={{ marginBottom: 12 }}>
          {[
            ['all', '🌍', 'Tümü'],
            ['fishing', '🎣', 'Balıkçılık'],
            ['hunting', '🏹', 'Avcılık'],
            ['camping', '⛺', 'Kamp'],
          ].map(([id, ic, lb]) => (
            <button key={id}
              className={`filter-tab ${filter === id ? 'active' : ''}`}
              onClick={() => setFilter(id)}>
              {ic} {lb}
            </button>
          ))}
        </div>

        {/* Real Leaflet Map */}
        <div style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 12,
          border: '1px solid #22c55e22', boxShadow: '0 8px 32px #000a' }}>
          <MapContainer
            center={mapCenter}
            zoom={6}
            style={{ height: 300, width: '100%', background: '#0a1a0a' }}
            zoomControl={false}
          >
            <RecenterMap lat={mapCenter[0]} lng={mapCenter[1]} />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              subdomains="abcd"
              maxZoom={19}
            />
            {filtered.map(spot => (
              <Marker
                key={spot.id}
                position={[spot.lat, spot.lng]}
                icon={makeIcon(spot.type, selected?.id === spot.id)}
                eventHandlers={{ click: () => handleMarkerClick(spot) }}
              >
                <Popup className="dark-popup">
                  <div style={{
                    background: '#1a2e1a', border: '1px solid #22c55e33',
                    borderRadius: 12, padding: '10px 14px', minWidth: 180,
                    color: '#e2e8f0', fontFamily: 'system-ui',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                      {TYPE_CFG[spot.type]?.emoji} {spot.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#86efac', marginBottom: 6 }}>
                      ⭐ {spot.rating} · {spot.review_count} değerlendirme
                    </div>
                    {spot.species.length > 0 && (
                      <div style={{ fontSize: 11, color: '#60a5fa' }}>
                        {spot.species.slice(0, 3).join(' · ')}
                      </div>
                    )}
                    <div style={{ fontSize: 11, color: '#4a7a4a', marginTop: 4 }}>
                      📅 {spot.season}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Weather strip */}
        {weather && (
          <div style={{
            background: '#1a2e1a', border: '1px solid #22c55e1a', borderRadius: 14,
            padding: '12px 14px', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 32 }}>
              {{'Açık':'☀️','Parçalı bulutlu':'⛅','Bulutlu':'☁️','Hafif yağmur':'🌦️'}[weather.conditions] || '🌡️'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#e2e8f0', fontWeight: 600 }}>
                {weather.temperature}°C · {weather.conditions}
              </div>
              <div style={{ fontSize: 11, color: '#4a7a4a', marginTop: 2 }}>
                💨 {weather.wind_speed} km/s &nbsp;·&nbsp; 🌊 %{weather.humidity} &nbsp;·&nbsp; 🌙 {weather.moon_phase}
              </div>
            </div>
            <ScoreRing score={weather.activity_score} />
          </div>
        )}

        {/* Selected spot detail */}
        {selected && (
          <div className="result-card fade-in" style={{ marginBottom: 14 }}>
            <div className="result-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                    {TYPE_CFG[selected.type]?.emoji} {selected.name}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span className={`tag tag-${selected.type==='fishing'?'blue':selected.type==='hunting'?'red':'green'}`}>
                      {TYPE_CFG[selected.type]?.label}
                    </span>
                    <span className="tag tag-amber">⭐ {selected.rating}</span>
                    <span className="tag" style={{
                      background: DIFF_COLOR[selected.difficulty] + '18',
                      color: DIFF_COLOR[selected.difficulty],
                      border: `1px solid ${DIFF_COLOR[selected.difficulty]}30`,
                    }}>{selected.difficulty}</span>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} style={{
                  background: 'none', border: 'none', color: '#4a7a4a', fontSize: 18,
                  cursor: 'pointer', padding: '0 4px',
                }}>✕</button>
              </div>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: 13, color: '#a0c4a0', lineHeight: 1.6, marginBottom: 10 }}>
                {selected.description}
              </p>
              {selected.species.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600, marginBottom: 4, letterSpacing: '.06em' }}>TÜR</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {selected.species.map(s => <span key={s} className="tag tag-blue">{s}</span>)}
                  </div>
                </div>
              )}
              {selected.facilities.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600, marginBottom: 4, letterSpacing: '.06em' }}>OLANAKLAR</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {selected.facilities.map(f => <span key={f} className="tag tag-green">{f}</span>)}
                  </div>
                </div>
              )}
              <div style={{ fontSize: 12, color: '#4a7a4a' }}>📅 Sezon: {selected.season}</div>
              {selected.regulations && (
                <div style={{
                  fontSize: 12, color: '#fcd34d', marginTop: 8,
                  background: '#f59e0b11', padding: '8px 12px', borderRadius: 8,
                  border: '1px solid #f59e0b22',
                }}>⚖️ {selected.regulations}</div>
              )}
            </div>
          </div>
        )}

        {/* Spots list */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>
            {filter === 'all' ? 'Tüm Noktalar' : TYPE_CFG[filter]?.label} ({filtered.length})
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
            const cfg = TYPE_CFG[spot.type] || TYPE_CFG.fishing;
            const isSel = selected?.id === spot.id;
            return (
              <div key={spot.id}
                onClick={() => handleMarkerClick(spot)}
                style={{
                  background: isSel ? '#1a2e1a' : '#122212',
                  border: `1px solid ${isSel ? cfg.color + '44' : '#22c55e1a'}`,
                  borderRadius: 14, padding: 14, marginBottom: 8,
                  cursor: 'pointer', transition: 'all .2s',
                }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: cfg.color + '18', border: `1px solid ${cfg.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                    boxShadow: isSel ? `0 0 12px ${cfg.color}44` : 'none',
                  }}>{cfg.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 2 }}>{spot.name}</div>
                    <div style={{ fontSize: 11, color: '#4a7a4a' }}>
                      ⭐ {spot.rating} · {spot.review_count} değerlendirme · {spot.difficulty}
                    </div>
                    {spot.species.length > 0 && (
                      <div style={{ fontSize: 11, color: cfg.color, marginTop: 2 }}>
                        {spot.species.slice(0, 3).join(' · ')}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 16, color: '#4a7a4a', transition: 'transform .2s',
                    transform: isSel ? 'rotate(90deg)' : 'none' }}>›</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add spot modal */}
      {showAdd && (
        <div style={{
          position: 'fixed', inset: 0, background: '#000c', zIndex: 200,
          display: 'flex', alignItems: 'flex-end',
        }} onClick={() => setShowAdd(false)}>
          <div style={{
            background: '#0d1f0d',
            border: '1px solid #22c55e22',
            borderRadius: '20px 20px 0 0',
            padding: 20, width: '100%', maxWidth: 430, margin: '0 auto',
            maxHeight: '85vh', overflowY: 'auto',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: '#22c55e33', borderRadius: 2, margin: '0 auto 16px' }} />
            <h3 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>📍 Yeni Nokta Ekle</h3>

            {[
              ['İsim *', 'name', 'text', 'Nokta adı'],
              ['Açıklama', 'description', 'text', 'Kısa açıklama'],
              ['Tür/Hayvan (virgülle)', 'species', 'text', 'ör. Sazan, Levrek'],
              ['Olanaklar (virgülle)', 'facilities', 'text', 'ör. Otopark, Tuvalet'],
              ['Sezon', 'season', 'text', 'ör. Tüm yıl, İlkbahar-Yaz'],
            ].map(([lb, key, tp, ph]) => (
              <div key={key} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, color: '#4a7a4a', display: 'block', marginBottom: 4 }}>{lb}</label>
                <input type={tp} placeholder={ph} className="input-field"
                  value={newSpot[key]}
                  onChange={e => setNewSpot(p => ({ ...p, [key]: e.target.value }))} />
              </div>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              {[['Enlem', 'lat', '39.0'], ['Boylam', 'lng', '35.0']].map(([lb, key, ph]) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: '#4a7a4a', display: 'block', marginBottom: 4 }}>{lb}</label>
                  <input type="number" placeholder={ph} className="input-field"
                    value={newSpot[key]}
                    onChange={e => setNewSpot(p => ({ ...p, [key]: e.target.value }))} />
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12, color: '#4a7a4a', display: 'block', marginBottom: 4 }}>Tür</label>
                <select className="input-field" value={newSpot.type}
                  onChange={e => setNewSpot(p => ({ ...p, type: e.target.value }))}>
                  <option value="fishing">🎣 Balıkçılık</option>
                  <option value="hunting">🏹 Avcılık</option>
                  <option value="camping">⛺ Kamp</option>
                  <option value="combined">🌟 Kombine</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#4a7a4a', display: 'block', marginBottom: 4 }}>Zorluk</label>
                <select className="input-field" value={newSpot.difficulty}
                  onChange={e => setNewSpot(p => ({ ...p, difficulty: e.target.value }))}>
                  <option value="kolay">🟢 Kolay</option>
                  <option value="orta">🟡 Orta</option>
                  <option value="zor">🔴 Zor</option>
                </select>
              </div>
            </div>

            <button className="btn-primary" onClick={addSpot}>✓ Nokta Ekle</button>
            <button className="btn-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}
              onClick={() => setShowAdd(false)}>İptal</button>
          </div>
        </div>
      )}

      {/* Leaflet dark popup fix */}
      <style>{`
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-container { font-family: system-ui !important; }
        .leaflet-control-attribution { background: #0009 !important; color: #4a7a4a !important; font-size: 10px !important; }
        .leaflet-control-attribution a { color: #22c55e88 !important; }
      `}</style>
    </div>
  );
}
