import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🍑', t: 'Yabani Erik', d: 'Prunus spinosa (caneviz) ve P. divaricata; Anadolu da genis yayilimli.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Temmuz-Eylul arasi; ilk don sonrasi meyvelerde tatlanma ve yumusama olur.' },
      { icon: '🌳', t: 'Agac Tanima', d: 'Dikenli dallar, kucuk beyaz cicekler erken ilkbaharda; oval koyu mavi-mor meyve.' },
      { icon: '🧺', t: 'Toplama', d: 'Elle veya bez serip silkeleme; olgun meyveleri bagirsaklardan koruyan balmumu katmani.' },
      { icon: '🌿', t: 'Koruma', d: 'Kus ve memeliler icin onemli besin; yalnizca ihtiyaciniz kadar toplayin.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍷', t: 'Koruk Suyu', d: 'Ham erikten elde edilen koruk suyu kavurmalar ve marinatlara eksi tat katar.' },
      { icon: '🍯', t: 'Recel', d: 'Caneviz receli yoğun tatli-eksi; tulum peyniriyle harika esleme.' },
      { icon: '🧃', t: 'Ev Yapimi Icki', d: 'Erik meyve suyu veya hafif fermente ev yapimlari geleneksel.' },
      { icon: '🫙', t: 'Tursu', d: 'Ham yabani erik tursulari Anadolu geleneksel mutfaginda sofralarda yer alir.' },
      { icon: '💊', t: 'Geleneksel Tip', d: 'Cicek ve yaprak kaynamis suyu balgam soguklugu icin halk ilacinda kullanilir.' },
    ],
  },
};

export default function WildPlum() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#7c3aed';
  const bg = '#060010';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ede9fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍑 Yabani Erik</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#10001e', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#0e0018', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
