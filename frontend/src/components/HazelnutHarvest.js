import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🌰', t: 'Olgunluk Tespiti', d: 'Kabuk sarı-kahverengi ve yaprak dökülünce fındık olgunlaşmıştır.' },
      { icon: '📅', t: 'Hasat Dönemi', d: 'Ağustos-Ekim arası bölgeye göre değişir; Karadeniz için Eylül idealdir.' },
      { icon: '🧺', t: 'Toplama Yöntemi', d: 'Zemine dökülmüş fındıklar elle toplanır ya da çalı çırpma yöntemi kullanılır.' },
      { icon: '☀️', t: 'Kurutma', d: '3-5 gün güneşte veya havalandırmalı depolamada nem oranı düşürülür.' },
      { icon: '🏔️', t: 'Yabani Fındık', d: 'Orman kenarı ve dere yataklarında yabani fındık küçük ama lezzetlidir.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍫', t: 'Çikolata Uyumu', d: 'Türkiye dünya fındık üretiminin %70ini karşılar; çikolata endüstrisi için kritik.' },
      { icon: '🥐', t: 'Hamur İşi', d: 'Un halinde veya bütün olarak pasta, kurabiye ve poğaçada kullanılır.' },
      { icon: '🧴', t: 'Fındık Yağı', d: 'Soğuk sıkma fındık yağı salatada, pişirmede ve cilt bakımında değerlidir.' },
      { icon: '🌰', t: 'Kavurma', d: 'Tava veya fırında kısa süreli kavurma aromasını önemli ölçüde artırır.' },
      { icon: '🫙', t: 'Saklama', d: 'Kabuklu fındık serin ve kuru ortamda 1 yıl, kabuksuz dondurucuda 2 yıl.' },
    ],
  },
};

export default function HazelnutHarvest() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#92400e';
  const bg = '#0a0400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌰 Fındık Hasadı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1a0c00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#d97706',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#140800', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fbbf24', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
