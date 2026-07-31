import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UV_LEVELS = [
  { min: 0, max: 2, label: 'Düşük', color: '#22c55e', icon: '🟢', action: 'Özel önlem gerekmez. Normal outdoor aktivite güvenli.' },
  { min: 3, max: 5, label: 'Orta', color: '#84cc16', icon: '🟡', action: 'SPF 30+ sürün. Gözlük kullanın. Öğlen saatlerinde gölge arayın.' },
  { min: 6, max: 7, label: 'Yüksek', color: '#f59e0b', icon: '🟠', action: 'SPF 50+ zorunlu. Şapka ve gözlük şart. 10:00–16:00 arası gölgede kalın.' },
  { min: 8, max: 10, label: 'Çok Yüksek', color: '#ef4444', icon: '🔴', action: 'Maksimum koruma. Mümkünse 10:00–16:00 dışarıda olmayın.' },
  { min: 11, max: 20, label: 'Aşırı', color: '#a855f7', icon: '🟣', action: 'Zorunlu olmadıkça dışarı çıkmayın. Açık cilt 10 dakikada yanabilir.' },
];

const MONTHLY_UV = [
  { month: 'Oca', uv: 2 }, { month: 'Şub', uv: 3 }, { month: 'Mar', uv: 5 },
  { month: 'Nis', uv: 7 }, { month: 'May', uv: 9 }, { month: 'Haz', uv: 11 },
  { month: 'Tem', uv: 11 }, { month: 'Ağu', uv: 10 }, { month: 'Eyl', uv: 8 },
  { month: 'Eki', uv: 5 }, { month: 'Kas', uv: 3 }, { month: 'Ara', uv: 2 },
];

const HOURLY_UV = [
  { h: '06', pct: 0.05 }, { h: '07', pct: 0.10 }, { h: '08', pct: 0.20 },
  { h: '09', pct: 0.35 }, { h: '10', pct: 0.55 }, { h: '11', pct: 0.80 },
  { h: '12', pct: 1.00 }, { h: '13', pct: 0.95 }, { h: '14', pct: 0.85 },
  { h: '15', pct: 0.65 }, { h: '16', pct: 0.45 }, { h: '17', pct: 0.25 },
  { h: '18', pct: 0.08 }, { h: '19', pct: 0.02 },
];

const PROTECTION = [
  {
    id: 'sunscreen', icon: '🧴', name: 'Güneş Kremi',
    tips: ['SPF 30: %97 koruma · SPF 50: %98 koruma', 'Her 2 saatte bir yeniden uygula', 'Terleme ve suya dalmadan sonra yenile', 'Dudaklar için SPF 15+ lip balm'],
  },
  {
    id: 'clothing', icon: '👕', name: 'Koruyucu Giyim',
    tips: ['UPF 50+ teknik gömlek UV\'yi 98% bloke eder', 'Koyu renkler ve sıkı dokuma daha iyi korur', 'Uzun kollu + boyun korumalı gömlek ideal', 'Islak giyim UPF değerini düşürür'],
  },
  {
    id: 'hat', icon: '🧢', name: 'Şapka',
    tips: ['Geniş kenarlı şapka (7.5 cm+) boyun + yüz + kulak korur', 'Beyzbol şapkası yalnızca yüzü korur, ense açıkta', 'Balaklava güneş ışınına karşı tam kafa koruması', 'Açık renk şapka daha serin tutar'],
  },
  {
    id: 'glasses', icon: '🕶️', name: 'Güneş Gözlüğü',
    tips: ['UV400 filtre — hem UVA hem UVB bloke eder', 'Polarize lens parlama azaltır, balıkçılık için ideal', 'Wrap-around çerçeve yan UV koruması sağlar', 'Yüksek irtifada UV %10-12 artar — dağ için kritik'],
  },
];

function getUVLevel(uv) {
  return UV_LEVELS.find(l => uv >= l.min && uv <= l.max) || UV_LEVELS[UV_LEVELS.length - 1];
}

export default function UVGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('now');
  const [uvNow, setUVNow] = useState(null);
  const curMonth = new Date().getMonth();
  const curHour = new Date().getHours();

  useEffect(() => {
    const lat = 41.0, lon = 29.0;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&timezone=Europe%2FIstanbul&forecast_days=1`)
      .then(r => r.json())
      .then(d => {
        const idx = d.hourly?.uv_index?.[curHour] ?? null;
        setUVNow(idx !== null ? Math.round(idx * 10) / 10 : null);
      })
      .catch(() => {
        const approx = Math.round(MONTHLY_UV[curMonth].uv * HOURLY_UV.find(h => parseInt(h.h) === curHour)?.pct ?? 0.5);
        setUVNow(approx);
      });
  }, [curHour, curMonth]);

  const lv = uvNow !== null ? getUVLevel(uvNow) : null;
  const monthUV = MONTHLY_UV[curMonth].uv;
  const monthLv = getUVLevel(monthUV);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>☀️ UV Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>UV indeks · cilt & göz koruma · outdoor güvenlik</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['now', '⚡ Şimdi'], ['monthly', '📅 Aylık'], ['protect', '🛡️ Koruma']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#f59e0b' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#f59e0b' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'now' && (
          <div>
            {lv ? (
              <div style={{ background: lv.color + '15', borderRadius: 16, padding: 20, border: `1px solid ${lv.color}44`, marginBottom: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 6 }}>{lv.icon}</div>
                <div style={{ fontSize: 52, fontWeight: 900, color: lv.color, lineHeight: 1 }}>{uvNow}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: lv.color, marginTop: 4 }}>{lv.label}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 8, lineHeight: 1.6 }}>{lv.action}</div>
              </div>
            ) : (
              <div style={{ background: '#1f2937', borderRadius: 16, padding: 20, textAlign: 'center', color: '#6b7280' }}>UV verisi yükleniyor...</div>
            )}

            <div style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>⏰ GÜNLÜK UV PROFİLİ (İstanbul)</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60 }}>
                {HOURLY_UV.map(h => {
                  const uv = Math.round(monthUV * h.pct);
                  const lvl = getUVLevel(uv);
                  const isNow = parseInt(h.h) === curHour;
                  return (
                    <div key={h.h} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <div style={{ width: '100%', height: Math.max(4, h.pct * 50), background: isNow ? lv?.color || lvl.color : lvl.color + '88', borderRadius: 2, border: isNow ? `1px solid ${lv?.color || lvl.color}` : 'none' }} />
                      <div style={{ fontSize: 8, color: isNow ? '#f9fafb' : '#6b7280' }}>{h.h}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151' }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>📊 UV SEVİYE TABLOSU</div>
              {UV_LEVELS.map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 16 }}>{l.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: l.color, width: 60 }}>{l.min}-{l.max === 20 ? '11+' : l.max}</span>
                  <span style={{ fontSize: 11, color: l.color, fontWeight: 600, width: 72 }}>{l.label}</span>
                  <span style={{ fontSize: 10, color: '#6b7280', flex: 1 }}>{l.action.slice(0, 45)}…</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'monthly' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>📅 AYLIK UV İNDEKS (İstanbul Ortalaması)</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80 }}>
                {MONTHLY_UV.map((m, i) => {
                  const lv = getUVLevel(m.uv);
                  const isNow = i === curMonth;
                  return (
                    <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <div style={{ fontSize: 9, color: lv.color, fontWeight: 700 }}>{m.uv}</div>
                      <div style={{ width: '100%', height: m.uv * 5, background: isNow ? lv.color : lv.color + '66', borderRadius: 3, border: isNow ? `1px solid ${lv.color}` : 'none' }} />
                      <div style={{ fontSize: 9, color: isNow ? '#f9fafb' : '#6b7280' }}>{m.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ background: monthLv.color + '15', borderRadius: 12, padding: '14px 16px', border: `1px solid ${monthLv.color}33` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: monthLv.color, marginBottom: 4 }}>Bu Ay: {MONTHLY_UV[curMonth].month} — UV {monthUV} ({monthLv.label})</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{monthLv.action}</div>
            </div>
          </div>
        )}

        {tab === 'protect' && PROTECTION.map(p => (
          <div key={p.id} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', border: '1px solid #374151', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 26 }}>{p.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
            </div>
            {p.tips.map((t, i) => (
              <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4, display: 'flex', gap: 8 }}>
                <span style={{ color: '#f59e0b' }}>•</span> {t}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
