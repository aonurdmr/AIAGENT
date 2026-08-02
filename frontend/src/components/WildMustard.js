import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '🌻', t: 'Yabani Hardal', d: 'Sinapis arvensis ve Brassica nigra; tarla ve yol kenarlarinda yaygin.' },
      { icon: '🌸', t: 'Cicekler', d: 'Nisan-Haziran arasi kucuk bol sari cicekler; tarla goruntusu çarpici.' },
      { icon: '🌿', t: 'Tanima', d: 'Genis loplu alt yapraklar ve gittikce kuculen ust yapraklar; tuylu govde.' },
      { icon: '📅', t: 'Toplama', d: 'Genc yaprak ve tohumlar; yaprak Nisan-Mayis; tohum Temmuz-Agustos.' },
      { icon: '🏔️', t: 'Habitat', d: 'Celtik ve bugday tarlaları; boz alanlar; deniz seviyesinden 1500 m ye.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🥗', t: 'Genç Yaprak', d: 'Salata ve sövelemeye eklenebilir; acı ve biber tadı var, az miktarda.' },
      { icon: '🫙', t: 'Ev Yapımı Hardal', d: 'Öğütülmüş tohum, sirke ve tuz; İngiliz külkedisi usulü ev yapımı hardal.' },
      { icon: '🌾', t: 'Baharat', d: 'Yabani hardal tohumları öğütülüp et ve balık baharatına katılır.' },
      { icon: '🧴', t: 'Hardal Yağı', d: 'Sıkılmış hardal yağı mutfakta; Hint mutfağının vazgeçilmez yağı.' },
      { icon: '💊', t: 'Tıbbi Kullanım', d: 'Sinigrin bileşeni bronşit için; hardal yaprağı kesesi geleneksel tedavi.' },
    ],
  },
};

export default function WildMustard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#ca8a04';
  const bg = '#080600';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fefce8', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌻 Yabani Hardal</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#161000', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#120e00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fde68a', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
