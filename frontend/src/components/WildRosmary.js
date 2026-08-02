import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Toplama',
    items: [
      { icon: '🌿', t: 'Biberiye Tanima', d: 'Rosmarinus officinalis; dar uzun yapraklar, gumus-yesil renk ve guclu koku.' },
      { icon: '⛰️', t: 'Habitat', d: 'Akdeniz iklimine ozgu; kuru, kireçli, gunes goren yerler ve kiyı bolgeleri.' },
      { icon: '📅', t: 'Sezon', d: 'Nisan-Haziran ciceklenme oncesinde en aromalidır; sonbahar da hasat edilebilir.' },
      { icon: '✂️', t: 'Toplama', d: 'Dal uclarinin 1/3\'unu kesin; yasli odunsu kisimdan kaçının, sadece uc genç kısım.' },
      { icon: '☀️', t: 'Kurutma', d: 'Kuru havalandirmali yerde veya dehidratorde 35-40C\'da 4-6 saatte kurur.' },
    ],
  },
  use: {
    title: 'Kullanim',
    items: [
      { icon: '🍗', t: 'Mutfak', d: 'Kuzu, tavuk ve domatesli yemeklerle olmazsa olmaz; kekikle birlikte kullanilir.' },
      { icon: '🫙', t: 'Biberiyeli Yag', d: 'Zeytinyagi icinde biberiye dallari bekletilerek aromalandirmali yag yapilir.' },
      { icon: '💆', t: 'Aromaterapi', d: 'Ucucu yag konsantrasyonu saç derisini canlandirmak icin kullanilir.' },
      { icon: '🧴', t: 'Cilt Bakimi', d: 'Biberiye ozutundeki antioksidanlar kolajen sentezini destekler.' },
      { icon: '🫖', t: 'Biberiye Cayi', d: 'Hafif demleme dikkat ve bellek guclendiricisi olarak geleneksel tiptır.' },
    ],
  },
};

export default function WildRosmary() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#166534';
  const bg = '#000e04';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dcfce7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Biberiye</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001c08', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#4ade80',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#002010', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#86efac', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
