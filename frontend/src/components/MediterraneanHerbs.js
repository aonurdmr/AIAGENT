import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  herbs: {
    title: 'Bitkiler',
    items: [
      { icon: '🌿', t: 'Kekik (Oregano)', d: 'Origanum onites; Ege bolgesi iklim kekigi; pizza ve et icin kuru kullanim.' },
      { icon: '🌸', t: 'Biberiye', d: 'Rosmarinus officinalis; Akdeniz boyunca yabani; firin et ve ekmek icin.' },
      { icon: '💜', t: 'Lavanta', d: 'Lavandula stoechas; Bati Anadolu maki; kuru demeti ve kozmetik kullanim.' },
      { icon: '🟡', t: 'Kuzu Kekigi', d: 'Thymus serpyllum; taslarda yayvan; cay, yemek ve balgam soguklugu icin.' },
      { icon: '🌱', t: 'Adacayi', d: 'Salvia officinalis; gumussi yaprak; balgam soguklugu ve hafiza destegi.' },
    ],
  },
  collect: {
    title: 'Toplama',
    items: [
      { icon: '✂️', t: 'Budama Teknigi', d: 'Gunde erken saatte toplayin; ciciekleme oncesi aroma en yogun.' },
      { icon: '📅', t: 'Sezon', d: 'Nisan-Haziran cicekleme donemi; sonbaharda da toplanim mumkundur.' },
      { icon: '🧺', t: 'Saklama', d: 'Demetler halinde serin karanlik yerde asarak kuruyun; 3-6 ay soguk kasede.' },
      { icon: '🌍', t: 'Lokasyon', d: 'Ege yakalari, Bodrum yarimadasi, Datca ve Marmaris makiliklari verimli.' },
      { icon: '⚖️', t: 'Surdurulebilirlik', d: 'Her bitki kolunun ancak 1/3 unu alin; koklere dokunmayin.' },
    ],
  },
};

export default function MediterraneanHerbs() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('herbs');
  const data = TABS[tab];
  const accent = '#b45309';
  const bg = '#0a0600';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Akdeniz Bitkiler</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#160e00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#f59e0b',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#120c00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
