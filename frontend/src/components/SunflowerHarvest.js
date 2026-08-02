import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🌻', t: 'Olgunluk Tespiti', d: 'Tabaka arkası sarı-kahveye döndüğünde ve tohumlar dolunca hasat zamanıdır.' },
      { icon: '📅', t: 'Hasat Dönemi', d: 'Eylül-Ekim aylarında; erken hasat tohum küçük ve sulu kalır.' },
      { icon: '✂️', t: 'Kesim Yöntemi', d: 'Baş sapından 30-40 cm aşağıdan kesin; kurutmak için asılabilir hale getirin.' },
      { icon: '☀️', t: 'Kurutma', d: 'Havalandırmalı gölgede 2-3 hafta veya güneşte 1 hafta kurutulur.' },
      { icon: '🌾', t: 'Tohum Çıkarma', d: 'Kuruyunca ellerle ovalayın veya sert fırça ile tohumları dökün.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🧂', t: 'Tuzlu Çekirdek', d: 'Tuzlu suda ıslatılıp kavrulan çekirdek atıştırmalık ve besleyici.' },
      { icon: '🫙', t: 'Ayçiçek Yağı', d: 'Soğuk sıkma çekirdek yağı sofra yağı ve cilt bakımında değerli.' },
      { icon: '🍞', t: 'Ekmek Katkısı', d: 'Tohum ekmeğe katılarak hem lezzet hem besin değeri artırılır.' },
      { icon: '🐦', t: 'Kuş Yemi', d: 'Yabani kuşlar için hazırlanan karışık kuş yeminin temel bileşenidir.' },
      { icon: '💊', t: 'Besin Değeri', d: 'E vitamini, magnezyum ve selenyum; sağlıklı yağ asitleri açısından zengin.' },
    ],
  },
};

export default function SunflowerHarvest() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#ca8a04';
  const bg = '#080400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef9c3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌻 Ayçiçeği Hasadı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c1000', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#eab308',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160e00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fde047', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
