import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const USGS = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

const MAG_LEVEL = m => m >= 6 ? { label: 'Büyük', color: '#ef4444' }
  : m >= 5 ? { label: 'Orta Büyük', color: '#f97316' }
  : m >= 4 ? { label: 'Orta', color: '#f59e0b' }
  : m >= 3 ? { label: 'Küçük', color: '#84cc16' }
  : { label: 'Hafif', color: '#22c55e' };

function timeAgo(ts) {
  const sec = Math.floor((Date.now() - ts) / 1000);
  if (sec < 60) return `${sec}sn önce`;
  if (sec < 3600) return `${Math.floor(sec / 60)}dk önce`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}sa önce`;
  return `${Math.floor(sec / 86400)} gün önce`;
}

async function fetchQuakes(days, minMag) {
  const end = new Date().toISOString();
  const start = new Date(Date.now() - days * 86400000).toISOString();
  const params = new URLSearchParams({
    format: 'geojson',
    starttime: start,
    endtime: end,
    minmagnitude: minMag,
    minlatitude: '36', maxlatitude: '42',
    minlongitude: '26', maxlongitude: '45',
    orderby: 'time',
    limit: '50',
  });
  const res = await fetch(`${USGS}?${params}`);
  const data = await res.json();
  return data.features || [];
}

function QuakeRow({ q, onClick }) {
  const props = q.properties;
  const mag = props.mag || 0;
  const lvl = MAG_LEVEL(mag);
  const coords = q.geometry?.coordinates;
  const depth = coords?.[2] ? `${coords[2].toFixed(0)}km` : '—';
  const place = props.place?.replace('Turkey', 'Türkiye') || '—';

  return (
    <div onClick={() => onClick(q)} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: `1px solid ${lvl.color}33`, cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: lvl.color + '22', border: `2px solid ${lvl.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 16, fontWeight: 900, color: lvl.color }}>{mag.toFixed(1)}</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb' }}>{place}</div>
            <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>
              Derinlik: {depth} · {timeAgo(props.time)}
            </div>
          </div>
        </div>
        <span style={{ fontSize: 10, background: lvl.color + '22', color: lvl.color, borderRadius: 20, padding: '3px 8px', fontWeight: 600 }}>{lvl.label}</span>
      </div>
    </div>
  );
}

function QuakeDetail({ q, onClose }) {
  const props = q.properties;
  const mag = props.mag || 0;
  const lvl = MAG_LEVEL(mag);
  const coords = q.geometry?.coordinates || [];
  const place = props.place?.replace('Turkey', 'Türkiye') || '—';
  const date = new Date(props.time).toLocaleString('tr-TR');

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000b', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: lvl.color + '22', border: `3px solid ${lvl.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: lvl.color }}>{mag.toFixed(1)}</span>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb' }}>{place}</div>
            <span style={{ fontSize: 11, background: lvl.color + '22', color: lvl.color, borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>{lvl.label}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'Büyüklük', value: mag.toFixed(1) + ' M', icon: '📊' },
            { label: 'Derinlik', value: coords[2] ? `${coords[2].toFixed(1)} km` : '—', icon: '⬇️' },
            { label: 'Enlem', value: coords[1] ? coords[1].toFixed(4) : '—', icon: '🌐' },
            { label: 'Boylam', value: coords[0] ? coords[0].toFixed(4) : '—', icon: '🌐' },
            { label: 'Tarih / Saat', value: date, icon: '📅' },
            { label: 'Kaynak', value: 'USGS', icon: '📡' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb', marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {coords[0] && coords[1] && (
          <a href={`https://www.google.com/maps?q=${coords[1]},${coords[0]}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', textAlign: 'center', background: '#3b82f6', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, textDecoration: 'none', marginBottom: 10 }}>
            🗺️ Haritada Göster
          </a>
        )}

        <div style={{ background: '#1c1f26', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151' }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🎣 BALIKÇILIK NOTU</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>
            {mag >= 5 ? 'Büyük deprem sonrası balıklar derin sulara çekilebilir. 1-2 gün bekleyin.' :
             mag >= 4 ? 'Orta deprem balık aktivitesini geçici olarak düşürebilir.' :
             'Hafif sarsıntı. Balıkçılık aktivitesi üzerinde önemli bir etkisi beklenmez.'}
          </div>
        </div>
      </div>
    </div>
  );
}

const DAYS_OPT = [1, 3, 7, 30];
const MAG_OPT = [2, 3, 4, 5];

export default function EarthquakeTracker() {
  const navigate = useNavigate();
  const [quakes, setQuakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(7);
  const [minMag, setMinMag] = useState(3);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchQuakes(days, minMag)
      .then(setQuakes)
      .catch(() => setError('Deprem verisi yüklenemedi.'))
      .finally(() => setLoading(false));
  }, [days, minMag]);

  const biggest = quakes.length > 0
    ? quakes.reduce((a, b) => (b.properties.mag || 0) > (a.properties.mag || 0) ? b : a)
    : null;

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌍 Deprem Takibi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          USGS Earthquake API · Türkiye'de son depremler
        </div>
      </div>

      {biggest && !loading && (
        <div style={{ margin: '0 16px 14px', background: '#450a0a', borderRadius: 14, padding: '12px 16px', border: '1px solid #ef444444' }}>
          <div style={{ fontSize: 11, color: '#f87171', fontWeight: 600, marginBottom: 2 }}>⚡ EN BÜYÜK ({days} GÜN)</div>
          <div style={{ fontSize: 14, color: '#fca5a5' }}>
            M{(biggest.properties.mag || 0).toFixed(1)} · {(biggest.properties.place || '').replace('Turkey', 'Türkiye')}
          </div>
        </div>
      )}

      <div style={{ padding: '0 16px 10px' }}>
        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>ZAMAN DİLİMİ</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {DAYS_OPT.map(d => (
            <button key={d} onClick={() => setDays(d)} style={{
              flex: 1, background: days === d ? '#3b82f6' : '#1f2937',
              color: days === d ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: days === d ? '#3b82f6' : '#374151',
              borderRadius: 10, padding: '8px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>{d}G</button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 10, marginBottom: 6 }}>MİNİMUM BÜYÜKLÜK</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {MAG_OPT.map(m => (
            <button key={m} onClick={() => setMinMag(m)} style={{
              flex: 1, background: minMag === m ? '#f59e0b' : '#1f2937',
              color: minMag === m ? '#000' : '#9ca3af',
              border: '1px solid', borderColor: minMag === m ? '#f59e0b' : '#374151',
              borderRadius: 10, padding: '8px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>M{m}+</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
            <div style={{ fontSize: 32 }}>🌍</div>
            <div style={{ marginTop: 8 }}>Depremler yükleniyor…</div>
          </div>
        ) : error ? (
          <div style={{ background: '#450a0a', borderRadius: 12, padding: 16, color: '#f87171', fontSize: 13 }}>⚠️ {error}</div>
        ) : quakes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
            <div style={{ fontSize: 40 }}>✅</div>
            <div style={{ marginTop: 8 }}>Bu kriterlere uyan deprem yok</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{quakes.length} deprem</div>
            {quakes.map(q => <QuakeRow key={q.id} q={q} onClick={setSelected} />)}
          </>
        )}
      </div>

      <div style={{ margin: '14px 16px 0', background: '#1c1f26', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151' }}>
        <div style={{ fontSize: 10, color: '#6b7280' }}>📡 USGS Earthquake Hazards Program API (earthquake.usgs.gov) · Gerçek zamanlı</div>
      </div>

      {selected && <QuakeDetail q={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
