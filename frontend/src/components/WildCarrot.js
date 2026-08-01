import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  forage: {
    title: 'Yenilebilirler',
    items: [
      { icon: '🥕', t: 'Yabani havuc', d: 'Daucus carota: beyaz umbel, kusun yuvasi seklinde merkez. Yenilebilir.' },
      { icon: '🟢', t: 'Maydanoz', d: 'Petroselinum crispum: yol kenari ve tarla kenari. Koku ile tani.' },
      { icon: '🧅', t: 'Yabani sogan', d: 'Allium: sogan ve sarimsak kokusu varsa zehirsiz. Koku yok: tehlike.' },
      { icon: '🌿', t: 'Rezene', d: 'Foeniculum vulgare: anason koku ve tat. Sari umbel, deniz kenarı.' },
    ],
  },
  warning: {
    title: 'Uyari',
    items: [
      { icon: '☠️', t: 'Baldiran', d: 'Conium maculatum: mor lekeli sap. Havuca benzer. Cok zehirli. Sefer.' },
      { icon: '⚠️', t: 'Su baldıranı', d: 'Cicuta: en zehirli Turk bitkisi. Dere kenari, su kiyisi, sacli kok.' },
      { icon: '🔍', t: 'Tanimak', d: 'Umbel (sans cicegi) ailesinde zehirsiz ve zehirli ikisi de var: uzman.' },
      { icon: '✅', t: 'Koku testi', d: 'Sarimsak, sogan ve anason koku: genellikle guvenli. Cici koku: dikkat.' },
    ],
  },
};

export default function WildCarrot() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('forage');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🥕 Yabani Umbel Bitkiler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yenilebilir · tehlikeli · tanıma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#100e06', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100e06', borderRadius: 14, padding: 14, border: '1px solid #f59e0b33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1c1a0c' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>{item.t}</div>
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
