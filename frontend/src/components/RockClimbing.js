import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  gear: {
    title: 'Ekipman',
    items: [
      { icon: '🪢', t: 'Halat', d: 'Tek halat 60-70m. Dinamik: düşüş enerjisini emer. Güvenlik notu kontrol.' },
      { icon: '🥾', t: 'Tırmanış ayakkabısı', d: 'Yumuşak kauçuk taban: tutunma. Sıkı ama ağrı eşiği geçme.' },
      { icon: '⛑️', t: 'Kask', d: 'Taş düşmesi ve düşüş: kask şart. Klip güvenli olsun. Her çıkışta kontrol.' },
      { icon: '🔗', t: 'Ekipman kontrol', d: 'UIAA/CE sertifikası ara. Hasar ve yaş: her 5-10 yılda değiştir.' },
    ],
  },
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🤜', t: 'El tutuşu', d: 'Krimp, open hand, pinch, sidepull, undercling. Mümkünse open hand: tendon koruması.' },
      { icon: '🦶', t: 'Ayak işi', d: 'Gözler ayakta: doğru tutuş seçimi. Topuk kanca, toe hook: ileri teknik.' },
      { icon: '⚖️', t: 'Ağırlık merkezi', d: 'Kalçalar kaya yakın: kol gerginliği azalır. Denge önce, güç sonra.' },
      { icon: '🔴', t: 'Düşme eğitimi', d: 'Kontrollü düşme öğren: doğal refleks yanlış. Pratik yap, korku azalır.' },
    ],
  },
};

export default function RockClimbing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('gear');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060402', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧗 Kaya Tırmanışı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekipman · teknik · güvenlik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#92400e' : '#100c06', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100c06', borderRadius: 14, padding: 14, border: '1px solid #92400e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #18140a' : 'none' }}>
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
