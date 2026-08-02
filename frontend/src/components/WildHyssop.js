import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '💜', t: 'Yabani Zufa', d: 'Hyssopus officinalis; Akdeniz ve Dogu Anadoluda kireçli kayalıklarda.' },
      { icon: '📅', t: 'Cicekleme', d: 'Temmuz-Eylul; mavi-mor dik cicek salkımlari; kekikten farkli gaga yapisi.' },
      { icon: '🌿', t: 'Tanima', d: 'Dar lancet yapraklar; sert govde; belirgin kekik-anason kokusu.' },
      { icon: '🏔️', t: 'Habitat', d: 'Kireçtasi ve kireçli tas alanlari; Toroslar, Fırat havzası ve Hakkari dağları.' },
      { icon: '✂️', t: 'Toplama', d: 'Cicekleme baslangicinda ust uclari kes; govdeden 10 cm bırakılır.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍵', t: 'Balgam Soğukluğu', d: 'Zeytinyağı ve bal ile demleme; öksürük ve bronşit için geleneksel destek.' },
      { icon: '🍳', t: 'Mutfak', d: 'Kuzu ve tavuk ile; Fransız mutfağının kekiğe benzer kullanım şekli.' },
      { icon: '🫙', t: 'Likör', d: 'Benedictine ve Chartreuse likörlerin temel bileşeni; ev yapımı ot likörüne.' },
      { icon: '🧴', t: 'Esans Yağı', d: 'Antiseptik ve antimikrobiyal özellikler; cilt bakımı ve sabun formulasyonu.' },
      { icon: '💊', t: 'Antiviral', d: 'Ursolic asit ve marrubiin bileşenleri; uçucu yağı antimikrobiyal aktivite.' },
    ],
  },
};

export default function WildHyssop() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#6d28d9';
  const bg = '#080010';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ede9fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>💜 Yabani Zufa</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#12001e', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#0e001c', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
