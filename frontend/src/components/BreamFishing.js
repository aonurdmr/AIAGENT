import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  method: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Sazan Oltası', d: 'Dip oltası ile yem dipte tutulur; 80-100 gr ağırlıklı kaşık sinker kullanılır.' },
      { icon: '🪱', t: 'En İyi Yemler', d: 'Mısır, solucan, ekmek hamuru ve özel sazan peleti mükemmel sonuç verir.' },
      { icon: '📍', t: 'Avlanma Yeri', d: 'Sazlık kenarları, derin çukurlar ve akıntı kırıkları favori bekleyiş noktalarıdır.' },
      { icon: '⏱️', t: 'En İyi Saat', d: 'Sabah şafak vakti ve akşam üzeri en yüksek aktivite saatleridir.' },
      { icon: '🌡️', t: 'Su Sıcaklığı', d: '18-24°C su sıcaklığı sazan balığı için en aktif beslenme dönemidir.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Mangal Sazan', d: 'Temizlenmiş sazanı kekik ve limonla marine edip közde 30-40 dakika pişirin.' },
      { icon: '🍲', t: 'Sazan Güveç', d: 'Domates, biber ve soğanla tencerede yavaş ateşte 45 dakika pişirin.' },
      { icon: '🧂', t: 'Tuzlama', d: 'Taze sazanı büyük taneli tuzla kaplayıp 24 saat bekletmek lezzetini artırır.' },
      { icon: '🫙', t: 'Saklama', d: 'Temizlenmiş balık buz kabında 2 gün, dondurucuda 3 aya kadar muhafaza edilir.' },
      { icon: '🍋', t: 'Sunum', d: 'Taze maydanoz, limon dilimleri ve zeytinyağı ile servis edilmesi önerilir.' },
    ],
  },
};

export default function BreamFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('method');
  const data = TABS[tab];
  const accent = '#0e7490';
  const bg = '#000c10';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#cffafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐟 Sazan Avcılığı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001820', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#22d3ee',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001c24', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#67e8f9', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
