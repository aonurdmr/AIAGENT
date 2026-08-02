import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🌲', t: 'Tur Tanimi', d: 'Pinus nigra; Anadolu daglarinin simgesi, 40 metre boya ulasabilir.' },
      { icon: '🏔️', t: 'Yayilis', d: 'Orta ve Guney Anadolu daglarinda 1000-2000 metre araliginda yogundur.' },
      { icon: '🌡️', t: 'Iklim Uyumu', d: 'Kuru ve soğuk iklimlere dayanikli; don ve kar altinda hayatta kalir.' },
      { icon: '🐦', t: 'Yuvalama', d: 'Kizilercik, doganci ve dogus baykuslari karacam ormanlarin ozgun sakinleridir.' },
      { icon: '🌱', t: 'Yenileme', d: 'Yangin sonrasi tohum sacarak hizla yenilenir; pionyer tur olarak kritiktir.' },
    ],
  },
  use: {
    title: 'Kullanim',
    items: [
      { icon: '🌿', t: 'Reçine', d: 'Canlicam turpentini boya, vernik ve sabun uretiminde hammadde olarak kullanilir.' },
      { icon: '🪵', t: 'Odun', d: 'Sert ve dayanikli ahsap; insaat, mobilya ve tahta kaplamada tercih edilir.' },
      { icon: '🫖', t: 'Ibre Cayi', d: 'Genc yesil ibrelerden demlenen cay C vitamini ve antiseptik icerir.' },
      { icon: '🌲', t: 'Kozalak', d: 'Kozalaklar dekorasyon ve yanacak olarak kullanilir; tohumlar yenebilir.' },
      { icon: '⚠️', t: 'Korunma', d: 'Orman yangini ve yasadisi kesim karacam ormanlari icin baslica tehditlerdir.' },
    ],
  },
};

export default function TurkishPine() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('ecology');
  const data = TABS[tab];
  const accent = '#166534';
  const bg = '#010800';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dcfce7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌲 Karaçam Rehberi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001408', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#001c0a', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
