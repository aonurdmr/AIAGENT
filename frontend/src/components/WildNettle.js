import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🌿', t: 'Tanıma', d: 'Isırgan otu; dişli yapraklar, ince tüyler ve hafif batma hissiyle tanınır.' },
      { icon: '🧤', t: 'Güvenli Toplama', d: 'Kalın eldiven giyip üst genç yaprakları kesin; olgun yapraklar daha sert olur.' },
      { icon: '📅', t: 'Toplama Zamanı', d: 'Mart-Haziran arası ilkbahar sürgünleri en yumuşak ve besleyicidir.' },
      { icon: '📍', t: 'Nerede Bulunur', d: 'Nemli dere kenarları, orman içleri ve gübrelenmiş alanlar favori habitatlarıdır.' },
      { icon: '⚠️', t: 'Uyarı', d: 'Yol kenarı veya pestisit kullanılan yerlerden toplamaktan kaçının.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🍵', t: 'Isırgan Çayı', d: 'Taze veya kurutulmuş yapraklar demlenerek vitamin açısından zengin çay yapılır.' },
      { icon: '🥗', t: 'Isırgan Salatası', d: 'Haşlanıp soğutulmuş ısırgan, zeytinyağı ve limon ile servis edilir.' },
      { icon: '🍲', t: 'Ispanak Yerine', d: 'Her tarifte ıspanak yerine kullanılabilir; kaynar su batma özelliğini giderir.' },
      { icon: '🧀', t: 'Peynirli Börek', d: 'Haşlanmış ısırgan ve beyaz peynir karışımı börek için nefis bir iç harcı olur.' },
      { icon: '🫙', t: 'Kurutma', d: 'Gölgede serilerek veya ters asılarak kurutulan yapraklar 1 yıl dayanır.' },
    ],
  },
};

export default function WildNettle() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#15803d';
  const bg = '#000a02';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dcfce7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌱 Isırgan Otu</span>
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
