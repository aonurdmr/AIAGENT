import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function toRad(deg) { return deg * Math.PI / 180; }

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function bearing(lat1, lng1, lat2, lng2) {
  const dLng = toRad(lng2 - lng1);
  const x = Math.sin(dLng) * Math.cos(toRad(lat2));
  const y = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) - Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
  return (toDeg(Math.atan2(x, y)) + 360) % 360;
}

function toDeg(rad) { return rad * 180 / Math.PI; }

function ddToDms(dd) {
  const abs = Math.abs(dd);
  const d = Math.floor(abs);
  const m = Math.floor((abs - d) * 60);
  const s = ((abs - d) * 60 - m) * 60;
  return { d, m, s: s.toFixed(3) };
}

function dmsToDd(d, m, s) {
  return parseFloat(d) + parseFloat(m) / 60 + parseFloat(s) / 3600;
}

function bearingLabel(deg) {
  const dirs = ['Kuzey', 'KD', 'Doğu', 'GD', 'Güney', 'GB', 'Batı', 'KB'];
  return dirs[Math.round(deg / 45) % 8];
}

const SAVED_SPOTS = [
  { name: 'İstanbul Merkez', lat: 41.0082, lng: 28.9784 },
  { name: 'Ankara Merkez', lat: 39.9334, lng: 32.8597 },
  { name: 'Sapanca Gölü', lat: 40.7119, lng: 30.2548 },
  { name: 'Abant Gölü', lat: 40.6097, lng: 31.2831 },
  { name: 'Kapadokya', lat: 38.6432, lng: 34.8289 },
];

const INPUT = { background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '10px 12px', fontSize: 14, width: '100%', boxSizing: 'border-box' };

export default function GPSTools() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('convert');

  // DD <-> DMS conversion
  const [dd, setDd] = useState({ lat: '41.0082', lng: '28.9784' });
  const latDms = ddToDms(parseFloat(dd.lat) || 0);
  const lngDms = ddToDms(parseFloat(dd.lng) || 0);

  // Distance calculator
  const [p1, setP1] = useState({ lat: '41.0082', lng: '28.9784' });
  const [p2, setP2] = useState({ lat: '40.7119', lng: '30.2548' });
  const dist = haversine(parseFloat(p1.lat)||0, parseFloat(p1.lng)||0, parseFloat(p2.lat)||0, parseFloat(p2.lng)||0);
  const brg  = bearing(parseFloat(p1.lat)||0, parseFloat(p1.lng)||0, parseFloat(p2.lat)||0, parseFloat(p2.lng)||0);

  // DMS to DD
  const [dms, setDms] = useState({ latD: '41', latM: '0', latS: '29.52', lngD: '28', lngM: '58', lngS: '42.24' });
  const convertedLat = dmsToDd(dms.latD, dms.latM, dms.latS).toFixed(6);
  const convertedLng = dmsToDd(dms.lngD, dms.lngM, dms.lngS).toFixed(6);

  const tabs = [
    { id: 'convert', label: 'DD ↔ DMS', icon: '🔄' },
    { id: 'distance', label: 'Mesafe', icon: '📏' },
    { id: 'spots', label: 'Noktalar', icon: '📍' },
  ];

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧭 GPS Araçları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Koordinat dönüştürücü, mesafe hesabı ve favori noktalar</div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, background: tab === t.id ? '#3b82f6' : '#1f2937', color: tab === t.id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === t.id ? '#3b82f6' : '#374151',
            borderRadius: 12, padding: '10px 0', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>

        {tab === 'convert' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>ONDALIK DERECE (DD) → DMS</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Enlem (DD)</div>
                  <input value={dd.lat} onChange={e => setDd(v => ({ ...v, lat: e.target.value }))} style={INPUT} placeholder="41.0082" />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Boylam (DD)</div>
                  <input value={dd.lng} onChange={e => setDd(v => ({ ...v, lng: e.target.value }))} style={INPUT} placeholder="28.9784" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>Enlem DMS</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', marginTop: 2 }}>
                    {latDms.d}° {latDms.m}' {latDms.s}" {parseFloat(dd.lat) >= 0 ? 'K' : 'G'}
                  </div>
                </div>
                <div style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>Boylam DMS</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', marginTop: 2 }}>
                    {lngDms.d}° {lngDms.m}' {lngDms.s}" {parseFloat(dd.lng) >= 0 ? 'D' : 'B'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151' }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>DMS → ONDALIK DERECE (DD)</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 10 }}>
                {[['Enlem °', 'latD'], ['\'', 'latM'], ['"', 'latS']].map(([lbl, key]) => (
                  <div key={key}>
                    <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>{lbl}</div>
                    <input value={dms[key]} onChange={e => setDms(v => ({ ...v, [key]: e.target.value }))} style={INPUT} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 12 }}>
                {[['Boylam °', 'lngD'], ['\'', 'lngM'], ['"', 'lngS']].map(([lbl, key]) => (
                  <div key={key}>
                    <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>{lbl}</div>
                    <input value={dms[key]} onChange={e => setDms(v => ({ ...v, [key]: e.target.value }))} style={INPUT} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>Enlem DD</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#06b6d4', marginTop: 2 }}>{convertedLat}</div>
                </div>
                <div style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>Boylam DD</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#06b6d4', marginTop: 2 }}>{convertedLng}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'distance' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>📍 NOKTA 1</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Enlem</div>
                  <input value={p1.lat} onChange={e => setP1(v => ({ ...v, lat: e.target.value }))} style={INPUT} placeholder="41.0082" />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Boylam</div>
                  <input value={p1.lng} onChange={e => setP1(v => ({ ...v, lng: e.target.value }))} style={INPUT} placeholder="28.9784" />
                </div>
              </div>
            </div>

            <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>📍 NOKTA 2</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Enlem</div>
                  <input value={p2.lat} onChange={e => setP2(v => ({ ...v, lat: e.target.value }))} style={INPUT} placeholder="40.7119" />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Boylam</div>
                  <input value={p2.lng} onChange={e => setP2(v => ({ ...v, lng: e.target.value }))} style={INPUT} placeholder="30.2548" />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#1f2937', borderRadius: 14, padding: '16px', border: '1px solid #22c55e44', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>📏 MESAFE</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#22c55e' }}>{dist.toFixed(2)}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>km (kuş uçuşu)</div>
                <div style={{ fontSize: 11, color: '#4b5563', marginTop: 4 }}>{(dist * 1000).toFixed(0)} m</div>
              </div>
              <div style={{ background: '#1f2937', borderRadius: 14, padding: '16px', border: '1px solid #3b82f644', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>🧭 YÖN</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#3b82f6' }}>{brg.toFixed(0)}°</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{bearingLabel(brg)}</div>
              </div>
            </div>

            <a href={`https://www.google.com/maps/dir/${p1.lat},${p1.lng}/${p2.lat},${p2.lng}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', marginTop: 12, textAlign: 'center', background: '#3b82f6', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              🗺️ Google Maps'te Yol Tarifi Al
            </a>
          </div>
        )}

        {tab === 'spots' && (
          <div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>Hızlı konum kopyalama ve haritada gösterme</div>
            {SAVED_SPOTS.map((s, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>📍 {s.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                      {s.lat.toFixed(4)}, {s.lng.toFixed(4)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => { setP1({ lat: s.lat.toString(), lng: s.lng.toString() }); setTab('distance'); }}
                      style={{ background: '#374151', border: 'none', color: '#9ca3af', borderRadius: 8, padding: '6px 10px', fontSize: 11, cursor: 'pointer' }}>
                      Başlangıç
                    </button>
                    <a href={`https://www.google.com/maps?q=${s.lat},${s.lng}`} target="_blank" rel="noopener noreferrer"
                      style={{ background: '#3b82f6', border: 'none', color: '#fff', borderRadius: 8, padding: '6px 10px', fontSize: 11, cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                      🗺️
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
