import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  timing: {
    title: 'Zamanlama',
    items: [
      { icon: '🌊', t: 'Gel-git', d: 'Balikcilik icin en iyi: gel-git degisiminden 1 saat once ve sonrasi.' },
      { icon: '📈', t: 'Yukselen su', d: 'Yukselen gel-git: balik kiyiya gelir, yem artar. Avci icin ideal.' },
      { icon: '📉', t: 'Dusme gel-git', d: 'Alcalan gel-git: balik geri cekili. Derin noktalari ara, kanal kenari.' },
      { icon: '🕐', t: 'Takvim', d: 'Gel-git takvimi uygulamas&#305;: gun, saat ve irtifa bilgisi. Onceden plan yap.' },
    ],
  },
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Kanal kenarı', d: 'Gel-git kanalı: balik yukselen suda kanal kenarinda yem toplar.' },
      { icon: '⚓', t: 'Dip olta', d: 'Alcalan gel-git: agir sinker ile dip. Balik derin kanalda bekler.' },
      { icon: '🦐', t: 'Karides yemi', d: 'Gel-git bolgesi: karides yemi cok etkili. Inci yem veya dogal.' },
      { icon: '🌿', t: 'Sazlik kenari', d: 'Gel-git sazligi: levrek ve kefal giren suyu izler. Yuzey lure.' },
    ],
  },
};

export default function TidalFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('timing');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Gel-Git Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Zamanlama · teknik · gel-git takvimi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0284c7' : '#04121e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04121e', borderRadius: 14, padding: 14, border: '1px solid #0284c733' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081e2e' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>{item.t}</div>
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
