import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  fishing: {
    title: 'Avcılık',
    items: [
      { icon: '🐟', t: 'Ton Balığı', d: 'Thunnus thynnus (orfoz) ve T. alalunga; Ege ve Marmara derin sularinda.' },
      { icon: '⛵', t: 'Tekne Avı', d: 'Trolling yontemi 4-8 dugum surati ve 50-150m derin maket yem cekimi.' },
      { icon: '🎣', t: 'Oltayla', d: 'Yuzey trolling veya dip jigging; 60-100g metal jig ve renk tercih si onemli.' },
      { icon: '📅', t: 'Sezon', d: 'Nisan-Kasim; Bogazdan gecis Eylul-Kasim; gece avlari verimli donemler.' },
      { icon: '⚠️', t: 'Kota', d: 'Ton kotasi ICCAT tarafindan belirlenir; guncel kota ve lisans bilgisini takip edin.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🥩', t: 'Sashimi', d: 'Taze mavi yüzgeçli ton iç filesi; ince dilimlenip soğuk sunum; Japon tarzı.' },
      { icon: '🔥', t: 'Izgara', d: 'Kalın dilim %70 pişirme; ortası pembe kalmalı; limon ve kapari eşliğinde.' },
      { icon: '🫙', t: 'Konserve', d: 'Zeytinyağı ve tuzla sterilize edilmiş ev yapımı konserve; kış boyu kullanım.' },
      { icon: '🥗', t: 'Niçoise Salata', d: 'Taze ton, yumurta, zeytin ve domates; Fransız klasiği Türk yorumu.' },
      { icon: '🌿', t: 'Marine', d: 'Narenciye suyu, zencefil ve soya sosuyla 30 dakika marine; füzyon tarzı.' },
    ],
  },
};

export default function TuneFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('fishing');
  const data = TABS[tab];
  const accent = '#1d4ed8';
  const bg = '#000412';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dbeafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐟 Ton Balığı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#000c28', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#60a5fa',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001030', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#93c5fd', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
