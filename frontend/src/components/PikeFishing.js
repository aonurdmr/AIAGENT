import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  method: {
    title: 'Teknikler',
    items: [
      { icon: '🎣', t: 'Canli yem', d: 'Kucuk sazancık veya tatlı su baligi: turna icin en etkili. 2-4 inch.' },
      { icon: '🟡', t: 'Spinnerbait', d: 'Geniş kanatlı spinner: yavaş cekis. Turna yüzey avcısı. Gölün kenarlari.' },
      { icon: '🔴', t: 'Jerkbait', d: 'Sert plastikte kesik kesik cekiş: yaralı balık taklidi. Turna saldırır.' },
      { icon: '🐟', t: 'Büyük rubber', d: '6-10 inch rubber shad veya paddle tail. Agir dag jigiyle dip.' },
    ],
  },
  habitat: {
    title: 'Habitat & Mevsim',
    items: [
      { icon: '🌿', t: 'Sazlık kenari', d: 'Turna pusuda bekleme avlar. Sazlık kenari, mısır kıyısı, dal arası.' },
      { icon: '❄️', t: 'Kış mevsimi', d: 'Tatlı su balıkları kışın ağırlaşır: turna aktif kalır. Kış avı imkani.' },
      { icon: '🌅', t: 'Sabah aktivitesi', d: 'Turna sabah beslenir. Golgeli kıyı seritlerde pusuda.' },
      { icon: '🏊', t: 'Su derinligi', d: 'Yaz: 3-6 metre derin golgeli yapılar. Kis: 6-10 metreye iner.' },
    ],
  },
};

export default function PikeFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('method');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c0a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Turna Balığı Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknikler · habitat · mevsim</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#041208', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041208', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081e10' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{item.t}</div>
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
