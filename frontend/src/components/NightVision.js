import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  tech: {
    title: 'Teknoloji',
    items: [
      { icon: '🟢', t: 'Gen 1 & 2', d: 'Temel gece görüş: mevcut ısıgı yükseltir. Karanlıkta IR illuminator gerek.' },
      { icon: '🔴', t: 'Termal', d: 'Isı farkını gorur, ısık gerektirmez. Kaya, ağac ve hayvan arasi net.' },
      { icon: '🟡', t: 'Dijital NV', d: 'Dedektif kamerası gibi. Kayıt yapabilir, pahali termal kadar hassas değil.' },
      { icon: '🔵', t: 'Monoküler', d: 'Tek goz NV monokuleri: hafif, gezgin icin tercih. Durbin daha kapsamli.' },
    ],
  },
  use: {
    title: 'Kullanım Alanları',
    items: [
      { icon: '🦌', t: 'Av', d: 'Gece avinda hayvan tespiti. Bazi ulkelerde yasali sinir vardir. Hukuku kontrol et.' },
      { icon: '🏕️', t: 'Kamp guvenlik', d: 'Kamp etrafinda yaban hayati tespiti. Ay ve mevsime gore fark.' },
      { icon: '🔭', t: 'Kuş gözlemi', d: 'Gece kus gozlemi: baykuslar ve gece aktif kuslar icin termal idealdir.' },
      { icon: '🚣', t: 'Su sporları', d: 'Gece tekne ve kayak: NV monoküler navigasyon için kullanilır.' },
    ],
  },
};

export default function NightVision() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tech');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02040e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌙 Gece Görüş Cihazları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknoloji · seçim · kullanım alanları</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#6366f1' : '#080a1e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#080a1e', borderRadius: 14, padding: 14, border: '1px solid #6366f133' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #10122e' : 'none' }}>
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
