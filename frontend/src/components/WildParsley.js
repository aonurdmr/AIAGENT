import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Toplama',
    items: [
      { icon: '🌿', t: 'Yabani Maydanoz', d: 'Petroselinum crispum; dişli parlak yapraklar, karakteristik aromatik koku.' },
      { icon: '⚠️', t: 'Tehlikeli Benzerler', d: 'Baldıran (Conium maculatum) ile karıştırmayın; zehirli ve ölümcüldür.' },
      { icon: '📍', t: 'Habitat', d: 'Nemli dere kenarları, bahçe sınırları ve terk edilmiş alanlar tercih edilir.' },
      { icon: '📅', t: 'Sezon', d: 'İlkbahar-yaz arası toplanır; çiçeklenmeden önce en güçlü aromada.' },
      { icon: '✂️', t: 'Hasat', d: 'Yaprakları dipten değil yapraktan kesin; bitkinin sürmesine izin verin.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🥗', t: 'Salatalarda', d: 'Tabule, çoban salatası ve ızgara et garnitürü olarak en yaygın kullanımı.' },
      { icon: '🍲', t: 'Yemeklerde', d: 'Çorba, güveç ve et sularına son dakikada eklenerek taze aroma katar.' },
      { icon: '💊', t: 'Tıbbi Faydaları', d: 'C ve K vitamini açısından zengin; antioksidan ve antiinflamatuar özellikler.' },
      { icon: '🧃', t: 'Taze Suyu', d: 'Yeşil smoothie içine bir avuç taze maydanoz enerji ve mineral ekler.' },
      { icon: '🫙', t: 'Kurutma', d: '35-40C fırın veya dondurarak kurutma yeşil rengi ve aromayı korur.' },
    ],
  },
};

export default function WildParsley() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#15803d';
  const bg = '#000a02';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dcfce7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Maydanoz</span>
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
