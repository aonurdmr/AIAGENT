import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🌿', t: 'Yabani Badem', d: 'Prunus dulcis var. amara ve spontanea; Anadolu badem kultivasyonunun atasi.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Temmuz-Eylul; yesil dış kabuk yarılınca meyve olgunlaşmış olur.' },
      { icon: '🌳', t: 'Agac Tanima', d: 'Pembe-beyaz cicekler erken ilkbaharda; gri-yesil etli dis kabuk; sivri.' },
      { icon: '🧺', t: 'Toplama', d: 'Diskabuğu soyulur; ic kabuk sertyken yıkayıp güneşte kuruyun.' },
      { icon: '⚠️', t: 'Acı Badem', d: 'Yabani formlar amigdalin icererek toksik olabilir; az miktarda deneyiniz.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🥛', t: 'Badem Sütü', d: 'Islatılmış badem blende edilerek süzülür; bitki bazlı içecek alternatifi.' },
      { icon: '🍰', t: 'Badem Ezmesi', d: 'Badem unu ve şekerle yapılan marcipan; Türk ve Arap tatlı geleneğinde.' },
      { icon: '🫙', t: 'Badem Yağı', d: 'Soğuk sıkım badem yağı saç ve cilt bakımı; yemeklik de kullanılır.' },
      { icon: '🌰', t: 'Çiğ Tüketim', d: 'Taze yeşil badem baharın lezzeti; kabuklu tuz ve limonla mevsimlik meze.' },
      { icon: '🧁', t: 'Pasta Malzemesi', d: 'Öğütülmüş badem; glütensiz kek ve kurabiye tabanı; francalata tadı.' },
    ],
  },
};

export default function WildAlmond() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#854d0e';
  const bg = '#080400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef9c3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Badem</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#160a00', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#120800', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fde68a', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
