import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🐝', t: 'Balli ari', d: 'Apis mellifera: genellikle sakin. Kovan veya yuvanın yakininda provokte.' },
      { icon: '🟡', t: 'Sarı eşek arisi', d: 'Vespula: agresif, iyi neden yok sokar. Yemek kokusu ceker.' },
      { icon: '🟠', t: 'Buyuk esek arisi', d: 'Vespa crabro: iriliği aldatici, sakin agac yuvalari. Kese yakini.' },
      { icon: '⚫', t: 'Yer arisi', d: 'Bombus: kaba davranis, toprak yuvasi. Adim atinca patlar.' },
    ],
  },
  first_aid: {
    title: 'Ilk Yardim',
    items: [
      { icon: '🧊', t: 'Buz uygula', d: 'Ari soktuğunda: sogen cikar, soguk bez. Kart ile sogen siymak yapma.' },
      { icon: '💊', t: 'Antihistamin', d: 'Iceride alerjik reaksiyon: antihistamin. Epinefrin alerjikler icin.' },
      { icon: '⚠️', t: 'Anafilaksi', d: 'Nefes darligi, yuz sismesi: 112 ara, EpiPen varsa uygula.' },
      { icon: '🏃', t: 'Suru kacinma', d: 'Kovan bulduysan uzaklas. Kacan: duz kos, yonu degistirme. Su altına.' },
    ],
  },
};

export default function HazardousBees() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐝 Arı Güvenliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · ilk yardım · anafilaksi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#b45309' : '#100e00', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100e00', borderRadius: 14, padding: 14, border: '1px solid #b4530933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1c1a00' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>{item.t}</div>
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
