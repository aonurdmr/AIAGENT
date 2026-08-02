import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  hunting: {
    title: 'Avlanma',
    items: [
      { icon: '🐦', t: 'Bıldırcın Avı', d: 'Coturnix coturnix; Temmuz-Kasim arasi avlanir; gocmen tur olarak sezon takibi onemli.' },
      { icon: '🐕', t: 'Av Kopekleri', d: 'Pointer ve Setter cins kopekler buldircini koku ile saptar ve isaretler.' },
      { icon: '🌾', t: 'Habitat', d: 'Tahil tarlaları, otlaklar ve cali araları; hasat sonrasi aniz alanlari verimli.' },
      { icon: '🎯', t: 'Silah Secimi', d: '12\'lik av tufegi saçma No.7-8; buldircin kucuk oldugu icin ince sacma gerekir.' },
      { icon: '📅', t: 'Sezon Bilgisi', d: 'Temmuz-Kasim; kotalari takip edin; goc hareketleri sezon suresi etkiler.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Izgara', d: 'Bütün bıldırcın üzüm yapraklarına sarılarak izgara; Ege mutfağının incisi.' },
      { icon: '🍷', t: 'Şaraplı', d: 'Kırmızı şarap, kekik ve defne yaprağıyla uzun pişirme; narin eti için ideal.' },
      { icon: '🧅', t: 'Soğanlı Kavurma', d: 'Bol soğan, domates ve baharatla tencerede yavaş kavurma; pilava servis.' },
      { icon: '🫙', t: 'Marine', d: 'Zeytinyağı, sarımsak ve limon suyu ile 4 saatlik marine öncesi yumuşatır.' },
      { icon: '🥗', t: 'Izgara Salata', d: 'Izgara bıldırcın, roka, ceviz ve nar ekşisiyle modrern şef sunumu.' },
    ],
  },
};

export default function QuailHunting() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('hunting');
  const data = TABS[tab];
  const accent = '#ca8a04';
  const bg = '#080600';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fefce8', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐦 Bıldırcın Avı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#161000', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fbbf24',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#120e00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fde68a', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
