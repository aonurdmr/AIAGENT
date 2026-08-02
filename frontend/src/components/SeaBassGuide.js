import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  fishing: {
    title: 'Avcılık',
    items: [
      { icon: '🎣', t: 'Levrek Yöntemleri', d: 'Lure avcılığı, trolling ve dip oltası başlıca yöntemlerdir.' },
      { icon: '🌊', t: 'Kıyı Avcılığı', d: 'Kayalık kıyılarda dalga kıran yapıları ve burunlar harika noktalardır.' },
      { icon: '🕐', t: 'En İyi Saat', d: 'Şafak ve alacakaranlıkta levrek aktif avlanır; ay dolunayında gece iyi sonuç.' },
      { icon: '🎯', t: 'Lure Seçimi', d: '7-12 cm maket balık, ışıltılı kaşıklar ve popper en etkili yapay yemlerdir.' },
      { icon: '📏', t: 'Yasal Boyut', d: 'Turkiye\'de minimum 25 cm, Ege ve Akdeniz icin bu kural siki uygulanir.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Fırın Levrek', d: 'Tuz kabuğuna sarıp 200°C fırında 30 dakika; en saf lezzetli yöntem.' },
      { icon: '🍋', t: 'Limon Soslu', d: 'Zeytinyağı, kapari, limon suyu ve sarımsak sosuyla tava levrek klasiktir.' },
      { icon: '🪨', t: 'Taş Fırın', d: 'Odun ateşli taş fırında pişirme balığa eşsiz duman aromatik tat katar.' },
      { icon: '🫙', t: 'Marine', d: 'Zeytinyağı, kekik, biberiye ile 2 saatlik marine pişirme öncesi şarttır.' },
      { icon: '🥗', t: 'Sunum', d: 'Çam fıstığı ve kapari salatası, közlenmiş biber ile mükemmel servis.' },
    ],
  },
};

export default function SeaBassGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('fishing');
  const data = TABS[tab];
  const accent = '#0284c7';
  const bg = '#000814';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐟 Levrek Rehberi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001428', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#38bdf8',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001828', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#7dd3fc', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
