import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '🌿', t: 'Yabani Anason', d: 'Pimpinella anisum ve P. peregrina; tarla ve yol kenarlarinda Anadoluda yaygin.' },
      { icon: '📅', t: 'Toplama Donemi', d: 'Temmuz-Agustos tohum olgunlasmasinda; basak kesilip gölgede kurutulur.' },
      { icon: '🌸', t: 'Cicek', d: 'Beyaz kucuk semsiye cicek kumesi; rezene ile karistabilir, koku faklilidir.' },
      { icon: '👃', t: 'Koku', d: 'Karakteristik anason kokusu; licorice benzeri tath-baharatlı aroma.' },
      { icon: '🌍', t: 'Lokasyon', d: 'Orta ve Gueydogu Anadolu stebi; tarla kenarlari ve nadasa birakilmis alanlarda.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🥃', t: 'Rakı', d: 'Türkiye ulusal içkisi rakının temel aroması anasondur; ev yapımı anason suyu.' },
      { icon: '🍵', t: 'Anason Çayı', d: 'Sindirim kolaylaştırıcı ve sancı giderici; bebek klik çayının temelidir.' },
      { icon: '🍞', t: 'Ekmek ve Pasta', d: 'Çörek otu benzeri; Türk simitleri, açma ve kahvaltılık ekmeklerde kullanım.' },
      { icon: '🍬', t: 'Şekerleme', d: 'Anasonlu akide şekeri geleneksel Türk tatlanması; halk pazarı lezzeti.' },
      { icon: '💊', t: 'Tıbbi Kullanım', d: 'Anetol bileşeni antibakteryel; öksürük, balgam ve gaz gidericisi olarak.' },
    ],
  },
};

export default function WildAnise() {
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
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Anason</span>
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
