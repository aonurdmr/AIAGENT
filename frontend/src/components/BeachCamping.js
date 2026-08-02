import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  setup: {
    title: 'Kurulum',
    items: [
      { icon: '⛺', t: 'Çadır Yeri', d: 'Yüksek suda çizgisinden en az 50 metre uzakta; kum sert ve kuru olmalı.' },
      { icon: '🌊', t: 'Gelgit Kontrolü', d: 'Gelgit tablosunu kontrol edin; gece yükselen deniz çadırınıza ulaşabilir.' },
      { icon: '🌬️', t: 'Rüzgar Yönü', d: 'Sabah kara-deniz rüzgarı değişimi; çadırı rüzgar engeli arkasına kurun.' },
      { icon: '🌅', t: 'Gün Işığı', d: 'Doğu yönlü kurulum gün doğumu güzelliğini yaşatır; ağaç gölgesi öğleye.' },
      { icon: '♻️', t: 'İz Bırakma', d: 'Tüm atıkları kendinizle götürün; kamp alanı kururken geldiğiniz gibi bırakın.' },
    ],
  },
  activities: {
    title: 'Aktiviteler',
    items: [
      { icon: '🎣', t: 'Kıyı Balıkçılığı', d: 'Şafak saatlerinde çubuk olta ile kefal, isparoz ve barbunya avcılığı.' },
      { icon: '🤿', t: 'Snorkeling', d: 'Düşük gelgit saatlerinde kayalık alanlarda Akdeniz canlılarını keşfedin.' },
      { icon: '🌅', t: 'Şafak Yürüyüşü', d: 'Kumsalda gün doğumu yürüyüşü hem ruhsal hem egzersiz değeri taşır.' },
      { icon: '🌟', t: 'Yıldız Gözlemi', d: 'Işık kirliliğinden uzak sahil, Samanyolu gözlemi için mükemmel konumdur.' },
      { icon: '🐚', t: 'Kabuk Toplama', d: 'Boş kabukları toplamak yasaldır; canlı içerenler kesinlikle bırakılmalı.' },
    ],
  },
};

export default function BeachCamping() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('setup');
  const data = TABS[tab];
  const accent = '#0891b2';
  const bg = '#000c14';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#cffafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🏖️ Sahil Kampı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001828', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#001c2e', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
