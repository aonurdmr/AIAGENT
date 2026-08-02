import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🐟', t: 'Turna avı', d: 'Büyük predatör: canlı veya suni yem. Hızlı yüzme taklidi jerkbait.' },
      { icon: '🎣', t: 'Mayt seçimi', d: 'Kızılkanat: doğal mayt, çok etkili. Büyük spinner: parlak gün iyi.' },
      { icon: '🌊', t: 'Nokta', d: 'Saz altı kenarı, gölcük çıkışı, nehir kolu: turna pusuda bekler.' },
      { icon: '⏰', t: 'Zaman', d: 'Sabah erken ve akşam: en aktif. Öğlen: derine çekilir, zor av.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Tava', d: 'Un ile kaplama: sıcak zeytinyağında 5 dk. Balık kılçıklıdır: kılçık al.' },
      { icon: '🫕', t: 'Güveç', d: 'Domates, sarımsak, zeytinyağı ile: İzmir usulü pişirme. 30 dk.' },
      { icon: '🥘', t: 'Buğulama', d: 'Limon ve dereotu: en sağlıklı. Et beyaz, kılçık çıkar kolayca.' },
      { icon: '⚠️', t: 'Kılçık', d: 'Turna Y şekilli kılçık: parmak ile çıkar. Küçük balıkta tehlikeli.' },
    ],
  },
};

export default function TigerFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060802', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Turna Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · nokta · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#4d7c0f' : '#0e1204', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0e1204', borderRadius: 14, padding: 14, border: '1px solid #4d7c0f33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #161e06' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#bef264' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
