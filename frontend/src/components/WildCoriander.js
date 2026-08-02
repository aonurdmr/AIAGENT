import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '🌿', t: 'Yabani Kişniş', d: 'Coriandrum sativum ve Bifora testiculata; tarla kenarlarında ve boşluklarda.' },
      { icon: '📅', t: 'Toplama Sezonu', d: 'Mart-Mayıs yaprak toplama; Haziran-Temmuz tohum olgunlaşması için bekle.' },
      { icon: '👃', t: 'Koku Testi', d: 'Limon ve biberiyeyi andıran yoğun koku; dokunur dokunmaz yayılır.' },
      { icon: '🌸', t: 'Çiçek', d: 'Küçük beyaz veya soluk pembe şemsiye çiçek kümeleri Nisan-Haziran arası.' },
      { icon: '🏔️', t: 'Habitat', d: 'Akdeniz kıyıları, tahıl tarlaları ve Orta Anadolu step bölgelerinde yaygın.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🥗', t: 'Taze Yaprak', d: 'Dövme ve bulgur salatalarına; Antakya mutfağında yeşil sos temelidir.' },
      { icon: '🫙', t: 'Baharat Tohumu', d: 'Kuruyan tohumlar öğütülüp köfte, pilav ve çorba baharatı olarak kullanılır.' },
      { icon: '🍵', t: 'Sindirim Çayı', d: 'Taze veya kuru yaprak demlemesi gaz ve şişkinliği giderir.' },
      { icon: '🧄', t: 'Sos', d: 'Zeytinyağı, sarımsak ve kişniş yapraklarıyla blende; balık ve et yanı.' },
      { icon: '💊', t: 'Tıbbi Kullanım', d: 'Anti-oksidan ve antibakteryel özellikler; geleneksel Anadolu halk tıbbında.' },
    ],
  },
};

export default function WildCoriander() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#166534';
  const bg = '#000e04';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dcfce7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Kişniş</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001c0a', borderRadius: 10, overflow: 'hidden' }}>
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
