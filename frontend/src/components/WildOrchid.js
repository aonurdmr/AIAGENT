import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanima',
    items: [
      { icon: '🌸', t: 'Yabani Orkide', d: 'Turkiye 200+ yabani orkide turuyle dunya en zengin flora bolgesinden biridir.' },
      { icon: '🌷', t: 'Anacamptis', d: 'A. pyramidalis (piramit orkide) Ege ve Akdeniz otlak alanlarda yaygindir.' },
      { icon: '💜', t: 'Ophrys Cinsi', d: 'Bocek taklitcisi Ophrys turleri oldukca ozel polenlesme stratejisi uretir.' },
      { icon: '🔴', t: 'Dactylorhiza', d: 'Kirmizi benekli yapraklariyla Karadeniz nemli cayirlarinda karakteristiktir.' },
      { icon: '📖', t: 'Kaynak Onerisi', d: 'Pierre Delforge\'un Orchids of Europe rehberi Turkiye turleri icin en kapsamlidir.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '📅', t: 'Mevsim', d: 'Mart-Haziran arasi tur sayisi en yuksektir; daglik bolgeler Mayis-Temmuz.' },
      { icon: '📍', t: 'Lokasyonlar', d: 'Yurdos vadisi, Igneada orman ve Amanos daglari orkide cesitliligi yonden zengin.' },
      { icon: '🌿', t: 'Habitat', d: 'Kireçli otlaklar, sekonder cayirlar ve acik cali alanlari favori habitat.' },
      { icon: '📸', t: 'Fotograf', d: 'Makro lens ve diz ustu konumda, dogal isik ile renk dokusunu en iyi yakalar.' },
      { icon: '⚠️', t: 'Koruma', d: 'Tum yabani orkideler yasalar ve CITES uluslararasi antlasmasi ile korunmaktadir.' },
    ],
  },
};

export default function WildOrchid() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#7e22ce';
  const bg = '#060010';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f3e8ff', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌸 Yabani Orkide</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#100020', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#a855f7',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#0e0020', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#d8b4fe', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
