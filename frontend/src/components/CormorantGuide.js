import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '⚫', t: 'Karabatak (P.carbo)', d: 'Buyuk karabatak: 90 cm. Karadeniz ve Ege kıyıları. Grupcular.' },
      { icon: '🟤', t: 'Kucuk karabatak', d: 'Microcarbo pygmeus: daha kucuk, ic sularda. Tatlı su balık avcısı.' },
      { icon: '🌊', t: 'Habitat', d: 'Koy, liman, nehir agzı, baraj. Kaya sutu kayalıklarda kumeleşir.' },
      { icon: '📅', t: 'Mevsim', d: 'Turkiyede kış konugu: Ekim-Mart. Yazın az sayıda kalır. Koloni.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '🏖️', t: 'Kanat kurutma', d: 'Karabatak kanat kuruturken gorulur: kanatlarini ac bekler kıyıda.' },
      { icon: '🐟', t: 'Avlanma', d: 'Dalarek dalıs avcısı. 20-30 saniye suda. Baligi disarı cıkar yutmak icin.' },
      { icon: '🔭', t: 'Teleskop', d: 'Hızlı ucucu: durbun ve spotting scope idealdir. Kıyı bant gozlem.' },
      { icon: '📷', t: 'Fotograflama', d: 'Kanat acma pozu: beklenen an. Kayalık sıcak uzerinde uzun kalır.' },
    ],
  },
};

export default function CormorantGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020808', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦅 Karabatak Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · habitat · gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#040e0e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#040e0e', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081818' : 'none' }}>
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
