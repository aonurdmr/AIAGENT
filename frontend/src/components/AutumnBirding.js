import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🦢', t: 'Kuğu', d: 'Cygnus: kasim-subat arası gollerde. Buyuk sur kuresel yoğunluk.' },
      { icon: '🦆', t: 'Yaban ordegi', d: 'Anas platyrhynchos: goc doneminde binlerce kus. Kiyida yoğunluk.' },
      { icon: '🦅', t: 'Akbaba toplasmasi', d: 'Eylul-Kasim: Bozburun, Iskenderun. Termikte yukselen akbaba surus.' },
      { icon: '🐦', t: 'Kizilgerdan', d: 'Erithacus: kis misafiri. Kasim-Subat arasi parkta sahip olur.' },
    ],
  },
  watch: {
    title: 'Gozlem',
    items: [
      { icon: '🍂', t: 'Eylul-Kasim', d: 'Sonbahar goc: en yogun kus hareket donemi. Bolge ve saat onemli.' },
      { icon: '🌊', t: 'Kiyi sulak alan', d: 'Sonbaharda kiyi: dal-su kusları toplanır. Deltalar goc rotasinda.' },
      { icon: '🔭', t: 'Durbun', d: '8x42 veya 10x42: genis gorus acisi. Kus kalabaliginda hizli tarama.' },
      { icon: '📱', t: 'Ses tanima', d: 'Merlin, eBird app: ses kaydi ile tur tanima. Goc kuslarını tespit.' },
    ],
  },
};

export default function AutumnBirding() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080402', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍂 Sonbahar Kuş Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · göç · gözlem noktaları</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#b45309' : '#100804', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100804', borderRadius: 14, padding: 14, border: '1px solid #b4530933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1c1008' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fb923c' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
