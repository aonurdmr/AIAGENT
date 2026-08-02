import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LOCATIONS = [
  { id: 'marmara', name: 'Marmara Denizi', icon: '🌊', lat: 40.7, lon: 28.2, type: 'Deniz' },
  { id: 'bosphorus', name: 'Boğaziçi', icon: '🌉', lat: 41.1, lon: 29.05, type: 'Boğaz' },
  { id: 'izmir', name: 'İzmir Körfezi', icon: '⚓', lat: 38.4, lon: 27.1, type: 'Körfez' },
  { id: 'antalya', name: 'Antalya', icon: '🏖️', lat: 36.9, lon: 30.7, type: 'Akdeniz' },
  { id: 'trabzon', name: 'Trabzon Kıyısı', icon: '🏔️', lat: 41.0, lon: 39.7, type: 'Karadeniz' },
  { id: 'egirdir', name: 'Eğirdir Gölü', icon: '🏞️', lat: 37.9, lon: 30.9, type: 'Göl' },
];

const FISH_TEMP = [
  { name: 'Levrek', icon: '🐟', optMin: 14, optMax: 22, active: 'Yaz-Sonbahar', color: '#3b82f6' },
  { name: 'Çipura', icon: '🐠', optMin: 18, optMax: 26, active: 'Yaz', color: '#f59e0b' },
  { name: 'Palamut', icon: '🐡', optMin: 16, optMax: 24, active: 'Sonbahar', color: '#10b981' },
  { name: 'Alabalık', icon: '🐟', optMin: 8, optMax: 16, active: 'İlkbahar-Sonbahar', color: '#a78bfa' },
  { name: 'Sazan', icon: '🐟', optMin: 18, optMax: 28, active: 'Yaz', color: '#f97316' },
  { name: 'Kefal', icon: '🐟', optMin: 12, optMax: 22, active: 'Sonbahar-Kış', color: '#06b6d4' },
];

const MONTH_NAMES = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

function getSeasonalTemp(baseMin, baseMax, month) {
  const seasonFactor = Math.sin((month - 2) * Math.PI / 6);
  const mid = (baseMin + baseMax) / 2;
  const amp = (baseMax - baseMin) / 2;
  return Math.round(mid + amp * seasonFactor * 10) / 10;
}

const LOCATION_TEMPS = {
  marmara:   { baseMin: 8,  baseMax: 28 },
  bosphorus: { baseMin: 7,  baseMax: 26 },
  izmir:     { baseMin: 13, baseMax: 29 },
  antalya:   { baseMin: 16, baseMax: 30 },
  trabzon:   { baseMin: 6,  baseMax: 25 },
  egirdir:   { baseMin: 5,  baseMax: 24 },
};

function tempColor(t) {
  if (t < 10) return '#60a5fa';
  if (t < 16) return '#34d399';
  if (t < 22) return '#fbbf24';
  if (t < 27) return '#f97316';
  return '#ef4444';
}

export default function WaterTemp() {
  const navigate = useNavigate();
  const [selLoc, setSelLoc] = useState('marmara');
  const [tab, setTab] = useState('current');
  const [liveTemp, setLiveTemp] = useState(null);
  const [loading, setLoading] = useState(false);
  const curMonth = new Date().getMonth();

  useEffect(() => {
    const loc = LOCATIONS.find(l => l.id === selLoc);
    if (!loc) return;
    setLoading(true);
    setLiveTemp(null);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&hourly=soil_temperature_0cm&current_weather=true&forecast_days=1`)
      .then(r => r.json())
      .then(d => {
        const base = LOCATION_TEMPS[selLoc];
        const estimated = getSeasonalTemp(base.baseMin, base.baseMax, curMonth);
        setLiveTemp(estimated);
      })
      .catch(() => {
        const base = LOCATION_TEMPS[selLoc];
        setLiveTemp(getSeasonalTemp(base.baseMin, base.baseMax, curMonth));
      })
      .finally(() => setLoading(false));
  }, [selLoc]);

  const base = LOCATION_TEMPS[selLoc];
  const monthlyTemps = Array.from({ length: 12 }, (_, i) => getSeasonalTemp(base.baseMin, base.baseMax, i));
  const currentTemp = liveTemp ?? monthlyTemps[curMonth];
  const tc = tempColor(currentTemp);

  const activeFish = FISH_TEMP.filter(f => currentTemp >= f.optMin && currentTemp <= f.optMax);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌡️ Su Sıcaklığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Konum su sıcaklıkları & balık aktivite tahmini</div>
      </div>

      {/* Location selector */}
      <div style={{ padding: '0 16px 12px', overflowX: 'auto', display: 'flex', gap: 8 }}>
        {LOCATIONS.map(loc => (
          <button key={loc.id} onClick={() => setSelLoc(loc.id)} style={{
            background: selLoc === loc.id ? '#0ea5e922' : '#1f2937',
            color: selLoc === loc.id ? '#0ea5e9' : '#6b7280',
            border: `1px solid ${selLoc === loc.id ? '#0ea5e9' : '#374151'}`,
            borderRadius: 10, padding: '8px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>
            {loc.icon} {loc.name}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['current', '🌡️ Şimdi'], ['calendar', '📅 Yıllık'], ['fish', '🐟 Balık']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#0ea5e9' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#0ea5e9' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'current' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 16, padding: 20, border: `1px solid ${tc}44`, textAlign: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 60, fontWeight: 900, color: tc }}>{loading ? '...' : `${currentTemp}°`}</div>
              <div style={{ fontSize: 14, color: '#9ca3af', marginTop: 4 }}>
                {LOCATIONS.find(l => l.id === selLoc)?.name} · {MONTH_NAMES[curMonth]}
              </div>
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 16 }}>
                {[['Min', `${base.baseMin}°`], ['Maks', `${base.baseMax}°`]].map(([lbl, val]) => (
                  <div key={lbl} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{lbl}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#d1d5db' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🐟 AKTİF BALIK TÜRLERİ</div>
              {activeFish.length === 0 ? (
                <div style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', padding: 8 }}>Bu sıcaklıkta optimal aktif tür yok</div>
              ) : activeFish.map(f => (
                <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{f.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb' }}>{f.name}</div>
                    <div style={{ fontSize: 10, color: '#6b7280' }}>Optimal: {f.optMin}–{f.optMax}°C</div>
                  </div>
                  <span style={{ background: f.color + '22', color: f.color, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>✓ Aktif</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151' }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>📊 SICAKLIK ETKİSİ</div>
              {[
                { range: '< 10°C', effect: 'Balık metabolizması yavaşlar, derin noktalara çekilir. Az aktivite.' },
                { range: '10–16°C', effect: 'Serinler, bazı türler aktif. Sabah saatleri avantajlı.' },
                { range: '16–24°C', effect: 'İdeal aralık. Çoğu deniz balığı aktif, iştahlı beslenir.' },
                { range: '24–28°C', effect: 'Yaz zirvesi. Yüzey yerine 3–8m derinlik tercih edilir.' },
                { range: '> 28°C', effect: 'Balık stresi artar, oksijen azalır. Sabah erken av.' },
              ].map(row => (
                <div key={row.range} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                  <span style={{ background: '#374151', borderRadius: 6, padding: '2px 7px', fontSize: 10, fontWeight: 700, color: '#d1d5db', flexShrink: 0 }}>{row.range}</span>
                  <span style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>{row.effect}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'calendar' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>📅 AYLIK SICAKLIK TAHMİNİ — {LOCATIONS.find(l => l.id === selLoc)?.name}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {monthlyTemps.map((t, i) => {
                  const col = tempColor(t);
                  const isCur = i === curMonth;
                  return (
                    <div key={i} style={{ background: isCur ? col + '22' : '#374151', borderRadius: 8, padding: '8px 6px', textAlign: 'center', border: isCur ? `2px solid ${col}` : '1px solid #4b5563' }}>
                      <div style={{ fontSize: 10, color: '#6b7280', fontWeight: 600 }}>{MONTH_NAMES[i]}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: col }}>{t}°</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151' }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🏆 EN İYİ AV MEVSİMİ</div>
              {FISH_TEMP.map(f => {
                const bestMonths = MONTH_NAMES.filter((_, i) => monthlyTemps[i] >= f.optMin && monthlyTemps[i] <= f.optMax);
                return (
                  <div key={f.name} style={{ marginBottom: 8, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 16 }}>{f.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb' }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: f.color }}>{bestMonths.length ? bestMonths.join(', ') : '—'}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'fish' && (
          <div>
            {FISH_TEMP.map(f => {
              const curT = monthlyTemps[curMonth];
              const inRange = curT >= f.optMin && curT <= f.optMax;
              const diff = inRange ? 0 : Math.min(Math.abs(curT - f.optMin), Math.abs(curT - f.optMax));
              return (
                <div key={f.name} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: `1px solid ${inRange ? f.color + '44' : '#374151'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 22 }}>{f.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{f.name}</div>
                        <div style={{ fontSize: 10, color: '#6b7280' }}>Optimal: {f.optMin}–{f.optMax}°C</div>
                      </div>
                    </div>
                    <span style={{ background: inRange ? f.color + '22' : '#37415144', color: inRange ? f.color : '#6b7280', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>
                      {inRange ? '✓ Aktif' : `${diff}° uzakta`}
                    </span>
                  </div>
                  <div style={{ background: '#374151', borderRadius: 6, height: 8, overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: `${Math.max(0, (f.optMin / 32) * 100)}%`,
                      width: `${((f.optMax - f.optMin) / 32) * 100}%`,
                      background: f.color, height: '100%', borderRadius: 6,
                    }} />
                    <div style={{
                      position: 'absolute', left: `${(curT / 32) * 100}%`,
                      width: 3, height: '100%', background: '#fff', borderRadius: 2, marginLeft: -1,
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#4b5563', marginTop: 2 }}>
                    <span>0°</span><span>8°</span><span>16°</span><span>24°</span><span>32°</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>
                    🎣 En aktif: <span style={{ color: '#d1d5db' }}>{f.active}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
