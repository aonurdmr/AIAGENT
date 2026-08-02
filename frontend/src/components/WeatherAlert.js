import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CITIES = [
  { name: 'İstanbul', lat: 41.0082, lng: 28.9784 },
  { name: 'İzmir', lat: 38.4192, lng: 27.1287 },
  { name: 'Antalya', lat: 36.8969, lng: 30.7133 },
  { name: 'Trabzon', lat: 41.0015, lng: 39.7178 },
  { name: 'Samsun', lat: 41.2867, lng: 36.3300 },
  { name: 'Ankara', lat: 39.9334, lng: 32.8597 },
];

const WMO = {
  0: { label: 'Açık', icon: '☀️' },
  1: { label: 'Az Bulutlu', icon: '🌤️' },
  2: { label: 'Parçalı', icon: '⛅' },
  3: { label: 'Kapalı', icon: '☁️' },
  45: { label: 'Sis', icon: '🌫️' },
  48: { label: 'Dondurucu Sis', icon: '🌫️' },
  51: { label: 'Hafif Çiseleme', icon: '🌦️' },
  61: { label: 'Hafif Yağmur', icon: '🌧️' },
  63: { label: 'Orta Yağmur', icon: '🌧️' },
  65: { label: 'Şiddetli Yağmur', icon: '⛈️' },
  71: { label: 'Hafif Kar', icon: '🌨️' },
  73: { label: 'Orta Kar', icon: '❄️' },
  75: { label: 'Yoğun Kar', icon: '❄️' },
  80: { label: 'Sağanak', icon: '🌩️' },
  95: { label: 'Fırtına', icon: '⛈️' },
  99: { label: 'Dolu', icon: '🌪️' },
};

function getWmo(code) {
  return WMO[code] || { label: 'Bilinmiyor', icon: '❓' };
}

function alertLevel(windSpeed, precipProb, wmoCode) {
  if (windSpeed > 60 || wmoCode >= 95) return { level: 'Kritik', color: '#ef4444', bg: '#450a0a' };
  if (windSpeed > 40 || wmoCode >= 65 || precipProb > 80) return { level: 'Uyarı', color: '#f59e0b', bg: '#451a03' };
  if (windSpeed > 25 || precipProb > 50) return { level: 'Dikkat', color: '#06b6d4', bg: '#083344' };
  return { level: 'Normal', color: '#22c55e', bg: '#052e16' };
}

function fishingAdvice(level, wmo) {
  if (level === 'Kritik') return '⛔ Balıkçılık önerilmez — tehlikeli koşullar';
  if (level === 'Uyarı') return '⚠️ Deniz balıkçılığına çıkmayın, kıyı dikkatli';
  if (level === 'Dikkat') return '🎣 Korunaklı alanlarda balıkçılık yapılabilir';
  return '✅ Balıkçılık için uygun hava koşulları';
}

async function fetchWeather(lat, lng) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,precipitation_probability,weathercode,windspeed_10m,windgusts_10m&forecast_days=2&timezone=Europe%2FIstanbul`;
  const r = await fetch(url);
  const d = await r.json();
  return d.hourly;
}

export default function WeatherAlert() {
  const navigate = useNavigate();
  const [cityIdx, setCityIdx] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [tab, setTab] = useState('alerts');

  const city = CITIES[cityIdx];

  useEffect(() => {
    setLoading(true);
    setErr('');
    fetchWeather(city.lat, city.lng)
      .then(setData)
      .catch(() => setErr('Veri yüklenemedi'))
      .finally(() => setLoading(false));
  }, [cityIdx]);

  // Build hourly alert rows for next 24h
  const alerts = [];
  if (data) {
    const now = Date.now();
    for (let i = 0; i < data.time.length; i++) {
      const t = new Date(data.time[i]);
      if (t.getTime() < now - 3600000) continue;
      if (alerts.length >= 24) break;
      const wind = data.windspeed_10m[i];
      const gust = data.windgusts_10m[i];
      const precip = data.precipitation_probability[i];
      const wcode = data.weathercode[i];
      const { level, color, bg } = alertLevel(wind, precip, wcode);
      const wmo = getWmo(wcode);
      alerts.push({ t, wind, gust, precip, wcode, wmo, level, color, bg });
    }
  }

  const criticals = alerts.filter(a => a.level === 'Kritik' || a.level === 'Uyarı');
  const worstAlert = alerts.reduce((acc, a) => {
    const rank = { 'Kritik': 3, 'Uyarı': 2, 'Dikkat': 1, 'Normal': 0 };
    return rank[a.level] > rank[acc?.level || 'Normal'] ? a : acc;
  }, null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🚨 Hava Durumu Uyarıları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Saatlik uyarılar ve balıkçılık güvenlik skoru</div>
      </div>

      {/* City selector */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {CITIES.map((c, i) => (
          <button key={i} onClick={() => setCityIdx(i)} style={{
            background: cityIdx === i ? '#ef4444' : '#1f2937', color: cityIdx === i ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: cityIdx === i ? '#ef4444' : '#374151',
            borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{c.name}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {loading && <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>⏳ Yükleniyor...</div>}
        {err && <div style={{ background: '#450a0a', borderRadius: 12, padding: 14, color: '#fca5a5', textAlign: 'center' }}>{err}</div>}

        {data && worstAlert && (
          <div style={{ background: worstAlert.bg, borderRadius: 14, padding: 16, border: `1px solid ${worstAlert.color}55`, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: worstAlert.color, fontWeight: 600, marginBottom: 4 }}>
                  {worstAlert.level === 'Normal' ? '✅' : worstAlert.level === 'Dikkat' ? '💡' : '⚠️'} GENEL DURUM — {city.name.toUpperCase()}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: worstAlert.color }}>{worstAlert.level}</div>
                <div style={{ fontSize: 13, color: '#d1d5db', marginTop: 4 }}>
                  {fishingAdvice(worstAlert.level, worstAlert.wmo)}
                </div>
              </div>
              <div style={{ fontSize: 40 }}>{worstAlert.wmo.icon}</div>
            </div>
            {criticals.length > 0 && (
              <div style={{ marginTop: 12, fontSize: 12, color: '#fca5a5' }}>
                ⚡ {criticals.length} kritik/uyarı saati tespit edildi
              </div>
            )}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[['alerts', '⚠️ Uyarılar'], ['hourly', '🕐 Saatlik'], ['wind', '💨 Rüzgar']].map(([id, lbl]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, background: tab === id ? '#ef4444' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: tab === id ? '#ef4444' : '#374151',
              borderRadius: 10, padding: '10px 0', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>{lbl}</button>
          ))}
        </div>

        {data && tab === 'alerts' && (
          <div>
            {alerts.filter(a => a.level !== 'Normal').length === 0 ? (
              <div style={{ background: '#052e16', borderRadius: 14, padding: 20, textAlign: 'center', border: '1px solid #16a34a44' }}>
                <div style={{ fontSize: 32 }}>✅</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#22c55e', marginTop: 8 }}>Uyarı Yok</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Önümüzdeki 24 saatte uyarı bulunmuyor</div>
              </div>
            ) : (
              alerts.filter(a => a.level !== 'Normal').map((a, i) => (
                <div key={i} style={{ background: a.bg, borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: `1px solid ${a.color}44` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 10, color: a.color, fontWeight: 600 }}>{a.t.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })} — {a.t.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' })}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{a.wmo.icon} {a.wmo.label}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>💨 {a.wind.toFixed(0)} km/h · 🌧️ %{a.precip} · 💨↑ {a.gust.toFixed(0)} km/h</div>
                    </div>
                    <span style={{ background: a.color + '22', color: a.color, border: `1px solid ${a.color}44`, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>{a.level}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {data && tab === 'hourly' && (
          <div>
            {alerts.slice(0, 12).map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #1f2937' }}>
                <div style={{ width: 44, fontSize: 11, color: '#6b7280', fontWeight: 600, flexShrink: 0 }}>
                  {a.t.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div style={{ fontSize: 20, flexShrink: 0 }}>{a.wmo.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#d1d5db' }}>{a.wmo.label}</div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>🌧️ %{a.precip} · 💨 {a.wind.toFixed(0)} km/h</div>
                </div>
                <span style={{ fontSize: 10, color: a.color, fontWeight: 700, flexShrink: 0 }}>{a.level}</span>
              </div>
            ))}
          </div>
        )}

        {data && tab === 'wind' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 12 }}>💨 RÜZGAR HEDEFLERİ</div>
              {[
                { label: 'Güvenli (yelken)', max: 25, color: '#22c55e' },
                { label: 'Dikkatli (küçük tekne)', max: 40, color: '#f59e0b' },
                { label: 'Tehlikeli (denizci)', max: 60, color: '#f97316' },
                { label: 'Fırtına', max: 999, color: '#ef4444' },
              ].map((band, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: band.color, flexShrink: 0 }} />
                  <div style={{ fontSize: 12, color: '#d1d5db', flex: 1 }}>{band.label}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{i === 0 ? '< 25' : i === 1 ? '25-40' : i === 2 ? '40-60' : '> 60'} km/h</div>
                </div>
              ))}
            </div>
            {alerts.slice(0, 12).map((a, i) => {
              const pct = Math.min(100, (a.wind / 80) * 100);
              const col = a.wind > 60 ? '#ef4444' : a.wind > 40 ? '#f97316' : a.wind > 25 ? '#f59e0b' : '#22c55e';
              return (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: '#6b7280' }}>{a.t.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                    <span style={{ fontSize: 11, color: col, fontWeight: 700 }}>{a.wind.toFixed(0)} km/h (↑{a.gust.toFixed(0)})</span>
                  </div>
                  <div style={{ background: '#374151', borderRadius: 4, height: 6 }}>
                    <div style={{ width: `${pct}%`, height: 6, borderRadius: 4, background: col }} />
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
