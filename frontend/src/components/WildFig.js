import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🍈', t: 'Yabani İncir', d: 'Ficus carica; Ege ve Akdeniz kiyilarinda taslik yerlerde yabani formlar.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Temmuz-Eylul incir olgunlasmasi; renk donumu ve yumusuma hasat isareti.' },
      { icon: '🌳', t: 'Agac Ozelligi', d: 'Buyuk loplu yapraklar, biyuk dugumlu gövde; kuru yasli kayalarda buyuyen.' },
      { icon: '🧺', t: 'Toplama', d: 'Olgun incirler kolayca duser; hafif dokunusla daldan ayrilmiyorsa olgunlasmamis.' },
      { icon: '🐝', t: 'Ekosistem', d: 'Ege nin yabani incirinden beslenen kus ve bocek turleri ekosistem destekler.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍯', t: 'Reçel', d: 'Yabani incir daha küçük ama daha yoğun tatli; az şekerle yapılan reçeli özel.' },
      { icon: '🧀', t: 'Peynir Eşleşmesi', d: 'Taze incir ve beyaz peynir ya da tulum peyniri klasik Ege mezesi.' },
      { icon: '🌞', t: 'Kurutma', d: 'İncir güneşte kurutulur; protein ve lif açısından çok zengin kış besin stoğu.' },
      { icon: '🍷', t: 'Sirke', d: 'Ezilmiş incirden doğal fermantasyon yoluyla ev yapımı sirke.' },
      { icon: '💊', t: 'Geleneksel Tıp', d: 'Yaprak sütü mantar enfeksiyonlarına; meyve yumuşatıcı ve bağırsak düzenleyici.' },
    ],
  },
};

export default function WildFig() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#92400e';
  const bg = '#0a0400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍈 Yabani İncir</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1a0a00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fbbf24',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160800', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fcd34d', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
