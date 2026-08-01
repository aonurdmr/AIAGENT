import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  collect: {
    title: 'Toplama',
    items: [
      { icon: '🧤', t: 'Eldiven zorunlu', d: 'Kalin neopren eldiven. Dikenleri kirin icine girer, uzun sure kalır.' },
      { icon: '🌊', t: 'Dusuk gelgit', d: 'En iyi zaman: dusuk gelgit. Kayaliklarda acinmis alanlar.' },
      { icon: '🤿', t: 'Snorkel ile', d: 'Koy ve kayalik alanlarda 1-3 metre derinlikte bereketli.' },
      { icon: '⚖️', t: 'Olcek', d: 'Olgun kirpi 6-10 cm capinde. Kucuk bireyleri geri birak.' },
    ],
  },
  cook: {
    title: 'Pisirme',
    items: [
      { icon: '🔪', t: 'Acma', d: 'Makas veya kirpi acagi ile orta goneden ac. Diken tarafi yukari.' },
      { icon: '🟡', t: 'Yumurta (Uni)', d: 'Ici sari/turuncu yumurta bezi. Renk yogunsa lezzet doruk.' },
      { icon: '🍋', t: 'Cig tuketime', d: 'Limon suyu ve az tuz yeterli. Japon mutfaginda nigiri ustunde.' },
      { icon: '🍝', t: 'Makarna sosu', d: 'Tereyag ile kisa sautee, makarna suyu ekle. Kremsi sos.' },
    ],
  },
};

export default function UrchinCollect() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('collect');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦔 Deniz Kirpisi Toplama</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Toplama · temizlik · pisirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#041018', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041018', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081c28' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#22d3ee' }}>{item.t}</div>
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
