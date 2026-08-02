import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🌿', t: 'Yabani Fistik', d: 'Pistacia terebinthus (menengiç) ve P. vera yabani formu; Güneydoğu Türkiye.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Eylul-Ekim meyve olgunlasmasi; kabuk acilinca veya dal silkeleyerek toplanir.' },
      { icon: '🌳', t: 'Agac Tanima', d: 'Alacik yaprakli küçük agac; bahar kirmizi cicekleri; kireçli kurak yamaçlar.' },
      { icon: '🧺', t: 'Toplama', d: 'Salkimlar halinde kesin; kabuklu birakin; son isleme sonra gerceklestirilir.' },
      { icon: '🌍', t: 'Lokasyon', d: 'Güneydoğu Anadolu kireçtasi platolar; Gaziantep, Şanlıurfa ve Mardin cevresi.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '☕', t: 'Menengiç Kahvesi', d: 'Kavrulmuş yabani fıstık; sütlü veya sade; Gaziantep\'in geleneksel içeceği.' },
      { icon: '🍯', t: 'Sakız', d: 'Pistacia reçinesinden elde edilen sakız; gıda ve tıp alanında yüzyıllardır.' },
      { icon: '🫒', t: 'Menengiç Yağı', d: 'Soğuk sıkım menengiç yağı; salata ve pişirmede; aromatik ve sağlıklı.' },
      { icon: '🧆', t: 'Mutfak', d: 'Antep baklavası, kadayıf ve künefe; kaliteli menengiç tadı Türk tatlı geleneği.' },
      { icon: '🏥', t: 'Tıbbi Kullanım', d: 'Reçine mide ülseri ve H. pylori için geleneksel ilaç; araştırmalar devam.' },
    ],
  },
};

export default function WildPistachio() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#65a30d';
  const bg = '#040a00';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ecfccb', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Fıstık</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#0a1400', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#a3e635',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#081200', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#bef264', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
