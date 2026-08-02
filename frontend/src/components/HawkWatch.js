import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🦅', t: 'Kerkenez', d: 'Falco tinnunculus; yerinde salınarak avını gözleyen küçük yırtıcı kuş.' },
      { icon: '🦁', t: 'Atmaca', d: 'Accipiter nisus; hızlı alçak uçuşuyla kentsel ve ormanlık alanlarda yaşar.' },
      { icon: '🦆', t: 'Kızıl Şahin', d: 'Buteo buteo; en yaygın yırtıcı kuş; hava akımlarında kanat açarak süzer.' },
      { icon: '🌊', t: 'Balık Kartalı', d: 'Pandion haliaetus; dalarak balık avlayan su üstü uzmanı; göç mevsimi.' },
      { icon: '🦉', t: 'Kaya Kartalı', d: 'Aquila chrysaetos; yüksek dağlık alanlarda kayan, majestetik yırtıcı.' },
    ],
  },
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🌅', t: 'Termal Akımlar', d: 'Öğle saatlerinde ısınan hava yükselir; yırtıcılar spiral çizerek kanat açar.' },
      { icon: '🔭', t: 'Ekipman', d: '10x42 dürbün ve geniş alan gözlemi için teleskop; tripod sabitlik sağlar.' },
      { icon: '📍', t: 'İzleme Noktaları', d: 'Yüksek tepeler, köprüler ve göç güzergahı darboğaz noktaları idealdir.' },
      { icon: '📱', t: 'Tür Tespiti', d: 'Merlin ve eBird uygulamaları ses ve görsel ile tür tespitinde yardımcı olur.' },
      { icon: '📅', t: 'Göç Dönemi', d: 'Eylül-Ekim sonbahar göçü; en yüksek çeşitlilik ve sayı bu dönemde.' },
    ],
  },
};

export default function HawkWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];
  const accent = '#b45309';
  const bg = '#080400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦅 Yırtıcı Kuş Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0e00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#d97706',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160c00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fbbf24', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
