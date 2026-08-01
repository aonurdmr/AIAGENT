import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🦋', t: 'Kelebek gelin', d: 'Gonepteryx rhamni: ilk ilkbaharda gorulur. Sari-yesil renklidir.' },
      { icon: '🟠', t: 'Gunes kelegi', d: 'Lycaena: turuncu ust kanat. Cimen ve catalbasi alanlarda bereketli.' },
      { icon: '🔵', t: 'Mavi kelebek', d: 'Polyommatus icarus: kucuk, parlak mavi. Kuru otlak ve alcak bitki.' },
      { icon: '⬛', t: 'Kaplan kelebegi', d: 'Papilio machaon: siyah-sari desenli. Havuc ailesi cicekte.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '🌸', t: 'Cicekli mera', d: 'Kelebek zenginligi: cicekli mera sart. Lavanta, yonca, nane alanlari.' },
      { icon: '☀️', t: 'Sicak saat', d: 'Kelebek ektotermdir: gunes ile isinir. 10-15 arasi en aktif donem.' },
      { icon: '📷', t: 'Fotograflama', d: 'Kanat kapaninca foto daha kolay. Yavas yaklasim, ani hareket etme.' },
      { icon: '🌱', t: 'Larva bitkisi', d: 'Her kelebek bir larva bitkisi sever. Bitkiyi tani: kelebegi bulursun.' },
    ],
  },
};

export default function ButterflyGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080408', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦋 Kelebek Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Turler · habitat · gozlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#ec4899' : '#100810', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100810', borderRadius: 14, padding: 14, border: '1px solid #ec489933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #180c18' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f472b6' }}>{item.t}</div>
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
