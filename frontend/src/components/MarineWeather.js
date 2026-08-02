import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LOCATIONS = [
  { name: 'İstanbul Boğazı', lat: 41.05, lng: 29.02, icon: '🌉' },
  { name: 'Marmara Denizi', lat: 40.68, lng: 28.0,  icon: '🌊' },
  { name: 'Ege - İzmir',    lat: 38.42, lng: 26.5,  icon: '⛵' },
  { name: 'Akdeniz - Antalya', lat: 36.75, lng: 30.6, icon: '🏖️' },
  { name: 'Karadeniz - Trabzon', lat: 41.1, lng: 39.7, icon: '🌬️' },
  { name: 'Ege - Bodrum',   lat: 37.0,  lng: 27.43, icon: '⚓' },
];

const WAVE_LABEL = h => h < 0.5 ? 'Sakin' : h < 1 ? 'Hafif' : h < 2 ? 'Orta' : h < 3 ? 'Dalgalı' : 'Fırtınalı';
const WAVE_COLOR = h => h < 0.5 ? '#22c55e' : h < 1 ? '#84cc16' : h < 2 ? '#f59e0b' : h < 3 ? '#f97316' : '#ef4444';
const FISHING_SCORE = (wave, wind, seaTemp) => {
  let s = 100;
  if (wave > 2) s -= 50;
  else if (wave > 1) s -= 25;
  else if (wave > 0.5) s -= 10;
  if (wind > 40) s -= 30;
  else if (wind > 25) s -= 15;
  else if (wind > 15) s -= 5;
  if (seaTemp < 10 || seaTemp > 28) s -= 10;
  return Math.max(0, Math.round(s));
};
const scoreColor = s => s >= 70 ? '#22c55e' : s >= 45 ? '#f59e0b' : '#ef4444';

function WindDir({ deg }) {
  const dirs = ['K', 'KD', 'D', 'GD', 'G', 'GB', 'B', 'KB'];
  return <span>{dirs[Math.round(deg / 45) % 8]}</span>;
}

function WaveBar({ height, maxH = 4 }) {
  const pct = Math.min(height / maxH, 1);
  const color = WAVE_COLOR(height);
  return (
    <div style={{ background: '#374151', borderRadius: 4, height: 8, overflow: 'hidden', flex: 1 }}>
      <div style={{ width: `${pct * 100}%`, height: '100%', background: color, borderRadius: 4, transition: 'width .4s' }} />
    </div>
  );
}

function MarineCard({ loc, data, onClick }) {
  if (!data) return (
    <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 28 }}>{loc.icon}</span>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{loc.name}</div>
        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Yükleniyor…</div>
      </div>
    </div>
  );

  const wave = data.wave;
  const wind = data.wind;
  const seaTemp = data.seaTemp;
  const score = FISHING_SCORE(wave, wind, seaTemp);

  return (
    <div onClick={() => onClick({ loc, data })} style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 26 }}>{loc.icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{loc.name}</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>{WAVE_LABEL(wave)} Deniz</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', background: scoreColor(score) + '22', borderRadius: 10, padding: '6px 10px', border: `1px solid ${scoreColor(score)}44` }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: scoreColor(score) }}>{score}</div>
          <div style={{ fontSize: 9, color: '#6b7280' }}>SKOR</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
        <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#6b7280' }}>🌊 Dalga</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: WAVE_COLOR(wave) }}>{wave.toFixed(1)}m</div>
        </div>
        <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#6b7280' }}>💨 Rüzgar</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{wind.toFixed(0)}km/h</div>
        </div>
        <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#6b7280' }}>🌡️ Deniz</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#06b6d4' }}>{seaTemp.toFixed(1)}°C</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: '#6b7280', flexShrink: 0 }}>Dalga:</span>
        <WaveBar height={wave} />
        <span style={{ fontSize: 11, color: WAVE_COLOR(wave), flexShrink: 0 }}>{wave.toFixed(1)}m</span>
      </div>
    </div>
  );
}

function MarineDetail({ item, onClose }) {
  const { loc, data } = item;
  const score = FISHING_SCORE(data.wave, data.wind, data.seaTemp);
  const hourly = data.hourly || [];

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000b', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 40 }}>{loc.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{loc.name}</div>
            <div style={{ fontSize: 13, color: WAVE_COLOR(data.wave) }}>{WAVE_LABEL(data.wave)} Deniz · Balıkçılık Skoru: {score}/100</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Dalga Yüksekliği', value: `${data.wave.toFixed(2)} m`, icon: '🌊', color: WAVE_COLOR(data.wave) },
            { label: 'Dalga Periyodu', value: `${data.period.toFixed(0)} sn`, icon: '⏱️', color: '#a855f7' },
            { label: 'Rüzgar Hızı', value: `${data.wind.toFixed(0)} km/h`, icon: '💨', color: '#f9fafb' },
            { label: 'Rüzgar Yönü', value: <WindDir deg={data.windDir} />, icon: '🧭', color: '#f9fafb' },
            { label: 'Deniz Sıcaklığı', value: `${data.seaTemp.toFixed(1)} °C`, icon: '🌡️', color: '#06b6d4' },
            { label: 'Görünürlük', value: `${data.visibility} km`, icon: '👁️', color: '#94a3b8' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: s.color, marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {hourly.length > 0 && (
          <div>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>📊 SAATLİK DALGA (24 SAAT)</div>
            <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 4 }}>
              {hourly.slice(0, 24).map((h, i) => (
                <div key={i} style={{ flexShrink: 0, textAlign: 'center', minWidth: 40 }}>
                  <div style={{ fontSize: 9, color: '#6b7280', marginBottom: 4 }}>{h.time}h</div>
                  <div style={{ background: '#111827', borderRadius: 6, height: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
                    <div style={{
                      width: 28,
                      height: `${Math.min(h.wave / 4, 1) * 60}px`,
                      background: WAVE_COLOR(h.wave),
                      borderRadius: '3px 3px 0 0',
                      minHeight: 4,
                    }} />
                  </div>
                  <div style={{ fontSize: 9, color: WAVE_COLOR(h.wave), marginTop: 3 }}>{h.wave.toFixed(1)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 14, background: '#0c1f3f', borderRadius: 12, padding: '12px 14px', border: '1px solid #1e40af44' }}>
          <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>🎣 BALIKÇILIK TAVSİYESİ</div>
          <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>
            {score >= 70 ? 'Deniz koşulları balıkçılık için idealdir. Güvenli seyir yapabilirsiniz.' :
             score >= 45 ? 'Orta koşullar. Kıyı balıkçılığı için uygun, açık denizde dikkatli olun.' :
             'Zorlu koşullar. Kıyı balıkçılığı tercih edin veya hava iyileşmesini bekleyin.'}
          </div>
        </div>
      </div>
    </div>
  );
}

async function fetchMarine(lat, lng) {
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}` +
    `&current=wave_height,wave_period,wind_wave_height,sea_surface_temperature` +
    `&hourly=wave_height&wind_speed_10m_max=true&forecast_days=1&timezone=auto`;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    `&current=wind_speed_10m,wind_direction_10m,visibility&timezone=auto`;

  const [mRes, wRes] = await Promise.all([fetch(url), fetch(weatherUrl)]);
  const [mData, wData] = await Promise.all([mRes.json(), wRes.json()]);

  const c = mData.current || {};
  const wc = wData.current || {};
  const hourlyTimes = (mData.hourly?.time || []).map((t, i) => ({
    time: new Date(t).getHours(),
    wave: mData.hourly.wave_height[i] || 0,
  }));

  return {
    wave:       c.wave_height            ?? 0.3,
    period:     c.wave_period            ?? 6,
    seaTemp:    c.sea_surface_temperature ?? 18,
    wind:       wc.wind_speed_10m        ?? 10,
    windDir:    wc.wind_direction_10m    ?? 0,
    visibility: wc.visibility != null ? (wc.visibility / 1000).toFixed(1) : '—',
    hourly:     hourlyTimes,
  };
}

export default function MarineWeather() {
  const navigate = useNavigate();
  const [marineData, setMarineData] = useState({});
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      LOCATIONS.map(loc =>
        fetchMarine(loc.lat, loc.lng)
          .then(d => ({ id: loc.name, d }))
          .catch(() => ({ id: loc.name, d: null }))
      )
    ).then(results => {
      const map = {};
      results.forEach(r => { map[r.id] = r.d; });
      setMarineData(map);
      setLoading(false);
    });
  }, []);

  const best = Object.entries(marineData)
    .filter(([, d]) => d)
    .map(([name, d]) => ({ name, score: FISHING_SCORE(d.wave, d.wind, d.seaTemp) }))
    .sort((a, b) => b.score - a.score)[0];

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Deniz Hava Durumu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          Open-Meteo Marine · dalga, deniz sıcaklığı ve balıkçılık skoru
        </div>
      </div>

      {best && !loading && (
        <div style={{ margin: '0 16px 14px', background: '#052e16', borderRadius: 14, padding: '12px 16px', border: '1px solid #16a34a44' }}>
          <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 600, marginBottom: 2 }}>🏆 EN İYİ NOKTA</div>
          <div style={{ fontSize: 14, color: '#bbf7d0' }}>{best.name} · Skor {best.score}/100</div>
        </div>
      )}

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {LOCATIONS.map(loc => (
          <MarineCard
            key={loc.name}
            loc={loc}
            data={marineData[loc.name] || null}
            onClick={setSelected}
          />
        ))}
      </div>

      <div style={{ margin: '16px 16px 0', background: '#1c1f26', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151' }}>
        <div style={{ fontSize: 10, color: '#6b7280' }}>📡 Veri kaynağı: Open-Meteo Marine API (marine-api.open-meteo.com) · Gerçek zamanlı</div>
      </div>

      {selected && <MarineDetail item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
