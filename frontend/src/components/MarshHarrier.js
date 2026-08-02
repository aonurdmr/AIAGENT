import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanıma',
    items: [
      { icon: '🦅', t: 'Saz Delicesi', d: 'Circus aeruginosus; sazlik bolgelerinde yasayan orta buyuklukte yirtici kus.' },
      { icon: '🎨', t: 'Esin Renk', d: 'Erkek griyken boz-kahverengi; dis bireyler bas ve kanat uclarinda krem.' },
      { icon: '✈️', t: 'Ucus Bicimi', d: 'V seklinde kanat tutusu ve dusuk sallanma ucusu; sazlik uzerinde glide yapar.' },
      { icon: '🌿', t: 'Habitat', d: 'Buyuk sazlik alanlar; Meric ve Kizilirmak delta; Burdur Golü cevresi.' },
      { icon: '🐟', t: 'Avlanma', d: 'Kurbaga, kucuk memeliler ve kus yavrulari; yavasi dalarak kapma ustasi.' },
    ],
  },
  season: {
    title: 'Sezon',
    items: [
      { icon: '🌸', t: 'İlkbahar Gelişi', d: 'Mart-Nisan; yuvaya dönen çiftler yuva tamirine başlar; süzülme gösterileri.' },
      { icon: '🥚', t: 'Üreme', d: 'Nisan-Haziran; sazlık içinde yerde yuva; 4-6 yumurta 30-35 gün kuluçka.' },
      { icon: '🍂', t: 'Güney Göçü', d: 'Ağustos-Ekim; genç bireyler önce, erişkinler sonra; Afrika kışlağına.' },
      { icon: '❄️', t: 'Kışlayan Bireyler', d: 'Az sayıda birey Türkiye kıyılarında kışlar; Ege ve Akdeniz bataklıkları.' },
      { icon: '📡', t: 'Uydu Takibi', d: 'Halkalama çalışmaları göç yolunu Sahel Afrika ya kadar izliyor.' },
    ],
  },
};

export default function MarshHarrier() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#92400e';
  const bg = '#0a0200';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦅 Saz Delicesi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#180600', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#140400', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fcd34d', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
