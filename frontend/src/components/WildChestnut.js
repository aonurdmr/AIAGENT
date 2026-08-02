import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🌰', t: 'Kestane Hasadı', d: 'Ekim-Kasim arasi; koza yarimca acilinca kestaneler duser ve yerden toplanir.' },
      { icon: '🌳', t: 'Agac Tanima', d: 'Castanea sativa; uzun lancet yapraklar, dikenli kozalar; Karadeniz bolgesinde bol.' },
      { icon: '🧺', t: 'Toplama', d: 'Eldiven ile dikenli kozalardan kestaneleri cikarin; dar agizli torbaya koyun.' },
      { icon: '📅', t: 'Sezon', d: 'Eylul sonu kistane rengi donmeye baslar; hasat Ekim ayinda doruga ulasir.' },
      { icon: '🔍', t: 'Kalite', d: 'Agir, cilalanmis, parlak kabuklu secin; hafif ve mat olanlar kurumaya baslamistir.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Közleme', d: 'Kabukta kestaneyi kesip mangala; odun kesme ve tatlanma aninda hazir.' },
      { icon: '🍲', t: 'Leylek Corbasi', d: 'Kabuğu soyulmuş kestane, soğan ve tavuk suyu ile; Trabzon usulü tarif.' },
      { icon: '🍫', t: 'Kestane Sekeri', d: 'Şeker şurubunda haşlanmış kestane; Bursa ve İstanbul pastanelerinin klasiği.' },
      { icon: '🥘', t: 'Pilav', d: 'Pirinç pilavına haşlanmış kestane; Türk mutfağının festif sofra geleneği.' },
      { icon: '🫙', t: 'Saklama', d: 'Serin kuru ortamda 1-2 ay; uzun süre için haşlayıp dondurucuya koyun.' },
    ],
  },
};

export default function WildChestnut() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#78350f';
  const bg = '#0a0200';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌰 Kestane Rehberi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#180600', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#140400', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
