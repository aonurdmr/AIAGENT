import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  biology: {
    title: 'Biyoloji',
    items: [
      { icon: '🦔', t: 'Kirpi Turleri', d: 'Erinaceus concolor; Bati Kirpisi Turkiye\'nin en yaygin kirpi turudur.' },
      { icon: '🌿', t: 'Beslenmesi', d: 'Bocekler, salyangozu, kurtcuklar ve kurbagalar kirpinin temel besinleridir.' },
      { icon: '❄️', t: 'Kis Uykusu', d: 'Kasim-Mart arasi uzun kis uykusuna yatar; vucutsu 4-6C\'a duser.' },
      { icon: '📍', t: 'Habitat', d: 'Tarimsal alanlar, korular, bahceler ve cali ortasi kirpinin favori yasamalananlaridir.' },
      { icon: '👁️', t: 'Gece Hayvani', d: 'Tamamen noktournal; gece aktivitesi yuzunde gozlem sadece gece mumkundur.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '🌙', t: 'Gece Gozlemi', d: 'Kirmizi isikli el feneri kirpiyi rahatsiz etmeden gozlemlemenizi saglar.' },
      { icon: '🌿', t: 'Bahce Davet', d: 'Bahcede bos su kabi, kuru yaprak yigini kirpiyi dogal sekilde ceker.' },
      { icon: '📸', t: 'Fotografi', d: 'Gece vizyon veya kizilotesi gece kamerasi; yumusak yapay isikla fotograflama.' },
      { icon: '🔊', t: 'Kirpi Sesi', d: 'Cisiyor, horultu ve hafif kiskirtma sesi kirpinin duyulabilir iletisim yoludur.' },
      { icon: '🤝', t: 'Koruma Destegi', d: 'Kirpi yasam alani dostu bahce icin pestisid kullanmaktan kacinilmalidir.' },
    ],
  },
};

export default function HedgehogGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('biology');
  const data = TABS[tab];
  const accent = '#92400e';
  const bg = '#080400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦔 Kirpi Rehberi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0e00', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#160c00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
