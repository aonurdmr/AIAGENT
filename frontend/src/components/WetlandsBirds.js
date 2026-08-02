import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🦩', t: 'Flamingo', d: 'Phoenicopterus: Tuz golu ve lagunde. Kalabalik suru, pembe renk.' },
      { icon: '🐦', t: 'Balik sahin', d: 'Pandion haliaetus: sulak alan. Dalarak balik avlar. Yalniz yuva.' },
      { icon: '🟤', t: 'Toy kus', d: 'Otis tarda: acik mera ve tarla. Irı, yavaş, suru halinde gezinir.' },
      { icon: '🌿', t: 'Sazlik sinekci', d: 'Acrocephalus: sazlık yuvalanır. Karmik ses, ses tanıma uygulaması.' },
    ],
  },
  watch: {
    title: 'Gozlem',
    items: [
      { icon: '🌅', t: 'Sabah ve aksam', d: 'Sulak alan kuslari: sabah besleme, aksam donduk toplanma, gece dinlenme.' },
      { icon: '🏞️', t: 'Gozlem kulesi', d: 'Kus gozlem kulesi: alani gorun, kusları rahatsız etme. Uzak gozlem.' },
      { icon: '🔭', t: 'Spotting scope', d: '20-60x spotting scope: uzak flamingo ve diger buyuk kuslar icin.' },
      { icon: '🌿', t: 'Sazlik kenari', d: 'Sazlik kenari yava yurus: kirmizi balaban ve sazlik colgesi kus.' },
    ],
  },
};

export default function WetlandsBirds() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a0c', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦩 Sulak Alan Kuşları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · habitat · gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0e7490' : '#04141a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04141a', borderRadius: 14, padding: 14, border: '1px solid #0e749033' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #082028' : 'none' }}>
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
