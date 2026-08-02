import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  prep: {
    title: 'Hazırlık',
    items: [
      { icon: '🐗', t: 'Yağ alma', d: 'Domuz eti kuvvetli koku: yağ dokusunu temizle. Soğuk kesim, temiz bıçak.' },
      { icon: '🧂', t: 'Marine', d: 'Kırmızı şarap veya limon: 12-24 saat. Sarımsak, defne, karabiber. Kokuyu keser.' },
      { icon: '🔪', t: 'Parçalama', d: 'Omuz: uzun pişirme. Bel:ızgara. But: kavurma. Böbrek bölgesi: sote.' },
      { icon: '❄️', t: 'Saklama', d: 'Avdan sonra hemen soğut. 2°C altı muhafaza. 3 günden uzun: dondur.' },
    ],
  },
  cook: {
    title: 'Tarifler',
    items: [
      { icon: '🫕', t: 'Güveç', d: 'Omuz eti, kök sebze, kırmızı şarap. 160°C fırın, 4 saat. Çatal girsin.' },
      { icon: '🔥', t: 'Döner tarzı', d: 'Bütün but: alevde yavaş döner, 6-8 saat. Geleneksel av ziyafeti.' },
      { icon: '🌿', t: 'Otlu kavurma', d: 'Biberiye, adaçayı, sarımsak. Yüksek ateş 5dk + 180°C fırın 1 saat.' },
      { icon: '🍖', t: 'Sucuk', d: 'Kıyma + baharatlar: kimyon, pul biber, sarımsak. Kurutulmuş veya taze.' },
    ],
  },
};

export default function WildBoarCookbook() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('prep');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080200', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐗 Domuz Eti Tarifleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hazırlık · marine · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#92400e' : '#120600', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#120600', borderRadius: 14, padding: 14, border: '1px solid #92400e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1e0c00' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>{item.t}</div>
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
