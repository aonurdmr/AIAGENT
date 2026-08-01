import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  prepare: {
    title: 'Hazırlık',
    items: [
      { icon: '🌡️', t: 'Sicaklik tahmini', d: 'Gece sicakligi gunden 10-20 derece dusebilir. Fazladan katman al.' },
      { icon: '🏕️', t: 'Kamp yeri', d: 'Gunduz sec. Duz, drenajli zemin. Agac golgesi gece sogutmaz ısıtır.' },
      { icon: '🦟', t: 'Bocekler', d: 'Akşam ıslak zeminler ve duraklı sulak alanlar sivrisinek yuvasi.' },
      { icon: '🔦', t: 'Aydinlatma', d: 'LED fener + kafa lambası. Kirmizi mod gece gorusunu korur.' },
    ],
  },
  comfort: {
    title: 'Konfor',
    items: [
      { icon: '🛏️', t: 'Uyku tulumu', d: 'Sezon bazlı sezon tulumu sec. Gece -5°C duserse +10 dereceli tulum yetmez.' },
      { icon: '🧣', t: 'Katmanlama', d: 'Base layer + orta katman + disli: sogan gibi giyinme prensibi.' },
      { icon: '🧦', t: 'Cadir zemini', d: 'Kalin sliping mat zeminin sogukluğunu keser. En cok isi zemin alir.' },
      { icon: '☕', t: 'Sicak icecek', d: 'Uyku oncesi sicak cay ya da cokolata. Vucudu iceriden isitir.' },
    ],
  },
};

export default function NightCamping() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('prepare');
  const data = TABS[tab];

  return (
    <div style={{ background: '#04040e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌙 Gece Kampı Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hazırlık · konfor · güvenlik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#818cf8' : '#0a0a1e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0a0a1e', borderRadius: 14, padding: 14, border: '1px solid #818cf833' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #14142e' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
