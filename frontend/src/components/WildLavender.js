import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Toplama',
    items: [
      { icon: '💜', t: 'Lavanta Tanima', d: 'Lavandula angustifolia; kucuk mor cicekler, gri-yesil yapraklar ve guclu koku.' },
      { icon: '⛰️', t: 'Habitat', d: 'Taslık, iyi drene olmus ve gunes goren kuru yamaclarda dogal olarak yetisir.' },
      { icon: '📅', t: 'Hasat Zamani', d: 'Haziran-Temmuz cicek acmadan once veya tam cicekli iken hasat en iyisidir.' },
      { icon: '✂️', t: 'Kesmek', d: 'Saptan 1/3 kesip demete baglayin; sabah sisligi cekildikten sonra kesilmeli.' },
      { icon: '☀️', t: 'Kurutma', d: 'Salkimlar halinde ters asarak karanlık havalandirmali yerde 2-4 hafta kurutun.' },
    ],
  },
  use: {
    title: 'Kullanim',
    items: [
      { icon: '💤', t: 'Uyku Icin', d: 'Lavanta yastikta ya da difuser yolu ile stres azaltma ve uyku kalitesi arttirir.' },
      { icon: '🍪', t: 'Mutfakta', d: 'Kuru lavanta cicekleri tatli, kek ve cay ile narin aromatik tat katar.' },
      { icon: '🧴', t: 'Aromaterapi', d: 'Esansiyel yag noktasal uygulamada veya tampon ile baslere koyulabilir.' },
      { icon: '🛁', t: 'Banyo', d: 'Tuvale sarili kuru lavanta demlenerek banyoya ilave edilebilir.' },
      { icon: '🏺', t: 'Dekorasyon', d: 'Kurumus lavanta demetleri dogal ev dekorasyonu ve guzul koku saglar.' },
    ],
  },
};

export default function WildLavender() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#7c3aed';
  const bg = '#060010';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ede9fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>💜 Yabani Lavanta</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#100020', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#0e0020', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
