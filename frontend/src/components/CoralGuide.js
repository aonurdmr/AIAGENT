import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🤿', t: 'Snorkel noktasi', d: 'Ege ve Akdeniz sıg koylari: mercan ve kayalık habitat. Su berrak.' },
      { icon: '🐠', t: 'Mercan baliklari', d: 'Kaya iskorpiti, lapina, goby: mercan aralarında saklanır. Dikkatli bak.' },
      { icon: '📷', t: 'Fotograflama', d: 'Derin nefes + soguk tutum: gövdenle vurma. Koralları hiç dokunma.' },
      { icon: '🌡️', t: 'Su sicakligi', d: 'Turkiye kıyı: Agustos 28°C. Mercan bleaching 30°C+ su sicakligi ile baslıyor.' },
    ],
  },
  protect: {
    title: 'Koruma',
    items: [
      { icon: '🚫', t: 'Dokunma yasak', d: 'Mercan son derece hassastır. Bir dokunuş yillar surer yok olmasına.' },
      { icon: '⚗️', t: 'Guneş kremi', d: 'Oxybenzone maddesi koralı etkiler. Reef-safe krem kullan.' },
      { icon: '🌊', t: 'Capa atmak', d: 'Tekne capası mercanı parcalar. Cam taban tekne ya da kara yakınında capa.' },
      { icon: '🐚', t: 'Kalıntı alma', d: 'Koral parcası, kabuk veya canlı organizma kıyıdan alma yasak.' },
    ],
  },
};

export default function CoralGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('observe');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪸 Mercan Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Gözlem · koruma · snorkel</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#041018', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041018', borderRadius: 14, padding: 14, border: '1px solid #f9731633' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081c28' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fb923c' }}>{item.t}</div>
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
