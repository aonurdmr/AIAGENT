import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '🦪', t: 'Istridye ve Midye', d: 'Kayalik kiyilarda gelgit bolgesi istridye ve midye populasyonlari barindirir.' },
      { icon: '🌿', t: 'Deniz Yosunu', d: 'Ulva (yesil yosun) ve Porphyra (nori) gibi turler yenilebilir ve besleyicidir.' },
      { icon: '🦀', t: 'Yengeç', d: 'Kayalar altinda ve taslarin arasinda saklanir; elle veya yayla yakalanir.' },
      { icon: '🐚', t: 'Deniz Salyangoz', d: 'Littorina ve Patella turleri kayalik kiyilarda bol bulunur.' },
      { icon: '⚠️', t: 'Guvenlik', d: 'Kirliligi bilinen kiyi veya mavi-yesil alg uyarisi olan bolgelerde toplamak uygun degildir.' },
    ],
  },
  cook: {
    title: 'Pisirme',
    items: [
      { icon: '🔥', t: 'Buharli Midye', d: 'Temizlenmis midyeleri kapali tencerede 5-7 dakika buharla; kabuklar acilinca hazir.' },
      { icon: '🫙', t: 'Marine Yosun', d: 'Deniz yosunu sirkeli marine ile salata olarak; dogal lezzet guclendiricisi.' },
      { icon: '🧄', t: 'Sarimsakli Istridye', d: 'Firinda tereyag ve sarimsak ile doldurulmus istridye 5 dakikada hazir.' },
      { icon: '🌿', t: 'Yosun Carpi Cayi', d: 'Kirmizi yosundan demlenen carpi cayi mineral deposu ve doğal iyot saglar.' },
      { icon: '🍋', t: 'Limon Ile Servis', d: 'Her deniz urununde limon; hem antibakteriyeldir hem lezzetini tamamlar.' },
    ],
  },
};

export default function CoastalForaging() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#0369a1';
  const bg = '#000a14';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🏖️ Kıyı Yiyecek Arama</span>
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
