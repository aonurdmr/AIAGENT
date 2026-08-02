import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Uzun sap', d: 'Kayalik: 4-5m uzun sap. Denize uzanmadan derine atmak gerekir.' },
      { icon: '⚓', t: 'Agir sinker', d: 'Dalga ve akinti: 80-150g kursunum. Noktada kalmasini saglar.' },
      { icon: '🐟', t: 'Balik secimi', d: 'Kayalik baliklari: kefal, lipsoz, mercan. Dip + yarim su hedefle.' },
      { icon: '🦺', t: 'Can yeligı', d: 'Kayalik olta: daima can yelegi. Islak kayalarda kayma tehlikesi.' },
    ],
  },
  safety: {
    title: 'Guvenlik',
    items: [
      { icon: '⚠️', t: 'Dalga kontrolu', d: 'Kayalik atlamak icin dalga ritmi takip et. Buyuk dalga arasinda kayaya in.' },
      { icon: '👟', t: 'Ayakkabi', d: 'Kauçuk tabanlı tekne ayakkabisi veya takim tutunma tabani kayalik icin.' },
      { icon: '📡', t: 'Haber ver', d: 'Konumunu birine bildir. Kayalik olta tek basina yapılmamalı idealde.' },
      { icon: '🌊', t: 'Gel-git saati', d: 'Gel-git cizgisini izle: hizla gelen su kayadan kesmez birakmaz.' },
    ],
  },
};

export default function CliffFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪨 Kayalık Olta</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · güvenlik · ekipman</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0891b2' : '#04101a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04101a', borderRadius: 14, padding: 14, border: '1px solid #0891b233' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081e2a' : 'none' }}>
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
