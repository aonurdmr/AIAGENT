import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '🍇', t: 'Mürver', d: 'Sambucus nigra; yol kenari, orman acikligi ve nehir kenarlarinda yaygin.' },
      { icon: '🌸', t: 'Cicek', d: 'Mayis-Haziran buyuk beyaz sath cicek kumesi; hoş koku; yenebilir.' },
      { icon: '🫐', t: 'Meyve', d: 'Agustos-Eylul kucuk siyah salkimlar; ham meyve hafif toksik, pisince yenir.' },
      { icon: '⚠️', t: 'Dikkat', d: 'Siyah mürver ile kokarotu (Sambucus ebulus) karistirmayin; dikkat gerekir.' },
      { icon: '🌿', t: 'Habitat', d: 'Nemin yüksek oldugu orman kenarlari, dere kiyilari ve bahce duvar dipleri.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🧃', t: 'Mürver Suyu', d: 'Salkımlar kaynamış suda; sıkılıp şekerle karıştırılan mor-siyah meyve suyu.' },
      { icon: '🌸', t: 'Çiçek Şurubu', d: 'Çiçekler şeker ve su ile 24 saat dinlendirme; limonatayla mükemmel.' },
      { icon: '🍷', t: 'Mürver Şarabı', d: 'Fermente mürver meyvesi; İngiliz ev yapımı şarabı geleneğinin vazgeçilmezi.' },
      { icon: '🍮', t: 'Reçel', d: 'Portakal kabuğuyla mürver reçeli; güçlü tart ve zengin renk.' },
      { icon: '💊', t: 'Antiviral', d: 'Sambucus bileşenleri soğuk ve grip süresi kısaltma araştırmalarında test edildi.' },
    ],
  },
};

export default function WildElderberry() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#7e22ce';
  const bg = '#060010';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f5f3ff', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍇 Mürver</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#100022', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#a78bfa',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#0e001e', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#c4b5fd', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
