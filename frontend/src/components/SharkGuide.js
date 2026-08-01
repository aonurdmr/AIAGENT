import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türkiye Türleri',
    items: [
      { icon: '🦈', t: 'Köpek balığı', d: 'Akdeniz ve Karadeniz: mustelus, scyliorhinus. Genelde 1-2 metre, zararsız.' },
      { icon: '🔵', t: 'Mavi köpekbalığı', d: 'Prionace glauca: açık deniz, 3-4 m. Nadiren kıyıya yaklaşır.' },
      { icon: '🟢', t: 'Büyük beyaz', d: 'Akdeniz ve Ege: kayıtlarda var. Nadir. Kıyıdan uzakta.' },
      { icon: '🐙', t: 'Torpedo (İğne)', d: 'Torpil sınıfı, köpekbalığı ailesinden. Elektrik şoku verebilir.' },
    ],
  },
  safety: {
    title: 'Güvenlik',
    items: [
      { icon: '🏊', t: 'Yuzme guvenlik', d: 'Turkiye sahillerinde kopekbaligi saldirisı son derece nadir.' },
      { icon: '🩸', t: 'Kan', d: 'Yaralı veya adet döneminde yüzme: teorik risk, pratikte nadirdir.' },
      { icon: '🦈', t: 'Karşılaşma', d: 'Uzak dur, ani hareket yapma, yavaş geri çekil. Buyuk cogunluk kacmayı sever.' },
      { icon: '📋', t: 'Istatistik', d: 'Turkiyede kopekbaligi saldırısı yuzde 0.001 altı. Boa veya yıldırım daha riskli.' },
    ],
  },
};

export default function SharkGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦈 Köpekbalığı Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · davranış · güvenlik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#3b82f6' : '#041018', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041018', borderRadius: 14, padding: 14, border: '1px solid #3b82f633' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081c28' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>{item.t}</div>
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
