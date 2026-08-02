import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Toplama',
    items: [
      { icon: '🌼', t: 'Papatya Tanıma', d: 'Matricaria chamomilla; beyaz dil çiçekler, sarı disk ortası ve elmamsı koku.' },
      { icon: '📍', t: 'Habitat', d: 'Tarla kenarları, kuru çayırlar, yol kenarları ve açık alanlar yaygın lokasyonlar.' },
      { icon: '📅', t: 'Toplama Dönemi', d: 'Mayıs-Temmuz tam çiçek açma döneminde; sabah sisi çekildikten sonra.' },
      { icon: '✋', t: 'Toplama Yöntemi', d: 'Çiçek başını çevirerek koparın; sapı ve yapraklar olmadan sadece çiçek.' },
      { icon: '☀️', t: 'Kurutma', d: 'İnce tabakada 35-40C fırın veya gölgede havalandırarak 1 hafta kurutun.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🫖', t: 'Papatya Çayı', d: 'Sakinleştirici ve uyku destekleyici; 150ml sıcak suya 2-3 çiçek 5 dakika.' },
      { icon: '😴', t: 'Uyku Desteği', d: 'Apigenin içeriği GABA reseptörlerine bağlanarak doğal sakinleştirici etki.' },
      { icon: '🧴', t: 'Cilt Bakımı', d: 'Antiinflamatuar özellikleri kızarıklık, egzama ve yara iyileşmesinde yardımcı.' },
      { icon: '👁️', t: 'Göz Bakımı', d: 'Soğutulmuş papatya kompres gözaltı şişkinliği ve yorgun gözler için.' },
      { icon: '🌱', t: 'Saç Bakımı', d: 'Düzenli papatya durulama sarı saçları aydınlatır ve parlaklık katar.' },
    ],
  },
};

export default function ChamomilePicking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#d97706';
  const bg = '#0a0600';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef9c3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌼 Papatya Toplama</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1a1000', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#f59e0b',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160e00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
