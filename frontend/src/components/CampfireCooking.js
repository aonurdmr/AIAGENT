import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  fire: {
    title: 'Ateş',
    items: [
      { icon: '🔥', t: 'Ateş Türleri', d: 'Tiypi, yıldız ve kavak yığını ateşi; her biri farklı pişirme senaryosuna uyar.' },
      { icon: '🪵', t: 'Yakacak Seçimi', d: 'Meşe, gürgen ve elma ağacı dumansız ve yüksek ısılı kor sağlar.' },
      { icon: '💧', t: 'Güvenli Mesafe', d: 'Ateşi ağaçlardan 3 metre uzak, zemini kazılmış bir çukurda yakın.' },
      { icon: '🌬️', t: 'Rüzgar Yönü', d: 'Her zaman rüzgar yönünü hesaba katın; kor saçılmasını engelleyin.' },
      { icon: '🚒', t: 'Söndürme', d: 'Su, kum veya toprak ile tamamen söndürün; kor sıcak kalabilir saatlerce.' },
    ],
  },
  recipes: {
    title: 'Tarifler',
    items: [
      { icon: '🥩', t: 'Közde Et', d: 'Tuzlanmış et direkt kora konur; dönüşümlü pişirme 20-30 dakika sürer.' },
      { icon: '🫙', t: 'Dutch Oven', d: 'Dökme demir kazan güveç, ekmek ve çorba için kamp aşçılığının başı.' },
      { icon: '🐟', t: 'Folyo Balık', d: 'Baharatlanmış balığı alüminyum folyoya sarıp kora gömin; 15-20 dakika.' },
      { icon: '🌽', t: 'Mısır Közde', d: 'Islak yaprakları ile birlikte kora konur; 20 dakikada karamelize mısır.' },
      { icon: '☕', t: 'Kahve', d: 'Çalı ateşinde küçük cezvede Türk kahvesi kamp sabahının ruhunu taşır.' },
    ],
  },
};

export default function CampfireCooking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('fire');
  const data = TABS[tab];
  const accent = '#ea580c';
  const bg = '#0c0200';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fff7ed', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🔥 Kamp Ateşi Yemekleri</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0800', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#f97316',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180600', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fdba74', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
