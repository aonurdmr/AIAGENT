import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🌹', t: 'Yabani Nar', d: 'Punica granatum; Anadolu ormanlarinin cobani meyvesi; kucultuculuk atasi.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Eylul-Kasim kabuk catlamaya basladikca hasat donemi gelir.' },
      { icon: '🌳', t: 'Agac Tanima', d: 'Dikenli dallar, parlak kirmizi cicekler yazin; koyu kirmizi kucuk meyve.' },
      { icon: '🧺', t: 'Toplama', d: 'Sert kabuklu olgunlasmis meyveler kirilip saatler icinde taneler cikarilir.' },
      { icon: '🌍', t: 'Lokasyon', d: 'Bati Anadolu kayaliklari ve zeytinlikleri; Gediz ve Buyuk Menderes vadileri.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🧃', t: 'Nar Suyu', d: 'Taze sıkılmış nar suyu antioksidan deposu; taneler elde preslenir.' },
      { icon: '🫙', t: 'Nar Ekşisi', d: 'Kaynatılıp koyulaştırılan nar suyu; Güneydoğu Türk mutfağının vazgeçilmezi.' },
      { icon: '🥗', t: 'Salata', d: 'Taze nar taneleri roka salatası, semizotu ve cevizle mükemmel uyum.' },
      { icon: '🍷', t: 'Nar Şurubu', d: 'Şekerli nar kaynaması; dondurma, pasta ve kokteyl için ev yapımı şurup.' },
      { icon: '💊', t: 'Sağlık', d: 'Punikalagin bileşenleri; kalp sağlığı, inflamasyon karşıtı özellik araştırılmış.' },
    ],
  },
};

export default function WildPomegranate() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#be123c';
  const bg = '#0a0006';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fce7f3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌹 Yabani Nar</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1a0010', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fb7185',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160010', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fda4af', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
