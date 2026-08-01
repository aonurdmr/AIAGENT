import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  setup: {
    title: 'Kurulum',
    items: [
      { icon: '⛺', t: 'A-frame gergisi', d: 'Iki agac arasi ip, tarp uzerinden as. Her kose kazik ile sabitle.' },
      { icon: '💧', t: 'Su yonu', d: 'Tarpin egimi yagmur akisini belirler. Daima rugar altına egimli kur.' },
      { icon: '🌬️', t: 'Ruzgar karsi', d: 'Kapali kenari ruzgara cevir. Yel yakalamasi sikintı yarat.' },
      { icon: '📐', t: 'Gerginlik', d: 'Ip ve kaziklar 45 derece acıyla. Gevşek tarp ruzgarda yirtilir.' },
    ],
  },
  types: {
    title: 'Tarp Turleri',
    items: [
      { icon: '🟢', t: 'Silikonlu naylon', d: 'Hafif, su gecirmez, pahalı. Uzun yuruyus icin ideal.' },
      { icon: '🔵', t: 'Polietilen tarp', d: 'Ucuz, agir, dayanikli. Kamp ve piknik icin yeterli.' },
      { icon: '🟡', t: 'Dyneema composite', d: 'Ultra hafif, cok pahalı. Ultra-light backpacker icin.' },
      { icon: '🟠', t: 'Kanvas', d: 'Nefes alir, agir. Uzun sureli sabit kamp icin tercih.' },
    ],
  },
};

export default function CampTarp() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('setup');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛺ Kamp Tarpi Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kurulum · gergisi · tarp turleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#081408', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#081408', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #112211' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{item.t}</div>
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
