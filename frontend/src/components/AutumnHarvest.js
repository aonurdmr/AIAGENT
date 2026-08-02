import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  gather: {
    title: 'Toplama',
    items: [
      { icon: '🌰', t: 'Kestane', d: 'Ekim-Kasım: yerden topla. Açık capsül içindekiler olgun. Nemli bırak.' },
      { icon: '🫐', t: 'Yabani böğürtlen', d: 'Ağustos-Ekim: parlak siyah = olgun. Kırmızı ham: acı ve rahatsız eder.' },
      { icon: '🍎', t: 'Yabani elma', d: 'Küçük sert meyveler: sirke ve reçel için ideal. Tatlı değil.' },
      { icon: '🌿', t: 'Kuşburnu', d: 'İlk don sonrası: daha tatlı. Kırmızı-turuncu. Tohumları çıkar, kullan.' },
    ],
  },
  preserve: {
    title: 'Saklama',
    items: [
      { icon: '🫙', t: 'Reçel', d: 'Kuşburnu-böğürtlen: eşit ağırlık şeker. Kısık ateş 40 dk. Kavanoz kapat.' },
      { icon: '🍂', t: 'Kurutma', d: 'İnce dilimleme: 60°C fırın, 4-6 saat. Nem kalmayınca çıkar.' },
      { icon: '❄️', t: 'Dondurma', d: 'Yıka, kuru: tek kat dondur. Sonra torbaya aktar. 1 yıl saklanır.' },
      { icon: '🍷', t: 'Fermente', d: 'Kuşburnu şarabı: ezilmiş meyve, şeker, su, maya. 2 hafta beklet.' },
    ],
  },
};

export default function AutumnHarvest() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('gather');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060200', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍂 Sonbahar Hasatı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Toplama · saklama · tarifler</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#b45309' : '#0e0600', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0e0600', borderRadius: 14, padding: 14, border: '1px solid #b4530933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #180a00' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fb923c' }}>{item.t}</div>
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
