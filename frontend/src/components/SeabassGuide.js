import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Yuzey lure', d: 'Levrek yuzey avcisi: popper ve stickbait ile seher vaktinde etkili.' },
      { icon: '🌊', t: 'Dip jigging', d: 'Derin noktada metal jig: hızlı kalkis-inis hareketi. 20-60g.' },
      { icon: '🐟', t: 'Canlı yem', d: 'Canlı hamsi veya istavrit: levrek cezbeder. Kanca yerlesimi kritik.' },
      { icon: '🌙', t: 'Gece avciligi', d: 'Levrek gece yem arar. Iskele isigi alti: hamsi toplanir, levrek gelir.' },
    ],
  },
  spots: {
    title: 'Noktalar',
    items: [
      { icon: '🏖️', t: 'Dalgakiran', d: 'Tas dalgakiran kenari: levrek saklanir ve pusu kurar. Sabah idealdir.' },
      { icon: '🌊', t: 'Koy agzi', d: 'Koy girisinde su karisimi: tuzlu-tatlı su levrek icin ideal habitat.' },
      { icon: '⚓', t: 'Tekne alti', d: 'Demirlenmis tekne alti: golge ve balik birikmesi. Jig ile arastir.' },
      { icon: '🪨', t: 'Kayalik koy', d: 'Kayalik kucuk koylar: levrek kaya baligi kovalar. Tarama yap.' },
    ],
  },
};

export default function SeabassGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Levrek Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · noktalar · yem seçimi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#2563eb' : '#04101c', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04101c', borderRadius: 14, padding: 14, border: '1px solid #2563eb33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081828' : 'none' }}>
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
