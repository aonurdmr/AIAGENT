import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Toplama',
    items: [
      { icon: '🌿', t: 'Tanıma Özellikleri', d: 'Kekik; küçük mor çiçekler, oval yapraklar ve güçlü aromatik kokusuyla tanınır.' },
      { icon: '⛰️', t: 'Nerede Yetişir', d: 'Güneşli, kuru kaya yamaçlarında, orman açıklıklarında ve bozkırlarda bulunur.' },
      { icon: '📅', t: 'Toplama Mevsimi', d: 'Haziran-Ağustos çiçeklenme döneminde toplanması en idealdir.' },
      { icon: '✋', t: 'Toplama Yöntemi', d: 'Üst yaprak ve çiçekleri elle veya makasla, kökü zarar vermeden koparın.' },
      { icon: '⚠️', t: 'Dikkat Noktaları', d: 'Korunan alanlardan toplamayın; solvanlı melas (Thymus serpyllum) ile karıştırmayın.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍗', t: 'Mutfak Kullanımı', d: 'Et marinasyonu, çorba, zeytinyağlı yemekler ve fırın patates ile mükemmel uyum.' },
      { icon: '🌡️', t: 'Tıbbi Faydaları', d: 'Öksürük, bronşit ve sindirim problemlerine karşı geleneksel kullanımı mevcuttur.' },
      { icon: '🫖', t: 'Kekik Çayı', d: 'Kurutulmuş yapraklardan hazırlanan çay; antifungal ve antibakteriyel etki gösterir.' },
      { icon: '🏺', t: 'Kurutma Yöntemi', d: 'Karanlık havadar bir yerde ters asarak 1-2 haftada kurutulabilir.' },
      { icon: '🧴', t: 'Uçucu Yağ', d: 'Steam distilasyonu ile elde edilen yağ cilt bakımı ve aromaterapi amaçlı kullanılır.' },
    ],
  },
};

export default function WildThyme() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#65a30d';
  const bg = '#020a00';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ecfccb', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Kekik</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#0a1a00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#84cc16',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#0c1800', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#a3e635', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
