import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  fishing: {
    title: 'Avcılık',
    items: [
      { icon: '🐟', t: 'Yayın Balığı Av', d: 'Silurus glanis; Avrupa nin en buyuk tatli su baligi; 300 kg a ulaşabilir.' },
      { icon: '🌙', t: 'Gece Avcılığı', d: 'Yayın gece avlanır; saat 22-04 arası kıyı yakını ağzı ve bükü incele.' },
      { icon: '🎣', t: 'Canlı Yem', d: 'Sazan, olta balığı ve büyük solucan; 30-50 cm canlı yem etkilidir.' },
      { icon: '💪', t: 'Güçlü Takım', d: '50+ lb test taşıyıcı misina; güçlü manevra için geniş tamburlu makara.' },
      { icon: '📍', t: 'Lokasyonlar', d: 'Dicle, Fırat, Sakarya ve Kızılırmak nehirleri; baraj gölleri de üretken.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Fırın', d: 'Büyük dilimler zeytinyağı ve sarımsakla 180°C fırında; beyaz et sulu kalır.' },
      { icon: '🍲', t: 'Balık Güveci', d: 'Domates, kırmızı biber ve soğanla yavaş pişirme; ot ve biber zengin.' },
      { icon: '🏊', t: 'Suda Haşlama', d: 'Defne yaprağı ve limon ile haşlama; en basit ve sağlıklı yöntem.' },
      { icon: '🧆', t: 'Köfte', d: 'Kılçıksız kıyılmış yayın eti köftesi; maydanoz ve soğanla; mangalda.' },
      { icon: '🫙', t: 'Temizleme', d: 'Balçık kokusu giderimi için soğuk tuzlu suda 2 saat bekletme şarttır.' },
    ],
  },
};

export default function CatfishGuide2() {
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
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐟 Yayın Balığı</span>
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
