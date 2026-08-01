import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  moon: {
    title: 'Ay Fazlari',
    items: [
      { icon: '🌕', t: 'Dolunay', d: 'Dolunay gecesi: balik hareketli, yuzey beslenmesi artar. Gecenin hazinesi.' },
      { icon: '🌑', t: 'Yeni ay', d: 'Karanlikta balik karanligi kullanir. Biyoluminasans gorulur, av azalır.' },
      { icon: '🌓', t: 'Ilk ceyrek', d: 'Artan ayin enerji donemi: sabah ve aksam arasinda en verimli.' },
      { icon: '🌗', t: 'Son ceyrek', d: 'Azalan ay: balik derinde, dip avcilik daha etkili bu fazda.' },
    ],
  },
  tips: {
    title: 'Ipuclari',
    items: [
      { icon: '📅', t: 'Ay takvimi', d: 'Balik takvimi uygulamalarinda ay fazlari var. Uyumlu gun sec.' },
      { icon: '🌊', t: 'Gel-git + Ay', d: 'Dolunay ve yeni ayda gel-git guclu: balik kıyıya yaklasir.' },
      { icon: '🌙', t: 'Gece avı', d: 'Dolunay gecesi: isik olmadan yuzey lure. Levrek ve alabalik aktif.' },
      { icon: '⏰', t: 'En iyi saat', d: 'Ay dogus ve batimi: ayin cekimi zirva. Saatlere gore konu sec.' },
    ],
  },
};

export default function MoonFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('moon');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02040e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌕 Ay Etkili Balıkçılık</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ay fazları · gel-git · gece avı</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#4338ca' : '#06081c', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#06081c', borderRadius: 14, padding: 14, border: '1px solid #4338ca33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #0c1028' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#818cf8' }}>{item.t}</div>
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
