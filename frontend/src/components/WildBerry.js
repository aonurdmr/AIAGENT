import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Toplama',
    items: [
      { icon: '🫐', t: 'Yaban Mersini', d: 'Vaccinium myrtillus; asit topraklarda yetişir, temmuz-ağustos mavi meyve verir.' },
      { icon: '🍓', t: 'Yabani Çilek', d: 'Ormanlık açıklıklarda haziran sonrası; küçük, yoğun aromalı kırmızı meyve.' },
      { icon: '⚠️', t: 'Tehlikeli Benzerler', d: 'Kırmızı böğürtlen türleri güvenli ancak Solanum (itüzümü) gibi zehirliler var.' },
      { icon: '🧺', t: 'Toplama Kapları', d: 'Hava geçiren kaplarda toplayın; poşette ezilir ve küflenir.' },
      { icon: '📅', t: 'Mevsimler', d: 'Çilek Haziran, kuşburnu Eylül, böğürtlen Temmuz-Ağustos, alıç Ekim.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍓', t: 'Taze Tüketim', d: 'Hasattan itibaren 24-48 saat içinde en iyi aromada; buzdolabı ömrü 3 gün.' },
      { icon: '🫙', t: 'Reçel Yapımı', d: 'Eşit meyve ve şeker oranıyla kısık ateşte 45-60 dakika kaynatılır.' },
      { icon: '🍷', t: 'Meyve Suyu', d: 'Taze meyve sıkılıp şeker ilavesiyle içeceğe dönüştürülür; dondurulur.' },
      { icon: '❄️', t: 'Dondurma', d: 'Yıkanıp kurutulan meyveler buzlukta 12 aya kadar tazeliğini korur.' },
      { icon: '💊', t: 'Antioksidan', d: 'Yaban mersini yüksek antioksidan içeriğiyle göz sağlığı için önerilir.' },
    ],
  },
};

export default function WildBerry() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#7c3aed';
  const bg = '#060010';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ede9fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🫐 Yabani Meyveler</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#100020', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#a78bfa',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#0e0020', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#c4b5fd', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
