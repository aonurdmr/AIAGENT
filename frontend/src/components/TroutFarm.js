import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  wild: {
    title: 'Doğal',
    items: [
      { icon: '🌊', t: 'Alabalık habitatı', d: 'Karadeniz dağ dereleri: soğuk, oksijeni yüksek, berrak. 8-14°C ideal.' },
      { icon: '🎣', t: 'Fly fishing', d: 'Kanat sineği: kahverengi ve gökkuşağı alabalık. Suni sinek taklidine vurur.' },
      { icon: '⚖️', t: 'Yasal boyut', d: 'Minimum 18cm serbest bırakma limiti. Deşik çevre koruma alanlarında yasak.' },
      { icon: '📅', t: 'Sezon', d: 'Nisan–Haziran açık. Temmuz-Eylül yasaklı. Üreme sezonu koruma amaçlı.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Izgara', d: 'Taze alabalık: iç yağı yakar, dışı kızarır. Limon, tereyağı, dereotu.' },
      { icon: '🫕', t: 'Buğulama', d: 'Tava + az su, kapak: 8 dk. Et kılçıktan ayrılınca hazır. Sarımsak ekle.' },
      { icon: '🍋', t: 'Baharatlama', d: 'Sade: lemon + tereyağı. Güçlü: karabiber + sarımsak + soğan. Seçim kişisel.' },
      { icon: '🧂', t: 'Tuzlama', d: 'Taze: 24 saat tuzla marine, olağanüstü tat. Soğan ve limon dilimleri ile.' },
    ],
  },
};

export default function TroutFarm() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('wild');
  const data = TABS[tab];

  return (
    <div style={{ background: '#010c0a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Alabalık Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Doğal av · sezon · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0f766e' : '#021812', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#021812', borderRadius: 14, padding: 14, border: '1px solid #0f766e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #03201a' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#2dd4bf' }}>{item.t}</div>
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
