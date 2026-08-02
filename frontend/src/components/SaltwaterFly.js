import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Tuzlu su fly', d: 'Agir kamis: 8-10 numara. Ruzgar direncli yaylar. Tuzlu su koruyor.' },
      { icon: '🦐', t: 'Shrimp taklidi', d: 'Karides taklidi sinek: tuzlu suda evrensel. Clouser Minnow ve Crazy Charlie.' },
      { icon: '🌊', t: 'Surf casting', d: 'Kiyi fly: dalga atisi. Halin dusen su gerisinde levrek ve lipsoz.' },
      { icon: '🐟', t: 'Yuzey topwat', d: 'Popper sinek: sabah saati yuzey patlama. Levrek ve lipsoz kovalama.' },
    ],
  },
  targets: {
    title: 'Hedefler',
    items: [
      { icon: '🐟', t: 'Lipsoz', d: 'Sparidae: sert cene, karides ve karides taklidi. Koy ve kayalik.' },
      { icon: '🦈', t: 'Blue Runner', d: 'Caranx: hizli, agresif. Jig ve streamer her ikisi de isler.' },
      { icon: '🐡', t: 'Bonito', d: 'Sarda: hizla hareket eden suru. Kucuk beyaz streamer, hizli cekim.' },
      { icon: '🦑', t: 'Kalamar hedefi', d: 'Kalamar fly: sinek degil ama fly benzeri yapay: derin + yavas cekme.' },
    ],
  },
};

export default function SaltwaterFly() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a12', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Tuzlu Su Fly Fishing</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · sinekler · hedef balıklar</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0e7490' : '#04141e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04141e', borderRadius: 14, padding: 14, border: '1px solid #0e749033' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #08202c' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#22d3ee' }}>{item.t}</div>
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
