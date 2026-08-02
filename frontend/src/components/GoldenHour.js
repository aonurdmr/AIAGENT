import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SPOTS = [
  { name: 'Boğaziçi Köprüsü', city: 'İstanbul', lat: 41.046, lng: 29.034, icon: '🌉', type: 'Köprü', tip: 'Rumelihisarı\'ndan manzara muhteşem.' },
  { name: 'Kalamış Sahili',    city: 'İstanbul', lat: 40.964, lng: 29.060, icon: '🏖️', type: 'Sahil', tip: 'Deniz seviyesinde mükemmel ayna yansıması.' },
  { name: 'Çeşme Alaçatı',    city: 'İzmir',    lat: 38.287, lng: 26.376, icon: '🌅', type: 'Sahil', tip: 'Rüzgar değirmenleri ile altın saat fotoğrafçılığı.' },
  { name: 'Pamukkale',         city: 'Denizli',  lat: 37.920, lng: 29.119, icon: '💎', type: 'Doğa',  tip: 'Travertenler gün batımında pembeleşir.' },
  { name: 'Kapadokya',         city: 'Nevşehir', lat: 38.643, lng: 34.829, icon: '🎈', type: 'Doğa',  tip: 'Balon turları altın saatte muhteşem.' },
  { name: 'Nemrut Dağı',       city: 'Adıyaman', lat: 37.981, lng: 38.740, icon: '🗿', type: 'Dağ',   tip: 'Gün batımında heykellerin gölgesi inanılmaz.' },
  { name: 'Ölüdeniz',          city: 'Muğla',    lat: 36.550, lng: 29.114, icon: '💙', type: 'Sahil', tip: 'Turkuaz lagün gün batımı manzarası.' },
  { name: 'Ayder Yaylası',     city: 'Rize',     lat: 40.930, lng: 41.104, icon: '🏔️', type: 'Yayla',  tip: 'Bulutların altında sisli altın saat.' },
];

const TYPE_COLORS = { Köprü: '#818cf8', Sahil: '#f59e0b', Doğa: '#22c55e', Dağ: '#60a5fa', Yayla: '#84cc16' };

function toRad(deg) { return deg * Math.PI / 180; }
function toDeg(rad) { return rad * 180 / Math.PI; }

function sunTimes(lat, lng, date) {
  const J2000 = 2451545.0;
  const D = (date - new Date('2000-01-01T12:00:00Z')) / 86400000;
  const n = D + 0.0008;
  const Jstar = n - lng / 360;
  const M = (357.5291 + 0.98560028 * Jstar) % 360;
  const Mrad = toRad(M);
  const C = 1.9148 * Math.sin(Mrad) + 0.02 * Math.sin(2 * Mrad) + 0.0003 * Math.sin(3 * Mrad);
  const lambda = toRad((M + C + 180 + 102.9372) % 360);
  const Jtransit = J2000 + Jstar + 0.0053 * Math.sin(Mrad) - 0.0069 * Math.sin(2 * lambda);
  const sinDec = Math.sin(lambda) * Math.sin(toRad(23.4397));
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.sin(toRad(-0.833)) - Math.sin(toRad(lat)) * sinDec) / (Math.cos(toRad(lat)) * cosDec);
  if (cosH < -1 || cosH > 1) return null;
  const Hw = toDeg(Math.acos(cosH)) / 360;
  const Jrise = Jtransit - Hw;
  const Jset = Jtransit + Hw;
  const toDate = J => new Date((J - J2000 - 0.5) * 86400000 + new Date('2000-01-01T12:00:00Z').getTime());
  return { sunrise: toDate(Jrise), sunset: toDate(Jset), noon: toDate(Jtransit) };
}

function formatTime(d) {
  if (!d) return '—';
  return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' });
}

function offsetMin(d, min) { return new Date(d.getTime() + min * 60000); }

function GoldenHourBar({ sunrise, sunset }) {
  if (!sunrise || !sunset) return null;
  const now = new Date();
  const totalMin = (sunset.getTime() - sunrise.getTime()) / 60000;

  const golden = [
    { start: sunrise, end: offsetMin(sunrise, 60), label: 'Altın Saat', color: '#f59e0b' },
    { start: offsetMin(sunrise, 60), end: offsetMin(sunrise, 90), label: 'Mavi Saat', color: '#3b82f6' },
    { start: offsetMin(sunset, -60), end: sunset, label: 'Altın Saat', color: '#f97316' },
    { start: sunset, end: offsetMin(sunset, 30), label: 'Mavi Saat', color: '#818cf8' },
  ];

  const pct = (d) => Math.min(Math.max((d.getTime() - sunrise.getTime()) / 60000 / totalMin * 100, 0), 100);
  const nowPct = pct(now);

  return (
    <div style={{ margin: '0 16px 14px', background: '#1f2937', borderRadius: 14, padding: '14px 16px', border: '1px solid #374151' }}>
      <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>🌅 ALTIN SAAT TAKVİMİ</div>
      <div style={{ position: 'relative', height: 32, background: '#374151', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
        {golden.map((g, i) => (
          <div key={i} style={{
            position: 'absolute', top: 0, bottom: 0,
            left: `${pct(g.start)}%`,
            width: `${pct(g.end) - pct(g.start)}%`,
            background: g.color + '88',
          }} />
        ))}
        {nowPct >= 0 && nowPct <= 100 && (
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${nowPct}%`, width: 2, background: '#fff' }} />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6b7280' }}>
        <span>{formatTime(sunrise)}</span>
        <span>ŞİMDİ</span>
        <span>{formatTime(sunset)}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        {golden.map((g, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: g.color }} />
            <span style={{ fontSize: 10, color: '#9ca3af' }}>{g.label} {formatTime(g.start)}–{formatTime(g.end)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GoldenHour() {
  const navigate = useNavigate();
  const [times, setTimes] = useState(null);
  const [selectedLat, setSelectedLat] = useState(41.0082);
  const [selectedLng, setSelectedLng] = useState(28.9784);
  const [filter, setFilter] = useState('Tümü');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const t = sunTimes(selectedLat, selectedLng, new Date());
    setTimes(t);
  }, [selectedLat, selectedLng]);

  const types = ['Tümü', ...Array.from(new Set(SPOTS.map(s => s.type)))];
  const spots = filter === 'Tümü' ? SPOTS : SPOTS.filter(s => s.type === filter);

  const handleSpot = (spot) => {
    setSelected(spot);
    setSelectedLat(spot.lat);
    setSelectedLng(spot.lng);
  };

  const goldenEnd = times ? offsetMin(times.sunrise, 60) : null;
  const eveningGoldenStart = times ? offsetMin(times.sunset, -60) : null;
  const now = new Date();
  const isGolden = times && ((now >= times.sunrise && now <= goldenEnd) || (now >= eveningGoldenStart && now <= times.sunset));

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌅 Altın Saat Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          Türkiye'nin en güzel gün batımı noktaları ve fotoğraf saatleri
        </div>
      </div>

      {isGolden && (
        <div style={{ margin: '0 16px 14px', background: '#431407', borderRadius: 14, padding: '12px 16px', border: '1px solid #f9731644' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fdba74' }}>✨ ŞU AN ALTIN SAAT! Fotoğraf için harika bir an.</div>
        </div>
      )}

      {times && (
        <div style={{ margin: '0 16px 14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { label: 'Gün Doğumu', value: formatTime(times.sunrise), icon: '🌅', color: '#f59e0b' },
            { label: 'Öğle', value: formatTime(times.noon), icon: '☀️', color: '#fbbf24' },
            { label: 'Gün Batımı', value: formatTime(times.sunset), icon: '🌇', color: '#f97316' },
          ].map(s => (
            <div key={s.label} style={{ background: '#1f2937', borderRadius: 12, padding: '10px', textAlign: 'center', border: '1px solid #374151' }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: s.color, marginTop: 2 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <GoldenHourBar sunrise={times?.sunrise} sunset={times?.sunset} />

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            background: filter === t ? '#f59e0b' : '#1f2937',
            color: filter === t ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: filter === t ? '#f59e0b' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {spots.map(s => {
          const t = sunTimes(s.lat, s.lng, new Date());
          const color = TYPE_COLORS[s.type] || '#9ca3af';
          const isActive = s.name === selected?.name;
          return (
            <div key={s.name} onClick={() => handleSpot(s)}
              style={{ background: isActive ? '#1e293b' : '#1f2937', borderRadius: 14, padding: '14px 16px', border: `1px solid ${isActive ? color : '#374151'}`, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>📍 {s.city}</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 20, padding: '3px 8px', fontWeight: 600 }}>{s.type}</span>
              </div>
              {t && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 }}>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12 }}>🌅</span>
                    <div>
                      <div style={{ fontSize: 9, color: '#6b7280' }}>Gün doğumu</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>{formatTime(t.sunrise)}</div>
                    </div>
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12 }}>🌇</span>
                    <div>
                      <div style={{ fontSize: 9, color: '#6b7280' }}>Gün batımı</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316' }}>{formatTime(t.sunset)}</div>
                    </div>
                  </div>
                </div>
              )}
              <div style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }}>💡 {s.tip}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
