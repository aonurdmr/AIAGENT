import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '🌿', t: 'Su Teresi', d: 'Nasturtium officinale; temiz dere ve kaynak baslarinda buyuyen sulak bitki.' },
      { icon: '📅', t: 'Sezon', d: 'Ilkbahar en iyi toplanim donemi; yaz aylarinda acilasabilir, tatli kalir.' },
      { icon: '💧', t: 'Temiz Su Sartt', d: 'Yalnizca kirlilik icermeyen, berrak akarsulardan toplayin; parazit riski var.' },
      { icon: '🌱', t: 'Tanima', d: 'Suda surunen koyu yesil uzun yaprak; beyaz kucuk dort yaprakli cicek.' },
      { icon: '⚠️', t: 'Uyari', d: 'Kirli veya hayvan kullanan sulardan toplamak tehlikelidir; kaynagi bilin.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🥗', t: 'Salata', d: 'Taze su teresi roka ile; limon sosu ve tuz ile basit ama lezzetli.' },
      { icon: '🥤', t: 'Smoothie', d: 'Elma, salatalik ve su teresiyle yesil smoothie; besin yogunlugu yuksek.' },
      { icon: '🍵', t: 'Cay', d: 'Haslama su teresi cayi odem giderici ve C vitamini acisindan zengin.' },
      { icon: '🫙', t: 'Pesto', d: 'Zeytinyagi, sarimsak ve cevizle blenderlanan su teresi pesto ekmek uzerine.' },
      { icon: '💊', t: 'Beslenme', d: 'C ve K vitamini, demir ve kalsiyum kaynagi; yuz gram havuctan fazla A vitamini.' },
    ],
  },
};

export default function WildCress() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#0891b2';
  const bg = '#000c14';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#cffafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Su Teresi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001828', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#22d3ee',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001e30', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#67e8f9', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
