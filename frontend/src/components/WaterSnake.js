import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🟢', t: 'Su yılani (Natrix natrix)', d: 'Turkiye genelinde. Zehirsiz. Boyun arkasında sari/turuncu halka.' },
      { icon: '🔵', t: 'Benekli su yılani (N.tessellata)', d: 'Nehir ve gollerde. Balık ve kurbagayla beslenir. Zararsız.' },
      { icon: '🟡', t: 'Vipera', d: 'Kara engerek su kenarına yaklaşabilir. Kısa govde, geniş kafa, zehirli.' },
      { icon: '⚠️', t: 'Tanıma', d: 'Yuvarlak goz bebegi zehirsiz, dikey olan zehirli. Eminseniz mesafe koru.' },
    ],
  },
  encounter: {
    title: 'Karsilasma',
    items: [
      { icon: '🚶', t: 'Yaklasma', d: 'Su kiyisinda yilana adim atma. Ayak sesi hissedince kacabilir.' },
      { icon: '🤚', t: 'Elle tutmak', d: 'Hic tutmaya kalkma. Stres altında zehirsizler bile ısırır.' },
      { icon: '🩹', t: 'Isırık', d: 'Su yılani ısırığı: yıka, antiseptik. Engerek ısırığı: hareketsiz kal, acil.' },
      { icon: '🌊', t: 'Kamp', d: 'Su kiyisi kamp: canta/bot kapali tut. Yılanlar serinlemeye girer.' },
    ],
  },
};

export default function WaterSnake() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐍 Su Yılanları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · tanıma · karşılaşma güvenliği</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#081008', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#081008', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #112011' : 'none' }}>
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
