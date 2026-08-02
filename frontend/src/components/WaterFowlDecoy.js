import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  setup: {
    title: 'Kurulum',
    items: [
      { icon: '🦆', t: 'Yem grubu', d: 'Oy: en az 12 yem, gecis kanalı birak. Kaz: 18-24 aralik genis kurulum.' },
      { icon: '💦', t: 'Su yonu', d: 'Yem yuzleri ruzgar + gunes istikametine baksın: dogal gorunur.' },
      { icon: '🎯', t: 'Acik alan', d: 'Merkeze acık alan birak: kus inmek icin yer arar. Geri kalan dolu.' },
      { icon: '📍', t: 'Sinyal yem', d: 'Hareketi yem: ipli ve ruzgarli hareket (jerk). Gercekci gorunur.' },
    ],
  },
  call: {
    title: 'Cagri',
    items: [
      { icon: '📣', t: 'Mallard cagri', d: 'Disi ordek: nallik ses. Grupten uzaklasan kus: azalan tempo.' },
      { icon: '🎺', t: 'Kaz cagri', d: 'Kaz sesi: derin ve guglu. Honk + cluck: misafir davet sesi.' },
      { icon: '⏸️', t: 'Sessizlik', d: 'Yaklaşan kus: sessiz. Cagri onu uyarır. Yem uzerinde bek.' },
      { icon: '🎵', t: 'Ritim', d: 'Cagri ritmi: dogal ses gibi. Cok cagri kusları uzaklaştırır.' },
    ],
  },
};

export default function WaterFowlDecoy() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('setup');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦆 Su Kuşu Yem Kurulumu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kurulum · çağrı · teknik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#1d4ed8' : '#04101a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04101a', borderRadius: 14, padding: 14, border: '1px solid #1d4ed833' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081c28' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>{item.t}</div>
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
