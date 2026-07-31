import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DARK_SITES = [
  { name: 'Uludağ Zirvesi', lat: 40.0944, lng: 29.2194, alt: 2543, pollution: 1, desc: 'Marmara bölgesinin en iyi karanlık noktası. Kış şartları zorlu.' },
  { name: 'Kapadokya Vadisi', lat: 38.6432, lng: 34.8289, alt: 1200, pollution: 2, desc: 'Merkezi Anadolu\'nun kuru havası mükemmel gözlem sağlar. Nisan-Ekim.' },
  { name: 'Nemrut Dağı', lat: 37.9810, lng: 38.7411, alt: 2150, pollution: 1, desc: 'Güneydoğu\'nun en karanlık bölgesi. Samanyolu görüntüsü muhteşem.' },
  { name: 'Abant Gölü', lat: 40.6097, lng: 31.2831, alt: 1327, pollution: 3, desc: 'Orman içinde sakin ortam. Yaz aylarında çok iyi görüş.' },
  { name: 'Pamukkale Ovası', lat: 37.9249, lng: 29.1187, alt: 350, pollution: 2, desc: 'Düşük nem ve açık horizon. Yıldız fotoğrafçılığı için popüler.' },
  { name: 'Kaz Dağları', lat: 39.7000, lng: 26.8500, alt: 1774, pollution: 2, desc: 'Ege\'nin doğal karanlık alanı. İda Dağı platosunda mükemmel.' },
  { name: 'Aladağlar', lat: 37.9000, lng: 35.4000, alt: 2100, pollution: 1, desc: 'Toroslar\'ın yüksek yaylası. Şahin Kayalıkları civarı en iyi.' },
  { name: 'Artvin Yaylası', lat: 41.1800, lng: 41.8200, alt: 2300, pollution: 1, desc: 'Kuzey Anadolu\'nun keşfedilmemiş karanlık noktası. Eylül mükemmel.' },
];

const PLANETS_MOCK = [
  { name: 'Jüpiter', icon: '🟡', visible: true, rise: '21:30', set: '05:20', mag: -2.1, tip: 'Büyük Kırmızı Nokta ve 4 Galileo uydusu binoküler ile görünür.' },
  { name: 'Satürn', icon: '🪐', visible: true, rise: '22:45', set: '06:00', mag: 0.5, tip: 'Halkalar 7x50 binokülerle seçilebilir.' },
  { name: 'Venüs', icon: '⚪', visible: false, rise: '04:10', set: '15:30', mag: -4.5, tip: 'Şu an sabah yıldızı; gündoğumundan 1 saat önce görünür.' },
  { name: 'Mars', icon: '🔴', visible: true, rise: '23:15', set: '08:45', mag: 1.2, tip: 'Kırmızı rengi ile kolayca tanınır. Opozisyon yaklaşıyor.' },
];

const BORTLE = [
  { b: 1, label: 'Mükemmel Karanlık', color: '#818cf8', desc: 'Samanyolu gözü kör eder; zodyak ışığı görünür.' },
  { b: 2, label: 'Çok Karanlık', color: '#6366f1', desc: 'Samanyolu keskin, M33 çıplak gözle görünür.' },
  { b: 3, label: 'Kırsal Gökyüzü', color: '#3b82f6', desc: 'Samanyolu etkileyici; M31 kolayca görünür.' },
  { b: 4, label: 'Kırsal/Kentsel', color: '#22c55e', desc: 'Samanyolu görünür ama parlak değil.' },
  { b: 5, label: 'Sönük Samanyolu', color: '#84cc16', desc: 'Samanyolu sadece en parlak kısımlar.' },
  { b: 6, label: 'Parlak Arka Plan', color: '#f59e0b', desc: 'M31 zor; Samanyolu soluk.' },
  { b: 7, label: 'Geçiş', color: '#f97316', desc: 'M31 sadece iyi gecelerde.' },
  { b: 8, label: 'Şehir Gökgürültüsü', color: '#ef4444', desc: 'Sadece en parlak kümeler.' },
  { b: 9, label: 'İç Şehir', color: '#dc2626', desc: 'Sadece en parlak yıldızlar.' },
];

async function fetchCloudCover(lat, lng) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=cloudcover,visibility,precipitation_probability&forecast_days=2&timezone=Europe%2FIstanbul`;
  const r = await fetch(url);
  return (await r.json()).hourly;
}

function skyScore(cloud, vis) {
  const cloudScore = Math.max(0, 100 - cloud);
  const visScore = Math.min(100, (vis / 20000) * 100);
  return Math.round((cloudScore * 0.7 + visScore * 0.3));
}

export default function StargazingGuide() {
  const navigate = useNavigate();
  const [siteIdx, setSiteIdx] = useState(0);
  const [tab, setTab] = useState('conditions');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const site = DARK_SITES[siteIdx];

  useEffect(() => {
    setLoading(true);
    fetchCloudCover(site.lat, site.lng)
      .then(setWeather)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [siteIdx]);

  // Night hours only (20:00 - 06:00)
  const nightHours = [];
  if (weather) {
    weather.time.forEach((t, i) => {
      const d = new Date(t);
      const h = d.getHours();
      if (h >= 20 || h <= 6) {
        nightHours.push({ time: d, cloud: weather.cloudcover[i], vis: weather.visibility[i], precip: weather.precipitation_probability[i] });
      }
    });
  }

  const avgCloud = nightHours.length > 0 ? nightHours.slice(0, 10).reduce((s, h) => s + h.cloud, 0) / Math.min(10, nightHours.length) : 50;
  const avgVis = nightHours.length > 0 ? nightHours.slice(0, 10).reduce((s, h) => s + h.vis, 0) / Math.min(10, nightHours.length) : 10000;
  const score = skyScore(avgCloud, avgVis);
  const bortle = BORTLE[Math.max(0, site.pollution - 1)];

  const scoreColor = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⭐ Yıldız Gözlem Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 karanlık nokta · bulut örtüsü & gözlem kalitesi</div>
      </div>

      {/* Site selector */}
      <div style={{ padding: '0 16px 10px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {DARK_SITES.map((s, i) => (
          <button key={i} onClick={() => setSiteIdx(i)} style={{
            background: siteIdx === i ? '#4f46e5' : '#1f2937', color: siteIdx === i ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: siteIdx === i ? '#4f46e5' : '#374151',
            borderRadius: 20, padding: '7px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
          }}>{s.name}</button>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['conditions', '🌌 Koşullar'], ['planets', '🪐 Gezegenler'], ['sites', '📍 Noktalar']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#4f46e5' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#4f46e5' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'conditions' && (
          <div>
            {/* Score banner */}
            <div style={{ background: score >= 70 ? '#052e16' : score >= 40 ? '#2d1b00' : '#450a0a', borderRadius: 14, padding: 16, border: `1px solid ${scoreColor}44`, marginBottom: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: scoreColor, fontWeight: 600, marginBottom: 4 }}>GÖZLEM SKORU — {site.name.toUpperCase()}</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: scoreColor }}>{score}</div>
              <div style={{ fontSize: 13, color: '#d1d5db', marginTop: 4 }}>{score >= 70 ? '🌟 Mükemmel gece!' : score >= 40 ? '⭐ Orta gece' : '☁️ Zayıf gece'}</div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{site.alt}m rakım · Bortle {site.pollution}</div>
            </div>

            {/* Bortle card */}
            <div style={{ background: '#1f2937', borderRadius: 12, padding: 12, marginBottom: 12, border: `1px solid ${bortle.color}44` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: bortle.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: bortle.color }}>Bortle {site.pollution} — {bortle.label}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{bortle.desc}</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[
                { label: '☁️ Bulut', val: `${avgCloud.toFixed(0)}%` },
                { label: '👁️ Görüş', val: `${(avgVis / 1000).toFixed(0)} km` },
                { label: '⛰️ Rakım', val: `${site.alt}m` },
              ].map((s, i) => (
                <div key={i} style={{ background: '#1f2937', borderRadius: 10, padding: 10, border: '1px solid #374151', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: '#6b7280' }}>{s.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Hourly cloud chart */}
            {loading && <div style={{ color: '#6b7280', textAlign: 'center', padding: 20 }}>⏳ Yükleniyor...</div>}
            {weather && nightHours.length > 0 && (
              <div style={{ background: '#1f2937', borderRadius: 12, padding: 12, border: '1px solid #374151' }}>
                <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🌌 GECE SAATLER (bulut %)</div>
                {nightHours.slice(0, 12).map((h, i) => {
                  const sc = skyScore(h.cloud, h.vis);
                  const col = sc >= 70 ? '#818cf8' : sc >= 40 ? '#f59e0b' : '#374151';
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <div style={{ width: 36, fontSize: 10, color: '#6b7280' }}>
                        {h.time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div style={{ flex: 1, background: '#374151', borderRadius: 4, height: 6 }}>
                        <div style={{ width: `${100 - h.cloud}%`, height: 6, borderRadius: 4, background: col }} />
                      </div>
                      <div style={{ width: 36, fontSize: 10, color: col, textAlign: 'right' }}>
                        {h.cloud.toFixed(0)}%☁️
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'planets' && (
          <div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>Bu gece (yaklaşık saatler, İstanbul UTC+3)</div>
            {PLANETS_MOCK.map((p, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: `1px solid ${p.visible ? '#4f46e544' : '#374151'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 26 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>Mag: {p.mag > 0 ? '+' : ''}{p.mag}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 10, background: p.visible ? '#1e1b4b' : '#1f2937', color: p.visible ? '#818cf8' : '#6b7280', border: `1px solid ${p.visible ? '#4f46e5' : '#374151'}`, borderRadius: 20, padding: '3px 8px', fontWeight: 700 }}>
                      {p.visible ? '🌙 Görünür' : '☀️ Gündüz'}
                    </span>
                    <div style={{ fontSize: 10, color: '#6b7280', marginTop: 4 }}>↑{p.rise} ↓{p.set}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8, fontStyle: 'italic' }}>{p.tip}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'sites' && (
          <div>
            {DARK_SITES.map((s, i) => {
              const b = BORTLE[s.pollution - 1];
              return (
                <div key={i} onClick={() => { setSiteIdx(i); setTab('conditions'); }}
                  style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: `1px solid ${b.color}33`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>⭐ {s.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.alt}m rakım</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{s.desc}</div>
                    </div>
                    <div style={{ textAlign: 'center', flexShrink: 0, marginLeft: 12 }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: b.color }}>B{s.pollution}</div>
                      <div style={{ fontSize: 8, color: '#6b7280' }}>Bortle</div>
                    </div>
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
