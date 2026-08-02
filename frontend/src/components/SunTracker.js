import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

// Parse ISO UTC datetime → local HH:MM
function fmtLocal(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

// Seconds → Hh Mm
function fmtDuration(secs) {
  if (!secs) return '—';
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return `${h}s ${m}dk`;
}

// Sun arc SVG
function SunArc({ riseH, setH, nowH }) {
  const W = 300, H = 120;
  const cx = W / 2, cy = H + 10;
  const R  = H - 10;

  // map hour → angle (6am=180°, 12pm=90°(top), 6pm=0° — going left→right)
  const hourToAngle = (h) => Math.PI - ((h - 6) / 12) * Math.PI;

  const toXY = (h) => {
    const a = hourToAngle(h);
    return { x: cx + R * Math.cos(a), y: cy - R * Math.sin(a) };
  };

  const dawn = toXY(Math.max(riseH, 4));
  const dusk = toXY(Math.min(setH, 22));
  const nowPt = toXY(nowH);
  const nowOnArc = nowH > riseH && nowH < setH;

  // Arc path from dawn to dusk
  const largeArc = setH - riseH > 12 ? 1 : 0;

  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} width="100%" style={{ display: 'block' }}>
      {/* Horizon line */}
      <line x1={0} y1={cy} x2={W} y2={cy} stroke="#374151" strokeWidth="1.5" />

      {/* Full arc track */}
      <path
        d={`M ${toXY(4).x} ${toXY(4).y} A ${R} ${R} 0 ${largeArc} 0 ${toXY(22).x} ${toXY(22).y}`}
        fill="none" stroke="#374151" strokeWidth="4" strokeLinecap="round"
      />

      {/* Active sun arc */}
      <path
        d={`M ${dawn.x} ${dawn.y} A ${R} ${R} 0 ${largeArc} 0 ${dusk.x} ${dusk.y}`}
        fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" opacity="0.6"
      />

      {/* Sun position */}
      {nowOnArc && (
        <>
          <circle cx={nowPt.x} cy={nowPt.y} r={14} fill="#fef08a" opacity="0.3" />
          <circle cx={nowPt.x} cy={nowPt.y} r={10} fill="#f59e0b" />
          <circle cx={nowPt.x} cy={nowPt.y} r={6}  fill="#fef9c3" />
        </>
      )}

      {/* Rise / set labels */}
      <text x={dawn.x} y={cy + 16} textAnchor="middle" fill="#fb923c" fontSize="9" fontWeight="600">
        {fmtLocal(null) === '—' ? '' : '🌅'}
      </text>
      <text x={20} y={cy + 16} fill="#9ca3af" fontSize="9" textAnchor="start">6:00</text>
      <text x={W - 20} y={cy + 16} fill="#9ca3af" fontSize="9" textAnchor="end">18:00</text>
      <text x={cx} y={14} fill="#fbbf24" fontSize="9" textAnchor="middle">12:00</text>
    </svg>
  );
}

const CITIES = [
  { name: 'İstanbul',  lat: 41.01, lng: 28.95 },
  { name: 'Ankara',    lat: 39.93, lng: 32.86 },
  { name: 'İzmir',     lat: 38.42, lng: 27.14 },
  { name: 'Antalya',   lat: 36.88, lng: 30.70 },
  { name: 'Trabzon',   lat: 41.00, lng: 39.72 },
  { name: 'Erzurum',   lat: 39.90, lng: 41.27 },
];

// Fishing golden hours: 30min before/after sunrise & sunset
function goldenHours(riseISO, setISO) {
  if (!riseISO || !setISO) return [];
  const rise = new Date(riseISO);
  const set  = new Date(setISO);
  const fmt = (d) => d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  const addMin = (d, m) => new Date(d.getTime() + m * 60000);
  return [
    { label: 'Şafak Öncesi',  from: fmt(addMin(rise, -30)), to: fmt(rise),         icon: '🌅', color: '#fb923c' },
    { label: 'Şafak Sonrası', from: fmt(rise),               to: fmt(addMin(rise, 60)), icon: '🌤️', color: '#f59e0b' },
    { label: 'Gün Batımı',    from: fmt(addMin(set, -60)),   to: fmt(set),          icon: '🌇', color: '#f97316' },
    { label: 'Alacakaranlık', from: fmt(set),                to: fmt(addMin(set, 30)),  icon: '🌆', color: '#c084fc' },
  ];
}

export default function SunTracker() {
  const navigate = useNavigate();
  const [cityIdx, setCityIdx] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const city = CITIES[cityIdx];

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API}/sunrise?lat=${city.lat}&lng=${city.lng}`);
      if (resp.ok) setData(await resp.json());
    } catch (_) {}
    setLoading(false);
  }, [city]);

  useEffect(() => { load(); }, [load]);

  const now  = new Date();
  const nowH = now.getHours() + now.getMinutes() / 60;

  const riseH = data?.sunrise ? (new Date(data.sunrise)).getHours() + (new Date(data.sunrise)).getMinutes() / 60 : 6;
  const setH  = data?.sunset  ? (new Date(data.sunset)).getHours()  + (new Date(data.sunset)).getMinutes() / 60  : 20;

  const golden = data ? goldenHours(data.sunrise, data.sunset) : [];

  // Day progress %
  const dayPct = data ? Math.max(0, Math.min(100, ((nowH - riseH) / (setH - riseH)) * 100)) : 0;

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>☀️ Güneş Takibi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Doğuş · Batış · Balıkçılık altın saatleri</div>
      </div>

      {/* City tabs */}
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {CITIES.map((c, i) => (
          <button key={c.name} onClick={() => setCityIdx(i)} style={{
            background: cityIdx === i ? '#f59e0b' : '#1f2937',
            color: cityIdx === i ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: cityIdx === i ? '#f59e0b' : '#374151',
            borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 700,
            whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
          }}>{c.name}</button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#6b7280' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>☀️</div>
          <div>Güneş verileri yükleniyor…</div>
        </div>
      )}

      {data && !loading && (
        <>
          {/* Sun arc */}
          <div style={{ margin: '0 16px 14px', background: '#1f2937', borderRadius: 16, padding: '16px 12px 8px', border: '1px solid #374151' }}>
            <SunArc riseH={riseH} setH={setH} nowH={nowH} />
          </div>

          {/* Rise / Set / Noon cards */}
          <div style={{ margin: '0 16px 14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { icon: '🌅', label: 'Gün Doğumu',  value: fmtLocal(data.sunrise),    color: '#fb923c' },
              { icon: '☀️', label: 'Öğle',         value: fmtLocal(data.solar_noon), color: '#fef08a' },
              { icon: '🌇', label: 'Gün Batımı',   value: fmtLocal(data.sunset),     color: '#f97316' },
            ].map(c => (
              <div key={c.label} style={{ background: '#1f2937', borderRadius: 14, padding: '14px 8px', textAlign: 'center', border: '1px solid #374151' }}>
                <div style={{ fontSize: 22 }}>{c.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: c.color, margin: '6px 0 2px' }}>{c.value}</div>
                <div style={{ fontSize: 10, color: '#6b7280' }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* Day length & progress */}
          <div style={{ margin: '0 16px 14px', background: '#1f2937', borderRadius: 14, padding: '14px 16px', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>GÜN UZUNLUĞU</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fbbf24' }}>{fmtDuration(data.day_length)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>Geçen</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{Math.round(dayPct)}%</div>
              </div>
            </div>
            <div style={{ background: '#374151', borderRadius: 8, height: 8, overflow: 'hidden' }}>
              <div style={{ width: `${dayPct}%`, height: '100%', background: 'linear-gradient(90deg,#fb923c,#fef08a)', borderRadius: 8, transition: 'width 0.8s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: '#6b7280' }}>
              <span>{fmtLocal(data.sunrise)}</span>
              <span>{fmtLocal(data.sunset)}</span>
            </div>
          </div>

          {/* Civil twilight */}
          <div style={{ margin: '0 16px 14px', background: '#1f2937', borderRadius: 14, padding: '14px 16px', border: '1px solid #374151' }}>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>🌆 MEDENİ ALACAKARANLIK</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>Sabah başlangıç</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#c084fc' }}>{fmtLocal(data.civil_twilight_begin)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: '#6b7280' }}>Akşam bitiş</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#c084fc' }}>{fmtLocal(data.civil_twilight_end)}</div>
              </div>
            </div>
          </div>

          {/* Golden fishing hours */}
          <div style={{ margin: '0 16px', background: '#1f2937', borderRadius: 14, padding: '14px 16px', border: '1px solid #374151' }}>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 12 }}>🎣 BALIKÇILIK ALTIN SAATLERİ</div>
            {golden.map(g => (
              <div key={g.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #374151' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{g.icon}</span>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#f9fafb' }}>{g.label}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: 13, color: g.color, fontWeight: 700 }}>
                  {g.from} – {g.to}
                </div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 10 }}>
              Doğuş ve batış etrafındaki 30-60 dakikalar balıkların en aktif olduğu dönemdir.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
