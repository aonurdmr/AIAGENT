import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  fishing: {
    title: 'Avcılık',
    items: [
      { icon: '🐍', t: 'Yılan Balığı', d: 'Anguilla anguilla; akarsu ve gol sistemlerinde yasayan gececi uzun balik.' },
      { icon: '🌙', t: 'Gece Avlanma', d: 'Yilan baligi tamamen gece aktifdir; karanlikta dip oltasi en etkili yontem.' },
      { icon: '🪱', t: 'Yem', d: 'Solucan, kurbaga ve kucuk baliklar; kokulu yemler gece avciliginida avantaj saglar.' },
      { icon: '🎣', t: 'Dip Oltasi', d: 'Agir kurşun ve geri tek iğne; dip tutarken sallanmaya müsaade edin.' },
      { icon: '⚠️', t: 'Koruma Durumu', d: 'Kritik tehlike altında; AB kotaları var; Türkiye mevzuatını kontrol edin.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Izgara', d: 'Bütün yılan balığı ızgarası; derimden gelen yağ kendini marine eder.' },
      { icon: '🍢', t: 'Şiş', d: 'Deri soyulmuş parçalar şişe dizilir; limon ve biberiye ile mangalda.' },
      { icon: '🫙', t: 'Füme', d: 'Soğuk tütsüleme 12 saat; füme yılan balığı İskandinavya lezzetinin incisi.' },
      { icon: '🥘', t: 'Güveç', d: 'Domates, soğan ve baharat ile tencerede; Karadeniz balık güveci tarzı.' },
      { icon: '🧂', t: 'Temizlik', d: 'Deri kaygan; içli bez veya eldiven ile kavrayıp soyun; özentili bıçak işi.' },
    ],
  },
};

export default function EelFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('fishing');
  const data = TABS[tab];
  const accent = '#1e3a5f';
  const bg = '#000610';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dbeafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐍 Yılan Balığı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001228', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#60a5fa',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001830', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#93c5fd', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
