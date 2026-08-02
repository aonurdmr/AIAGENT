import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🐸', t: 'Yeşil kurbağa', d: 'Pelophylax ridibundus: en büyük, su kurbağası. Göl ve dere kenarı.' },
      { icon: '🌿', t: 'Ağaç kurbağası', d: 'Hyla arborea: küçük yeşil, vantuz parmak. Gece bağırır. Bitki üstü.' },
      { icon: '🟤', t: 'Kara kurbağa', d: 'Bufo bufo: iri, siğilli, yavaş. Geceleri avlanır, karada.' },
      { icon: '🏔️', t: 'Dağ kurbağası', d: 'Rana macrocnemis: yüksek dağ dereleri. Soğuğa dayanıklı.' },
    ],
  },
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '💧', t: 'Su bağımlılığı', d: 'Deri solunumu: kuru hava öldürür. Su kalitesi ekosistem sağlık göstergesi.' },
      { icon: '🌙', t: 'Gece sesi', d: 'Çiftleşme çığlığı: ilkbaharda yoğun. Her türün farklı sesi tanınabilir.' },
      { icon: '🐛', t: 'Besin', d: 'Böcek, solucan, küçük su canlıları. Doğal pestisit vazifesi görür.' },
      { icon: '⚠️', t: 'Tehdit', d: 'Chytrid mantarı: küresel kurbağa salgını. Türkiye\'de de var. Koruma şart.' },
    ],
  },
};

export default function FrogGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020e04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐸 Kurbağa Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · ekoloji · ses</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#15803d' : '#031808', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#031808', borderRadius: 14, padding: 14, border: '1px solid #15803d33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #052808' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{item.t}</div>
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
