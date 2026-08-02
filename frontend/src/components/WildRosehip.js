import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🌹', t: 'Olgunluk', d: 'Kusburnu Ekim-Kasim arasi parlak kirmizi renk alinca hasat edilmeye hazirdir.' },
      { icon: '✂️', t: 'Toplama', d: 'Dikenli dallardan eldiven ile toplanir; basi ve kuyrugu alinir.' },
      { icon: '📅', t: 'Raf Omru', d: 'Taze kusburnu 1 hafta, buzdolabinda 3 hafta dayanir.' },
      { icon: '⛰️', t: 'Habitat', d: 'Cali ve orman kenarlarinda, talik, gunes goren yamalarda yogun bulunur.' },
      { icon: '🌿', t: 'Tur Secimi', d: 'Rosa canina en yaygin tur; diger Rosa turleri de toplanabilir.' },
    ],
  },
  use: {
    title: 'Kullanim',
    items: [
      { icon: '🫖', t: 'Kusburnu Cayi', d: 'C vitamini yonunden cok zengin; 2 kasik kuru meyve 200ml suya demi.' },
      { icon: '🍯', t: 'Recel', d: 'Cekirdeklerden arilmis et kismi sekerle pisirilerek vitamin-zengin recel yapilir.' },
      { icon: '🧴', t: 'Yag', d: 'Soguk sikma yontemiyle elde edilen kusburnu yagi cilt yenilenmesi icin degerli.' },
      { icon: '💊', t: 'C Vitamini', d: 'Portakaldan 20 kat fazla C vitamini icerir; bagisiklik destekleyici.' },
      { icon: '🫙', t: 'Kurutma', d: 'Ince dilimlenip firinda dusuk isida kurutularak uzun sure saklanir.' },
    ],
  },
};

export default function WildRosehip() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#be123c';
  const bg = '#0a0006';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ffe4e6', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌹 Kuşburnu</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0010', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#f43f5e',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180010', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fda4af', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
