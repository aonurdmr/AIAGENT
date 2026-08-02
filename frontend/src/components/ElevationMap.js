import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PRESET_SPOTS = [
  { name: 'Uludağ Zirvesi',      lat: 40.1218, lng: 29.2231, icon: '🏔️', type: 'Dağ' },
  { name: 'Kaçkar Zirvesi',      lat: 40.8284, lng: 41.1437, icon: '🗻', type: 'Dağ' },
  { name: 'Erciyes Dağı',        lat: 38.5361, lng: 35.4494, icon: '🌋', type: 'Dağ' },
  { name: 'Sapanca Gölü',        lat: 40.7119, lng: 30.2548, icon: '🏞️', type: 'Göl' },
  { name: 'Abant Gölü',          lat: 40.6097, lng: 31.2831, icon: '🏕️', type: 'Kamp' },
  { name: 'Nemrut Dağı',         lat: 37.9813, lng: 38.7397, icon: '🗿', type: 'Dağ' },
  { name: 'Pamukkale',           lat: 37.9200, lng: 29.1189, icon: '💎', type: 'Doğa' },
  { name: 'Göreme - Kapadokya',  lat: 38.6432, lng: 34.8289, icon: '🌄', type: 'Doğa' },
  { name: 'Antalya Sahili',      lat: 36.8969, lng: 30.7133, icon: '🏖️', type: 'Sahil' },
  { name: 'Bozcaada',            lat: 39.8300, lng: 26.0500, icon: '🏝️', type: 'Ada' },
];

const TYPE_COLORS = {
  'Dağ':   '#60a5fa',
  'Göl':   '#22d3ee',
  'Kamp':  '#84cc16',
  'Doğa':  '#a78bfa',
  'Sahil': '#f59e0b',
  'Ada':   '#06b6d4',
};

async function lookupElevation(lat, lng) {
  const res = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`);
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return data.results?.[0]?.elevation ?? null;
}

async function lookupMultiple(points) {
  const locs = points.map(p => `${p.lat},${p.lng}`).join('|');
  const res = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${locs}`);
  const data = await res.json();
  return data.results?.map(r => r.elevation) ?? points.map(() => null);
}

function ElevBar({ elev, maxElev }) {
  const pct = maxElev > 0 ? Math.min(elev / maxElev, 1) : 0;
  const color = elev > 2000 ? '#60a5fa' : elev > 1000 ? '#a78bfa' : elev > 500 ? '#22d3ee' : '#22c55e';
  return (
    <div style={{ background: '#374151', borderRadius: 4, height: 6, overflow: 'hidden', flex: 1, marginTop: 4 }}>
      <div style={{ width: `${pct * 100}%`, height: '100%', background: color, borderRadius: 4, transition: 'width .4s' }} />
    </div>
  );
}

export default function ElevationMap() {
  const navigate = useNavigate();
  const [elevations, setElevations] = useState({});
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [custom, setCustom] = useState({ lat: '', lng: '', name: '' });
  const [customResult, setCustomResult] = useState(null);
  const [customLoading, setCustomLoading] = useState(false);
  const [filter, setFilter] = useState('Tümü');

  const loadAll = async () => {
    setLoading(true);
    try {
      const elevs = await lookupMultiple(PRESET_SPOTS);
      const map = {};
      PRESET_SPOTS.forEach((s, i) => { map[s.name] = elevs[i]; });
      setElevations(map);
      setLoaded(true);
    } catch {
      setLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCustom = async () => {
    const lat = parseFloat(custom.lat);
    const lng = parseFloat(custom.lng);
    if (isNaN(lat) || isNaN(lng)) return;
    setCustomLoading(true);
    try {
      const elev = await lookupElevation(lat, lng);
      setCustomResult({ lat, lng, name: custom.name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`, elev });
    } catch {
      setCustomResult({ lat, lng, name: custom.name, elev: null });
    } finally {
      setCustomLoading(false);
    }
  };

  const types = ['Tümü', ...Array.from(new Set(PRESET_SPOTS.map(s => s.type)))];
  const spots = filter === 'Tümü' ? PRESET_SPOTS : PRESET_SPOTS.filter(s => s.type === filter);
  const maxElev = Math.max(...Object.values(elevations).filter(Boolean));

  const INPUT = { background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '10px 12px', fontSize: 14, width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛰️ Yükseklik Haritası</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          Open-Elevation API · Türkiye'nin önemli doğa noktalarının deniz seviyesinden yüksekliği
        </div>
      </div>

      {!loaded && (
        <div style={{ padding: '0 16px 14px' }}>
          <button onClick={loadAll} disabled={loading}
            style={{ width: '100%', background: loading ? '#374151' : '#3b82f6', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, cursor: loading ? 'default' : 'pointer' }}>
            {loading ? '⏳ Yükseklikler Sorgulanıyor…' : '⛰️ Yükseklikleri Yükle'}
          </button>
        </div>
      )}

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            background: filter === t ? '#3b82f6' : '#1f2937',
            color: filter === t ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: filter === t ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {spots.map(s => {
          const elev = elevations[s.name];
          const color = TYPE_COLORS[s.type] || '#9ca3af';
          return (
            <div key={s.name} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{s.name}</div>
                    <span style={{ fontSize: 10, background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>{s.type}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {elev !== undefined && elev !== null ? (
                    <div style={{ fontSize: 18, fontWeight: 900, color: elev > 2000 ? '#60a5fa' : elev > 1000 ? '#a78bfa' : '#22c55e' }}>
                      {elev.toLocaleString('tr-TR')}
                      <span style={{ fontSize: 11, fontWeight: 400, color: '#6b7280' }}> m</span>
                    </div>
                  ) : loaded ? (
                    <div style={{ fontSize: 12, color: '#6b7280' }}>—</div>
                  ) : (
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Yükle</div>
                  )}
                  <div style={{ fontSize: 10, color: '#6b7280' }}>{s.lat.toFixed(2)}, {s.lng.toFixed(2)}</div>
                </div>
              </div>
              {loaded && elev !== null && elev !== undefined && (
                <ElevBar elev={elev} maxElev={maxElev} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ margin: '16px 16px 0', background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151' }}>
        <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>🔍 KOORDİNAT SORGULA</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Enlem</div>
            <input value={custom.lat} onChange={e => setCustom(c => ({ ...c, lat: e.target.value }))}
              placeholder="41.0082" style={INPUT} />
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Boylam</div>
            <input value={custom.lng} onChange={e => setCustom(c => ({ ...c, lng: e.target.value }))}
              placeholder="29.0050" style={INPUT} />
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>İsim (isteğe bağlı)</div>
          <input value={custom.name} onChange={e => setCustom(c => ({ ...c, name: e.target.value }))}
            placeholder="Konumum" style={INPUT} />
        </div>
        <button onClick={handleCustom} disabled={customLoading || !custom.lat || !custom.lng}
          style={{ width: '100%', background: customLoading ? '#374151' : '#22c55e', color: '#fff', border: 'none', borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          {customLoading ? '⏳ Sorgulanıyor…' : '⛰️ Yüksekliği Bul'}
        </button>

        {customResult && (
          <div style={{ marginTop: 12, background: '#374151', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb' }}>{customResult.name}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#22c55e', marginTop: 4 }}>
              {customResult.elev !== null ? `${customResult.elev.toLocaleString('tr-TR')} m` : '— (veri yok)'}
            </div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
              {customResult.lat.toFixed(6)}, {customResult.lng.toFixed(6)}
            </div>
          </div>
        )}
      </div>

      <div style={{ margin: '14px 16px 0', background: '#1c1f26', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151' }}>
        <div style={{ fontSize: 10, color: '#6b7280' }}>📡 Open-Elevation API (api.open-elevation.com) · SRTM verisi · Ücretsiz & açık kaynak</div>
      </div>
    </div>
  );
}
