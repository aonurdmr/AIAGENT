import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  fishing: {
    title: 'Avcilik',
    items: [
      { icon: '🎣', t: 'Alakalik Avcilik', d: 'Olta soguk, temiz ve akintili sularda yapilir; kanca no 6-10, ince misina.' },
      { icon: '🌿', t: 'Suni Sinekler', d: 'Dry fly ve nymph yontemleri ozgun ortam suyunda en yuksek verim saglar.' },
      { icon: '🌊', t: 'Akarsu Secimi', d: 'Karadeniz dereleri, Bolu ve Kastamonu akarsu sistemleri zengin alabalik habitatlari.' },
      { icon: '🕐', t: 'En Iyi Saat', d: 'Sabah erken ve aksam saat 17-19 arasi; yiyecek bollugu ve dusuk isi.' },
      { icon: '📏', t: 'Yasal Boyut', d: 'Akarsu alabaligi icin minimum 20 cm Turkiye genelinde gecerlidir.' },
    ],
  },
  cook: {
    title: 'Pisirme',
    items: [
      { icon: '🔥', t: 'Izgarada', d: 'Taze alabalik zeytinyagi, sarimsak ve kekikle izgaraya surun; 8-10 dakika.' },
      { icon: '🧈', t: 'Tava Alabalik', d: 'Unla kaplandiktan sonra tereyaginda her iki taraf 4-5 dakika kizartilir.' },
      { icon: '🍋', t: 'Limon Soslu', d: 'Taze limon, keperi ve kekik ile soguk porsiyonlar yaz sofrasi icin idealdir.' },
      { icon: '🫙', t: 'Marine Yontemi', d: 'Tuz, seker ve dereotu ile 48 saat marine edilen alabalik gravlax olarak servis edilir.' },
      { icon: '💨', t: 'Soguk Duman', d: 'Ozel ahsap tisinde 12-24 saat soguk dumanda salamura edilmis icerik saglar.' },
    ],
  },
};

export default function TroutGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('fishing');
  const data = TABS[tab];
  const accent = '#0369a1';
  const bg = '#000810';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐟 Alabalık Rehberi</span>
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
            <div key={i} style={{ background: '#001824', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
