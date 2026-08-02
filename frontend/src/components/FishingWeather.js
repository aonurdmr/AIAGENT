import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LOCATIONS = [
  { id: 'istanbul', name: 'İstanbul Boğazı', lat: 41.02, lon: 29.00, type: 'Boğaz' },
  { id: 'izmir', name: 'İzmir', lat: 38.42, lon: 27.14, type: 'Ege' },
  { id: 'trabzon', name: 'Trabzon', lat: 41.00, lon: 39.72, type: 'Karadeniz' },
  { id: 'antalya', name: 'Antalya', lat: 36.89, lon: 30.70, type: 'Akdeniz' },
  { id: 'samsun', name: 'Samsun', lat: 41.29, lon: 36.33, type: 'Karadeniz' },
  { id: 'mugla', name: 'Muğla', lat: 37.22, lon: 28.36, type: 'Ege' },
];

function fishingScore(wind, precip, wmo, hour) {
  let score = 100;
  if (wind > 30) score -= 40;
  else if (wind > 20) score -= 20;
  else if (wind > 10) score -= 5;
  if (precip > 5) score -= 30;
  else if (precip > 1) score -= 15;
  if ([95, 96, 99].includes(wmo)) score -= 40;
  else if ([85, 86, 73, 75].includes(wmo)) score -= 20;
  if (hour >= 5 && hour <= 8) score += 15;
  else if (hour >= 17 && hour <= 20) score += 10;
  else if (hour >= 12 && hour <= 15) score -= 10;
  return Math.max(0, Math.min(100, score));
}

function scoreLabel(s) {
  if (s >= 80) return { label: 'Mükemmel', color: '#22c55e' };
  if (s >= 60) return { label: 'İyi', color: '#84cc16' };
  if (s >= 40) return { label: 'Orta', color: '#f59e0b' };
  if (s >= 20) return { label: 'Zor', color: '#f97316' };
  return { label: 'Kötü', color: '#ef4444' };
}

function wmoDesc(code) {
  if (code === 0) return 'Açık';
  if (code <= 3) return 'Parçalı bulutlu';
  if (code <= 49) return 'Sisli';
  if (code <= 67) return 'Yağmurlu';
  if (code <= 77) return 'Karlı';
  if (code <= 82) return 'Sağanak';
  if (code <= 99) return 'Fırtınalı';
  return '–';
}

export default function FishingWeather() {
  const navigate = useNavigate();
  const [selLoc, setSelLoc] = useState('istanbul');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('now');

  const loc = LOCATIONS.find(l => l.id === selLoc);

  useEffect(() => {
    if (!loc) return;
    setLoading(true);
    setData(null);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&hourly=temperature_2m,precipitation_probability,precipitation,weathercode,windspeed_10m,winddirection_10m&forecast_days=2&timezone=auto`)
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [selLoc]);

  const now = new Date();
  const curHour = now.getHours();

  let hours = [];
  if (data?.hourly) {
    const { time, temperature_2m: temps, precipitation_probability: precip, weathercode: wmo, windspeed_10m: wind } = data.hourly;
    hours = time.slice(0, 48).map((t, i) => {
      const d = new Date(t);
      const h = d.getHours();
      const score = fishingScore(wind[i] || 0, precip[i] || 0, wmo[i] || 0, h);
      return { time: t, hour: h, label: d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }), dayLabel: d.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' }), temp: temps[i], precipP: precip[i], wmo: wmo[i], wind: wind[i], score };
    });
  }

  const todayHours = hours.filter(h => {
    const d = new Date(h.time);
    return d.getDate() === now.getDate();
  });

  const tomorrowHours = hours.filter(h => {
    const d = new Date(h.time);
    return d.getDate() === now.getDate() + 1 || (now.getDate() === 31 && d.getDate() === 1);
  });

  const currentHour = hours.find(h => new Date(h.time).getHours() === curHour && new Date(h.time).getDate() === now.getDate());
  const bestHours = todayHours.filter(h => h.score >= 70).sort((a, b) => b.score - a.score).slice(0, 3);

  const HourRow = ({ h, highlight }) => {
    const sl = scoreLabel(h.score);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #1f2937', background: highlight ? '#22c55e08' : 'transparent', borderRadius: highlight ? 8 : 0, paddingLeft: highlight ? 8 : 0 }}>
        <div style={{ width: 40, fontSize: 11, color: '#6b7280', fontWeight: 600, flexShrink: 0 }}>{h.label}</div>
        <div style={{ flex: 1 }}>
          <div style={{ width: '100%', background: '#374151', borderRadius: 4, height: 6 }}>
            <div style={{ width: `${h.score}%`, background: sl.color, borderRadius: 4, height: 6, transition: 'width 0.3s' }} />
          </div>
        </div>
        <div style={{ width: 60, textAlign: 'right', fontSize: 11, fontWeight: 700, color: sl.color }}>{h.score}%</div>
        <div style={{ width: 24, textAlign: 'center', fontSize: 12 }}>{h.temp !== undefined ? `${Math.round(h.temp)}°` : ''}</div>
        <div style={{ width: 34, textAlign: 'right', fontSize: 10, color: '#6b7280' }}>{Math.round(h.wind || 0)}km</div>
      </div>
    );
  };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Balıkçılık Havası</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Saatlik balıkçılık skoru & en iyi zaman dilimi</div>
      </div>

      <div style={{ padding: '0 16px 12px', overflowX: 'auto', display: 'flex', gap: 8 }}>
        {LOCATIONS.map(l => (
          <button key={l.id} onClick={() => setSelLoc(l.id)} style={{
            background: selLoc === l.id ? '#06b6d422' : '#1f2937',
            color: selLoc === l.id ? '#06b6d4' : '#6b7280',
            border: `1px solid ${selLoc === l.id ? '#06b6d4' : '#374151'}`,
            borderRadius: 10, padding: '7px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{l.name}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['now', '⚡ Şimdi'], ['today', '📅 Bugün'], ['tomorrow', '🌅 Yarın']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#06b6d4' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#06b6d4' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {loading && <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>Yükleniyor...</div>}

        {!loading && tab === 'now' && (
          <div>
            {currentHour ? (() => {
              const sl = scoreLabel(currentHour.score);
              return (
                <>
                  <div style={{ background: '#1f2937', borderRadius: 16, padding: 20, border: `1px solid ${sl.color}44`, textAlign: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 64, fontWeight: 900, color: sl.color }}>{currentHour.score}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: sl.color }}>{sl.label}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{loc.name} · Şu an</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12 }}>
                      {[['🌡️', `${Math.round(currentHour.temp)}°C`], ['💨', `${Math.round(currentHour.wind)}km/h`], ['🌧️', `%${currentHour.precipP}`]].map(([ic, val]) => (
                        <div key={ic} style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 16 }}>{ic}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#d1d5db' }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {bestHours.length > 0 && (
                    <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #22c55e33', marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, marginBottom: 8 }}>🏆 BUGÜNÜN EN İYİ SAATLERİ</div>
                      {bestHours.map(h => (
                        <div key={h.time} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, background: '#22c55e11', borderRadius: 8, padding: '6px 10px' }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{h.label}</div>
                          <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>%{h.score} · {scoreLabel(h.score).label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })() : <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>Veri yüklenemedi</div>}
          </div>
        )}

        {!loading && tab === 'today' && todayHours.length > 0 && (
          <div style={{ background: '#1f2937', borderRadius: 14, padding: '12px 14px', border: '1px solid #374151' }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>SAAT</span><span style={{ flex: 1, textAlign: 'center', paddingLeft: 8 }}>SKOR</span><span style={{ width: 60, textAlign: 'right' }}>%</span><span style={{ width: 24, textAlign: 'center' }}>ISI</span><span style={{ width: 34, textAlign: 'right' }}>RÜZG</span>
            </div>
            {todayHours.map(h => <HourRow key={h.time} h={h} highlight={bestHours.some(b => b.time === h.time)} />)}
          </div>
        )}

        {!loading && tab === 'tomorrow' && tomorrowHours.length > 0 && (
          <div style={{ background: '#1f2937', borderRadius: 14, padding: '12px 14px', border: '1px solid #374151' }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>SAAT</span><span style={{ flex: 1, textAlign: 'center', paddingLeft: 8 }}>SKOR</span><span style={{ width: 60, textAlign: 'right' }}>%</span><span style={{ width: 24, textAlign: 'center' }}>ISI</span><span style={{ width: 34, textAlign: 'right' }}>RÜZG</span>
            </div>
            {tomorrowHours.map(h => <HourRow key={h.time} h={h} highlight={false} />)}
          </div>
        )}
      </div>
    </div>
  );
}
